import React, { Component } from 'react'
import { 
    Text, 
    TextInput,
    StyleSheet, 
    Dimensions, 
    View, 
    Image, 
    TouchableOpacity, 
    AsyncStorage,
    ToastAndroid,
    StatusBar,
    ScrollView,
    Picker,
} from 'react-native'
import {
    Actions
} from 'react-native-router-flux'
import { Flex, WingBlank } from '@ant-design/react-native'
import Button from 'react-native-button';

import Icon2 from 'react-native-vector-icons/FontAwesome5'
import Icon3 from 'react-native-vector-icons/Feather'
import Icon4 from 'react-native-vector-icons/FontAwesome'

//引入组件
import {myFetch} from '../../src/utils'

const { width, scale, height } = Dimensions.get('window');
const s1 = width / 640;
const h = height / 1012;

export default class Use extends Component {
    constructor(){
        super();
        this.state={
            name:'',
            pass:'',
            sex:'女',
            uid:'',
            code:1
        }
    }
    componentDidMount(){
        AsyncStorage.getItem('user').
        then((res)=>{
            var user = JSON.parse(res)
            this.setState({
                uid:user.id,
            })
            myFetch.get('/my/information/password',{
                uid:this.state.uid
            }).then(res=>{
                if(res){
                    this.setState({
                        pass:res.data.pass
                    })
                    console.log(this.state.pass);
                }else{
                    console.log('请求失败');
                }
            })
        })
    }
    additem=()=>{
        AsyncStorage.getItem('user').
        then((res)=>{
            var user = JSON.parse(res)
            this.setState({
                uid:user.id,
            })
            console.log(this.state.name,this.state.sex,this.state.uid,this.state.pass);
            myFetch.post('/my/information/',{
                name:this.state.name,
                pass:this.state.pass,
                gender:this.state.sex,
                uid:user.id,
            }).then(
                res=>{
                    if(res.code == 0){
                        console.log('这是code'+res.code);
                        this.setState({
                            code:res.code
                        })
                        ToastAndroid.showWithGravityAndOffset(
                            '修改成功！',
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER,
                        25,-200)
                        setTimeout(() => {
                            Actions.pop() 
                        }, 3000);
                    }
                    else{
                        ToastAndroid.showWithGravityAndOffset(
                            '修改失败！',
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER,
                        25,-200)
                        console.log('这是code'+res.code);
                    }
                }   
            )
        })
    }
    leave=()=>{
        AsyncStorage.setItem('isLogin','false');
        AsyncStorage.removeItem('user',(res)=>{
            console.log(res)
            if(!res){
                ToastAndroid.show('已清除登录信息！', ToastAndroid.SHORT);
                setTimeout(()=>{
                    Actions.login()
                },1000)
            }else{
                ToastAndroid.show('退出失败，请重新操作！', ToastAndroid.SHORT);
            }
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
                    <Icon3 
                        style={styles.icon}
                        name='chevron-left'
                        onPress={()=>Actions.pop()}
                    />
                    <Text style={styles.title}>设置</Text>
                </View>
                <WingBlank style={styles.wingblank}>
                    {/*创建爱人 */}
                    <View style={styles.msgbox}>
                        <View style={styles.msg}>
                            <Text style={styles.text}>
                                <Icon3 style={styles.listlineicon} name='users'/>选择性别</Text>
                            <Text style={styles.input}>
                                <Picker
                                    selectedValue={this.state.sex}
                                    mode='dropdown'
                                    style={{width:0.15*width}}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({
                                            sex: itemValue,
                                        })
                                    }>
                                    <Picker.Item label="男" value="男" />
                                    <Picker.Item label="女" value="女" />
                                </Picker>
                            </Text>
                        </View>
                        <View style={styles.msg}>
                            <Text style={styles.text}>
                                <Icon4 style={styles.listlineicon} name='heart'/>更换昵称</Text>
                            <TextInput
                                maxLength={6}
                                onFocus={()=>{
                                    ToastAndroid.showWithGravityAndOffset(
                                        '请保证昵称不多于6个字！',
                                    ToastAndroid.SHORT,
                                    ToastAndroid.TOP,
                                    25,100)
                                }}
                                onChangeText={(text) => { this.state.name= text }}
                                style={styles.input}/>
                        </View>
                        <View style={styles.msg}>
                            <Text style={styles.text}>
                                <Icon2 style={styles.listlineicon} name='eye'/>
                                 更换密码</Text>
                            <TextInput
                                maxLength={15}
                                onChangeText={(text) => { this.state. pass= text }}
                                style={styles.input}/>
                        </View>
                    </View>
                    <Button
                        onPress={this.additem} 
                        style={styles.addbtn}>保存设置</Button>
                    <Button
                        onPress={this.leave} 
                        style={styles.leave}>退出登录</Button>
                </WingBlank>
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
        letterSpacing:3,
        fontWeight:'bold'
    },
    create:{
        width:0.8*width,
        height:0.07*height,
        marginLeft:'auto',
        marginRight:'auto',
        justifyContent:'space-around',
        alignItems:'center'
    },
    wingblank:{
        height:0.85*height,
        marginTop:0.05*height,
    },
    msgbox:{
        backgroundColor:'rgba(204,204,204,0.2)',
        width:0.8*width,
        height:0.35*height,
        paddingBottom:0.025*height,
        paddingTop:0.025*height,
        marginLeft:'auto',
        marginRight:'auto',
        justifyContent:'space-around',
        alignItems:'center'
    },
    msg:{
        backgroundColor:'rgba(255,255,255,1)',
        width:0.7*width,
        height:0.06*height,
        marginLeft:'auto',
        marginRight:'auto',
        flexDirection: 'row',
        justifyContent:'center',
    },
    listlineicon:{
        fontSize:32*s1,
        color:'#FFBF2D',
    },
    text:{
        textAlign:'center',
        textAlignVertical:'center',
        width:0.3*width,
        fontSize:23*s1,
        color:'#555',
    },
    text2:{
        textAlign:'left',
        textAlignVertical:'center',
        width:0.07*width,
        fontSize:23*s1,
        color:'#555',
    },
    input:{
        width:0.25*width,
        marginLeft:0.025*width,
        marginRight:0.025*width,
        borderColor:'#bdbbb8',
        borderStyle:'solid',
        borderBottomWidth:1,
        fontSize:23*s1,
        textAlign:'center',
        color:'#333'
    },
    addbtn:{
        width:0.6*width,
        height:60*s1,
        marginTop:30*s1,
        marginLeft:'auto',
        marginRight:'auto',
        backgroundColor:'rgba(255,255,255,0.1)',
        borderWidth:1,
        borderStyle:'solid',
        borderColor:'#FFBF2D',
        borderRadius:5,
        color:'#FFBF2D',
        fontSize:17,
        textAlignVertical:'center'
    },
    leave:{
        width:0.6*width,
        height:60*s1,
        marginTop:30*s1,
        marginLeft:'auto',
        marginRight:'auto',
        backgroundColor:'#FFBF2D',
        borderRadius:25,
        color:'white',
        fontSize:17,
        textAlignVertical:'center'
    }
})