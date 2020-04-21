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
            //头像地址
            imageUrl:require('..//images/head.png'),
            //设置图标
            imageset:require('..//images/set2.png')
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
                    <TouchableOpacity style={{position:"absolute",right:20*h,top:10*h}} onPress={()=>Actions.Use()} >
                        <Image style={{width:45*h,height:45*h,borderRadius:60,borderColor:'#FFBF2D',borderWidth:2}} source={this.state.imageset} />
                    </TouchableOpacity>
                </View>
                {/* 头像 */}
                <View style={{width:'100%',height:240*h,flexDirection:'row'}}>
                    <View style={{width:'50%',height:200*h,alignItems:'center',marginTop:20*h}}>
                        <Image style={{width:100*h,height:100*h,borderRadius:60,borderColor:'#FFBF2D',borderWidth:2}} source={this.state.imageUrl} />
                        <Text style={{fontWeight:'bold',fontSize:17,marginTop:10*h}}>小浣熊</Text>
                        <View style={{fontWeight:'bold',fontSize:17,width:'100%',justifyContent:'center',flexDirection:'row'}}>
                            <Text>关注:1&nbsp;&nbsp;</Text>
                            <Text>喜欢:5</Text>
                        </View>
                    </View>
                    <View style={{width:'40%',height:240*h,alignItems:'center'}}>
                        <TouchableOpacity onPress={()=>Actions.Mychild()} 
                            style={styles.btn}>
                            <Text style={styles.blockbtn}>亲子</Text >
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>Actions.Mylover()} 
                            style={styles.btn}>
                            <Text style={styles.blockbtn}>爱人</Text >
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>Actions.Delrelation()} 
                            style={styles.btn}>
                            <Text style={styles.blockbtn}>好友</Text >
                        </TouchableOpacity>
                    </View>
                    <View style={{width:'10%'}}></View>
                </View>
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
    btn: {
        padding:0,
        height: 50*h,
        width: "50%",
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        backgroundColor: '#FFBF2D',
        borderRadius: 5,
    },
    blockbtn:{ 
        textAlign: "center", 
        fontSize: 18,
        textAlignVertical:'center', 
        lineHeight: 50*h, 
        color:'#fff'
    },
})
