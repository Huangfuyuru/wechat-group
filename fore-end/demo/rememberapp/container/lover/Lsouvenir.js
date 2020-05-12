import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    FlatList,
    Alert,
    ToastAndroid,
    TouchableOpacity,
    Animated,
    Easing,
    TouchableWithoutFeedback,
    ImageBackground
} from "react-native"
import Icon from "react-native-vector-icons/Feather"
import Icon1 from 'react-native-vector-icons/SimpleLineIcons'
import Icon3 from "react-native-vector-icons/Ionicons"
import Video from 'react-native-video'
import { Actions } from "react-native-router-flux"
import { myFetch } from '../../src/utils'
import { WingBlank } from "@ant-design/react-native"
import moment from 'moment'
const { width, scale, height } = Dimensions.get('window');
const s = width / 640;
export default class Lsouvenir extends Component {
    constructor() {
        super()
        var date=moment(new Date()).format("YYYY-MM-DD HH:mm:ss").split(' ')
    //    setInterval(function(){ date=},1000);
        var date1=date[0]
        var date2=date[1].split(":")
        this.state = {
            loverId: "",
            date:date1,
            time:date2,
            arr: [
                {
                    imgurl: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1996853672,3140841536&fm=15&gp=0.jpg",
                    date: "xxxx-xx-xx",
                    name: "纪念从此刻开始",
                    mood: 5,
                    paused: false,
                    id: "1",
                    voiceurl: "https://webfs.yun.kugou.com/202004302044/cb238493021c8bf179d8c1979a32c7ad/G094/M00/1E/18/_oYBAFwFdfeAGeRpADT6n40TcAI992.mp3"
                },

            ],
            arr1: [],
            rotateValue: new Animated.Value(0),
            bounceValue: new Animated.Value(1),
        }
        this.timer = null
    
    }
    componentDidMount() {
        this.startAnimation();
        this.setState({
            loverId: this.props.loverId
        })
        myFetch.get('/lover/lsouvenir', {
            loverid: this.props.loverId
        }).then(res => {
            console.log("res", res)
            this.setState({
                arr1: res.msg
            })
            const arr0 = [...this.state.arr1]
            arr0.map((item) => {
                item.paused = false
            })
            this.setState({
                arr1: arr0
            })
        })

    }
    componentWillReceiveProps(nextProps) {
        // console.log("hhhh", nextProps.data)
        this.setState({
            arr1: nextProps.data
        }, () => {
            const arr0 = [...this.state.arr1]
            arr0.map((item) => {
                item.paused = false
            })
            this.setState({
                arr1: arr0
            })
        })

    }
    startAnimation() {
        this.state.bounceValue.setValue(1);
        this.state.rotateValue.setValue(0);
        Animated.parallel([
            //通过Animated.spring等函数设定动画参数
            //可选的基本动画类型: spring, decay, timing
            Animated.spring(this.state.bounceValue, {
                toValue: 1,      //变化目标值，也没有变化
                friction: 20,    //friction 摩擦系数，默认40
            }),
            Animated.timing(this.state.rotateValue, {
                toValue: 1,  //角度从0变1
                duration: 15000,  //从0到1的时间
                easing: Easing.out(Easing.linear),//线性变化，匀速旋转
            }),
            //调用start启动动画,start可以回调一个函数,从而实现动画循环
        ]).start(() => this.startAnimation());
    }
    playMusic = (id) => {
        const arr0 = [...this.state.arr1]
        const time = [...this.state.time]
        let min1 =Number(time[1]);
        min1=min1-10;
        let min=String(min1);
        time[1]=min;
        arr0.map((item) => {
            if (item.id == id) {
                // item.paused = !item.paused
                 item.paused = false;
            }
        })
        this.setState({
            arr1: arr0,
            time:time
        })
    }
    rmSouvenir = (e) => {
        var rmname = e.name;
        Alert.alert('提示', '确定要删除吗？',
            [
                {
                    text: "确定", onPress: () => {
                        myFetch.get('/lover/lsouvenir/delSouvenir', {
                            loverid: e.lid,
                            loverImpDateid: e.id
                        }).then(res => {
                            if (res.code == 0) {
                                this.setState({
                                    arr1: res.msg
                                })
                                const arr0 = [...this.state.arr1]
                                arr0.map((item) => {
                                    item.paused = false
                                })
                                this.setState({
                                    arr1: arr0
                                })
                                ToastAndroid.show('删除' + e.name + '成功！！', ToastAndroid.SHORT);
                            }
                            else {
                                ToastAndroid.show(res.msg, ToastAndroid.SHORT);
                            }
                        })
                    }
                },
                { text: "返回", onPress: this.opntion2Selected },
            ]
        )
    }
    newStar(star) {
        let ss = '';
        if (star == 1) {
            ss = "❤";
        }
        else if (star == 2) {
            ss = "❤ ❤";
        }
        else if (star == 3) {
            ss = "❤ ❤ ❤";
        } else if (star == 4) {
            ss = "❤ ❤ ❤ ❤";
        } else if (star == 5) {
            ss = "❤ ❤ ❤ ❤ ❤";
        }
        return ss;
    }

    render() {
        const list = this.state.arr1
        return (
            <View>
                <View style={styles.navbar}>
                    <Icon
                        style={styles.icon}
                        name='chevron-left'
                        onPress={() => Actions.pop()}
                    />
                    <Text style={styles.title}>纪念日</Text>
                    <Icon3
                        style={styles.icon}
                        name='md-add'
                        onPress={() => Actions.lcsouvenir({ loverId: this.state.loverId })}
                    />
                </View>
                <WingBlank>
                    {this.state.arr1 ?
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            ListFooterComponent={
                                <View style={{
                                    width: '100%',
                                    marginTop: 30
                                }}>
                                    <Text style={{
                                        width: '104%',
                                        marginLeft: '-2%',
                                        backgroundColor: '#000',
                                        height: 0.8,
                                    }}></Text>
                                    <Text style={{
                                        marginTop: -10,
                                        width: 200 * s,
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
                            data={list}
                            numColumns={1}
                            renderItem={({ item }) => {
                                let time=item.setdate.split("T");
                                let time0=time[1].split(".");
                                let time1=time0[0].split(":");
                                if(time[0]==this.state.date){
                                    if(time1[0]==this.state.time[0]){
                                        let min=Number(time1[1]);
                                        let min1 =Number(this.state.time[1]);
                                        console.log("ggg",min,min1);
                                        if(min==min1||(min1>min&&min1-min<=5)){
                                            item.paused=true;
                                        }
                                
                                    }
                                }
                                let a = item.paused ? "360deg" : "0deg"
                                return (
                                    <TouchableWithoutFeedback  >
                                        <View style={{
                                            height: 300 * s,
                                            width: 0.88 * width,
                                            borderWidth: 0.3,
                                            borderColor: "#000",
                                            marginTop: 10 * s,
                                            marginLeft: 'auto',
                                            marginRight: "auto",
                                            borderRadius: 15,
                                            flexDirection: "row",
                                            flexWrap: "wrap",
                                            backgroundColor: "rgba(255,192,203,.2)"
                                        }}>
                                            <TouchableOpacity onPress={this.playMusic.bind(this, item.id)}>
                                                <Animated.Image source={{ uri: item.imgurl }}
                                                    style={{
                                                        width: 0.40 * width,
                                                        height: 0.40 * width,
                                                        borderRadius: 100,
                                                        marginTop: 24 * s,
                                                        marginLeft: 20 * s,
                                                        marginRight: 10 * s,
                                                        transform: [
                                                            //将初始化值绑定到动画目标的style属性上
                                                            { scale: this.state.bounceValue },
                                                            //使用interpolate插值函数,实现了从数值单位的映
                                                            //射转换,上面角度从0到1，这里把它变成0-360的变化
                                                            {
                                                                rotateZ: this.state.rotateValue.interpolate({
                                                                    inputRange: [0, 1],
                                                                    outputRange: ['0deg', a],
                                                                })
                                                            },
                                                        ]
                                                    }}>

                                                </Animated.Image>
                                            </TouchableOpacity>

                                            <TouchableOpacity activeOpacity={1} onPress={() => Actions.souvenir({ data: item })} onLongPress={() => this.rmSouvenir(item)}>
                                                <View
                                                    style={{
                                                        height: 280 * s,
                                                        width: 0.4 * width,
                                                        margin: 6 * s,
                                                        flexDirection: "column",
                                                    }}
                                                >
                                                    <Icon1
                                                        style={{
                                                            fontSize: 30 * s,
                                                            marginLeft: "auto",
                                                            marginTop: 5 * s,
                                                            // color:"#FF1744"
                                                        }}
                                                        name="check"></Icon1>
                                                    <Text
                                                        style={{
                                                            fontSize: 30 * s,
                                                            textAlign: "center",
                                                            marginTop: 35 * s,
                                                            marginBottom: 10 * s
                                                        }}

                                                    >{item.name ? (item.name.length >= 7 ? item.name.substr(0, 7) + "..." : item.name) : ""}</Text>
                                                    <Text
                                                        style={{
                                                            fontSize: 20 * s,
                                                            textAlign: "center",
                                                            marginBottom: 50 * s
                                                        }}
                                                    >
                                                        {item.date.split("T")[0]}
                                                        </Text>
                                                    <Text
                                                        style={{
                                                            fontSize: 35 * s,
                                                            textAlign: "center",
                                                            color: "#FF1744"
                                                        }}
                                                    >{this.newStar(item.mood)}</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <Video
                                                source={{ uri: item.voiceurl }}
                                                ref={(ref) => {
                                                    this.player = ref
                                                }}
                                                paused={!item.paused}
                                                repeat={true}
                                                volume={1.0}
                                                playInBackground={true}
                                            />
                                        </View>

                                    </TouchableWithoutFeedback>
                                )
                            }}
                        /> :
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            style={styles.scrollView}
                            data={this.state.arr}
                            numColumns={1}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableWithoutFeedback  >
                                        <ImageBackground source={{ uri: item.imgurl }}
                                            blurRadius={0.9}
                                            style={{
                                                height: 700 * s,
                                                width: 0.8 * width,
                                                marginTop: 60 * s,
                                                marginLeft: 'auto',
                                                marginRight: "auto",
                                                flexDirection: "column",
                                                flexWrap: "wrap",
                                            }}>
                                            <View
                                                style={{
                                                    height: 700 * s,
                                                    width: 0.8 * width,
                                                    marginLeft: 'auto',
                                                    marginRight: "auto",
                                                    flexDirection: "column",
                                                    flexWrap: "wrap",
                                                    backgroundColor: "rgba(255,192,203,.4)"
                                                }}
                                            >
                                <Icon size={50} color='#333' style={styles.nullicon} name='corner-right-up' />

                                                <TouchableOpacity activeOpacity={1} onPress={() => Actions.souvenir({ data: item })}>
                                               
                                                    <Text style={styles.nullcontent}>点击右上角来纪念吧~</Text>
                                                    <View
                                                        style={{
                                                            height: 220 * s,
                                                            width: 0.7 * width,
                                                            marginLeft: 32 * s,
                                                            marginTop:0,
                                                            flexDirection: "column",
                                                            borderWidth: 1,
                                                            borderStyle: "solid",
                                                            borderColor: "pink",
                                                            borderRadius:5,
                                                            backgroundColor: 'rgba(255,255,255,0.3)'
                                                        }}
                                                    >
                                                        <Text
                                                            style={{
                                                                fontSize: 30 * s,
                                                                textAlign: "center",
                                                                marginTop: 35 * s,
                                                                marginBottom: 10 * s,
                                                            }}

                                                        >{item.name ? (item.name.length >= 7 ? item.name.substr(0, 7) + "..." : item.name) : ""}</Text>
                                                        <Text
                                                            style={{
                                                                fontSize: 20 * s,
                                                                textAlign: "center",
                                                                marginBottom: 50 * s
                                                            }}
                                                        >{item.date.split("T")[0]}</Text>
                                                        <Text
                                                            style={{
                                                                fontSize: 35 * s,
                                                                textAlign: "center",
                                                                color: "#FF1744"
                                                            }}
                                                        >{this.newStar(item.mood)}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </ImageBackground>

                                    </TouchableWithoutFeedback>
                                )
                            }}
                        />
                    }
                </WingBlank>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    navbar: {
        width: width,
        height: 65 * s,
        backgroundColor: '#FFBF2D',
        // backgroundColor: '#fff',
        flexDirection: 'row',
        paddingLeft: 0.03 * width,
        paddingTop: '1%',
        paddingRight: 0.03 * width,
        justifyContent: "center",
    },
    icon: {
        width: 0.08 * width,
        color: '#fff',
        fontSize: 28,
    },
    title: {
        marginLeft: 'auto',
        marginRight: "auto",
        textAlign: 'center',
        fontSize: 20,
        color: '#fff',
        letterSpacing: 3
    },
    scrollView: {
        marginTop: 18 * s,
        backgroundColor: '#fff',
        paddingLeft: 10,
        paddingRight: 10,
        height: 950 * s,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: "#C0C0C0"
        // "
    },

    nullcontent: {
        // color:`${textcolor}`,
        height: 0.08 * height,
        width: 0.6 * width,
        marginLeft:0.1*width,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginTop: 0.1 * height,
        marginBottom: 0.08 * height,
        // padding:0.01*width,
        borderRadius: 15,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "pink",
        fontSize: 25 * s,
        backgroundColor: 'rgba(255,255,255,0.3)'
    },
    nullicon: {
        width: 0.08 * height,
        height: 0.08 * height,
        position: "absolute",
        top: -40,
        left:450*s,
        textAlignVertical: 'center',
        textAlign: 'center',
        backgroundColor: 'rgba(255,255,255,0.3)'
    },
})