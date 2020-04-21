import React, { Component } from 'react'
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    Alert,
    ToastAndroid
} from "react-native"
import moment from 'moment'
import Icon1 from 'react-native-vector-icons/Feather'
import Icon2 from "react-native-vector-icons/Entypo"
import Icon3 from "react-native-vector-icons/FontAwesome5"
import Icon4 from "react-native-vector-icons/Ionicons"
import Icon5 from 'react-native-vector-icons/FontAwesome'
import Icon6 from 'react-native-vector-icons/AntDesign'
import Icon7 from 'react-native-vector-icons/MaterialCommunityIcons'
import { Actions } from "react-native-router-flux"
import { WingBlank } from '@ant-design/react-native'
import Button from 'react-native-button'
const { width, scale, height } = Dimensions.get('window');
const s = width / 640;
export default class Lcreate_sound extends Component {
    constructor() {
        var date = moment( new Date()).format("YYYY-MM-DD").split('-');
        super();
        this.state = {
            year:date[0],
            month:date[1],
            day:date[2],
            img: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1097372906,871370388&fm=26&gp=0.jpg',
        }
    }
    alertMsg = () => {
        Alert.alert(
            '提示',
            '确认创建？',
            [
                {
                    text: '确定', onPress: () => {
                        Actions.pop()
                        ToastAndroid.show('创建成功！', ToastAndroid.SHORT)
                    }
                },
                { text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            ],
        );
    }
    render() {
        const src = this.state.img
        return (
            <View>
                <View style={styles.navbar}>
                    <Icon1
                        style={styles.icon}
                        name='chevron-left'
                        onPress={() => Actions.pop()}
                    />
                    <Text style={styles.title}>新增语音</Text>
                </View>
                <WingBlank style={styles.wingblank}>
                    <View style={styles.msgbox}>
                        <View style={styles.msg}>
                            <Text style={styles.text}>
                                <Icon5 style={styles.listlineicon} name='calendar-check-o'/>  日期：</Text>
                            <TextInput
                                onFocus={this.timenotice}
                                keyboardType='numeric'
                                maxLength={4}
                                defaultValue={this.state.year}
                                style={styles.input}/>
                            <Text style={styles.unit}>
                                年
                            </Text>
                            <TextInput
                                onFocus={this.timenotice}
                                keyboardType='numeric'
                                maxLength={2}
                                defaultValue={this.state.month}
                                style={styles.input}/>
                            <Text style={styles.unit}>
                                月
                            </Text>
                            <TextInput
                                onFocus={this.timenotice}
                                keyboardType='numeric'
                                maxLength={2}
                                defaultValue={this.state.day}
                                style={styles.input}/>
                            <Text style={styles.unit}>
                                日
                            </Text>
                        </View>
                        <View style={styles.msg}>
                            <Text style={styles.text}>
                                <Icon6 style={styles.listlineicon} name='edit'/>  名称：</Text>
                            <TextInput
                                maxLength={10}
                                placeholder='第一次去旅行'
                                style={styles.tag}/>
                        </View>
                    </View>
                    <View style={styles.viocechoose}>
                        <Text style={styles.viocetext}>添加语音</Text>
                        <TouchableOpacity style={styles.viocebtn}>
                            <Icon7 size={45*s} style={styles.iconvioce} name='audiobook'/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.viocebtn}>
                            <Icon4 size={48*s} style={styles.iconvioce} name='md-mic'/>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.vioce}>

                    </Text>
                    <Button
                    onPress={this.additem} 
                    style={styles.addbtn}>创建相册</Button>
                </WingBlank>
            </View>

        )
    }
}
const styles = StyleSheet.create({
    navbar:{
        width:width,
        height:65*s,
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
        letterSpacing:3
    },
    wingblank:{
        // backgroundColor:'#ccc',
        height:0.75*height,
        marginTop:0.025*height
    },
    msgbox:{
        // backgroundColor:'rgba(204,204,204,0.2)',
        // backgroundColor:'rgba(204,204,204,0.1)',
        width:0.9*width,
        height:0.18*height,
        paddingBottom:0.01*height,
        paddingTop:0.01*height,
        // backgroundColor:'#000',
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:0.015*height,
        justifyContent:'space-around',
        alignItems:'center'
    },
    msg:{
        backgroundColor:'rgba(255,255,255,1)',
        // backgroundColor:'rgba(204,204,204,0.2)',
        width:0.85*width,
        height:0.06*height,
        marginLeft:'auto',
        marginRight:'auto',
        flexDirection: 'row',
        justifyContent:'center',
    },
    listlineicon:{
        fontSize:35*s,
        color:'#FFBF2D',
        // backgroundColor:'#ccc'
    },
    text:{
        textAlign:'center',
        marginRight:0.02*width,
        textAlignVertical:'center',
        width:0.19*width,
        fontSize:23*s,
        color:'#555',
        // backgroundColor:'#000'
    },
    input:{
        width:0.13*width,
        borderColor:'#bdbbb8',
        borderStyle:'solid',
        borderBottomWidth:1,
        fontSize:22*s,
        textAlign:'center',
        color:'#333'
    },
    unit:{
        textAlign:'center',
        marginLeft:0.003*width,
        marginRight:0.003*width,
        textAlignVertical:'center',
        width:0.03*width,
        fontSize:23*s,
        color:'#555',
    },
    tag:{
        width:0.5*width,
        // backgroundColor:'#ccc',
        textAlign:'center',
        textAlignVertical:'center',
        borderColor:'#bdbbb8',
        borderStyle:'solid',
        borderBottomWidth:1,
        fontSize:25*s,
        color:'#333'
    },
    textbtn: {
        textAlign: 'center',
        textAlignVertical: 'center',
        width: 0.25 * width,
        height: 45 * s,
        fontSize: 26 * s,
        color: '#333',
        textAlignVertical: 'center',
    },
    viocechoose:{
        // backgroundColor:'rgba(255,255,255,1)',
        backgroundColor:'rgba(204,204,204,0.2)',
        borderRadius:5,
        paddingTop:0.01*height,
        width:0.85*width,
        height:0.06*height,
        marginTop:0.05*height,
        marginLeft:'auto',
        marginRight:'auto',
        flexDirection: 'row',
        justifyContent:'center',
    },
    viocetext:{
        width:0.3*width,
        height:0.04*height,
        // backgroundColor:'#ddd',
        marginRight:0.25*width,
        color:'#555',
        fontSize:25*s,  
        textAlign:'center' ,
        textAlignVertical:'center', 
    },
    iconvioce:{
        width:0.15*width,
        textAlign:'center',
        height:0.04*height,
        textAlignVertical:'center',
        // backgroundColor:'#ccddff',
        color:'#FFBF2D'
    },
    vioce:{
        width:0.85*width,
        height:0.1*height,
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:0.01*height,
        textAlignVertical:'center',
        textAlign:'center',
        backgroundColor:'rgba(204,204,204,0.2)',
    },
    addbtn:{
        width:0.8*width,
        height:80*s,
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:0.1*height,
        backgroundColor:'rgba(255,255,255,0.1)',
        borderWidth:1,
        borderStyle:'solid',
        borderColor:'#FFBF2D',
        borderRadius:5,
        color:'#FFBF2D',
        fontSize:22,
        textAlignVertical:'center'
    }
})