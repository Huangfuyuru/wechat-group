import React, { Component } from 'react'
import { 
    Text, 
    StyleSheet, 
    Dimensions, 
    View, 
    Image, 
    TouchableOpacity, 
    AsyncStorage,
    StatusBar,
    ScrollView,
    FlatList,
    ImageBackground,
} from 'react-native'
import {
    Actions
} from 'react-native-router-flux'
import { Flex, WingBlank } from '@ant-design/react-native'
const { width, scale, height } = Dimensions.get('window');
const s1 = width / 640;
const h = height / 1012;

export default class My extends Component {
    constructor(){
        super();
        this.state = {
            // 背景地址
            background:'http://5b0988e595225.cdn.sohucs.com/images/20170818/291948418fa5470f8e5cb34e306b9236.jpeg',
            //头像地址
            imageUrl:require('..//images/head.png')
        }
    }
    render() {
        return (
            <View style={{ 
                width: width, 
                height: height, 
                backgroundColor: "#fff",
            }}>
                <StatusBar 
                    backgroundColor='#FFBF2D'
                />
                <View style={styles.navbar}>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 20,
                        textIndent: 3,
                        letterSpacing: 3,
                        color: "#ffff",
                        lineHeight: 40
                    }}
                    >我的</Text>
                </View>
                {/* 头像 */}
                <View style={{width:'100%',height:250*h}}>
                    <ImageBackground
                        resizeMode="cover"
                        style={{ 
                            height: "100%", 
                            width: "100%",
                            transform: [{scale:1}]
                        }}
                        source={{uri:`${this.state.background}`}}
                        alt='自定义照片墙'>
                        <TouchableOpacity style={{
                            color: '#000',
                            width:'80%',
                            backgroundColor: 'rgba(255,191,45,0.3)'
                        }}><Text>更换背景墙照片</Text>
                        </TouchableOpacity>
                        <View style={{width:'100%',height:100*h,flexDirection:'row',justifyContent:'center',marginTop:40*h}}>
                            <Image style={{width:100*h,height:100*h,borderRadius:60}} source={this.state.imageUrl} />
                        </View>
                        <View style={{width:'100%',height:30*h,flexDirection:'row',justifyContent:'center',marginTop:20*h}}>
                            <Text style={{color:'white', fontWeight:'bold',fontSize:17}}>小浣熊</Text>
                        </View>
                    </ImageBackground>
                </View>
                {/* 功能 */}
                <WingBlank style={{flex:1}}>
                    <View style={styles.lover_second}>
                        <Flex justify="center">
                            <TouchableOpacity 
                                onPress={()=>Actions.Crelation()}
                                style={styles.btn}>
                                <Text style={styles.blockbtn}>增加爱人</Text >
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={()=>Actions.Crelation2()} 
                                style={styles.btn}>
                                <Text style={styles.blockbtn}>增加亲子</Text >
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={()=>Actions.Message()}
                                style={styles.btn}>
                                <Text style={styles.blockbtn}>消息反馈</Text >
                            </TouchableOpacity>
                        </Flex>
                        <Flex justify="center">
                            <TouchableOpacity 
                                onPress={()=>Actions.Use()}
                                style={styles.btn}>
                                <Text style={styles.blockbtn}>设置</Text >
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={()=>Actions.Delrelation()}
                                style={styles.btn}>
                                <Text style={styles.blockbtn}>删除爱人</Text >
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={()=>Actions.Delrelation2()}
                                style={styles.btn}>
                                <Text style={styles.blockbtn}>删除亲子</Text >
                            </TouchableOpacity>
                        </Flex>
                    </View>
                </WingBlank>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    navbar:{
        width:width,
        height:65*s1,
        backgroundColor:'#FFBF2D',
        flexDirection: 'row',
        paddingTop:'1%',
        justifyContent:"center"
    },
    lover_second: {
        marginBottom:15,
        width:'100%',
        height: 140*h,
        flexDirection: "column",
        justifyContent: "center",
        marginLeft:'auto',
        marginRight:'auto'
    },
    btn: {
        padding:0,
        height: 55*h,
        width: "31%",
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        backgroundColor: '#FFBF2D',
        borderRadius: 5,
    },
    blockbtn:{ 
        textAlign: "center", 
        fontSize: 20,
        textAlignVertical:'center', 
        lineHeight: 55*h, 
        color: "#fff" 
    },
})
