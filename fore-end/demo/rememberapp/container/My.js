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
    Animated,
    ScrollView,
    FlatList,
    Alert,
    ToastAndroid,
    ImageBackground,
    TouchableHighlight,
    DrawerLayoutAndroid,
    Modal,
} from 'react-native'
import { 
    WingBlank,
    Icon, 
    SearchBar, 
    TabBar,
    Tabs,
    Flex, 
} from '@ant-design/react-native'
import {
    Actions
} from 'react-native-router-flux'
import Icon1 from 'react-native-vector-icons/Feather'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon3 from 'react-native-vector-icons/Entypo'
import Icon4 from 'react-native-vector-icons/FontAwesome'
import Icon5 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon6 from 'react-native-vector-icons/FontAwesome5'
import Icon7 from 'react-native-vector-icons/AntDesign'

import ImagePicker from 'react-native-image-crop-picker'
import ImageCropPicker from 'react-native-image-crop-picker';
import Swiper from 'react-native-swiper'
import Button from 'react-native-button'
import {myFetch} from '../src/utils'

const { width, scale, height } = Dimensions.get('window');
const s1 = width / 640;
const s = width / 640;
const h = height / 1012;
const image2 = 'http://tc.sinaimg.cn/maxwidth.2048/tc.service.weibo.com/p/image_96weixin_com/9a6afdf6ff7c953f04675270477405b0.jpg'
const image3 = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587985300669&di=0dd8b86dafb708019e01377b9d394503&imgtype=0&src=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D1229184673%2C3594306478%26fm%3D214%26gp%3D0.jpg'
const image = 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3230746282,4148313693&fm=15&gp=0.jpg'
const image1 = 'http://img.zcool.cn/community/019de45c32c171a80121df90bbe9ca.jpg@1280w_1l_2o_100sh.jpg'

export default class My extends Component {
    constructor(){
        super();
        let data = [];
        for(var i=0; i<10; i++){
            data.push({tit:i,key:i});
        }
        // }
        this.state = {
            code:1,
            uid:'',
            data,
            flag:true,
            width: new Animated.Value(20),
            //头像地址
            back: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3825009501,3483030709&fm=15&gp=0.jpg',
            //小花数量
            num3:0,
            name:'',
            // 新增
            sendflower:false,
            visible:false,
            current:'',
            content:'对不齐呀对不齐呀！对不齐呀对不齐呀！对不齐呀对不齐呀！对不齐呀对不齐呀！对不齐呀对不齐呀！对不齐呀对不齐呀！对不齐呀对不齐呀！对不齐呀对不齐呀！',
            onPress:0,
            showFoot:0,
            refreshing:false,
            clists:[],
            rlists:[],
            page:1,
        }
    }
    componentDidMount() {
        this.setState({
            refreshing:true,
        })
        console.log('my第一次加载');
        AsyncStorage.getItem('user').
        then((res) => {
            var user = JSON.parse(res)
            this.setState({
                uid: user.id
            })
            myFetch.post('/my/', {
                uid:this.state.uid,
            }).then(
                res => {
                    this.setState({
                        num3:res.num,
                        name:res.name,
                        back:res.imgurl
                    })
                }
            )
            myFetch.get('/share',{
                uid:user.id
            }).then(res=>{
                // console.log(res.data[0])
                for(var i in res.data){
                    if(!res.data[i].pic){
                        res.data[i].pic=image3
                    }
                    if(!res.data[i].imgurl){
                        res.data[i].imgurl=[image2]
                    }
                    // console.log(res.data[i].imgurl)
                }
                this.setState({
                    rlists:res.data,
                    refreshing:false,
                })
                
            })
        })
    }
    componentDidUpdate(prevProps,prevState){
        if(prevState.back != this.state.back){
            myFetch.post('/my/mypage',{
                uid:this.state.uid,
                imgurl:this.state.back
            }).then(
                res=>{
                    console.log('')
                }
            )
        }
    }
    choosebgpic=()=>{
        ImagePicker.openPicker({
            width: 400, 
            height: 300, 
            cropping: true,
            includeBase64:true
        }).then(image => {
           myFetch.uploadImage(image.data)
            .then( res=>{
                this.setState({
                    back:res.url
                })
                console.log('success');
            }).catch( err=>{
                console.log('flied');
            })
        });
        ImagePicker.clean().then(() => { 
            console.log('removed all tmp images from tmp directory');
        }).catch(e => { 
            console.log(e)
        });
    }
    alertMsg = () => {
        if(this.state.flag){
            Alert.alert('提示', '确认签到？',
            [
                { text: "确定", onPress: ()=>{
                    AsyncStorage.getItem('user').
                    then((res)=>{
                        var user = JSON.parse(res)
                        this.setState({
                            uid:user.id,
                        })
                        myFetch.get('/my/sign/',{
                            uid:this.state.uid
                        }).then(res=>{
                            if(res){
                                this.setState({
                                    num3:res.data.num
                                })
                                ToastAndroid.showWithGravityAndOffset(
                                    '签到成功！',
                                ToastAndroid.SHORT,
                                ToastAndroid.CENTER,
                                25,-100)
                            }else{
                                console.log(res);
                            }
                        })
                    })
                    this.setState({
                        flag:false
                    })
                } },
                { text: "取消", onPress: this.opntion2Selected },
            ]
        )
        }else{
            ToastAndroid.showWithGravityAndOffset(
                '今天已经签到过了！',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
            25,-100)
        }
    }
    poprefresh = (data)=>{
        if(data){
            this.state.page === 0 ?this.refreshConcern():this.refreshRecommend();
        }
    }
    refreshConcern = ()=>{
        // console.log('关注')
        this.setState({
            refreshing:true,
            onPress:0
        })
        myFetch.get('/share/classify/interest',{
            uid:this.state.uid
        }).then(res=>{
            this.setState({
                refreshing:false
            })
            // console.log('关注')
            // console.log(res)
            for(var i in res.data){
                if(!res.data[i].pic){
                    res.data[i].pic=image2
                }
                if(!res.data[i].imgurl){
                    res.data[i].imgurl=[image2]
                }
                // console.log(res.data[i].imgurl)
            }
            this.setState({
                clists:res.data,
                refreshing:false,
            })
            
        })
    }
    refreshRecommend = ()=>{
        this.setState({
            refreshing:true,
            onPress:0
        })
        myFetch.get('/share',{
            uid:this.state.uid
        }).then(res=>{
            // console.log(res.data)
            for(var i in res.data){
                if(!res.data[i].pic){
                    res.data[i].pic=image2
                }
                if(!res.data[i].imgurl){
                    res.data[i].imgurl=[image2]
                }
                // console.log(res.data[i].imgurl)
            }
            this.setState({
                rlists:res.data,
                refreshing:false
            })
            
        })

    }
    enlarge=(item)=>{
        // console.log(item.length)
        this.setState({
            visible:true,
            current:item
        })
    }
    render() {
        const renderPagination = (index, total, context) => {
            return (
              <View style= {styles.paginationStyle}>
                <Text style={styles.text}>
                  <Text style={styles.paginationText}>{index+1}</Text>/{total}
                </Text>
              </View>
            );
          }
        const VIEWABILITY_CONFIG = {
    		viewAreaCoveragePercentThreshold: 80,//item滑动80%部分才会到下一个
		};
        const tabs = [{ title: '喜欢'},{ title: '发布'}];
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
                    <TouchableOpacity onPress={this.alertMsg} >
                        <Icon4 style={styles.icon1} name='calendar'/>
                    </TouchableOpacity>
                    <Text style={styles.title1}>我的</Text>
                    <TouchableOpacity onPress={()=>Actions.Use()}>
                        <Icon1 style={styles.icon1}  name='settings'/>
                    </TouchableOpacity>
                </View>
                {/* 头像 */}
                <View style={{width:'100%',height:200*h,flexDirection:'row'}}>
                    <View style={{width:'100%',height:200*h,alignItems:'center',marginTop:20*h}}>
                        <TouchableOpacity onPress={()=>{this.choosebgpic()}}>
                            <Image style={{width:100*h,height:100*h,borderRadius:60,borderColor:'#FFBF2D',borderWidth:2}} source={{uri: this.state.back}} />
                        </TouchableOpacity>
                        <Text style={{color:'#FFBF2D', fontWeight:'bold',fontSize:17,marginTop:10*h}}>{this.state.name}</Text>
                        <View style={{fontWeight:'bold',marginTop:10*h,fontSize:17,width:'100%',justifyContent:'center',flexDirection:'row'}}>
                            <TouchableOpacity onPress={()=>{Actions.Mattention()}}>
                                <Text style={{fontSize:17, color:'#FFBF2D'}}>关注&nbsp;&nbsp;</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{Actions.Mfollowers()}}>
                                <Text style={{fontSize:17,color:'#FFBF2D'}}>粉丝&nbsp;&nbsp;</Text>
                            </TouchableOpacity>
                            <Icon3 style={styles.icon2} name='flower' />
                            <Text style={{color:'#FFBF2D',fontSize:17}}>&nbsp;:&nbsp;{this.state.num3}</Text>
                        </View>
                    </View>
                </View>
                {/* body */}
                <View style={{width:'100%',height:60*h,flexDirection:'row'}}>
                    <View style={{width:'50%',borderWidth:2,borderColor:'#eee',borderRadius:15}}>
                        <TouchableOpacity onPress={()=>Actions.Mychilds()}  style={styles.btn}>
                            <Icon6 style={styles.icon3}  name='child'/>
                            <Text style={styles.blockbtn}>&nbsp;&nbsp;亲子列表</Text >
                        </TouchableOpacity>
                    </View>
                    <View style={{width:'50%',borderWidth:2,borderColor:'#eee',borderRadius:15}}>
                        <TouchableOpacity onPress={()=>Actions.Mylover()}  style={styles.btn}>
                            <Icon5 style={styles.icon3}  name='account-heart'/>
                            <Text style={styles.blockbtn}>&nbsp;&nbsp;爱人列表</Text >
                        </TouchableOpacity>
                    </View>
                </View>
                {/* <View style={{width:'100%',height:80*h,backgroundColor:'#eee',flexDirection:'row'}}>
                    <View style={{width:'50%',borderWidth:2,borderColor:'white'}}>
                        <TouchableOpacity onPress={()=>Actions.Mstore()}  style={styles.btn}>
                            <Icon7 style={styles.icon3}  name='star'/>
                            <Text style={styles.blockbtn}>&nbsp;&nbsp;我的喜欢</Text >
                        </TouchableOpacity>
                    </View>
                    <View style={{width:'50%',borderWidth:2,borderColor:'white'}}>
                        <TouchableOpacity onPress={()=>Actions.Mpublish()}  style={styles.btn}>
                            <Icon7 style={styles.icon3}  name='pushpin'/>
                            <Text style={styles.blockbtn}>&nbsp;&nbsp;我的发布</Text >
                        </TouchableOpacity>
                    </View>
                </View> */}
                <Tabs
                    renderUnderline={() =>null}
                    // swipeable={true}
                    styles={{
                        topTabBarSplitLine: {
                            borderBottomWidth: 0,
                        },
                    }}
                    page={this.state.page}
                    tabs={tabs}
                    // onTabClick(tabs[i], i=>{console.log(i)})
                    onChange={(tab,index)=>{this.setState({page:index})}}
                    // onChange={(index)=>this.setState({page:i})}
                    renderTabBar={tabProps => (
                        <View style={styles.navbar}>
                            <View style={styles.navbartitle}>
                                {tabProps.tabs.map((tab, i) => (
                                    <TouchableOpacity
                                    key={tab.key || i}
                                    onPress={() => {
                                        const { goToTab, onTabClick} = tabProps;
                                        goToTab && goToTab(i);
                                        // onTabClick && onTabClick(tabs[i], i=>{console.log(i)});
                                        i === 0?
                                        this.setState({
                                            clists:[]
                                        },()=>{
                                            this.refreshConcern()
                                        })
                                        :
                                        this.setState({
                                            rlists:[]
                                        },()=>{
                                            this.refreshRecommend()
                                        })
                                    }}
                                    >
                                        <Text
                                            style={{
                                                height:0.055*height,
                                                textAlign:'center',
                                                textAlignVertical:'center',
                                                width:0.2*width,
                                                fontSize:tabProps.activeTab === i ? 28*s : 24*s,
                                                // backgroundColor:'#ccc',
                                                fontWeight: tabProps.activeTab === i ? 'bold' : 'normal',
                                                color: tabProps.activeTab === i ? '#FFBF2D' : 'rgba(0,0,0,0.6)',
                                            }}
                                        >
                                            {tab.title}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            {/* <View style={styles.navbarline}>
                            </View> */}
                        </View>
                    )}
                >
                    <WingBlank style={styles.wingblank}>
                        
                    </WingBlank>
                    <WingBlank style={styles.wingblank}>
                        <FlatList
                            refreshing = {this.state.refreshing}
                            onRefresh={this.refreshRecommend}
                            extraData={this.state}
                            data={this.state.rlists}
                            horizontal={false}
                            initialNumToRender={1}
                            pagingEnabled={true}
                            viewabilityConfig={VIEWABILITY_CONFIG}
                            showsVerticalScrollIndicator={false}
                            renderItem={({item})=>{
                                var imgurl = item.imgurl;
                                for(var i in imgurl){
                                    if(imgurl[i] === '#'){
                                        imgurl[i] = image2
                                    }
                                }
                                return<View style={styles.innerbox}>
                                    <View style={styles.innerpics}>
                                        <Swiper
                                            renderPagination = {renderPagination} 
                                            loop={false}
                                        >
                                            
                                            {
                                                imgurl&&imgurl.map((img,idx)=>(
                                                    <TouchableOpacity onPress={()=>this.enlarge(imgurl)}>
                                                        <Image 
                                                            style={styles.img}
                                                            resizeMode="cover"
                                                            source={{uri:`${img}`}}
                                                        />
                                                    </TouchableOpacity>
                                                ))
                                                
                                            }                     
                                        </Swiper>
                                    </View>
                                    <View style={styles.innerlast}>
                                        <View style={styles.innercontent}>
                                            <TouchableOpacity onPress={()=>this.enlarge(item.content)}>
                                                <Text selectable = {true} style={styles.content}>
                                                    {item.content ? (item.content.length > 66 ? item.content.substr(0, 66) + " . . . " : item.content) : ""}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.innerfooter}>
                                        </View>
                                    </View>
                                </View>
                            }}
                            getItemLayout={(data, index) => {
                                return {length: height, offset: height * index, index}
                            }}
                        />
                    </WingBlank>
                </Tabs>
                <Modal
                    transparent
                    visible={this.state.visible}
                >
                   <View style={{width:width,height:65*s,backgroundColor:'#FFBF2D',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                       <Text style={{fontSize:20,color:'#fff',fontWeight:'bold'}}>详情</Text>
                   </View>
                    <WingBlank style={styles.modalwingblank}>
                        <View style={styles.modalinner}>
                            {
                                typeof(this.state.current) === 'string'
                                ?<View style={styles.contentbox}>
                                    <Text selectable = {true} style={styles.content}>{this.state.current}</Text>
                                </View>
                                :<Swiper
                                    renderPagination = {renderPagination} 
                                    loop={false}
                                >
                                    
                                    {
                                        this.state.current&&this.state.current.map((item,idx)=>(
                                            <View>
                                                <Image 
                                                    style={styles.imgs}
                                                    resizeMode="contain"
                                                    source={{uri:`${item}`}}
                                                />
                                                
                                            </View>
                                        ))
                                    }                     
                                </Swiper>
                            }
                        </View>
                        <TouchableOpacity onPress={()=>this.setState({visible:false})}>
                            <Text style={styles.modalbtn}>返回</Text>
                        </TouchableOpacity>
                    </WingBlank>
                </Modal>
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
        paddingLeft:0.03*width,
        paddingTop:'1%',
        paddingRight:0.03*width,
        justifyContent:"center"
    },
    icon1:{
        width:0.08*width,
        color:'#fff',
        fontSize:25,
    },
    title1:{
        marginLeft:'auto',
        marginRight:"auto",
        textAlign:'center',
        fontSize:20,
        color:'#fff',
        letterSpacing:3,
        fontWeight:'bold'
    },
    btn: {
        padding:0,
        height: 40*h,
        // width: "500%",
        marginLeft: 50,
        marginRight: 5,
        marginTop: 5,
        flexDirection:'row',
        borderRadius: 5,
    },
    blockbtn:{ 
        textAlign: "center", 
        fontSize: 16,
        textAlignVertical:'center', 
        lineHeight: 50*h, 
        color:'#FFBF2D',
        fontWeight:'bold'
    },
    icon2:{
        color:'#FFBF2D',
        fontSize:20,
    },
    icon3:{
        color:'#FFBF2D',
        fontSize:30,
    },
    // 新增
    navbartitle:{
        width:width,
        height:0.07*height,
        backgroundColor:'#fff',
        flexDirection: 'row',
        paddingTop:0.015*height,
        justifyContent:'center',
        paddingRight: 0.03 * width,
        paddingLeft: 0.03 * width,
    },
    icon: {
        width: 0.08 * width,
        marginLeft:0.2*width,
        color: '#FFBF2D',
        fontSize: 32,
        textAlign:'center',
        textAlignVertical:'center',
    },
    title: {
        width: 0.08 * width,
        marginRight:0.2*width,
        color: '#999',
        fontSize: 30,
        textAlign:'center',
        textAlignVertical:'center',
    },
    navbarline:{
        width:0.4*width,
        height:0.05*height,
        flexDirection: 'row',
        justifyContent:"center",
    },
    wingblank:{
        height:0.75*height,
        marginTop:0.01*height,
        justifyContent:'center',
        // backgroundColor:'#FFBF2D',
        backgroundColor:'rgba(250,250,250,1)'
    },
    innerbox:{
        // backgroundColor:'#ccc',
        height:0.75*height,
        alignItems:'center'
    },
    tagicon:{
        fontSize:55*s,
        marginTop:-0.05*height,
        color:'#FFBF2D'
    },
    innertitlebtn:{
        width:0.18*width,
        height:0.05*height,
        backgroundColor: 'rgba(255,191,45,0.8)',
        fontWeight:'bold',
        borderRadius:5,
        color:'#fff',
        fontSize:25*s,
        letterSpacing:5,
        textAlign:'center',
        textAlignVertical:'center'
    },
    innerbtndisabled:{
        width:0.18*width,
        height:0.05*height,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius:5,
        color:'#fff',
        fontSize:22*s,
        textAlign:'center',
        textAlignVertical:'center'
    },
    innerpics:{
        width:0.87*width,
        // backgroundColor:'#ddccff',
        height:0.44*height,
        alignItems:'center'
    },
    img:{
        width:0.87*width,
        height:0.44*height
    },
    paginationStyle: {
        position: 'absolute',
        bottom: 10,
        right: 10
    },
    innerlast:{
        width:0.88*width,
        height:0.18*height,
        // backgroundColor:'#ccc',
    },
    innercontent:{
        width:0.88*width,
        height:0.13*height,
        // paddingTop:0.015*height,
        // paddingLeft:0.01*width,
        justifyContent:'center',
        // backgroundColor:'#ddeeff',
        alignItems:'center'
    },
    content:{
        lineHeight:0.04*height,
        fontSize:23*s,
        // backgroundColor:'#000'

    },
    innerfooter:{
        width:0.87*width,
        height:0.06*height,
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'flex-end'
    },
    modalwingblank:{
        height:height,
        backgroundColor:'#fff'
    },
    modalinner:{
        height:0.75*height,
        justifyContent:'center'
    },
    imgs:{
        width:0.9*width,
        height:0.7*height,
        marginLeft:'auto',
        marginRight:'auto',
        // backgroundColor:'#ccc'
    },
    contentbox:{
        width:0.8*width,
        // marginTop:0.05*height,
        paddingTop:0.02*height,
        marginLeft:'auto',
        marginRight:'auto',
        alignItems:'center',
        paddingLeft:0.015*width,
        // backgroundColor:'#ccc',
    },
    modalbtn:{
        width:0.18*width,
        height:0.05*height,
        marginLeft:0.75*width,
        borderRadius:5,
        textAlignVertical:'center',
        textAlign:'center',
        backgroundColor:'#FFBF2D',
        fontSize:25*s,
        color:'#fff',
    }
})