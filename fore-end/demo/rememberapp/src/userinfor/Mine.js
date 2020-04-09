import React, { Component } from 'react'
import { 
    View, 
    Text,
    StyleSheet,
    Dimensions,
    Image,
    FlatList,
    AsyncStorage,
} from 'react-native'
import Button from 'react-native-button'
import {Actions} from 'react-native-router-flux'
import ImageCropPicker from 'react-native-image-crop-picker'
import Icon from 'react-native-vector-icons/AntDesign'
const {width,scale} = Dimensions.get('window');
const s = width / 640;
const lists=[
    {
        title:{icon:'rest',text:'我的个人中心'},
        data:[
            {icon:'setting',text:'账户管理'},
            {icon:'enviromento',text:'收货地址'},
            {icon:'solution1',text:'我的信息'},
            {icon:'filetext1',text:'我的订单'},
            {icon:'qrcode',text:'我的二维码'},
            {icon:'smileo',text:'我的积分'},
            {icon:'staro',text:'我的收藏'}
        ]
    },
    {
        title:{icon:'tago',text:'E族活动'},
        data:[
            {icon:'tool',text:'居家维修保养'},
            {icon:'car',text:'出行接送'},
            {icon:'user',text:'我的受赠人'},
            {icon:'home',text:'我的住宿优惠'},
            {icon:'flag',text:'我的活动'},
            {icon:'form',text:'我的发布'},
        ]
    }
]


export default class Mine extends Component {
    constructor(){
        super();
        this.state={
            imageUrl: require('../../images/8.png')
        }
    }
    takephoto = ()=>{
        ImageCropPicker.openCamera({
            width:300,
            height:400,
            cropping:true,
        }).then(image=>{
            AsyncStorage.setItem('imageUrl',image.path)
            this.setState({
                imageUrl:{uri:image.path}
            })
        });
    }
    checkout = ()=>{
        AsyncStorage.setItem('isLogin','false');
        Actions.login();
    }
    componentDidMount(){
        AsyncStorage.getItem('imageUrl').
        then((res)=>{
            if(res == null){
                this.setState({
                    imageUrl:require('../../images/8.png')
                });
            }else{
                this.setState({
                    imageUrl:{uri:res}
                });
            }
        })
    }
    render() {
        return (
            <View style={{backgroundColor:'#eee'}}>
                <View style={styles.title}>
                    <View style={styles.titlepic}>
                        <Button 
                            onPress={()=>{this.takephoto()}}
                        >
                            <Image 
                                style={{
                                    width:158*s,
                                    height:158*s,
                                    marginRight:'auto',
                                    marginLeft:'auto',
                                    borderRadius:100,
                                    borderWidth:2,
                                    borderColor:'#fff'
                                }}
                                source={this.state.imageUrl}
                            />
                        </Button>
                        <Text
                            style={{
                                fontSize:20,
                                marginTop:10*s,
                                color:'#fff'
                            }}
                        >
                            BINNU DHILLON
                        </Text>
                    </View>
                </View>
                <View style={{marginBottom:10*s}}>
                    <View style={styles.liststitle}>
                        <Icon
                            style={styles.titleline}
                            name={lists[0].title.icon}
                            color='#c2c2c2'
                            size={30*s}
                        />
                        <Text style={styles.liststext}>{lists[0].title.text}</Text>
                    </View>
                    <FlatList 
                        style={styles.listscontent}
                        data={lists[0].data}
                        numColumns={3}
                        renderItem={({item})=>(
                            <View style={styles.listsdata}>
                                 <Icon
                                    style={styles.listsicon} 
                                    name={item.icon}
                                    color='#c2c2c2'
                                    size={30*s}
                                />
                                <Text style={styles.liststext}>{item.text}</Text>
                            </View>
                        )}
                    />
                </View>
                <View style={{marginBottom:40*s}}>
                    <View style={styles.liststitle}>
                        <Icon
                            style={styles.titleline} 
                            name={lists[1].title.icon}
                            color='#c2c2c2'
                            size={30*s}
                        />
                        <Text style={styles.liststext}>{lists[1].title.text}</Text>
                    </View>
                    <FlatList 
                        style={styles.listscontent}
                        data={lists[1].data}
                        numColumns={3}
                        renderItem={({item})=>(
                           <View
                                style={{backgroundColor:'#000'}}
                                style={styles.listsdata}>
                                    <Icon
                                    onPress={()=>{
                                        if(item.icon === 'form'){
                                            Actions.form()
                                        }
                                    }}
                                    style={styles.listsicon} 
                                    name={item.icon}
                                    color='#c2c2c2'
                                    size={30*s}
                                />
                                <Text style={styles.liststext}>{item.text}</Text>
                            </View>
                        )}
                    />
                    <View style={{
                        width:205*s,
                        height:25*s,
                        marginLeft:'auto',
                        marginRight:'auto',
                        paddingTop:25*s,
                        textAlign:'center',
                        paddingBottom:30*s
                        
                    }}>
                        <View style={{
                            height:30,
                            flexDirection:'row',
                            width:205*s,
                            justifyContent:'center',
                            alignItems:'center',
                            color:'#808080'
                        }}>
                            <Text style={{fontSize:14.5*s}}>
                                BINNU DHILLON  |  
                            </Text>
                            <Text 
                                onPress={this.checkout}
                                style={{
                                    marginLeft:5,
                                    backgroundColor:'#f23030',
                                    width:50,
                                    color:'#fff',
                                    height:25,
                                    fontSize:20*s,
                                    borderRadius:10,
                                    textAlignVertical:'center',
                                    textAlign:'center',
                                }}
                            >退出</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title:{
        height:330*s,
        backgroundColor:'#f23030'
    },
    titlepic:{
        width:212*s,
        height:210*s,
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:50*s,
    },
    liststitle:{
        backgroundColor:'#ffffff',
        marginBottom:1,
        flexDirection:'row',
        height:50*s,
        alignItems: 'center'
    },
    titleline:{
        marginLeft:20*s,
        marginRight:20*s
    },
    listscontent:{
        backgroundColor:'#ffffff',
        paddingTop:30*s

    },
    listsdata:{
        width:212*s,
        marginBottom:23*s
    },
    listsicon:{
        width:40*s,
        height:40*s,
        marginLeft:'auto',
        marginRight:'auto'
    },
    liststext:{
        color:'#4f4e4e',
        fontSize:18*s,
        textAlign:'center'
    }
})


// if(this.state.username&&this.state.pwd&&this.state.confirm){
//     if(this.state.pwd === this.state.confirm){
//         myFetch.post('/register',{
//             username:this.state.username,
//             pwd:this.state.pwd
//         }).then(
//             res=>{
//                 console.log(res.data)
//                 var user={
//                     username:this.state.username,
//                     pwd:this.state.pwd
//                 }
//                 AsyncStorage.setItem('users',JSON.stringify(user))
//                 .then(()=>{
//                     Actions.login()
//                 })
//             }
//         )
//     }else{
//         ToastAndroid.show('两次输入的密码不一致，请重新输入！',ToastAndroid.SHORT)
//     }
// }else{
//     if(!this.state.username){
//         ToastAndroid.show('请输入账号',ToastAndroid.SHORT)
//     }else{
//         if(!this.state.pwd){
//             ToastAndroid.show('请输入密码',ToastAndroid.SHORT)
//         }else{
//             if(!(/(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^[^\s\u4e00-\u9fa5]{8,14}$/.test(this.state.pwd))){
//                 ToastAndroid.show('密码长度为8-14个字符；字母/数字/标点符号至少两种；不能有空格和汉字',ToastAndroid.SHORT)
//             }
//         }
        
//         if(this.state.pwd&&!this.state.confirm){
//             ToastAndroid.show('请确认密码',ToastAndroid.SHORT)
//         }
//     }
// }