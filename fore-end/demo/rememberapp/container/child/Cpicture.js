import React, { Component } from 'react'
import { 
    Text, 
    View,
    StyleSheet,
    Dimensions,
    FlatList,
    ImageBackground,
    Image,
} from 'react-native'
import Button from 'react-native-button'
import { WingBlank } from '@ant-design/react-native'
import Icon1 from 'react-native-vector-icons/Feather'
import Icon2 from 'react-native-vector-icons/Ionicons'
import { Actions } from 'react-native-router-flux';
import { TouchableOpacity } from 'react-native-gesture-handler'
const {width,scale,height} = Dimensions.get('window');
const s = width / 640;
export default class Cdairy extends Component {
    constructor(){
        super();
        this.state={
            childPhotoListid:'',
            // cid:cid,
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
            ],
            code:""
        }
    }
    componentDidMount(){
        // fetch(`http://localhost:3001/child/cpictures?childsid=${this.state.cid}`)
        // .then((res)=>res.json())
        // .then((res)=>{
        //     console.log('点击云相册',res)
        //     this.setState({
        //         lists:res
        //     });
            
        // })
    }
    componentDidUpdate(){
        // fetch(`http://localhost:3001/child/cpictures?childsid=${this.state.cid}`)
        // .then((res)=>res.json())
        // .then((res)=>{
        //     console.log('点击云相册',res)
        //     this.setState({
        //         lists:res
        //     });
            
        // })
    }
    rmCpicture=(e)=>{
        e.target.parentNode.style.display = 'none';
        var  cpictureagain = document.getElementById('cpictureagain');
        cpictureagain.style.display = 'block';
        fetch(`http://localhost:3001/child/cpictures/crpictures?childsid=${this.state.cid}&childPhotoListid=${this.state.childPhotoListid}`)
        .then((res)=>res.json())
        .then((res)=>{
            console.log(res)
            this.setState({
                lists:res.data,
                code:res.msg
            }); 
        })
    }
    render() {
        const lists = this.state.lists;
        return (
            <View>
                <View style={styles.navbar}>
                    <Icon1 
                        style={styles.icon}
                        name='chevron-left'
                        onPress={()=>Actions.pop()}
                    />
                    <Text style={styles.title}>云相册</Text>
                </View>
                <WingBlank style={{
                    marginBottom:10
                }}>
                    <FlatList 
                        showsVerticalScrollIndicator={false}
                        ListFooterComponent={
                            <View style={{
                                width:'100%',
                                marginTop:30
                            }}>
                                <Text style={{
                                    width:'104%',
                                    marginLeft: '-2%',
                                    backgroundColor: '#000',
                                    height: 0.8,
                                }}></Text>
                                <Text style={{
                                    marginTop:-10,
                                    width:200*s,
                                    textAlign:'center',
                                    marginLeft:'auto',
                                    marginRight:'auto',
                                    backgroundColor:'#fff',
                                    fontSize:15,
                                    color:'#bdbbb8'
                                }}>底儿都被你看完了</Text>
                            </View>
                        }
                        style={styles.scrollView}
                        data={lists}
                        numColumns={1}
                        renderItem={({item})=>(
                            <View style={styles.cpicture_block}>
                                    <View
                                        style={{
                                            height:330*s,
                                            justifyContent:'center',
                                            alignItems:'center'
                                        }}
                                    >
                                        <ImageBackground
                                            style={{ 
                                                height: 330*s, 
                                                width: '100%',
                                                transform: [{scale:0.9}]
                                            }}
                                            resizeMode="contain"
                                            // source={require("../../images/8.png")}
                                            source={{uri:`${item.background}`}}
                                        >
                                            <Button
                                                onPress={()=>Actions.cspictures()}
                                                style={{
                                                    height: 330*s, 
                                                    width: '100%',
                                                    textAlignVertical:'center',
                                                    color:'#fff',
                                                    fontSize:0,
                                                    opacity:0
                                                }}
                                            >
                                                轻触查看相册
                                            </Button>
                                        </ImageBackground>
                                    </View>
                                    <View style={{
                                        width:'100%',
                                        height:70*s,
                                        paddingLeft:20*s,
                                        paddingRight:20*s,
                                        borderColor:'#bdbbb8',
                                        borderStyle:'solid',
                                        borderTopWidth:0.5,
                                        margin:0,
                                        flexDirection: 'row',
                                        justifyContent:'center',

                                    }}>
                                        <Text
                                            style={{
                                                fontSize:25*s,
                                                color:'#333',
                                                width:480*s,
                                                textAlignVertical:'center'

                                            }}
                                        >{item.name}</Text>
                                        <Icon2
                                            name='ios-trash'
                                            size={28}
                                            color='#333'
                                            style={{
                                                textAlignVertical:'center'
                                            }}
                                        />
                                    </View>
                            </View>
                        )}
                        />  
                </WingBlank>
                <View
                    style={{
                        width:'100%',
                        height:50,
                        justifyContent:'center',
                        // backgroundColor:'#000',
                        paddingTop:20
                    }}
                >
                    <Text style={{
                        width:0.95*width,
                        marginLeft:'auto',
                        marginRight:'auto',
                        backgroundColor: '#FFBF2D',
                        // backgroundColor: '#bdbbb8',
                        height: 2*s,
                    }}></Text>
                    <Icon2
                        onPress={()=>{Actions.ccpictures()}} 
                        style={{
                            marginTop:-23,
                            width:80*s,
                            textAlign:'center',
                            marginLeft:'auto',
                            marginRight:'auto',
                            backgroundColor:'#fff',
                            color:'#FFBF2D'
                        }}
                        size={45}
                        name='md-add-circle-outline'
                    />
                </View>
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
        marginTop:50*s,
        // backgroundColor: '#000',
        backgroundColor: '#fff',
        paddingLeft:10,
        paddingRight:10,
        height:900*s
    },
    cpicture_block:{
        marginTop:20*s,
        // backgroundColor:'#000'
        height:400*s,
        borderRadius:5,
        borderStyle:'solid',
        borderWidth:1.5,
        borderColor:'#ccc',
        // borderColor:'#bdbbb8',
    }
})
