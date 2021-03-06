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
            lists:[],
            num1:0,
            back: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3825009501,3483030709&fm=15&gp=0.jpg',

        }
    }
    componentDidMount(){
        AsyncStorage.getItem('user').
        then((res)=>{
            var user = JSON.parse(res)
            this.setState({
                uid:user.id
            })
            myFetch.get('/my/mypage/focusmsg',{
                user_id:this.state.uid
            }).then(res=>{
                if(res){
                    this.setState({
                        lists:res.data
                    })
                }else{
                    console.log('失败');
                }
            })
            myFetch.get('/my/mypage/focus',{
                user_id:this.state.uid
            }).then(res=>{
                if(res){
                    this.setState({
                        num1:res.data.length
                    })
                }else{
                    console.log('关注数据返回失败');
                }
            })
        })
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            lists:nextProps.data
        })
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
                    <Text style={styles.title}>我的关注</Text>
                </View>
                <View style={{width:'100%',height:30*s,marginTop:'2%', marginLeft:'6%',fontWeight:'bold'}}>
                    <Text style={{fontSize:17, color:'#FFBF2D'}}>关注人数：{this.state.num1}</Text>
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
                                    borderColor:'rgba(204,204,204,0.3)',
                                    flexDirection:'row',    
                                    alignItems:'center'
                                }}
                            >
                                {
                                    item.imgurl?
                                    <View style={{width:'30%',marginLeft:'7%',height:'100%',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                        <Image style={{width:70*h,height:70*h,borderRadius:60,borderColor:'#FFBF2D',borderWidth:2}} source={{uri:`${item.imgurl}`}} />
                                    </View>
                                    :
                                    <View style={{width:'30%',marginLeft:'7%',height:'100%',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                        <Image style={{width:70*h,height:70*h,borderRadius:60,borderColor:'#FFBF2D',borderWidth:2}} source={{uri: this.state.back}} />
                                    </View>
                                }
                                
                                <View style={{width:'40%',marginLeft:'5%',height:'100%',flexDirection:'row',alignItems:'center'}}>
                                    <Text style={{fontSize:16}}>id:&nbsp;&nbsp;&nbsp;{item.name}</Text>
                                </View>
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
