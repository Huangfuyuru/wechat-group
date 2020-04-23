import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Dimensions,
    Text,
    Image,
    View,
    Slider,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    Animated,
    Easing,
    Alert
} from 'react-native';

// import { Slider } from 'react-native-elements'
import Sound from 'react-native-sound'
import config from "../../config";

let {width, height} = Dimensions.get('window');
let mp3 = "";
//如果是网络音频，使用 new Sound(mp3,null,error => {})
let whoosh = null;

export default class MusicTest extends Component {
    constructor(props) {
        super(props);
        this.spinValue = new Animated.Value(0)
        this.state = {
            volume: 0.5,
            seconds: 0, //秒数
            totalMin: '', //总分钟
            totalSec: '', //总分钟秒数
            nowMin: 0, //当前分钟
            nowSec: 0, //当前秒钟
            maximumValue: 0, //滑块最大值,
            songs: [],   //歌曲id数据源
            song_id: '',     //歌曲id
            title: '',       //歌曲名字
            author: '',      //歌曲作者
            file_link: '',   //歌曲播放链接
            sliderValue: 0,    //Slide的value
            pause: false,       //歌曲播放/暂停
            currentTime: 0.0,   //当前时间
            duration: 0.0,     //歌曲时间
        }
    }

    loadSongInfo = (index) => {
        //加载歌曲
        let songid = this.state.songs[index]
        let url = config.serverUrl + "/Music/GetMusicInfo/getMusicInfo?songId=" + songid
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                let songinfo = responseJson.data.songinfo
                let bitrate = responseJson.data.bitrate
                this.setState({
                    pic_small: songinfo.pic_small, //小图
                    pic_big: songinfo.pic_big,  //大图
                    title: songinfo.title,     //歌曲名
                    author: songinfo.author,   //歌手
                    file_link: bitrate.file_link,   //播放链接
                })
                whoosh = new Sound(bitrate.file_link, null, (error) => {
                    if (error) {
                        return console.log('资源加载失败', error);
                    }
                })
                let totalTime = bitrate.file_duration;//歌曲长度
                let totalMin = parseInt(totalTime / 60); //总分钟数
                let totalSec = totalTime - totalMin * 60; //秒钟数并判断前缀是否 + '0'
                totalSec = totalSec > 9 ? totalSec : '0' + totalSec;
                this.setState({
                    totalMin,
                    totalSec,
                    maximumValue: totalTime,
                })
                this.onGetLyric(songid);
            })
    }
    onGetMusicLists = () => {
        let url = config.serverUrl + "/Music/GetMusicLists/getMusicLists";
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                let listAry = responseJson.data.song_list
                let song_idAry = []; //保存song_id的数组
                for (let i = 0; i < listAry.length; i++) {
                    let song_id = listAry[i].song_id
                    song_idAry.push(song_id)
                }
                this.setState({
                    songs: song_idAry
                }, () => {
                    this.loadSongInfo(0)
                })
            })
            .catch((error) => { // 错误处理
                // Alert.alert(JSON.stringify(error))
            })
    }
  
    componentDidMount() {
        //先从总列表中获取到song_id保存
        this.onGetMusicLists();
        this.spin()   //   启动旋转
    }

   
   
    // 播放/暂停
    playAction = () => {
        let pauseStatus = !this.state.pause;
        this.setState({
            pause: !this.state.pause
        })
        //判断按钮显示什么（播放）
        if (pauseStatus == true) {
            this.setState({
                isplayBtn: "http://qiniu.guang.lerzen.com/bofang.png"
            })
            this.start();
        } else {
            // 暂停
            this.setState({
                isplayBtn: "http://qiniu.guang.lerzen.com/zhanting.png"
            })
            this.pause();
        }
    }

    componentWillUnmount() {
        this.time && clearTimeout(this.time);
    }


//把秒数转换为时间类型
    formatTime = (time) => {
        // 71s -> 01:11
        let min = Math.floor(time / 60)
        let second = time - min * 60
        min = min >= 10 ? min : '0' + min
        second = second >= 10 ? second : '0' + second
        return min + ':' + second
    }
    // 开始播放
    start = () => {
        whoosh.play();
        this.time = setInterval(() => {
            whoosh.getCurrentTime(seconds => {
                seconds = Math.ceil(seconds);
                this.onGetNowTime(seconds)
            })
        }, 1000)
    }
    // 暂停
    pause = () => {
        clearInterval(this.time);
        whoosh.pause();
    }
    // 停止
    stop = () => {
        clearInterval(this.time);
        this.setState({
            nowMin: 0,
            nowSec: 0,
            seconds: 0,
        })
        whoosh.stop();
    }

    recover = () => {
        if (whoosh) {
            this.pause();
            this.stop();
            whoosh = null;
        }
        this.setState({
            pause: false,
            isplayBtn: "http://qiniu.guang.lerzen.com/zhanting.png",  //播放/暂停按钮背景图
            seconds: 0,
            currentTime: 0.0
        })
    }
    // 时间处理
    onGetNowTime = (seconds) => {
        let nowMin = this.state.nowMin,
            nowSec = this.state.nowSec;
        if (seconds >= 60) {
            nowMin = parseInt(seconds / 60); //当前分钟数
            nowSec = seconds - nowMin * 60;
            nowSec = nowSec < 10 ? '0' + nowSec : nowSec;
        } else {
            nowSec = seconds < 10 ? '0' + seconds : seconds;
        }
        this.setState({
            nowMin,
            nowSec,
            seconds
        })
        this.setState({
            currentTime: seconds
        })
    }

    render() {
        if (this.state.file_link.length <= 0) {
            return (
                <ActivityIndicator
                    animating={this.state.animating}
                    style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
                    size="large"/>
            )
        } else {
            const spin = this.spinValue.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg']
            })
            return (
                <View style={styles.container}>
                    {/*背景大图*/}
                    <Image source={{uri: this.state.pic_big}} style={{flex: 1}}/>
                    {/*背景白色透明遮罩*/}
                    <View style={{
                        position: 'absolute',
                        width: width,
                        height: height,
                        backgroundColor: 'white',
                        opacity: 0.8
                    }}/>
                    <View style={{position: 'absolute', width: width}}>

                        {/*进度条*/}
                        <Slider
                            ref='slider'
                            // disabled //禁止滑动
                            maximumTrackTintColor={'#ccc'} //右侧轨道的颜色
                            minimumTrackTintColor={'skyblue'} //左侧轨道的颜色
                            maximumValue={this.state.maximumValue} //滑块最大值
                            minimumValue={0} //滑块最小值
                            step={1}
                            value={this.state.seconds}
                            onSlidingComplete={(value) => { //用户完成更改值时调用的回调（例如，当滑块被释放时）
                                value = parseInt(value);
                                this.onGetNowTime(value)
                                // 设置播放时间
                                whoosh.setCurrentTime(value);
                            }}
                            onValueChange={(value) => {
                                this.onGetNowTime(value)
                            }}
                        />
                        {/*歌曲按钮*/}
                        <View style={{flexDirection: 'row', justifyContent: 'space-around',marginTop:20}}>
                            <TouchableOpacity onPress={() => this.prevAction(this.state.currentIndex - 1)}>
                                <Image source={{uri: "http://qiniu.guang.lerzen.com/shangyishou.png"}}
                                       style={{width: 30, height: 30}}/>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.playAction()}>
                                <Image source={{uri: this.state.isplayBtn}} style={{width: 30, height: 30}}/>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.nextAction(this.state.currentIndex + 1)}>
                                <Image source={{uri: "http://qiniu.guang.lerzen.com/xiayishou.png"}}
                                       style={{width: 30, height: 30}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            );
        }
    }
}