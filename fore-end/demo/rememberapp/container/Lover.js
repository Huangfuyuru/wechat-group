import React, { Component } from 'react'
import {
    Text,
    StyleSheet,
    Dimensions,
    ImageBackground,
    View,
    FlatList,
    TouchableOpacity,
    AsyncStorage,
    StatusBar,
    ToastAndroid
} from 'react-native'
import moment from 'moment'
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
            lnews:[]
        }
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
                            back:res[0].background
                        })
                        console.log("res", res)
                    }
                )

            })


    }
    componentDidUpdate(prevProps,prevState){
        console.log('更新')
        console.log(this.state.back)
        if(prevState.back != this.state.back){
            myFetch.post('/lover/changebackground',{
                lover_id:this.state.loverId,
                background:this.state.back
            }).then(
                res=>{
                    console.log(res)
                }
            )
        }
        
    }
    choosebgpic=()=>{
        ImagePicker.openPicker({
            width: 400, 
            height: 300, 
            cropping: true,
            includeBase64:true
        }).then(image => {
           myFetch.uploadImage(image.data)
            .then( res=>{
                this.setState({
                    back:res.url
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
    addchildwarn = () => {
        ToastAndroid.showWithGravityAndOffset(
            '请先到个人中心添加爱人，才能使用更多功能',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
            0, -250)
    }
    render() {
        const news = this.state.cnews;
        if (this.state.loverId) {
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
                                height: "100%",
                                width: "100%",
                                transform: [{ scale: 1 }]
                            }}
                            source={{ uri: this.state.back }}
                            alt='自定义照片墙'>
                            <TouchableOpacity onPress={this.choosebgpic}>
                                <Text style={styles.bgbtn}>轻触上传精选照片</Text>
                            </TouchableOpacity>
                        </ImageBackground>
                    </View>
                    <View style={styles.lover_second}>
                        <Flex justify="center">
                            <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={() => Actions.lpictures({loverId:this.state.loverId})}>
                                <Text  style={styles.blockbtn}
                                >云相册</Text >
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={() => Actions.lsound({loverId:this.state.loverId})}>
                                <Text  style={styles.blockbtn}
                                >语音记事</Text >
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={() => Actions.ldairy({loverId:this.state.loverId})}>
                                <Text style={styles.blockbtn}
                                >恋爱日记</Text >
                            </TouchableOpacity>
                        </Flex>
                        <Flex justify="center">
                            <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={() => Actions.llists({loverId:this.state.loverId})}>
                                <Text  style={styles.blockbtn}
                                >恋爱清单</Text >
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={() => Actions.lsouvenir({loverId:this.state.loverId})}>
                                <Text  style={styles.blockbtn}
                                >纪念日</Text >
                            </TouchableOpacity>
                        </Flex>
                    </View>
                    {/* <View style={{
                        width: '100%',
                        marginTop: 10
                    }}>
                        <Text style={{
                            width: '104%',
                            marginLeft: '-2%',
                            backgroundColor: '#bdbbb8',
                            height: 0.8,
                        }}></Text>
                        <Text style={{
                            marginTop: -10,
                            width: 140 * s,
                            textAlign: 'center',
                            marginLeft: 5,
                            backgroundColor: '#fff',
                            fontSize: 15,
                            color: '#555'
                        }}>以下内容仅自己可见</Text>
                    </View> */}
                    {/* <FlatList
                        showsVerticalScrollIndicator={false}
                        ListFooterComponent={
                            <View style={{
                                width: '100%',
                                marginTop: 10
                            }}>
                                <Text style={{
                                    width: '104%',
                                    marginLeft: '-2%',
                                    backgroundColor: '#ccc',
                                    height: 0.5,
                                }}></Text>
                                <Text style={{
                                    marginTop: -10,
                                    width: 140 * s,
                                    height: 50,
                                    textAlign: 'center',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    backgroundColor: '#fff',
                                    fontSize: 15,
                                    color: '#bdbbb8'
                                }}>底儿都被你看完了</Text>
                            </View>
                        }
                        style={styles.scrollView}
                        data={this.state.lnews}
                        numColumns={1}
                        renderItem={({ item }) => (
                            <TouchableOpacity key={item.id} style={styles.child_third}>
                                    <Text style={styles.newstime}>{ moment(item.setdate).format(" YYYY年MM月DD日  HH:mm:ss")}</Text>
                                    <View style={styles.newsline}>
                                        <View style={styles.newspicbox}>
                                            <ImageBackground
                                                style={styles.newspic}
                                                resizeMode="cover"
                                                source={{uri:`${this.state.back}`}}
                                            />
                                        </View>
                                        <View style={styles.newscontentbox}>
                                            <Text style={styles.newscontent}>{item.content}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                        )}
                    /> */}

                </View>
            )
        }
        else {
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
                                height: "100%",
                                width: "100%",
                                transform: [{ scale: 1 }]
                            }}
                            source={{ uri: this.state.back }}
                            alt='自定义照片墙'>
                            <Text style={styles.bgbtn}>到个人中心添加爱人后可更换背景墙哦</Text>
                        </ImageBackground>
                    </View>
                    <WingBlank style={{flex:1}}>
                    <View style={styles.lover_second}>
                        <Flex justify="center">
                            <TouchableOpacity activeOpacity={0.8} style={styles.btn}
                                onPress={this.addchildwarn}>
                                <Text  style={styles.blockbtn}
                                >云相册</Text >
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8} style={styles.btn}
                                onPress={this.addchildwarn}
                            >
                                <Text  style={styles.blockbtn}
                                >语音记事</Text >
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8} style={styles.btn}
                                onPress={this.addchildwarn}
                            >
                                <Text  style={styles.blockbtn}
                                >恋爱日记</Text >
                            </TouchableOpacity>
                        </Flex>
                        <Flex justify="center">
                            <TouchableOpacity activeOpacity={0.8} style={styles.btn}
                                onPress={this.addchildwarn}
                            >
                                <Text  style={styles.blockbtn}
                                >恋爱清单</Text >
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8} style={styles.btn}
                                onPress={this.addchildwarn}
                            >
                                <Text  style={styles.blockbtn}
                                >纪念日</Text >
                            </TouchableOpacity>
                        </Flex>
                    </View>
                    </WingBlank>
                    <View style={{
                        width: '100%',
                        marginTop: 70
                    }}>
                        <Text style={{
                            width: '104%',
                            marginLeft: '-2%',
                            backgroundColor: '#bdbbb8',
                            height: 0.8,
                        }}></Text>
                        <Text style={{
                            marginTop: -10,
                            width: 140 * s,
                            textAlign: 'center',
                            marginLeft: 5,
                            backgroundColor: '#fff',
                            fontSize: 15,
                            color: '#555'
                        }}>以下内容仅自己可见</Text>
                    </View>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        style={styles.scrollView}
                        data={news}
                        numColumns={1}
                        renderItem={({ item }) => (
                            <View style={styles.child_third}>
                                <View>
                                    <Text>{item.ctime}</Text>
                                </View>
                                <View style={styles.line}>
                                    <View
                                        style={{
                                            width: 180,
                                            height: 180,
                                            // backgroundColor:'#000',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <ImageBackground
                                            style={{
                                                height: "100%",
                                                width: "100%",
                                                transform: [{ scale: 0.9 }]
                                            }}
                                            resizeMode="cover"
                                            source={{ uri: item.cpic_src }}
                                        />
                                    </View>
                                    <View style={{
                                        width: 180 * s,
                                        height: 180 * s,
                                    }}>
                                        <Text>{item.ccontent}</Text>
                                    </View>
                                </View>
                            </View>
                        )}
                    />

                </View>
            )
        }
    }
}
const styles = StyleSheet.create({
    lover_first: {
        textAlign: "center",
        height: 0.33 * height,
        width: width,
        alignItems:'center'

    },
    lover_second: {
        marginBottom: 15,
        width: '100%',
        height: 140 * h,
        flexDirection: "column",
        justifyContent: "center",
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    btn: {
        padding: 0,
        height: 55 * h,
        width: "31%",
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        backgroundColor: '#FFBF2D',
        borderRadius: 5,
    },
    blockbtn:{ 
        textAlign: "center", 
        fontSize: 20,
        textAlignVertical:'center', 
        lineHeight: 55*h, 
        color: "#fff" ,
       
    },
    child_third: {
        marginTop:0.015*height,
    },
    bgbtn: {
        color: '#000',
        width:0.8*width,
        letterSpacing:3,
        height:0.05*height,
        backgroundColor: 'rgba(255,191,45,0.2)',
        textAlignVertical:'center',
        marginTop:0.01*height,
        color:'#fff',
        fontSize:23*s1,
        marginLeft:'auto',
        marginRight:'auto',
        textAlign:'center',
        borderRadius:5
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
    newstime:{
        width:0.45*width,
        // backgroundColor:'#ccc',
        height:0.03*height,
        textAlignVertical:'top',
        fontSize:20*s1,
        color:'#888'
    },
    newsline:{
        flexDirection: 'row',
        justifyContent:'space-between',
        backgroundColor: "rgba(221, 221, 221,0.2)",
    },
    newspicbox:{
        width:0.55*width,
        height:0.3*height,
        justifyContent:'center',
        alignItems:'center'
    },
    newspic:{ 
        width:0.55*width,
        height:0.3*height,
        transform: [{scale:0.9}]
    },
    newscontentbox:{
        width:0.35*width,
        height:0.3*height,
        backgroundColor: "rgba(221, 221, 221,0.3)",
    },
    newscontent:{
        // backgroundColor:'#ccc',
        width:0.34*width,
        height:0.3*height,
        fontSize:23*s1,
        textAlignVertical:'center',
        transform: [{scale:0.85}],
    },
})
