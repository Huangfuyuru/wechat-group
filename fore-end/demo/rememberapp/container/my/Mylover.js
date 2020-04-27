// import React, { Component } from 'react'
// import { 
//     Text, 
//     TextInput,
//     StyleSheet, 
//     Dimensions, 
//     View, 
//     Image, 
//     FlatList,
//     TouchableOpacity, 
//     AsyncStorage,
//     ToastAndroid,
//     StatusBar,
//     Picker,
//     Alert,
// } from 'react-native'
// import {
//     Actions
// } from 'react-native-router-flux'
// import { Flex, WingBlank } from '@ant-design/react-native'
// import Button from 'react-native-button';
// import Icon1 from 'react-native-vector-icons/AntDesign'
// import Icon2 from 'react-native-vector-icons/Ionicons'
// import Icon3 from 'react-native-vector-icons/Feather'
// import Icon4 from 'react-native-vector-icons/FontAwesome'
// const { width, scale, height } = Dimensions.get('window');
// const s1 = width / 640;
// const s = width / 640;
// const h = height / 1012;
// export default class Mychilds extends Component {
//     constructor(){
//         super();
//         this.state={
//             arr: [
//                 {
//                     name: "小浣熊",
//                     sex: "女",
//                     date:"2020年1月31日"
//                 },
//                 // {
//                 //     name: "旺旺",
//                 //     sex: "男",
//                 //     date:"2008年5月4日"
//                 // },
//                 // {
//                 //     name: "皮卡丘",
//                 //     sex: "男",
//                 //     date:"1996年7月1日"
//                 // },
//                 // {
//                 //     name: "喵喵",
//                 //     sex: "女",
//                 //     date:"2002年1月1日"
//                 // },
//                 // {
//                 //     name: "皮卡丘",
//                 //     sex: "男",
//                 //     date:"1996年7月1日"
//                 // },
//             ]
//         }
//     }
    
//     alertMsg = () => {
//         Alert.alert(
//             '提示',
//             '确认删除？',
//             [
//                 {
//                     text: '确定', onPress: () => {
//                         ToastAndroid.show('删除成功！', ToastAndroid.SHORT)
//                     }
//                 },
//                 { text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
//             ],
//         );
//     }
    
//     render() {
//         const list = this.state.arr
//         return (
//             <View style={{ 
//                 width: width, 
//                 height: height, 
//                 backgroundColor: "#fff",
//             }}>
//                 <StatusBar 
//                     backgroundColor='#FFBF2D'
//                 />
//                 <View style={styles.navbar}>
//                     <Icon3 
//                         style={styles.icon}
//                         name='chevron-left'
//                         onPress={()=>Actions.pop()}
//                     />
//                     <Text style={styles.title}>编辑爱人</Text>
//                     <TouchableOpacity onPress={()=>Actions.Mmlover()}>
//                         <Icon2 style={styles.icon}  name='md-add'/>
//                     </TouchableOpacity>
//                 </View>
//                 <WingBlank style={styles.wingblank}>
//                     <FlatList
//                     showsVerticalScrollIndicator={false}
//                     style={styles.scrollView}
//                     data={list}
//                     numColumns={1}
//                     renderItem={({ item }) => (
//                         <View style={{
//                             height: 200 * s,
//                             width: 0.75 * width,
//                             borderWidth: 0.3,
//                             borderColor: "#000",
//                             marginTop: 10 * s,
//                             marginLeft: 'auto',
//                             marginRight: "auto",
//                             borderRadius: 15,
//                             flexDirection: "row",
//                             flexWrap: "wrap",
//                         }}>
//                             <Icon1
//                             style={{
//                                 fontSize:30*s,
//                                 color:'#FFBF2D',
//                                 flexDirection:'row',
//                                 justifyContent:'flex-start'
//                             }}
//                             onPress={this.alertMsg}
//                                 name="delete"></Icon1>
//                             <View style={{alignItems:'center', width:'100%',flexDirection:'row',height:40*s,justifyContent:'center'}}>
//                                 <Text
//                                 style={{
                                    
//                                     fontSize:25*s,
//                                     textAlign:"center",
//                                     width:"50%",
//                                 }}
//                                 ><Icon4 style={styles.listlineicon} name='heart'/>&nbsp;昵称:</Text>
//                                 <Text style={{
//                                     fontSize:25*s,
//                                     textAlign:"center",
//                                     width:"50%",
//                                 }}>{item.name}</Text>
//                             </View>
//                             <View style={{alignItems:'center',marginTop:5*s, width:'100%',flexDirection:'row',height:40*s,justifyContent:'center'}}>
//                                 <Text
//                                 style={{
//                                     fontSize:25*s,
//                                     textAlign:"center",
//                                     width:"50%",
//                                 }}
//                                 ><Icon3 style={styles.listlineicon} name='users'/>&nbsp;性别:</Text>
//                                 <Text style={{
//                                     fontSize:25*s,
//                                     textAlign:"center",
//                                     width:"50%",
//                                 }}>{item.sex}</Text>
//                             </View>
//                             <View style={{alignItems:'center', marginTop:5*s,width:'100%',flexDirection:'row',height:40*s,justifyContent:'center'}}>
//                                 <Text
//                                 style={{
//                                     fontSize:25*s,
//                                     textAlign:"center",
//                                     width:"50%",
//                                 }}
//                                 ><Icon4 style={styles.listlineicon} name='calendar'/>&nbsp;日期:</Text>
//                                 <Text style={{
//                                     fontSize:25*s,
//                                     textAlign:"center",
//                                     width:"50%",
//                                 }}>{item. date}</Text>
//                             </View>
//                         </View>
                   
//                     )}
//                 />
//                 </WingBlank>
//             </View>
//         )
//     }
// }

// const styles = StyleSheet.create({
//     navbar:{
//         width:width,
//         height:65*s,
//         backgroundColor:'#FFBF2D',
//         flexDirection: 'row',
//         paddingLeft:0.03*width,
//         paddingTop:'1%',
//         paddingRight:0.03*width,
//         justifyContent:"center"
//     },
//     icon:{
//         width:0.08*width,
//         color:'#fff',
//         fontSize:30,
//     },
//     title:{
//         marginLeft:'auto',
//         marginRight:"auto",
//         textAlign:'center',
//         fontSize:20,
//         color:'#fff',
//         letterSpacing:3
//     },
//     listlineicon:{
//         fontSize:32*s1,
//         color:'#FFBF2D',
//     },
//     scrollView: {
//         marginTop: 18 * s,
//         backgroundColor: '#fff',
//         paddingLeft: 10,
//         paddingRight: 10,
//         height: 950 * s,
//         borderRadius: 5,
//         borderWidth: 0.5,
//         borderColor: "#C0C0C0"
//         // "
//     },
// })
import React, { Component } from 'react'
import { 
    Text, 
    View,
    StyleSheet,
    Dimensions,
    FlatList,
    Image,
    ImageBackground,
    TouchableOpacity,
    ToastAndroid,
    Alert
} from 'react-native'
import moment from 'moment'
import { Actions } from 'react-native-router-flux';
import { WingBlank } from '@ant-design/react-native';
import Icon1 from 'react-native-vector-icons/Feather';
import Icon2 from "react-native-vector-icons/Ionicons";
import Icon3 from 'react-native-vector-icons/AntDesign'
import Icon4 from 'react-native-vector-icons/FontAwesome'
import Button from 'react-native-button';
const {width,scale,height} = Dimensions.get('window');
const s = width / 640;
const h = height / 1012;
export default class Mylover extends Component {
    constructor(){
        super();
        this.state={
            lists:[
                {
                    name: "皮卡丘",
                },
            ]
        }
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
                    <Text style={styles.title}>爱人列表</Text>
                    <TouchableOpacity onPress={()=>Actions.Mmlover()}>
                        <Icon2 style={styles.icon}  name='md-add'/>
                    </TouchableOpacity>
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
                                }}>没了哟</Text>
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
                                    borderColor:'#9999CC',
                                    flexDirection:'row',    
                                    alignItems:'center'
                                }}
                            >
                                <View style={{width:'15%',marginLeft:'30%',height:'100%',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                    <Icon4 style={styles.listlineicon} name='heart'/>
                                    <Text style={{fontSize:16}}>&nbsp;昵称：</Text>
                                </View>
                                <View style={{width:'40%',marginLeft:'5%',height:'100%',flexDirection:'row',alignItems:'center'}}>
                                    <Text style={{fontSize:16}}>{item.name}</Text>
                                </View>
                                <TouchableOpacity >
                                    <Icon3 style={styles.icon2}  name='rightcircleo'/>
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
    icon2:{
        width:0.08*width,
        color:'#FFBF2D',
        fontSize:25,
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
        backgroundColor: '#fff',
        paddingLeft:0.03*width,
        paddingRight:0.03*width,
        paddingTop:5,
    
    },
    listlineicon:{
        fontSize:32*s,
        color:'#FFBF2D',
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

