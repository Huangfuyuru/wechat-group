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
import { Flex, WingBlank } from '@ant-design/react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen';
const { width, scale, height } = Dimensions.get('window');
const s = width / 411;
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
            cnews:[
                {
                    ctime:'以下内容仅自己可见',
                    cpic_src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577321644&di=8fc9ce735a95caff1722dd9101f2c7ab&imgtype=jpg&er=1&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fzhidao%2Fwh%253D450%252C600%2Fsign%3Daaf70247dff9d72a17311819e11a0402%2F728da9773912b31b00eaab518018367adbb4e1c0.jpg',
                    ccontent:'在这里展示您最近三篇日记大致内容'
                },
                {
                    ctime:'以下内容仅自己可见',
                    cpic_src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577321644&di=8fc9ce735a95caff1722dd9101f2c7ab&imgtype=jpg&er=1&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fzhidao%2Fwh%253D450%252C600%2Fsign%3Daaf70247dff9d72a17311819e11a0402%2F728da9773912b31b00eaab518018367adbb4e1c0.jpg',
                    ccontent:'在这里展示您最近三篇日记大致内容'
                },
                {
                    ctime:'以下内容仅自己可见',
                    cpic_src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577321644&di=8fc9ce735a95caff1722dd9101f2c7ab&imgtype=jpg&er=1&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fzhidao%2Fwh%253D450%252C600%2Fsign%3Daaf70247dff9d72a17311819e11a0402%2F728da9773912b31b00eaab518018367adbb4e1c0.jpg',
                    ccontent:'在这里展示您最近三篇日记大致内容'
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
            <View style={{ width: width, height: height, backgroundColor: "#fff" }}>
                <StatusBar 
                    backgroundColor='#FFBF2D'
                />
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
                >亲子</Text></View>
                <View style={styles.lover_first}>
                    <ImageBackground
                    resizeMode="cover"
                    style={{ 
                        height: "100%", 
                        width: "100%",
                        transform: [{scale:1}]
                    }}
                        source={require("../images/3.png")}
                        alt='自定义照片墙'>
                    
                                <TouchableOpacity style={{
                                    zIndex: 10,
                                    top: 140,
                                    left: 200,
                                    position: 'relative',
                                    color: '#000',
                                    backgroundColor: 'rgb(255,191,45,0.3)'
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
                <WingBlank>
                    <View style={styles.lover_second}>
                        <Flex justify="center">
                            <TouchableOpacity style={styles.btn}>
                                <Text style={styles.blockbtn}>云相册</Text >
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btn}>
                                <Text style={styles.blockbtn}>语音记事</Text >
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btn}>
                                <Text style={styles.blockbtn}>亲子日记</Text >
                            </TouchableOpacity>
                        </Flex>
                        <Flex justify="center">
                            <TouchableOpacity style={styles.btn}>
                                <Text style={styles.blockbtn}>成长记录</Text >
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btn}>
                                <Text style={styles.blockbtn}>大事记</Text >
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btn}>
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
                            marginLeft:'-2%',
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
                        ListFooterComponent={<Text>到底了</Text>}
                        style={styles.scrollView}
                        data={news}
                        numColumns={1}
                        renderItem={({item})=>(
                            <View style={styles.child_third}>
                                    <Image
                                    style={{
                                        width:200
                                    }}
                                    resizeMode="contain"
                                    source={require("../images/3.png")} />
                                        <Text>{item.ccontent}</Text>
                                    {/* <View style={{
                                        width:200,
                                        // height:200
                                    }}>
                                    </View> */}
                            </View>
                        )}
                    />
                    
                </WingBlank>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    lover_first: {
        // marginTop: "4%",
        textAlign: "center",
        height: "30%",
        width: "100%",
        // backgroundColor: "#000",
        justifyContent: "center",
    },
    lover_second: {
        marginTop:5,
        marginBottom:15,
        width:'100%',
        height: "15%",
        flexDirection: "column",
        justifyContent: "center",
        // backgroundColor: "#000",
        marginLeft:'auto',
        marginRight:'auto'
    },
    btn: {
        // paddingBottom: 10,
        // width: 99*s,
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
        // backgroundColor: '#000',
        paddingLeft:10,
        paddingTop:5,
        paddingRight:10,
        // height:'100%'
        // marginBottom:100,
    },
    child_third: {
        // flex:1,
        flexDirection: 'row',
        justifyContent:'space-between',
        backgroundColor: "#fff",
        width:'100%',
        // height:150,
        // backgroundColor:'#000',
        // justifyContent:'center',
        // alignContent:'center',
        marginTop:5

    },
})
