import React, { Component } from 'react'
import { 
    Text, 
    View,
    StyleSheet,
    Dimensions,
    FlatList,
    Image,
    ImageBackground,
    TouchableOpacity,
    AsyncStorage,
    ToastAndroid,
    Alert
} from 'react-native'
import moment from 'moment'
import { Actions } from 'react-native-router-flux';
import { WingBlank } from '@ant-design/react-native';
import Icon1 from 'react-native-vector-icons/Feather';
import Icon2 from "react-native-vector-icons/Ionicons";
import Icon3 from 'react-native-vector-icons/AntDesign'
import Icon4 from 'react-native-vector-icons/FontAwesome'
import Button from 'react-native-button';
//引入组件
import {myFetch} from '../../src/utils'

const {width,scale,height} = Dimensions.get('window');
const image= 'http://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20190923/77970460742d4f45919499e65b35d976.jpeg'
//
const s = width / 640;
const h = height / 1012;
export default class Mychilds extends Component {
    constructor(){
        super();
        this.state={
            uid:'',
            code:1, //要获取的状态
            lists:[],
            back:'http://pic180.nipic.com/file/20180905/27581684_161923154081_2.jpg'
        }
    }
    componentDidMount(){
        AsyncStorage.getItem('user').
        then((res)=>{
            var user = JSON.parse(res)
            this.setState({
                uid:user.id,
            })
            myFetch.get('/my/child',{
                uid:this.state.uid
            }).then(res=>{
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
        })
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            lists:nextProps.data
        })
    }
    rmCevent = (e)=>{
        Alert.alert('提示', '确定要删除吗？',
            [
                { text: "确定", onPress: ()=>{
                    myFetch.get('/my/child/delchild',{
                        uid:this.state.uid,
                        childsid:e.id
                    }).then(res=>{
                        if(res){
                            this.setState({
                                lists:res.data
                            })
                            console.log(res)
                        }else{
                            this.setState({
                                lists:[]
                            })
                            ToastAndroid.showWithGravityAndOffset(
                                '删除成功！',
                            ToastAndroid.SHORT,
                            ToastAndroid.CENTER,
                            25,-100)
                        }
                    })
                } },
                { text: "取消", onPress: this.opntion2Selected },
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
                    <Text style={styles.title}>亲子列表</Text>
                    <TouchableOpacity onPress={()=>Actions.Mmchilds({uid:this.state.uid})}>
                        <Icon2 style={styles.icon}  name='md-add'/>
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
                                    height:0.03*width,
                                }}>
                                </View>
                            }
                        renderItem={({item})=>{
                            return<ImageBackground
                            imageStyle={{opacity:0.7}}
                            style={{
                                borderRadius:10,
                                width:0.87*width,
                                height:0.12*height,
                                marginTop:20*s,
                                borderWidth:5,
                                borderColor:'rgba(204,204,204,0.3)',
                                flexDirection:'row',
                                alignItems:'center',
                            }}
                            resizeMode='cover'
                            source={{uri:this.state.back}}
                        >
                             {/* <View key={item.id}
                                style={{
                                    borderRadius:10,
                                    width:0.87*width,
                                    height:0.12*height,
                                    marginTop:20*s,
                                    borderWidth:5,
                                    borderColor:'rgba(204,204,204,0.3)',
                                    flexDirection:'row',
                                    alignItems:'center',
                                }}
                            > */}
                                <View style={{width:'15%',marginLeft:'30%',height:'100%',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                    <Icon4 style={styles.listlineicon} name='heart'/>
                                    <Text style={{fontSize:16}}>&nbsp;昵称：</Text>
                                </View>
                                <View style={{width:'40%',marginLeft:'5%',height:'100%',flexDirection:'row',alignItems:'center'}}>
                                    <Text style={{fontSize:16}}>{item.name}</Text>
                                </View>
                                <TouchableOpacity >
                                    <Icon3 style={styles.icon2} onPress={()=>this.rmCevent(item)} name='delete'/>
                                </TouchableOpacity>
                                
                            {/* </View> */}
                            </ImageBackground>
                        }}
                        /> 
                        :<View>
                            <Text style={styles.nulltext}>这里空空如也~(・ω≦)</Text>
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
                                            <Text style={styles.nulltag}>你陪我长大，我陪你到老</Text>
                                            <TouchableOpacity>
                                                <Icon1 size={50} color='#333' style={styles.nullicon} name='corner-right-up'/>
                                            </TouchableOpacity>
                                        </View>
                                        <Text style={styles.nullcontent}>点击右上角添加孩子信息吧~</Text>
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
    icon2:{
        width:0.08*width,
        color:'black',
        fontSize:25,
    },
    title:{
        marginLeft:'auto',
        marginRight:"auto",
        textAlign:'center',
        fontSize:20,
        color:'#fff',
        letterSpacing:3,
        fontWeight:'bold'
    },
    scrollView: {
        backgroundColor: '#fff',
        paddingLeft:0.03*width,
        paddingRight:0.03*width,
        paddingTop:5,
    },
    listlineicon:{
        fontSize:32*s,
        color:'#FFBF2D',
    },
    btn:{
        width:'100%',
        height:60*s,
        marginTop:10*s,
        marginLeft:'2%',
        marginRight:'2%',
        backgroundColor:'#FFBF2D',
        borderWidth:1,
        borderStyle:'solid',
        borderColor:'#FFBF2D',
        borderRadius:5,
        color:'white',
        fontSize:17,
        textAlignVertical:'center'
    },
    wingblank:{
        height:0.85*height,
        marginTop:0.03*height,
        paddingTop:0.02*height,
        paddingBottom:0.02*height,
        alignItems:'center'
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
