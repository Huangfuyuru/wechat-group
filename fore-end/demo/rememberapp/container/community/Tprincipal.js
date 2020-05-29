import React, { Component } from 'react'
import { 
    Text, 
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image,
    FlatList,
    ImageBackground
 } from 'react-native'
import Icon1 from 'react-native-vector-icons/Feather'
import Icon3 from 'react-native-vector-icons/Ionicons'
import { WingBlank } from '@ant-design/react-native';
import {myFetch} from '../../src/utils'
import { Actions } from 'react-native-router-flux';
const image2 = 'http://tc.sinaimg.cn/maxwidth.2048/tc.service.weibo.com/p/image_96weixin_com/9a6afdf6ff7c953f04675270477405b0.jpg'
const {width,scale,height} = Dimensions.get('window');
const s = width / 640;
const c = '你爱自由胜过爱我 可是我偏偏偏爱缠绵胜过洒脱 我们的契合是最美丽的花火 惊艳了时光却照不亮挑剔的生活'
export default class Tprincipal extends Component {
    constructor(){
        super();
        this.state={
            uid:'',
            list:[1,1,1,1,1,1],
            llist:[1,1,1,1,1,1],
            current:'',
            concernnum:389000,
            fansnum:389000,
            onPress:0
        }
    }
    componentDidMount(){
        this.setState({
            uid:this.props.uid
        })
        // myFetch.get('/my/myarticle/mypublish',{
        //     uid:user.id
        // }).then(res=>{
        //     console.log(res.data)
        //     for(var i in res.data){
        //         if(!res.data[i].pic){
        //             res.data[i].pic=image3
        //         }
        //         if(!res.data[i].imgurl){
        //             res.data[i].imgurl=[image2]
        //         }
        //         // console.log(res.data[i].imgurl)
        //     }
        //     this.setState({
        //         rlists:res.data,
        //         refreshing:false,
        //     })
            
        // })
    }
    render() {
        const tabs = [
            {title : '作品'},
            {title : '喜欢'},
        ];
        return (
            <View>
                <View style={styles.navbar}>
                    <TouchableOpacity onPress={()=>Actions.pop()}>
                        <Icon1 style={styles.icon} name='chevron-left'/>
                    </TouchableOpacity>
                    <Text style={styles.title}>主页</Text>
                    <TouchableOpacity>
                        <Icon3 style={styles.icon}  name=''/>
                    </TouchableOpacity>
                </View>
                <View style={styles.titlebox}>
                    <Image 
                        style={styles.upic}
                        source={{uri:`${this.props.upic}`}}
                    />
                    <Text style={styles.uname}>{this.props.uname}</Text>
                    <View style={styles.numbox}>
                        <TouchableOpacity>
                            <Text style={styles.num}>粉丝： {this.state.fansnum<10000?this.state.fansnum:(this.state.fansnum/10000).toFixed(1)+'万'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.num}>关注： {this.state.concernnum<10000?this.state.concernnum:(this.state.concernnum/10000).toFixed(1)+'万'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {tabs.map((item, i) => (
                    <TouchableOpacity
                        onPress={()=>{
                        this.setState({onPress:i},()=>{
                            switch(i){
                                case 0:
                                    this.my();
                                    break;
                                case 1:
                                    this.like();
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
                <WingBlank style={styles.inner}>
                    <FlatList
                        // refreshing = {this.state.refreshing}
                        // onRefresh={this.refreshRecommend}
                        extraData={this.state}
                        data={this.state.list}
                        horizontal={false}
                        numColumns={3}
                        // initialNumToRender={3}
                        pagingEnabled={true}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item})=>{
                            return<View style={styles.innerblock}>
                                <TouchableOpacity>
                                    <ImageBackground
                                        resizeMode="cover"
                                        style={styles.backgroundimg}
                                        source={{uri:`${image2}`}}
                                        alt='发布图片'>
                                            <View style={styles.contentbox}>
                                                <Text style={styles.innercontent}>{c? (c.length > 15 ? c.substr(0, 15) + " . . . " : c) : ""}</Text>
                                                {/* <Text style={styles.innercontent}>end</Text> */}
                                                {/* <Text style={styles.innercontent}>{item.content ? (item.content.length > 15 ? item.content.substr(0, 15) + " . . . " : item.content) : ""}</Text> */}
                                            </View>
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
    titlebox:{
        height:0.15*height,
        // backgroundColor:'#FFBF2D',
        // backgroundColor:'#FFF',
        flexDirection:'row',
        backgroundColor:'rgba(255,191,45,0.7)',
        alignItems:'center',
        paddingLeft:0.05*width
    },
    upic:{
        width:0.1*height,
        height:0.1*height,
        borderRadius:100,
        marginRight:0.03*width
    },
    uname:{
        fontSize:0.04*width,
        color:'#333',
        marginRight:0.2*width
    },
    numbox:{
        // backgroundColor:'#ccc',
        width:0.3*width,
        height:0.08*height,
        justifyContent:'space-around'
    },
    num:{
        // backgroundColor:'#ccc',
        // backgroundColor:'#000',
        textAlignVertical:'center',
        height:0.025*height,
        color:'#000',
        fontSize:0.03*width
    },
    inner:{
        backgroundColor:'#ccc',
        marginTop:0.01*height,
        height:0.73*height,
        alignItems:'center'
    },
    innerblock:{
        width:0.29*width,
        height:0.2*height,
        backgroundColor:'#fff',
        marginRight:0.01*width,
        marginLeft:0.01*width,
        marginTop:0.01*width,
    },
    backgroundimg:{
        width:'100%',
        height:'100%',
        transform:[{scale:0.97}],
        justifyContent:'flex-end'
    },
    contentbox:{
        maxHeight:0.06*height,
        // backgroundColor:'#000',
        overflow:'hidden',
        backgroundColor:'rgba(0,0,0,0.3)',
        // backgroundColor:'rgba(255,255,255,0.5)',
        padding:0.01*width
        
    },
    innercontent:{
        color:'#fff',
        fontSize:0.032*width,
        lineHeight:0.025*height
    }
})