import React, { Component } from 'react'
import { 
    Text, 
    View,
    StyleSheet,
    Dimensions,
    FlatList,
    ImageBackground,
} from 'react-native'
import { WingBlank } from '@ant-design/react-native'
import Icon1 from 'react-native-vector-icons/Feather'
import { Actions } from 'react-native-router-flux';
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
                    <Text 
                        style={{
                            width:0.6*width,
                            marginLeft:'auto',
                            marginRight:"auto",
                            textAlign:'center',
                            fontSize:20,
                            color:'#fff'
                        }}
                    >云相册</Text>
                </View>
                <WingBlank style={{flex:1}}>
                    <FlatList 
                        showsVerticalScrollIndicator={false}
                        ListFooterComponent={
                            <View style={{
                                width:'100%',
                                marginTop:10
                            }}>
                                <Text style={{
                                    width:'104%',
                                    marginLeft: '-2%',
                                    backgroundColor: '#ccc',
                                    height: 0.5,
                                }}></Text>
                                <Text style={{
                                    marginTop:-10,
                                    width:140*s,
                                    height:50,
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
                                            width:180*s,
                                            height:180*s,
                                            // backgroundColor:'#000',
                                            justifyContent:'center',
                                            alignItems:'center'
                                        }}
                                    >
                                        <ImageBackground
                                            style={{ 
                                                height: 200, 
                                                width: 200,
                                                transform: [{scale:0.9}]
                                            }}
                                            resizeMode="cover"
                                            source={{uri:`${item.background}`}}
                                        />
                                    </View>
                                    <View style={{
                                        width:180*s,
                                        height:180*s,
                                    }}>
                                        <Text>{item.name}</Text>
                                    </View>
                            </View>
                        )}
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
        paddingRight:0.05*width,
        justifyContent:"center"
    },
    icon:{
        color:'#fff',
        fontSize:30
    },
    scrollView: {
        backgroundColor: '#fff',
        paddingLeft:10,
        paddingTop:5,
        paddingRight:10,
        marginBottom:60,
    },
    cpicture_block:{
        width:200,
        height:200
    }
})
