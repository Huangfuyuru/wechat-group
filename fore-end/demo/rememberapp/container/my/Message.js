import React, { Component } from 'react'
import { 
    Text, 
    TextInput,
    StyleSheet, 
    Dimensions, 
    View, 
    Image, 
    FlatList,
    TouchableOpacity, 
    AsyncStorage,
    ToastAndroid,
    StatusBar,
    Picker,
    Alert,
} from 'react-native'
import {
    Actions
} from 'react-native-router-flux'
import { Flex, WingBlank } from '@ant-design/react-native'
import Button from 'react-native-button';
import Icon1 from 'react-native-vector-icons/AntDesign'
import Icon2 from "react-native-vector-icons/Ionicons"
import Icon3 from 'react-native-vector-icons/Feather'
import Icon4 from 'react-native-vector-icons/FontAwesome'
import Icon5 from 'react-native-vector-icons/MaterialCommunityIcons'
const { width, scale, height } = Dimensions.get('window');
const s1 = width / 640;
const s = width / 640;
const h = height / 1012;
export default class Message extends Component {
    constructor(){
        super();
        this.state={
            arr: [
                {
                    name: "小浣熊",
                    sex: "女",
                    birth:"1999年12月22日"
                },
                // {
                //     name: "旺旺",
                //     sex: "男",
                //     birth:"2008年5月4日"
                // },
                // {
                //     name: "皮卡丘",
                //     sex: "男",
                //     birth:"1996年7月1日"
                // },
                // {
                //     name: "喵喵",
                //     sex: "女",
                //     birth:"2002年1月1日"
                // },
                // {
                //     name: "皮卡丘",
                //     sex: "男",
                //     birth:"1996年7月1日"
                // },
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
            <View style={{ 
                width: width, 
                height: height, 
                backgroundColor: "#fff",
            }}>
                <StatusBar 
                    backgroundColor='#FFBF2D'
                />
                <View style={styles.navbar}>
                    <Icon3 
                        style={styles.icon}
                        name='chevron-left'
                        onPress={()=>Actions.pop()}
                    />
                    <Text style={styles.title}>亲子详情</Text>
                    {/* <TouchableOpacity onPress={()=>Actions.Mmchilds()}>
                        <Icon2 style={styles.icon}  name='md-add'/>
                    </TouchableOpacity> */}
                </View>
                <WingBlank style={styles.wingblank}>
                    <FlatList
                    showsVerticalScrollIndicator={false}
                    style={styles.scrollView}
                    data={list}
                    numColumns={1}
                    renderItem={({ item }) => (
                        <View style={{
                            height: 200 * s,
                            width: 0.75 * width,
                            borderWidth: 0.3,
                            borderColor: "#000",
                            marginTop: 10 * s,
                            marginLeft: 'auto',
                            marginRight: "auto",
                            borderRadius: 15,
                            flexDirection: "row",
                            flexWrap: "wrap",
                        }}>
                            <Icon1
                            style={{
                                fontSize:30*s,
                                color:'#FFBF2D',
                            }}
                            onPress={this.alertMsg}
                                name="delete"></Icon1>
                            <View style={{alignItems:'center', marginTop:5*s,width:'100%',flexDirection:'row',height:40*s,justifyContent:'center'}}>
                                <Text
                                style={{
                                    fontSize:25*s,
                                    textAlign:"center",
                                    width:"50%",
                                }}
                                ><Icon4 style={styles.listlineicon} name='heart'/>&nbsp;昵称:</Text>
                                <Text style={{
                                    fontSize:25*s,
                                    textAlign:"center",
                                    width:"50%",
                                }}>{item.name}</Text>
                            </View>
                            <View style={{alignItems:'center', marginTop:5*s,width:'100%',flexDirection:'row',height:40*s,justifyContent:'center'}}>
                                <Text
                                style={{
                                    fontSize:25*s,
                                    textAlign:"center",
                                    width:"50%",
                                }}
                                ><Icon3 style={styles.listlineicon} name='users'/>&nbsp;性别:</Text>
                                <Text style={{
                                    fontSize:25*s,
                                    textAlign:"center",
                                    width:"50%",
                                }}>{item.sex}</Text>
                            </View>
                            <View style={{alignItems:'center', marginTop:5*s,width:'100%',flexDirection:'row',height:40*s,justifyContent:'center'}}>
                                <Text
                                style={{
                                    fontSize:25*s,
                                    textAlign:"center",
                                    width:"50%",
                                }}
                                ><Icon5 style={styles.listlineicon} name='cake-variant'/>&nbsp;生日:</Text>
                                <Text style={{
                                    fontSize:25*s,
                                    textAlign:"center",
                                    width:"50%",
                                }}>{item.birth}</Text>
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
    navbar:{
        width:width,
        height:65*s,
        backgroundColor:'#FFBF2D',
        flexDirection: 'row',
        paddingLeft:0.03*width,
        paddingTop:'1%',
        paddingRight:0.03*width,
        justifyContent:"center"
    },
    icon:{
        width:0.08*width,
        color:'#fff',
        fontSize:30,
    },
    title:{
        marginLeft:'auto',
        marginRight:"auto",
        textAlign:'center',
        fontSize:20,
        color:'#fff',
        letterSpacing:3
    },
    listlineicon:{
        fontSize:32*s1,
        color:'#FFBF2D',
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
})