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
                    id:"3",
                    name: "面具",
                    setdate: "2020-04-13",
                    pasued:true,
                    uri:"https://webfs.yun.kugou.com/202004220946/8b16e3ae702900799dce0419a62e2e9c/G193/M0B/1F/11/oZQEAF6TBEOABqcEAEGGA9kKc4o120.mp3"
                },
                {
                    id:"1",
                    name: "Fire",
                    setdate: "2020-04-13",
                    pasued:true,
                    uri:"https://webfs.yun.kugou.com/202004221818/ad7d470118501ce4e74ed0dc306cb31b/G101/M04/1A/09/RZQEAFu3_MiAcRSqADM-ivg677o868.mp3"
                },
                {
                    id:"9",
                    name: "面具",
                    setdate: "2020-04-13",
                    pasued:true,
                    uri:"https://webfs.yun.kugou.com/202004220929/6aae5dda554a5366d38b9bad5c4904d7/G193/M0B/1F/11/oZQEAF6TBEOABqcEAEGGA9kKc4o120.mp3"
                },
                {
                    id:"4",
                    name: "面具",
                    setdate: "2020-04-13",
                    pasued:true,
                    uri:"https://webfs.yun.kugou.com/202004220929/6aae5dda554a5366d38b9bad5c4904d7/G193/M0B/1F/11/oZQEAF6TBEOABqcEAEGGA9kKc4o120.mp3"
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
    componentDidMount(){
        const arr0=[...this.state.lists]
        arr0.map((item)=>{
           item.currentTime=0.0;
           item.slideValue=0.0,
           item.duration=0.0,
           item.muted=false
        })
        this.setState({
            lists:arr0
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
    setTime(data,id) {
        const arr0=[...this.state.lists]
        arr0.map((item)=>{
            if(item.id==id){
               item.slideValue=parseInt(item.currentTime)
               item.currentTime=data.currentTime;
            }
        })
        this.setState({
            lists:arr0
        })
    }
    // 设置总时长
    setDuration(data,id) {
        const arr0=[...this.state.lists]
        arr0.map((item)=>{
            if(item.id==id){
               item.duration=data.duration
            }
        })
        this.setState({
            lists:arr0
        })
    }
    onValue=(value,id)=>{
        const arr0=[...this.state.lists]
        arr0.map((item)=>{
            if(item.id==id){
               item.currentTime=value
            }
        })
        this.setState({
            lists:arr0
        })
    }
    
    play=(id)=> {
        const arr0=[...this.state.lists]
        arr0.map((item)=>{
            if(item.id==id){
                item.pasued=!item.pasued
            }
        })
        this.setState({
            lists:arr0
        })
    }
    spin=(id)=>{
        const arr0=[...this.state.lists]
        arr0.map((item)=>{
            if(item.id==id){
                item.muted=!item.muted
            }
        })
        this.setState({
            lists:arr0
        })
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
                                    <TouchableOpacity onPress={this.play.bind(this, item.id)}>
                                    <Icon3
                                        style={{
                                            height:0.06*height,
                                            textAlign:"center",
                                            textAlignVertical:"center",
                                            fontSize:50*s,
                                            // marginRight:0.01*width,
                                            // backgroundColor:'#ccc',
                                            color:"#989898",
                                            // color:"#bbcccc",
                                        }}
                                        name={item.pasued ? 'play-circle-o' : 'pause-circle-o'}/>
                                    </TouchableOpacity>
                                    <Text 
                                        style={{
                                            // width:0.25*width,
                                            marginLeft:0.01*width,
                                            textAlignVertical:"center"
                                        }}>{this.formatMediaTime(item.currentTime).split('.')[0]}/{this.formatMediaTime(item.duration).split('.')[0]}</Text>
                                    <Slider
                                        value={item.slideValue}
                                        maximumValue={item.duration}
                                        step={1}
                                        onValueChange={this.onValue.bind(this,item.id)}
                                        minimumTrackTintColor="#FFBF2D"
                                        maximumTrackTintColor="#fff"
                                        thumbTintColor="#fff"
                                        style={{
                                            width:0.46*width,
                                            marginTop:"auto",
                                            marginBottom:"auto",
                                        }}
                                    />
                                    <TouchableOpacity activeOpacity={0.8} onPress={this.spin.bind(this,item.id)}>
                                        <Icon1 style={{
                                            marginTop:"auto",
                                            marginBottom:"auto",
                                            fontSize:40*s,
                                            color:"#989898"
                                        }} name={item.muted?"volume-x":"volume-2"} />
                                    </TouchableOpacity>
                                </View>
                                <Video
                                    source={{uri:item.uri}}
                                    ref='player'
                                    paused={item.pasued}
                                    onLoad={data => this.setDuration(data,item.id)}
                                    volume={1.0}
                                    muted={item.muted}
                                    playInBackground={true}
                                    onProgress={data => this.setTime(data,item.id)}
                                />
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
        paddingLeft:0.01*width,
        paddingRight:0.01*width,
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