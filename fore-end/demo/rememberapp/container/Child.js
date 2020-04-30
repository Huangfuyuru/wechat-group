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
    ToastAndroid,
    ImageBackground,
    DrawerLayoutAndroid
} from 'react-native'
import {
    Actions
} from 'react-native-router-flux'
import { Flex, WingBlank } from '@ant-design/react-native'
import Icon1 from 'react-native-vector-icons/Feather'
import ImagePicker from 'react-native-image-picker'
import moment from 'moment'
import {myFetch} from '../src/utils'
// import ImagePicker from 'react-native-image-crop-picker'
const { width, scale, height } = Dimensions.get('window');
const s = width / 411;
const s1 = width / 640;
const h = height / 1012;
// const image = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587985076160&di=1467a37453c93456224667e31523d26d&imgtype=0&src=http%3A%2F%2Fm.360buyimg.com%2Fn12%2Fg12%2FM00%2F00%2F15%2FrBEQYVGBwcwIAAAAAAIvtrvVbBAAAAIcwOn9y0AAi_O569.jpg%2521q70.jpg'
// const image = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587985300669&di=0dd8b86dafb708019e01377b9d394503&imgtype=0&src=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D1229184673%2C3594306478%26fm%3D214%26gp%3D0.jpg'
// const image = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587985247716&di=a9c0ff8f3513cb191939bd11cd906c02&imgtype=0&src=http%3A%2F%2Fimg30.360buyimg.com%2FpopWaterMark%2Fjfs%2Ft2287%2F103%2F1403211901%2F149967%2F74bbfbef%2F569f4308N0eccc8a4.jpg'
// const image = 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3230746282,4148313693&fm=15&gp=0.jpg'
const image = 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1263424256,4283364669&fm=26&gp=0.jpg'
export default class Lover extends Component {
    constructor(props){
        super(props);
        this.state={
            times:0,
            menudisplay:'none',
            currentchild:'',
            uid:'',
            background:image,
            news:[
                {
                    ctime:'今天',
                    cpic:image,
                    ccontent:'请先到个人中心添加宝贝，然后这里将展示您在社区私密的亲子发布'
                },
            ],
            form:'',
            cid:'',
            change_id:[],
            child_id:'',
            cindex_src:'',
            cnews:[],
            children:[]
        }
    }
    componentDidMount(){
        console.log('Child第一次加载');
        AsyncStorage.getItem('user').
        then((res)=>{
            var user = JSON.parse(res)
            this.setState({
                uid:user.id
            })
            myFetch.post('/child',{
                uid:user.id
            }).then(
                res=>{
                    if(res.code == 1){
                        // console.log(res.msg)
                        // console.log(res.msg[0].background)
                        for(var i in res.msg){
                            if(res.msg[i].background='#'){
                                res.msg[i].background = this.state.background
                            }
                        }
                        this.setState({
                            currentchild:res.msg[0],
                            children:res.msg
                        })
                    }
                }
            )
        })
    }
    componentDidUpdate(){
        console.log('Child更新')
        
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
    changechild = (item)=>{
        console.log(item);
        this.setState({
            times:this.state.times+1,
            currentchild:item
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
        // this.setState({
        //     currentchild:item
        // })
    }
    addchildwarn = ()=>{
        ToastAndroid.showWithGravityAndOffset(
            '请先到个人中心添加宝贝，才能使用更多功能',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
        0,-250)
    }
    render() {
        if(this.state.currentchild){
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
                        width:0.3*width,
                        // backgroundColor:'#333',
                        height:0.15*height,
                        position:'absolute',
                        top:0.06*height,
                        right:0,
                        zIndex:100,
                        alignItems:'center',
                    }}>
                        <View style={{
                            width:0.26*width,
                            display:this.state.menudisplay,
                            alignItems:'center',
                            paddingTop:0.005*height,
                            paddingBottom:0.005*height,
                            backgroundColor:'rgba(221, 221, 221,1)',
                            }}>
                            <FlatList 
                                showsVerticalScrollIndicator={false}
                                data={this.state.children}
                                numColumns={1}
                                renderItem={({item})=>(
                                        <View key={item.id}>
                                            <TouchableOpacity onPress={()=>this.changechild(item)}>
                                                <Text style={{
                                                    borderRadius:5,
                                                    width:0.23*width,
                                                    color:'#333',
                                                    fontSize:20*s1,
                                                    height:0.04*height,
                                                    backgroundColor:'rgba(255,255,255,0.8)',
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
                        >{this.state.currentchild.name}</Text>
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
                            source={{uri:`${this.state.currentchild.background}`}}
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
                                    onPress={()=>Actions.cpictures({cid:this.state.currentchild.id})}
                                    style={styles.btn}>
                                    <Text style={styles.blockbtn}>云相册</Text >
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={()=>Actions.csound({cid:this.state.currentchild.id})} 
                                    style={styles.btn}>
                                    <Text style={styles.blockbtn}>语音记事</Text >
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={()=>Actions.cdairy({cid:this.state.currentchild.id})}
                                    style={styles.btn}>
                                    <Text style={styles.blockbtn}>亲子日记</Text >
                                </TouchableOpacity>
                            </Flex>
                            <Flex justify="center">
                                <TouchableOpacity 
                                    onPress={()=>Actions.cgrowup({cid:this.state.currentchild.id})}
                                    style={styles.btn}>
                                    <Text style={styles.blockbtn}>成长记录</Text >
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={()=>Actions.cevents({cid:this.state.currentchild.id})}
                                    style={styles.btn}>
                                    <Text style={styles.blockbtn}>大事记</Text >
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={()=>Actions.cstudy({cid:this.state.currentchild.id})}
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
                            data={this.state.cnews}
                            numColumns={1}
                            renderItem={({item})=>(
                                <TouchableOpacity key={item.id} style={styles.child_third}>
                                    <Text style={styles.newstime}>{ moment(item.setdate).format(" YYYY年MM月DD日  HH:mm:ss")}</Text>
                                    <View style={styles.newsline}>
                                        <View style={styles.newspicbox}>
                                            <ImageBackground
                                                style={styles.newspic}
                                                resizeMode="cover"
                                                source={{uri:`${this.state.background}`}}
                                            />
                                        </View>
                                        <View style={styles.newscontentbox}>
                                            <Text style={styles.newscontent}>{item.content}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                        
                    </WingBlank>
                </View>
            )
        }else{
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
                            }}>请先添加宝贝</Text>
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
                                <Text style={styles.bgbtn}>到个人中心添加宝贝后可更换背景墙哦</Text>
                        </ImageBackground>
                    </View>
                    <WingBlank style={{flex:1}}>
                        <View style={styles.lover_second}>
                            <Flex justify="center">
                                <TouchableOpacity 
                                    onPress={this.addchildwarn}
                                    style={styles.btn}>
                                    <Text style={styles.blockbtn}>云相册</Text >
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={this.addchildwarn} 
                                    style={styles.btn}>
                                    <Text style={styles.blockbtn}>语音记事</Text >
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={this.addchildwarn}
                                    style={styles.btn}>
                                    <Text style={styles.blockbtn}>亲子日记</Text >
                                </TouchableOpacity>
                            </Flex>
                            <Flex justify="center">
                                <TouchableOpacity 
                                    onPress={this.addchildwarn}
                                    style={styles.btn}>
                                    <Text style={styles.blockbtn}>成长记录</Text >
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={this.addchildwarn}
                                    style={styles.btn}>
                                    <Text style={styles.blockbtn}>大事记</Text >
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={this.addchildwarn}
                                    style={styles.btn}>
                                    <Text style={styles.blockbtn}>学业记录</Text >
                                </TouchableOpacity>
                            </Flex>
                        </View>
                        <View style={{
                            width:'100%',
                            marginTop:10,
                            // backgroundColor:'#ccc'
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
                            style={styles.scrollView}
                            data={this.state.news}
                            numColumns={1}
                            renderItem={({item})=>(
                                <View style={styles.child_third}>
                                    <View>
                                        <Text>{item.ctime}</Text>
                                    </View>
                                    <View style={styles.newsline}>
                                        <View style={styles.newspicbox}>
                                            <ImageBackground
                                                style={styles.newspic}
                                                resizeMode="cover"
                                                source={{uri:`${item.cpic}`}}
                                            />
                                        </View>
                                        <View style={styles.newscontentbox}>
                                            <Text style={styles.newscontent}>{item.ccontent}</Text>
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
        // backgroundColor:'#ccc'
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
        marginTop:0.015*height,
        // backgroundColor:'#ccc'
    },
    newstime:{
        width:0.45*width,
        // backgroundColor:'#ccc',
        height:0.03*height,
        textAlignVertical:'top',
        fontSize:20*s1,
        color:'#888'
    },
    newsline:{
        flexDirection: 'row',
        justifyContent:'space-between',
        backgroundColor: "rgba(221, 221, 221,0.2)",
    },
    newspicbox:{
        width:0.55*width,
        height:0.3*height,
        justifyContent:'center',
        alignItems:'center'
    },
    newspic:{ 
        width:0.55*width,
        height:0.3*height,
        transform: [{scale:0.9}]
    },
    newscontentbox:{
        width:0.35*width,
        height:0.3*height,
        backgroundColor: "rgba(221, 221, 221,0.3)",
    },
    newscontent:{
        // backgroundColor:'#ccc',
        width:0.34*width,
        height:0.3*height,
        fontSize:23*s1,
        textAlignVertical:'center',
        transform: [{scale:0.85}],
    },
})
