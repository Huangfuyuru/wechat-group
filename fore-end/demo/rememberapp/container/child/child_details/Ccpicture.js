import React, { Component } from 'react'
import { 
    Text, 
    View,
    StyleSheet,
    Dimensions,
    FlatList,
    Alert,
    ToastAndroid,
    Image,
    ImageBackground,
    TouchableOpacity
} from 'react-native'
import Icon1 from 'react-native-vector-icons/Feather'
import Icon2 from 'react-native-vector-icons/FontAwesome'
import Icon3 from 'react-native-vector-icons/Fontisto'
import { Actions } from 'react-native-router-flux';
import { TextInput } from 'react-native-gesture-handler';
import { WingBlank, ImagePicker } from '@ant-design/react-native';
import Button from 'react-native-button';
const {width,scale} = Dimensions.get('window');
const s = width / 640;
export default class Cdairy extends Component {
    constructor(){
        super();
        this.state={
            background:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586712889480&di=9c4a333188094ae5642b0487ec2bd34f&imgtype=0&src=http%3A%2F%2Fwx2.sinaimg.cn%2Flarge%2F007bRu2Ggy1gbtrl6i7ezj30rs0fme2h.jpg',
            lists:[
                {
                    name:'我的相册',
                    pid:1,
                    background:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586712889480&di=9c4a333188094ae5642b0487ec2bd34f&imgtype=0&src=http%3A%2F%2Fwx2.sinaimg.cn%2Flarge%2F007bRu2Ggy1gbtrl6i7ezj30rs0fme2h.jpg'
                },
                {
                    name:'我的相册',
                    pid:1,
                    background:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586712889480&di=9c4a333188094ae5642b0487ec2bd34f&imgtype=0&src=http%3A%2F%2Fwx2.sinaimg.cn%2Flarge%2F007bRu2Ggy1gbtrl6i7ezj30rs0fme2h.jpg'
                },
                {
                    name:'我的相册',
                    pid:1,
                    background:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586712889480&di=9c4a333188094ae5642b0487ec2bd34f&imgtype=0&src=http%3A%2F%2Fwx2.sinaimg.cn%2Flarge%2F007bRu2Ggy1gbtrl6i7ezj30rs0fme2h.jpg'
                },
                {
                    name:'我的相册',
                    pid:1,
                    background:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586712889480&di=9c4a333188094ae5642b0487ec2bd34f&imgtype=0&src=http%3A%2F%2Fwx2.sinaimg.cn%2Flarge%2F007bRu2Ggy1gbtrl6i7ezj30rs0fme2h.jpg'
                },
                {
                    name:'我的相册',
                    pid:1,
                    background:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586712889480&di=9c4a333188094ae5642b0487ec2bd34f&imgtype=0&src=http%3A%2F%2Fwx2.sinaimg.cn%2Flarge%2F007bRu2Ggy1gbtrl6i7ezj30rs0fme2h.jpg'
                },
                {
                    name:'我的相册',
                    pid:1,
                    background:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586712889480&di=9c4a333188094ae5642b0487ec2bd34f&imgtype=0&src=http%3A%2F%2Fwx2.sinaimg.cn%2Flarge%2F007bRu2Ggy1gbtrl6i7ezj30rs0fme2h.jpg'
                },
                {
                    name:'我的相册',
                    pid:1,
                    background:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586712889480&di=9c4a333188094ae5642b0487ec2bd34f&imgtype=0&src=http%3A%2F%2Fwx2.sinaimg.cn%2Flarge%2F007bRu2Ggy1gbtrl6i7ezj30rs0fme2h.jpg'
                },
                {
                    name:'我的相册',
                    pid:1,
                    background:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586712889480&di=9c4a333188094ae5642b0487ec2bd34f&imgtype=0&src=http%3A%2F%2Fwx2.sinaimg.cn%2Flarge%2F007bRu2Ggy1gbtrl6i7ezj30rs0fme2h.jpg'
                },
            ],
        }
    }
    setbackground = ()=>{

    }
    choosepictures = ()=>{

    }
    takephoto = ()=>{

    }
    additem = ()=>{
        ToastAndroid.show("创建成功!", ToastAndroid.SHORT);
    }
    render() {
        const lists = this.state.lists
        return (
            <View>
                <View style={styles.navbar}>
                    <Icon1 
                        style={styles.icon}
                        name='chevron-left'
                        onPress={()=>Actions.pop()}
                    />
                    <Text style={styles.title}>创建相册</Text>
                </View>
                <WingBlank style={{
                    marginTop:30*s
                }}>
                    <View style={styles.msg}>
                        <Text style={styles.text}>相册名称：</Text>
                        <TextInput
                            maxLength={10}
                            onFocus={()=>{
                                ToastAndroid.showWithGravityAndOffset(
                                    '请保证相册名称不多于10个字！',
                                ToastAndroid.SHORT,
                                ToastAndroid.TOP,
                                25,100)
                            }}
                            placeholder='请输入相册名称'
                            style={styles.input}/>
                    </View>
                    <TouchableOpacity
                        onPress={this.setbackground}
                        style={styles.coverbox}>
                        <Text
                        style={styles.textbtn}>轻触设置封面</Text>
                        <Image
                            style={styles.cover}
                            resizeMode="contain"
                            source={{uri:`${this.state.background}`}}
                        />
                    </TouchableOpacity>
                    <View style={styles.choose}>
                        <View style={{
                            width:0.85*width,
                            height:50*s,
                            flexDirection: 'row',
                            justifyContent:'space-between',
                            textAlignVertical:'center',
                            marginBottom:0.01*width
                        }}>
                            <Text
                            style={styles.textbtn}>添加图片</Text>
                            <View style={{
                                flexDirection: 'row',
                                textAlignVertical:'center',
                            }}>
                                <TouchableOpacity onPress={this.choosepictures} >
                                    <Icon3 style={styles.btnicon} name='photograph'/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.takephoto}>
                                    <Icon1 style={styles.btnicon}  name='camera'/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <FlatList 
                        style={styles.picbox}
                        data={lists}
                        numColumns={3}
                        ListFooterComponent={
                            <View style={{
                                height:0.03*width
                            }}>
                            </View>
                        }
                        renderItem={({item})=>(
                            <Image
                                style={styles.pics}
                                resizeMode="cover"
                                source={{uri:`${item.background}`}}
                            />
                        )}
                        />  
                    </View>
                </WingBlank>
                <Button
                onPress={this.additem} 
                style={styles.addbtn}>创建相册</Button>
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
    msg:{
        width:0.85*width,
        height:60*s,
        paddingRight:0.05*width,
        // backgroundColor:'#000',
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:30*s,
        flexDirection: 'row',
        justifyContent:'center',
    },
    text:{
        textAlign:'center',
        textAlignVertical:'center',
        width:0.25*width,
        fontSize:26*s,
        color:'#333',
        // backgroundColor:'#000'
    },
    input:{
        width:0.5*width,
        borderColor:'#bdbbb8',
        borderStyle:'solid',
        borderBottomWidth:1,
        fontSize:26*s,
        textAlign:'center',
        color:'#333'
    },
    textbtn:{
        textAlign:'center',
        textAlignVertical:'center',
        width:0.25*width,
        height:45*s,
        fontSize:26*s,
        color:'#333',
        textAlignVertical:'center',
    },
    coverbox:{
        // backgroundColor:'#000',
        width:0.6*width,
        height:230*s,
        alignContent:'center',
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:20*s,
        justifyContent:'center',
        alignItems:'center'
    },
    cover:{
        width:0.5*width,
        height:180*s,
        borderColor:'#ccc',
        borderStyle:'solid',
        borderWidth:2,
        backgroundColor:'rgba(255,191,45,0.1)',
    },
    choose:{
        width:0.85*width,
        height:480*s,
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:30*s,
        justifyContent:'center',
        alignItems:'center',
        // backgroundColor:'#000',
        marginBottom:50*s

    },
    btnicon:{
        width:0.15*width,
        height: 50*s,
        textAlign:'center',
        fontSize:40*s,
        color:'#FFBF2D',
        textAlignVertical:'center',
    },
    picbox:{
        padding:0.01*width,
        width:0.8*width,
        borderColor:'rgba(204,204,204,0.3)',
        borderStyle:'solid',
        borderWidth:2,
        backgroundColor:'rgba(255,191,45,0.1)'
    },
    pics:{
        width:0.237*width,
        height:180*s,
        margin:0.01*width,
        transform: [{scale:0.95}]
    },
    addbtn:{
        width:0.8*width,
        height:80*s,
        marginLeft:'auto',
        marginRight:'auto',
        backgroundColor:'rgba(255,255,255,0.1)',
        borderWidth:1,
        borderStyle:'solid',
        borderColor:'#FFBF2D',
        borderRadius:5,
        color:'#FFBF2D',
        fontSize:22,
        textAlignVertical:'center'
    }
})
