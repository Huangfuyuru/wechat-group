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
import {myFetch} from '../../src/utils'
import { WingBlank } from "@ant-design/react-native"
const { width, scale, height } = Dimensions.get('window');
const s = width / 640;
export default class Lsouvenir extends Component {
    constructor() {
        super()
        this.state = {
            loverId:"",
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
        arr1:[],
            rotateValue: new Animated.Value(0),
            bounceValue: new Animated.Value(1),
        }
    }
    componentDidMount() {
        this.startAnimation();
        this.setState({
            loverId:this.props.loverId
        })
        myFetch.get('/lover/lsouvenir',{
            loverid:this.props.loverId
        }).then(res=>{
            this.setState({
                arr1:res.msg
            })
            const arr0=[...this.state.arr1]
            arr0.map((item)=>{
                item.paused=false
            })
            this.setState({
                arr1:arr0
            })
        })
       
    }
    componentWillReceiveProps(nextProps){
        console.log("hhhh",nextProps.data)
        this.setState({
            arr1:nextProps.data
        },()=>{
        const arr0=[...this.state.arr1]
        arr0.map((item)=>{
            item.paused=false
        })
        this.setState({
            arr1:arr0
        })
        })
        
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
        const arr0 = [...this.state.arr1]
        arr0.map((item) => {
            if (item.id == id) {
                item.paused = !item.paused
            }
        })
        this.setState({
            arr1: arr0
        })
    }
    playMusic1 = (id) => {
        const arr0 = [...this.state.arr]
        arr0.map((item) => {
            if (item.id == id) {
                item.paused = !item.paused
            }
        })
        this.setState({
            arr: arr0
        })
    }
    rmSouvenir=(e)=>{
        var rmname = e.name;
        Alert.alert('提示', '确定要删除吗？',
            [
                { text: "确定", onPress: ()=>{
                    myFetch.get('/lover/lsouvenir/delSouvenir',{
                        loverid:e.lid,
                        loverImpDateid:e.id
                    }).then(res=>{
                        if(res.code==0){
                        this.setState({
                            arr1:res.msg
                        })
                        const arr0=[...this.state.arr1]
                        arr0.map((item)=>{
                            item.paused=false
                        })
                        this.setState({
                            arr1:arr0
                        })
                        ToastAndroid.show('删除'+e.name+'成功！！', ToastAndroid.SHORT);}
                        else{
                        ToastAndroid.show(res.msg, ToastAndroid.SHORT);
                        }
                    })
                } },
                { text: "返回", onPress: this.opntion2Selected },
            ]
        )
    }
    newStar(star){
        let ss='';
        if(star==1){
            ss = "❤";
        }
        else if(star==2){
            ss = "❤ ❤";
        }
        else if(star==3){
            ss = "❤ ❤ ❤";
        }else if(star==4){
            ss = "❤ ❤ ❤ ❤";
        }else if(star==5){
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
                        onPress={() => Actions.lcsouvenir({loverId:this.state.loverId})}
                    />
                </View>
                <WingBlank>
                    {this.state.arr1?
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
                                                   
                                        <TouchableOpacity activeOpacity={1} onPress={() => Actions.souvenir({ data: item })} onLongPress= {()=>this.rmSouvenir(item)}>
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
                    />:
                    <FlatList
                    showsVerticalScrollIndicator={false}
                    style={styles.scrollView}
                    data={this.state.arr}
                    numColumns={1}
                    renderItem={({ item }) => {
                        const a = item.paused ? "360deg" : "0deg"
                        return (
                            <TouchableWithoutFeedback  >
                                
                                <View style={{
                                    height: 800 * s,
                                    width: 0.88 * width,
                                    borderWidth: 0.3,
                                    borderColor: "#000",
                                    marginTop: 60 * s,
                                    marginLeft: 'auto',
                                    marginRight: "auto",
                                    borderRadius: 15,
                                    flexDirection: "column",
                                    flexWrap: "wrap",
                                    backgroundColor: "rgba(255,192,203,.2)"
                                }}>
                                   {/* <View style={{
                                       position:"absolute",
                                       left:85*s,
                                       top:160*s,
                                       zIndex:100
                                   }}>
                                        <Text style={styles.nullcontent}>点击右上角来纪念吧~</Text>
                                    </View> */}
                                    <TouchableOpacity onPress={this.playMusic1.bind(this, item.id)}>
                                        <Animated.Image source={{ uri: item.imgurl }}
                                            style={{
                                                width: 0.70 * width,
                                                height: 0.70 * width,
                                                borderRadius: 200,
                                                marginTop: 44 * s,
                                                marginLeft: 55 * s,
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
                                                width: 0.8 * width,
                                                marginLeft:30*s,
                                                marginTop:6*s,
                                                flexDirection: "column",
                                                // backgroundColor:"red"
                                            }}
                                        >
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
    nullcontent:{
        // color:`${textcolor}`,
        height: 0.08*height, 
        width: 0.6*width,
        textAlign:'center',
        textAlignVertical:'center',
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:0.05*height,
        // padding:0.01*width,
        fontSize:25*s,
        backgroundColor:'rgba(255,255,255,0.3)'
    },
})