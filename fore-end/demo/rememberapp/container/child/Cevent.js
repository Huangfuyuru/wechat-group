import React, { Component } from 'react'
import { 
    Text, 
    View, 
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    FlatList,
    Image,
    ImageBackground,
    Alert
} from 'react-native'
import moment from 'moment'
import Icon1 from 'react-native-vector-icons/Feather'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon3 from 'react-native-vector-icons/Ionicons'
import {myFetch} from '../../src/utils'
import { Actions } from 'react-native-router-flux';
import { WingBlank } from '@ant-design/react-native'
const {width,scale,height} = Dimensions.get('window');
const s = width / 640;
const image= 'http://hbimg.b0.upaiyun.com/3503b3b19c1bc0928766b62de18a5433dad71cf911089-tluSYK_fw658'
export default class Cdairy extends Component {
    constructor(){
        super();
        this.state={
            cid:'',
            lists:[]
        }
    }
    componentDidMount(){
        this.setState({
            cid:this.props.cid
        })
        myFetch.get('/child/cevents',{
            childsid:this.props.cid,
        }).then(res=>{
            console.log(res)
            if(res){
                this.setState({
                    lists:res
                })
            }else{
                this.setState({
                    lists:[]
                })
            }
        })
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            lists:nextProps.data
        })
    }
    rmCevent = (e)=>{
        var rmname = e.name;
        Alert.alert('提示', '确定要删除吗？',
            [
                { text: "确定", onPress: ()=>{
                    myFetch.get('/child/cevents/crevents',{
                        childsid:this.state.cid,
                        childAdolesceid:e.id,
                    }).then(res=>{
                        // console.log('删除')
                        // console.log(res.data)
                        if(res.data){
                            this.setState({
                                lists:res.data
                            })
                        }else{
                            this.setState({
                                lists:[]
                            })
                        }
                        ToastAndroid.showWithGravityAndOffset(
                            rmname+'，'+res.msg+'！',
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER,
                        25,-100)
                    })
                } },
                { text: "返回", onPress: this.opntion2Selected },
            ]
        )
    }
    render() {
        return (
            <View>
                <View style={styles.navbar}>
                    <Icon1 
                        style={styles.icon}
                        name='chevron-left'
                        onPress={()=>Actions.pop()}
                    />
                    <Text style={styles.title}>大事记</Text>
                    <TouchableOpacity onPress={()=>Actions.ccevents({cid:this.state.cid})}>
                        <Icon3 style={styles.icon}  name='md-add'/>
                    </TouchableOpacity>
                </View>
                <WingBlank style={styles.wingblank}>
                    {
                        this.state.lists[0]
                        ?<FlatList 
                            showsVerticalScrollIndicator={false}
                            data={this.state.lists}
                            numColumns={1}
                            ListFooterComponent={
                                <View style={{
                                    height:0.03*width
                                }}>
                                </View>
                            }
                            renderItem={({item})=>{
                                var bgcolor = '#ddccff'
                                var image = true;
                                if(!/(http|https):\/\/([\w.]+\/?)\S*/.test(item.imgurl[0])){
                                    bgcolor = '#eeffee';
                                    image = false;
                                }
                                return<View key={item.id}
                                style={{
                                    width:0.8*width,
                                    height:0.3*height,
                                    marginTop:0.02*height,
                                    backgroundColor:bgcolor,
                                    marginBottom:0.01*height,
                                    alignItems:'center',
                                    alignContent:'center',
                                    borderRadius:5
                                }}>
                                    <TouchableOpacity onPress={()=>{Actions.csevents({data:item,bg:image})}}>
                                        <ImageBackground
                                            imageStyle={{opacity:0.7}}
                                            style={{
                                                height:'100%',
                                                height:'100%',
                                            }}
                                            resizeMode='cover'
                                            source={{uri:`${item.imgurl[0]}`}}
                                        >
                                            <TouchableOpacity onPress={()=>this.rmCevent(item)}>
                                                <Icon3 color='#333' style={styles.deleteicon} name='ios-trash'/>
                                            </TouchableOpacity>
                                            <Text style={styles.tag}>{item.item}</Text>
                                            <Text style={styles.setdate}>{moment(item.setdate).format("YYYY年MM月DD日")}</Text>
                                            <Text style={styles.name}>{item.name}</Text>
                                        </ImageBackground>
                                    </TouchableOpacity>
                                </View>
                            }}
                        /> 
                        :<View>
                            <Text style={styles.nulltext}>哎呀~ 竟然一件大事都没有</Text>
                            <View
                                style={styles.nullbox}>
                                <View>
                                    <ImageBackground
                                        imageStyle={{opacity:0.6}}
                                        style={{
                                            height:'100%',
                                            height:'100%',
                                        }}
                                        resizeMode='cover'
                                        source={{uri:image}}
                                    >
                                        <View style={styles.nullline}>
                                            <Text style={styles.nulltag}>温馨的每一刻</Text>
                                            <TouchableOpacity>
                                                <Icon1 size={50} color='#333' style={styles.nullicon} name='corner-right-up'/>
                                            </TouchableOpacity>
                                        </View>
                                        <Text style={styles.setdate}>{moment(new Date()).format("YYYY年MM月DD日")}</Text>
                                        <Text style={styles.nullcontent}>点击右上角添加一件值得纪念的事情吧~</Text>
                                    </ImageBackground>
                                </View>
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
        height:0.85*height,
        marginTop:0.03*height,
        paddingTop:0.02*height,
        paddingBottom:0.02*height,
        alignItems:'center'
    },
    deleteicon:{
        fontSize:50*s,
        zIndex:100,
        marginTop:-0.02*height,
        width:0.06*height,
        height:0.06*height,
        marginLeft:0.7*width,
        textAlign:'center',
        textAlignVertical:'center',
        borderRadius:100,
        backgroundColor:'rgba(205,205,205,0.5)',
        marginBottom:-0.01*height
    },
    tag:{
        width:0.8*width,
        height:0.05*height,
        textAlignVertical:'center',
        fontSize:32*s,
        color:'#ffbf2d',
        transform: [{scale:0.95}],
        // backgroundColor:'#ccc'
    },
    setdate:{
        width:0.5*width,
        height:0.05*height,
        borderRadius:5,
        fontSize:26*s,
        color:'#888',
        backgroundColor:'rgba(255,255,255,0.7)',
        textAlign:'center',
        textAlignVertical:'center',
        marginLeft:'auto',
        marginRight:'auto',
    },
    name:{
        width:0.65*width,
        height:0.1*height,
        lineHeight:0.03*height,
        backgroundColor:'rgba(204,204,204,0.3)',
        marginTop:0.03*height,
        marginLeft:'auto',
        marginRight:'auto',
        fontSize:30*s,
        padding:0.02*width,
        color:'#444',
        textAlignVertical:'center',
        textAlign:'center',
        borderRadius:10
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
    nullbox:{
        width:0.9*width,
        height:0.7*height,
        backgroundColor:'#ddccff',
        marginTop:0.015*height,
        alignItems:'center',
        alignContent:'center',
        borderRadius:5
    },
    nullline:{
        width:0.9*width,
        marginLeft:'auto',
        marginRight:'auto',
        height:0.08*height,
        flexDirection:'row',
    },
    nulltag:{
        width:0.75*width,
        height:0.08*height,
        textAlignVertical:'center',
        fontSize:32*s,
        color:'#ffffff',
        transform: [{scale:0.95}],
    },
    nullicon:{
        width:0.08*height,
        height:0.08*height,
        marginTop:-0.05*height,
        textAlignVertical:'center',
        textAlign:'center',
        backgroundColor:'rgba(255,255,255,0.3)'
    },
    nullcontent:{
        color:'#333',
        height: 0.08*height, 
        width: 0.75*width,
        textAlign:'center',
        textAlignVertical:'center',
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:0.1*height,
        fontSize:25*s,
        backgroundColor:'rgba(255,255,255,0.3)'
    },
})
