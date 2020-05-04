import React, { Component } from 'react'
import { 
    Text, 
    TextInput,
    StyleSheet, 
    Dimensions, 
    View, 
    Image, 
    FlatList,
    TouchableOpacity, 
    AsyncStorage,
    ToastAndroid,
    StatusBar,
    Picker,
    Alert,
} from 'react-native'
import {
    Actions
} from 'react-native-router-flux'
import { Flex, WingBlank } from '@ant-design/react-native'
import Button from 'react-native-button';
import Icon1 from 'react-native-vector-icons/SimpleLineIcons'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon3 from 'react-native-vector-icons/Feather'
import Icon4 from 'react-native-vector-icons/FontAwesome'
const { width, scale, height } = Dimensions.get('window');
const s1 = width / 640;
const s = width / 640;
const h = height / 1012;
export default class Mmchilds extends Component {
    constructor(){
        super();
        this.state={
            sex:'女',
        }
    }
    additem=()=>{
        ToastAndroid.showWithGravityAndOffset(
            '创建成功！',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
        25,-200)
        setTimeout(() => {
            Actions.pop() 
        }, 3000);
    }
    inputChange1=(e)=>{
        var a=e.target.value;
        this.setState({
            name:a
        })
    }
    inputChange2=(e)=>{
        var a=e.target.value;
        this.setState({
            birthday:a
        })
    }
    inputChange3=(e)=>{
        var a=e.target.value;
        this.setState({
            gender:a
        })
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
                    <Icon3 
                        style={styles.icon}
                        name='chevron-left'
                        onPress={()=>Actions.pop()}
                    />
                    <Text style={styles.title}>创建</Text>
                </View>
                <WingBlank style={styles.wingblank}>
                    <View style={styles.msgbox}>
                        <View style={styles.msg}>
                            <Text style={styles.text}>
                                <Icon3 style={styles.listlineicon} name='users'/> 性别</Text>
                            <Text style={styles.input}>
                                <Picker
                                    selectedValue={this.state.ageunit}
                                    mode='dropdown'
                                    style={{width:0.11*width}}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({ageunit: itemValue})
                                    }>
                                    <Picker.Item label="男" value="男" />
                                    <Picker.Item label="女" value="女" />
                                </Picker>
                            </Text>
                        </View>
                        <View style={styles.msg}>
                            <Text style={styles.text}>
                                <Icon4 style={styles.listlineicon} name='heart'/> 昵称</Text>
                            <TextInput
                                maxLength={3}
                                onFocus={()=>{
                                    ToastAndroid.showWithGravityAndOffset(
                                        '请保证昵称不多于10个字！',
                                    ToastAndroid.SHORT,
                                    ToastAndroid.TOP,
                                    25,100)
                                }}
                                style={styles.input}/>
                        </View>
                        <View style={styles.msg}>
                            <Text style={styles.text}>
                                <Icon2 style={styles.listlineicon} name='cake-variant'/>
                                生日</Text>
                            <TextInput
                                maxLength={15}
                                style={styles.input}/>
                        </View>
                    </View>
                    <Button
                        onPress={this.additem} 
                        style={styles.addbtn}>创建亲子关系</Button>
                    </WingBlank>
            </View>
        )
    }
}
const styles=StyleSheet.create({
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
        letterSpacing:3
    },
    wingblank:{
        height:0.85*height,
        marginTop:0.05*height,
    },
    msgbox:{
        backgroundColor:'rgba(204,204,204,0.2)',
        width:0.8*width,
        height:0.35*height,
        paddingBottom:0.025*height,
        paddingTop:0.025*height,
        marginLeft:'auto',
        marginRight:'auto',
        justifyContent:'space-around',
        alignItems:'center'
    },
    msg:{
        backgroundColor:'rgba(255,255,255,1)',
        width:0.7*width,
        height:0.06*height,
        marginLeft:'auto',
        marginRight:'auto',
        flexDirection: 'row',
        justifyContent:'center',
    },
    listlineicon:{
        fontSize:32*s1,
        color:'#FFBF2D',
    },
    text:{
        textAlign:'center',
        textAlignVertical:'center',
        width:0.15*width,
        fontSize:23*s1,
        color:'#555',
    },
    text2:{
        textAlign:'left',
        textAlignVertical:'center',
        width:0.07*width,
        fontSize:23*s1,
        color:'#555',
    },
    input:{
        width:0.25*width,
        marginLeft:0.025*width,
        marginRight:0.025*width,
        borderColor:'#bdbbb8',
        borderStyle:'solid',
        borderBottomWidth:1,
        fontSize:23*s1,
        textAlign:'center',
        color:'#333'
    },
    addbtn:{
        width:0.6*width,
        height:60*s1,
        marginTop:30*s1,
        marginLeft:'auto',
        marginRight:'auto',
        backgroundColor:'rgba(255,255,255,0.1)',
        borderWidth:1,
        borderStyle:'solid',
        borderColor:'#FFBF2D',
        borderRadius:5,
        color:'#FFBF2D',
        fontSize:17,
        textAlignVertical:'center'
    },
})