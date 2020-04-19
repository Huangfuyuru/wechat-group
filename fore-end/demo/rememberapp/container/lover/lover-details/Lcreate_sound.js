import React, { Component } from 'react'
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    Alert,
    ToastAndroid
} from "react-native"
import Icon1 from 'react-native-vector-icons/Feather'
import Icon2 from "react-native-vector-icons/SimpleLineIcons"
import { Actions } from "react-native-router-flux"
import { ScrollView } from 'react-native-gesture-handler'
const { width, scale, height } = Dimensions.get('window');
const s = width / 640;
export default class Lcreate_sound extends Component {
    constructor() {
        super()
        this.state = {
            img: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1097372906,871370388&fm=26&gp=0.jpg',
        }
    }
    alertMsg = () => {
        Alert.alert(
            '提示',
            '确认创建？',
            [
                {
                    text: '确定', onPress: () => {
                        Actions.pop()
                        ToastAndroid.show('创建成功！', ToastAndroid.SHORT)
                    }
                },
                { text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            ],
        );
    }
    render() {
        const src = this.state.img
        return (
            <View>
                <View style={styles.navbar}>
                    <Icon1
                        style={styles.icon}
                        name='chevron-left'
                        onPress={() => Actions.pop()}
                    />
                    <Text style={styles.title}>新建语音</Text>
                </View>
                <View style={{
                    height: 800 * s,
                    // borderWidth:0.5,
                    // borderColor:"#FFBF2D",
                    marginRight: "auto",
                    marginLeft: "auto",
                    borderRadius: 15,
                    width: 0.9 * width,
                    marginTop: 50 * s
                }}>
                    <View style={styles.msg}>
                        <Icon1
                            style={{
                                position: "absolute",
                                top: 10*s,
                                left: 15 * s,
                                fontSize: 40*s,
                                color: "#FFBF2D"
                            }}
                            name="calendar" />
                        <Text style={styles.text}>
                            时间：</Text>
                        <TextInput
                            maxLength={10}
                            placeholder='例2020-02-16'
                            style={styles.input} />
                    </View>
                    <View style={styles.msg}>
                        <Icon2
                            style={{
                                position: "absolute",
                                top: 10 * s,
                                left: 15 * s,
                                fontSize: 40*s,
                                color: "#FFBF2D"

                            }}
                            name="badge" />

                        <Text style={styles.text}>
                            语音名称：</Text>
                        <TextInput
                            maxLength={10}
                            placeholder='第一次去旅行'
                            style={styles.input} />
                    </View>
                    <View style={styles.choose}>
                        <View style={{
                            width: 0.85 * width,
                            height: 50 * s,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            textAlignVertical: 'center',
                            
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                textAlignVertical: 'center',
                                marginLeft:10
                            }}>
                                <Icon2 style={styles.btnicon} name='folder'  />
                                <Icon1 style={styles.btnicon} name='mic' />
                                <Text style={{lineHeight:50*s}}>(添加文件)</Text>
                            </View>
                        </View>
                        <ImageBackground
                        style={{
                            width: 0.75 * width,
                            height: 230 * s,
                            borderColor: '#ccc',
                            borderStyle: 'solid',
                            borderWidth: 2,
                            marginLeft:"auto",
                            marginRight:"auto",
                            marginTop:20*s,
                            backgroundColor: 'rgba(255,191,45,0.1)',
                        }}
                        source={{ uri: this.state.img }}
                    ></ImageBackground>
                    </View>
                   
                    <TouchableOpacity style={{
                        width: 0.85 * width,
                        height: 60 * s,
                        borderColor: "#FFBF2D",
                        borderWidth: 1,
                        borderRadius: 10,
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginTop: 200 * s
                    }}
                        onPress={this.alertMsg}
                    >
                        <Text
                            style={{
                                textAlign: "center",
                                textAlignVertical: "center",
                                lineHeight: 48 * s,
                                fontSize: 28 * s,
                                color: "#FFBF2D"
                            }}
                        >创建</Text>
                    </TouchableOpacity>
                </View>

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
        justifyContent: "center",
    },
    icon: {
        width: 0.08 * width,
        color: '#fff',
        fontSize: 28,
    },
    title: {
        marginLeft: 'auto',
        marginRight: "auto",
        textAlign: 'center',
        fontSize: 20,
        color: '#fff',
        letterSpacing: 3
    },
    msg: {
        width: 0.8 * width,
        height: 60 * s,
        marginTop: 10 * s,
        flexDirection: 'row',
        justifyContent: 'center',
        marginLeft: "auto",
        marginRight: "auto",
    },
    text: {
        textAlign: 'center',
        textAlignVertical: 'center',
        width: 0.3 * width,
        fontSize: 26 * s,
        color: '#333',
    },
    input: {
        width: 0.4 * width,
        borderColor: '#bdbbb8',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        fontSize: 24 * s,
        textAlign: 'center',
        color: '#333',
    },
    textbtn: {
        textAlign: 'center',
        textAlignVertical: 'center',
        width: 0.25 * width,
        height: 45 * s,
        fontSize: 26 * s,
        color: '#333',
        textAlignVertical: 'center',
    },
    choose: {
        width: 0.85 * width,
        height: 280 * s,
        marginTop: 30 * s,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    btnicon: {
        width: 0.10 * width,
        height: 50 * s,
        textAlign: 'center',
        fontSize: 35 * s,
        color: '#FFBF2D',

        textAlignVertical: 'center',
    },
})