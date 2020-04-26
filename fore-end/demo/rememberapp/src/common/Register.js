import React, {Component} from 'react';
import {
    View, 
    Text, 
    Image, 
    StyleSheet,
    TextInput, 
    TouchableOpacity,
    AsyncStorage,
    ToastAndroid,
    Dimensions,
    Button
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/AntDesign';
import Icon4 from 'react-native-vector-icons/Feather'
import Icon5 from 'react-native-vector-icons/FontAwesome'
import {myFetch} from '../utils'
// import Button from 'react-native-button';
const {width,scale,height} = Dimensions.get('window');
const s = width / 640;
export default class Login extends Component {
    constructor(){
        super();
        this.state = {
            btndisabled:false,
            btntitle:'获取验证码',
            username:'',
            email:'',
            pwd:'',
            conpwd:'',
            confirm:'',
            isloading:false
        }
    }
    confirmhandle =(text)=>{
        this.setState({
            confirm:text
        })
    }
    emailhandle =(text)=>{
        this.setState({
            email:text
        })
    }
    pwdhandle =(text)=>{
        this.setState({
            pwd:text
        })
    }
    conpwdhandle =(text)=>{
        this.setState({
            conpwd:text
        })
    }
    confirmfocus = ()=>{
        ToastAndroid.showWithGravityAndOffset(
            '请输入6位验证码',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
        0,-350)
    }
    emailfocus = ()=>{
        ToastAndroid.showWithGravityAndOffset(
            '请输入您的邮箱地址',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
        0,-350)
    }
    pwdfocus = ()=>{
        ToastAndroid.showWithGravityAndOffset(
            '密码长度为8-14个字符；至少要包含字母/数字/标点符号两种；不能含有空格和汉字',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
        0,-350)
    }
    conpwdfocus = ()=>{
        ToastAndroid.showWithGravityAndOffset(
            '请再次输入密码',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
        0,-350)
    }
    getconfirm = ()=>{
        if(!this.state.email){
            ToastAndroid.show('请输入邮箱',ToastAndroid.SHORT)
        }else{
            myFetch.post('/resign/email',{
                email:this.state.email,
            }).then(
                res=>{
                    if(res.code == 0){
                        var num = 30
                        var timer = setInterval(()=>{
                            num--;
                            if(!num){
                                num = 30;
                                clearInterval(timer)
                                this.setState({
                                    btndisabled:false,
                                    btntitle:'获取验证码'
                                })
                            }
                            if(num<30){
                                this.setState({
                                    btndisabled:true,
                                    btntitle:num+' s后可重新获取'
                                })
                            }
                            
                        },1000)
                        ToastAndroid.show(res.msg,ToastAndroid.SHORT)
                    }else{
                        ToastAndroid.show(res.msg,ToastAndroid.SHORT)
                    }
                }
            )    
        }
    }
    register =()=>{
        if(!this.state.email){
            ToastAndroid.show('请输入账号',ToastAndroid.SHORT);
            return false;
        }else{
            if(!(/[0-9a-zA-Z_]{0,19}@[0-9a-zA-Z]{1,13}\.[com,cn,net]{1,3}/.test(this.state.email))){
                ToastAndroid.show('请输入正确的邮箱地址！',ToastAndroid.SHORT)
                return false;
            }
        }
        if(!this.state.pwd){
            ToastAndroid.show('请输入密码',ToastAndroid.SHORT);
            return false;
        }else{
            if(!(/(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^[^\s\u4e00-\u9fa5]{8,14}$/.test(this.state.pwd))){
                ToastAndroid.show('密码长度至少为8个字符；至少包括字母/数字/标点符号中的两种；不能含有空格和汉字',ToastAndroid.SHORT)
            }else{
                if(this.state.pwd === this.state.conpwd){
                    var name = '用户'+this.state.email.slice(0,6);
                    this.setState({
                        username:name
                    },()=>{
                        myFetch.post('/resign/message',{
                            name:this.state.username,
                            email:this.state.email,
                            pass:this.state.pwd,
                            confirm:this.state.confirm
                        }).then(
                            res=>{
                                console.log(res)
                                ToastAndroid.show(res.msg+'  正在跳转登录页',ToastAndroid.SHORT)
                                setTimeout(()=>{
                                    Actions.login();
                                },3000)
                            }
                        )
                    })
                }else{
                    ToastAndroid.show('两次输入的密码不一致，请重新输入！',ToastAndroid.SHORT)
                    return false;
                }
            }
        }
        if(!this.state.conpwd){
            ToastAndroid.show('请确认密码',ToastAndroid.SHORT)
            return false;
        }  
        if(!this.state.confirm){
            ToastAndroid.show('请输入验证码',ToastAndroid.SHORT)
            return false;
        }      
    }
  render() {
    return (
      <View>
            <View style={{
                height:260*s,
                backgroundColor:'#FFBF2D',
                paddingLeft:'2.5%',
                paddingRight:'2.5%',
                paddingTop:10,
                flexDirection:'row',
            }}>
                <Icon4 
                    onPress={()=>Actions.pop()}
                    name='chevron-left'
                    style={{
                        width:'15%',
                        height:50,
                        fontSize:30,
                        color:'#fff'
                    }}
                />
                <Text 
                    style={{
                        width:'70%',
                        height:50,
                        textAlignVertical:'center',
                        borderRadius:10,
                        backgroundColor:'rgba(255,255,255,0.4)',
                        marginTop:100*s,
                        textAlign:'center',
                        fontSize:20,
                        color:'#fff',
                    }}
                >
                    注册
                </Text>
            </View>

            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height:0.6*height,
                }}
            >
                <View style={styles.line}>
                    <Icon1 name="verified-user" style={styles.icon}/>
                    <TextInput
                        style={styles.input} 
                        placeholder="邮箱账号" 
                        onFocus={this.emailfocus}
                        onChangeText={this.emailhandle}
                    />
                </View>
                <View style={styles.line}>
                    <Icon1 name="" style={styles.icon}/>
                    <TextInput
                        maxLength={6}
                        style={styles.input} 
                        placeholder="验证码" 
                        onFocus={this.confirmfocus}
                        onChangeText={this.confirmhandle}
                    />
                    <Button
                        disabled={this.state.btndisabled}
                        onPress={this.getconfirm}
                        title={this.state.btntitle}
                        color='#FFBF2D'
                    />
                    {/* <Button
                        onPress={this.getconfirm}
                        style={styles.codebutton}>获取验证码</Button> */}
                </View>
                <View style={styles.line}>
                    <Icon2 name="shield-key" style={styles.icon}/>
                    <TextInput 
                        maxLength={14}
                        style={styles.input} 
                        placeholder="设置密码" 
                        onFocus={this.pwdfocus}
                        onChangeText={this.pwdhandle}
                        secureTextEntry={true} 
                    />
                </View>
                <View style={styles.line}>
                    <Icon2 name="check-circle" style={styles.icon}/>
                    <TextInput 
                        style={styles.input}
                        placeholder="确认密码"
                        onFocus={this.conpwdfocus} 
                        onChangeText={this.conpwdhandle}
                        secureTextEntry={true} 
                    />
                </View>
                <TouchableOpacity 
                    style={styles.btn}
                    onPress={this.register}
                >
                    <Text style={styles.font}>立即注册</Text>
                </TouchableOpacity>
            </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    line:{
        width: 0.8*width,
        marginRight: 10,
        height:0.07*height,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 0.03*width,
    },
    icon:{
        // backgroundColor:'#ccc',
        color:'#FFBF2D',
        fontSize:28,
        width:0.1*width,
        textAlign:'left'
    },
    font:{
        color:'#fff',
        fontSize:27*s,
        letterSpacing:5,
        fontWeight:'bold'
    },
    input:{
        // backgroundColor:'#ccc',
        width:0.42*width,
        fontSize:23*s,
    },
    codebutton:{
        backgroundColor:'#FFBF2D',
        width:0.25*width,
        height:0.05*height,
        textAlignVertical:'center',
        textAlign:'center',
        color:'#fff',
        borderRadius:5,
        borderWidth:5,
        borderColor:'rgba(221, 221, 221,0.2)',
    },
    btn:{
        width: 0.8*width,
        height: 0.065*height,
        backgroundColor: '#FFBF2D',
        marginTop: 35,
        alignItems: 'center',
        justifyContent: 'center'
    }
});