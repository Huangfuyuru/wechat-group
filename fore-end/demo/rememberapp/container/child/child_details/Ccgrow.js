import React, { Component } from 'react'
import { 
    Text, 
    View,
    StyleSheet,
    Dimensions,
    TextInput,
    ToastAndroid,
    Picker
} from 'react-native'
import { 
    WingBlank,
} from '@ant-design/react-native';
import Icon1 from 'react-native-vector-icons/Feather'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon3 from 'react-native-vector-icons/Ionicons'
import Icon4 from 'react-native-vector-icons/Entypo'
import { Actions } from 'react-native-router-flux';
import Button from 'react-native-button';
const {width,scale,height} = Dimensions.get('window');
const s = width / 640;
export default class Cdairy extends Component {
    constructor(){
        super();
        this.state={
            ageunit:'岁'
        }
    }
    additem=()=>{
        ToastAndroid.showWithGravityAndOffset(
            '添加成功！',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
        25,-200)
        setTimeout(() => {
            Actions.pop() 
        }, 3000);
    }
    render() {
        const ageunit =  [
            [
              {
                label: '2013',
                value: '2013',
              },
              {
                label: '2014',
                value: '2014',
              },
            ],
          ];
        return (
            <View>
                <View style={styles.navbar}>
                    <Icon1 
                        style={styles.icon}
                        name='chevron-left'
                        onPress={()=>Actions.pop()}
                    />
                    <Text style={styles.title}>新增记录</Text>
                </View>
                <WingBlank style={styles.wingblank}>
                    <View style={styles.msgbox}>

                        <View style={styles.msg}>
                            <Text style={styles.text}>
                                <Icon2 style={styles.listlineicon} name='cake-variant'/>  年龄</Text>
                            <TextInput
                                keyboardType='numeric'
                                maxLength={3}
                                style={styles.input}/>
                            <Picker
                                selectedValue={this.state.ageunit}
                                mode='dropdown'
                                style={styles.text}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ageunit: itemValue})
                                }>
                                <Picker.Item label="天" value="天" />
                                <Picker.Item label="月" value="月" />
                                <Picker.Item label="岁" value="岁" />
                            </Picker>
                        </View>
                        <View style={styles.msg}>
                            <Text style={styles.text}>
                                <Icon4 style={styles.listlineicon} name='ruler'/>  身高</Text>
                            <TextInput
                                maxLength={3}
                                style={styles.input}/>
                            <Text style={styles.text}>厘米</Text>
                        </View>
                        <View style={styles.msg}>
                            <Text style={styles.text}>
                            <Icon2 style={styles.listlineicon} name='scale-bathroom'/>  体重</Text>
                            <TextInput
                                maxLength={3}
                                autoComplete='cc-number'
                                style={styles.input}/>
                            <Text style={styles.text}>千克</Text>
                        </View>
                    </View>
                    <Button
                        onPress={this.additem} 
                        style={styles.addbtn}>添加记录</Button>
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
        marginTop:30*s,
        // backgroundColor:'rgba(238,255,221,0.5)',
        // borderColor:'rgba(204,204,204,0.3)',
        // borderWidth:1,
        // backgroundColor:'#ccc',
        // justifyContent:'center'
    },
    msgbox:{
        backgroundColor:'rgba(204,204,204,0.2)',
        width:0.8*width,
        height:0.35*height,
        paddingBottom:0.025*height,
        paddingTop:0.025*height,
        // backgroundColor:'#000',
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:0.08*height,
        justifyContent:'space-around',
        alignItems:'center'
    },
    msg:{
        backgroundColor:'rgba(255,255,255,1)',
        width:0.7*width,
        height:0.06*height,
        // paddingRight:0.05*width,
        // backgroundColor:'#000',
        marginLeft:'auto',
        marginRight:'auto',
        flexDirection: 'row',
        justifyContent:'center',
    },
    listlineicon:{
        fontSize:32*s,
        color:'#555',
        // backgroundColor:'#ccc'
    },
    text:{
        textAlign:'center',
        textAlignVertical:'center',
        width:0.15*width,
        fontSize:23*s,
        color:'#333',
        // backgroundColor:'#000'
    },
    input:{
        width:0.25*width,
        marginLeft:0.025*width,
        marginRight:0.025*width,
        borderColor:'#bdbbb8',
        borderStyle:'solid',
        borderBottomWidth:1,
        fontSize:25*s,
        textAlign:'center',
        color:'#333'
    },
    addbtn:{
        width:0.8*width,
        height:80*s,
        marginTop:0.1*height,
        marginLeft:'auto',
        marginRight:'auto',
        backgroundColor:'rgba(255,255,255,0.1)',
        borderWidth:1,
        borderStyle:'solid',
        borderColor:'#FFBF2D',
        borderRadius:5,
        color:'#FFBF2D',
        fontSize:22,
        textAlignVertical:'center'
    }
})
