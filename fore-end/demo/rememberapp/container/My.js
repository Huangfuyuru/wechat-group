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
            width: new Animated.Value(20),
            //头像地址
            back: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=896950653,2577927585&fm=26&gp=0.jpg',
            //关注人数
            num1:6,
            //粉丝人数
            num2:5,
            //小花数量
            num3:55
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
                myFetch.post('/my/mypage', {
                    uid:this.state.uid,
                    imgurl:this.state.back,
                }).then(
                    res => {
                        this.setState({
                            back:res[0].imgurl
                        })
                        console.log("res", res)
                    }
                )
            })
    }
    componentDidUpdate(prevProps,prevState){
        console.log('更新')
        console.log(this.state.back)
        if(prevState.back != this.state.back){
            AsyncStorage.getItem('user').
            then((res) => {
                var user = JSON.parse(res)
                this.setState({
                    uid: user.id
                })
                myFetch.post('/my/mypage',{
                    uid:this.state.uid,
                    imgurl:this.state.back,
                    
                }).then(
                    res=>{
                        this.setState({
                            back:res.imgurl
                        })
                    }
                )
            })
        }  
        console.log(this.state.back);
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
       console.log('---------------');
        AsyncStorage.getItem('user').
            then((res)=>{
                var user = JSON.parse(res)
                this.setState({
                    uid:user.id,
                })
                console.log(this.state.uid);
            myFetch.get('/my/sign/',{
                uid:this.state.uid
            }).then(res=>{
                if(res){
                    this.setState({
                        code:res.code
                    })
                    console.log(this.state.code);
                }else{
                    console.log('这是code'+res.code);
                }
            })
        })

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
                        <Text style={{color:'#FFBF2D', fontWeight:'bold',fontSize:17,marginTop:10*h}}>小浣熊</Text>
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
                <View style={{width:'100%',height:10*h,backgroundColor:'#eee'}}></View>
                <TouchableOpacity onPress={()=>Actions.Mychilds()}  style={styles.btn}>
                    <Icon6 style={styles.icon3}  name='child'/>
                    <Text style={styles.blockbtn}>&nbsp;&nbsp;亲子列表</Text >
                </TouchableOpacity>
                <View style={{width:'100%',height:2*h,backgroundColor:'#eee'}}></View>
                <TouchableOpacity onPress={()=>Actions.Mylover()}  style={styles.btn}>
                    <Icon5 style={styles.icon3}  name='account-heart'/>
                    <Text style={styles.blockbtn}>&nbsp;&nbsp;爱人列表</Text >
                </TouchableOpacity>
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
        width: "100%",
        marginLeft: 20,
        marginRight: 5,
        marginTop: 5,
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