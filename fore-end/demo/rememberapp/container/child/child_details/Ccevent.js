import React, { Component } from 'react'
import { 
    Text, 
    View,
    StyleSheet,
    Dimensions,
    Picker,
    TextInput,
    TouchableOpacity,
    FlatList,
    Image,
    ToastAndroid
} from 'react-native'
import moment from 'moment'
import Icon1 from 'react-native-vector-icons/Feather'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon3 from 'react-native-vector-icons/Entypo'
import Icon4 from 'react-native-vector-icons/FontAwesome'
import Icon5 from 'react-native-vector-icons/AntDesign'
import Icon7 from 'react-native-vector-icons/Ionicons'
import Icon6 from 'react-native-vector-icons/Fontisto'
import ImagePicker from 'react-native-image-crop-picker'
import {myFetch} from '../../../src/utils'
import { Actions } from 'react-native-router-flux';
import { WingBlank } from '@ant-design/react-native';
const {width,scale,height} = Dimensions.get('window');
const s = width / 640;
const imgurl = 'http://hbimg.b0.upaiyun.com/3503b3b19c1bc0928766b62de18a5433dad71cf911089-tluSYK_fw658'
export default class Cdairy extends Component {
    constructor(){
        var date = moment( new Date()).format("YYYY-MM-DD").split('-')
        super();
        this.state={
            cid:'',
            tag:'第一次',
            year:date[0],
            month:date[1],
            day:date[2],
            content:'',
            name:'',
            lists:[],
            uplists:[],
            reslists:[],
        }
    }
    componentDidMount(){
        this.setState({
            cid:this.props.cid
        })
    }
    namefocus = ()=>{
        ToastAndroid.showWithGravityAndOffset(
            '名称不超过10个字！',
            ToastAndroid.SHORT,
            ToastAndroid.TOP,
            25,250)
    }
    choosepics = ()=>{
        ImagePicker.openPicker({
            multiple: true,
            includeBase64:true
        }).then(images => {
            var lists = this.state.lists;
            var uplists = this.state.uplists;
            for(var i in images){
                lists.push(images[i].path);
                uplists.push(images[i].data);
            }
            this.setState({
                lists:lists,
                uplists:uplists
            })
        });
        ImagePicker.clean().then(() => { 
            console.log('removed all tmp images from tmp directory');
        }).catch(e => { 
            console.log(e)
        });
    }
    takepic = ()=>{
        ImagePicker.openCamera({
            width:300,
            height:400,
            cropping:true,
            includeBase64:true
        }).then(image=>{
            var lists = this.state.lists;
            var uplists = this.state.uplists;
            lists.push(image.path);
            uplists.push(image.data);
            this.setState({
                lists:lists,
                uplists:uplists
            })
        });
        ImagePicker.clean().then(() => { 
            console.log('removed all tmp images from tmp directory');
        }).catch(e => { 
            console.log(e)
        });
    }
    confirmpics = ()=>{
        if(this.state.uplists[0]){
            myFetch.uploadImages(this.state.uplists)
            .then( res=>{
                // console.log(res)
                this.setState({
                    reslists:res
                })
                ToastAndroid.show('添加成功！', ToastAndroid.SHORT);
            }).catch( err=>{
                console.log('flied');
            })
        }else{
            ToastAndroid.showWithGravityAndOffset(
            '请选择图片！',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            0,450)
        }
    }
    rechoosepics = ()=>{
        this.setState({
            lists:[],
            uplists:[]
        })
    }
    saveevent = ()=>{
        if(!this.state.name){
            ToastAndroid.showWithGravityAndOffset(
            '名称不能为空！',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
            0,-200)
        }else{
            var time = this.state.year+'-'+this.state.month+'-'+this.state.day
            var date = moment(time).format("YYYY-MM-DD")
            var now = moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
            var content = this.state.content;
            var imgurl = this.state.reslists;
            if(!imgurl[0]){
                imgurl=['#','#','#']
            }
            if(!content){
                content = '没有详细描述~'
            }
            myFetch.post('/child/cevents/ccevents',{
                childsid:this.state.cid,
                item:this.state.tag,
                name:this.state.name,
                imgurl:JSON.stringify(imgurl),
                setdate:now,
                date:date,
                content:content,
            }).then(
                res=>{
                       if(res.code == 0){
                           ToastAndroid.show(this.state.name+res.msg+'！', ToastAndroid.SHORT);
                           setTimeout(()=>{
                               Actions.pop({refresh:({data:res.data})})
                           },1000)
                       }else{
                           ToastAndroid.show(this.state.name+res.msg+'！', ToastAndroid.SHORT);
                       }
                }
            )
        }
        // ToastAndroid.showWithGravityAndOffset(
        //     '添加成功！',
        // ToastAndroid.SHORT,
        // ToastAndroid.CENTER,
        // 25,-200)
        // setTimeout(() => {
        //     Actions.pop() 
        // }, 3000);
    }
    render() {
        return (
            <View>
                <View style={styles.navbar}>
                     <Icon1 
                        style={styles.icon}
                        name='chevron-left'
                        onPress={()=>Actions.pop()}
                    />
                    <Text style={styles.title}>新增大事记</Text>
                    <TouchableOpacity onPress={this.saveevent}>
                        <Icon2 style={styles.icon}  name='playlist-check'/>
                    </TouchableOpacity>
                </View>
                <WingBlank>
                    <View style={styles.msgbox}>
                        <View style={styles.msg}>
                            <Text style={styles.text}>
                                <Icon4 style={styles.listlineicon} name='calendar-check-o'/>  日期：</Text>
                            <TextInput
                                onChangeText={text=>{this.setState({year:text})}}
                                keyboardType='numeric'
                                maxLength={4}
                                defaultValue={this.state.year}
                                style={styles.input}/>
                            <Text style={styles.unit}>
                                年
                            </Text>
                            <TextInput
                                onChangeText={text=>{this.setState({month:text})}}
                                keyboardType='numeric'
                                maxLength={2}
                                defaultValue={this.state.month}
                                style={styles.input}/>
                            <Text style={styles.unit}>
                                月
                            </Text>
                            <TextInput
                                onChangeText={text=>{this.setState({day:text})}}
                                keyboardType='numeric'
                                maxLength={2}
                                defaultValue={this.state.day}
                                style={styles.input}/>
                            <Text style={styles.unit}>
                                日
                            </Text>
                        </View>
                        <View style={styles.msg}>
                            <Text style={styles.text}>
                                <Icon3 style={styles.listlineicon} name='price-tag'/>  标签：</Text>
                            <Text style={styles.tag}>
                                <Picker
                                    selectedValue={this.state.tag}
                                    mode='dropdown'
                                    style={{width:0.215*width}}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({
                                            tag: itemValue,
                                        })
                                    }>
                                    <Picker.Item label="第一次" value="第一次" />
                                    <Picker.Item label="过生日" value="过生日" />
                                    <Picker.Item label="毕业了" value="毕业了" />
                                    <Picker.Item label="超难忘" value="超难忘" />
                                    <Picker.Item label="超感动" value="超感动" />
                                    <Picker.Item label="超开心" value="超开心" />
                                    <Picker.Item label="温情时刻" value="温情时刻" />
                                </Picker>
                            </Text>
                        </View>
                        <View style={styles.msg}>
                            <Text style={styles.text}>
                                <Icon5 style={styles.listlineicon} name='edit'/>  名称：</Text>
                            <TextInput
                                onChangeText={text=>{this.setState({name:text})}}
                                onFocus={this.namefocus}
                                maxLength={10}
                                style={styles.tag}/>
                        </View>
                    </View>
                    <TextInput
                        onChangeText={text=>{this.setState({content:text})}}
                        style={styles.content}
                        placeholder='详细内容'
                        multiline={true}
                    />
                    <View style={styles.picchoose}>
                        <Text style={styles.pictext}>添加图片</Text>
                        <TouchableOpacity onPress={this.confirmpics}>
                            <Icon7 size={40*s} style={styles.doiconpic} name='md-checkbox'/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.rechoosepics}>
                            <Icon6 size={35*s} style={styles.doiconpic} name='redo'/>
                        </TouchableOpacity>
                        <Text style={{width:0.1*width,}}></Text>
                        <TouchableOpacity style={styles.picbtn} onPress={this.choosepics}>
                            <Icon2 size={45*s} style={styles.iconpic} name='image-plus'/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.picbtn} onPress={this.takepic}>
                            <Icon3 size={40*s} style={styles.iconpic} name='camera'/>
                        </TouchableOpacity>
                    </View>
                    <FlatList 
                        style={styles.picbox}
                        data={this.state.lists}
                        numColumns={3}
                        ListFooterComponent={
                            <View style={{
                                height:0.03*width
                            }}>
                            </View>
                        }
                        renderItem={({item})=>(
                            <Image
                                style={styles.pics}
                                resizeMode="cover"
                                source={{uri:`${item}`}}
                            />
                        )}
                    />  
                </WingBlank>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    navbar:{
        width:width,
        height:65*s,
        backgroundColor:'#FFBF2D',
        flexDirection: 'row',
        paddingLeft:0.03*width,
        paddingTop:'1%',
        paddingRight:0.03*width,
        justifyContent:"center"
    },
    icon:{
        width:0.08*width,
        color:'#fff',
        fontSize:30,
    },
    title:{
        marginLeft:'auto',
        marginRight:"auto",
        textAlign:'center',
        fontSize:20,
        color:'#fff',
        letterSpacing:3
    },
    msgbox:{
        backgroundColor:'rgba(204,204,204,0.2)',
        width:0.8*width,
        height:0.23*height,
        paddingBottom:0.01*height,
        paddingTop:0.01*height,
        // backgroundColor:'#000',
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:0.015*height,
        justifyContent:'space-around',
        alignItems:'center'
    },
    msg:{
        backgroundColor:'rgba(255,255,255,1)',
        width:0.75*width,
        height:0.06*height,
        marginLeft:'auto',
        marginRight:'auto',
        flexDirection: 'row',
        justifyContent:'center',
    },
    tag:{
        width:0.44*width,
        // marginRight:0.06*width,
        textAlign:'center',
        textAlignVertical:'center',
        borderColor:'#bdbbb8',
        borderStyle:'solid',
        borderBottomWidth:1,
        fontSize:25*s,
        color:'#333'
    },
    listlineicon:{
        fontSize:35*s,
        color:'#FFBF2D',
        // backgroundColor:'#ccc'
    },
    text:{
        textAlign:'center',
        marginRight:0.02*width,
        textAlignVertical:'center',
        width:0.19*width,
        fontSize:23*s,
        color:'#555',
        // backgroundColor:'#000'
    },
    input:{
        width:0.11*width,
        borderColor:'#bdbbb8',
        borderStyle:'solid',
        borderBottomWidth:1,
        fontSize:22*s,
        textAlign:'center',
        color:'#333'
    },
    unit:{
        textAlign:'center',
        marginLeft:0.003*width,
        marginRight:0.003*width,
        textAlignVertical:'center',
        width:0.03*width,
        fontSize:23*s,
        color:'#555',
    },
    content:{
        borderColor:'rgba(255,191,45,0.3)',
        borderWidth:1,
        height:0.2*height,
        marginTop:0.01*height,
        marginBottom:0.01*height,
        fontSize:23*s,
        textAlignVertical: 'top',
        transform: [{scale:0.95}],
        padding:0.03*width,
    },
    picchoose:{
        // margin:0.02*width,
        height:0.05*height,
        paddingTop:0.007*height,
        transform: [{scale:0.95}],
        // borderRadius:5,
        backgroundColor:'rgba(204,204,204,0.2)',
        flexDirection:'row',
        // backgroundColor:'#ccc'
    },
    pictext:{
        width:0.3*width,
        height:0.04*height,
        // backgroundColor:'#ddd',
        // marginRight:0.25*width,
        color:'#555',
        fontSize:25*s,  
        textAlign:'center' ,
        textAlignVertical:'center', 
    },
    doiconpic:{
        width:0.1*width,
        height:0.04*height,
        textAlignVertical:'center',
        textAlign:'center',
        color:'#FFBF2D'
    },
    iconpic:{
        width:0.15*width,
        textAlign:'center',
        height:0.04*height,
        textAlignVertical:'center',
        // backgroundColor:'#ccddff',
        color:'#888'
    },
    picbox:{
        height:0.35*height,
        backgroundColor:'rgba(204,204,204,0.2)',
        padding:0.01*width,
        width:0.89*width,
        transform: [{scale:0.98}],
        marginRight:'auto',
        marginLeft:'auto',
    },
    pics:{
        width:0.275*width,
        height:0.18*height,
        margin:0.007*width,
        transform: [{scale:0.95}],
    },
})
