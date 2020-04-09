import React, { Component } from 'react'
import { 
    View,
    Text,
    StatusBar,
    TextInput,
    Dimensions,
    StyleSheet,
    Image,
} from 'react-native'
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {Carousel} from '@ant-design/react-native'
import Button from 'react-native-button'
const {width,scale} = Dimensions.get('window');
const s = width / 640;
export default class Home extends Component {
    constructor(){
        super();
        this.state={
            imgurl:[
                require('../images/3.png'),
                require('../images/3.png'),
                require('../images/3.png')
            ],
            iconurl:[
                {
                    url:require('../images/4.png'),
                    content:'居家维修保养'
                },
                {
                    url:require('../images/5.png'),
                    content:'住宿优惠'
                },
                {
                    url:require('../images/6.png'),
                    content:'出行接送'
                },
                {
                    url:require('../images/4.png'),
                    content:'E族活动'
                },
                
            ]
        }
    }
    render() {
        return (
            <View style={{backgroundColor:'#f5f5f5'}}>
                <StatusBar 
                    backgroundColor='#f23030'
                />
                <View style={styles.title}>
                    <View style={styles.search}>
                        <Icon1 
                        name='search1' 
                        color='#fff'
                        size={28}
                        />
                        <TextInput 
                            placeholder="请输入您要搜索的关键字"
                            placeholderTextColor='#fff'
                            style={{
                                width: 480*s,
                                height: 52*s,
                                padding: 0,
                                paddingLeft: 10,
                                fontSize:17
                                
                            }}
                        />
                        <Icon2 
                        name='cart-outline' 
                        color='#fff'
                        size={30}
                        />
                    </View>
                </View>
                <Carousel
                    style={styles.wrapper}
                    selectedIndex={2}
                    autoplay
                    infinite
                    afterChange={this.onHorizontalSelectedIndexChange}
                >
                    {
                        this.state.imgurl&&this.state.imgurl.map((item,idx)=>(
                            <View style={styles.containerHorizontal}>
                                <Image 
                                    resizeMode="contain"
                                    source={item}
                                    style={{height:275*s}}
                                />
                            </View>
                        ))
                    }
                </Carousel>
                <View>
                    {
                        this.state.iconurl&&this.state.iconurl.map((item,idx)=>(
                            <View style={styles.lists}>
                                <Image 
                                    source={item.url}
                                    style={{
                                        resizeMode:"contain",
                                        height:99*s,
                                        marginLeft:10*s
                                    }}
                                />
                                <Text 
                                style={{
                                    width:140*s,
                                    fontSize:22*s,
                                    marginLeft:30*s,
                                    color:'#333',
                                    marginRight:250*s
                                }}>{item.content}</Text>
                                <Icon1 
                                    name='right'
                                    size={28}
                                    color='#cecece'
                                />
                            </View>
                        ))
                    }
                </View>
                <Button
                    style={styles.btn}
                >
                    发布需求
                </Button>
                <Text style={{
                    width:'90%',
                    marginLeft:'5%',
                    textAlign:"center",
                    fontSize:16*s,
                    color:'#818181',
                    paddingTop:18*s,
                    paddingBottom:10*s
                }}>©E族之家 版权所有</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title:{
        backgroundColor:'#f23030',
        width:'100%',
        paddingTop:15*s,
        paddingBottom:15*s,
        paddingLeft:'4.5%'
    },
    search:{
        width: 520*s,
        height: 52*s,
        borderRadius:15,
        backgroundColor: 'rgba(255,255,255,0.71)',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20*s,
    },
    wrapper: {
        backgroundColor: '#f23030',
    },
    containerHorizontal: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 273*s,
    },
    lists:{
        backgroundColor:'#fff',
        marginTop:10*s,
        height:120*s,
        flexDirection: 'row',
        alignItems: 'center',

    },
    btn:{
        width:545*s,
        height:65*s,
        backgroundColor:'#f23030',
        color:'#fff',
        lineHeight:65*s,
        marginTop:35*s,
        borderRadius:10,
        fontSize:22*s,
        marginLeft:'auto',
        marginRight:'auto',
    }
    
})
