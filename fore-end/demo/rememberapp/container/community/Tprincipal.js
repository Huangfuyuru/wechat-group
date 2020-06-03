import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image,
    FlatList,
    ImageBackground,
} from 'react-native'
import Icon1 from 'react-native-vector-icons/Feather'
import Icon3 from 'react-native-vector-icons/Ionicons'
import { WingBlank, Tabs, TabBar, } from '@ant-design/react-native';
import { myFetch } from '../../src/utils'
import { Actions } from 'react-native-router-flux';
const image2 = 'http://tc.sinaimg.cn/maxwidth.2048/tc.service.weibo.com/p/image_96weixin_com/9a6afdf6ff7c953f04675270477405b0.jpg'
const { width, scale, height } = Dimensions.get('window');
const s = width / 640;
const c = '你爱自由胜过爱我 可是我偏偏偏爱缠绵胜过洒脱 我们的契合是最美丽的花火 惊艳了时光却照不亮挑剔的生活'
export default class Tprincipal extends Component {
    constructor() {
        super();
        this.state = {
            uid: '',
            list: [],
            llist: [],
            current: '',
            concernnum: "",
            fansnum: "",
            page: 0,
            refreshing: false,
            onPress: 0,
            page: 1,
        }
    }
    componentDidMount() {
        this.setState({
            uid: this.props.uid,
            refreshing: true,
        })
        myFetch.get('/my/myarticle/mypublish', {
            uid: this.props.uid
        }).then(res => {
            if(res.data[0]){
            for (var i in res.data) {
                if (!res.data[i].imgurl) {
                    res.data[i].imgurl = [image2]
                }
            }
            this.setState({
                list: res.data,
                refreshing: false,
            })
        }else{
            this.setState({
                list:[],
                refreshing: false,
            })
        }
        })
        myFetch.get('/my/myarticle/mylike',{
            user_id:this.props.uid
         }).then(res=>{
             this.setState({
                 refreshing:false
             })
             if(res.data[0]){
             var list=[];
             for(var i in res.data){   
                 list.push(res.data[i][0])
             }
             for(var i in list){
                 if(!list[i].imgurl){
                     list[i].imgurl=[image2]
                 }
             }
             this.setState({
                 llist:list,
                 refreshing:false,
             })
            }
            else{
                this.setState({
                    llist:[],
                    refreshing:false,
                })
            }
         })
         myFetch.get('/my/mypage/fansmsg',{
            user_id:this.props.uid
        }).then(res=>{
            if(res.data){
              
                this.setState({
                    fansnum:res.data.length
                })
            }else{
                this.setState({
                    fansnum:0
                })
            }
        })
        //  
        myFetch.get('/my/mypage/focusmsg',{
            user_id:this.props.uid
        }).then(res=>{
            if(res.data){
                this.setState({
                    concernnum:res.data.length
                })
            }else{
                this.setState({
                    concernnum:0
                })
            }
        })
    }
    my=()=>{
        this.setState({
            refreshing:true,
            onPress:0
        })
        myFetch.get('/my/myarticle/mypublish',{
            uid:this.state.uid
        }).then(res=>{
            if(res.data[0]){
                for (var i in res.data) {
                    if (!res.data[i].imgurl) {
                        res.data[i].imgurl = [image2]
                    }
                }
                this.setState({
                    list: res.data,
                    refreshing: false,
                })
            }else{
                this.setState({
                    list:[],
                    refreshing: false,
                })
            }
        })  
    }
    like=()=>{
        this.setState({
            refreshing:true,
            onPress:0
        })
        myFetch.get('/my/myarticle/mylike',{
           user_id:this.state.uid
        }).then(res=>{
            this.setState({
                refreshing:false
            })
            if(res.data[0]){
            var list=[];
            for(var i in res.data){   
                list.push(res.data[i][0])
            }
            for(var i in list){
                if(!list[i].imgurl){
                    list[i].imgurl=[image2]
                }
            }
            this.setState({
                llist:list,
                refreshing:false,
            })
           }
           else{
               this.setState({
                   llist:[],
                   refreshing:false,
               })
           }
        })
    }
    render() {
        const tabs = [
            { title: '作品' },
            { title: '喜欢' },
        ];
        return (
            <View style={{flex:1}}> 
                <View style={styles.navbar}>
                    <TouchableOpacity onPress={() => Actions.pop()}>
                        <Icon1 style={styles.icon} name='chevron-left' />
                    </TouchableOpacity>
                    <Text style={styles.title}>主页</Text>
                    <TouchableOpacity>
                        <Icon3 style={styles.icon} name='' />
                    </TouchableOpacity>
                </View>
                <View style={styles.titlebox}>
                    <Image
                        style={styles.upic}
                        source={{ uri: `${this.props.upic}` }}
                    />
                    <Text style={styles.uname}>{this.props.uname}</Text>
                    <View style={styles.numbox}>
                        <TouchableOpacity>
                            <Text style={styles.num}>粉丝： {this.state.fansnum < 10000 ? this.state.fansnum : (this.state.fansnum / 10000).toFixed(1) + '万'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.num}>关注： {this.state.concernnum < 10000 ? this.state.concernnum : (this.state.concernnum / 10000).toFixed(1) + '万'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Tabs
                    renderUnderline={() => null}
                    styles={{
                        topTabBarSplitLine: {
                            borderBottomWidth: 0,
                        },
                    }}
                    page={0}
                    tabs={tabs}
                    onChange={(tab, index) => { this.setState({ page: index }) }}
                    renderTabBar={tabProps => (
                             <View style={styles.titlebtn}>
                                {tabProps.tabs.map((tab, i) => (
                                    <TouchableOpacity
                                        key={tab.key || i}
                                        onPress={() => {
                                            const { goToTab, onTabClick } = tabProps;
                                            goToTab && goToTab(i);
                                        }}
                                    >
                                        <Text style={{
                                            textAlign: 'center',
                                            width: 0.2 * width,
                                            height: 0.05 * height,
                                            textAlignVertical: 'center',
                                            textAlign: 'center',
                                            fontSize: tabProps.activeTab === i ? 0.045 * width : 0.04 * width,
                                            fontWeight: tabProps.activeTab === i ? 'bold' : 'normal',
                                            color: tabProps.activeTab === i ? '#FFBF2D' : 'rgba(0,0,0,0.6)',
                                        }}>{tab.title}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                    )}
                >
                    <WingBlank style={styles.inner}>
                        {this.state.list[0]?
                        <FlatList
                            refreshing = {this.state.refreshing}
                            onRefresh={this.my}
                            extraData={this.state}
                            data={this.state.list}
                            horizontal={false}
                            numColumns={3}
                            pagingEnabled={true}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => {
                                return <View style={styles.innerblock}>
                                    <TouchableOpacity onPress={() => Actions.tdetail({uid:this.state.uid,item:item,upic:this.props.upic,uname:this.props.uname})}>
                                        <ImageBackground
                                            resizeMode="cover"
                                            style={styles.backgroundimg}
                                            source={{ uri: item.imgurl[0]}}
                                            alt='发布图片'>
                                            <View style={styles.contentbox}>
                                                {
                                                    item.content ?
                                                <Text style={styles.innercontent}>{item.content ? (item.content > 15 ? item.content.substr(0, 15) + " . . . " :item.content ) : ""}</Text>
                                              : <Text style={styles.innercontent}>还没有内容呢~</Text>
                                            }
                                                {/* <Text style={styles.innercontent}>{item.content ? (item.content > 15 ? item.content.substr(0, 15) + " . . . " :item.content ) : ""}</Text> */}

                                            </View>
                                        </ImageBackground>
                                    </TouchableOpacity>
                                </View>
                            }}
                        />:
                        <View style={{
                            alignItems:"center",
                            marginTop:0.35*width
                            // backgroundColor:"red"
                        }}><Text style={{
                            fontSize:0.04*width,
                            color:"#ccc"
                        }}>还没有任何内容~~</Text></View>

    }
                    </WingBlank>
                    <WingBlank style={styles.inner}>
                        {this.state.llist[0]?
                        <FlatList
                            refreshing = {this.state.refreshing}
                            onRefresh={this.like}
                            extraData={this.state}
                            data={this.state.llist}
                            horizontal={false}
                            numColumns={3}
                            // initialNumToRender={3}
                            pagingEnabled={true}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => {
                                return <View style={styles.innerblock}>
                                    <TouchableOpacity onPress={() => Actions.tdetail({uid:item.uid,item:item})}>
                                        <ImageBackground
                                            resizeMode="cover"
                                            style={styles.backgroundimg}
                                            source={{ uri:  item.imgurl[0] }}
                                            alt='发布图片'>
                                            <View style={styles.contentbox}>
                                                <Text style={styles.innercontent}>{item.content? (item.content > 15 ? item.content.substr(0, 15) + " . . . " : item.content) : ""}</Text>
                                                {/* <Text style={styles.innercontent}>end</Text> */}
                                                {/* <Text style={styles.innercontent}>{item.content ? (item.content.length > 15 ? item.content.substr(0, 15) + " . . . " : item.content) : ""}</Text> */}
                                            </View>
                                        </ImageBackground>
                                    </TouchableOpacity>
                                </View>
                            }}
                        />:
                        <View style={{
                            alignItems:"center",
                            marginTop:0.35*width
                            // backgroundColor:"red"
                        }}><Text style={{
                            fontSize:0.04*width,
                            color:"#ccc"
                        }}>还没有任何内容~~</Text></View>
    }
                    </WingBlank>
                </Tabs>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    navbar: {
        width: width,
        height: 65 * s,
        backgroundColor: '#FFBF2D',
        flexDirection: 'row',
        paddingLeft: 0.03 * width,
        paddingTop: '1%',
        paddingRight: 0.03 * width,
        justifyContent: "center"
    },
    icon: {
        width: 0.08 * width,
        color: '#fff',
        fontSize: 30,
    },
    title: {
        marginLeft: 'auto',
        marginRight: "auto",
        textAlign: 'center',
        fontSize: 20,
        color: '#fff',
        letterSpacing: 3
    },
    titlebox: {
        height: 0.15 * height,
        // backgroundColor:'#FFBF2D',
        // backgroundColor:'#FFF',
        flexDirection: 'row',
        backgroundColor: 'rgba(255,191,45,0.7)',
        alignItems: 'center',
        paddingLeft: 0.05 * width
    },
    upic: {
        width: 0.1 * height,
        height: 0.1 * height,
        borderRadius: 100,
        marginRight: 0.03 * width
    },
    uname: {
        fontSize: 0.04 * width,
        color: '#333',
        marginRight: 0.2 * width
    },
    numbox: {
        // backgroundColor:'#ccc',
        width: 0.3 * width,
        height: 0.08 * height,
        justifyContent: 'space-around'
    },
    num: {
        // backgroundColor:'#ccc',
        // backgroundColor:'#000',
        textAlignVertical: 'center',
        height: 0.025 * height,
        color: '#000',
        fontSize: 0.03 * width
    },
    titlebtn: {
        flexDirection: 'row',
        width: 0.5 * width,
        marginTop: 0.01 * height,
        height: 0.05 * height,
        marginLeft: 'auto',
        marginRight: 'auto',
        // backgroundColor:'#aaddcc',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    inner: {
        // backgroundColor:'#ccc',
        marginTop: 0.005 * height,
        height: 0.67 * height,
        // alignItems: 'center'
    },
    innerblock: {
        width: 0.29 * width,
        height: 0.2 * height,
        backgroundColor: '#fff',
        marginRight: 0.01 * width,
        marginLeft: 0.01 * width,
        marginTop: 0.01 * width,
    },
    backgroundimg: {
        width: '100%',
        height: '100%',
        transform: [{ scale: 0.97 }],
        justifyContent: 'flex-end'
    },
    contentbox: {
        maxHeight: 0.06 * height,
        // backgroundColor:'#000',
        overflow: 'hidden',
        backgroundColor: 'rgba(0,0,0,0.3)',
        // backgroundColor:'rgba(255,255,255,0.5)',
        padding: 0.01 * width

    },
    innercontent: {
        color: '#fff',
        fontSize: 0.032 * width,
        lineHeight: 0.025 * height
    }
})
