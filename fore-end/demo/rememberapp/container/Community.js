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
    Modal
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
const image2 = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587985300669&di=0dd8b86dafb708019e01377b9d394503&imgtype=0&src=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D1229184673%2C3594306478%26fm%3D214%26gp%3D0.jpg'
const image = 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3230746282,4148313693&fm=15&gp=0.jpg'
const image1 = 'http://img.zcool.cn/community/019de45c32c171a80121df90bbe9ca.jpg@1280w_1l_2o_100sh.jpg'
export default class Community extends Component {
    constructor(props){
        super(props);
        // var uid = JSON.parse(localStorage.getItem('uid'));
        this.state={
            uid:'',
            like:false,
            sendflower:false,
            visible:false,
            btndisabled:false,
            btn:'关注',
            current:'',
            content:'对不齐呀对不齐呀！对不齐呀对不齐呀！对不齐呀对不齐呀！对不齐呀对不齐呀！对不齐呀对不齐呀！对不齐呀对不齐呀！对不齐呀对不齐呀！对不齐呀对不齐呀！',
            onPress:0,
            showFoot:0,
            refreshing:false,
            lists:[]
        }
    }
    componentDidMount(){
        console.log('社区第一次加载');
        AsyncStorage.getItem('user').
        then((res)=>{
            var user = JSON.parse(res)
            this.setState({
                uid:user.id
            })
            myFetch.get('/share',{
                uid:user.id
            }).then(res=>{
                // console.log(res.msg)
                for(var i in res.data){
                    if(!res.data[i].pic){
                        res.data[i].pic=image2
                    }
                    if(!res.data[i].imgurl){
                        res.data[i].imgurl=[image2]
                    }
                    console.log(res.data[i].imgurl)
                }
                this.setState({
                    lists:res.data
                })
                
            })
            // fetch(`http://148.70.223.218:3001/share?uid=${user.id}`)
            // .then(res=>res.json())
            // .then(res=>{
            //     console.log(res)
            // })
        })
    }
    componentDidUpdate(prevProps,prevState){
        console.log('更新')
    
    }
    btndisabled = ()=>{
        if(!this.state.btndisabled){
            this.setState({btndisabled:true,btn:'取消关注'})
        }else{
            this.setState({btndisabled:false,btn:'关注'})
        }
    }
    like = ()=>{
        if(!this.state.like){
            this.setState({like:true})
        }else{
            this.setState({like:false})
        }
    }
    sendflower = ()=>{
        if(!this.state.sendflower){
            this.setState({sendflower:true})
        }
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
                    tabs={tabs}
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
                                        const { goToTab, onTabClick } = tabProps;
                                        onTabClick && onTabClick(tabs[i], i);
                                        goToTab && goToTab(i);
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
                                        this.setState({onPress:i})
                                    }}
                                    >
                                        <Text
                                            style={{
                                                height:0.04*height,
                                                textAlign:'center',
                                                textAlignVertical:'center',
                                                width:0.1*width,
                                                fontSize:18*s,
                                                // backgroundColor:'#ccc',
                                                color:this.state.onPress == i ? 'rgba(0,0,0,0.7)' : '#999',
                                            }}
                                        >
                                            {item.title}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    )}
                >
                    <WingBlank style={styles.wingblank}>
                        <FlatList
                            refreshing = {this.state.refreshing}
                            onRefresh={()=>{this.setState({refreshing:false})}}
                            extraData={this.state}
                            data={this.state.lists}
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
                                        {item.tag?'亲子':'爱人'}</Text>
                                        <TouchableOpacity onPress={this.btndisabled}>
                                            <Text style={!this.state.btndisabled?styles.innertitlebtn:styles.innerbtndisabled}>
                                                {this.state.btn}
                                            </Text>
                                        </TouchableOpacity>
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
                                                <TouchableOpacity onPress={this.like}>
                                                    {
                                                        this.state.like
                                                        ?<Icon3 style={styles.footericon} color='red' name='heart'/>
                                                        :<Icon3 style={styles.footericon} color='#666' name='heart-outlined'/>
                                                    }
                                                </TouchableOpacity>
                                                <Text style={styles.zannum}>{item.zannum}</Text>
                                            </View>
                                            <View style={styles.footerbox}>
                                                <TouchableOpacity onPress={()=>Actions.tdiscuss()}>
                                                    <Icon4 style={styles.footericon} color='#666' name='comment-processing-outline'/>
                                                </TouchableOpacity>
                                                <Text style={styles.zannum}>{item.zannum}</Text>
                                            </View>
                                            <View style={styles.footerbox}>
                                                <TouchableOpacity onPress={this.sendflower}>
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
                    {/* <View style={styles.tabbox}>
                        
                    </View> */}
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
        textAlign:'center',
        fontSize:45*s,
    },
    zannum:{
        // backgroundColor:'#ccc',
        height:0.02*height,
        fontSize:18*s,
        color:'#333',
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
