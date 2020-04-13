import React, { Component } from 'react'
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert

} from "react-native"
import Sound from 'react-native-sound';
import { Icon } from '@ant-design/react-native';
import Video from "react-native-video"
import { Actions } from 'react-native-router-flux';
const { width, scale, height } = Dimensions.get('window');
const s = width / 411;
const h = height / 1012;
export default class Lsound extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: [
                {
                    name: "稻花香",
                    setdate: "2020-04-13",
                    musciPath: require('../../assets/01.mp3')
                },
                {
                    name: "稻花香",
                    setdate: "2020-04-13",
                    musciPath: require('../../assets/2.mp3')
                },
                {
                    name: "稻花香",
                    setdate: "2020-04-13",
                    musciPath: require('../../assets/2.mp3')
                },
                {
                    name: "稻花香",
                    setdate: "2020-04-13",
                    musciPath: require('../../assets/2.mp3')
                }
            ]
        }
    }
    // componentDidMount(){
    //     // console.log(this.state.arr)
    //     // console.log('sound');
    //     fetch(`http://localhost:3001/lover/lsound?loverid=${this.state.lover_id}`)
    //     .then(res=>res.json())
    //     .then(json=>(
    //         console.log(json),
    //         this.setState({
    //             arr:json.msg
    //         })
    //     ))
    // }
//    delSound=()=>{
//         fetch(`http://localhost:3001/lover/lsound/lrsound?loverid=${this.state.lover_id}&loverVoiceid=${this.state.loverVoiceid}`,{
//             method:'GET'
//         })
//         .then(res=>res.json())
//         .then(json=>{
//             console.log(json);
//             if(json.code==0){
//             this.setState({
//                 arr:json.msg,
//                 code:"删除成功！"
//             })
//         }
//         })
//     }
    showAlert = () => {
        Alert.alert('', '确定要删除吗？',
            [
                { text: "确定", onPress: this.opntion1Selected },
                { text: "返回", onPress: this.opntion2Selected },
            ]
        );
    }
    render() {
        return (
            <ScrollView>
                <View style={{
                    width: width,
                    backgroundColor: "#fff",
                    height: height,
                }}>
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
                    >语音记事</Text>
                    </View>
                    <Text style={{
                        fontWeight: "bold",
                        fontSize: 18,
                        marginTop: "5%",
                        marginLeft: "10%"
                    }}>记录声音 记录你</Text>
                    <View style={{
                        flexDirection: "column",
                        justifyContent: "center",
                    }}>
                        {
                            this.state.arr.map((item) => {
                                var music = new Sound(item.musciPath, (error) => {
                                    if (error) {
                                        Alert.alert("播放失败。。。");
                                    }
                                });
                                return (
                                    <View style={styles.soundList}>
                                        <Text style={{ fontSize: 15, lineHeight: 20, margin: 8 }}>{item.name}</Text>
                                        <TouchableOpacity style={{ margin: 8 }} onPress={() => { music.play() }}>
                                            <Text >
                                                播放音乐
                                        </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{
                                            position: "absolute",
                                            top: "57%",
                                            left: "20%"
                                        }} onPress={() => { music.pause() }}>
                                            <Text >
                                                暂停
                                        </Text>
                                        </TouchableOpacity>
                                        <Icon name="delete" style={{
                                            position: "absolute",
                                            top: 10,
                                            left: "90%"
                                        }} onPress={this.showAlert} />
                                        {/* <Video
                                        source={item.musciPath} // 音频地址
                                        ref='player'
                                        rate={this.state.isPlay ? 1 : 0}                   // 控制暂停/播放，0 代表暂停paused, 1代表播放normal.
                                        volume={1.0}
                                        // 声音的放声音的放大倍数大倍数，0 为静音  ，1 为正常音量 ，更大的数字表示放大的倍数
                                        muted={false}                  // true代表静音，默认为false.
                                        paused={false}                 // true代表暂停，默认为false
                                        repeat={false}                 // 是否重复播放
                                        playInBackground={false}       // 当app转到后台运行的时候，播放是否暂
                                    /> */}
                                    </View >
                                )
                            })
                        }
                    </View >
                   <View style={{
                       height:"5%",
                       width:"10%",
                       borderColor:"#FFBF2D",
                       borderWidth:1,
                       borderRadius:50,
                       justifyContent:"center",
                       position:"absolute",
                       top:"80%",
                       left:"45%"
                   }}>
                   <Icon style={{margin:5}}  name="plus" size="lg" onPress={()=>Actions.lcsound()}/>
                   </View>
                </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    soundList: {
        borderRadius: 20,
        borderColor: "#FFBF2D",
        borderWidth: 2,
        width: "80%",
        marginLeft: "10%",
        marginTop: "5%",
    }

})