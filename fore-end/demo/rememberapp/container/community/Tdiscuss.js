import React, { Component } from 'react'
import { 
    Text, 
    View,
    StyleSheet,
    Dimensions,
    FlatList,
    Image,
    Alert,
    ImageBackground,
    TouchableOpacity
} from 'react-native'
import moment from 'moment'
import { Actions } from 'react-native-router-flux';
import { WingBlank } from '@ant-design/react-native';
import {myFetch} from '../../src/utils'
import Icon1 from 'react-native-vector-icons/Feather'
import Icon2 from 'react-native-vector-icons/Entypo'
import Icon3 from 'react-native-vector-icons/Ionicons'
import Icon4 from 'react-native-vector-icons/SimpleLineIcons'
import Icon5 from 'react-native-vector-icons/Fontisto'
const {width,scale,height} = Dimensions.get('window');
const s = width / 640;
const image = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587984040970&di=7e865af6555429dd11f70d1928f46878&imgtype=0&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D2381951604%2C3164827774%26fm%3D214%26gp%3D0.jpg'
export default class Cdairy extends Component {
    constructor(){
        super();
        this.state={
            cid:'',
            lists:[]
        }
    }
    componentDidMount(){
        this.setState({
            cid:this.props.cid
        })
        myFetch.get('/child/cdairy',{
            childsid:this.props.cid,
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
        })
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            lists:nextProps.data
        })
    }
    rmCdiary=(e)=>{
        var rmname = e.name;
        Alert.alert('提示', '确定要删除吗？',
            [
                { text: "确定", onPress: ()=>{
                    myFetch.get('/child/cdairy/crdairy',{
                        childsid:this.state.cid,
                        childDiaryid:e.id,
                    }).then(res=>{
                        // console.log('删除')
                        console.log(res.data)
                        if(res.data){
                            this.setState({
                                lists:res.data
                            })
                        }else{
                            this.setState({
                                lists:[]
                            })
                        }
                        ToastAndroid.showWithGravityAndOffset(
                            rmname+'，'+res.msg+'！',
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER,
                        25,-100)
                    })
                } },
                { text: "返回", onPress: this.opntion2Selected },
            ]
        )
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
                    <Text style={styles.title}>评论</Text>
                    <Icon3 style={styles.icon}/>
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
})
