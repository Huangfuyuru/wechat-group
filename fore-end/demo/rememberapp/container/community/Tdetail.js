import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    StyleSheet,
    TextInput,
    ScrollView,
    Dimensions,
    FlatList,
    Modal
} from 'react-native'
import Swiper from 'react-native-swiper'
import {myFetch} from '../../src/utils'
import Icon1 from 'react-native-vector-icons/Feather'
import Icon2 from 'react-native-vector-icons/Ionicons'
import Icon3 from 'react-native-vector-icons/Entypo'
import Icon4 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon5 from 'react-native-vector-icons/FontAwesome'
import Icon6 from 'react-native-vector-icons/Fontisto'
import { WingBlank } from '@ant-design/react-native'
import moment from 'moment'
import {
    Actions
} from 'react-native-router-flux'
const { width, scale, height } = Dimensions.get('window');
const s = width / 640;
const h = height / 1012;
const image = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587985300669&di=0dd8b86dafb708019e01377b9d394503&imgtype=0&src=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D1229184673%2C3594306478%26fm%3D214%26gp%3D0.jpg'
export default class Tdetail extends Component {
    constructor() {
        super();
        this.state = {
            imgurl: [],
            content: '',
            item: "",
            current:"",
            list: [],
            visible:false,
            list1:[],
            upic:"",
            uname:""
        }
    }
    componentDidMount() {
        if(this.props.upic){
            this.setState({
                upic:this.props.upic,
                uname:this.props.uname
            }) 
        }
        else{
            myFetch.post('/my/', {
                uid:this.props.item.uid,
            }).then(
                res => {
                    this.setState({
                        uname:res.name,
                        upic:res.imgurl
                    })
                }
            )
        }
        this.setState({
            imgurl: this.props.item.imgurl,
            content: this.props.item.content,
            item: this.props.item,
        })
        myFetch.get('/share/comment',{
            article_id:this.props.item.id
        }).then(res=>{
            if(res){
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
            this.setState({
                list:rootlist,
                list1:res
            })
        }
        else{
            this.setState({
                list1:[]
            })
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
        const item = this.state.item
        const renderPagination = (index, total, context) => {
            return (
                <View style={styles.paginationStyle}>
                    <Text style={styles.text}>
                        <Text style={styles.paginationText}>{index + 1}</Text>/{total}
                    </Text>
                </View>
            );
        }
        return (
            <View>
                <View style={styles.navbar}>
                    <TouchableOpacity onPress={() => Actions.pop()}>
                        <Icon1 style={styles.icon} name='chevron-left' />
                    </TouchableOpacity>
                    <Text style={styles.title}></Text>
                    <TouchableOpacity>
                        <Icon3 style={styles.icon} name='' />
                    </TouchableOpacity>
                </View>
                <WingBlank style={styles.inner}>
                    <View style={styles.pic}>
                        <Swiper
                            renderPagination={renderPagination}
                            loop={false}
                        >
                            {
                                this.state.imgurl && this.state.imgurl.map((img, idx) => (
                                    <TouchableOpacity onPress={()=>this.enlarge(this.state.imgurl)}>
                                    <Image
                                        style={styles.img}
                                        resizeMode="cover"
                                        source={{ uri: img }}
                                    />
                                    </TouchableOpacity>
                                ))
                            }
                        </Swiper>
                    </View>
                    <View style={styles.innerfooter}>
                        <Image
                            style={styles.upic}
                            source={{ uri: `${this.state.upic}` }}
                        />
                        <Text style={styles.uname}>{this.state.uname}</Text>
                        <View style={styles.footerbox}>
                            <TouchableOpacity>
                                <Icon3 style={styles.footericon} color='#666' name='heart-outlined' />
                            </TouchableOpacity>
                            <Text style={styles.zannum}>{item.zannum < 10000 ? item.zannum : (item.zannum / 10000).toFixed(1) + '万'}</Text>
                        </View>
                        <View style={styles.footerbox}>
                            <TouchableOpacity>
                                <Icon4 style={styles.footericon} color='#666' name='flower-tulip-outline' />
                            </TouchableOpacity>
                            <Text style={styles.zannum}>{item.num < 10000 ? item.num : (item.num / 10000).toFixed(1) + '万'}</Text>
                        </View>
                        <View style={styles.footerbox}>
                            <TouchableOpacity>
                                <Icon4 style={styles.footericon} color='#666' name='share-outline' />
                            </TouchableOpacity>
                            <Text style={styles.zannum}>分享</Text>
                        </View>
                    </View>
                    {
                        this.state.content.length > 0
                            ? <TouchableOpacity onPress={()=>this.enlarge(this.state.content)}>
                                <Text style={styles.content}>&#8195;{this.state.content ? (this.state.content.length > 55 ? this.state.content.substr(0, 55) + " . . . " : this.state.content) : ""}</Text>
                            </TouchableOpacity>
                            : <TouchableOpacity onPress={()=>this.enlarge(this.state.content)}>
                            <Text style={styles.content}>&#8195;还没有内容呢~~</Text>
                        </TouchableOpacity>
                    }
                    <Text style={{
                         width: 0.9 * width,
                         fontSize:0.038*width,
                    }}>评论:({this.state.list1.length})</Text>
                    {
                        this.state.list[0]
                            ?<View
                            style={styles.scrollbox} 
                            >
                            <ScrollView 
                                style={styles.list}
                            >
                                {
                                    this.state.list&&this.state.list.map((item,idx)=>{
                                        return <View style={styles.linebox}>
                                        <View style={styles.linetitle}>
                                            <TouchableOpacity onPress={()=>{}}>
                                                <Image 
                                                    style={styles.innertitlepic}
                                                    source={{uri:`${image}`}}
                                                />
                                            </TouchableOpacity>
                                            <Text style={styles.linename}>我是名字1</Text>
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
                                                                        source={{uri:`${image}`}}
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
                            : <View style={styles.list}>
                                <View style={styles.nullpics}>
                                    <Image
                                        style={{
                                            width: 0.3 * width,
                                            height: 0.3 * width,
                                            marginLeft:'auto',
                                            marginRight:'auto'
                                            // backgroundColor:'#000'
                                        }}
                                        resizeMode="contain"
                                        source={require('../../assets/shafa.png')}
                                    />
                                    <Text style={styles.nulltext}>一条评论都没有呢</Text>
                                </View>
                            </View>
                    }
                </WingBlank >
                <Modal
                    transparent
                    visible={this.state.visible}
                    // visible={true}
                >
                    <WingBlank style={styles.modalwingblank}>
                        <View style={styles.modalinner}>
                            {
                                typeof(this.state.current) === 'string'
                                ?<View style={styles.contentbox}>
                                    <ScrollView showsVerticalScrollIndicator={false}>
                                        <Text selectable = {true} style={styles.content1}>{this.state.current}</Text>
                                    </ScrollView>
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
    navbar: {
        width: width,
        height: 65 * s,
        backgroundColor: '#FFBF2D',
        // backgroundColor:'#fff',
        flexDirection: 'row',
        paddingLeft: 0.03 * width,
        paddingTop: '1%',
        paddingRight: 0.03 * width,
        justifyContent: "center"
    },
    nulltext:{
        width:0.88*width,
        height:0.1*height,
        textAlign:'center',
        textAlignVertical:'center',
        fontSize:23*s,
        color:'#bdbbb8',
        // backgroundColor:'red'
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
        // color:'#fff',
        color: '#FFBF2D',
        letterSpacing: 3
    },
    inner: {
        // backgroundColor: '#ccc',
        marginTop: 0.012 * height,
        height: 0.88 * height,
        alignItems: 'center'
    },
    paginationStyle: {
        position: 'absolute',
        bottom: 10,
        right: 10
    },
    pic: {
        height: 0.35 * height,
        width:0.9*width,
        marginBottom:0.02*height
    },
    // piccover: {
    //     height: 0.4 * height,
    //     width:0.9*width
    // },
    img: {
        width:0.9*width,
        height:0.35*height,
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    // imgcover: {
    //     width: 0.9 * width,
    //     height: 0.5 * height,
    //     marginRight: 'auto',
    //     marginLeft: 'auto',
    //     backgroundColor: '#000'
    // },
    content: {
        width: 0.9 * width,
        height: 0.11 * height,
        borderWidth:0.5,
        borderColor:"#ccc",
        fontSize:0.034* width,
        borderRadius:10,
        padding:0.008*height,
        marginBottom:0.02*height,
        letterSpacing:1.5
    },
    innerfooter: {
        width: 0.87 * width,
        height: 0.06 * height,
        // backgroundColor: '#ddd',
        flexDirection: 'row',
        // justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 0.06 * width
    },
    footerbox: {
        // backgroundColor:'#ccc',
        width: 0.13 * width,
        height: 0.06 * height,
        alignItems: 'center',
        justifyContent: 'center'
    },
    footericon: {
        width: 0.13 * width,
        height: 0.04 * height,
        // backgroundColor:'#ccc',
        // textAlignVertical:'bottom',
        // color:'#FFBF2D',
        textAlign: 'center',
        fontSize: 45 * s,
    },
    zannum: {
        // backgroundColor:'#ccc',
        height: 0.02 * height,
        fontSize: 18 * s,
        // color:'#FFBF2D',
        textAlignVertical: 'center'
    },
    upic: {
        width: 0.06 * height,
        height: 0.06 * height,
        borderRadius: 100,
        marginRight: 0.03 * width,
        borderColor:"#ccc",
        borderWidth:1,
    },
    uname: {
        fontSize: 0.035 * width,
        color: '#333',
        // backgroundColor:"red",
        width:0.2*width,
        marginRight: 0.19 * width
    },
    zannum: {
        height: 0.02 * height,
        fontSize: 18 * s,
        textAlignVertical: 'center',
        textAlign: "center"
    },
    scrollbox:{
        width:0.93*width,
        paddingTop:0.025*height,
        // height:0.8*height,
        // backgroundColor:'#ccc',
        alignItems: 'center',
        height: 0.28*height,
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
        width:0.05*height,
        height:0.05*height,
        borderRadius:100,
    },
    linename:{
        fontSize:22*s,
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
        height:0.88*height,
        marginLeft:"auto",
        marginRight:"auto",
        marginTop:0.085*height
        // backgroundColor:"red"
    },
    modalinner:{
        height:0.75*height,
        justifyContent:'center'
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
    },
    content1:{
        // textAlign:'center',
        lineHeight:0.04*height,
        fontSize:23*s,
        // backgroundColor:'#000'

    },
    imgs:{
        width:0.9*width,
        height:0.7*height,
        marginLeft:'auto',
        marginRight:'auto',
        // backgroundColor:'#ccc'
    },
})



