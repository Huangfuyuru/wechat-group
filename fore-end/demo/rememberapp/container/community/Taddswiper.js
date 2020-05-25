import React, { Component } from 'react'
import { 
    Text, 
    StyleSheet, 
    Dimensions, 
    View, 
    Image, 
    TouchableOpacity, 
    TouchableHighlight,
    AsyncStorage,
    StatusBar,
    ScrollView,
    FlatList,
    ImageBackground,
    DrawerLayoutAndroid,
    Modal
} from 'react-native'
import { 
    Flex, 
    WingBlank,
    Icon, 
    SearchBar, 
    TabBar,
    Tabs
} from '@ant-design/react-native'
import {
    Actions
} from 'react-native-router-flux'
import Icon1 from 'react-native-vector-icons/Feather'
import Icon2 from 'react-native-vector-icons/AntDesign'
import Icon3 from 'react-native-vector-icons/Entypo'
import Icon4 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon5 from 'react-native-vector-icons/Fontisto'
import {myFetch} from '../../src/utils'
import ImagePicker from 'react-native-image-crop-picker'
import IP from 'react-native-image-picker'
import Swiper from 'react-native-swiper'
import moment from 'moment'
import Button from 'react-native-button'
const { width, scale, height } = Dimensions.get('window');
const s = width / 640;
const h = height / 1012;
const image2 = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587985300669&di=0dd8b86dafb708019e01377b9d394503&imgtype=0&src=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D1229184673%2C3594306478%26fm%3D214%26gp%3D0.jpg'
const image = 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3230746282,4148313693&fm=15&gp=0.jpg'
const image1 = 'http://img.zcool.cn/community/019de45c32c171a80121df90bbe9ca.jpg@1280w_1l_2o_100sh.jpg'
export default class Community extends Component {
    constructor(props){
        super(props);
        // var uid = JSON.parse(localStorage.getItem('uid'));
        this.state={
            uid:'',
            lists:[],
            uplist:[],
            onPress:0
        }
    }
    componentDidMount(){
        console.log('社区第一次加载');
        AsyncStorage.getItem('user').
        then((res)=>{
            var user = JSON.parse(res)
            this.setState({
                uid:user.id
            })       
        })
        this.choose()
    }
    componentDidUpdate(prevProps,prevState){
        console.log('更新')
    
    }
    choose = ()=>{
        ImagePicker.openPicker({
            multiple: true,
            includeBase64:true
        }).then(images => {
            var lists = this.state.lists;
            var uplist = this.state.uplist;
            for(var i in images){
                // console.log(images[i].path)
                lists.push(images[i].path);
                uplist.push(images[i].data);
            }
            this.setState({
                lists:lists,
                uplist:uplist
            })
        });
        ImagePicker.clean().then(() => { 
            console.log('removed all tmp images from tmp directory');
        }).catch(e => { 
            console.log(e)
        });
    }
    takepics = ()=>{
        ImagePicker.openCamera({
            width: 300, 
            height: 400, 
            cropping: true,
            includeBase64:true
        }).then(image => { 
            var lists = this.state.lists;
            var uplist = this.state.uplist;
            lists.push(image.path);
            uplist.push(image.data);
            this.setState({
                lists:lists,
                uplist:uplist
            })
        });
        ImagePicker.clean().then(() => { 
            console.log('removed all tmp images from tmp directory');
        }).catch(e => { 
            console.log(e)
        });

    }
    video = ()=>{

    }
    render() {
        const tabs = [
            {

                icon :<Icon5 size={35*s} name='photograph'/>,
                title : <Text>图库</Text>
            },
            {

                icon :<Icon1 size={35*s} name='camera'/>,
                title : <Text>拍照</Text>
            },
            {

                icon : <Icon1 size={35*s} name='video'/>,
                title : <Text>录视频</Text>
            },
        ];
        return (
            <View style={{ 
                width: width, 
                height: height, 
                backgroundColor: "#fff",
            }}>
                <StatusBar 
                    backgroundColor='#FFBF2D'
                />
                <View style={styles.navbartitle}>
                    <TouchableOpacity onPress={()=>Actions.pop()}>
                        <Icon1 style={styles.icon} name='chevron-left'/>
                    </TouchableOpacity>
                    <Text style={{width:0.175*width}}></Text>
                    {tabs.map((item, i) => (
                        <TouchableOpacity
                            onPress={()=>{
                            this.setState({onPress:i},()=>{
                                switch(i){
                                    case 0:
                                        this.choose();
                                        break;
                                    case 1:
                                        this.takepics();
                                        break;
                                    case 2:
                                        this.video();
                                        break;
                                    default:
                                        break;
                                        
                                }
                            })
                        }}
                        >
                            <View style={styles.titlebox}>
                                <Text style={{
                                    textAlign:'center',
                                    width:0.15*width,
                                    color: this.state.onPress === i ? '#FFBF2D' : 'rgba(0,0,0,0.4)',
                                }}>{item.icon}</Text>
                                <Text style={{
                                    textAlign:'center',
                                    width:0.15*width,
                                    fontSize:this.state.onPress === i ? 18*s : 16*s,
                                    fontWeight: this.state.onPress === i ? 'bold' : 'normal',
                                    color: this.state.onPress === i ? '#FFBF2D' : 'rgba(0,0,0,0.6)',
                                }}>{item.title}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity 
                        activeOpacity={this.state.lists[0]?0.2:1}
                        onPress={this.state.lists[0]?()=>Actions.taddcontent({lists:this.state.lists,uplist:this.state.uplist,uid:this.state.uid}):null}>
                        <Icon2 style={{
                            width: 0.1 * width,
                            height:0.07*height,
                            color: this.state.lists[0]?'#FFBF2D':'#999',
                            fontSize: 28,
                            marginLeft:0.15*width,
                            textAlign:'center',
                            textAlignVertical:'center',
                        }} name='arrowright'/>
                        {/* <Text style={styles.title}>下一步</Text> */}
                    </TouchableOpacity>
                </View>
                <WingBlank style={styles.wingblank}>
                    <Text style={styles.tips}>已选择 <Text style={styles.num}>{this.state.lists.length}</Text> 张图片</Text>
                    <FlatList
                        extraData={this.state}
                        data={this.state.lists}
                        horizontal={false}
                        numColumns={3}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item})=>(
                            <Image 
                                style={styles.pics}
                                resizeMode='cover'
                                source={{uri:`${item}`}}
                            />
                        )}
                    />
                </WingBlank>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    navbar:{
        height:0.115*height,
        width:width,
        alignItems:'center',
        marginBottom:0.005*height
    },
    navbartitle:{
        width:width,
        height:0.08*height,
        backgroundColor:'#fff',
        flexDirection: 'row',
        alignItems:'flex-end'
    },
    icon: {
        width: 0.1 * width,
        height:0.08*height,
        color: '#999',
        fontSize: 30,
        textAlign:'center',
        textAlignVertical:'center',
    },
    titlebox:{
        height:0.055*height,
        textAlign:'center',
        textAlignVertical:'center',
        width:0.15*width,
        // backgroundColor:'#ccc',
        justifyContent:'center'
    },
    wingblank:{
        height:0.8*height,
        marginTop:0.02*height,
        justifyContent:'center',
        // backgroundColor:'#FFBF2D',
        alignItems:'center',
        backgroundColor:'rgba(250,250,250,1)'
    },
    tips:{
        height:0.06*height,
        textAlignVertical:'center',
        fontSize:23*s,
        color:'rgba(0,0,0,0.7)'
    },
    num:{
        fontSize:28*s,
        color:'red',
    },
    pics:{
        width:0.87*width*0.33,
        height:0.45*height*0.33,
        margin:0.01*width
    }
})
