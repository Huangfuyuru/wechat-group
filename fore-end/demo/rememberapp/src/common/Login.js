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
const {width,scale} = Dimensions.get('window');
const s = width / 640;
export default class Login extends Component {
    constructor(){
        super();
        this.state = {
            username:'',
            pwd:'',
            isloading:false,
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
    login =()=>{
        this.setState({
            isloading:true
        })
        myFetch.get('/one')
        myFetch.post('/login',{
            username:this.state.username,
            pwd:this.state.pwd}
        ).then(
            res=>{
                if(this.state.username&&this.state.pwd){
                    AsyncStorage.setItem('isLogin','true')
                    AsyncStorage.setItem('user',JSON.stringify(res.data))
                    .then(()=>{
                        ToastAndroid.show(res.data.msg,ToastAndroid.SHORT)
                        Actions.lightbox()
                    })
                }else{
                    this.setState({
                        isloading:false
                    })
                    ToastAndroid.show('账号或密码不正确！',ToastAndroid.SHORT)
                }
            }
        )
    }
  render() {
    return (
    <View>
        <View style={{
            height:260*s,
            backgroundColor:'#f23030',
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
            }}
        >
            <View
                style={{ 
                    alignItems: 'center',
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
                <TouchableOpacity 
                    style={{
                        width: '80%',
                        height: 45,
                        backgroundColor: '#f23030',
                        marginTop: 35,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={this.login}>
                    <Text style={styles.font}>登录</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{
                        width: '80%',
                        height: 45,
                        backgroundColor: '#ccc',
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
        fontSize:18
    }
});