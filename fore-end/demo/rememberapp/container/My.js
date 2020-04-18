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
