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
    DrawerLayoutAndroid
} from 'react-native'
import {
    Actions
} from 'react-native-router-flux'
import { Flex, WingBlank } from '@ant-design/react-native'
import Icon1 from 'react-native-vector-icons/Feather'
import ImagePicker from 'react-native-image-picker'
// import ImagePicker from 'react-native-image-crop-picker'
const { width, scale, height } = Dimensions.get('window');
const s = width / 411;
const s1 = width / 640;
const h = height / 1012;
const image = 'http://img.zcool.cn/community/019de45c32c171a80121df90bbe9ca.jpg@1280w_1l_2o_100sh.jpg'
export default class Lover extends Component {
    constructor(props){
        super(props);
        // var uid = JSON.parse(localStorage.getItem('uid'));
        this.state={
            // uid:uid,
            times:0,
            form:'',
            cid:'',
            currentcid:'',
            menudisplay:'none',
            change_id:[],
            child_id:'',
            cindex_src:'',
            background:image,
            cnews:[
                {
                    ctime:'以下内容仅自己可见',
                    cpic_src:image,
                    ccontent:'在这里展示您未公开的发布'
                },
                {
                    ctime:'以下内容仅自己可见',
                    cpic_src:image,
                    ccontent:'在这里展示您未公开的发布'
                },
                {
                    ctime:'以下内容仅自己可见',
                    cpic_src:image,
                    ccontent:'在这里展示您未公开的发布'
                },
            ],
            children:[
                {name:'暖心的大宝',id:1},
                {name:'可爱二宝',id:1},
                {name:'调皮刘星',id:1},
                {name:'乖巧小雪',id:1},
                {name:'星儿',id:1},
            ]
        }
    }
    componentDidMount(){
        console.log('state'+this.state.times+'第一次加载');
        // fetch(`http://localhost:3001/child`,{
        //     method:'POST',
        //     mode:'cors',
        //     headers:{
        //         'Content-Type':"application/x-www-form-urlencoded"
        //     },
        //     body:`uid=${this.state.uid}`
        // }).then(res=>res.json())
        // .then(json=>{
        //     console.log('json',json)
        //     this.setState({
        //         child_id:JSON.parse(localStorage.getItem('cid'))||json[0].id,
        //         cindex_src:JSON.parse(localStorage.getItem('cbackground'))||json[0].background,
        //         change_id:json
        //     },()=>{
        //         localStorage.setItem('cid',JSON.stringify(this.state.child_id));
        //         localStorage.setItem('cbackground',JSON.stringify(this.state.cindex_src))
        //     });
        // })
    }
    componentDidUpdate(prevProps,prevState){
        console.log('更新')
        // if(prevState.cindex_src != this.state.cindex_src){
        //     var url = 'http://148.70.223.218:3001/child/changebackground';
        //     fetch(url,{
        //         method:'POST',
        //         headers:{
        //             'Content-Type':"application/x-www-form-urlencoded"
        //         },
        //         body:`childsid=${Number(this.state.cid)}&background=${this.state.cindex_src}`
        //     }).then(res=>res.json())
        //     .then(json=>{
        //         console.log('json',json)
        //     })
        // }
        
    }
    uploadImage =(params)=> {
        return new Promise(function (resolve, reject) {
            let formData = new FormData();
            // console.log(params)
            // for (var key in params){
            //     console.log(key, params[key]);
            //     // formData.append(key, params[key]);
            // }
            formData.append('params', params);
            // console.log(formData)
            var ary = params.path.split('/');
            // console.log(params)
            // console.log('2222222' + ary);
            //设置formData数据
            // let formData = new FormData();
            // console.log(params.path)
            // let file = {uri: params.path, type: 'multipart/form-data', name: ary[ary.length-1]};
            let file = {uri: params.path, type: 'application/octet-stream', name: ary[ary.length-1]};
            formData.append("file", file);
            // console.log('form'+JSON.stringify(formData))
            // fetch post请求
            fetch('http://148.70.223.218:3001/img', {
                method: 'POST',
                // 设置请求头，请求体为json格式，identity为未压缩
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Encoding': 'identity'
                },
                
                // headers: {
                //     'Content-Type': 'multipart/form-data;charset=utf-8',
                //     // "x-access-token": token,
                // },
                body:JSON.stringify(formData),
            }).then((res) => res.json())
            .then((res)=> {
                console.log('uploadImage', res);
                resolve(res);
            })
            .catch((err)=> {
                console.log('err', err);
                reject(err);
            });
        
        });
    };
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
    choosebgpic=()=>{
        const options = {
            quality:1.0,
            maxWidth:300,
            maxHeight:400,
            storageOptions:{
                skipBackup:true
            }
        }

        ImagePicker.launchImageLibrary(options,(res)=>{
            // console.log(res)
            // console.log(res.uri)

            // for(var key in res){
            //     console.log(key,res[key])
            // }
            this.uploadImage(res)
            .then( res=>{
                console.log('success');
            }).catch( err=>{
            //请求失败
            console.log('flied');
            })

        })


        // var form = new FormData();
        // var url = 'http://148.70.223.218:3001/img';
        // var img='';
        // ImagePicker.openPicker({
        //     width: 300, 
        //     height: 400, 
        //     cropping: false
        //  }).then(image => { 
        //     // var ary = image.path.split('/');
        //     // // console.log('2222222' + ary);
        //     // var file = {uri: image.path, type: 'multipart/form-data', name: ary[ary.length-1]};
        //     // form.append("file",file)
        //     // console.log('1'+JSON.stringify(form))
        //     // console.log(image);
        //     // console.log(JSON.stringify(form))
        //     // this.setState({
        //     //     background:image.path
        //     // })
        //     console.log(image)
        //     // this.uploadImage(image)
        //     // .then( res=>{
        //     //     console.log('success');
        //     // }).catch( err=>{
        //     // //请求失败
        //     // console.log('flied');
        //     // })
        //  });
        // // console.log(JSON.stringify(this.state.form))
        // // fetch(url,{
        // //     method:'POST',
        // //     body:JSON.stringify(form)
        // // })
        // // .then(res=>res.json())
        // // .then(res=>(
        // //     console.log('111'),
        // //     console.log(res),
        // //     img=res.path,
        // //     this.setState({
        // //         // cindex_src:res.path
        // //     })
        // // ))
    }
    compile = ()=>{
        this.setState({
            times:this.state.times+1
        },()=>{
            if(this.state.times % 2 == 0){
                this.setState({
                    menudisplay:'none'
                })
            }else{
                this.setState({
                    menudisplay:'flex'
                }) 
            }
        })
    }
    render() {
        const news = this.state.cnews;
        const navigationView = (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
              <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I'm in the Drawer!</Text>
            </View>
          );
        return (
            <View style={{ 
                width: width, 
                height: height, 
                backgroundColor: "#fff",
            }}>
                <StatusBar 
                    backgroundColor='#FFBF2D'
                />
                <View style={{
                    width:0.25*width,
                    height:0.15*height,
                    position:'absolute',
                    top:0.06*height,
                    right:0,
                    zIndex:100,
                    alignItems:'center',
                }}>
                    <View style={{
                        width:0.23*width,
                        display:this.state.menudisplay,
                        alignItems:'center',
                        paddingTop:0.005*height,
                        paddingBottom:0.005*height,
                        backgroundColor:'rgba(204,204,204,0.8)',
                        }}>
                        <FlatList 
                            showsVerticalScrollIndicator={false}
                            data={this.state.children}
                            numColumns={1}
                            renderItem={({item})=>(
                                    <View>
                                        <TouchableOpacity>
                                            <Text style={{
                                                borderRadius:5,
                                                width:0.2*width,
                                                color:'#333',
                                                fontSize:20*s1,
                                                height:0.04*height,
                                                backgroundColor:'rgba(255,255,255,0.5)',
                                                margin:0.005*width,
                                                textAlignVertical:'center',
                                                textAlign:'center'
                                            }}>{item.name}</Text>
                                        </TouchableOpacity>
                                    </View>
                            )}
                        />
                    </View>
                </View>
                <View style={styles.navbar}>
                    <Icon1 style={styles.icon}/>
                    <Text style={styles.title}
                    >亲子</Text>
                    <TouchableOpacity onPress={this.compile}>
                        <Icon1 style={styles.icon} name='more-horizontal'/>
                    </TouchableOpacity>
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
                    
                                <TouchableOpacity onPress={this.choosebgpic}>
                                    <Text style={styles.bgbtn}>轻触上传精选照片</Text>
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
        justifyContent:"center",
        paddingRight: 0.03 * width,
        paddingLeft: 0.03 * width,

    },
    icon: {
        width: 0.08 * width,
        color: '#fff',
        fontSize: 30,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        letterSpacing: 3,
        color: "#ffff",
        marginLeft: 'auto',
        marginRight: "auto",
        textAlign: 'center',
    },
    icon:{
        width:0.08*width,
        color:'#fff',
        fontSize:30,
    },
    lover_first: {
        textAlign: "center",
        height: 0.33*height,
        width: width,
        alignItems:'center'
    },
    bgbtn:{
        color: '#000',
        width:0.8*width,
        letterSpacing:3,
        height:0.05*height,
        backgroundColor: 'rgba(255,191,45,0.2)',
        textAlignVertical:'center',
        marginTop:0.01*height,
        color:'#fff',
        fontSize:23*s1,
        marginLeft:'auto',
        marginRight:'auto',
        textAlign:'center',
        borderRadius:5
        // backgroundColor: 'rgba(255,255,255,0.3)',

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
