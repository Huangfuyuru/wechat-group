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
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/AntDesign';
import {myFetch} from '../utils'
const {width,scale} = Dimensions.get('window');
const s = width / 640;
export default class Login extends Component {
    constructor(){
        super();
        this.state = {
            username:'',
            pwd:'',
            confirm:'',
            isloading:false
        }
    }
    userhandle =(text)=>{
        this.setState({
            username:text
        })
    }
    pwdhandle =(text)=>{
        this.setState({
            pwd:text
        })
    }
    confirmhandle =(text)=>{
        this.setState({
            confirm:text
        })
    }
    register =()=>{
        if(!this.state.username){
            ToastAndroid.show('请输入账号',ToastAndroid.SHORT);
            return false;
        }
        if(!this.state.pwd){
            ToastAndroid.show('请输入密码',ToastAndroid.SHORT);
            return false;
        }else{
            if(!(/(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^[^\s\u4e00-\u9fa5]{8,14}$/.test(this.state.pwd))){
                ToastAndroid.show('密码长度为8-14个字符；字母/数字/标点符号至少两种；不能有空格和汉字',ToastAndroid.SHORT)
            }else{
                if(this.state.pwd === this.state.confirm){
                    myFetch.post('/register',{
                        username:this.state.username,
                        pwd:this.state.pwd
                    }).then(
                        res=>{
                            ToastAndroid.show(res.data.msg+' 1s后跳转登录页',ToastAndroid.SHORT)
                            var user={
                                username:res.data.username,
                                pwd:res.data.pwd
                            }
                            AsyncStorage.setItem('users',JSON.stringify(user))
                            setTimeout(()=>{
                                Actions.login()
                            },1000)
                        }
                    )
                }else{
                    ToastAndroid.show('两次输入的密码不一致，请重新输入！',ToastAndroid.SHORT)
                    return false;
                }
            }
        }
        if(!this.state.confirm){
            ToastAndroid.show('请确认密码',ToastAndroid.SHORT)
            return false;
        }        
    }
  render() {
    return (
      <View>
            <View style={{
                height:260*s,
                backgroundColor:'#f23030',
                marginBottom: 60*s,
                paddingLeft:'2.5%',
                paddingRight:'2.5%',
                paddingTop:10,
                flexDirection:'row',
            }}>
                <Icon3 
                    onPress={()=>Actions.pop()}
                    name='left'
                    style={{
                        width:'15%',
                        height:50,
                        fontSize:20,
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
                    height:'50%'
                }}
            >
                <View style={styles.line}>
                    <Icon1 name="verified-user" style={styles.icon}/>
                    <TextInput
                        style={{fontSize:16}} 
                        placeholder="账号" 
                        onChangeText={this.userhandle}
                    />
                </View>
                <View style={styles.line}>
                    <Icon2 name="shield-key" style={styles.icon}/>
                    <TextInput 
                        style={{fontSize:16}} 
                        placeholder="密码" 
                        onChangeText={this.pwdhandle}
                        secureTextEntry={true} 
                    />
                </View>
                <View style={styles.line}>
                    <Icon3 name="checkcircleo" style={styles.icon}/>
                    <TextInput 
                        style={{fontSize:16}} 
                        placeholder="确认密码" 
                        onChangeText={this.confirmhandle}
                        secureTextEntry={true} 
                    />
                </View>
                <TouchableOpacity 
                    style={{
                        width: '80%',
                        height: 46,
                        backgroundColor: '#f23030',
                        marginTop: 35,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
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
        width: '80%',
        marginRight: 10,
        height:60,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
    },
    icon:{
        color:'#f23030',
        fontSize:25,
        marginRight:15
    },
    font:{
        color:'#fff',
        fontSize:18,
        letterSpacing:5,
        fontWeight:'bold'
    }
});