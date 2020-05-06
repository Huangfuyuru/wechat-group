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
import { Flex, WingBlank } from '@ant-design/react-native'
import ImagePicker from 'react-native-image-picker';
import ImageCropPicker from 'react-native-image-crop-picker';

import {myFetch} from '../src/utils'

const { width, scale, height } = Dimensions.get('window');
const s1 = width / 640;
const h = height / 1012;

const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
};
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
            imageUrl:require('..//images/head.png'),
            //关注人数
            num1:6,
            //粉丝人数
            num2:5,
            //小花数量
            num3:55
        }
    }
    componentDidMount(){
    
    }
    takephoto = ()=>{
        ImageCropPicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
          }).then(image => {
            this.setState({imageUrl:{uri:image.path}})
          });
    }
    alertMsg = () => {
        Alert.alert('提示', '确定要签到吗？',
            [
                { text: "确定", onPress: ()=>{
                    AsyncStorage.getItem('user').
                        then((res)=>{
                            var user = JSON.parse(res)
                            this.setState({
                                uid:user.id,
                            })
                        console.log(user.id);
                        myFetch.get('/my/sign',{
                            uid:user.uid
                        }).then(res=>{
                            if(res.code==0){
                                this.setState({
                                    code:res.code
                                })
                                console.log(this.state.code);
                                ToastAndroid.showWithGravityAndOffset(
                                    '签到成功！',
                                ToastAndroid.SHORT,
                                ToastAndroid.CENTER,
                                25,-200)
                            }else{
                                ToastAndroid.showWithGravityAndOffset(
                                    '签到失败！',
                                ToastAndroid.SHORT,
                                ToastAndroid.CENTER,
                                25,-200)
                                console.log('这是code'+res.code);
                            }
                        })
                    })
                } },
                { text: "取消", onPress: this.opntion2Selected },
            ]
        )
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
                <View style={{width:'100%',height:240*h,flexDirection:'row'}}>
                    <View style={{width:'50%',height:200*h,alignItems:'center',marginTop:20*h}}>
                        <TouchableOpacity onPress={()=>{this.takephoto()}}>
                            <Image style={{width:100*h,height:100*h,borderRadius:60,borderColor:'#FFBF2D',borderWidth:2}} source={this.state.imageUrl} />
                        </TouchableOpacity>
                        <Text style={{color:'#FFBF2D', fontWeight:'bold',fontSize:17,marginTop:10*h}}>小浣熊</Text>
                        <View style={{fontWeight:'bold',fontSize:17,width:'100%',justifyContent:'center',flexDirection:'row'}}>
                            <TouchableOpacity onPress={()=>{Actions.Mattention()}}>
                                <Text style={{color:'#FFBF2D'}}>关注:{this.state.num1}&nbsp;&nbsp;</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{Actions.Mfollowers()}}>
                                <Text style={{color:'#FFBF2D'}}>粉丝:{this.state.num2}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{fontWeight:'bold',fontSize:17,width:'100%',justifyContent:'center',flexDirection:'row'}}>
                            <Icon3 style={styles.icon2} name='flower' />
                            <Text style={{color:'#FFBF2D'}}>&nbsp;:&nbsp;{this.state.num3}</Text>
                        </View>
                    </View>
                    <View style={{width:'40%',height:240*h,alignItems:'center'}}>
                        <TouchableOpacity onPress={()=>Actions.Mychilds()} 
                            style={styles.btn}>
                            <Text style={styles.blockbtn}>亲子</Text >
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>Actions.Mylover()} 
                            style={styles.btn}>
                            <Text style={styles.blockbtn}>爱人</Text >
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>Actions.Myfriend()} 
                            style={styles.btn}>
                            <Text style={styles.blockbtn}>好友</Text >
                        </TouchableOpacity>
                    </View>
                    <View style={{width:'10%'}}></View>
                </View>
                {/* 消息 */}
                <View style={{width:'80%',height:500*s1,marginLeft:'10%',borderWidth:1,borderStyle:'solid',borderColor:'gray',flexDirection:'row',justifyContent:'center'}}>
                    <Text style={{fontSize:18,color:'gray'}}>消息</Text>
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
        width: "50%",
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        backgroundColor: '#FFBF2D',
        borderRadius: 5,
    },
    blockbtn:{ 
        textAlign: "center", 
        fontSize: 18,
        textAlignVertical:'center', 
        lineHeight: 50*h, 
        color:'#fff',
        fontWeight:'bold'
    },
    icon2:{
        color:'#FFBF2D',
        fontSize:18,
    },
})
