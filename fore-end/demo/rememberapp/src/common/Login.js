import React, {Component} from 'react';
import {
    View, 
    Text, 
    Image, 
    StyleSheet,
    TextInput, 
    Dimensions,
    TouchableOpacity,
    AsyncStorage,
    ToastAndroid
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {myFetch} from '../utils'
const {width,scale,height} = Dimensions.get('window');
const s = width / 640;
export default class Login extends Component {
    constructor(){
        super();
        this.state = {
            username:'',
            email:'',
            pwd:'',
            isloading:false,
        }
    }
    userhandle =(text)=>{
        this.setState({
           email:text
        })
    }
    userfocus=()=>{
        ToastAndroid.showWithGravityAndOffset(
            '请输入您已注册的邮箱账号',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
        0,-250)
    }
    pwdhandle =(text)=>{
        this.setState({
            pwd:text
        })
    }
    login =()=>{
        if(!(/[0-9a-zA-Z_]{0,19}@[0-9a-zA-Z]{1,13}\.[com,cn,net]{1,3}/.test(this.state.email))){
            ToastAndroid.show('请输入正确的邮箱账号！',ToastAndroid.SHORT)
            return false;
        }else{
            if(this.state.email&&this.state.pwd){
                myFetch.post('/login',{
                    email:this.state.email,
                    upass:this.state.pwd
                }).then(
                    res=>{
                        if(res.code == 0){
                            this.setState({
                                isloading:true
                            })
                            console.log(res)
                            AsyncStorage.setItem('isLogin','true')
                            AsyncStorage.setItem('user',JSON.stringify(res.data))
                            .then(()=>{
                                ToastAndroid.show(res.msg,ToastAndroid.SHORT)
                                Actions.lightbox()
                            })
                        }else{
                            this.setState({
                                isloading:false
                            })
                            ToastAndroid.show(res.msg,ToastAndroid.SHORT)
                        }
                    }
                )
            }else{
                ToastAndroid.showWithGravityAndOffset(
                    '账号不能为空',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
                0,-250)
            }
        }
    }
  render() {
    return (
    <View>
        <View style={{
            height:260*s,
            backgroundColor:'#FFBF2D',
            marginBottom:120*s,
        }}>
            <Image 
                style={{
                    marginLeft:'auto',
                    marginRight:'auto',
                    marginTop:200*s
                }}
                source={require('../../android/app/src/main/res/mipmap-xhdpi/ic_launcher_round.png')}
            />
        </View>

        <View 
            style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <View
                style={{ 
                    alignItems: 'center',
                }}
            >
                <View style={styles.msg}>
                    <View style={styles.line}>
                        <Icon1 name="verified-user" style={styles.icon}/>
                        <TextInput
                            style={styles.input} 
                            onFocus={this.userfocus}
                            onChangeText={this.userhandle}
                            placeholder="邮箱" 
                        />
                    </View>
                    <View style={styles.line}>
                        <Icon2 name="shield-key" style={styles.icon}/>
                        <TextInput 
                            style={styles.input}
                            maxLength={14}
                            placeholder="密码" 
                            onChangeText={this.pwdhandle}
                            secureTextEntry={true} 
                        />
                    </View>
                </View>
                <TouchableOpacity 
                    style={{
                        width: 0.8*width,
                        height: 0.065*height,
                        backgroundColor: '#FFBF2D',
                        marginTop: 35,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={this.login}>
                    <Text style={styles.font}>登录</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{
                        width: 0.8*width,
                        height: 0.065*height,
                        backgroundColor: '#ddd',
                        marginTop: 8,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={()=>Actions.register()}>
                    <Text style={styles.font}>注册</Text>
                </TouchableOpacity>
            </View>
            {
                this.state.isloading
                ?<View
                    style={{
                        width:'100%',
                        marginTop:30
                    }}>
                    <Text
                        style={{
                            width:'60%',
                            height:50,
                            marginLeft:'auto',
                            textAlign:'center',
                            marginRight:'auto',
                            fontSize:20,
                            color:'#333',
                            textAlignVertical:'center',
                            borderRadius:10,
                            backgroundColor:'rgba(255,255,255,0.7)'
                        }}
                    >登陆中……</Text>
                </View>
                :null
            }
        </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
    msg:{
        width:0.8*width,
        height:0.2*height,
        justifyContent:'center',
        // backgroundColor:"#ccc"
    },
    line:{
        width: 0.8*width,
        marginRight: 10,
        height:0.08*height,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
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
});