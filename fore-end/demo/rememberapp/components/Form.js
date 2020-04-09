import React, { Component } from 'react'
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    ToastAndroid,
} from 'react-native'
import moment from 'moment';
import Button from 'react-native-button'
import { Pagination} from '@ant-design/react-native';
import Icon from 'react-native-vector-icons/Feather'
import { Actions } from 'react-native-router-flux';
const {width,scale} = Dimensions.get('window');
const s = width / 640;

export default class Form extends Component {
    constructor(){
        super();
        this.state = {
            tits:[],
            page:1,
            isLoading:true
        }
    }
    componentDidMount(){
        fetch('https://cnodejs.org/api/v1/topics?limit=15')
        .then(res=>res.json())
        .then(res=>{
            this.setState({
                tits:res.data,
                isLoading:false

            })
        })
    }
    getData =()=>{
        fetch('https://cnodejs.org/api/v1/topics/?page='+this.state.page+'&limit=15')
        .then(res=>res.json())
        .then(res=>{
            this.setState({
                tits:res.data,
            })
        });
    }
    render() {
        return (
            <View>
                <View style={styles.navbar}>
                    <Icon 
                        style={styles.icon}
                        name='chevron-left'
                        onPress={()=>Actions.pop()}
                    />
                    <Text 
                        style={{
                            width:"60%",
                            marginLeft:'auto',
                            marginRight:"auto",
                            textAlign:'center',
                            fontSize:20,
                            color:'#fff'
                        }}
                    >我的发布</Text>
                    <Icon
                        style={styles.icon}
                        name='more-horizontal'
                    />
                </View>
                {
                    this.state.isLoading
                    ?<View
                        style={{
                            width:'100%',
                            height:200,
                            justifyContent:'center',
                            backgroundColor:'#fff'
                        }}>
                        <Text
                            style={{
                                width:'60%',
                                height:50,
                                marginLeft:'auto',
                                textAlign:'center',
                                marginRight:'auto',
                                fontSize:20,
                                color:'#333',
                                textAlignVertical:'center',
                                borderRadius:10,
                            }}
                        >加载中……</Text>
                    </View>
                    :null
                }
                <View
                    style={styles.lists}
                >
                    {
                        this.state.tits.map((item)=>{
                            var status = '';
                            var stylestate ='';
                            var statusCode = Math.floor(Math.random()*10);
                            item.create_at = moment(item.create_at).format("YYYY-MM-DD")
                            if( statusCode % 2 == 0){
                                status = 
                                    <Text style={styles.replied}>
                                        已回复
                                    </Text>
                            }else{

                                status = 
                                    <Text style={styles.replay}>
                                        待回复
                                    </Text>
                            }
                            return <View style={styles.listsdata}>
                                <Text 
                                    numberOfLines={1}
                                    ellipsizeMode = 'tail'
                                    style={{
                                        fontSize:14,
                                        width:'50%'
                                    }}
                                >{item.title}</Text>
                                <Text
                                    style={{
                                        color:"#333",
                                        marginRight:25,
                                        fontSize:14,
                                        marginLeft:63
                                    }}
                                >{item.create_at}</Text>
                                <Text>
                                    {status}
                                </Text>
                            </View>
                        })
                    }
                </View>
                <View 
                    style={styles.pages}    
                >
                    <Button 
                        style={styles.btn}
                        onPress={(e)=>{
                            this.setState({
                            page:this.state.page-1
                            },()=>{
                                if(this.state.page <= 0){
                                    ToastAndroid.show('已经是第1页！',ToastAndroid.SHORT)
                                    this.setState({
                                        page:1
                                    })
                                }
                                this.getData();
                            })
                        }}
                    >
                        上一页
                    </Button>
                    <Text
                        style={{
                            width:'47%',
                            height:50*s,
                            justifyContent:'center',
                            letterSpacing:8,
                            textAlign:'center',
                            fontSize:18
                        }}
                    >第{this.state.page}页
                    </Text>
                    <Button 
                        style={styles.btn}
                        onPress={()=>{
                            this.setState({
                                page:this.state.page+1
                            },()=>{
                                this.getData()
                            })
                        }}
                    >
                        下一页
                    </Button>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    navbar:{
        width:'100%',
        height:65*s,
        backgroundColor:'#f23030',
        flexDirection: 'row',
        paddingLeft:'3%',
        paddingTop:'1%',
        paddingRight:'5%',
        justifyContent:"center"
    },
    icon:{
        color:'#fff',
        fontSize:30
    },
    lists:{
        backgroundColor:'#fff',
        paddingTop:10,
        height:620,
        paddingLeft:'5%',
        paddingRight:'3%'
    },
    listsdata:{
        width:'100%',
        height:40,
        borderColor:'#eee',
        borderBottomWidth:0.3,
        lineHeight:40,
        flexDirection:'row',
        paddingTop:10
    },
    replied:{
        color:'#333',
        fontSize:14,
    },
    replay:{
        color:'#f23030',
        fontSize:14,
    },
    pages:{
        width:'100%',
        flexDirection:'row',
        backgroundColor:'#fff',
        paddingTop:20,
        paddingBottom:20,
        paddingLeft:'5%',
        paddingRight:'5%',
        justifyContent:'center'
    },
    btn:{
        width:150*s,
        height:50*s,
        backgroundColor:'#f23030',
        color:'#fff',
        textAlignVertical:'center',
        borderRadius:30

    }
})