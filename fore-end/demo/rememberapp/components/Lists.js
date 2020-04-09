import React, { Component } from 'react'
import { View } from 'react-native'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    TextInput
  } from 'react-native';
export default class Lists extends Component {
    render() {
        return (
            <View>
                <View
                    style={{
                    width:'100%',
                    height:150,
                    backgroundColor:'#fff',
                    marginBottom:15
                    }}
                    >
                    <View
                    style={{
                        flexDirection:"row",
                        height:50,
                        width:'90%',
                        alignItems:'center',
                        marginBottom:15,
                        marginTop:15,
                        marginLeft:'5%',
                        paddingLeft:'5%',
                        borderRadius:5,
                        borderWidth:1,
                        backgroundColor:"#eee",
                        borderColor:'#ccc',
                    }}>
                        <TextInput
                        style={{
                        fontSize:18,
                        borderColor:'#ccc',
                        width:'100%',
                        height:50,

                        }}
                        placeholder='请输入商品名称'
                        />
                        <Image 
                        style={{
                        width:23,
                        height:23,
                        right:40
                        }} 
                        source={{
                        uri:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583059833514&di=a46ded44854f2e175d30ee25afa7e8be&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic2%2Fcover%2F00%2F30%2F19%2F581075e1ed5a8_610.jpg'
                        }}
                        />
                    </View>
                    <View 
                    style={{
                        flexDirection:'row',
                        justifyContent:'space-evenly',
                        borderColor:'#eee',
                        borderWidth:2
                    }}>
                        <View style={styles.titlebox}>
                        <Text style={{
                            color:'red',
                            fontSize:20
                            }}>综合</Text>
                        </View>
                        <View style={styles.titlebox}>
                        <Text style={styles.title}>销量</Text>
                        </View>
                        <View style={styles.titlebox}>
                        <Text style={styles.title}>新品</Text>
                        </View>
                        <View style={styles.titlebox}>
                        <Text style={styles.title}>价格</Text>
                        </View>
                        <View style={styles.titlebox}>
                        <Text style={styles.title}>信用</Text>
                        </View>
                    </View>
                    </View>

                    <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>
                        <View 
                        style={{
                        marginLeft:15,
                        marginRight:15
                        }}
                        >
                        <View style={styles.line}>
                            <View
                            style={styles.innerpic}>
                            <Image 
                            style={styles.innerimg}
                            source={require('../images/1.png')}/>
                            <Text
                            style={styles.innertext}
                            >Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳
                            </Text>
                            <Text
                            style={styles.innerprice}>
                                36.00
                            </Text>
                            </View>
                            <View
                            style={styles.innerpic}>
                            <Image 
                            style={styles.innerimg}
                            source={require('../images/2.png')}/>
                            <Text
                            style={styles.innertext}
                            >Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳
                            </Text>
                            <Text
                            style={styles.innerprice}>
                                36.00
                            </Text>
                            </View>
                        </View>
                        </View>
                        <View 
                        style={{
                        marginLeft:15,
                        marginRight:15
                        }}
                        >
                        <View style={styles.line}>
                            <View
                            style={styles.innerpic}>
                            <Image 
                            style={styles.innerimg}
                            source={require('../images/1.png')}/>
                            <Text
                            style={styles.innertext}
                            >Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳
                            </Text>
                            <Text
                            style={styles.innerprice}>
                                36.00
                            </Text>
                            </View>
                            <View
                            style={styles.innerpic}>
                            <Image 
                            style={styles.innerimg}
                            source={require('../images/2.png')}/>
                            <Text
                            style={styles.innertext}
                            >Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳
                            </Text>
                            <Text
                            style={styles.innerprice}>
                                36.00
                            </Text>
                            </View>
                        </View>
                    </View>
                    <View 
                    style={{
                    marginLeft:15,
                    marginRight:15
                    }}
                    >
                        <View style={styles.line}>
                            <View
                            style={styles.innerpic}>
                                <Image 
                                style={styles.innerimg}
                                source={require('./images/1.png')}/>
                                <Text
                                style={styles.innertext}
                                >Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳
                                </Text>
                                <Text
                                style={styles.innerprice}>
                                    36.00
                                </Text>
                            </View>
                            <View
                            style={styles.innerpic}>
                                <Image 
                                style={styles.innerimg}
                                source={require('./images/2.png')}/>
                                <Text
                                style={styles.innertext}
                                >Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳
                                </Text>
                                <Text
                                style={styles.innerprice}>
                                    36.00
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    scrollView: {
      backgroundColor: Colors.lighter,
      marginBottom:180
    },
    body: {
      backgroundColor: Colors.white,
    },
    titlebox:{
      height:49,
      margin:10,
      paddingTop:'2%'
    },
    title:{
      fontSize:20,
      color:'#666'
    },
    line:{
      width:'100%',
      marginBottom:10,
      flexDirection:'row',
      justifyContent:'space-between',
    },
    innerpic:{
      paddingTop:30,
      width:'48.5%',
      height:280,
      backgroundColor:'#fff',
    },
    innerimg:{
      width:150,
      height:150,
      marginLeft:'10%'
    },
    innertext:{
      width:'90%',
      marginLeft:'5%',
      lineHeight:25,
      fontSize:13,
      color:'#666'
    },
    innerprice:{
      marginTop:15,
      marginLeft:'5%',
      color:'red'
    }
  });
