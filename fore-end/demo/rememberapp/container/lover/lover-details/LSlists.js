import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    FlatList,
    ImageBackground,
    ToastAndroid

} from "react-native"
import Icon1 from 'react-native-vector-icons/Feather'
import { Actions } from "react-native-router-flux"
import { WingBlank } from "@ant-design/react-native"
const { width, scale, height } = Dimensions.get('window');
const s = width / 640;
import {myFetch} from '../../../src/utils'
export default class LSlists extends Component {
    constructor() {
        super()
        this.state = {
            arr: []
        }
    }
    alertMsg=()=>{
        ToastAndroid.show('已经完成啦！！!(*^__^*)', ToastAndroid.SHORT)
    }
    componentDidMount(){
        this.setState({
            loverId:this.props.loverId
        },()=>{
            console.log("爱人ID",this.state.loverId)
            myFetch.get('/lover/loverlist/list',{
                loverid:this.state.loverId
            }).then(res=>{
                console.log('所有清单数据',res)
                this.setState({
                    arr:res
                })
            })
        })
       
    }
    render() {
        const list = this.state.arr
        let num=0;
        return (
            <View >
                <View style={styles.navbar}>
                    <Icon1
                        style={styles.icon}
                        name='chevron-left'
                        onPress={() => Actions.pop()}
                    />
                    <Text style={styles.title}>清单列表</Text>
                </View>
                { 
                     this.state.arr.map((item)=>{
                        if(item.imgurl!==undefined){
                            num+=1
                        }
                     }
                     )
                }
                <View style={styles.btn}>
                    <Text style={{
                        color: "#fff",
                        fontSize:30*s,
                        textAlign: "center",
                        textAlignVertical: "center",
                        lineHeight: 42,
                        color:"pink"
                    }}>已完成 {num}/</Text>
                    <Text style={{
                          color: "#000",
                          fontSize:20*s,
                          textAlign: "center",
                          textAlignVertical: "center",
                          lineHeight: 42,
                    }}>{this.state.arr.length}</Text>
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
                        numColumns={2}
                        renderItem={({ item }) => {
                            if (item.imgurl== undefined) {
                                return (
                                    <TouchableOpacity  
                                    activeOpacity={0.8}
                                    style={{
                                        height: 130 * s,
                                        width: 0.43 * width,
                                        marginLeft: "auto",
                                        marginRight: "auto",
                                        marginTop:5
                                    }} 
                                    onPress={()=>Actions.lclist({item:item,loverId:this.state.loverId})}>
                                    <View
                                        style={{
                                            height: 130 * s,
                                            width: 0.43 * width,
                                            backgroundColor: 'rgba(50,50,50,.6)',
                                            flexDirection: "column",
                                            alignContent: "center",
                                            justifyContent: "center",
                                            textAlign: "center",
                                        }}
                                    >
                                        <Icon1
                                            name="image"
                                            style={{
                                                color: "#fff",
                                                fontSize:60,
                                                textAlign: "center",
                                            }}
                                       
                                        />
                                        <Text style={{
                                            fontSize: 15,
                                            textAlign: "center",
                                            color:"#fff"
                                        }}>{item.name? (item.name.length >= 10 ? item.name.substr(0, 10) + "..." : item.name) : ""}</Text>
                                    </View>
                                    </TouchableOpacity>
                                )
                            }
                            else {
                                return (
                                    <ImageBackground
                                        resizeMode="cover"
                                        style={{
                                            height: 130 * s,
                                            width: 0.43 * width,
                                            marginLeft: "auto",
                                            marginRight: "auto",
                                            marginTop: 5,
                                        }}
                                        source={{ uri: item.imgurl }}
                                    >
                                       <TouchableOpacity  activeOpacity={0.8} onPress={this.alertMsg}>
                                        <View
                                            style={{
                                                height: 130 * s,
                                                width: 0.43 * width,
                                                backgroundColor: 'rgba(221, 204,255,.3)',
                                                flexDirection: "column",
                                                alignContent: "center",
                                                justifyContent: "center",
                                                textAlign: "center"
                                            }}
                                        >
                                            <View style={{
                                                width:0.3*width,
                                                // backgroundColor: 'rgba(255,255,255,.4)',
                                                backgroundColor:"rgba(255,255,255,0.7)",
                                                marginLeft:"auto",
                                                marginRight:"auto",
                                                borderRadius:10
                                            }}><Text
                                            style={{
                                                fontSize: 15,
                                                color: "#888",
                                                textAlign: "center",
                                                textAlignVertical:"center",
                                                height:50*s
                                            }}
                                            >{item.content}</Text>
                                            </View>
                                        </View>
                                        </TouchableOpacity>
                                    </ImageBackground>
                                )
                            }
                        }}
                    />
                </WingBlank>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    navbar:{
        width:width,
        height:65*s,
        backgroundColor: '#FFBF2D',
        flexDirection: 'row',
        paddingLeft:0.02*width,
        paddingTop:'1%',
        paddingRight:0.1*width,
        justifyContent:"center"
       
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
        marginTop: 10 * s,
        backgroundColor: '#fff',
        paddingLeft: 10,
        paddingRight: 10,
        height: 950 * s,
        borderRadius: 5,
        borderWidth: 0.3,
        borderColor: "#000"
        // borderWidth: 0.5,
        // borderColor: "#C0C0C0",
    },
    btn: {
        width: 0.25 * width,
        flexDirection:"row",
        marginLeft:"auto",
        marginRight:38*s
    },

})