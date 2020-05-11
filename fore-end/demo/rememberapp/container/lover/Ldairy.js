import React, { Component } from 'react'
import { 
    Text, 
    View,
    StyleSheet,
    Dimensions,
    FlatList,
    Image,
    Alert,
    ImageBackground,
    TouchableOpacity
} from 'react-native'
import moment from 'moment'
import { Actions } from 'react-native-router-flux';
import { WingBlank } from '@ant-design/react-native';
import {myFetch} from '../../src/utils'
import Icon1 from 'react-native-vector-icons/Feather'
import Icon2 from 'react-native-vector-icons/Entypo'
import Icon3 from 'react-native-vector-icons/Ionicons'
import Icon4 from 'react-native-vector-icons/SimpleLineIcons'
import Icon5 from 'react-native-vector-icons/Fontisto'
const {width,scale,height} = Dimensions.get('window');
const s = width / 640;
const image = "https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1106982671,1158338553&fm=26&gp=0.jpg"
export default class Ldairy extends Component {
    constructor(){
        super();
        this.state={
            loverid:'',
            lists:[]
        }
    }
    componentDidMount(){
        this.setState({
            loverid:this.props.loverId
        })
        myFetch.get('/lover/ldairy',{
            loverid:this.props.loverId,
        }).then(res=>{
            console.log(res.msg)
                this.setState({
                    lists:res.msg
                })
        })
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            lists:nextProps.data
        })
    }
    rmCdiary=(e)=>{
        // var rmname = e.name;
        Alert.alert('提示', '确定要删除吗？',
            [
                { text: "确定", onPress: ()=>{
                    myFetch.get('/lover/ldairy/delDairy',{
                        loverid:this.state.loverid,
                        loverDiaryid:e.id,
                    }).then(res=>{
                        console.log('删除')
                        if(res.code==0){
                            this.setState({
                                lists:res.msg
                            })
                            ToastAndroid.showWithGravityAndOffset(
                                '删除成功！',
                            ToastAndroid.SHORT,
                            ToastAndroid.BOTTOM,
                            25,-100)
                        }else{
                            ToastAndroid.show(res.msg+"!", ToastAndroid.SHORT);
                        }
                        
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
                    <Text style={styles.title}>恋爱日记</Text>
                    <TouchableOpacity onPress={()=>Actions.lcdairy({loverid:this.state.loverid})}>
                        <Icon3 style={styles.icon}  name='md-add'/>
                    </TouchableOpacity>
                </View>
                <WingBlank style={styles.wingblank}>
                    {
                        this.state.lists
                        ?<FlatList
                            showsVerticalScrollIndicator={false}
                            ListFooterComponent={
                                <View style={{
                                    width:'100%',
                                    marginTop:20,
                                }}>
                                    <Text style={{
                                        width:0.9*width,
                                        marginLeft: 'auto',
                                        marginRight: 'auto',
                                        backgroundColor: '#ccc',
                                        height: 0.5,
                                    }}></Text>
                                    <Text style={{
                                        marginTop:-10,
                                        width:100*s,
                                        height:50,
                                        textAlign:'center',
                                        marginLeft:'auto',
                                        marginRight:'auto',
                                        backgroundColor:'#fff',
                                        fontSize:15,
                                        color:'#bdbbb8'
                                    }}>到底了</Text>
                                </View>
                            }
                            style={styles.scrollView}
                            data={this.state.lists}
                            numColumns={1}
                            renderItem={({item})=>{
                                var iconcolor = '#ffffff';
                                var textcolor = '#000000';
                                var weathercolor = '#ffffff';
                                var titlecolor = '#333'
                                // if(item.content == 'undefined'){
                                //     item.content = '（您没有添加文字内容哦~）';
                                // }
                                if(item.backcolor == '#ffffff' || item.backcolor == '#ffffaa'){
                                    iconcolor = '#FFBF2D',
                                    weathercolor = '#999999'
                                }
                                if(item.backcolor == '#000000'){
                                    titlecolor = '#ffffff'
                                    textcolor = '#ffffff'
                                }
                                if(item.weather == 'day-sunny' || item.weather == 'night-clear'){
                                    weathercolor = '#FFBF2D'
                                    if(item.backcolor == 'orange'){
                                        weathercolor = '#ffffff'
                                    }
                                }
                                return <View
                                    key={item.id} 
                                    style={{
                                        borderRadius:10,
                                        backgroundColor:`${item.backcolor}`,
                                        width:0.87*width,
                                        height:0.36*height,
                                        marginTop:0.015*height,
                                        borderWidth:5,
                                        borderColor:'rgba(204,204,204,0.1)'
                                        
                                    }}
                                >
                                    <ImageBackground 
                                        style={{
                                            width:'100%',
                                            height:'100%',
                                            transform: [{scale:0.98}]
                                        }}
                                        imageStyle={{opacity:0.8}}
                                        resizeMode="cover"
                                        source={{uri:`${item.bgimg}`}}
                                    >
                                        <View style={{
                                            width:0.84*width,
                                            marginLeft:'auto',
                                            marginRight:'auto',
                                            height:65*s,
                                            flexDirection:'row',
                                            borderBottomWidth:1,
                                            borderBottomColor:'rgba(204,204,204,0.3)'
                                        }}>
                                            <Icon4 color={iconcolor} style={styles.titleline} name='heart'/>
                                            <Text
                                                style={{
                                                    width:0.42*width,
                                                    textAlignVertical:'center',
                                                    textAlign:'center',
                                                    fontSize:20*s,
                                                    color:`${titlecolor}`
                                                }}
                                            >
                                                {moment(item.setdate).format("YYYY年MM月DD日  HH:mm:ss")}
                                            </Text>
                                            <Icon5 color={weathercolor} style={styles.lineweather} name={item.weather}/>
                                            <TouchableOpacity onPress={()=>this.rmCdiary(item)}>
                                                <Icon3 color={titlecolor} style={styles.titleline} name='ios-trash'/>
                                            </TouchableOpacity>
                                        </View>
                                        <View>
                                            <Text 
                                                onPress={()=>Actions.lsdairy({data:item})}
                                                style={{
                                                    color:`${textcolor}`,
                                                    lineHeight:38*s,
                                                    width:0.83*width,
                                                    alignContent:'center',
                                                    height:0.11*height,
                                                    marginLeft:'auto',
                                                    marginRight:'auto',
                                                    marginTop:0.024*width,
                                                    padding:0.01*width,
                                                    fontSize:23*s,
                                                    // backgroundColor:'#000'
                                                }}
                                                selectable = {true}
                                            >{item.content ? (item.content.length > 63 ? item.content.substr(0, 63) + " . . . " : item.content) : ""}</Text>
                                            <View style={{
                                                overflow:'hidden',
                                                flexDirection:'row',
                                                margin:0.024*width,
                                                
                                            }}>
                                                {
                                                    item.imgurl&&item.imgurl.map((img,idx)=>(
                                                        <Image
                                                            key={idx}
                                                            style={{
                                                                width:0.262*width,
                                                                height:160*s,
                                                                margin:0.005*width,
                                                                transform: [{scale:0.95}]
                                                            }} 
                                                            source={{uri:`${img}`}}
                                                        />
                                                    ))
                                                }
                                            </View>
                                        </View>
                                    </ImageBackground>
                                </View>
                            }}
                        />
                        :
                        <View>
                            <Text style={styles.nulltext}>哎呀~ 一篇日记都没有呢</Text>
                            <View style={styles.nullbox}>
                                <ImageBackground 
                                    blurRadius={1}
                                    style={{
                                        width:'100%',
                                        height:'100%',
                                        transform: [{scale:0.98}]
                                    }}
                                    imageStyle={{opacity:0.8}}
                                    resizeMode="cover"
                                    source={{uri:image}}
                                >
                                    <View style={styles.nulltitle}>
                                        <Icon4 color='#ffbf2d' style={styles.nullsun} name='direction'/>
                                        <Text style={styles.nulltime}>
                                            {moment(new Date()).format("YYYY年MM月DD日  HH:mm:ss")}
                                        </Text>
                                        <Icon5 color='#ffbf2d' style={styles.nullsun} name='day-sunny'/>
                                        <TouchableOpacity>
                                            <Icon1 size={50} color='#333' style={styles.nullicon} name='corner-right-up'/>
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <Text style={styles.nullcontent}>点击右上角来写一篇日记吧~</Text>
                                        <Image style={styles.nullpic} source={{uri:image}}/>
                                    </View>
                                </ImageBackground>
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
    scrollView: {
        paddingLeft:0.03*width,
        paddingRight:0.03*width,
        // backgroundColor:'#ccc',

    },
    titleline:{
        // backgroundColor:'#ccc',
        textAlign:"right",
        width:0.1*width,
        fontSize:45*s,
        textAlignVertical:'center'
    },
    lineweather:{
        width:0.18*width,
        // backgroundColor:'#ccc',
        textAlignVertical:'center',
        textAlign:'left',
        fontSize:40*s,

    },
    wingblank:{
        height:950*s,
        marginTop:30*s,
        borderColor:'rgba(204,204,204,0.3)',
        borderStyle:'solid',
        borderWidth:1,
        paddingTop:0.02*height,
        paddingBottom:0.02*height,
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
        borderRadius:10,
        // backgroundColor:'#ccc',
        width:0.9*width,
        marginLeft:'auto',
        marginRight:'auto',
        height:0.6*height,
        marginTop:0.015*height,
        borderWidth:5,
        borderColor:'rgba(204,204,204,0.1)'
    },
    nullsun:{
        fontSize:50*s,
        textAlign:'center',
        width:0.13*width,
        height:0.08*height,
        textAlignVertical:'center'
    },
    nulltitle:{
        width:0.88*width,
        marginLeft:'auto',
        marginRight:'auto',
        height:0.08*height,
        flexDirection:'row',
        borderBottomWidth:1,
        borderBottomColor:'rgba(204,204,204,0.8)'
    },
    nulltime:{
        width:0.5*width,
        textAlignVertical:'center',
        textAlign:'left',
        fontSize:25*s,
        color:'#fff'
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
        // color:`${textcolor}`,
        height: 0.08*height, 
        width: 0.6*width,
        textAlign:'center',
        textAlignVertical:'center',
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:0.05*height,
        // padding:0.01*width,
        fontSize:25*s,
        backgroundColor:'rgba(255,255,255,0.3)'
    },
    nullpic:{
        width:0.8*width,
        height:0.3*height,
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:0.05*height,
        transform: [{scale:0.95}]
    }
})
