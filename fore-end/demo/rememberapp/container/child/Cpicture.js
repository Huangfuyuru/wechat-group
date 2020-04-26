import React, { Component } from 'react'
import { 
    Text, 
    View,
    StyleSheet,
    Dimensions,
    FlatList,
    ImageBackground,
    Image,
    RefreshControl,
    Alert,
    ToastAndroid,
    TouchableOpacity
} from 'react-native'
import Button from 'react-native-button'
import { WingBlank } from '@ant-design/react-native'
import Icon1 from 'react-native-vector-icons/Feather'
import Icon2 from 'react-native-vector-icons/Ionicons'
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons'
import { Actions } from 'react-native-router-flux';
import {myFetch} from '../../src/utils'
import moment from 'moment'
const {width,scale,height} = Dimensions.get('window');
const s = width / 640;
const image1 = 'http://img.pconline.com.cn/images/upload/upc/tx/photoblog/1607/21/c3/24460421_1469066584849_mthumb.jpg';
const image2 = 'http://img.pconline.com.cn/images/upload/upc/tx/photoblog/1607/21/c4/24460471_1469066604292_mthumb.jpg';
const image3 = 'http://tc.sinaimg.cn/maxwidth.2048/tc.service.weibo.com/p/image_96weixin_com/9a6afdf6ff7c953f04675270477405b0.jpg'
export default class Cdairy extends Component {
    constructor(){
        super();
        this.state={
            cid:'',
            childPhotoListid:'',
            lists:[],
            code:""
        }
    }
    componentDidMount(){
        this.setState({
            cid:this.props.cid
        })
        myFetch.get('/child/cpictures',{
            childsid:this.props.cid
        }).then(res=>{
            // console.log('pic'+res)
            if(res){
                for(var i in res){
                    // console.log('you')
                    if(res[i].background ==='#'){
                        res[i].background = image3
                    }
                    this.setState({
                        lists:res
                    })
                }
            }else{
                this.setState({
                    lists:res
                })
            }
        })
    }
    componentDidUpdate(){
        myFetch.get('/child/cpictures',{
            childsid:this.state.cid
        }).then(res=>{
            if(res){
                for(var i in res){
                    if(res[i].background ==='#'){
                        res[i].background = image3
                    }
                    this.setState({
                        lists:res
                    })
                }
            }else{
                this.setState({
                    lists:res
                })
            }
        })
    }
    // componentWillReceiveProps(nextProps){
    //     console.log(nextProps.code)
    //     this.setState({
    //         code:nextProps.code
    //     })
    // }
    rmCpicture=(e)=>{
        Alert.alert('提示', '确定要删除吗？',
            [
                { text: "确定", onPress: ()=>{
                    ToastAndroid.showWithGravityAndOffset(
                        '删除成功！',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                    25,-100)
                } },
                { text: "返回", onPress: this.opntion2Selected },
            ]
        )
        // console.log(e.target)
        // e.target.parentNode.style.display = 'none';
        // var  cpictureagain = document.getElementById('cpictureagain');
        // cpictureagain.style.display = 'block';
        // fetch(`http://localhost:3001/child/cpictures/crpictures?childsid=${this.state.cid}&childPhotoListid=${this.state.childPhotoListid}`)
        // .then((res)=>res.json())
        // .then((res)=>{
        //     console.log(res)
        //     this.setState({
        //         lists:res.data,
        //         code:res.msg
        //     }); 
        // })
    }
    render() {
        const lists = this.state.lists;
        return (
            <View>
                <View style={styles.navbar}>
                    <Icon1 
                        style={styles.icon}
                        name='chevron-left'
                        onPress={()=>Actions.pop()}
                    />
                    <Text style={styles.title}>云相册</Text>
                </View>
                <WingBlank style={{
                    marginBottom:10
                }}>
                    {
                    this.state.lists
                    ?<FlatList 
                        showsVerticalScrollIndicator={false}
                        ListFooterComponent={
                            <View style={{
                                width:'100%',
                                marginTop:30
                            }}>
                                <Text style={{
                                    width:'104%',
                                    marginLeft: '-2%',
                                    backgroundColor: '#ccc',
                                    height: 0.8,
                                }}></Text>
                                <Text style={{
                                    marginTop:-10,
                                    width:200*s,
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
                        data={lists}
                        numColumns={1}
                        renderItem={({item})=>(
                            <View key={item.id} style={styles.cpicture_block}>
                                <View style={styles.cpicturepicbox}>
                                    <TouchableOpacity onPress={()=>Actions.cspictures({pid:item.id})}>
                                        <ImageBackground
                                            style={styles.cpicturepic}
                                            resizeMode="cover"
                                            source={{uri:`${item.background}`}}
                                        >
                                            <Text
                                                style={styles.cpicturetime}
                                            >{ moment(item.setdate).format("YYYY年MM月DD日")}</Text>
                                            
                                        </ImageBackground>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.cpictureline}>
                                    <Text
                                        style={styles.cpicturename}
                                    >{item.name}</Text>
                                    <TouchableOpacity onPress={this.rmCpicture}>
                                        <Icon2
                                            style={styles.cpicturedelete}
                                            name='ios-trash'
                                            size={30}
                                            color='#333'
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />  
                    :<View style={styles.scrollView}>
                        <Text style={styles.nulltext}>哎呀~ 你还没有一个相册呢</Text>
                        <View style={styles.nullpictures}>
                            <View style={styles.nullpicturepicbox}>
                                <ImageBackground
                                    style={styles.nullpicturepic}
                                    resizeMode="cover"
                                    source={{uri:`${image3}`}}
                                >
                                    <Text
                                        style={styles.nullpicturetime}
                                    >点击最下方创建你的相册吧</Text>
                                    
                                </ImageBackground>
                            </View>
                            <View style={styles.cpictureline}>
                                <Text
                                    style={styles.cpicturename}
                                >这是一本假相册</Text>
                                <TouchableOpacity>
                                    <Icon3
                                        style={styles.cpicturedelete}
                                        name='arrow-bottom-left'
                                        size={30}
                                        color='#333'
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                }
                    
                </WingBlank>
                <View
                    style={{
                        width:width,
                        height:50,
                        justifyContent:'center',
                        // backgroundColor:'#000',
                        paddingTop:20
                    }}
                >
                    <Text style={{
                        width:0.95*width,
                        marginLeft:'auto',
                        marginRight:'auto',
                        backgroundColor: '#FFBF2D',
                        // backgroundColor: '#bdbbb8',
                        height: 2*s,
                    }}></Text>
                    <Icon2
                        onPress={()=>{Actions.ccpictures({cid:this.state.cid})}} 
                        style={{
                            marginTop:-23,
                            width:80*s,
                            textAlign:'center',
                            marginLeft:'auto',
                            marginRight:'auto',
                            backgroundColor:'#fff',
                            color:'#FFBF2D'
                        }}
                        size={45}
                        name='md-add-circle-outline'
                    />
                </View>
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
        paddingLeft:0.02*width,
        paddingTop:'1%',
        paddingRight:0.1*width,
        justifyContent:"center"
    },
    icon:{
        width:0.08*width,
        color:'#fff',
        fontSize:30,
    },
    title:{
        marginLeft:'auto',
        marginRight:"auto",
        textAlign:'center',
        fontSize:20,
        color:'#fff',
        letterSpacing:3
    },
    scrollView: {
        marginTop:0.03*height,
        // backgroundColor: '#000',
        backgroundColor: '#fff',
        paddingLeft:10,
        paddingRight:10,
        height:0.79*height,
        // height:900*s,
    },
    cpicture_block:{
        marginTop:0.02*height,
        alignItems:'center',
        // backgroundColor:'#000',
        height:0.365*height,
        borderRadius:5,
        borderStyle:'solid',
        borderWidth:1.5,
        borderColor:'#ddd',
        // borderColor:'#bdbbb8',
    },
    cpicturepicbox:{
        height: 0.3*height, 
        width: 0.9*width,
        justifyContent:'center',
        alignItems:'center'
    },
    cpicturepic:{ 
        height: 0.3*height, 
        width: 0.9*width,
        alignItems:'center',
        justifyContent:'center',
        transform: [{scale:0.9}]
    },
    cpicturetime:{
        fontSize:30*s,
        color:'#333',
        height: 0.05*height, 
        width: 0.45*width,
        transform: [{scale:0.9}],
        textAlign:'center',
        backgroundColor:'rgba(255,255,255,0.3)',
        textAlignVertical:'center'
    },
    cpictureline:{
        width:'100%',
        height:0.065*height,
        // backgroundColor:'#ccc',
        paddingLeft:20*s,
        paddingRight:20*s,
        borderColor:'#bdbbb8',
        borderStyle:'solid',
        borderTopWidth:0.5,
        margin:0,
        flexDirection: 'row',
        justifyContent:'center',

    },
    cpicturename:{
        fontSize:25*s,
        color:'#333',
        width:0.75*width,
        textAlign:'left',
        // backgroundColor:'#000',
        textAlignVertical:'center'
    },
    cpicturedelete:{
        width:0.05*width,
        height:70*s,
        textAlign:'center',
        textAlignVertical:'center'
    },
    nulltext:{
        width:0.55*width,
        height:0.05*height,
        fontSize:23*s,
        letterSpacing:1,
        color:'#333',
        backgroundColor:'rgba(221, 221, 221,0.2)',
        marginLeft:'auto',
        marginRight:'auto',
        textAlign:'center',
        textAlignVertical:'center',
    },
    nullpictures:{
        marginTop:0.01*height,
        alignItems:'center',
        // backgroundColor:'#000',
        height:0.665*height,
        borderRadius:5,
        borderStyle:'solid',
        borderWidth:1.5,
        borderColor:'#ddd',
        // borderColor:'#bdbbb8',
    },
    nullpicturepicbox:{
        // backgroundColor:'#ccc',
        height: 0.6*height, 
        width: 0.9*width,
        justifyContent:'center',
        alignItems:'center'
    },
    nullpicturepic:{ 
        height: 0.6*height, 
        width: 0.9*width,
        alignItems:'center',
        justifyContent:'center',
        transform: [{scale:0.9}]
    },
    nullpicturetime:{
        fontSize:30*s,
        color:'#333',
        height: 0.05*height, 
        width: 0.6*width,
        transform: [{scale:0.9}],
        textAlign:'center',
        marginBottom:0.15*height,
        backgroundColor:'rgba(255,255,255,0.3)',
        textAlignVertical:'center'
    },
})
