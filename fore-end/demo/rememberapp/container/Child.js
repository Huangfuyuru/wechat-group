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
import Icon2 from 'react-native-vector-icons/AntDesign'
// import ImagePicker from 'react-native-image-picker'
import moment from 'moment'
import {myFetch} from '../src/utils'
import ImagePicker from 'react-native-image-crop-picker'
import { TextInput } from 'react-native-gesture-handler'
const { width, scale, height } = Dimensions.get('window');
const s = width / 411;
const s1 = width / 640;
const h = height / 1012;
// const image = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587985076160&di=1467a37453c93456224667e31523d26d&imgtype=0&src=http%3A%2F%2Fm.360buyimg.com%2Fn12%2Fg12%2FM00%2F00%2F15%2FrBEQYVGBwcwIAAAAAAIvtrvVbBAAAAIcwOn9y0AAi_O569.jpg%2521q70.jpg'
// const image = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587985300669&di=0dd8b86dafb708019e01377b9d394503&imgtype=0&src=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D1229184673%2C3594306478%26fm%3D214%26gp%3D0.jpg'
// const image = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587985247716&di=a9c0ff8f3513cb191939bd11cd906c02&imgtype=0&src=http%3A%2F%2Fimg30.360buyimg.com%2FpopWaterMark%2Fjfs%2Ft2287%2F103%2F1403211901%2F149967%2F74bbfbef%2F569f4308N0eccc8a4.jpg'
// const image = 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3230746282,4148313693&fm=15&gp=0.jpg'
const image = 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1263424256,4283364669&fm=26&gp=0.jpg'
export default class Child extends Component {
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
            children:[],
            weather:'',
            realtime:'',
            future:[],
            text:''
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
                            if(res.msg[i].background == '#'){
                                res.msg[i].background = image
                            }
                        }
                        this.setState({
                            currentchild:res.msg[0],
                            children:res.msg,
                            background:res.msg[0].background
                        })
                    }
                }
            )
            
        })
        AsyncStorage.getItem('city').
        then((res)=>{
            if(res){
                this.getweather(res)
            }else{
                this.getweather('北京')
            }
        })
    }
    componentDidUpdate(prevProps,prevState){
        console.log('孩子更新')
        if(prevState.background != this.state.background){
            myFetch.post('/child/changebackground',{
                childsid:this.state.currentchild.id,
                background:this.state.background
            }).then(
                res=>{
                    console.log('bgimg change')
                    console.log(res)
                }
            )
            myFetch.post('/child',{
                uid:this.state.uid
            }).then(
                res=>{
                    if(res.code == 1){
                        for(var i in res.msg){
                            if(res.msg[i].background == '#'){
                                res.msg[i].background = image
                            }
                        }
                        this.setState({
                            children:res.msg,
                        })
                    }
                }
            )
        }
        
    }
    uploadImage =(params)=> {
        return new Promise(function (resolve, reject) {
            console.log('xxx')
            let formData = new FormData();
            formData.append('params', params);
            fetch('http://148.70.223.218:3001/img', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Encoding': 'identity'
                },
                
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
    choosebgpic=()=>{
        ImagePicker.openPicker({
            width: 400, 
            height: 300, 
            cropping: true,
            includeBase64:true
        }).then(image => {
            this.uploadImage(image.data)
            .then( res=>{
                this.setState({
                    background:res.url
                })
                // console.log('success');
            }).catch( err=>{
                // console.log('flied');
            })
        });
        ImagePicker.clean().then(() => { 
            console.log('removed all tmp images from tmp directory');
        }).catch(e => { 
            console.log(e)
        });
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
            currentchild:item,
            background:item.background
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
    addchildwarn = ()=>{
        ToastAndroid.showWithGravityAndOffset(
            '请先到个人中心添加宝贝，才能使用更多功能',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
        0,-250)
    }
    getweather = (city)=>{
        // city?city:'北京';
        // console.log(city)
        var code;
        if(!city){
            // console.log(city);
            code = encodeURI('北京',"utf8")
        }else{
            code = encodeURI(city,"utf8")
        }
        console.log(city)
        fetch(`http://apis.juhe.cn/simpleWeather/query?city=${code}&key=83a5a764e688d1c517e7081a1aa2977f`)
        .then(res=>res.json())
        .then(res=>{
            this.setState({
                weather:res.result,
                realtime:res.result.realtime,
                future:res.result.future,
                text:''
            },()=>{console.log(this.state.weather)})
            // console.log(res)
        })
    }
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
                        backgroundColor:this.state.currentchild?'rgba(221, 221, 221,1)':'rgba(204,204,204,0.8)',
                        }}>
                        {
                            this.state.currentchild
                            ?<FlatList 
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
                            :<Text style={{
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
                        }
                    </View>
                </View>
                <View style={styles.navbar}>
                    <Icon1 style={styles.icon}/>
                    <Text style={styles.title}
                    >{this.state.currentchild?this.state.currentchild.name:'亲子'}</Text>
                    <TouchableOpacity onPress={this.compile}>
                        <Icon1 style={styles.icon} name='more-horizontal'/>
                    </TouchableOpacity>
                </View>
                <View style={styles.lover_first}>
                    <ImageBackground
                        resizeMode="cover"
                        style={{ 
                            height: "98%", 
                            width: "99%",
                            marginLeft:'0.5%',
                            marginTop:"1%",
                            // transform: [{scale:0.95}],

                        }}
                        source={!/(http|https):\/\/([\w.]+\/?)\S*/.test(this.state.currentchild.background)
                            ?{uri:`${image}`}
                            :{uri:`${this.state.background}`}}
                        alt='自定义照片墙'>
                            {
                                this.state.currentchild
                                ?<TouchableOpacity onPress={this.choosebgpic}>
                                    <Text style={styles.bgbtn}>轻触上传精选照片</Text>
                                </TouchableOpacity>
                                :<Text style={styles.bgbtn}>到个人中心添加宝贝后可更换背景墙哦</Text>
                            }
                    </ImageBackground>
                </View>
                <WingBlank style={{flex:1}}>
                    <View style={styles.lover_second}>
                        <Flex justify="center">
                            <TouchableOpacity 
                                onPress={this.state.currentchild?()=>Actions.cpictures({cid:this.state.currentchild.id}):this.addchildwarn}
                                style={styles.btn}>
                                <Text style={styles.blockbtn}>云相册</Text >
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={this.state.currentchild?()=>Actions.csound({cid:this.state.currentchild.id}):this.addchildwarn} 
                                style={styles.btn}>
                                <Text style={styles.blockbtn}>语音记事</Text >
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={this.state.currentchild?()=>Actions.cdairy({cid:this.state.currentchild.id}):this.addchildwarn}
                                style={styles.btn}>
                                <Text style={styles.blockbtn}>亲子日记</Text >
                            </TouchableOpacity>
                        </Flex>
                        <Flex justify="center">
                            <TouchableOpacity 
                                onPress={this.state.currentchild?()=>Actions.cgrowup({cid:this.state.currentchild.id}):this.addchildwarn}
                                style={styles.btn}>
                                <Text style={styles.blockbtn}>成长记录</Text >
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={this.state.currentchild?()=>Actions.cevents({cid:this.state.currentchild.id}):this.addchildwarn}
                                style={styles.btn}>
                                <Text style={styles.blockbtn}>大事记</Text >
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={this.state.currentchild?()=>Actions.cstudy({cid:this.state.currentchild.id}):this.addchildwarn}
                                style={styles.btn}>
                                <Text style={styles.blockbtn}>学业记录</Text >
                            </TouchableOpacity>
                        </Flex>
                    </View>
                    <View style={styles.weather}>
                        <View style={styles.realtime}>
                            <View style={styles.realtimetitle}>
                                <Text style={styles.city}>{this.state.weather.city}</Text>
                                {/* <Text style={styles.city}>张家口</Text>
                                <Text style={styles.weatherstate}>晴</Text> */}
                                <Text style={styles.weatherstate}>{this.state.realtime.info}</Text>
                                <TextInput
                                    style={styles.searchinput} 
                                    placeholder='  搜索其他城市'
                                    multiline={false}
                                    value={this.state.text}
                                    onChangeText={text=>{this.setState({text:text})}}
                                />
                                <TouchableOpacity onPress={()=>this.getweather(this.state.text)}>
                                    <Icon2 style={styles.weathericon} name='search1'/>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.realtimenext}>
                                <View style={styles.realtimeleft}>
                                    {
                                        this.state.realtime.temperature
                                        ?<Text style={styles.weatherline}>当前气温：{this.state.realtime.temperature} ℃</Text>
                                        :null
                                    }
                                    {
                                        this.state.realtime.humidity
                                        ? <Text style={styles.weatherline}>当前湿度：{this.state.realtime.humidity}</Text>
                                        :null
                                    }
                                    {
                                        this.state.realtime.direct
                                        ?<Text style={styles.weatherline}>风向：{this.state.realtime.direct}</Text>
                                        :null
                                    }
                                    {
                                        this.state.realtime.power
                                        ?<Text style={styles.weatherline}>风力：{this.state.realtime.power}</Text>
                                        :null
                                    }
                                </View>
                                <View style={styles.realtimeright}>
                                    <Text style={styles.righttext}>未来5天天气预报</Text>
                                </View>
                            </View>                          
                        </View>
                        <View style={styles.future}>
                            <FlatList
                                extraData={this.state}
                                horizontal = {true}
                                data={this.state.future}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({item})=>(
                                    <View style={styles.weatherblock}>
                                        <Text style={styles.futureline}>{item.date}</Text>
                                        <Text style={styles.futureline}>{item.weather}</Text>
                                        <Text style={styles.futureline}>{item.temperature}</Text>
                                    </View>                            
                                )}
                            />
                        </View>
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
        height: 0.38*height,
        width: width,
        alignItems:'center',
        backgroundColor:'#eee'
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
        // backgroundColor:'#ccc',
        // marginBottom:15,
        marginTop:0.005*height,
        marginBottom:0.01*height,
        justifyContent:'space-around',
        width:'100%',
        height: 0.125*height,
        flexDirection: "column",
        marginLeft:'auto',
        marginRight:'auto'
    },
    btn: {
        padding:0,
        height: 0.055*height,
        width: "31%",
        marginLeft: 5,
        marginRight: 5,
        // marginTop: 10,
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
    weather:{
        height:0.31*height,
        backgroundColor:'rgba(205,205,205,0.2)',
        marginTop:0.01*height
    },
    realtime:{
        height:0.175*height,
        justifyContent:'space-around',
        // backgroundColor:'#ccc'
    },
    realtimetitle:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#eee',
        marginBottom:0.02*height
    },
    realtimenext:{
        flexDirection:'row'
    },
    realtimeleft:{
        width:0.4*width
    },
    realtimeright:{
        width:0.6*width,
        justifyContent:'center',
        alignItems:'center'
    },
    righttext:{
        width:0.4*width,
        height:0.06*height,
        backgroundColor:'#fff',
        color:'#FFBF2D',
        borderRadius:5,
        fontSize:25*s1,
        textAlign:'center',
        textAlignVertical:'center'
    },
    city:{
        width:0.2*width,
        height:0.055*height,
        marginBottom:0.005*height,
        fontSize:32*s1,
        color:'#555',
        // color:'#FFBF2D',
        // backgroundColor:'#ccc',
        textAlign:'right',
        textAlignVertical:'center',
    },
    weatherstate:{
        width:0.04*height,
        height:0.04*height,
        borderRadius:100,
        fontSize:20*s1,
        color:'#fff',
        // color:'#FFBF2D',
        marginLeft:0.03*width,
        marginRight:0.08*width,
        backgroundColor:'#FFBF2D',
        textAlign:'center',
        textAlignVertical:'center',
    },
    searchinput:{
        backgroundColor:"#fff",
        padding:0,
        paddingLeft:0.03*width,
        height:0.04*height,
        borderRadius:5,
        // borderWidth:0.5,
        width:0.43*width,
    },
    weathericon:{
        width:0.04*height,
        height:0.04*height,
        fontSize:30*s1,
        color:'#888',
        // backgroundColor:'#000',
        marginLeft:0.01*width,
        textAlignVertical:'center',
        textAlign:'center'
    },
    weatherline:{
        width:0.35*width,
        height:0.03*height,
        marginLeft:0.05*width,
        // marginRight:'auto',
        // marginLeft:'auto',
        textAlign:'left',
        fontSize:20*s1,
        textAlignVertical:'center'
    },
    future:{
        height:0.13*height,
        paddingTop:0.015*height,
        // backgroundColor:'#000'
    },
    weatherblock:{
        backgroundColor:'#fff',
        width:0.12*height,
        height:0.12*height,
        marginLeft:0.05*width,
        marginRight:0.05*width,
        justifyContent:'center'
    },
    futureline:{
        textAlignVertical:'center',
        textAlign:'center',
        height:0.03*height
    }
})
