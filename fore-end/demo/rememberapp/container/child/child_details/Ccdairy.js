import React, { Component } from 'react'
import { 
    Text, 
    View,
    StyleSheet,
    Dimensions,
    TextInput,
    TouchableOpacity,
    FlatList,
    Image,
    ImageBackground,
    ToastAndroid,
    ScrollView
} from 'react-native'
import moment from 'moment'
import Icon1 from 'react-native-vector-icons/Feather'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon3 from 'react-native-vector-icons/MaterialIcons'
import Icon4 from 'react-native-vector-icons/Entypo'
import Icon5 from 'react-native-vector-icons/Ionicons'
import Icon6 from 'react-native-vector-icons/Fontisto'
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-crop-picker'
import {myFetch} from '../../../src/utils'
import { WingBlank } from '@ant-design/react-native';
const {width,scale,height} = Dimensions.get('window');
const s = width / 640;
const image = 'http://tc.sinaimg.cn/maxwidth.2048/tc.service.weibo.com/p/image_96weixin_com/9a6afdf6ff7c953f04675270477405b0.jpg'
export default class Cdairy extends Component {
    constructor(props){
        super(props);
        this.state={
            cid:'',
            chooselist:[],
            listicon:'',
            bgcolor:'#ffffaa',
            weather:'day-sunny',
            bgimg:'#',
            upbgimg:'',
            context:'',
            // bgimg:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586712889480&di=9c4a333188094ae5642b0487ec2bd34f&imgtype=0&src=http%3A%2F%2Fwx2.sinaimg.cn%2Flarge%2F007bRu2Ggy1gbtrl6i7ezj30rs0fme2h.jpg',
            lists:[],
            uplists:[],
            reslists:[],
            code:'',
            btndisplay:'none'
        }
    }
    componentDidMount(){
        this.setState({
            cid:this.props.cid
        })
    }
    clearbtn = ()=>{
        this.setState({
            bgimg:'',
            upbgimg:''
        })
    }
    choosebgimg=()=>{
        ImagePicker.openPicker({
            width: 300, 
            height: 400, 
            cropping: true,
            includeBase64:true
        }).then(image => {
            // this.setState({
            //     bgimg:image.path,
            //     upbgimg:image.data
            // })
            myFetch.uploadImage(image.data)
            .then( res=>{
                this.setState({
                    bgimg:res.url,
                    btndisplay:'flex'
                })
                console.log('success');
            }).catch( err=>{
                console.log('flied');
            })
        });
        ImagePicker.clean().then(() => { 
            console.log('removed all tmp images from tmp directory');
        }).catch(e => { 
            console.log(e)
        });
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
    savedairy = ()=>{
        var time = moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
        var context = this.state.context;
        var imgurl = this.state.reslists;
        if(!context){
            context = '（这是一篇没有文字的日记……）';
        }
        if(!imgurl[0]){
            imgurl=['#','#','#']
        }
        myFetch.post('/child/cdairy/ccdairy',{
             childsid:this.state.cid,
             backcolor:this.state.bgcolor,
             content:context,
             imgurl:JSON.stringify(imgurl),
             setdate:time,
             bgimg:this.state.bgimg,
             weather:this.state.weather
        }).then(
            res=>{
                if(res.code == 0){
                    ToastAndroid.show(res.msg+'！', ToastAndroid.SHORT);
                    setTimeout(()=>{
                        Actions.pop({refresh:({data:res.data})})
                    },1000)
                }else{
                    ToastAndroid.show(res.msg+'！', ToastAndroid.SHORT);
                }
            }
        )
    }
    render() {
        const darkbg= [
            {color:'red',name:'rectangle'},
            {color:'orange',name:'rectangle'},
            {color:'yellow',name:'rectangle'},
            {color:'green',name:'rectangle'},
            {color:'cyan',name:'rectangle'},
            {color:'blue',name:'rectangle'},
            {color:'purple',name:'rectangle'},
            {color:'#000000',name:'rectangle'},
            {color:'#bbbbbb',name:'rectangle'}
        ]
        const lightbg = [
            {color:'#ffccee',name:'rectangle'},
            {color:'#ffddaa',name:'rectangle'},
            {color:'#ffffaa',name:'rectangle'},
            {color:'#bbffbb',name:'rectangle'},
            {color:'#bbffee',name:'rectangle'},
            {color:'#aabbff',name:'rectangle'},
            {color:'#ddccff',name:'rectangle'},
            {color:'#ffffff',name:'rectangle'},
            {color:'#dddddd',name:'rectangle'}
        ]
        const weather = [
            {color:'#fff',name:'day-sunny'},
            {color:'#fff',name:'night-clear'},
            {color:'#fff',name:'day-cloudy'},
            {color:'#fff',name:'night-alt-cloudy'},
            {color:'#fff',name:'day-lightning'},
            {color:'#fff',name:'night-alt-lightning'},
            {color:'#fff',name:'night-alt-rain'},
            {color:'#fff',name:'day-snow'},
            {color:'#fff',name:'night-alt-snow'},
            {color:'#fff',name:'day-haze'},
            {color:'#fff',name:'rain'},
            {color:'#fff',name:'snow'},
            {color:'#fff',name:'wind'},
            {color:'#fff',name:'cloudy'},
            {color:'#fff',name:'cloudy-gusts'},
            {color:'#fff',name:'rains'},
            {color:'#fff',name:'snows'},
            {color:'#fff',name:'lightnings'},
        ]
        var textcolor = '#000000'
        var weathercolor = '#ffffff'
        if(this.state.bgcolor == '#000000'){
            textcolor = '#ffffff'
        }
        if(this.state.bgcolor == '#ffffff' || this.state.bgcolor == '#ffffaa'){
            weathercolor = '#000000'
        }
        return (
            <View>
                <View style={styles.navbar}>
                    <TouchableOpacity onPress={()=>Actions.pop()}>
                        <Icon1 style={styles.icon} name='chevron-left'/>
                    </TouchableOpacity>
                    <Text style={styles.title}>写日记</Text>
                    <TouchableOpacity onPress={this.savedairy}>
                        <Icon2 style={styles.icon}  name='playlist-check'/>
                    </TouchableOpacity>
                </View>
                <WingBlank style={styles.wingblank}>
                    <View style={styles.bgchoosebox}>
                        <View style={styles.bgchoose}>
                            <TouchableOpacity onPress={()=>this.setState({chooselist:darkbg})} style={styles.titlebtn}>
                                <Icon2 style={styles.iconbtn} name='palette'/>
                                <Text style={styles.btntext}>深色背景</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.setState({chooselist:lightbg})} style={styles.titlebtn}>
                                <Icon2 style={styles.iconbtn} name='palette-outline'/>
                                <Text style={styles.btntext}>浅色背景</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.choosebgimg} style={styles.titlebtn}>
                                <Icon3 style={styles.iconbtn} name='wallpaper'/>
                                <Text style={styles.btntext}>背景图片</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.setState({chooselist:weather})} style={styles.titlebtn}>
                                <Icon4 style={styles.iconbtn} name='light-up'/>
                                <Text style={styles.btntext}>天气</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            style={{
                                borderColor:'rgba(204,204,204,0.2)',
                                borderWidth:2,
                                width:0.9*width,
                                marginLeft:'auto',
                                marginRight:'auto',
                            }}
                            extraData={this.state}
                            data={this.state.chooselist}
                            horizontal = {true}
                            renderItem={({item,idx})=>(
                                <TouchableOpacity
                                    key={idx}
                                    onPress={()=>{
                                        console.log(idx)
                                        if(item.name == 'rectangle'){
                                            this.setState({
                                                bgcolor:item.color
                                            })
                                        }
                                        if(item.color == '#fff'){
                                            this.setState({
                                                weather:item.name
                                            })
                                        }
                                    }}
                                >
                                    <Text
                                        style={{
                                            width:0.08*width,
                                            height:0.045*height,
                                            marginRight:0.01*width,
                                            marginLeft:0.01*width,
                                            textAlignVertical:'center',
                                            textAlign:'center',
                                            backgroundColor:'#000'
                                        }}
                                    >
                                        <Icon6
                                            name={item.name} 
                                            color={item.color} 
                                        size={25}/>
                                    </Text>
                                </TouchableOpacity>
                            )}
                        /> 
                    </View>
                    <View style={{
                        width:0.9*width,
                        height:0.7*height,
                        backgroundColor:'#ccc',
                        marginTop:0,
                        marginLeft:'auto',
                        marginRight:'auto',
                        backgroundColor:`${this.state.bgcolor}`
                    }}>
                        <ImageBackground
                            style={{
                                width:'100%',
                                height:'100%',
                                transform: [{scale:0.98}]
                            }}
                            resizeMode="cover"
                            source={{uri:`${this.state.bgimg}`}}
                        >
                            <View style={styles.linebox}>
                                <View style={{width:0.25*width,height:0.04*height}}>
                                    <TouchableOpacity onPress={this.clearbtn}>
                                        <Text style={{
                                            width:0.25*width,
                                            height:0.04*height,
                                            textAlign:'center',
                                            display:this.state.btndisplay,
                                            textAlignVertical:'center',
                                            fontSize:22*s,
                                            borderRadius:5,
                                            color:weathercolor,
                                            // backgroundColor:'#ccc',
                                            backgroundColor:`${this.state.bgcolor}`
                                        }}>清除背景图片</Text>
                                    </TouchableOpacity>
                                </View>
                                <Icon6 color={weathercolor} style={styles.lineweather} name={this.state.weather}/>
                            </View>
                            <TextInput
                                style={{
                                    backgroundColor:'rgba(255,255,255,0.3)',
                                    borderColor:'rgba(204,204,204,0.3)',
                                    borderWidth:1,
                                    height:0.25*height,
                                    fontSize:23*s,
                                    textAlignVertical: 'top',
                                    transform: [{scale:0.95}],
                                    padding:0.03*width,
                                    color:`${textcolor}`
                                }}
                                onChangeText={text=>{this.setState({context:text})}}
                                placeholder="日记内容"
                                multiline={true}
                            />
                            <View style={styles.picchoose}>
                                <Text style={styles.pictext}>添加图片</Text>
                                <TouchableOpacity onPress={this.confirmpics}>
                                    <Icon5 size={40*s} style={styles.doiconpic} name='md-checkbox'/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.rechoosepics}>
                                    <Icon6 size={35*s} style={styles.doiconpic} name='redo'/>
                                </TouchableOpacity>
                                <Text style={{width:0.1*width,}}></Text>
                                <TouchableOpacity style={styles.picbtn} onPress={this.choosepics}>
                                    <Icon2 size={45*s} style={styles.iconpic} name='image-plus'/>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.picbtn} onPress={this.takepic}>
                                    <Icon4 size={40*s} style={styles.iconpic} name='camera'/>
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
                        </ImageBackground>
                    </View>
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
    wingblank:{
        height:0.87*height,
        marginTop:0.015*height,
        borderColor:'rgba(204,204,204,0.3)',
        borderStyle:'solid',
        borderWidth:1,
        alignContent:'center'
    },
    bgchoosebox:{
        marginBottom:0.02*width,
        height:0.14*height,
        borderRadius:10,
        // backgroundColor:'#000',
        // transform: [{scale:0.95}]
        // paddingLeft:''
    },
    linebox:{
        height:0.04*height,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    lineweather:{
        paddingRight:0.02*width,
        width:0.6*width,
        height:0.04*height,
        textAlignVertical:'center',
        textAlign:'right',
        fontSize:40*s,
        // backgroundColor:'#000'

    },
    bgchoose:{
        margin:0.02*width,
        height:0.07*height,
        paddingTop:0.008*height,
        paddingBottom:0.01*height,
        borderRadius:10,
        backgroundColor:'rgba(204,204,204,0.1)',
        flexDirection:'row',
        // transform: [{scale:0.95}]
        // paddingLeft:''
    },
    titlebtn:{
        width:0.195*width,
        // backgroundColor:'#ffddee',
        marginLeft:0.015*width,
        marginRight:0.01*width,
    },
    iconbtn:{
        textAlign:'center',
        height:0.038*height,
        textAlignVertical:'center',
        // backgroundColor:'#ccddff',
        fontSize:40*s,
        color:'#FFBF2D'
    },
    btntext:{
        textAlign:'center',
        height:0.018*height,
        fontSize:15*s,
        color:'#bdbbb8'
    },
    picchoose:{
        // margin:0.02*width,
        height:0.05*height,
        paddingTop:0.01*height,
        paddingBottom:0.01*height,
        borderRadius:10,
        backgroundColor:'rgba(204,204,204,0.1)',
        flexDirection:'row',
        // backgroundColor:'#ccc'
    },
    pictext:{
        width:0.3*width,
        height:0.04*height,
        // backgroundColor:'#ddd',
        // marginRight:0.15*width,
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
        color:'#555'
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
        height:0.6*height,
        backgroundColor:'rgba(255,255,255,0.4)',
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
