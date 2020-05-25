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
import {myFetch} from '../../src/utils'
const { width, scale, height } = Dimensions.get('window');
const s = width / 640;
const h = height / 1012;
const image2 = 'http://tc.sinaimg.cn/maxwidth.2048/tc.service.weibo.com/p/image_96weixin_com/9a6afdf6ff7c953f04675270477405b0.jpg'
const image3 = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587985300669&di=0dd8b86dafb708019e01377b9d394503&imgtype=0&src=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D1229184673%2C3594306478%26fm%3D214%26gp%3D0.jpg'
const image = 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3230746282,4148313693&fm=15&gp=0.jpg'
const image1 = 'http://img.zcool.cn/community/019de45c32c171a80121df90bbe9ca.jpg@1280w_1l_2o_100sh.jpg'
export default class Mstore extends Component {
    constructor(props){
        super(props);
        this.state={
            uid:'',
            sendflower:false,
            visible:false,
            current:'',
            content:'',
            onPress:0,
            showFoot:0,
            refreshing:false,
            clists:[],
            rlists:[],
            page:1,
            img :'http://img.zcool.cn/community/019de45c32c171a80121df90bbe9ca.jpg@1280w_1l_2o_100sh.jpg'
        }
    }
    componentDidMount(){
        this.setState({
            refreshing:true,
        })
        AsyncStorage.getItem('user').
        then((res)=>{
            var user = JSON.parse(res)
            this.setState({
                uid:user.id,
            })
            myFetch.get('/my/myartic/mylikemsg',{
                user_id:user.id
            }).then(res=>{
                for(var i in res.data){
                    if(!res.data[i].pic){
                        res.data[i].pic=image3
                    }
                    if(!res.data[i].imgurl){
                        res.data[i].imgurl=[image2]
                    }
                }
                this.setState({
                    rlists:res.data,
                    refreshing:false,
                })
                
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
            for(var i in res.data){
                if(!res.data[i].pic){
                    res.data[i].pic=image2
                }
                if(!res.data[i].imgurl){
                    res.data[i].imgurl=[image2]
                }
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
    enlarge=(item)=>{
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
    		viewAreaCoveragePercentThreshold: 80,
		};
        return (
            <View style={{ 
                width: width, 
                height: height, 
                backgroundColor: "#fff",
            }}>
                <View style={styles.navbar}>
                    <Icon1 
                        style={styles.icon2}
                        name='chevron-left'
                        onPress={()=>Actions.pop()}
                    />
                    <Text style={styles.title1}>我的喜欢</Text>
                </View>
                <View>
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
                                        <View>
                                            <Text style={styles.innertitlename}>发布的时间：{moment(item.setState).format("YYYY年MM月DD日")}</Text>
                                        </View>
                                        <Text style={styles.innertitletag}>
                                        </Text>
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
                                                    内容：
                                                    {item.content ? (item.content.length > 62? item.content.substr(0, 66) + " . . . " : item.content) : ""}
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
                </View> 
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
        width:width,
        height:65*s,
        backgroundColor:'#FFBF2D',
        flexDirection: 'row',
        paddingLeft:0.03*width,
        paddingTop:'1%',
        paddingRight:0.03*width,
        justifyContent:"center"
    },
    icon2:{
        width:0.08*width,
        color:'#fff',
        fontSize:30,
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
    wingblank:{
        height:0.75*height,
        marginTop:0.01*height,
        justifyContent:'center',
        backgroundColor:'rgba(250,250,250,1)'
    },
    innerbox:{
        height:0.75*height,
        alignItems:'center'
    },
    innertitle:{
        width:0.9*width,
        height:0.1*height,
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
        width:0.55*width,
        marginLeft:0.03*width,
        height:0.025*height,
        color:'#333',
        fontSize:23*s,
        textAlign:'left',
        textAlignVertical:'center'
    },
    innertitletag:{
        width:0.2*width,
        marginRight:0.075*width,
        height:0.1*height,
        fontSize:23*s,
        color:'#555',
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
    },
    innercontent:{
        width:0.88*width,
        height:0.13*height,
        paddingTop:0.015*height,
        paddingLeft:0.01*width,
        justifyContent:'center',
        alignItems:'center'
    },
    content:{
        lineHeight:0.04*height,
        fontSize:23*s,

    },
    zannum:{
        height:0.02*height,
        fontSize:18*s,
        textAlignVertical:'center'
    },
    modaltitle:{
        flexDirection:'row',
    },
    modalicon:{
        color: '#999',
        fontSize: 32,
        textAlign:'center',
        textAlignVertical:'center',
        width:0.1*width,
        height:0.07*height,
        backgroundColor:'#fff',
    },
    modalblock:{
        width:0.1*width,
        height:0.07*height,
        marginLeft:0.8*width,
        backgroundColor:'#fff'
    },
    modalwingblank:{
        backgroundColor:'#fff',
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
    },
    contentbox:{
        width:0.8*width,
        paddingTop:0.02*height,
        marginLeft:'auto',
        marginRight:'auto',
        alignItems:'center',
        paddingLeft:0.015*width,
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
