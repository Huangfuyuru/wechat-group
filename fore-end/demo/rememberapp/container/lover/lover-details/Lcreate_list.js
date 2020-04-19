import React, { Component } from 'react'
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    Alert,
    ToastAndroid
} from "react-native"
import Icon1 from 'react-native-vector-icons/Feather'
import Icon2 from "react-native-vector-icons/Octicons"
import { Actions } from "react-native-router-flux"
import { WingBlank } from "@ant-design/react-native"
import { ScrollView } from 'react-native-gesture-handler'
const { width, scale, height } = Dimensions.get('window');
const s = width / 640;
export default class Lcreate_list extends Component {
    constructor(){
        super()
        this.state={
            img:'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1354279089,2926899578&fm=26&gp=0.jpg',
        }
    }
    alertMsg=()=>{
        Alert.alert(
            '提示',
            '确认提交？',
            [
                {text: '确定', onPress: () =>{ 
                    Actions.pop()
                    ToastAndroid.show('提交成功！', ToastAndroid.SHORT)
                }},
                {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            ],
        );
    }
    render() {
        return (
            <View>
                <View style={styles.navbar}>
                    <Icon1
                        style={styles.icon}
                        name='chevron-left'
                        onPress={() => Actions.pop()}
                    />
                    <Text style={styles.title}>填写清单</Text>
                </View>
                <View style={{
                    height:800*s,
                    borderWidth:0.5,
                    borderColor:"black",
                    marginRight:"auto",
                    marginLeft:"auto",
                    borderRadius:15,
                    width:0.9*width,
                    marginTop:50*s
                }}>
                <View style={styles.msg}>
                <Icon1 
                    style={{
                        position:"absolute",
                        top:15*s,
                        left:15*s,
                        fontSize:20,
                        color:"#FF1744"
                    }}
                    name="calendar"/>
                    <Text style={styles.text}>
                        打卡时间：</Text>
                    <TextInput
                        maxLength={10}
                        placeholder='例2020-02-16'
                        style={styles.input} />
                </View>
                <View style={styles.msg}>
                    <Icon2
                    style={{
                        position:"absolute",
                        top:15*s,
                        left:15*s,
                        fontSize:20,
                        color:"#FF1744"

                    }}
                     name="location"/>

                    <Text style={styles.text}>
                        打卡地点：</Text>
                    <TextInput
                        maxLength={10}
                        placeholder='例北京'
                        style={styles.input} />
                </View>
                <TouchableOpacity
                        style={styles.coverbox}>
                        <Text
                        style={styles.textbtn}>轻触设置封面</Text>
                        <Image
                            style={styles.cover}
                            resizeMode="contain"
                            source={{ uri: this.state.img }}
                        ></Image>
                </TouchableOpacity>
                    <TextInput style={{
                         width:0.8*width,
                         height:170*s,
                         alignContent:'center',
                         marginLeft:'auto',
                         marginRight:'auto',
                         marginTop:30*s,
                         backgroundColor:"pink",
                         textDecorationLine:"line-through",
                         textAlignVertical: 'top',
                         borderRadius:15
                    }}
                    placeholder="用一段话记录"
                    multiline={true}
                    >
                    </TextInput>
                    <TouchableOpacity style={{
                        width:0.4*width,
                        height:60*s,
                        borderColor:"#000",
                        borderWidth:1,
                        borderRadius:10,
                        marginLeft:"auto",
                        marginRight:"auto",
                        marginTop:90*s
                    }}
                    onPress={this.alertMsg}
                    >
                        <Text
                        style={{
                            textAlign:"center",
                            textAlignVertical:"center",
                            lineHeight:48*s,
                            fontSize:28*s
                        }}
                        >提交</Text>
                    </TouchableOpacity>
                    </View>
                    
            </View>

        )
    }
}
const styles = StyleSheet.create({
    navbar: {
        width: width,
        height: 65 * s,
        backgroundColor: 'white',
        flexDirection: 'row',
        paddingLeft: 0.03 * width,
        paddingTop: '1%',
        paddingRight: 0.03 * width,
        justifyContent: "center",
    },
    icon: {
        width: 0.08 * width,
        color: 'black',
        fontSize: 28,
    },
    title: {
        marginLeft: 'auto',
        marginRight: "auto",
        textAlign: 'center',
        fontSize: 20,
        color: 'black',
        letterSpacing: 3
    },
    msg: {
        width: 0.8 * width,
        height: 60 * s,
        marginTop: 10 * s,
        flexDirection: 'row',
        justifyContent: 'center',
        marginLeft:"auto",
        marginRight:"auto",
    },
    text: {
        textAlign: 'center',
        textAlignVertical: 'center',
        width: 0.3 * width,
        fontSize: 26 * s,
        color: '#333',
    },
    input: {
        width: 0.4 * width,
        borderColor: '#bdbbb8',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        fontSize: 26 * s,
        textAlign: 'center',
        color: '#333',
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
})