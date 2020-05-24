import React, { Component } from 'react'
import { 
    Text, 
    StyleSheet, 
    Dimensions, 
    View, 
    Image, 
    TouchableOpacity, 
    AsyncStorage,
    StatusBar,
    Animated,
    ScrollView,
    FlatList,
    Alert,
    ToastAndroid,
    ImageBackground,
} from 'react-native'
import {
    Actions
} from 'react-native-router-flux'
import Icon1 from 'react-native-vector-icons/Feather'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon3 from 'react-native-vector-icons/Entypo'
import Icon4 from 'react-native-vector-icons/FontAwesome'
import Icon5 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon6 from 'react-native-vector-icons/FontAwesome5'
import Icon7 from 'react-native-vector-icons/AntDesign'

import { Flex, WingBlank } from '@ant-design/react-native'
import ImagePicker from 'react-native-image-crop-picker'
import ImageCropPicker from 'react-native-image-crop-picker';

import {myFetch} from '../src/utils'

const { width, scale, height } = Dimensions.get('window');
const s1 = width / 640;
const h = height / 1012;

export default class My extends Component {
    constructor(){
        super();
        let data = [];
        for(var i=0; i<10; i++){
            data.push({tit:i,key:i});
        }
        // }
        this.state = {
            code:1,
            uid:'',
            data,
            flag:true,
            width: new Animated.Value(20),
            //头像地址
            back: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=896950653,2577927585&fm=26&gp=0.jpg',
            //关注人数
            num1:0,
            //粉丝人数
            num2:0,
            //小花数量
            num3:0,
            name:''
        }
    }
    componentDidMount() {
        console.log('my第一次加载');
        AsyncStorage.getItem('user').
        then((res) => {
            var user = JSON.parse(res)
            this.setState({
                uid: user.id
            })
            myFetch.post('/my/', {
                uid:this.state.uid,
            }).then(
                res => {
                    this.setState({
                        num3:res.num,
                        name:res.name,
                        back:res.imgurl
                    })
                }
            )
            myFetch.get('/my/mypage/fans',{
                user_id:this.state.uid
            }).then(res=>{
                if(res){
                    this.setState({
                        num2:res.data.length
                    })
                }else{
                    console.log('粉丝数据返回失败');
                }
            })
            myFetch.get('/my/mypage/focus',{
                user_id:this.state.uid
            }).then(res=>{
                if(res){
                    this.setState({
                        num1:res.data.length
                    })
                }else{
                    console.log('关注数据返回失败');
                }
            })
        })
    }
    componentDidUpdate(prevProps,prevState){
        if(prevState.back != this.state.back){
            myFetch.post('/my/mypage',{
                uid:this.state.uid,
                imgurl:this.state.back
            }).then(
                res=>{
                    console.log(res)
                }
            )
            myFetch.get('/my/mypage/fans',{
                user_id:this.state.uid
            }).then(res=>{
                if(res){
                    this.setState({
                        num2:res.data.length
                    })
                }else{
                    console.log('粉丝数据返回失败');
                }
            })
            myFetch.get('/my/mypage/focus',{
                user_id:this.state.uid
            }).then(res=>{
                if(res){
                    this.setState({
                        num1:res.data.length
                    })
                }else{
                    console.log('关注数据返回失败');
                }
            })
        }
    }
    // 姓名的callback函数用
    again=()=>{
        myFetch.post('/my/', {
            uid:this.state.uid,
        }).then(
            res => {
                this.setState({
                    name:res.name,
                })
            }
        )
    }
    choosebgpic=()=>{
        ImagePicker.openPicker({
            width: 400, 
            height: 300, 
            cropping: true,
            includeBase64:true
        }).then(image => {
           myFetch.uploadImage(image.data)
            .then( res=>{
                this.setState({
                    back:res.url
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
    alertMsg = () => {
        if(this.state.flag){
            Alert.alert('提示', '确认签到？',
            [
                { text: "确定", onPress: ()=>{
                    AsyncStorage.getItem('user').
                    then((res)=>{
                        var user = JSON.parse(res)
                        this.setState({
                            uid:user.id,
                        })
                        myFetch.get('/my/sign/',{
                            uid:this.state.uid
                        }).then(res=>{
                            if(res){
                                this.setState({
                                    num3:res.data.num
                                })
                                ToastAndroid.showWithGravityAndOffset(
                                    '签到成功！',
                                ToastAndroid.SHORT,
                                ToastAndroid.CENTER,
                                25,-100)
                            }else{
                                console.log(res);
                            }
                        })
                    })
                    this.setState({
                        flag:false
                    })
                } },
                { text: "取消", onPress: this.opntion2Selected },
            ]
        )
        }else{
            ToastAndroid.showWithGravityAndOffset(
                '今天已经签到过了！',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
            25,-100)
        }
    }
    render() {
        return (
            <View style={{ 
                width: width, 
                height: height, 
                backgroundColor: "#fff",
            }}>
                <StatusBar 
                    backgroundColor='#FFBF2D'
                />
                <View style={styles.navbar}>
                    <TouchableOpacity onPress={this.alertMsg} >
                        <Icon4 style={styles.icon} name='calendar'/>
                    </TouchableOpacity>
                    <Text style={styles.title}>我的</Text>
                    <TouchableOpacity onPress={()=>Actions.Use()}>
                        <Icon1 style={styles.icon}  name='settings'/>
                    </TouchableOpacity>
                </View>
                {/* 头像 */}
                <View style={{width:'100%',height:230*h,flexDirection:'row'}}>
                    <View style={{width:'100%',height:200*h,alignItems:'center',marginTop:20*h}}>
                        <TouchableOpacity onPress={()=>{this.choosebgpic()}}>
                            <Image style={{width:100*h,height:100*h,borderRadius:60,borderColor:'#FFBF2D',borderWidth:2}} source={{uri: this.state.back}} />
                        </TouchableOpacity>
                        <Text style={{color:'#FFBF2D', fontWeight:'bold',fontSize:17,marginTop:10*h}}>{this.state.name}</Text>
                        <View style={{fontWeight:'bold',marginTop:10*h,fontSize:17,width:'100%',justifyContent:'center',flexDirection:'row'}}>
                            <TouchableOpacity onPress={()=>{Actions.Mattention()}}>
                                <Text style={{fontSize:17, color:'#FFBF2D'}}>关注:{this.state.num1}&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{Actions.Mfollowers()}}>
                                <Text style={{fontSize:17,color:'#FFBF2D'}}>粉丝:{this.state.num2}&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                            </TouchableOpacity>
                            <Icon3 style={styles.icon2} name='flower' />
                            <Text style={{color:'#FFBF2D',fontSize:17}}>&nbsp;:&nbsp;{this.state.num3}</Text>
                        </View>
                    </View>
                </View>
                {/* body */}
                <View style={{width:'100%',height:80*h,backgroundColor:'#eee',flexDirection:'row'}}>
                    <View style={{width:'50%',borderWidth:2,borderColor:'white'}}>
                        <TouchableOpacity onPress={()=>Actions.Mychilds()}  style={styles.btn}>
                            <Icon6 style={styles.icon3}  name='child'/>
                            <Text style={styles.blockbtn}>&nbsp;&nbsp;亲子列表</Text >
                        </TouchableOpacity>
                    </View>
                    <View style={{width:'50%',borderWidth:2,borderColor:'white'}}>
                        <TouchableOpacity onPress={()=>Actions.Mylover()}  style={styles.btn}>
                            <Icon5 style={styles.icon3}  name='account-heart'/>
                            <Text style={styles.blockbtn}>&nbsp;&nbsp;爱人列表</Text >
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{width:'100%',height:80*h,backgroundColor:'#eee',flexDirection:'row'}}>
                    <View style={{width:'50%',borderWidth:2,borderColor:'white'}}>
                        <TouchableOpacity onPress={()=>Actions.Mstore()}  style={styles.btn}>
                            <Icon7 style={styles.icon3}  name='star'/>
                            <Text style={styles.blockbtn}>&nbsp;&nbsp;我的收藏</Text >
                        </TouchableOpacity>
                    </View>
                    <View style={{width:'50%',borderWidth:2,borderColor:'white'}}>
                        <TouchableOpacity onPress={()=>Actions.Mpublish()}  style={styles.btn}>
                            <Icon7 style={styles.icon3}  name='pushpin'/>
                            <Text style={styles.blockbtn}>&nbsp;&nbsp;我的发布</Text >
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    navbar:{
        width:width,
        height:65*s1,
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
        fontSize:25,
    },
    title:{
        marginLeft:'auto',
        marginRight:"auto",
        textAlign:'center',
        fontSize:20,
        color:'#fff',
        letterSpacing:3,
        fontWeight:'bold'
    },
    btn: {
        padding:0,
        height: 50*h,
        // width: "500%",
        marginLeft: 50,
        marginRight: 5,
        marginTop: 10,
        flexDirection:'row',
        borderRadius: 5,
    },
    blockbtn:{ 
        textAlign: "center", 
        fontSize: 18,
        textAlignVertical:'center', 
        lineHeight: 50*h, 
        color:'#FFBF2D',
        fontWeight:'bold'
    },
    icon2:{
        color:'#FFBF2D',
        fontSize:20,
    },
    icon3:{
        color:'#FFBF2D',
        fontSize:33,
    },
})