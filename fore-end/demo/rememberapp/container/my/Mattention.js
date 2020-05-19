import React, { Component } from 'react'
import { 
    Text, 
    View,
    StyleSheet,
    Dimensions,
    FlatList,
    Image,
    AsyncStorage,
    ImageBackground,
    TouchableOpacity,
    ToastAndroid,
    Alert
} from 'react-native'
import moment from 'moment'
import {myFetch} from '../../src/utils'
import { Actions } from 'react-native-router-flux';
import { WingBlank } from '@ant-design/react-native';
import Icon1 from 'react-native-vector-icons/Feather'
import Button from 'react-native-button';
const {width,scale,height} = Dimensions.get('window');
const s = width / 640;
const h = height / 1012;
export default class Mattention extends Component {
    constructor(){
        super();
        this.state={
            uid:'',
            lists:[
                // {
                //     bgimg:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587617812981&di=6b4348589fe3b0e92c60cea8e5ed1f53&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201511%2F21%2F20151121170247_xFGX5.thumb.1000_0.jpeg',
                //     name:'放羊的星星'
                // },
                // {
                //     bgimg:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587617812980&di=74e5dafd88ab19e6163d9447f46f4b1d&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201511%2F21%2F20151121170707_UTSG4.jpeg',
                //     name:'是小浣熊呀'
                // },
                // {
                //     bgimg:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587617812979&di=cde75f808e79034e3c667625b59affd0&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201511%2F21%2F20151121170646_SxiWE.thumb.700_0.jpeg',
                //     name:'她家住在沙漠 -'
                // },
                // {
                //     bgimg:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=585439234,4032105308&fm=26&gp=0.jpg',
                //     name:'It is really good'
                // },
                // {
                //     bgimg:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587621796760&di=9191e75ca03dc3cd484757b702f4f075&imgtype=0&src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20190504%2F20%2F1556974296-MjKFpzlJys.jpeg',
                //     name:'piapiapia! biubiubiu!'
                // },
                // {
                //     bgimg:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587617812978&di=6cb77f5505fdb1394b2fa1ad214bc7e7&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201511%2F21%2F20151121170552_v4CWj.jpeg',
                //     name:'我宣你啊！'
                // },
            ],
        }
    }
    componentDidMount(){
        console.log('关注');
        AsyncStorage.getItem('user').
        then((res)=>{
            var user = JSON.parse(res)
            this.setState({
                uid:user.id
            })
            console.log('-------------------');
            myFetch.get('/my/mypage/focusmsg',{
                user_id:this.state.uid
            }).then(res=>{
                if(res){
                    this.setState({
                        lists:res.data
                    })
                   console.log(res);
                }else{
                    console.log('失败');
                }
            })
        })
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            lists:nextProps.data
        })
    }
    rmCevent = (e)=>{
        Alert.alert('提示', '确定取关吗？',
            [
                { text: "确定", onPress: ()=>{
                    myFetch.get('/my/friends/delfriend',{
                        friend_id:e.id,
                    }).then(res=>{
                        if(res){
                            this.setState({
                                lists:res
                            })
                        }else{
                            this.setState({
                                lists:[]
                            })
                        }
                        ToastAndroid.showWithGravityAndOffset(
                           '取关成功！',
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER,
                        25,-100)
                    })
                } },
                { text: "取消", onPress: this.opntion2Selected },
            ]
        )
    }
    // alertMsg = () => {
    //     Alert.alert(
    //         '提示',
    //         '确认取消关注？',
    //         [
    //             {
    //                 text: '确定', onPress: () => {
    //                     ToastAndroid.show('取关成功！', ToastAndroid.SHORT)
    //                 }
    //             },
    //             { text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
    //         ],
    //     );
    // }
    render() {
        return (
            <View>
                <View style={styles.navbar}>
                    <Icon1 
                        style={styles.icon}
                        name='chevron-left'
                        onPress={()=>Actions.pop()}
                    />
                    <Text style={styles.title}>我的关注</Text>
                </View>
                <WingBlank style={styles.wingblank}>
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
                                    width:150*s,
                                    height:50,
                                    textAlign:'center',
                                    marginLeft:'auto',
                                    marginRight:'auto',
                                    backgroundColor:'#fff',
                                    fontSize:15,
                                    color:'#bdbbb8'
                                }}>人家是有底线哒</Text>
                            </View>
                        }
                        style={styles.scrollView}
                        data={this.state.lists}
                        numColumns={1}
                        renderItem={({item})=>{
                            var iconcolor = '#ffffff';
                            var textcolor = '#000000';
                            var weathercolor = '#cccccc';
                            var titlecolor = '#000000'
                            if(item.content == 'undefined'){
                                item.content = '（您没有添加文字内容哦~）';
                            }
                            if(item.bgcolor == '#ffffff'){
                                iconcolor = '#FFBF2D'
                            }
                            if(item.bgcolor == '#000000'){
                                titlecolor = '#ffffff'
                                textcolor = '#ffffff'
                            }
                            if(item.weather == 'day-sunny' || item.weather == 'night-clear'){
                                weathercolor = '#FFBF2D'
                                if(item.bgcolor == 'orange'){
                                    weathercolor = '#ffffff'
                                }
                            }
                            return <View 
                                style={{
                                    borderRadius:10,
                                    width:0.87*width,
                                    height:0.10*height,
                                    marginTop:20*s,
                                    borderWidth:5,
                                    borderColor:'rgba(204,204,204,0.1)',
                                    flexDirection:'row',    
                                    alignItems:'center'
                                }}
                            >
                                <View style={{width:'15%',marginLeft:'7%',height:'100%',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                    <Image style={{width:70*h,height:70*h,borderRadius:60,borderColor:'#FFBF2D',borderWidth:2}} source={{uri:`${item.bgimg}`}} />
                                </View>
                                <View style={{width:'42%',marginLeft:'5%',height:'100%',flexDirection:'row',alignItems:'center'}}>
                                    <Text style={{fontSize:16}}>{item.name}</Text>
                                </View>
                                <Button
                                    onPress={this.alertMsg} 
                                    style={styles.btn}
                                    >取消关注</Button>
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
        letterSpacing:3,
        fontWeight:'bold'
    },
    scrollView: {
        backgroundColor: '#fff',
        paddingLeft:0.03*width,
        paddingRight:0.03*width,
        paddingTop:5,
        // marginBottom:60,
    },
    btn:{
        width:'100%',
        height:60*s,
        marginTop:10*s,
        marginLeft:'2%',
        marginRight:'2%',
        backgroundColor:'#FFBF2D',
        borderWidth:1,
        borderStyle:'solid',
        borderColor:'#FFBF2D',
        borderRadius:5,
        color:'white',
        fontSize:17,
        textAlignVertical:'center'
    }
})
