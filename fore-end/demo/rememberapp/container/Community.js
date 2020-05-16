import React, { Component } from 'react'
import { 
    Text, 
    StyleSheet, 
    Dimensions, 
    View, 
    Image, 
    TouchableOpacity, 
    TouchableHighlight,
    AsyncStorage,
    StatusBar,
    ScrollView,
    FlatList,
    ImageBackground,
    DrawerLayoutAndroid,
    Modal,
    ToastAndroid
} from 'react-native'
import { 
    Flex, 
    WingBlank,
    Icon, 
    SearchBar, 
    TabBar,
    Tabs
} from '@ant-design/react-native'
import {
    Actions
} from 'react-native-router-flux'
import Icon1 from 'react-native-vector-icons/Feather'
import Icon2 from 'react-native-vector-icons/Ionicons'
import Icon3 from 'react-native-vector-icons/Entypo'
import Icon4 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon5 from 'react-native-vector-icons/Fontisto'
import ImagePicker from 'react-native-image-picker'
import Swiper from 'react-native-swiper'
import moment from 'moment'
import Button from 'react-native-button'
import {myFetch} from '../src/utils'
// import ImagePicker from 'react-native-image-crop-picker'
const { width, scale, height } = Dimensions.get('window');
const s = width / 640;
const h = height / 1012;
const image2 = 'http://tc.sinaimg.cn/maxwidth.2048/tc.service.weibo.com/p/image_96weixin_com/9a6afdf6ff7c953f04675270477405b0.jpg'
const image3 = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587985300669&di=0dd8b86dafb708019e01377b9d394503&imgtype=0&src=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D1229184673%2C3594306478%26fm%3D214%26gp%3D0.jpg'
const image = 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3230746282,4148313693&fm=15&gp=0.jpg'
const image1 = 'http://img.zcool.cn/community/019de45c32c171a80121df90bbe9ca.jpg@1280w_1l_2o_100sh.jpg'
export default class Community extends Component {
    constructor(props){
        super(props);
        // var uid = JSON.parse(localStorage.getItem('uid'));
        this.state={
            uid:'',
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
    componentDidMount(){
        // console.log('社区第一次加载');
        this.setState({
            refreshing:true,
        })
        AsyncStorage.getItem('user').
        then((res)=>{
            var user = JSON.parse(res)
            this.setState({
                uid:user.id,
            })
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
    choosedetails=(url,style,page)=>{
        var classifylist = [];
        this.setState({
            refreshing:true,
        })
        myFetch.get(`${url}`,{
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
                // console.log(res.data[i].style)
                switch(style){
                    case 0:
                        classifylist.push(res.data[i]);
                        break;
                    case 1:
                        if(res.data[i].style){
                            classifylist.push(res.data[i])
                        }
                        break;
                    case 2:
                        if(!res.data[i].style){
                            classifylist.push(res.data[i])
                        }
                        break;
                    default:
                        break;
                }
                if(page===0){
                    this.setState({
                        refreshing:false,
                        clists:classifylist
                    })
                }else{
                    this.setState({
                        refreshing:false,
                        rlists:classifylist
                    })
                }
            }
        })
    }
    btnconcern = (item)=>{
        var list=[];
        this.state.page === 0?list=this.state.clists:list=this.state.rlists;
        if(!item.like){
            for(var i in list){
                if(list[i].uid === item.uid){
                    list[i].like = item.like;
                }
            }
            myFetch.get('/share/article/interest',{
                uid:this.state.uid,
                fid:item.uid
            }).then(res=>{
                // console.log(res)
                ToastAndroid.showWithGravityAndOffset(
                '关注成功！',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
                0,-250)
                this.poprefresh(true)
            })
        }else{
            myFetch.get('/share/article/delinter',{
                uid:this.state.uid,
                fid:item.uid
            }).then(res=>{
                // console.log(res)
                ToastAndroid.showWithGravityAndOffset(
                '已取消关注！',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
                0,-250)
                this.poprefresh(true)
            })
        }
    }
    like = (item)=>{
        var list=[];
        this.state.page === 0?list=this.state.clists:list=this.state.rlists;
        if(!item.addZan){
            // console.log('点赞')
            for(var i in list){
                if(list[i].uid === item.uid){
                    list[i].addZan = item.addZan;
                }
            }
            myFetch.get('/share/praise/addpraise',{
                user_id:this.state.uid,
                article_id:item.id

            }).then(res=>{
                console.log(res)
                this.poprefresh(true)
            })
        }else{
            // console.log('取消赞')
            myFetch.get('/share/praise/reducepraise',{
                user_id:this.state.uid,
                article_id:item.id
            }).then(res=>{
                console.log(res)
                this.poprefresh(true)
            })
        }
    }
    sendflower = (item)=>{
        this.setState(({
            sendflower:true
        }))
        myFetch.get('/share/num/addnum',{
            uid:this.state.uid,
            auid:item.uid,
            id:item.id
        }).then(res=>{
            // console.log(res)
            this.setState(({
                sendflower:false
            }))
            ToastAndroid.showWithGravityAndOffset(
            res.msg,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
            0,-250)
            res.code ?null:this.poprefresh(true)
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
        const tabs = [{ title: '关注'},{ title: '推荐'}];
        const linetabs = [{title:'全部'},{title:'亲子'},{title:'爱人'}]
        return (
            <View style={{ 
                width: width, 
                height: height, 
                backgroundColor: "#fff",
            }}>
                <StatusBar 
                    backgroundColor='#FFBF2D'
                />
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
                                <TouchableOpacity onPress={()=>Actions.tsearch()}>
                                    <Icon2 style={styles.title} name='ios-search'/>
                                </TouchableOpacity>
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
                                <TouchableOpacity onPress={()=>Actions.taddswiper({uid:this.state.uid})}>
                                    <Icon2 style={styles.icon} name='ios-add-circle-outline'/>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.navbarline}>
                                {linetabs.map((item, i) => (
                                    <TouchableOpacity
                                        onPress={()=>{
                                        this.setState({onPress:i});
                                        var url='';
                                        var page = this.state.page;
                                        if(page===0){
                                            url='/share/classify/interest'
                                        }else{
                                            url='/share'
                                        }
                                        this.choosedetails(url,i,page);
                                    }}
                                    >
                                        <Text
                                            style={{
                                                height:0.04*height,
                                                textAlign:'center',
                                                textAlignVertical:'center',
                                                width:0.13*width,
                                                fontSize:18*s,
                                                // backgroundColor:'#ccc',
                                                color:this.state.onPress == i ? '#FFBF2D' : '#999',
                                            }}
                                        >
                                            {
                                                this.state.onPress == i
                                                ?<Icon2 size={20*s} color='#FFBF2D' name='md-radio-button-on'/>
                                                :<Icon2 size={20*s} color='#999' name='md-radio-button-off'/>
                                            } {item.title}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    )}
                >
                    <WingBlank style={styles.wingblank}>
                        <FlatList
                            ref={(flatList)=>this._flatList = flatList}
                            refreshing = {this.state.refreshing}
                            onRefresh={this.refreshConcern}
                            extraData={this.state}
                            data={this.state.clists}
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
                                    <View style={styles.innertitle}>
                                        <TouchableOpacity>
                                            <Image 
                                                style={styles.innertitlepic}
                                                source={{uri:`${item.pic}`}}
                                            />
                                        </TouchableOpacity>
                                        <View>
                                            <Text style={styles.innertitlename}>{item.uname}</Text>
                                            <Text style={styles.innertitletime}>{moment(item.setState).format("YYYY年MM月DD日")}</Text>
                                        </View>
                                        <Text style={styles.innertitletag}>
                                            <Icon3 style={styles.tagicon} name='price-tag'/>
                                        {item.style?'亲子':'爱人'}</Text>
                                        {
                                            item.uid === this.state.uid
                                            ?<Text style={{width:0.18*width,height:0.05*height,}}></Text>
                                            :<TouchableOpacity onPress={()=>this.btnconcern(item)}>
                                                <Text style={!item.like?styles.innertitlebtn:styles.innerbtndisabled}>
                                                    {!item.like?'关注':'取消关注'}
                                                </Text>
                                            </TouchableOpacity>
                                        }
                                    </View>
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
                                                // <Text></Text>
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
                                            <View style={styles.footerbox}>
                                                <TouchableOpacity onPress={()=>this.like(item)}>
                                                    {
                                                        item.addZan
                                                        ?<Icon3 style={styles.footericon} color='red' name='heart'/>
                                                        :<Icon3 style={styles.footericon} color='#666' name='heart-outlined'/>
                                                    }
                                                </TouchableOpacity>
                                                <Text style={styles.zannum}>{item.zannum<10000 ?item.zannum:(item.zannum/10000).toFixed(1)+'万'}</Text>
                                            </View>
                                            <View style={styles.footerbox}>
                                                <TouchableOpacity onPress={()=>Actions.tdiscuss({
                                                    article_id:item.id,
                                                    host_id:item.uid,
                                                    user_id:this.state.uid,
                                                    page:this.state.page,
                                                    callBack:this.poprefresh.bind(this)
                                                })}>
                                                    <Icon4 style={styles.footericon} color='#666' name='comment-processing-outline'/>
                                                </TouchableOpacity>
                                                <Text style={styles.zannum}>{item.comment<10000 ?item.comment:(item.comment/10000).toFixed(1)+'万'}</Text>
                                            </View>
                                            <View style={styles.footerbox}>
                                                <TouchableOpacity onPress={()=>this.sendflower(item)}>
                                                    {
                                                        this.state.sendflower
                                                        ?<Icon4 style={styles.footericon} color='red' name='flower-tulip'/>
                                                        :<Icon4 style={styles.footericon} color='#666' name='flower-tulip-outline'/>
                                                    }
                                                </TouchableOpacity>
                                                <Text style={styles.zannum}>{item.num}</Text>
                                            </View>
                                            <View style={styles.footerbox}>
                                                <TouchableOpacity>
                                                    <Icon4 style={styles.footericon} color='#666' name='share-outline'/>
                                                </TouchableOpacity>
                                                <Text style={styles.zannum}>分享</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            }}
                            getItemLayout={(data, index) => {
                                return {length: height, offset: height * index, index}
                            }}
                            // keyExtractor={(item, index) => index.toString()}
                            // onViewableItemsChanged={this._onViewableItemsChanged}
                        />
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
                                    <View style={styles.innertitle}>
                                        <TouchableOpacity>
                                            <Image 
                                                style={styles.innertitlepic}
                                                source={{uri:`${item.pic}`}}
                                            />
                                        </TouchableOpacity>
                                        <View>
                                            <Text style={styles.innertitlename}>{item.uname}</Text>
                                            <Text style={styles.innertitletime}>{moment(item.setState).format("YYYY年MM月DD日")}</Text>
                                        </View>
                                        <Text style={styles.innertitletag}>
                                            <Icon3 style={styles.tagicon} name='price-tag'/>
                                        {item.style?'亲子':'爱人'}</Text>
                                        {
                                            item.uid === this.state.uid
                                            ?<Text style={{width:0.18*width,height:0.05*height,}}></Text>
                                            :<TouchableOpacity onPress={()=>this.btnconcern(item)}>
                                                <Text style={!item.like?styles.innertitlebtn:styles.innerbtndisabled}>
                                                    {!item.like?'关注':'取消关注'}
                                                </Text>
                                            </TouchableOpacity>
                                        }
                                    </View>
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
                                            <View style={styles.footerbox}>
                                                <TouchableOpacity onPress={()=>this.like(item)}>
                                                    {
                                                        item.addZan
                                                        ?<Icon3 style={styles.footericon} color='red' name='heart'/>
                                                        :<Icon3 style={styles.footericon} color='#666' name='heart-outlined'/>
                                                    }
                                                </TouchableOpacity>
                                                <Text style={styles.zannum}>{item.zannum<10000 ?item.zannum:(item.zannum/10000).toFixed(1)+'万'}</Text>
                                            </View>
                                            <View style={styles.footerbox}>
                                                <TouchableOpacity onPress={()=>Actions.tdiscuss({
                                                    article_id:item.id,
                                                    host_id:item.uid,
                                                    user_id:this.state.uid,
                                                    page:this.state.page,
                                                    callBack:this.poprefresh.bind(this)
                                                    })}>
                                                    <Icon4 style={styles.footericon} color='#666' name='comment-processing-outline'/>
                                                </TouchableOpacity>
                                                <Text style={styles.zannum}>{item.comment<10000 ?item.comment:(item.comment/10000).toFixed(1)+'万'}</Text>
                                            </View>
                                            <View style={styles.footerbox}>
                                                <TouchableOpacity onPress={()=>{
                                                    this.sendflower(item);
                                                    
                                                }}>
                                                    {
                                                        this.state.sendflower
                                                        ?<Icon4 style={styles.footericon} color='red' name='flower-tulip'/>
                                                        :<Icon4 style={styles.footericon} color='#666' name='flower-tulip-outline'/>
                                                    }
                                                </TouchableOpacity>
                                                <Text style={styles.zannum}>{item.num}</Text>
                                            </View>
                                            <View style={styles.footerbox}>
                                                <TouchableOpacity>
                                                    <Icon4 style={styles.footericon} color='#666' name='share-outline'/>
                                                </TouchableOpacity>
                                                <Text style={styles.zannum}>分享</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            }}
                            getItemLayout={(data, index) => {
                                return {length: height, offset: height * index, index}
                            }}
                            // keyExtractor={(item, index) => index.toString()}
                            // onViewableItemsChanged={this._onViewableItemsChanged}
                        />
                    </WingBlank>
                </Tabs>
                <Modal
                    transparent
                    visible={this.state.visible}
                >
                    <View style={styles.modaltitle}>
                        <Icon1 style={styles.modalicon} name=''/>
                        <Icon1 style={styles.modalblock} name=''/>
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
        height:0.115*height,
        width:width,
        alignItems:'center',
        marginBottom:0.005*height
    },
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
    innertitle:{
        width:0.9*width,
        height:0.1*height,
        // backgroundColor:'#000',
        // backgroundColor:"#ccc",
        flexDirection:'row',
        justifyContent:"center",
        alignItems:'center',
        marginBottom:0.005*height,
        marginTop:0.01*height
    },
    innertitlepic:{
        width:0.1*height,
        height:0.1*height,
        borderRadius:100,
        borderColor:'rgba(255,191,45,0.1)',
        borderWidth:3
    },
    innertitlename:{
        width:0.25*width,
        marginLeft:0.03*width,
        height:0.045*height,
        color:'#333',
        fontSize:23*s,
        // backgroundColor:"#ccc",
        textAlign:'left',
        textAlignVertical:'center'
    },
    innertitletime:{
        width:0.25*width,
        marginLeft:0.03*width,
        height:0.025*height,
        color:'#333',
        // backgroundColor:"#ccc",
        textAlign:'left',
        textAlignVertical:'bottom'
    },
    innertitletag:{
        width:0.2*width,
        marginRight:0.075*width,
        height:0.1*height,
        fontSize:23*s,
        color:'#555',
        // backgroundColor:"#ccc",
        textAlign:'center',
        marginTop:-0.015*height,
        textAlignVertical:'top',
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
        paddingTop:0.015*height,
        paddingLeft:0.01*width,
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
        // backgroundColor:'#ddd',
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'flex-end'
    },
    footerbox:{
        // backgroundColor:'#ccc',
        width:0.13*width,
        height:0.06*height,
        alignItems:'center',
        justifyContent:'center'
    },
    footericon:{
        width:0.13*width,
        height:0.04*height,
        // backgroundColor:'#ccc',
        // textAlignVertical:'bottom',
        // color:'#FFBF2D',
        textAlign:'center',
        fontSize:45*s,
    },
    zannum:{
        // backgroundColor:'#ccc',
        height:0.02*height,
        fontSize:18*s,
        // color:'#FFBF2D',
        textAlignVertical:'center'
    },
    modaltitle:{
        flexDirection:'row',
        // justifyContent:''
    },
    modalicon:{
        color: '#999',
        fontSize: 32,
        textAlign:'center',
        textAlignVertical:'center',
        width:0.1*width,
        height:0.07*height,
        backgroundColor:'#fff',
        // backgroundColor:'#ccc',
    },
    modalblock:{
        width:0.1*width,
        height:0.07*height,
        marginLeft:0.8*width,
        backgroundColor:'#fff'
    },
    modalwingblank:{
        backgroundColor:'#fff',
        // backgroundColor:'#ccc',
        height:0.83*height
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
