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
import moment from 'moment'
import {myFetch} from '../../../src/utils'
import Icon1 from 'react-native-vector-icons/Feather'
import Icon2 from "react-native-vector-icons/Octicons"
import { Actions } from "react-native-router-flux"
import { WingBlank } from "@ant-design/react-native"
import { ScrollView } from 'react-native-gesture-handler'
const { width, scale, height } = Dimensions.get('window');
const s = width / 640;
export default class Lcreate_list extends Component {
    constructor() {
        var date = moment(new Date()).format("YYYY-MM-DD").split('-');
        super()
        this.state = {
            year: date[0],
            month: date[1],
            day: date[2],
            year0: "",
            month0:"",
            day0: "",
            loverId:"",
            item:"",
            site:"",
            date:"",
            content:"",
            img: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1354279089,2926899578&fm=26&gp=0.jpg',
        }
    }
    componentDidMount(){
        this.setState({
            loverId:this.props.loverId,
            item:this.props.item

        },()=>{
           
            // myFetch.get('/lover/loverlist/list',{
            //     loverid:this.state.loverId
            // }).then(res=>{
            //     console.log('所有清单数据',res)
            //     this.setState({
            //         arr:res
            //     })
            // })
        })
       
    }
    newStar(star){
        let ss='';
        if(star==1){
            ss = "★";
        }
        else if(star==2){
            ss = "★★";
        }
        else if(star==3){
            ss = "★★★";
        }else if(star==4){
            ss = "★★★★";
        }else if(star==5){
            ss = "★★★★★";
        }
        return ss;
    }
   
    addList=()=>{
        // console.log("增加",this.state.year0+"-"+this.state.month0+"-"+this.state.day0)
        myFetch.post(`/lover/loverlist/addloverlist`,{
            name:this.state.item.name,
            content:this.state.content,
            imgurl:this.state.img,
            local:this.state.site,
            setdate:this.state.year0+"-"+this.state.month0+"-"+this.state.day0,
            listid:this.state.item.id,
            lid:this.state.loverId
        })
        .then(res=>{
            console.log("json",res)
            })
    }
    alertMsg = () => {
        Alert.alert(
            '提示',
            '确认提交？',
            [
                {
                    text: '确定', onPress: () => {
                        this.addList()
                        Actions.pop()
                        ToastAndroid.show('提交成功！', ToastAndroid.SHORT)
                    }
                },
                { text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
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
                    height: 900 * s,
                    borderWidth: 0.5,
                    borderColor: "black",
                    marginRight: "auto",
                    marginLeft: "auto",
                    borderRadius: 15,
                    width: 0.92 * width,
                    marginTop: 50 * s,
                }}>
                      <View>
                    <Text style={{
                        fontSize:18,
                        textAlign:"center",
                        marginTop:25*s
                    }}>{this.state.item.name}</Text>
                     <Text style={{
                        fontSize:18,
                        textAlign:"center",
                        marginTop:0*s,
                        color:"#FF1744",
                        marginBottom:15*s
                     }}>{this.newStar(this.state.item.difficulty)}</Text>
                </View>
                    <View style={styles.msg}>
                    <Icon1 style={styles.listlineicon} name='calendar' /> 
                        <Text style={styles.text}>
                           日期：</Text>
                        <TextInput
                            // onFocus={this.timenotice}
                            keyboardType='numeric'
                            maxLength={4}
                            defaultValue={this.state.year}
                            style={[styles.input, { width: 0.13 * width }]}
                            onChangeText = {(text)=>{
                                this.setState({year0:text});
                              }} 
                            />
                        <Text style={styles.unit}>
                            年
                            </Text>
                        <TextInput
                            // onFocus={this.timenotice}
                            keyboardType='numeric'
                            maxLength={2}
                            defaultValue={this.state.month}
                            style={[styles.input, { width: 0.13 * width }]} 
                            onChangeText = {(text)=>{
                                this.setState({month0:text});
                              }}
                            />
                        <Text style={styles.unit}>
                            月
                            </Text>
                        <TextInput
                            // onFocus={this.timenotice}
                            keyboardType='numeric'
                            maxLength={2}
                            defaultValue={this.state.day}
                            style={[styles.input, { width: 0.13 * width }]}
                            onChangeText = {(text)=>{
                                this.setState({day0:text});
                              }} 
                            />
                        <Text style={styles.unit}>
                            日
                            </Text>
                    </View>
                    <View style={styles.msg}>
                    <Icon2  style={styles.listlineicon} name='location' />
                        <Text style={styles.text}>
                            地点：</Text>
                        <TextInput
                            maxLength={10}
                            placeholder='例北京'
                            style={[styles.input, { width: 0.5 * width }]}
                            onChangeText = {(text)=>{
                                this.setState({site:text});
                              }}
                             />
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
                        width: 0.8 * width,
                        height: 170 * s,
                        alignContent: 'center',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginTop: 30 * s,
                        backgroundColor: "pink",
                        textDecorationLine: "line-through",
                        textAlignVertical: 'top',
                        borderRadius: 15,
                        fontSize:15
                    }}
                        placeholder="用一段话记录"
                        multiline={true}
                        onChangeText = {(text)=>{
                            this.setState({content:text});
                          }}
                    >
                    </TextInput>
                    <TouchableOpacity style={{
                        width: 0.4 * width,
                        height: 60 * s,
                        borderColor: "#000",
                        borderWidth: 1,
                        borderRadius: 10,
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginTop: 60 * s
                    }}
                        onPress={this.alertMsg}
                    >
                        <Text
                            style={{
                                textAlign: "center",
                                textAlignVertical: "center",
                                lineHeight: 48 * s,
                                fontSize: 28 * s
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
        backgroundColor: '#FFBF2D',
        flexDirection: 'row',
        paddingLeft: 0.02 * width,
        paddingTop: '1%',
        paddingRight: 0.1 * width,
        justifyContent: "center"

    },
    icon: {
        width: 0.08 * width,
        color: '#fff',
        fontSize: 30,
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
        marginLeft: "auto",
        marginRight: "auto",
    },
    listlineicon: {
        fontSize: 35 * s,
        color: "#FF1744",
        position:"absolute",
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
    text: {
        textAlign: 'center',
        textAlignVertical: 'center',
        width: 0.3 * width,
        fontSize: 26 * s,
        color: '#333',
    },
    input: {
        // width: 0.4 * width,
        borderColor: '#bdbbb8',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        fontSize: 26 * s,
        textAlign: 'center',
        color: '#333',
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
    coverbox: {
        // backgroundColor:'#000',
        width: 0.6 * width,
        height: 230 * s,
        alignContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 20 * s,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cover: {
        width: 0.5 * width,
        height: 180 * s,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderWidth: 2,
        backgroundColor: 'rgba(255,191,45,0.1)',

    },
})