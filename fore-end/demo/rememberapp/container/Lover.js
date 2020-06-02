import React, { Component } from 'react'
import {
    Dimensions,
    ImageBackground,
    View,
    FlatList,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
    StatusBar,
    Platform,
    ScrollView,
    StyleSheet,
    Modal,
    Text,
    Image,
    Alert,
    ToastAndroid
} from 'react-native'
import moment from 'moment'
import Icon2 from 'react-native-vector-icons/AntDesign'
import { Flex, WingBlank } from '@ant-design/react-native'
import { Actions } from 'react-native-router-flux';
import { myFetch } from '../src/utils'
import ImagePicker from 'react-native-image-crop-picker'
const { width, scale, height } = Dimensions.get('window');
const s = width / 411;
const h = height / 1012;
const s1 = width / 640;
export default class Lover extends Component {
    constructor(props) {
        super(props);
        this.state = {
            back: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3773663025,3915037731&fm=26&gp=0.jpg',
            uid: '',
            loverId: "",
            // lover_id: '',
            // cindex_src: "",
            cnews: [{
                ctime: '今天',
                cpic_src: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1017719116,1470433776&fm=26&gp=0.jpg',
                ccontent: '请先到个人中心添加爱人，然后这里将展示您在社区私密的爱人发布'
            }
            ],
            news: [],
            text: "",
            text1: "射手座",
            msg: [],
            visible:false,
            data: [
                {
                    content: '今日运势',
                    type: "today"
                },
                {
                    content: '明日运势',
                    type: "tomorrow"
                },
            ]
        }
    }
    getStar = (name, date) => {
        this.setState({
            text1: name
        })
        fetch(`http://web.juhe.cn:8080/constellation/getAll?consName=${name}&type=${date}&key=7994afe46db4d2a7ac508683b6de23d8`)
            .then(res => res.json())
            .then(res => {
                console.log("星座", res)
                this.setState({
                    msg: res
                })
            })
    }
    componentDidMount() {
        console.log('Lover第一次加载');
        AsyncStorage.getItem('user').
            then((res) => {
                var user = JSON.parse(res) 
                this.setState({
                    uid: user.id
                })
                myFetch.post('/lover', {
                    uid: user.id
                }).then(
                    res => {
                        this.setState({
                            loverId: res[0].id,
                            back: res[0].background
                        })
                        // this.getStar("白羊座","today")
                        // console.log("res", res)
                    }
                )

            })
            AsyncStorage.getItem('star').
            then((res)=>{
                if(res){
                    this.getStar(res.name,"today")
                }else{
                    this.getStar("双子座","today")
                }
            })
    }
    componentDidUpdate(prevProps, prevState) {
        console.log('更新')
        console.log(this.state.back)
        if (prevState.back != this.state.back) {
            myFetch.post('/lover/changebackground', {
                lover_id: this.state.loverId,
                background: this.state.back
            }).then(
                res => {
                    console.log(res)
                }
            )
        }

    }
    choosebgpic = () => {
        ImagePicker.openPicker({
            width: 400,
            height: 300,
            cropping: true,
            includeBase64: true
        }).then(image => {
            myFetch.uploadImage(image.data)
                .then(res => {
                    this.setState({
                        back: res.url
                    })
                    console.log('success');
                }).catch(err => {
                    console.log('flied');
                })
        });
        ImagePicker.clean().then(() => {
            console.log('removed all tmp images from tmp directory');
        }).catch(e => {
            console.log(e)
        });
    }
    addchildwarn = () => {
        ToastAndroid.showWithGravityAndOffset(
            '请先到个人中心添加爱人，才能使用更多功能',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
            0, -250)
    }
    formatStar(txt) {
        let min="";
        if(txt=="白羊座"){
            min="♈";
        }
        else if(txt=="金牛座"){
            min="♉"
        }
        else if(txt=="双子座"){
            min="♊"
        }
        else if(txt=="巨蟹座"){
            min="♋"
        }else if(txt=="狮子座"){
            min="♌"
        }else if(txt=="处女座"){
            min="♍"
        }else if(txt=="天秤座"){
            min="♎"
        }else if(txt=="天蝎座"){
            min="♏"
        }else if(txt=="射手座"){
            min="♐"
        }else if(txt=="摩羯座"){
            min="♑"
        }else if(txt=="水瓶座"){
            min="♒"
        }
        else if(txt=="双鱼座"){
            min="♓"
        }
        return min ;
    }
    enlarge=()=>{
        this.setState({
            visible:true,
        })
    }
    ensmall=()=>{
        this.setState({
            visible:false,
        })
    }
    render() {
        const news = this.state.cnews;
        // if (this.state.loverId) {
        return (
            <View style={{ width: width, height: height, backgroundColor: "#fff" }}>
                <StatusBar
                    backgroundColor='#FFBF2D'
                />
                <View style={{
                    width: '100%',
                    backgroundColor: '#FFBF2D',
                    height: "5%",
                    justifyContent: "center",
                    flexDirection: 'row'
                }}><Text style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    textIndent: 3,
                    letterSpacing: 3,
                    color: "#ffff",
                    lineHeight: 40
                }}
                >爱人</Text></View>

                <View style={styles.lover_first}>
                    <ImageBackground
                        resizeMode="cover"
                        style={{
                            height: "98%",
                            width: "99%",
                            marginLeft: '0.5%',
                            marginTop: "1%",
                            // transform: [{scale:0.95}],

                        }}
                        source={{ uri: `${this.state.back}` }}
                        alt='自定义照片墙'>
                        {
                            this.state.loverId
                                ? <TouchableOpacity onPress={this.choosebgpic}>
                                    <Text style={styles.bgbtn}>轻触上传精选照片</Text>
                                </TouchableOpacity>
                                : <Text style={styles.bgbtn}>到个人中心添加宝贝后可更换背景墙哦</Text>
                        }
                    </ImageBackground>
                </View>
                <WingBlank style={{ flex: 1 }}>
                    <View style={styles.lover_second}>
                        <Flex justify="center">
                            <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={this.state.loverId ? () => Actions.lpictures({ loverId: this.state.loverId }) : this.addchildwarn}>
                                <Text style={styles.blockbtn}
                                >云相册</Text >
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={this.state.loverId ? () => Actions.lsound({ loverId: this.state.loverId }) : this.addchildwarn}>
                                <Text style={styles.blockbtn}
                                >语音记事</Text >
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={this.state.loverId ? () => Actions.ldairy({ loverId: this.state.loverId }) : this.addchildwarn}>
                                <Text style={styles.blockbtn}
                                >恋爱日记</Text >
                            </TouchableOpacity>
                        </Flex>
                        <Flex justify="center">
                            <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={this.state.loverId ? () => Actions.llists({ loverId: this.state.loverId }) : this.addchildwarn}>
                                <Text style={styles.blockbtn}
                                >恋爱清单</Text >
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={this.state.loverId ? () => Actions.lsouvenir({ loverId: this.state.loverId }) : this.addchildwarn}>
                                <Text style={styles.blockbtn}
                                >纪念日</Text >
                            </TouchableOpacity>
                        </Flex>
                    </View>
                    <View style={styles.date}>
                        <View style={styles.realtimetitle}>
                            <ScrollView showsVerticalScrollIndicator={false} style={{
                                width: 0.2 * width,
                                height: 0.05 * height,
                            }}>
                                {
                                    this.state.data.map((item) => (
                                        <TouchableOpacity onPress={() => this.getStar(this.state.text1, item.type)}>
                                            <Text style={styles.city}>{item.content}</Text>
                                        </TouchableOpacity>
                                    ))
                                }
                            </ScrollView>
                            <TextInput
                                style={styles.searchinput}
                                placeholder="请搜索其他星座"
                                multiline={false}
                                value={this.state.text}
                                onChangeText={text => { this.setState({ text: text }) }}
                            />
                            <TouchableOpacity onPress={() => this.getStar(this.state.text, "today")}>
                                <Icon2 style={styles.weathericon} name='search1' />
                            </TouchableOpacity>

                        </View>
                        <View style={{
                            flexDirection: "row",
                            height: 0.044 * height,
                            borderStyle: "dotted",
                            borderBottomColor: "#888",
                            borderBottomWidth: 0.3,
                            // backgroundColor:"red"
                        }}>
                            <Text style={{
                                fontSize: 28 * s1,
                                marginLeft: 12 * s,
                            }}>{this.state.text1} </Text>
                            <Text style={{
                                backgroundColor: "#FFBF2D",
                                color: "#fff",
                                borderRadius: 5,
                                fontSize: 20 * s1,
                                height: 20 * s,
                                marginLeft:3*s,
                                marginRight:3*s,
                                marginTop: 7 * s,
                            }}>{this.state.msg.datetime}</Text>
                            <Text style={{
                                marginTop: 12 * s1,
                            }}> {this.formatStar(this.state.text1)}</Text>
                        </View>
                        <View style={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            height: 0.075 * height,
                            marginLeft: 10 * s,
                            width: 0.9 * width
                        }}>
                            <Text style={styles.star}>速配星座:{this.state.msg.QFriend}</Text>
                            <Text style={styles.star}>综合指数:{this.state.msg.all}%</Text>
                            <Text style={styles.star}>幸运数字:{this.state.msg.number}</Text>
                            <Text style={styles.star}>工作指数:{this.state.msg.work}%</Text>
                            <Text style={styles.star}>爱情指数:{this.state.msg.love}%</Text>
                            <Text style={styles.star}>财运:{this.state.msg.money}%</Text>
                        </View>
                     
                        <View style={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            height: 0.14 * height,
                            marginLeft: 10 * s,
                            marginTop: 2 * s,
                            width: 0.9 * width,
                            // backgroundColor:"red"
                        }}>
                               <TouchableOpacity activeOpacity={0.5} onPress={()=>this.enlarge()} style={{
                                     flex: 1,
                                     alignItems: 'center',
                                     height: 0.14 * height,
                                     width: 0.9 * width,
                               }}>
                                   <Text numberOfLines={4} style={{
                                         letterSpacing:3,
                                         fontSize:24*s1,
                                         lineHeight:34*s1,
                                   }}>今日概述:
                                <Text  style={{
                                    fontSize:24*s1,
                                    textDecorationStyle:"dotted",
                                    fontWeight:"90",
                                    textDecorationStyle:"dotted"
                                }}>{this.state.msg.summary}
                                </Text>
                                </Text>
                                </TouchableOpacity> 
                        </View>
                    </View>

                </WingBlank>
                <Modal
                    transparent
                    visible=
                    {this.state.visible}
                >
                    <View style={{
                        backgroundColor:"#fff",
                        height:0.32*height,
                        width:0.64*width,
                        position:"absolute",
                        top:200*s,
                        backgroundColor:"#fff",
                        borderWidth:0.13,
                        borderColor:"#000",
                        left:0.18*width,
                        borderRadius:15
                    }}>
                        <TouchableOpacity onPress={()=>this.ensmall()}>
                        <Text style={{
                            fontSize:24*s1,
                            height:0.3*height,
                            width:0.6*width,
                            padding:20*s,
                            letterSpacing:2,
                            backgroundColor:'rgba(255 ,105 ,180,0.1)',
                            marginLeft:"auto",
                            marginRight:"auto",
                            marginTop:0.01*height
                        }}>{this.state.msg.summary}
                        </Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        )
    }

}
const styles = StyleSheet.create({
    star: {
        width: 0.3 * width,
        padding: 3 * s,
        fontSize: 21 * s1,
        letterSpacing:2
        //    backgroundColor:"pink"
    },
    lover_first: {
        textAlign: "center",
        height: 0.38 * height,
        width: width,
        alignItems: 'center',
        backgroundColor: '#eee'

    },
    lover_second: {
        marginTop: 0.005 * height,
        marginBottom: 0.01 * height,
        justifyContent: 'space-around',
        width: '100%',
        height: 0.125 * height,
        flexDirection: "column",
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    btn: {
        padding: 0,
        height: 0.055 * height,
        width: "31%",
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: '#FFBF2D',
        borderRadius: 5,
    },
    blockbtn: {
        textAlign: "center",
        fontSize:20,
        textAlignVertical: 'center',
        lineHeight: 55 * h,
        color: "#fff",

    },
    realtimetitle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#eee',
        marginBottom: 0.007 * height
    },
    city: {
        width: 0.25 * width,
        height: 0.05 * height,
        marginBottom: 0.005 * height,
        fontSize: 26 * s1,
        color: '#FFBF2D',
        // backgroundColor:"pink",
        borderRadius: 10,
        // backgroundColor:'#ccc',
        textAlign: 'center',
        marginLeft: 30 * s,
        marginRight: 30 * s,
        marginTop: 4 * s,
        textAlignVertical: 'center',
    },
    child_third: {
        marginTop: 0.015 * height,
    },
    searchinput: {
        backgroundColor: "#fff",
        padding: 0,
        paddingLeft: 0.03 * width,
        height: 0.04 * height,
        borderRadius: 5,
        // borderWidth:0.5,
        width: 0.43 * width,
    },
    weathericon: {
        width: 0.04 * height,
        height: 0.04 * height,
        fontSize: 30 * s1,
        color: '#888',
        // backgroundColor:'#000',
        marginLeft: 0.01 * width,
        textAlignVertical: 'center',
        textAlign: 'center'
    },
    weatherstate: {
        width: 0.04 * height,
        height: 0.04 * height,
        borderRadius: 100,
        fontSize: 20 * s1,
        color: '#fff',
        // color:'#FFBF2D',
        marginLeft: 0.03 * width,
        marginRight: 0.08 * width,
        // backgroundColor:'#FFBF2D',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    bgbtn: {
        color: '#000',
        width: 0.8 * width,
        letterSpacing: 3,
        height: 0.05 * height,
        backgroundColor: 'rgba(255,191,45,0.2)',
        textAlignVertical: 'center',
        marginTop: 0.01 * height,
        color: '#fff',
        fontSize: 23 * s1,
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
        borderRadius: 5
        // backgroundColor: 'rgba(255,255,255,0.3)',

    },
    scrollView: {
        backgroundColor: '#fff',
        paddingLeft: 10,
        paddingTop: 5,
        paddingRight: 10,
        marginBottom: 60,
    },
    line: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: "#fff",
    },
    newstime: {
        width: 0.45 * width,
        // backgroundColor:'#ccc',
        height: 0.03 * height,
        textAlignVertical: 'top',
        fontSize: 20 * s1,
        color: '#888'
    },
    newsline: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: "rgba(221, 221, 221,0.2)",
    },
    newspicbox: {
        width: 0.55 * width,
        height: 0.3 * height,
        justifyContent: 'center',
        alignItems: 'center'
    },
    newspic: {
        width: 0.55 * width,
        height: 0.3 * height,
        transform: [{ scale: 0.9 }]
    },
    newscontentbox: {
        width: 0.35 * width,
        height: 0.3 * height,
        backgroundColor: "rgba(221, 221, 221,0.3)",
    },
    newscontent: {
        // backgroundColor:'#ccc',
        width: 0.34 * width,
        height: 0.3 * height,
        fontSize: 23 * s1,
        textAlignVertical: 'center',
        transform: [{ scale: 0.85 }],
    },
    date: {
        height: 0.31 * height,
        backgroundColor: 'rgba(205,205,205,0.2)',
        marginTop: 0.01 * height,
        // backgroundColor:"pink"
    }
})
