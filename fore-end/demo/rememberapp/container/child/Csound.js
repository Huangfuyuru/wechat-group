import React, { Component } from 'react'
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    Alert,
    FlatList,
    Slider,
    TouchableOpacity
} from "react-native"
import { WingBlank } from '@ant-design/react-native'
import Video from 'react-native-video'
import Icon1 from 'react-native-vector-icons/Feather'
import Icon2 from 'react-native-vector-icons/Ionicons'
import Icon3 from "react-native-vector-icons/FontAwesome"
import { Actions } from 'react-native-router-flux';
import { spring } from 'react-native-reanimated'
const { width, scale, height } = Dimensions.get('window');
const s = width / 640;
export default class Lsound extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: [
                {
                    name: "就让我来记录你的声音",
                    setdate: "2020-04-13",
                },
                {
                    name: "稻花香",
                    setdate: "2020-04-13",
                },
                {
                    name: "面具",
                    setdate: "2020-04-13",
                },
                {
                    name: "稻花香",
                    setdate: "2020-04-13",
                },  {
                    name: "面具",
                    setdate: "2020-04-13",
                },
                {
                    name: "稻花香",
                    setdate: "2020-04-13",
                },
            ], 
            length:   2          ,                     //数组长度
            currentTime: 0.0,					//当前播放的时间
            paused: [],						//播放
            sliderValue: 0,					//进度条的进度
            duration: 0.0	,					//总时长
            playIcon:[]                          //播放暂停图标
        }
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
    setTime(data) {
        let sliderValue = parseInt(this.state.currentTime);
        this.setState({
            sliderValue: sliderValue,
            currentTime: data.currentTime
        });
    }
    //设置总时长
    setDuration(duration) {
        this.setState({ duration: duration.duration });
    }
    // play=(idx)=> {
    //     const paused0=[...this.state.paused];
    //     paused0[idx] =!paused0[idx];
    //     const playIcon0=[...this.state.playIcon];
    //     playIcon0[idx]=paused0[idx] ? 'pause-circle-o' : 'play-circle-o'
    //     this.setState({
    //         paused: paused0,
    //         playIcon:playIcon0
    //     })
    //     console.log(this.state.paused)
    //   }

    
    // componentDidMount() {
    //     console.log(this.state.paused)   
    // }
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
                        onPress={() => Actions.ccsound()}
                    />
                </View>
                <View>
                    <Text style={{
                        width:0.95*width,
                        height:0.05*height,
                        textAlignVertical:'bottom',
                        marginLeft:'auto',
                        marginRight:'auto',
                        // backgroundColor:'#ccc',
                        fontWeight: "bold",
                        fontSize: 26 * s,
                    }}>记录声音 记录你</Text>
                </View>
                <WingBlank>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        keyExtractor={this._keykeyExtractor}
                        ListFooterComponent={
                            <View style={{
                                width: '100%',
                                marginTop: 20*s,
                            }}>
                                <Text 
                                    style={{
                                        width: 0.9 * width,
                                        marginLeft: 'auto',
                                        marginRight: 'auto',
                                        backgroundColor: '#ccc',
                                        height: 0.5,
                                    }}></Text>
                                <Text style={{
                                    marginTop: -10,
                                    width: 100 * s,
                                    height: 25,
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
                        data={this.state.lists}
                        numColumns={1}
                        renderItem={({item,idx}) => {
                            this.state.paused[idx]=false;
                            this.state.playIcon[idx]="play-circle-o";
                            // console.log(this.state.paused) 
                            return <View style={styles.box}>
                                <View style={styles.voicetitle}>
                                    <Text style={{
                                        fontSize: 23*s,
                                        width:0.38*width,
                                        textAlignVertical:'bottom',
                                        // backgroundColor:'#ccc'
                                    }}>{item.name}</Text>
                                    <Icon2
                                        name='ios-trash'
                                        size={30}
                                        color='#333'
                                        style={{
                                            textAlignVertical: 'bottom',
                                            fontSize: 40 * s,
                                        }}
                                    />
                                </View>
                                <View style={styles.voiceline}>
                                    <TouchableOpacity 
                                    // onPress={this.play(idx)}
                                    >
                                    <Icon3
                                        style={{
                                            height:0.06*height,
                                            textAlign:"center",
                                            textAlignVertical:"center",
                                            fontSize:50*s,
                                            // backgroundColor:'#ccc',
                                            color:"#989898",
                                            // color:"#bbcccc",
                                        }}
                                        name={this.state.playIcon[idx]}/>
                                    </TouchableOpacity>
                                    <Slider
                                        value={this.state.slideValue}
                                        maximumValue={this.state.duration}
                                        step={1}
                                        onValueChange={value => this.setState({ currentTime: value })}
                                        style={{
                                            width:0.55*width,
                                            marginTop:10*s,
                                            marginBottom:10*s,
                                        }}
                                    />
                                    <Icon1 style={{
                                        marginTop:12*s,
                                        fontSize:40*s,
                                        color:"#989898"
                                    }} name="volume-2" />
                                </View>
                                {/* <Video
                                    source={{uri:"https://webfs.yun.kugou.com/202004182032/f96761db7b9ff61cb31009719ad02120/G193/M0B/1F/11/oZQEAF6TBEOABqcEAEGGA9kKc4o120.mp3"}}
                                    ref='player'
                                    paused={this.state.paused}
                                    onLoad={data => this.setDuration(data)}
                                    volume={1.0}
                                    playInBackground={true}
                                    onProgress={e => this.setTime(e)}
                                    playWhenInactive={true}
                                    style={styles.audio}
                                /> */}
                                <Text style={{
                                    marginLeft: "auto",
                                    marginRight: 20 * s
                                }
                                }>记录时间：{item.setdate}</Text>
                            </View>
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
        marginTop: 0.01*height,
        backgroundColor: '#fff',
        height: 0.8*height,
        borderColor: "#C0C0C0",
        borderColor:'rgba(204,204,204,0.3)',
        // borderWidth:1,
        // backgroundColor:'#ccc',
    },
    box: {
        borderColor: "rgba(255,191,45,0.2)",
        // backgroundColor:'rgba(255,191,45,0.2)',
        borderWidth: 2,
        borderRadius: 10,
        marginBottom: 10,
        height: 0.16*height,
        width: 0.85 * width,
        marginTop: 10 * s,
        marginLeft: 'auto',
        marginRight: "auto",
    },
    voicetitle:{
        width:0.75*width,
        marginLeft:'auto',
        marginRight:'auto',
        marginBottom:0.008*height,
        // backgroundColor:'#ccc',
        height:0.05*height,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    voiceline:{
        flexDirection:"row",
        height:0.06*height,
        width:0.8*width,
        backgroundColor:'rgba(204,204,204,0.2)',
        marginLeft: 'auto',
        marginRight: "auto",
        marginBottom:0.005*height,
        borderRadius:10,
        justifyContent:"space-evenly",
    },
    audio: {
        backgroundColor: "pink",
        // height: 25 * s,
        borderRadius: 20,
        // width: 0.8 * width,
        marginLeft: 'auto',
        marginRight: "auto",
        marginBottom: 15 * s
    }
})