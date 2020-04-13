import React, { Component } from 'react'
import { Text, StyleSheet, Dimensions, ImageBackground, View, Image,FlatList, TouchableOpacity, AsyncStorage } from 'react-native'
import { Flex, WingBlank } from '@ant-design/react-native'
import { Actions } from 'react-native-router-flux';
const { width, scale, height } = Dimensions.get('window');
const s = width / 411;
const h = height / 1012;
export default class Lover extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // uid: uid,
            // lover_id: '',
            // cindex_src: "",
            cnews: [{
                ctime: '以下内容仅自己可见',
                cpic_src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1584343715,918149739&fm=26&gp=0.jpg',
                ccontent: '在这里展示您最近三篇日记大致内容'
            },
            {
                ctime: '以下内容仅自己可见',
                cpic_src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1584343715,918149739&fm=26&gp=0.jpg',
                ccontent: '在这里展示您最近三篇日记大致内容'
            },
            {
                ctime: '以下内容仅自己可见',
                cpic_src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1584343715,918149739&fm=26&gp=0.jpg',
                ccontent: '在这里展示您最近三篇日记大致内容'
            }
            ]
        }
    }
    // componentDidMount() {
    //     fetch(`http://localhost:3001/lover`, {
    //         method: 'POST',
    //         mode: 'cors',
    //         headers: {
    //             'Content-Type': "application/x-www-form-urlencoded"
    //         },
    //         body: `uid=${this.state.uid}`
    //     })
    //         .then(res => res.json())
    //         .then(json => {
    //             console.log(json)
    //             AsyncStorage.getItem('lid', (result) => {
    //                 this.setState({
    //                     lover_id: JSON.parse(result)|| json[0].id,
    //                     lover_name: json[0].name,
    //                 },() => {
    //                         AsyncStorage.setItem('lid', JSON.stringify(this.state.lover_id))
    //                     }
    //                 )
    //             })
    //             AsyncStorage.getItem('lbackground', (result) => {
    //                 this.setState({
    //                     lover_id: JSON.parse(result)|| json[0].background
    //                 })
    //             })
    //         })
    // }
    // componentDidUpdate(prevProps,prevState){
    //     if(prevState.cindex_src != ""){
    //         var url = 'http://localhost:3001/lover/changebackground';
    //         fetch(url,{
    //             method:'POST',
    //             headers:{
    //                 'Content-Type':"application/x-www-form-urlencoded"
    //             },
    //             body:`lover_id=${Number(this.state.lover_id)}&background=${this.state.cindex_src}`
    //         }).then(res=>res.json())
    //         .then(json=>{
    //             console.log('json',json)
    //         })
    //     }

    // }
    upfile = () => {
        var file = document.getElementById('img').files[0];
        // var url = 'http://localhost:3001/img';
        var form = new FormData();
        form.append("file", file);
        fetch(url, {
            method: 'POST',
            body: form
        }).then(res => res.json())
            .then(res => (this.setState({
                cindex_src: res.path
            }, () => {
                // localStorage.setItem('lbackground',JSON.stringify(this.state.cindex_src))
            })))
    }
    render() {
        const news = this.state.cnews;
        return (
            <View style={{ width: width, height: height, backgroundColor: "#fff" }}>
                <View style={{
                    width: '100%',
                    backgroundColor: '#FFBF2D',
                    height: "5%",
                    justifyContent: "center",
                    flexDirection: 'row'
                }}><Text style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    textIndent: 3,
                    letterSpacing: 3,
                    color: "#ffff",
                    lineHeight: 40
                }}
                >爱人</Text></View>

                <View style={styles.lover_first}>
                    <ImageBackground
                        resizeMode="cover"
                        style={{
                            height: "100%",
                            width: "100%",
                            transform: [{ scale: 1 }]
                        }}
                        source={require("../assets/images/2.jpg")}
                        alt='自定义照片墙'>

                        <TouchableOpacity style={{
                            color: '#000',
                            width: '80%',
                            // textAlign:'center',
                            backgroundColor: 'rgba(255,191,45,0.3)'
                        }}><Text>轻触上传精选照片</Text>
                            {/* <input 
                            id='img'
                            onChange={this.upfile}                           
                            type='file'  
                            accept="image/*" 
                            capture="camera" 
                            name='uimage' 
                            /> */}
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
                    <View style={styles.lover_second}>
                        <Flex justify="center">
                            <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={() => Actions.lpictures()}>
                                <Text style={{ textAlign: "center", lineHeight: 40, fontSize: 15, color: "#fff" }}
                                >云相册</Text >
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={() => Actions.lsound()}>
                                <Text style={{ textAlign: "center", fontSize: 15, lineHeight: 40, color: "#fff" }}
                                >语音记事</Text >
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={() => Actions.ldairy()}>
                                <Text style={{ textAlign: "center", fontSize: 15, lineHeight: 40, color: "#fff" }}
                                >恋爱日记</Text >
                            </TouchableOpacity>
                        </Flex>
                        <Flex justify="center">
                            <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={() => Actions.llists()}>
                                <Text style={{ textAlign: "center", fontSize: 15, lineHeight: 40, color: "#fff" }}
                                >恋爱清单</Text >
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={() => Actions.lsouvenir()}>
                                <Text style={{ textAlign: "center", fontSize: 15, lineHeight: 40, color: "#fff" }}
                                >纪念日</Text >
                            </TouchableOpacity>
                        </Flex>
                    </View>
                       <View style={{
                        width:'100%',
                        marginTop:10
                    }}>
                        <Text style={{
                            width:'104%',
                            marginLeft: '-2%',
                            backgroundColor: '#bdbbb8',
                            height: 0.8,
                        }}></Text>
                        <Text style={{
                            marginTop:-10,
                            width:140*s,
                            textAlign:'center',
                            marginLeft:5,
                            backgroundColor:'#fff',
                            fontSize:15,
                            color:'#555'
                        }}>以下内容仅自己可见</Text>
                    </View>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        ListFooterComponent={
                            <View style={{
                                width: '100%',
                                marginTop: 10
                            }}>
                                <Text style={{
                                    width: '104%',
                                    marginLeft: '-2%',
                                    backgroundColor: '#ccc',
                                    height: 0.5,
                                }}></Text>
                                <Text style={{
                                    marginTop: -10,
                                    width: 140 * s,
                                    height: 50,
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
                        data={news}
                        numColumns={1}
                        renderItem={({ item }) => (
                            <View style={styles.child_third}>
                                <View>
                                    <Text>今天</Text>
                                </View>
                                <View style={styles.line}>
                                    <View
                                        style={{
                                            width: 180 ,
                                            height: 180,
                                            // backgroundColor:'#000',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <ImageBackground
                                            style={{
                                                height: "100%",
                                                width: "100%",
                                                transform: [{ scale: 0.9 }]
                                            }}
                                            resizeMode="cover"
                                            source={require("../assets/images/3.jpg")}
                                        />
                                    </View>
                                    <View style={{
                                        width: 180 * s,
                                        height: 180 * s,
                                    }}>
                                        <Text>{item.ccontent}</Text>
                                    </View>
                                </View>
                            </View>
                        )}
                    />
               
            </View>
        )
    }
}
const styles = StyleSheet.create({
    lover_first: {
        textAlign: "center",
        height: "28%",
        width: "100%",
        backgroundColor: "#fff"
    },
    lover_second: {
        height: "20%",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    btn: {
        paddingBottom: 10,
        width: 99 * s,
        height: 48 * h,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        backgroundColor: '#FFBF2D',
        borderRadius: 10,
    },
    child_third: {
        backgroundColor: "#fff",
        marginTop: "4%",
        height: "26%"
    },
    scrollView: {
        backgroundColor: '#fff',
        paddingLeft:10,
        paddingTop:5,
        paddingRight:10,
        marginBottom:60,
    },
    line:{
        flexDirection: 'row',
        justifyContent:'space-between',
        backgroundColor: "#fff",
    }
})
