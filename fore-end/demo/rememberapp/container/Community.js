import React, { Component } from 'react'
import { 
    Text, 
    StyleSheet, 
    Dimensions, 
    View, 
    Image, 
    TouchableOpacity, 
    AsyncStorage,
    StatusBar,
    ScrollView,
    FlatList,
    ImageBackground,
    DrawerLayoutAndroid
} from 'react-native'
import {
    Actions
} from 'react-native-router-flux'
import { Flex, WingBlank } from '@ant-design/react-native'
import Icon1 from 'react-native-vector-icons/Feather'
import ImagePicker from 'react-native-image-picker'
// import ImagePicker from 'react-native-image-crop-picker'
const { width, scale, height } = Dimensions.get('window');
const s = width / 411;
const s1 = width / 640;
const h = height / 1012;
const image = 'http://img.zcool.cn/community/019de45c32c171a80121df90bbe9ca.jpg@1280w_1l_2o_100sh.jpg'
export default class Lover extends Component {
    constructor(props){
        super(props);
        // var uid = JSON.parse(localStorage.getItem('uid'));
        this.state={
        }
    }
    componentDidMount(){
        console.log('state'+this.state.times+'第一次加载');
       
    }
    componentDidUpdate(prevProps,prevState){
        console.log('更新')
    
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
                <View style={styles.navbar}>
                    <Icon1 style={styles.icon}/>
                    <Text style={styles.title}
                    >社区</Text>
                    <TouchableOpacity onPress={this.compile}>
                        <Icon1 style={styles.icon} name='more-horizontal'/>
                    </TouchableOpacity>
                </View>
               
            </View>
        )
    }
}
const styles = StyleSheet.create({
    navbar:{
        width:width,
        height:65*s1,
        backgroundColor:'#FFBF2D',
        flexDirection: 'row',
        paddingTop:'1%',
        justifyContent:"center",
        paddingRight: 0.03 * width,
        paddingLeft: 0.03 * width,

    },
    icon: {
        width: 0.08 * width,
        color: '#fff',
        fontSize: 30,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        letterSpacing: 3,
        color: "#ffff",
        marginLeft: 'auto',
        marginRight: "auto",
        textAlign: 'center',
    },
    icon:{
        width:0.08*width,
        color:'#fff',
        fontSize:30,
    },
    lover_first: {
        textAlign: "center",
        height: 0.33*height,
        width: width,
        alignItems:'center'
    },
    bgbtn:{
        color: '#000',
        width:0.8*width,
        letterSpacing:3,
        height:0.05*height,
        backgroundColor: 'rgba(255,191,45,0.2)',
        textAlignVertical:'center',
        marginTop:0.01*height,
        color:'#fff',
        fontSize:23*s1,
        marginLeft:'auto',
        marginRight:'auto',
        textAlign:'center',
        borderRadius:5
        // backgroundColor: 'rgba(255,255,255,0.3)',

    },
    lover_second: {
        marginBottom:15,
        width:'100%',
        height: 140*h,
        flexDirection: "column",
        justifyContent: "center",
        marginLeft:'auto',
        marginRight:'auto'
    },
    btn: {
        padding:0,
        height: 55*h,
        width: "31%",
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        backgroundColor: '#FFBF2D',
        borderRadius: 5,
    },
    blockbtn:{ 
        textAlign: "center", 
        fontSize: 20,
        textAlignVertical:'center', 
        lineHeight: 55*h, 
        color: "#fff" 
    },
    scrollView: {
        backgroundColor: '#fff',
        paddingLeft:10,
        paddingTop:5,
        paddingRight:10,
        marginBottom:60,
    },
    child_third: {
        marginTop:15*h
    },
    line:{
        flexDirection: 'row',
        justifyContent:'space-between',
        backgroundColor: "#fff",
    }
})
