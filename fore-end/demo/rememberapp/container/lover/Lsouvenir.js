import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    FlatList,
    Image,
    Alert,
    ToastAndroid
} from "react-native"
import Icon from "react-native-vector-icons/Feather"
import Icon1 from 'react-native-vector-icons/SimpleLineIcons'
import Icon3 from "react-native-vector-icons/Ionicons"
import { Actions } from "react-native-router-flux"
import { WingBlank } from "@ant-design/react-native"
const { width, scale, height } = Dimensions.get('window');
const s = width / 640;
export default class Lsouvenir extends Component {
    constructor() {
        super()
        this.state = {
            arr: [
                {
                    src: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1996853672,3140841536&fm=15&gp=0.jpg",
                    date: "2020-02-16",
                    txt: "第一次一起去旅行",
                    heart:"ღ ღ ღ ღ ღ"
                },
                {
                    src: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1996853672,3140841536&fm=15&gp=0.jpg",
                    date: "2020-02-16",
                    txt: "第一次接吻",
                    heart:"ღ ღ ღ"
                },
                {
                    src: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1996853672,3140841536&fm=15&gp=0.jpg",
                    date: "2020-02-16",
                    txt: "第一次接吻",
                    heart:"ღ ღ ღ"
                },
                {
                    src: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1996853672,3140841536&fm=15&gp=0.jpg",
                    date: "2020-02-16",
                    txt: "第一次接吻",
                    heart:"ღ ღ ღ ღ ღ"
                }, {
                    src: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1996853672,3140841536&fm=15&gp=0.jpg",
                    date: "2020-02-16",
                    txt: "第一次接吻",
                    heart:"ღ ღ ღ ღ ღ"
                },
            ]
        }
    }
    alertMsg = () => {
        Alert.alert(
            '提示',
            '确认删除？',
            [
                {
                    text: '确定', onPress: () => {
                        ToastAndroid.show('删除成功！', ToastAndroid.SHORT)
                    }
                },
                { text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            ],
        );
    }
    render() {
        const list = this.state.arr
        return (
            <View>
                <View style={styles.navbar}>
                    <Icon
                        style={styles.icon}
                        name='chevron-left'
                        onPress={() => Actions.pop()}
                    />
                    <Text style={styles.title}>纪念日</Text>
                    <Icon3 
                        style={styles.icon}
                        name='md-add'
                        onPress={()=>Actions.lcsouvenir()}
                    />
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
                        numColumns={1}
                        renderItem={({ item }) => (
                            <View style={{
                                height: 300 * s,
                                width: 0.88 * width,
                                borderWidth: 0.3,
                                borderColor: "#000",
                                marginTop: 10 * s,
                                marginLeft: 'auto',
                                marginRight: "auto",
                                borderRadius: 15,
                                flexDirection: "row",
                                flexWrap: "wrap",
                            }}>
                                <Image
                                    style={{
                                        height: 280 * s,
                                        width: 0.44 * width,
                                        borderRadius: 15,
                                        margin: 6 * s
                                    }}
                                    source={{ uri: item.src }} />
                                <View 
                                style={{
                                    height: 280 * s,
                                    width: 0.4 * width,
                                    margin: 6 * s,
                                    flexDirection:"column",
                                }}
                                >
                                    <Icon1
                                    style={{
                                        fontSize:30*s,
                                        marginLeft:"auto",
                                        marginTop:5*s,
                                        // color:"#FF1744"
                                    }}
                                    onPress={this.alertMsg}
                                     name="check"></Icon1>
                                    <Text
                                    style={{
                                        fontSize:30*s,
                                        textAlign:"center",
                                        marginTop:35*s,
                                        marginBottom:10*s
                                    }}
                                    
                                    >{item.txt ? (item.txt.length >= 7 ? item.txt.substr(0, 7) + "..." : item.txt) : ""}</Text>
                                    <Text
                                    style={{
                                        fontSize:20*s,
                                        textAlign:"center",
                                        marginBottom:50*s
                                    }}
                                    >{item.date}</Text>
                                    <Text
                                     style={{
                                        fontSize:35*s,
                                        textAlign:"center",
                                        color:"#FF1744"
                                    }}
                                    >{item.heart}</Text>
                                </View>

                            </View>
                        )}
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
        // backgroundColor: '#FFBF2D',
        backgroundColor: '#fff',
        flexDirection: 'row',
        paddingLeft: 0.03 * width,
        paddingTop: '1%',
        paddingRight: 0.03 * width,
        justifyContent: "center",
    },
    icon: {
        width: 0.08 * width,
        color: 'black',
        fontSize: 28,
    },
    title: {
        marginLeft: 'auto',
        marginRight: "auto",
        textAlign: 'center',
        fontSize: 20,
        color: 'black',
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
        // "
    },
})