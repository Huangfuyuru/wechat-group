import React, { Component } from 'react'
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    Alert,
    FlatList,
    Slider,
    TouchableOpacity,
    ToastAndroid,
    ImageBackground,
    Image
} from "react-native"
import { WingBlank } from '@ant-design/react-native'
import Video from 'react-native-video'
import Icon1 from 'react-native-vector-icons/Feather'
import Icon2 from 'react-native-vector-icons/Ionicons'
import Icon3 from "react-native-vector-icons/FontAwesome"
import Icon4 from 'react-native-vector-icons/SimpleLineIcons'
import moment from 'moment'
import Icon5 from 'react-native-vector-icons/Fontisto'

import { Actions } from 'react-native-router-flux';
import { myFetch } from '../../src/utils'
const { width, scale, height } = Dimensions.get('window');
const s = width / 640;
const image = "https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1106982671,1158338553&fm=26&gp=0.jpg"
export default class Lsound extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loverid: "",
            arr: []
        }
    }
    componentDidMount() {
        this.setState({
            loverid: this.props.loverId
        })
        myFetch.get('/lover/lsound', {
            loverid: this.props.loverId
        }).then(res => {
            const arr0=res.msg;
            arr0.map((item)=>{
               item.currentTime=0.0;
               item.slideValue=0.0;
               item.duration=0.0;
               item.muted=false;
               item.paused=true;
            })
            this.setState({
                arr: arr0
            })
        })

    }
    componentWillReceiveProps(nextProps) {
       const arr0=nextProps.data;
    //    console.log("数据",nextProps.data)
       arr0.map((item)=>{
        item.currentTime=0.0;
        item.slideValue=0.0;
        item.duration=0.0;
        item.muted=false;
        item.paused=true;
     })
     this.setState({
         arr: arr0
     })
    }
    showAlert = () => {
        Alert.alert('', '确定要删除吗？',
            [
                { text: "确定", onPress: this.opntion1Selected },
                { text: "返回", onPress: this.opntion2Selected },
            ]
        );
    }
    //格式化音乐播放的时间为0：00
    formatMediaTime(duration) {
        let min = Math.floor(duration / 60);
        let second = duration - min * 60;
        min = min >= 10 ? min : "0" + min;
        second = second >= 10 ? second : "0" + second;
        return min + ":" + second;
    }
    //设置进度条和播放时间的变化
    setTime(data, id) {
        const arr0 = [...this.state.arr]
        arr0.map((item) => {
            if (item.id == id) {
                // console.log(item.currentTime)
                if (this.formatMediaTime(item.currentTime).split(".")[0] == this.formatMediaTime(item.duration).split(".")[0]) {
                    item.paused = true
                    // item.slideValue=0.0
                    // item.currentTime=0.0
                }
                else {
                    item.slideValue = parseInt(item.currentTime)
                    item.currentTime = data.currentTime;
                }
            }
        })
        this.setState({
            arr: arr0
        })
    }

    // 设置总时长
    setDuration(data, id) {
        const arr0 = [...this.state.arr]
        arr0.map((item) => {
            if (item.id == id) {
                item.duration = data.duration
            }
        })
        this.setState({
            arr: arr0
        })
    }
    onValue = (value, id) => {
        const arr0 = [...this.state.arr]
        arr0.map((item) => {
            if (item.id == id) {
                item.currentTime = value
                //    this.player.seek(value)
            }
        })
        this.setState({
            arr: arr0
        })
    }
    play = (id, pa) => {
        const arr0 = [...this.state.arr]
        arr0.map((item) => {
            if (item.id == id) {
                item.paused = !item.paused
            }
        })
        const arr1 = arr0
        arr1.map((item) => {
            if (item.id != id && pa) {
                item.paused = pa
            }
        })
        this.setState({
            arr: arr1
        })
    }
    spin = (id) => {
        const arr0 = [...this.state.arr]
        arr0.map((item) => {
            if (item.id == id) {
                item.muted = !item.muted
            }
        })
        this.setState({
            arr: arr0
        })
    }
    rmMusic=(e)=>{
        Alert.alert('提示', '确定要删除吗？',
            [
                { text: "确定", onPress: ()=>{
                    myFetch.get('/lover/lsound/lrsound',{
                        loverid:this.state.loverid,
                        loverVoiceid:e.id,
                    }).then(res=>{
                        if(res.code==0){
                            if(res.msg){
                            const arr0=res.msg;
                            arr0.map((item)=>{
                               item.currentTime=0.0;
                               item.slideValue=0.0,
                               item.duration=0.0,
                               item.muted=false,
                               item.paused=true
                            })
                            this.setState({
                                arr: arr0
                            })
                            ToastAndroid.showWithGravityAndOffset(
                                '删除成功！',
                            ToastAndroid.SHORT,
                            ToastAndroid.BOTTOM,
                            25,-100)
                            }
                            else{
                                this.setState({
                                    arr: []
                                })
                            }
                        }else{
                            ToastAndroid.show("删除失败!", ToastAndroid.SHORT);
                        }
                        
                    })
                } },
                { text: "返回", onPress: this.opntion2Selected },
            ]
        )
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
                    <Text style={styles.title}>语音记事</Text>
                    <Icon2
                        style={styles.icon}
                        name='md-add'
                        onPress={() => Actions.lcsound({loverid:this.state.loverid})}
                    />
                </View>
                {/* <View>
                    <Text style={{
                        fontWeight: "bold",
                        fontSize: 20,
                        paddingTop: 20 * s,
                        paddingLeft: 25 * s,
                    }}>记录声音 记录你</Text>
                </View> */}
                <WingBlank>{
                    this.state.arr[0] ?
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            keyExtractor={this._keykeyExtractor}
                            ListFooterComponent={
                                <View style={{
                                    width: '100%',
                                    marginTop: 20,
                                }}>
                                    <Text style={{
                                        width: 0.9 * width,
                                        marginLeft: 'auto',
                                        marginRight: 'auto',
                                        backgroundColor: '#ccc',
                                        height: 0.5,
                                    }}></Text>
                                    <Text style={{
                                        marginTop: -10,
                                        width: 100 * s,
                                        height: 50,
                                        textAlign: 'center',
                                        marginLeft: 'auto',
                                        marginRight: 'auto',
                                        backgroundColor: '#fff',
                                        fontSize: 15,
                                        color: '#bdbbb8'
                                    }}>到底了</Text>
                                </View>
                            }
                            style={styles.scrollView}
                            data={this.state.arr}
                            numColumns={1}
                            renderItem={({ item }) => {
                                return <View style={styles.box}>
                                    <View style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between"
                                    }}>
                                        <Text style={{
                                            fontSize: 30 * s,
                                            marginTop: 30 * s,
                                            marginLeft: 30 * s
                                        }}>{item.name}</Text>
                                        <Icon2
                                            onPress={()=>this.rmMusic(item)}
                                            name='ios-trash'
                                            size={30}
                                            color='#333'
                                            style={{
                                                textAlignVertical: 'center',
                                                fontSize: 40 * s,
                                                marginTop: 30 * s,
                                                marginRight: 40 * s,
                                                marginBottom: 15 * s
                                            }}
                                        />

                                    </View>
                                    <View style={{
                                        flexDirection: "row",
                                        height: 75 * s,
                                        width: 0.85 * width,
                                        backgroundColor: 'rgba(204,204,204,0.2)',
                                        marginLeft: 'auto',
                                        marginRight: "auto",
                                        borderRadius: 30,
                                        justifyContent: "space-evenly"
                                    }}>
                                        <TouchableOpacity style={{
                                            height: 50 * s,
                                            width: 50 * s,
                                            backgroundColor: "#E8E8E8",
                                            borderRadius: 50,
                                            marginTop: 12 * s,
                                            marginLeft: 20 * s,
                                            marginRight: 20 * s
                                        }}
                                            onPress={this.play.bind(this, item.id, item.paused)}
                                        >
                                            <Icon3
                                                style={{
                                                    textAlign: "center",
                                                    textAlignVertical: "center",
                                                    fontSize: 50 * s,
                                                    color: "#989898"
                                                }}
                                                name={item.paused ? 'play-circle-o' : 'pause-circle-o'} />
                                        </TouchableOpacity>
                                        <Text style={{
                                            textAlignVertical: "center"
                                        }}>{this.formatMediaTime(item.currentTime).split('.')[0]}/{this.formatMediaTime(item.duration).split('.')[0]}</Text>
                                        <Slider
                                            value={item.slideValue}
                                            maximumValue={item.duration}
                                            step={1}
                                            onValueChange={value => this.onValue(value, item.id)}
                                            // onSlidingComplete={value => this.player(value)}
                                            minimumTrackTintColor="#FFBF2D"
                                            maximumTrackTintColor="#989898"
                                            thumbTintColor="#fff"
                                            style={{
                                                width: 0.46 * width,
                                                marginTop: "auto",
                                                marginBottom: "auto",
                                            }}
                                        />
                                        <TouchableOpacity activeOpacity={0.8} onPress={this.spin.bind(this, item.id)}>
                                            <Icon1 style={{
                                                marginTop: "auto",
                                                marginBottom: "auto",
                                                marginRight: 25 * s,
                                                fontSize: 40 * s,
                                                color: "#989898"
                                            }} name={item.muted ? "volume-x" : "volume-2"} />
                                        </TouchableOpacity>
                                    </View>
                                    <Video
                                        source={{ uri: item.voiceurl }}
                                        ref={(ref) => {
                                            this.player = ref
                                        }}
                                        paused={item.paused}
                                        onLoad={data => this.setDuration(data, item.id)}
                                        onProgress={data => this.setTime(data, item.id)}
                                        volume={1.0}
                                        // seek={this.player(item.id)}
                                        // repeat={true}
                                        muted={item.muted}
                                        // onEnd={this.onEnd} 
                                        playInBackground={true}
                                        onTimedMetadata={this.onTimedMetadata}
                                    />
                                    <Text style={{
                                        marginLeft: "auto",
                                        marginRight: 20 * s
                                    }
                                    }>记录时间：{ moment(item.setdate).format("YYYY-MM-DD")} </Text>
                                </View>
                            }}
                        />
                        :
                        <View >
                            <Text style={styles.nulltext}>哎呀，一条语音都没有呢</Text>
                            <View style={styles.box1}>
                                <Icon1 size={50} color='#333' style={styles.nullicon} name='corner-right-up' />
                                <View style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between"
                                }}>
                                    <Text style={{
                                        fontSize: 30 * s,
                                        marginTop: 30 * s,
                                        marginLeft: 30 * s
                                    }}>点击右上角添加</Text>
                                </View>
                                <View style={{
                                    flexDirection: "row",
                                    height: 75 * s,
                                    width: 0.85 * width,
                                    backgroundColor: 'rgba(204,204,204,0.2)',
                                    marginLeft: 'auto',
                                    marginRight: "auto",
                                    borderRadius: 30,
                                    marginTop: 18 * s,
                                    justifyContent: "space-evenly"
                                }}>
                                    <TouchableOpacity style={{
                                        height: 50 * s,
                                        width: 50 * s,
                                        backgroundColor: "#E8E8E8",
                                        borderRadius: 50,
                                        marginTop: 12 * s,
                                        marginLeft: 20 * s,
                                        marginRight: 20 * s
                                    }}
                                    >
                                        <Icon3
                                            style={{
                                                textAlign: "center",
                                                textAlignVertical: "center",
                                                fontSize: 50 * s,
                                                color: "#989898"
                                            }}
                                            name='play-circle-o' />
                                    </TouchableOpacity>
                                    <Text style={{
                                        textAlignVertical: "center"
                                    }}>00:00/00:00</Text>
                                    <Slider
                                        value={0}
                                        maximumValue={10}
                                        step={1}
                                        // onSlidingComplete={value => this.player(value)}
                                        minimumTrackTintColor="#FFBF2D"
                                        maximumTrackTintColor="#989898"
                                        thumbTintColor="#fff"
                                        style={{
                                            width: 0.46 * width,
                                            marginTop: "auto",
                                            marginBottom: "auto",
                                        }}
                                    />
                                    <TouchableOpacity activeOpacity={0.8}>
                                        <Icon1 style={{
                                            marginTop: "auto",
                                            marginBottom: "auto",
                                            marginRight: 25 * s,
                                            fontSize: 40 * s,
                                            color: "#989898"
                                        }} name="volume-2" />
                                    </TouchableOpacity>
                                </View>
                                <Text style={{
                                    marginLeft: "auto",
                                    marginRight: 20 * s
                                }
                                }>记录时间：{moment(new Date()).format("YYYY-MM-DD")}</Text>
                            </View>
                        </View>
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
        flexDirection: 'row',
        paddingLeft: 0.03 * width,
        paddingTop: '1%',
        paddingRight: 0.03 * width,
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
    scrollView: {
        marginTop: 18 * s,
        backgroundColor: '#fff',
        paddingLeft: 10,
        paddingRight: 10,
        height: 950 * s,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: "#C0C0C0"
    },
    box: {
        borderColor: "#FFBF2D",
        borderWidth: 1,
        borderRadius: 20,
        // marginBottom: 10,
        height: 200 * s,
        width: 0.88 * width,
        marginTop: 30 * s,
        marginLeft: 'auto',
        marginRight: "auto",

    },
    box1: {
        borderColor: "#FFBF2D",
        borderWidth: 1,
        borderRadius: 20,
        // marginBottom: 10,
        height: 200 * s,
        width: 0.88 * width,
        marginTop: 30 * s,
        marginLeft: 'auto',
        marginRight: "auto",

    },
    nulltext: {
        width: 0.55 * width,
        height: 0.05 * height,
        fontSize: 23 * s,
        letterSpacing: 1,
        color: '#333',
        backgroundColor: 'rgba(221, 221, 221,0.2)',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
        textAlignVertical: 'center',
        marginTop: 40 * s
    },
    nullicon: {
        width: 0.08 * height,
        height: 0.08 * height,
        position: "absolute",
        top: -40,
        left:500*s,
        textAlignVertical: 'center',
        textAlign: 'center',
        backgroundColor: 'rgba(255,255,255,0.3)'
    },
})