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
    ToastAndroid,
    ImageBackground
} from "react-native"
import moment from 'moment'
import Icon1 from 'react-native-vector-icons/Feather'
import Icon2 from "react-native-vector-icons/SimpleLineIcons"
import Icon3 from "react-native-vector-icons/FontAwesome"
import { Actions } from "react-native-router-flux"
import { ScrollView } from 'react-native-gesture-handler'
const { width, scale, height } = Dimensions.get('window');
const s = width / 640;
export default class Lcreate_souver extends Component {
    constructor(){
        super()
        var date = moment(new Date()).format("YYYY-MM-DD HH:mm:ss").split(' ');
        var date1=date[0].split("-")
        var date2=date[1].split(":")
        this.state={
            year: date1[0],
            month: date1[1],
            day: date1[2],
            hour:date2[0],
            min:date2[1],
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
        const src=this.state.img
        return (
            <View>
                <View style={styles.navbar}>
                    <Icon1
                        style={styles.icon}
                        name='chevron-left'
                        onPress={() => Actions.pop()}
                    />
                    <Text style={styles.title}>新建纪念日</Text>
                </View>
                <View style={{
                    height:900*s,
                    borderWidth:0.5,
                    borderColor:"black",
                    marginRight:"auto",
                    marginLeft:"auto",
                    borderRadius:15,
                    width:0.93*width,
                    marginTop:50*s,
                    backgroundColor:"rgba(255,192,203,.2)"

                }}>
               <View style={styles.msg}>
                    <Icon1 style={styles.listlineicon} name='calendar' /> 
                        <Text style={styles.text}>
                           日期：</Text>
                        <TextInput
                            // onFocus={this.timenotice}
                            // keyboardType='numeric'
                            maxLength={4}
                            defaultValue={this.state.year}
                            style={[styles.input, { width: 0.13 * width }]} />
                        <Text style={styles.unit}>
                            年
                            </Text>
                        <TextInput
                            // onFocus={this.timenotice}
                            // keyboardType='numeric'
                            maxLength={2}
                            defaultValue={this.state.month}
                            style={[styles.input, { width: 0.13 * width }]} />
                        <Text style={styles.unit}>
                            月
                            </Text>
                        <TextInput
                            // onFocus={this.timenotice}
                            // keyboardType='numeric'
                            maxLength={2}
                            defaultValue={this.state.day}
                            style={[styles.input, { width: 0.13 * width }]} />
                        <Text style={styles.unit}>
                            日
                            </Text>
                    </View>
                <View style={styles.msg}>
                    <Icon1
                    style={styles.listlineicon}
                     name="award"/>

                    <Text style={styles.text}>
                        纪念日：</Text>
                    <TextInput
                        maxLength={18}
                        placeholder='第一次去旅行'
                        style={[styles.input, { width: 0.5 * width }]} />
                </View>
                <View style={styles.msg}>
                    <Icon2
                    style={styles.listlineicon}
                     name="heart"/>

                    <Text style={styles.text}>
                        心情：</Text>
                    <TextInput
                        maxLength={10}
                        placeholder='输入3代表 ღ ღ ღ'
                        style={[styles.input, { width: 0.5 * width }]} />
                </View>
                <View style={styles.msg}>
                    <Icon3 style={styles.listlineicon} name='calendar-check-o' /> 
                        <Text style={styles.text}>
                           提醒日期：</Text>
                        <TextInput
                            // onFocus={this.timenotice}
                            // keyboardType='numeric'
                            maxLength={2}
                            defaultValue={this.state.month}
                            style={[styles.input, { width: 0.09 * width }]} />
                        <Text style={styles.unit}>
                            月
                            </Text>
                        <TextInput
                            // onFocus={this.timenotice}
                            // keyboardType='numeric'
                            maxLength={2}
                            defaultValue={this.state.day}
                            style={[styles.input, { width: 0.09 * width }]} />
                        <Text style={styles.unit}>
                            日
                            </Text>
                        <TextInput
                            // onFocus={this.timenotice}
                            // keyboardType='numeric'
                            maxLength={2}
                            defaultValue={this.state.hour}
                            style={[styles.input, { width: 0.09 * width }]} />
                        <Text style={styles.unit}>
                            时
                            </Text>
                            <TextInput
                            // onFocus={this.timenotice}
                            // keyboardType='numeric'
                            maxLength={2}
                            defaultValue={this.state.min}
                            style={[styles.input, { width: 0.09 * width }]} />
                        <Text style={styles.unit}>
                            分
                            </Text>
                    </View>
                <View style={styles.msg}>
                    <Icon1
                      style={styles.listlineicon}
                     name="music"/>

                    <Text style={styles.text}>
                        设置铃声：</Text>
                    <ImageBackground 
                     style={{
                        width: 0.5 * width,
                        textAlign: 'center',
                    }} 
                    source={{uri:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3677406540,3284316335&fm=26&gp=0.jpg"}}>
                    <TouchableOpacity
                        maxLength={10}
                        placeholder='输入3代表 ღ ღ ღ'
                        style={{
                            width: 0.5 * width,
                            borderColor: '#bdbbb8',
                            textAlign: 'center',
                            color: '#333',
                            backgroundColor:"#336666",
                            opacity:0.5,
                            height:60*s,
                        }} >
                            <Text style={{
                                textAlign:"center",
                                color:"#fff",
                                marginTop:"auto",
                                marginBottom:"auto"
                                }}>点击上传</Text>
                        </TouchableOpacity>
                        </ImageBackground>
                </View>
              
                <TouchableOpacity style={styles.coverbox}>
                        <Text
                        style={styles.textbtn}>轻触设置图片</Text>
                        <Image
                            style={{
                                width:0.5*width,
                                height:180*s,
                                borderColor:'#ccc',
                                borderStyle:'solid',
                                borderWidth:2,
                                backgroundColor:'rgba(255,191,45,0.1)',
                            }}
                            resizeMode="contain"
                            source={{uri:this.state.img}}
                        ></Image>
                </TouchableOpacity>
                    <TouchableOpacity style={{
                        width:0.4*width,
                        height:60*s,
                        borderColor:"#000",
                        borderWidth:1,
                        borderRadius:10,
                        marginLeft:"auto",
                        marginRight:"auto",
                        marginTop:100*s
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
                        >创建</Text>
                    </TouchableOpacity>
                    </View>
                    
            </View>

        )
    }
}
const styles = StyleSheet.create({
    navbar:{
        width:width,
        height:65*s,
        backgroundColor: '#FFBF2D',
        flexDirection: 'row',
        paddingLeft:0.02*width,
        paddingTop:'1%',
        paddingRight:0.1*width,
        justifyContent:"center"
       
    },
    icon: {
        width: 0.08 * width,
        color: '#fff',
        fontSize: 30,
    },
    listlineicon: {
        fontSize: 35 * s,
        color: "#FF1744",
        position:"relative",
        left:0,
        top:10*s
    },
    unit: {
        textAlign: 'center',
        marginLeft: 0.003 * width,
        marginRight: 0.003 * width,
        textAlignVertical: 'center',
        width: 0.03 * width,
        fontSize: 23 * s,
        color: '#555',
    },
    title: {
        marginLeft: 'auto',
        marginRight: "auto",
        textAlign: 'center',
        fontSize: 20,
        color: '#fff',
        letterSpacing: 3
    },
    msg: {
        width: 0.8 * width,
        height: 60 * s,
        marginTop: 25 * s,
        flexDirection: 'row',
        justifyContent: 'center',
        marginLeft:"auto",
        marginRight:"auto",
        // backgroundColor:"#fff",
        // borderRadius:10
    },
    text: {
        textAlign: 'center',
        textAlignVertical: 'center',
        width: 0.28 * width,
        fontSize: 26 * s,
        color: '#333',
        // borderWidth:0.5,
        // borderColor:"red",
        // paddingRight:"auto"
        
    },
    input: {
        width: 0.4 * width,
        borderColor: '#bdbbb8',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        fontSize: 24 * s,
        textAlign: 'center',
        color: '#333',
        backgroundColor:"#fff",
        borderRadius:10
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
        marginTop:40*s,
        justifyContent:'center',
        alignItems:'center'
    },
    
})