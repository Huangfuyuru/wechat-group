import React, { Component } from 'react'
import { 
    Text, 
    View,
    StyleSheet,
    Dimensions,
    FlatList,
    Image,
    Alert,
    ScrollView,
    ImageBackground,
    TouchableOpacity,
    TextInput,
    ToastAndroid
} from 'react-native'
import moment from 'moment'
import { Actions } from 'react-native-router-flux';
import { WingBlank } from '@ant-design/react-native';
import {myFetch} from '../../src/utils'
import Icon1 from 'react-native-vector-icons/Feather'
import Icon2 from 'react-native-vector-icons/Entypo'
import Icon3 from 'react-native-vector-icons/Ionicons'
import Icon4 from 'react-native-vector-icons/FontAwesome'
import Icon5 from 'react-native-vector-icons/Fontisto'
const {width,scale,height} = Dimensions.get('window');
const s = width / 640;
const image = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587984040970&di=7e865af6555429dd11f70d1928f46878&imgtype=0&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D2381951604%2C3164827774%26fm%3D214%26gp%3D0.jpg'
export default class Cdairy extends Component {
    constructor(){
        super();
        this.state={
            placeholder:'快来添加一条评论吧',
            lists:[],
            refreshing:false,
            article_id:'',
            tag:true,
            answer_id:'',
            host_id:'',
            user_id:'',
            content:'',
            page:'',
            discuss:false,
            enableScrollViewScroll: true,
        }
    }
    componentDidMount(){
        console.log('评论')
        this.setState({
            article_id:this.props.article_id,
            host_id:this.props.host_id,
            user_id:this.props.user_id,
            page:this.props.page
        })
        // console.log(this.props.article_id)
        myFetch.get('/share/comment',{
            article_id:this.props.article_id
        }).then(res=>{
            console.log(res)
            var rootlist = [];
            var leaflist = [];
            for(var i in res){
                res[i].answer_id ? leaflist.push(res[i]):rootlist.push(res[i]);
            }
            for(var i in rootlist){
                (function (j){
                    console.log(rootlist[j])
                    rootlist[j]['childlist']=[]
                    for(var m in leaflist){
                        if(leaflist[m].answer_id === rootlist[j].id){
                            rootlist[j]['childlist'].push(leaflist[m])
                        }
                    }
                })(i)
            }
            // console.log(rootlist[1])
            this.setState({
                lists:rootlist
            })
        })
    }
    refreshlist = ()=>{
        myFetch.get('/share/comment',{
            article_id:this.props.article_id
        }).then(res=>{
            // console.log(res)
            var rootlist = [];
            var leaflist = [];
            for(var i in res){
                res[i].answer_id ? leaflist.push(res[i]):rootlist.push(res[i]);
            }
            for(var i in rootlist){
                (function (j){
                    console.log(rootlist[j])
                    rootlist[j]['childlist']=[]
                    for(var m in leaflist){
                        if(leaflist[m].answer_id === rootlist[j].id){
                            rootlist[j]['childlist'].push(leaflist[m])
                        }
                    }
                })(i)
            }
            // console.log(rootlist[1])
            this.setState({
                lists:rootlist,
                refreshing:false
            })
        })
    }
    discuss = ()=>{
        var content = this.state.content;
        if(this.state.content){
            myFetch.post('/share/comment/acomment',{
                tag:this.state.tag,
                answer_id:this.state.answer_id,
                article_id:this.state.article_id,
                host_id:this.state.host_id,
                user_id:this.state.user_id,
                content:content
            }).then(res=>{
                // console.log(res)
                this.setState({
                    placeholder:'快来添加一条评论吧',
                    content:'',
                    tag:true,
                    answer_id:0,
                    discuss:true
                })
                this.refreshlist()     
            })
        }else{
            ToastAndroid.showWithGravityAndOffset(
            '评论内容不能为空！',
            ToastAndroid.LONG,
            ToastAndroid.TOP,
            0,300)
        }
    }
    handleScrollEnd = event => {
        const contentHeight = event.nativeEvent.contentSize.height;
        const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
        const scrollOffset = event.nativeEvent.contentOffset.y;
    
        // 是否滑动到底部
        const isEndReached = scrollOffset + scrollViewHeight >= contentHeight;
        // 内容高度是否大于列表高度
        const isContentFillPage = contentHeight >= scrollViewHeight;
    
        const { reqSsqData, reqJpqData, reqWbqData, reqInData } = this.state;
    
        if (isContentFillPage && isEndReached) {
          // 已滑动scrollview底部，触发加载分页请求
        }
      };
    render() {
        return (
            <View>
                <View style={styles.navbar}>
                    <TouchableOpacity onPress={()=>Actions.pop(this.props.callBack(this.state.discuss))}>
                        <Icon1 style={styles.icon} name='chevron-left'/>
                    </TouchableOpacity>
                    <Text style={styles.title}>评论</Text>
                    <Icon3 style={styles.icon}/>
                </View>
                <WingBlank style={styles.wingblank}>
                    <View style={styles.footerline}>
                        <TextInput
                            value={this.state.content}
                            autoFocus
                            style={styles.textinput}
                            onChangeText={text=>{this.setState({content:text})}}
                            placeholder={this.state.placeholder}
                            multiline={false}
                        />
                        <TouchableOpacity>
                            <Icon5 style={styles.iconbtn} name='smiley'/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{
                            var tag=true;
                            if(this.state.placeholder === '快来添加一条评论吧'){
                                this.setState({
                                    answer_id:0,
                                    tag:true
                                })
                                this.discuss()
                            }else{
                                this.setState({
                                    answer_id:this.state.answer_id,
                                    tag:false
                                })
                                tag = false;
                                this.discuss()
                            }
                        }}>
                            <Icon4 style={styles.iconbtn} name='send-o'/>
                        </TouchableOpacity>
                    </View>
                    {
                        this.state.lists[0]
                        ?<View
                            style={styles.scrollbox} 
                            onStartShouldSetResponderCapture={() => {
                                this.setState({ enableScrollViewScroll: true });
                            }} >
                            <ScrollView 
                                // refreshing = {this.state.refreshing}
                                // onRefresh={this.refreshlist}
                                // onScroll={event => this.onScroll(event)}
                                // scrollEventThrottle={1}
                                // onMomentumScrollEnd={this.handleScrollEnd}
                                // onRefresh={this.refreshlist}

                                showsVerticalScrollIndicator={false}
                                scrollEnabled={this.state.enableScrollViewScroll}
                                ref={myScroll => (this._myScroll = myScroll)}
                                style={styles.list}
                            >
                                {
                                    this.state.lists&&this.state.lists.map((item,idx)=>{
                                        return <View style={styles.linebox}>
                                        <View style={styles.linetitle}>
                                            <TouchableOpacity onPress={()=>{}}>
                                                <Image 
                                                    style={styles.innertitlepic}
                                                    source={imgurl?{uri:`${item.imgurl}`}:{uri:`${image}`}}
                                                />
                                            </TouchableOpacity>
                                            <Text style={styles.linename}>{item.name}</Text>
                                            {
                                                item.host_id === item.user_id
                                                ?<Text style={styles.linetag}>作者</Text>
                                                :null
                                            }
                                            <Text style={styles.linetime}>{
                                            moment(item.setdate).format('YYYY-MM-DD   HH:mm')===moment(new Date()).format('YYYY-MM-DD   HH:mm')
                                            ?'刚刚'
                                            :moment(item.setdate).format('YYYY-MM-DD   HH:mm')
                                            }</Text>
                                        </View>
                                        <TouchableOpacity style={styles.linecontentbox} onPress={()=>this.setState({
                                            placeholder:`回复@${item.name}`,
                                            answer_id:item.id,
                                            })}>
                                            <Text style={styles.linecontent}>{item.content}</Text>
                                        </TouchableOpacity>
                                        <View>
                                            {
                                                item.childlist[0]
                                                ?<View 
                                                    style={styles.childbox}
                                                    onStartShouldSetResponderCapture={() => {
                                                        this.setState({ enableScrollViewScroll: false });
                                                        if (this._myScroll.contentOffset === 0
                                                            && this.state.enableScrollViewScroll === false) {
                                                            this.setState({ enableScrollViewScroll: true });
                                                        }
                                                    }}
                                                >
                                                    <FlatList
                                                        extraData={this.state}
                                                        data={item.childlist}
                                                        horizontal={false}
                                                        showsVerticalScrollIndicator={true}
                                                        renderItem={({item})=>(
                                                            <View style={styles.childlistbox}>
                                                                <View style={styles.childlisttitle}>
                                                                    <Image 
                                                                        style={styles.childtitlepic}
                                                                        source={imgurl?{uri:`${item.imgurl}`}:{uri:`${image}`}}
                                                                    />
                                                                    <Text style={styles.childname}>
                                                                        {item.name ? (item.name.length > 4 ? item.name.substr(0, 2) + " . . . " : item.name) : "忘取名了"}
                                                                    </Text>
                                                                    {
                                                                        item.host_id === item.user_id
                                                                        ?<Text style={styles.childtag}>作者</Text>
                                                                        :null
                                                                    }
                                                                    <Text style={styles.childfix}>回复</Text>
                                                                    <Text style={styles.childname}>
                                                                        {item.name ? (item.name.length > 4 ? item.name.substr(0, 2) + " . . . " : item.name) : "没名字"}
                                                                    </Text>
                                                                    {/* {
                                                                        item.host_id === this.state.shortid
                                                                        ?<Text style={styles.childtag}>作者</Text>
                                                                        :null
                                                                    } */}
                                                                    <Text style={styles.childtime}>{
                                                                    moment(item.setdate).format('YYYY-MM-DD')===moment(new Date()).format('YYYY-MM-DD   HH:mm')
                                                                    ?'刚刚'
                                                                    :moment(item.setdate).format('YYYY-MM-DD')
                                                                    }</Text>
                                                                </View>
                                                                <TouchableOpacity style={styles.childcontentbox} onPress={()=>this.setState({
                                                                    placeholder:`回复@${item.name}`,
                                                                    answer_id:item.answer_id,
                                                                    })}>
                                                                    <Text style={styles.linecontent}>{item.content}</Text>
                                                                </TouchableOpacity>
                                                            </View>
                                                        
                                                        )}
                                                    />
                                                </View>
                                            :null
                                            }
                                        </View>
                                    </View>
                                    })
                                }
                            </ScrollView>
                        </View>
                        :<View style={styles.list}>
                            <View style={styles.nullpics}>
                                <Image 
                                    style={{
                                        width:0.3*width,
                                        height:0.3*width,
                                        // backgroundColor:'#000'
                                    }}
                                    resizeMode="contain"
                                    source={require('../../assets/shafa.png')}
                                />                               
                                <Text style={styles.nulltext}>一条评论都没有呢，快来抢占沙发吧</Text>                          
                            </View>
                        </View>
                    }                  
                </WingBlank>
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
    icon:{
        width:0.08*width,
        color:'#fff',
        fontSize:30,
        // backgroundColor:'#ccc'
    },
    title:{
        marginLeft:'auto',
        marginRight:"auto",
        textAlign:'center',
        fontSize:20,
        color:'#fff',
        letterSpacing:3
    },
    wingblank:{
        marginTop:0.015*height,
        height:0.86*height,
        alignItems:'center',
        // backgroundColor:'#000'
    },
    scrollbox:{
        width:0.93*width,
        paddingTop:0.025*height,
        // height:0.8*height,
        // backgroundColor:'#ccc',
        alignItems: 'center',
        height: 0.81*height,
    },
    list:{
        width:0.88*width,
        marginLeft:'auto',
        marginRight:'auto'
    },
    linebox:{
        // backgroundColor:'#000',
        // backgroundColor:"#ccc",
        marginBottom:0.01*height
    },
    linetitle:{
        // backgroundColor:'#ddd',
        flexDirection:'row',
        alignItems:'center',
        width:0.8*width
    },
    innertitlepic:{
        width:0.07*height,
        height:0.07*height,
        borderRadius:100,
    },
    timebox:{
        justifyContent:'center'
    },
    linename:{
        fontSize:23*s,
        marginLeft:0.02*width,
        // backgroundColor:"#ccc",
        textAlignVertical:'center'
    },
    linetag:{
        backgroundColor:'#FFBF2D',
        width:0.08*width,
        marginLeft:0.02*width,
        color:'#fff',
        textAlign:'center',
        textAlignVertical:'center',
        height:0.025*height,
    },
    linetime:{
        width:0.25*width,
        fontSize:18*s,
        textAlign:'right',
        marginLeft:0.02*width,
        color:'#999',
        // backgroundColor:"#000",
        textAlignVertical:'center'
    },
    childbox:{
        width:0.76*width,
        marginTop:0.02*height,
        marginLeft:0.07*height,
        // backgroundColor:"#000",
        backgroundColor:'rgba(220,220,220,0.2)',
        maxHeight:0.3*height,
        borderRadius:5
    },
    childlistbox:{
        width:0.75*width,
        paddingLeft:0.008*width,
        paddingTop:0.008*width,
        // backgroundColor:'#ccc',
        marginBottom:0.005*height,
    },
    childlisttitle:{
        flexDirection:'row',
        alignItems:'center'
    },
    childtitlepic:{
        width:0.05*height,
        height:0.05*height,
        borderRadius:100,
    },
    childname:{
        fontSize:21*s,
        marginLeft:0.01*width,
        // backgroundColor:"#ccc",
        textAlignVertical:'center'
    },
    childfix:{
        color:'#555',
        width:0.065*width,
        marginLeft:0.01*width,
        textAlign:'center',
        fontSize:20*s,
        // backgroundColor:'#ccc'
    },
    childtag:{
        backgroundColor:'#FFBF2D',
        width:0.065*width,
        marginLeft:0.015*width,
        // marginTop:0.01*height,
        color:'#fff',
        fontSize:15*s,
        textAlign:'center',
        textAlignVertical:'center',
        height:0.02*height,
    },
    childtime:{
        width:0.13*width,
        fontSize:16*s,
        // textAlign:'right',
        color:'#999',
        marginLeft:0.015*width,
        // backgroundColor:"#ccc",
        textAlignVertical:'center'
    },
    linecontentbox:{
        width:0.75*width,
        // backgroundColor:'#ddd',
        marginTop:-0.015*height,
        marginLeft:0.07*height+0.02*width,
    },
    linecontent:{
        lineHeight:0.03*height,
        fontSize:22*s,
        color:'#333',
        // backgroundColor:'#ddd',
    },
    childcontentbox:{
        // width:0.75*width,
        // backgroundColor:'#ddd',
        marginTop:-0.015*height,
        marginLeft:0.05*height+0.01*width,
    },
    nullpics:{
        width:0.9*width,
        height:0.5*height,
        // backgroundColor:'#ccddff',
        marginTop:0.05*height,
        justifyContent:'center',
        alignItems:'center'
    },
    nulltext:{
        width:0.8*width,
        height:0.1*height,
        textAlign:'center',
        textAlignVertical:'center',
        fontSize:23*s,
        color:'#bdbbb8',
        // backgroundColor:'#ccc'
    },
    footerline:{
        flexDirection:'row',
        height:0.05*height,
        // backgroundColor:'#ccc',
        justifyContent:'center',
        alignItems:'center'
    },
    textinput:{
        backgroundColor:'rgba(255,255,255,0.3)',
        borderColor:'rgba(204,204,204,0.8)',
        borderWidth:1,
        width:0.72*width,
        height:0.05*height,
        fontSize:23*s,
        color:'#333',
        textAlignVertical: 'top',
        paddingLeft:0.03*width,
        marginRight:0.02*width
    },
    iconbtn:{
        width:0.06*width,
        // backgroundColor:'#ddccff',
        margin:0.015*width,
        fontSize:35*s,
        color:'#FFBF2D'
    }
})
