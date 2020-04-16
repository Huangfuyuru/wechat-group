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
import { Colors } from 'react-native/Libraries/NewAppScreen';
const { width, scale, height } = Dimensions.get('window');
const s = width / 411;
const s1 = width / 640;
const h = height / 1012;
export default class Lover extends Component {
    constructor(props){
        super(props);
        // var uid = JSON.parse(localStorage.getItem('uid'));
        this.state={
            menu_count:0,
            // uid:uid,
            change_id:[],
            child_id:'',
            cindex_src:'',
            background:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586712889480&di=9c4a333188094ae5642b0487ec2bd34f&imgtype=0&src=http%3A%2F%2Fwx2.sinaimg.cn%2Flarge%2F007bRu2Ggy1gbtrl6i7ezj30rs0fme2h.jpg',
            cnews:[
                {
                    ctime:'以下内容仅自己可见',
                    cpic_src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577321644&di=8fc9ce735a95caff1722dd9101f2c7ab&imgtype=jpg&er=1&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fzhidao%2Fwh%253D450%252C600%2Fsign%3Daaf70247dff9d72a17311819e11a0402%2F728da9773912b31b00eaab518018367adbb4e1c0.jpg',
                    ccontent:'在这里展示您未公开的发布'
                },
                {
                    ctime:'以下内容仅自己可见',
                    cpic_src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577321644&di=8fc9ce735a95caff1722dd9101f2c7ab&imgtype=jpg&er=1&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fzhidao%2Fwh%253D450%252C600%2Fsign%3Daaf70247dff9d72a17311819e11a0402%2F728da9773912b31b00eaab518018367adbb4e1c0.jpg',
                    ccontent:'在这里展示您未公开的发布'
                },
                {
                    ctime:'以下内容仅自己可见',
                    cpic_src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577321644&di=8fc9ce735a95caff1722dd9101f2c7ab&imgtype=jpg&er=1&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fzhidao%2Fwh%253D450%252C600%2Fsign%3Daaf70247dff9d72a17311819e11a0402%2F728da9773912b31b00eaab518018367adbb4e1c0.jpg',
                    ccontent:'在这里展示您未公开的发布'
                },
            ]
        }
    }
    // componentDidMount(){
    //     console.log('第一次加载');
    //     fetch(`http://localhost:3001/child`,{
    //         method:'POST',
    //         mode:'cors',
    //         headers:{
    //             'Content-Type':"application/x-www-form-urlencoded"
    //         },
    //         body:`uid=${this.state.uid}`
    //     }).then(res=>res.json())
    //     .then(json=>{
    //         console.log('json',json)
    //         this.setState({
    //             child_id:JSON.parse(localStorage.getItem('cid'))||json[0].id,
    //             cindex_src:JSON.parse(localStorage.getItem('cbackground'))||json[0].background,
    //             change_id:json
    //         },()=>{
    //             localStorage.setItem('cid',JSON.stringify(this.state.child_id));
    //             localStorage.setItem('cbackground',JSON.stringify(this.state.cindex_src))
    //         });
    //     })
    // }
    // componentDidUpdate(prevProps,prevState){
    //     console.log('更新')
    //     if(prevState.cindex_src != this.state.cindex_src){
    //         var url = 'http://localhost:3001/child/changebackground';
    //         fetch(url,{
    //             method:'POST',
    //             headers:{
    //                 'Content-Type':"application/x-www-form-urlencoded"
    //             },
    //             body:`childsid=${Number(this.state.child_id)}&background=${this.state.cindex_src}`
    //         }).then(res=>res.json())
    //         .then(json=>{
    //             console.log('json',json)
    //         })
    //     }
        
    // }
    // upfile=()=>{
    //     var file=document.getElementById('img').files[0];
    //     var url = 'http://localhost:3001/img';
    //     var form = new FormData();
    //     var img='';
    //     form.append("file",file);
    //     fetch(url,{
    //         method:'POST',
    //         body:form
    //     })
    //     .then(res=>res.json())
    //     .then(res=>(
    //         console.log(res.path),
    //         img=res.path,
    //         this.setState({
    //             cindex_src:res.path
    //         },()=>{
    //             localStorage.setItem('cbackground',JSON.stringify(this.state.cindex_src))
    //         })
    //     ))

    //     console.log(img)
        
    // }
    // changeChild=(id,background)=>{
    //     console.log(id,background)
    //     this.setState({
    //         child_id:id,
    //         menu_count:this.state.menu_count+1,
    //         cindex_src:background
    //     },()=>{
    //         localStorage.setItem('cid',JSON.stringify(this.state.child_id));
    //         localStorage.setItem('cbackground',JSON.stringify(this.state.cindex_src))
    //     })
    //     var tag = document.getElementById('tag');
    //     tag.style.display='none';
    // }
    render() {
        const news = this.state.cnews;
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
                        // textAlignVertical:'center'
                    }}
                    >亲子</Text>
                </View>
                <View style={styles.lover_first}>
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
                <WingBlank style={{flex:1}}>
                    <View style={styles.lover_second}>
                        <Flex justify="center">
                            <TouchableOpacity 
                                onPress={()=>Actions.cpictures()}
                                style={styles.btn}>
                                <Text style={styles.blockbtn}>云相册</Text >
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={()=>Actions.csound()} 
                                style={styles.btn}>
                                <Text style={styles.blockbtn}>语音记事</Text >
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={()=>Actions.cdairy()}
                                style={styles.btn}>
                                <Text style={styles.blockbtn}>亲子日记</Text >
                            </TouchableOpacity>
                        </Flex>
                        <Flex justify="center">
                            <TouchableOpacity 
                                onPress={()=>Actions.cgrowup()}
                                style={styles.btn}>
                                <Text style={styles.blockbtn}>成长记录</Text >
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={()=>Actions.cevents()}
                                style={styles.btn}>
                                <Text style={styles.blockbtn}>大事记</Text >
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={()=>Actions.cstudy()}
                                style={styles.btn}>
                                <Text style={styles.blockbtn}>学业记录</Text >
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
                                width:'100%',
                                marginTop:10
                            }}>
                                <Text style={{
                                    width:'104%',
                                    marginLeft: '-2%',
                                    backgroundColor: '#ccc',
                                    height: 0.5,
                                }}></Text>
                                <Text style={{
                                    marginTop:-10,
                                    width:140*s,
                                    height:50,
                                    textAlign:'center',
                                    marginLeft:'auto',
                                    marginRight:'auto',
                                    backgroundColor:'#fff',
                                    fontSize:15,
                                    color:'#bdbbb8'
                                }}>底儿都被你看完了</Text>
                            </View>
                        }
                        style={styles.scrollView}
                        data={news}
                        numColumns={1}
                        renderItem={({item})=>(
                            <View style={styles.child_third}>
                                <View>
                                    <Text>今天</Text>
                                </View>
                                <View style={styles.line}>
                                    <View
                                        style={{
                                            width:180*s,
                                            height:180*s,
                                            // backgroundColor:'#000',
                                            justifyContent:'center',
                                            alignItems:'center'
                                        }}
                                    >
                                        <ImageBackground
                                            style={{ 
                                                height: "100%", 
                                                width: "100%",
                                                transform: [{scale:0.9}]
                                            }}
                                            resizeMode="cover"
                                            source={{uri:`${this.state.background}`}}
                                        />
                                    </View>
                                    <View style={{
                                        width:180*s,
                                        height:180*s,
                                    }}>
                                        <Text>{item.ccontent}</Text>
                                    </View>
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
        height:65*s1,
        backgroundColor:'#FFBF2D',
        flexDirection: 'row',
        paddingTop:'1%',
        justifyContent:"center"
    },
    lover_first: {
        textAlign: "center",
        height: 0.33*height,
        width: width,
        justifyContent: "center",
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
    scrollView: {
        backgroundColor: '#fff',
        paddingLeft:10,
        paddingTop:5,
        paddingRight:10,
        marginBottom:60,
    },
    child_third: {
        marginTop:15*h
    },
    line:{
        flexDirection: 'row',
        justifyContent:'space-between',
        backgroundColor: "#fff",
    }
})
