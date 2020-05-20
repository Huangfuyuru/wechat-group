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
import {myFetch} from '../../../src/utils'
import Icon1 from 'react-native-vector-icons/Feather'
import Icon2 from "react-native-vector-icons/SimpleLineIcons"
import Icon3 from "react-native-vector-icons/FontAwesome"
import { Actions } from "react-native-router-flux"
import ImagePicker from 'react-native-image-crop-picker'
import { ScrollView } from 'react-native-gesture-handler'
import Item from '@ant-design/react-native/lib/list/ListItem'
const { width, scale, height } = Dimensions.get('window');
const s = width / 640;
export default class Lcreate_souver extends Component {
    constructor(){
        super()
        var date = moment(new Date()).format("YYYY-MM-DD HH:mm:ss").split(' ');
        var date1=date[0].split("-")
        var date2=date[1].split(":")
        this.state={
            loverId:"",
            id:"",
            year: date1[0],
            month: date1[1],
            day: date1[2],
            hour:date2[0],
            min:date2[1],
            name:"",
            month1:date1[1],
            day1: date1[2],
            content:"",
            mood:"",
            voiceurl:"https://webfs.yun.kugou.com/202004291956/538dec35e30568167bf23eb4fa667a94/G094/M00/1E/18/_oYBAFwFdfeAGeRpADT6n40TcAI992.mp3",
            imgurl:'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1354279089,2926899578&fm=26&gp=0.jpg',
        }
    }
    componentDidMount(){
        // moment(data.date).format("YYYY年MM月DD日")
       const data=this.props.data;
       const date1=moment(data.date).format("YYYY-MM-DD").split("-");
       const date2=moment(data.setdate).format("YYYY-MM-DD").split("-");
       const date3 =moment(data.setdate).format("YYYY-MM-DD HH:mm:ss").split(" ")[1].split(":");
       this.setState({
           loverId:data.lid,
           mood:data.mood,
           content:data.content,
           imgurl:data.imgurl,
           voiceurl:data.voiceurl,
           name:data.name,
           year: date1[0],
           month: date1[1],
           day: date1[2],
           hour:date3[0],
           min:date3[1],
           month1:date2[1],
           day1: date2[2],
           id:data.id,
       })
    }
    choosebgpic=()=>{
        ImagePicker.openPicker({
            width: 400, 
            height: 300, 
            cropping: true,
            includeBase64:true
        }).then(image => {
            myFetch.uploadImage(image.data).then( res=>{
                this.setState({
                    imgurl:res.url
                })
                console.log('success');
            }).catch( err=>{
                console.log('flied');
            })
        });
        ImagePicker.clean().then(() => { 
            console.log('removed all tmp images from tmp directory');
        }).catch(e => { 
            console.log(e)
        });
    }
    additem = ()=>{
        var time0 = this.state.year+'-'+this.state.month+'-'+this.state.day
        var date0 = moment(time0).format("YYYY-MM-DD")
        // var timename = moment(new Date()).format("HH:mm:ss")
        // var date = timename.split(':')
        var name="纪念日"
        if(!this.state.name){
            name = '没有名称的纪念日'+date[0]+date[1]+date[2]
        }
        myFetch.post('/lover/lsouvenir/modsouvenir',{
           loverid:this.state.loverId,
           id:this.state.id,
           date:date0,
           name:this.state.name,
           mood:this.state.mood,
           setdate:this.state.year+"-"+this.state.month1+"-"+this.state.day1+" "+this.state.hour+":"+this.state.min,
           voiceurl:this.state.voiceurl,
           imgurl:this.state.imgurl,
           content:this.state.content,
        }).then(res=>{
          console.log(res)
            if(res.code == 0){
                setTimeout(()=>{
                    Actions.pop({refresh:({data:res.data})})
                },1000)
                ToastAndroid.show(res.msg, ToastAndroid.SHORT);
            }else{
                ToastAndroid.show(res.msg, ToastAndroid.SHORT);
            }
        })
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
                    <Text style={styles.title}>编辑纪念日</Text>
                </View>
                <View style={{
                    height:1000*s,
                    borderWidth:0.5,
                    borderColor:"black",
                    marginRight:"auto",
                    marginLeft:"auto",
                    borderRadius:15,
                    width:0.92*width,
                    marginTop:18*s,
                    backgroundColor:"rgba(255,192,203,.2)"

                }}>
               <View style={styles.msg}>
                    <Icon1 style={styles.listlineicon} name='calendar' /> 
                        <Text style={styles.text}>
                           日期：</Text>
                        <TextInput
                            defaultValue={this.state.year}
                            maxLength={4}
                            onChangeText = {(text)=>{
                                this.setState({
                                    year:text});
                            } 
                            }
                            style={[styles.input, { width: 0.13 * width }]} />
                        <Text style={styles.unit}>
                            年
                            </Text>
                        <TextInput
                            maxLength={2}
                            defaultValue={this.state.month}
                            onChangeText = {(text)=>{
                                this.setState({month:text});
                              }} 
                            style={[styles.input, { width: 0.13 * width }]} />
                        <Text style={styles.unit}>
                            月
                            </Text>
                        <TextInput
                            maxLength={2}
                            defaultValue={this.state.day}
                            onChangeText = {(text)=>{
                                this.setState({day:text});
                              }} 
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
                        defaultValue={this.state.name}
                        onFocus={()=>{
                            ToastAndroid.showWithGravityAndOffset(
                                '请保证名称不多于10个字！',
                            ToastAndroid.SHORT,
                            ToastAndroid.TOP,
                            180,180)
                        }}
                        onChangeText = {(text)=>{
                            this.setState({name:text});
                          }} 
                        style={[styles.input, { width: 0.5 * width }]} />
                </View>
                <View style={styles.msg}>
                    <Icon2
                    style={styles.listlineicon}
                     name="heart"/>

                    <Text style={styles.text}>
                        心情：</Text>
                    <TextInput
                        maxLength={2}
                        defaultValue={this.state.mood}
                        onFocus={()=>{
                            ToastAndroid.showWithGravityAndOffset(
                                '请输入1-5之内的整数！',
                            ToastAndroid.SHORT,
                            ToastAndroid.TOP,
                            180,300)
                        }}
                        onChangeText = {(text)=>{
                            this.setState({mood:text});
                          }} 
                        style={[styles.input, { width: 0.5 * width}]} />
                </View>
                <View style={styles.msg}>
                    <Icon3 style={styles.listlineicon} name='calendar-check-o' /> 
                        <Text style={styles.text}>
                           提醒日期：</Text>
                        <TextInput
                            // onFocus={this.timenotice}
                            // keyboardType='numeric'
                            maxLength={2}
                            defaultValue={this.state.month1}
                            onChangeText = {(text)=>{
                                this.setState({month1:text});
                              }} 
                            style={[styles.input, { width: 0.09 * width }]} />
                        <Text style={styles.unit}>
                            月
                            </Text>
                        <TextInput
                            // onFocus={this.timenotice}
                            // keyboardType='numeric'
                            maxLength={2}
                            defaultValue={this.state.day1}
                            onChangeText = {(text)=>{
                                this.setState({day1:text});
                              }} 
                            style={[styles.input, { width: 0.09 * width }]} />
                        <Text style={styles.unit}>
                            日
                            </Text>
                        <TextInput
                            // onFocus={this.timenotice}
                            // keyboardType='numeric'
                            maxLength={2}
                            defaultValue={this.state.hour}
                            onChangeText = {(text)=>{
                                this.setState({hour:text});
                              }} 
                            style={[styles.input, { width: 0.09 * width }]} />
                        <Text style={styles.unit}>
                            时
                            </Text>
                            <TextInput
                            // onFocus={this.timenotice}
                            // keyboardType='numeric'
                            maxLength={2}
                            defaultValue={this.state.min}
                            onChangeText = {(text)=>{
                                this.setState({min:text});
                              }} 
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
              
                <TouchableOpacity style={styles.coverbox} onPress={this.choosebgpic}>
                        <Text
                        style={styles.textbtn}>轻触修改图片</Text>
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
                            source={{uri:this.state.imgurl}}
                        ></Image>
                </TouchableOpacity>
                <TextInput style={{
                        width: 0.8 * width,
                        height: 170 * s,
                        alignContent: 'center',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginTop: 30 * s,
                        backgroundColor: "#fff",
                        textAlignVertical: 'top',
                        borderRadius: 15,
                        fontSize:15
                    }}
                        defaultValue={this.state.content}
                        multiline={true}
                        onChangeText = {(text)=>{
                            this.setState({content:text});
                          }}
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
                        marginTop:30*s
                    }}
                    onPress={this.additem}
                    >
                        <Text
                        style={{
                            textAlign:"center",
                            textAlignVertical:"center",
                            lineHeight:48*s,
                            fontSize:28*s
                        }}
                        >修改</Text>
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