import React, { Component } from 'react'
import { 
    Text, 
    StyleSheet, 
    Dimensions, 
    View, 
    Picker,
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
    TextInput,
    ToastAndroid
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
import Icon6 from 'react-native-vector-icons/Ionicons'
import {myFetch} from '../../src/utils'
import ImagePicker from 'react-native-image-crop-picker'
import Swiper from 'react-native-swiper'
import moment from 'moment'
import Button from 'react-native-button'
import CheckBox from 'react-native-checkbox'
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
            style:'亲子',
            content:'',
            lists:[],
            uplist:[],
            visible:false,
            tag:true
        }
    }
    componentDidMount(){
        console.log('发布动态第一次加载');
        // console.log(this.props.uplist)
        // console.log(this.props.uid)
        this.setState({
            lists:this.props.lists,
            uid:this.props.uid
        },()=>{
            myFetch.uploadImages(this.props.uplist)
            .then( res=>{
                console.log('res')
                console.log(res)
                this.setState({
                    uplist:res
                })
            }).catch( err=>{
                console.log('flied');
            })
        }) 
    }
    componentDidUpdate(prevProps,prevState){
        console.log('更新')
    
    }
    savelocal = ()=>{
        AsyncStorage.removeItem('rememberarticledraft')
        AsyncStorage.getItem('rememberarticledraft').
        then((res)=>{
            var style = this.state.style;
            style==='亲子'?style=true:style=false;
            if(res){
                var draftlists = JSON.parse(res);
                var newitem = {
                    uid:this.state.uid,
                    imgurl:this.state.uplist,
                    content:this.state.content,
                    tag:this.state.tag,
                    style:style
                }
                draftlists.push(newitem);
                console.log('1',draftlists.length)
                AsyncStorage.setItem('rememberarticledraft',JSON.stringify(draftlists));
            }else{
                var draftlists = [];
                var newitem = {
                    uid:this.state.uid,
                    imgurl:this.state.uplist,
                    content:this.state.content,
                    tag:this.state.tag,
                    style:style
                }
                draftlists.push(newitem);
                console.log('2',draftlists.length)
                AsyncStorage.setItem('rememberarticledraft',JSON.stringify(draftlists));
            }
        })
    }
    publish = ()=>{
        console.log('this.state.uplist')
        console.log(this.state.uplist)
        var style = this.state.style;
        style==='亲子'?style=true:style=false;
        console.log(this.state.uid,this.state.uplist,this.state.content,this.state.tag,style)
        myFetch.post('/share/article/addarticle',{
            uid:this.state.uid,
            // imgurl:['#','#','#'],
            imgurl:this.state.uplist,
            content:this.state.content,
            tag:this.state.tag,
            style:style
        }).then(res=>{
            console.log(res)
            if(res.code === 0){
                ToastAndroid.showWithGravityAndOffset(
                '发布成功！',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                0,450)
                setTimeout(()=>{
                    Actions.community()
                },2000)
            }else{
                this.savelocal();
                ToastAndroid.showWithGravityAndOffset(
                '发布失败，已存至草稿箱！',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                0,450)
            }
        })

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
                        <View style={styles.lockbox}>
                            <View style={styles.lock}>
                                <CheckBox
                                    checkboxStyle={{
                                        width:0.035*width,
                                        height:0.035*width,
                                        marginTop:0.01*height,
                                        backgroundColor:'rgba(255,255,255,0.5)',
                                        marginRight:0.02*width
                                    }}
                                    label=''
                                    onChange={
                                        (checked) =>{
                                            if(checked){
                                                this.setState({
                                                    tag:false
                                                })
                                            }else{
                                                this.setState({
                                                    tag:true
                                                })
                                            }
                                        }
                                    }
                                />
                                <Text style={styles.locktext}>设为私密</Text>
                                <Icon6 style={styles.lockicon} name='md-lock'/>
                            </View>
                            <Text style={styles.pickerbox}>
                                <Icon3 style={styles.tagicon} name='price-tag'/>
                                <Picker
                                    selectedValue={this.state.style}
                                    mode='dropdown'
                                    style={styles.picker}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({
                                            style: itemValue,
                                        })
                                    }>
                                    <Picker.Item label="亲子" value="亲子" />
                                    <Picker.Item label="爱人" value="爱人" />
                                </Picker>
                            </Text>
                        </View>
                        <TextInput
                            style={styles.content}
                            onChangeText={text=>{this.setState({content:text})}}
                            placeholder="此时此刻说点什么吧"
                            multiline={true}
                        />
                        <Text style={styles.tips}>已输入 <Text style={styles.num}>{this.state.content.length}</Text> 个字</Text>
                    </View>
                    <View style={styles.picsbox}>
                        <Text style={styles.tip}>共 <Text style={styles.num}>{this.state.lists.length}</Text> 张图片</Text>
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
                            <Text style={styles.linebtn}>放弃发布</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{
                            this.setState({
                                visible:false
                            })
                        }}>
                            <Text style={styles.linebtn}>返回</Text>
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
        backgroundColor:'rgba(250,250,250,1)',
        borderRadius:10,
        height:0.325*height,
        marginBottom:0.015*height,
        paddingLeft:0.015*width,
        paddingRight:0.015*width,
    },
    lockbox:{
        width:0.86*width,
        height:0.05*height,
        // backgroundColor:'#ccc',
        marginLeft:'auto',
        marginRight:'auto',
        flexDirection:'row',
        alignItems:'center'
    },
    lock:{
        width:0.3*width,
        height:0.05*height,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginRight:0.31*width,
        // backgroundColor:'#ddffcc'
    },
    lockicon:{
        width:0.05*width,
        textAlign:'center',
        fontSize:40*s,
        color:'#FFBF2D',
        // backgroundColor:'#ffeeaa'
    },
    locktext:{
        width:0.13*width,
        height:0.03*height,
        textAlignVertical:'bottom',
        textAlign:'center',
        fontSize:18*s,
        color:'#bdbbb8',
        // backgroundColor:'#ffeeff'
    },
    pickerbox:{
        textAlign:'right',
        marginTop:-0.005*height,
        // backgroundColor:'#aaffee'
    },
    tagicon:{
        fontSize:50*s,
        color:'#FFBF2D'
    },
    picker:{
        width:0.15*width,
        height:0.03*height,
        color:'#333',
    },
    content:{
        height:0.245*height,
        textAlignVertical:'top',
        lineHeight:0.03*height,
        fontSize:23*s,
        // backgroundColor:'#ccc',
        color:'#333'
    },
    tips:{
        fontSize:20*s,
        // backgroundColor:'#ccc',
        textAlign:'right',
        color:'#888'
    },
    num:{
        fontSize:23*s,
        color:'#000'
    },
    picsbox:{
        height:0.5*height,
        // backgroundColor:'#ccc'
    },
    tip:{
        fontSize:20*s,
        width:0.85*width,
        height:0.035*height,
        textAlignVertical:'center',
        marginLeft:'auto',
        marginRight:'auto',
        // backgroundColor:'#ccc',
        textAlign:'left',
        color:'#888'
    },
    pics:{
        width:0.87*width*0.33,
        height:0.45*height*0.33,
        margin:0.01*width
    },
    nullwingblank:{
        height:0.5*height,
        marginTop:0.5*height,
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
        marginTop:0.01*height,
        marginBottom:0.01*height,
    },
})
