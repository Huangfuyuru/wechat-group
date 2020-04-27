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
const { width, scale, height } = Dimensions.get('window');
const s = width / 640;
export default class Lsound extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: [
                {
                    id:"3",
                    name: "面具",
                    setdate: "2020-04-13",
                    pasued:true,
                    uri:"https://webfs.yun.kugou.com/202004231036/b03aa691c217251174cb19f384cbbc24/G193/M0B/1F/11/oZQEAF6TBEOABqcEAEGGA9kKc4o120.mp3"
                },
                {
                    id:"1",
                    name: "Fire",
                    setdate: "2020-04-13",
                    pasued:true,
                    uri:"https://webfs.yun.kugou.com/202004231938/7b748b8783242af42b1f2b7194372184/G101/M04/1A/09/RZQEAFu3_MiAcRSqADM-ivg677o868.mp3"
                },
                {
                    id:"9",
                    name: "ko ko pop",
                    setdate: "2020-04-13",
                    pasued:true,
                    uri:"https://webfs.yun.kugou.com/202004231946/1f6906e31d6643aedc6d71a2cca79048/G197/M01/0B/07/ZYcBAF5KEuKIXbmWAAUALL9sVWUAAATngDPkVsABQBE326.mp3"

                },
                {
                    id:"4",
                    name: "面具",
                    setdate: "2020-04-13",
                    pasued:true,
                    uri:"https://webfs.yun.kugou.com/202004231036/b03aa691c217251174cb19f384cbbc24/G193/M0B/1F/11/oZQEAF6TBEOABqcEAEGGA9kKc4o120.mp3"

                },  
            ], 
        }
    }
    componentDidMount(){
        const arr0=[...this.state.arr]
        arr0.map((item)=>{
           item.currentTime=0.0;
           item.slideValue=0.0,
           item.duration=0.0,
           item.muted=false
        })
        this.setState({
            arr:arr0
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
        console.log("播放")
        const arr0=[...this.state.arr]
        arr0.map((item)=>{
            if(item.id==id){
                console.log(item.currentTime)
                if(this.formatMediaTime(item.currentTime).split(".")[0]==this.formatMediaTime(item.duration).split(".")[0]){
                    item.pasued=true
                    // item.slideValue=0.0
                    // item.currentTime=0.0
                }
                else{
                item.slideValue=parseInt(item.currentTime)
                item.currentTime=data.currentTime;
                }
            }
        })
        this.setState({
            arr:arr0
        })
    }
    
    // 设置总时长
    setDuration(data,id) {
        const arr0=[...this.state.arr]
        arr0.map((item)=>{
            if(item.id==id){
               item.duration=data.duration
            }
        })
        this.setState({
            arr:arr0
        })
    }
    onValue=(value,id)=>{
        const arr0=[...this.state.arr]
        arr0.map((item)=>{
            if(item.id==id){
               item.currentTime=value
            //    this.player.seek(value)
            }
        })
        this.setState({
            arr:arr0
        })
    }
    // player=(value,id)=>{
    //     const arr0=[...this.state.arr]
    //     arr0.map((item)=>{
    //       if(item.id==id){
    //             item.pasued=true
    //         }
    //     })
    //     this.setState({
    //         arr:arr0
    //     })
    // }
    play=(id,pa)=> {
      const arr0=[...this.state.arr]
      arr0.map((item)=>{
        if(item.id==id){
              item.pasued=!item.pasued
          }
      })
      const arr1=arr0
      arr1.map((item)=>{
        if(item.id!=id&&pa){
              item.pasued=pa
          }
      })
      this.setState({
          arr:arr1
      })
      }
      spin=(id)=>{
        const arr0=[...this.state.arr]
        arr0.map((item)=>{
            if(item.id==id){
                item.muted=!item.muted
            }
           
        })
        this.setState({
            arr:arr0
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
                        onPress={() => Actions.lcsound()}
                    />
                </View>
                <View>
                    <Text style={{
                        fontWeight: "bold",
                        fontSize: 20,
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
                        renderItem={({item}) => {
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
                                    height:75*s,
                                    width:0.85*width,
                                    backgroundColor:'rgba(204,204,204,0.2)',
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
                                    marginTop:12*s,
                                    marginLeft:20*s,
                                    marginRight:20*s
                                }} 
                                onPress={this.play.bind(this, item.id,item.pasued)}
                                >
                                   <Icon3
                                   style={{
                                       textAlign:"center",
                                       textAlignVertical:"center",
                                       fontSize:50*s,
                                       color:"#989898"
                                   }}
                                    name={item.pasued ? 'play-circle-o' : 'pause-circle-o'}/>
                                </TouchableOpacity>
                                <Text style={{
                                    textAlignVertical:"center"
                                }}>{this.formatMediaTime(item.currentTime).split('.')[0]}/{this.formatMediaTime(item.duration).split('.')[0]}</Text>
                                <Slider
                                    value={item.slideValue}
                                    maximumValue={item.duration}
                                    step={1}
                                    onValueChange={value=>this.onValue(value,item.id)}
                                    // onSlidingComplete={value => this.player(value)}
                                    minimumTrackTintColor="#FFBF2D"
                                    maximumTrackTintColor="#989898"
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
                                    marginRight:25*s,
                                    fontSize:40*s,
                                    color:"#989898"
                                }} name={item.muted?"volume-x":"volume-2"} />
                                </TouchableOpacity>
                                </View>
                                <Video
                                    source={{uri:item.uri}}
                                    ref={(ref) => {
                                        this.player = ref
                                      }}    
                                    paused={item.pasued}
                                    onLoad={data => this.setDuration(data,item.id)}
                                    onProgress={data => this.setTime(data,item.id)}
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

    }
})