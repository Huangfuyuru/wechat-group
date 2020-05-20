import React, { Component } from 'react'
import { 
    Text, 
    View,
    StyleSheet,
    Dimensions,
    FlatList,
    Alert,
    ToastAndroid,
    Image,
    ImageBackground,
    TouchableOpacity
} from 'react-native'
import Icon1 from 'react-native-vector-icons/Feather'
import Icon2 from 'react-native-vector-icons/FontAwesome'
import Icon3 from 'react-native-vector-icons/Fontisto'
import moment from 'moment'
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-crop-picker'
import {myFetch} from '../../../src/utils'
import { TextInput } from 'react-native-gesture-handler';
import { WingBlank } from '@ant-design/react-native';
import Button from 'react-native-button';
const {width,scale} = Dimensions.get('window');
const s = width / 640;
const image = 'http://tc.sinaimg.cn/maxwidth.2048/tc.service.weibo.com/p/image_96weixin_com/9a6afdf6ff7c953f04675270477405b0.jpg'
export default class Cdairy extends Component {
    constructor(){
        super();
        this.state={
            code:'',
            cid:'',
            name:'',
            background:image,
            lists:[],
        }
    }
    componentDidMount(){
        this.setState({
            cid:this.props.cid
        })
    }
    setbackground = ()=>{
        ImagePicker.openPicker({
            width: 400, 
            height: 300, 
            cropping: true,
            includeBase64:true
        }).then(image => {
            myFetch.uploadImage(image.data)
            .then( res=>{
                this.setState({
                    background:res.url
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
    redopics = ()=>{
        this.setState({
            background:image
        })
    }
    takephoto = ()=>{
        ImagePicker.openCamera({
            width:400,
            height:300,
            cropping:true,
            includeBase64:true
        }).then(image=>{
            myFetch.uploadImage(image.data)
            .then( res=>{
                this.setState({
                    background:res.url
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
    additem = ()=>{
        var name = this.state.name;
        var time = moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
        var timename = moment(new Date()).format("HH:mm:ss")
        // console.log(timename)
        var date = timename.split(':')
        if(!name){
            name = '没有名字的相册'+date[0]+date[1]+date[2]
        }
        myFetch.get('/child/cpictures/ccpictures',{
            childsid:this.state.cid,
            name:name,
            background:this.state.background,
            setdate:time
        }).then(res=>{
            console.log(res)
            if(res.code == 0){
                ToastAndroid.show(name+'，'+res.msg+'！', ToastAndroid.SHORT);
                setTimeout(()=>{
                    Actions.pop({refresh:({data:res.data})})
                },1000)
            }else{
                ToastAndroid.show(name+'，'+res.msg+'！', ToastAndroid.SHORT);
            }
        })
    }
    render() {
        const lists = this.state.lists
        return (
            <View>
                <View style={styles.navbar}>
                    <TouchableOpacity onPress={()=>Actions.pop()}>
                        <Icon1 style={styles.icon} name='chevron-left'/>
                    </TouchableOpacity>
                    <Text style={styles.title}>创建相册</Text>
                </View>
                <WingBlank style={{
                    marginTop:30*s
                }}>
                    <View style={styles.msg}>
                        <Text style={styles.text}>相册名称：</Text>
                        <TextInput
                            onChangeText={text=>{this.setState({name:text})}}
                            maxLength={10}
                            onFocus={()=>{
                                ToastAndroid.showWithGravityAndOffset(
                                    '请保证相册名称不多于10个字！',
                                ToastAndroid.SHORT,
                                ToastAndroid.TOP,
                                25,100)
                            }}
                            placeholder='请输入相册名称'
                            style={styles.input}/>
                    </View>
                    <TouchableOpacity
                        onPress={this.setbackground}
                        style={styles.coverbox}>
                        <Text
                        style={styles.textbtn}>轻触设置封面</Text>
                        <Image
                            style={styles.cover}
                            resizeMode="cover"
                            source={{uri:`${this.state.background}`}}
                        />
                    </TouchableOpacity>
                    <View style={styles.choose}>
                        <View style={{
                            width:0.85*width,
                            height:50*s,
                            flexDirection: 'row',
                            justifyContent:'space-between',
                            textAlignVertical:'center',
                            marginBottom:0.01*width
                        }}>
                            <Text
                            style={styles.textbtn}>重选封面</Text>
                            <View style={{
                                flexDirection: 'row',
                                textAlignVertical:'center',
                            }}>
                                <TouchableOpacity onPress={this.redopics} >
                                    {/* <Icon3 style={styles.btnicon} name='photograph'/> */}
                                    <Icon3 style={styles.btnicon} name='redo'/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.takephoto}>
                                    <Icon1 style={styles.btnicon}  name='camera'/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/* <FlatList 
                        style={styles.picbox}
                        data={lists}
                        numColumns={3}
                        ListFooterComponent={
                            <View style={{
                                height:0.03*width
                            }}>
                            </View>
                        }
                        renderItem={({item})=>(
                            <Image
                                key={item.id}
                                style={styles.pics}
                                resizeMode="cover"
                                source={{uri:`${item.path}`}}
                            />
                        )}
                        />   */}
                    </View>
                </WingBlank>
                <Button
                onPress={this.additem} 
                style={styles.addbtn}>创建相册</Button>
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
        paddingLeft:0.02*width,
        paddingTop:'1%',
        paddingRight:0.1*width,
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
    msg:{
        width:0.85*width,
        height:60*s,
        paddingRight:0.05*width,
        // backgroundColor:'#000',
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:30*s,
        flexDirection: 'row',
        justifyContent:'center',
    },
    text:{
        textAlign:'center',
        textAlignVertical:'center',
        width:0.25*width,
        fontSize:26*s,
        color:'#333',
        // backgroundColor:'#000'
    },
    input:{
        width:0.5*width,
        textAlign:'center',
        // backgroundColor:'#ccc',
        borderColor:'#bdbbb8',
        borderStyle:'solid',
        borderBottomWidth:1,
        fontSize:21*s,
        textAlign:'center',
        color:'#333'
    },
    textbtn:{
        textAlign:'center',
        textAlignVertical:'center',
        width:0.25*width,
        height:45*s,
        fontSize:26*s,
        color:'#333',
        textAlignVertical:'center',
    },
    coverbox:{
        // backgroundColor:'#000',
        width:0.6*width,
        height:230*s,
        alignContent:'center',
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:20*s,
        justifyContent:'center',
        alignItems:'center'
    },
    cover:{
        width:0.5*width,
        height:180*s,
        borderColor:'#ccc',
        borderStyle:'solid',
        borderWidth:2,
        backgroundColor:'rgba(255,191,45,0.1)',
    },
    choose:{
        width:0.85*width,
        height:200*s,
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:30*s,
        justifyContent:'center',
        alignItems:'center',
        // backgroundColor:'#000',
        marginBottom:50*s

    },
    btnicon:{
        width:0.15*width,
        height: 50*s,
        textAlign:'center',
        fontSize:40*s,
        color:'#FFBF2D',
        textAlignVertical:'center',
    },
    picbox:{
        padding:0.01*width,
        width:0.8*width,
        borderColor:'rgba(204,204,204,0.3)',
        borderStyle:'solid',
        borderWidth:2,
        backgroundColor:'rgba(255,191,45,0.1)'
    },
    pics:{
        width:0.237*width,
        height:180*s,
        margin:0.01*width,
        transform: [{scale:0.95}]
    },
    addbtn:{
        width:0.8*width,
        height:80*s,
        marginLeft:'auto',
        marginRight:'auto',
        backgroundColor:'rgba(255,255,255,0.1)',
        borderWidth:1,
        borderStyle:'solid',
        borderColor:'#FFBF2D',
        borderRadius:5,
        color:'#FFBF2D',
        fontSize:22,
        textAlignVertical:'center'
    }
})
