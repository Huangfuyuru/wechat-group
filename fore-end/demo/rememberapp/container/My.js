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
    Animated,
    ScrollView,
    FlatList,
    ImageBackground,
} from 'react-native'
import {
    Actions
} from 'react-native-router-flux'
import Icon1 from 'react-native-vector-icons/Feather'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import { Flex, WingBlank } from '@ant-design/react-native'
import ImagePicker from 'react-native-image-picker';
import ImageCropPicker from 'react-native-image-crop-picker';

const { width, scale, height } = Dimensions.get('window');
const s1 = width / 640;
const h = height / 1012;

const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
};
export default class My extends Component {
    constructor(){
        super();
        let data = [];
        for(var i=0; i<10; i++){
            data.push({tit:i,key:i});
        }
        this.state = {
            data,
            width: new Animated.Value(20),
            //头像地址
            imageUrl:require('..//images/head.png'),
            //关注人数
            num1:6,
            //粉丝人数
            num2:5
        }
    }
    takephoto = ()=>{
        ImageCropPicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
          }).then(image => {
            this.setState({imageUrl:{uri:image.path}})
          });
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
                    <View style={styles.icon}></View>
                    <Text style={styles.title}>我的</Text>
                    <TouchableOpacity onPress={()=>Actions.Use()}>
                        <Icon1 style={styles.icon}  name='settings'/>
                    </TouchableOpacity>
                </View>
                {/* 头像 */}
                <View style={{width:'100%',height:240*h,flexDirection:'row'}}>
                    <View style={{width:'50%',height:200*h,alignItems:'center',marginTop:20*h}}>
                        <TouchableOpacity onPress={()=>{this.takephoto()}}>
                            <Image style={{width:100*h,height:100*h,borderRadius:60,borderColor:'#FFBF2D',borderWidth:2}} source={this.state.imageUrl} />
                        </TouchableOpacity>
                        <Text style={{color:'#FFBF2D', fontWeight:'bold',fontSize:17,marginTop:10*h}}>小浣熊</Text>
                        <View style={{fontWeight:'bold',fontSize:17,width:'100%',justifyContent:'center',flexDirection:'row'}}>
                            <TouchableOpacity onPress={()=>{Actions.Mattention()}}>
                                <Text style={{color:'#FFBF2D'}}>关注:{this.state.num1}&nbsp;&nbsp;</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{Actions.Mfollowers()}}>
                                <Text style={{color:'#FFBF2D'}}>粉丝:{this.state.num2}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{width:'40%',height:240*h,alignItems:'center'}}>
                        <TouchableOpacity onPress={()=>Actions.Mychilds()} 
                            style={styles.btn}>
                            <Text style={styles.blockbtn}>亲子</Text >
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>Actions.Mylover()} 
                            style={styles.btn}>
                            <Text style={styles.blockbtn}>爱人</Text >
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>Actions.Myfriend()} 
                            style={styles.btn}>
                            <Text style={styles.blockbtn}>好友</Text >
                        </TouchableOpacity>
                    </View>
                    <View style={{width:'10%'}}></View>
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
        letterSpacing:3,
        fontWeight:'bold'
    },
    btn: {
        padding:0,
        height: 50*h,
        width: "50%",
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        backgroundColor: '#FFBF2D',
        borderRadius: 5,
    },
    blockbtn:{ 
        textAlign: "center", 
        fontSize: 18,
        textAlignVertical:'center', 
        lineHeight: 50*h, 
        color:'#fff'
    },
})
