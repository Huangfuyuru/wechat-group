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
    TouchableWithoutFeedback
} from "react-native"
import Icon from "react-native-vector-icons/Feather"
import Icon1 from 'react-native-vector-icons/SimpleLineIcons'
import Icon3 from "react-native-vector-icons/Ionicons"
import Video from 'react-native-video'
import { Actions } from "react-native-router-flux"
import { WingBlank } from "@ant-design/react-native"
const { width, scale, height } = Dimensions.get('window');
const s = width / 640;
export default class Lsouvenir extends Component {
    constructor() {
        super()
        this.state = {
            arr: [
                {
                    src: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1996853672,3140841536&fm=15&gp=0.jpg",
                    date: "2020-02-16",
                    txt: "第一次一起去旅行",
                    heart: "ღ ღ ღ ღ ღ",
                    paused: false,
                    id: "1",
                    uri: "https://webfs.yun.kugou.com/202004231946/1f6906e31d6643aedc6d71a2cca79048/G197/M01/0B/07/ZYcBAF5KEuKIXbmWAAUALL9sVWUAAATngDPkVsABQBE326.mp3"

                },
                {
                    src: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1996853672,3140841536&fm=15&gp=0.jpg",
                    date: "2020-02-16",
                    txt: "第一次接吻",
                    heart: "ღ ღ ღ",
                    id: "2",
                    paused: false,
                    uri: "https://webfs.yun.kugou.com/202004231946/1f6906e31d6643aedc6d71a2cca79048/G197/M01/0B/07/ZYcBAF5KEuKIXbmWAAUALL9sVWUAAATngDPkVsABQBE326.mp3"

                },
                {
                    src: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1996853672,3140841536&fm=15&gp=0.jpg",
                    date: "2020-02-16",
                    txt: "第一次接吻",
                    heart: "ღ ღ ღ",
                    id: "3",
                    paused: false,
                    uri: "https://webfs.yun.kugou.com/202004231946/1f6906e31d6643aedc6d71a2cca79048/G197/M01/0B/07/ZYcBAF5KEuKIXbmWAAUALL9sVWUAAATngDPkVsABQBE326.mp3"


                },
                {
                    src: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1996853672,3140841536&fm=15&gp=0.jpg",
                    date: "2020-02-16",
                    txt: "第一次接吻",
                    heart: "ღ ღ ღ ღ ღ",
                    id: "4",
                    paused: false,
                    uri: "https://webfs.yun.kugou.com/202004231946/1f6906e31d6643aedc6d71a2cca79048/G197/M01/0B/07/ZYcBAF5KEuKIXbmWAAUALL9sVWUAAATngDPkVsABQBE326.mp3"

                }, {
                    src: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1996853672,3140841536&fm=15&gp=0.jpg",
                    date: "2020-02-16",
                    txt: "第一次接吻",
                    heart: "ღ ღ ღ ღ ღ",
                    id: "5",
                    paused: false,
                    uri: "https://webfs.yun.kugou.com/202004231946/1f6906e31d6643aedc6d71a2cca79048/G197/M01/0B/07/ZYcBAF5KEuKIXbmWAAUALL9sVWUAAATngDPkVsABQBE326.mp3"

                },
            ],
            rotateValue: new Animated.Value(0),
            bounceValue: new Animated.Value(1),
        }
    }
    componentDidMount() {
        this.startAnimation();
    }
    startAnimation() {
        this.state.bounceValue.setValue(1);//和上面初始值一样，所以
        //弹动没有变化
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
        const arr0 = [...this.state.arr]
        arr0.map((item) => {
            if (item.id == id) {
                item.paused = !item.paused
            }
        })
        this.setState({
            arr: arr0
        })
        console.log(this.state.arr)
    }
    alertMsg = () => {
        Alert.alert(
            '提示',
            '确认删除？',
            [
                {
                    text: '确定', onPress: () => {
                        ToastAndroid.show('删除成功！', ToastAndroid.SHORT)
                    }
                },
                { text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            ],
        );
    }
    render() {
        const list = this.state.arr
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
                        onPress={() => Actions.lcsouvenir()}
                    />
                </View>
                <WingBlank>

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
                            const a = item.paused ? "360deg" : "0deg"
                            return (
                                <TouchableWithoutFeedback onLongPress={this.alertMsg} >
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
                                            <Animated.Image source={{ uri: item.src }}
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
                                        <TouchableOpacity activeOpacity={1} onPress={() => Actions.souvenir({ data: item })}>
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

                                                >{item.txt ? (item.txt.length >= 7 ? item.txt.substr(0, 7) + "..." : item.txt) : ""}</Text>
                                                <Text
                                                    style={{
                                                        fontSize: 20 * s,
                                                        textAlign: "center",
                                                        marginBottom: 50 * s
                                                    }}
                                                >{item.date}</Text>
                                                <Text
                                                    style={{
                                                        fontSize: 35 * s,
                                                        textAlign: "center",
                                                        color: "#FF1744"
                                                    }}
                                                >{item.heart}</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <Video
                                                    source={{ uri: item.uri }}
                                                    ref={(ref) => {
                                                        this.player = ref
                                                    }}
                                                    paused={!item.paused}
                                                    volume={1.0}
                                                    playInBackground={true}
                                                />
                                    </View>
                                
                                </TouchableWithoutFeedback>
                            )
                        }}
                    />

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
})