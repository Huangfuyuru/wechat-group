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
            arr: [
                {
                    name: "面具",
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
                        onPress={() => Actions.lcsound()}
                    />
                </View>
                <View>
                    <Text style={{
                        fontWeight: "bold",
                        fontSize: 40 * s,
                        paddingTop: 20 * s,
                        paddingLeft: 25 * s,
                    }}>记录声音 记录你</Text>
                </View>
                <WingBlank>
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
                        renderItem={({item,idx}) => {
                            this.state.paused[idx]=false;
                            this.state.playIcon[idx]="play-circle-o";
                            // console.log(this.state.paused) 
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
                                    flexDirection:"row",
                                    height:70*s,
                                    width:0.8*width,
                                    backgroundColor:"#E8E8E8",
                                    marginLeft: 'auto',
                                    marginRight: "auto",
                                    borderRadius:30,
                                    justifyContent:"space-evenly"
                                }}>
                                <TouchableOpacity style={{
                                    height:50*s,
                                    width:50*s,
                                    backgroundColor:"#E8E8E8",
                                    borderRadius:50,
                                    marginTop:10*s,
                                    
                                }} 
                                // onPress={this.play(idx)}
                                >
                                   <Icon3
                                   style={{
                                       textAlign:"center",
                                       textAlignVertical:"center",
                                       fontSize:50*s,
                                       color:"#989898"
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
        marginBottom: 10,
        height: 200 * s,
        width: 0.88 * width,
        marginTop: 10 * s,
        marginLeft: 'auto',
        marginRight: "auto",

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