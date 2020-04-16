import React, { Component } from 'react'
import { 
    Text, 
    View,
    StyleSheet,
    Dimensions,
    FlatList,
    Image,
} from 'react-native'
import moment from 'moment'
import { Actions } from 'react-native-router-flux';
import { WingBlank } from '@ant-design/react-native';
import Icon1 from 'react-native-vector-icons/Feather'
import Icon2 from 'react-native-vector-icons/Entypo'
import Icon3 from 'react-native-vector-icons/Ionicons'
import Icon4 from 'react-native-vector-icons/SimpleLineIcons'
import Icon5 from 'react-native-vector-icons/Fontisto'
const {width,scale,height} = Dimensions.get('window');
const s = width / 640;
export default class Cdairy extends Component {
    constructor(){
        super();
        this.state={
            lists:[
                {
                    content:'这是我的日记日记日记日记日记日记日记日记日记日记日记日记日记日记日记日记日记日记日记日记日记日记日记日记日记日记日记日记日记日记日记日记日记日记日记日记日记日记日记日记日记日记日记日记日记日记日记日记日记日记日记日记日记日记日记日记日记日记日记日记日记呀真好！',
                    bgcolor:'#ccffdd',
                    id:1,
                    weather:'day-cloudy',
                    setdate:'Wed Apr 15 2020 17:19:31 GMT+0800',
                    pictures:['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586712889480&di=9c4a333188094ae5642b0487ec2bd34f&imgtype=0&src=http%3A%2F%2Fwx2.sinaimg.cn%2Flarge%2F007bRu2Ggy1gbtrl6i7ezj30rs0fme2h.jpg','https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586712889480&di=9c4a333188094ae5642b0487ec2bd34f&imgtype=0&src=http%3A%2F%2Fwx2.sinaimg.cn%2Flarge%2F007bRu2Ggy1gbtrl6i7ezj30rs0fme2h.jpg','https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586712889480&di=9c4a333188094ae5642b0487ec2bd34f&imgtype=0&src=http%3A%2F%2Fwx2.sinaimg.cn%2Flarge%2F007bRu2Ggy1gbtrl6i7ezj30rs0fme2h.jpg','https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586712889480&di=9c4a333188094ae5642b0487ec2bd34f&imgtype=0&src=http%3A%2F%2Fwx2.sinaimg.cn%2Flarge%2F007bRu2Ggy1gbtrl6i7ezj30rs0fme2h.jpg']
                },
                {
                    content:'undefined',
                    bgcolor:'#ccffdd',
                    id:1,
                    weather:'day-rain',
                    setdate:'Wed Apr 15 2020 17:19:31 GMT+0800',
                    pictures:['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586712889480&di=9c4a333188094ae5642b0487ec2bd34f&imgtype=0&src=http%3A%2F%2Fwx2.sinaimg.cn%2Flarge%2F007bRu2Ggy1gbtrl6i7ezj30rs0fme2h.jpg','https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586712889480&di=9c4a333188094ae5642b0487ec2bd34f&imgtype=0&src=http%3A%2F%2Fwx2.sinaimg.cn%2Flarge%2F007bRu2Ggy1gbtrl6i7ezj30rs0fme2h.jpg']
                },
                {
                    content:'这是我的日记',
                    bgcolor:'#FFBF2D',
                    id:1,
                    weather:'day-sunny',
                    setdate:'Wed Apr 15 2020 17:19:31 GMT+0800',
                    pictures:['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586712889480&di=9c4a333188094ae5642b0487ec2bd34f&imgtype=0&src=http%3A%2F%2Fwx2.sinaimg.cn%2Flarge%2F007bRu2Ggy1gbtrl6i7ezj30rs0fme2h.jpg','https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586712889480&di=9c4a333188094ae5642b0487ec2bd34f&imgtype=0&src=http%3A%2F%2Fwx2.sinaimg.cn%2Flarge%2F007bRu2Ggy1gbtrl6i7ezj30rs0fme2h.jpg']
                },
                {
                    content:'这是我的日记',
                    bgcolor:'#ffffff',
                    id:1,
                    weather:'day-sunny',
                    setdate:'Wed Apr 15 2020 17:19:31 GMT+0800',
                    pictures:['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586712889480&di=9c4a333188094ae5642b0487ec2bd34f&imgtype=0&src=http%3A%2F%2Fwx2.sinaimg.cn%2Flarge%2F007bRu2Ggy1gbtrl6i7ezj30rs0fme2h.jpg','https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586712889480&di=9c4a333188094ae5642b0487ec2bd34f&imgtype=0&src=http%3A%2F%2Fwx2.sinaimg.cn%2Flarge%2F007bRu2Ggy1gbtrl6i7ezj30rs0fme2h.jpg']
                },
            ]
        }
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
                    <Text style={styles.title}>亲子日记</Text>
                </View>
                <WingBlank style={{
                    height:950*s,
                    marginTop:30*s,
                    borderColor:'rgba(204,204,204,0.3)',
                    borderStyle:'solid',
                    borderWidth:1,
                }}>
                    <FlatList
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
                            var weathercolor = '#ccc'
                            if(item.content == 'undefined'){
                                item.content = '没有添加文字内容哦~';
                                textcolor = '#bdbbb8'
                            }
                            if(item.bgcolor == '#ffffff'){
                                iconcolor = '#FFBF2D'
                            }
                            if(item.weather == 'day-sunny' || item.weather == 'night-clear'){
                                weathercolor = '#FFBF2D'
                                if(item.bgcolor == '#FFBF2D'){
                                    weathercolor = '#ffffff'
                                }
                            }
                            return <View 
                                style={{
                                    borderRadius:10,
                                    backgroundColor:`${item.bgcolor}`,
                                    width:0.87*width,
                                    height:0.35*height,
                                    marginTop:20*s,
                                    borderWidth:5,
                                    borderColor:'rgba(204,204,204,0.1)'
                                    
                                }}
                                key={item.id}
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
                                    <Icon4 color={iconcolor} style={styles.titleline} name='direction'/>
                                    <Text style={styles.linetime}>
                                        { moment(item.setdate).format(" YYYY年MM月DD日  HH:mm:ss")}
                                    </Text>
                                    <Icon5 color={weathercolor} style={styles.lineweather} name={item.weather}/>
                                    <Icon3 color='#bdbbb8' style={styles.titleline} name='ios-trash'/>
                                </View>
                                <View>
                                    <Text 
                                        onPress={()=>Actions.csdairy({data:item})}
                                        style={{
                                            color:`${textcolor}`,
                                            lineHeight:27,
                                            width:0.83*width,
                                            alignContent:'center',
                                            height:0.11*height,
                                            marginLeft:'auto',
                                            marginRight:'auto',
                                            marginTop:0.024*width,
                                            overflow:'hidden',
                                            textOverflow:'ellipsis',
                                            padding:0.01*width,
                                            fontSize:23*s,
                                            // backgroundColor:'#000'
                                        }}
                                        selectable = {true}
                                    >&emsp;{item.content ? (item.content.length > 63 ? item.content.substr(0, 63) + " . . . " : item.content) : ""}</Text>
                                    <View style={{
                                        overflow:'hidden',
                                        flexDirection:'row',
                                        margin:0.024*width,
                                        
                                    }}>
                                        {
                                            item.pictures&&item.pictures.map((img,idx)=>(
                                                <Image
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
                            </View>
                        }}
                    />
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
        backgroundColor: '#fff',
        paddingLeft:0.03*width,
        paddingRight:0.03*width,
        paddingTop:5,
        // marginBottom:60,
    },
    titleline:{
        // backgroundColor:'#ccc',
        textAlign:"right",
        width:0.1*width,
        fontSize:45*s,
        textAlignVertical:'center'
    },
    linetime:{
        width:0.42*width,
        textAlignVertical:'center',
        textAlign:'left',
        fontSize:20*s
        // backgroundColor:'#ccc',
    },
    lineweather:{
        width:0.18*width,
        // backgroundColor:'#ccc',
        textAlignVertical:'center',
        textAlign:'left',
        fontSize:40*s,

    }
})
