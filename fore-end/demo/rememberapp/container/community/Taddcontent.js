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
    Modal,
    TextInput
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
        this.state={
            uid:'',
            content:'',
            lists:[],
            uplist:[],
            visible:false
        }
    }
    componentDidMount(){
        console.log('社区第一次加载');
        this.setState({
            lists:this.props.lists,
            uplist:this.props.uplist
        }) 
    }
    componentDidUpdate(prevProps,prevState){
        console.log('更新')
    
    }
    savelocal = ()=>{

    }
    publish = ()=>{

    }
    render() {
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
                    <TouchableOpacity onPress={()=>this.setState({visible:true})}>
                        <Icon2 style={styles.icon} name='close'/>
                    </TouchableOpacity>
                    <Text style={styles.title}></Text>
                    <TouchableOpacity onPress={this.savelocal}>
                        <Text style={styles.titlebtn}>存草稿</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.publish}>
                        <Text style={styles.titlebtn}>发布</Text>
                    </TouchableOpacity>
                </View>
                <WingBlank style={styles.wingblank}>
                    <View style={styles.contentbox}>
                        <TextInput
                            style={styles.content}
                            onChangeText={text=>{this.setState({content:text})}}
                            placeholder="此时此刻说点什么吧"
                            multiline={true}
                        />
                        <Text style={styles.tips}>已输入 <Text style={styles.num}>{this.state.content.length}</Text> 个字</Text>
                    </View>
                    <View style={styles.picsbox}>
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
                    </View>
                </WingBlank>
                <Modal transparent visible={this.state.visible}>
                    <WingBlank style={styles.nullwingblank}>
                        <TouchableOpacity onPress={this.savelocal}>
                            <Text style={styles.linebtn}>存草稿</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{
                            this.setState({
                                visible:false
                            },Actions.community())
                        }}>
                            <Text style={styles.linebtn}>放弃更改</Text>
                        </TouchableOpacity>
                    </WingBlank>
                </Modal>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    navbartitle:{
        width:width,
        height:0.08*height,
        backgroundColor:'#fff',
        flexDirection: 'row',
        alignItems:'flex-end'
    },
    icon: {
        width: 0.15 * width,
        height:0.08*height,
        color: '#000',
        fontSize: 30,
        // backgroundColor:'#ccc',
        textAlign:'center',
        textAlignVertical:'center',
    },
    title:{
        height:0.055*height,
        width:0.39*width,
        textAlign:'center',
        textAlignVertical:'center',
        // backgroundColor:'#eee',
        justifyContent:'center'
    },
    titlebtn:{
        backgroundColor:'rgba(255,191,45,0.8)',
        width:0.17*width,
        height:0.045*height,
        textAlign:'center',
        textAlignVertical:'center',
        marginBottom:0.015*height,
        // borderRadius:5,
        fontSize:25*s,
        color:'#fff',
        marginLeft:0.035*width
    },
    wingblank:{
        height:0.85*height,
        marginTop:0.01*height,
        justifyContent:'center',
        // backgroundColor:'#FFBF2D',
        alignItems:'center',
        // backgroundColor:'rgba(250,250,250,1)'
    },
    contentbox:{
        width:0.9*width,
        // backgroundColor:'#ccc',
        height:0.32*height,
        marginBottom:0.015*height,
        paddingLeft:0.015*width,
        paddingRight:0.015*width,
    },
    content:{
        height:0.3*height,
        textAlignVertical:'top',
        lineHeight:0.03*height,
        fontSize:23*s,
        color:'#333'
    },
    tips:{
        fontSize:20*s,
        // backgroundColor:'#ccc',
        textAlign:'right'
    },
    num:{
        fontSize:23*s
    },
    picsbox:{
        height:0.5*height,
        // backgroundColor:'#ccc'
    },
    pics:{
        width:0.87*width*0.33,
        height:0.45*height*0.33,
        margin:0.01*width
    },
    nullwingblank:{
        height:0.4*height,
        marginTop:0.6*height,
        justifyContent:'center',
        backgroundColor:'#fff',
        // backgroundColor:'#FFBF2D',
        alignItems:'center',
        // backgroundColor:'rgba(250,250,250,1)'
    },
    linebtn:{
        backgroundColor:'rgba(204,204,204,0.2)',
        width:0.5*width,
        textAlignVertical:'center',
        textAlign:'center',
        color:'#888',
        fontSize:30*s,
        height:0.1*height,
        marginTop:0.02*height
    },
})
