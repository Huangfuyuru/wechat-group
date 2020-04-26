import React, { Component } from 'react'
import { 
    Text, 
    View, 
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    FlatList,
    Image,
    ImageBackground
} from 'react-native'
import moment from 'moment'
import Icon1 from 'react-native-vector-icons/Feather'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon3 from 'react-native-vector-icons/Ionicons'

import { Actions } from 'react-native-router-flux';
import { WingBlank } from '@ant-design/react-native'
const {width,scale,height} = Dimensions.get('window');
const s = width / 640;
const imgurl = 'http://hbimg.b0.upaiyun.com/3503b3b19c1bc0928766b62de18a5433dad71cf911089-tluSYK_fw658'
export default class Cdairy extends Component {
    constructor(){
        super();
        this.state={
            lists:[
                {
                    tag:'第一次',
                    name:'笑',
                    setdate:'Wed Apr 15 2020 17:19:31 GMT+0800',
                    content:'今天宝贝自己走的路，超开心！',
                    imgurl:[imgurl,imgurl,imgurl,imgurl]
                },
                {
                    tag:'第一次',
                    name:'走路',
                    setdate:'Wed Apr 15 2020 17:19:31 GMT+0800',
                    content:'今天宝贝自己走的路，超开心！',
                    imgurl:[imgurl,imgurl,imgurl,imgurl]
                },
                {
                    tag:'过生日',
                    name:'1周岁',
                    setdate:'Wed Apr 15 2020 17:19:31 GMT+0800',
                    content:'今天宝贝生日，超开心！',
                    imgurl:[imgurl,imgurl,imgurl,imgurl]
                },
                {
                    tag:'温情时刻',
                    name:'帮我做了好多好多家务',
                    setdate:'Wed Apr 15 2020 17:19:31 GMT+0800',
                    content:'今天宝贝懂事了今天宝贝懂事了今天宝贝懂事了今天宝贝懂事了今天宝贝懂事了！',
                    imgurl:[]
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
                    <Text style={styles.title}>大事记</Text>
                    <TouchableOpacity onPress={()=>Actions.ccevents()}>
                        <Icon3 style={styles.icon}  name='md-add'/>
                    </TouchableOpacity>
                </View>
                <WingBlank style={styles.wingblank}>
                    <FlatList 
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
                            if(!item.imgurl[0]){
                                bgcolor = '#eeffee';
                                image = false;
                            }
                            return<View style={{
                                width:0.8*width,
                                height:0.3*height,
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
                                        <Text style={styles.tag}>{item.tag}</Text>
                                        <Text style={styles.setdate}>{moment(item.setdate).format("YYYY年MM月DD日")}</Text>
                                        <Text style={styles.name}>{item.name}</Text>
                                    </ImageBackground>
                                </TouchableOpacity>
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
        fontSize:25*s,
        padding:0.02*width,
        color:'#444',
        textAlignVertical:'center',
        textAlign:'center',
        borderRadius:10
    }
})
