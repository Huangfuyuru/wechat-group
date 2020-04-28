import React, { Component } from 'react'
import { 
    Text, 
    View,
    StyleSheet,
    Dimensions,
    TextInput,
    Picker,
    Image,
    FlatList
} from 'react-native'
import Icon1 from 'react-native-vector-icons/Feather'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon3 from 'react-native-vector-icons/FontAwesome'
import Icon4 from 'react-native-vector-icons/Entypo'
import { Actions } from 'react-native-router-flux';
import { WingBlank } from '@ant-design/react-native';
import Button from 'react-native-button'
import CheckBox from 'react-native-checkbox'
import { TouchableOpacity } from 'react-native-gesture-handler'
const {width,scale,height} = Dimensions.get('window');
const s = width / 640;
export default class Cdairy extends Component {
    constructor(){
        super();
        this.state={
            stage:'小学',
            subject:[
            ],
            choosesubject:[]
        }
    }
    choosesubject = ()=>{
        this.setState({
            subject:this.state.choosesubject
        })
    }
    render() {
        const primary=[
            {
                subject:'语文',
                icon:require('../../../assets/xxyw.png')
            },
            {
                subject:'数学',
                icon:require('../../../assets/xxsx.png')
            },
            {
                subject:'英语',
                icon:require('../../../assets/xxyy.png')
            },
            {
                subject:'品德',
                icon:require('../../../assets/xxpd.png')
            },
            {
                subject:'科学',
                icon:require('../../../assets/xxkx.png')
            },
        ];
        const junior=[
            {
                subject:'语文',
                icon:require('../../../assets/czyw.png')
            },
            {
                subject:'数学',
                icon:require('../../../assets/czsx.png')
            },
            {
                subject:'英语',
                icon:require('../../../assets/czyy.png')
            },
            {
                subject:'物理',
                icon:require('../../../assets/czwl.png')
            },
            {
                subject:'化学',
                icon:require('../../../assets/czhx.png')
            },
            {
                subject:'生物',
                icon:require('../../../assets/czsw.png')
            },
            {
                subject:'历史',
                icon:require('../../../assets/czls.png')
            },
            {
                subject:'地理',
                icon:require('../../../assets/czdl.png')
            },
            {
                subject:'政治',
                icon:require('../../../assets/czzz.png')
            },
        ]
        const senior=[
            {
                subject:'语文',
                icon:require('../../../assets/gzyw.png')
            },
            {
                subject:'数学',
                icon:require('../../../assets/gzsx.png')
            },
            {
                subject:'英语',
                icon:require('../../../assets/gzyy.png')
            },
            {
                subject:'物理',
                icon:require('../../../assets/gzwl.png')
            },
            {
                subject:'化学',
                icon:require('../../../assets/gzhx.png')
            },
            {
                subject:'生物',
                icon:require('../../../assets/gzsw.png')
            },
            {
                subject:'历史',
                icon:require('../../../assets/gzls.png')
            },
            {
                subject:'地理',
                icon:require('../../../assets/gzdl.png')
            },
            {
                subject:'政治',
                icon:require('../../../assets/gzzz.png')
            },
        ]
        var subjectlists=[];
        switch(this.state.stage){
            case '小学':
                subjectlists = primary;
                break;
            case '初中':
                subjectlists = junior;
                break;
            case '高中':
                subjectlists = senior;
                break;
            default:
                break;
        }
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
                    <View style={{
                        width:0.8*width,
                        height:0.19*height,
                        backgroundColor:'rgba(204,204,204,0.1)',
                        paddingTop:0.005*height,
                        alignItems:'center'
                    }}>
                        <View style={{
                            backgroundColor:'rgba(255,255,255,1)',
                            width:0.7*width,
                            height:0.06*height,
                            marginLeft:'auto',
                            marginRight:'auto',
                            flexDirection: 'row',
                            justifyContent:'center',
                        }}>
                            <Text style={{
                                textAlign:'center',
                                textAlignVertical:'center',
                                width:0.3*width,
                                fontSize:23*s,
                                color:'#333',
                            }}>
                                <Icon2 style={styles.listlineicon} name='school'/>  当前教育阶段</Text>
                            <Text style={styles.input}>
                                <Picker
                                    selectedValue={this.state.stage}
                                    mode='dropdown'
                                    style={{width:0.15*width}}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({
                                            stage: itemValue,
                                        })
                                    }>
                                    <Picker.Item label="小学" value="小学" />
                                    <Picker.Item label="初中" value="初中" />
                                    <Picker.Item label="高中" value="高中" />
                                </Picker>
                            </Text> 
                        </View>
                        <FlatList
                            style={{
                                marginTop:0.01*height,
                                marginLeft:'auto',
                                marginRight:'auto',
                            }}
                            data={subjectlists}
                            extraData={this.state}
                            horizontal = {true}
                            renderItem={({item})=>(
                                <View style={{
                                    width:0.13*width,
                                    height:0.13*width,
                                    // backgroundColor:'#ccc',
                                    marginLeft:0.015*width,
                                    marginRight:0.015*width,
                                    justifyContent:'center',
                                    alignItems:'center'
                                }}>
                                    <CheckBox
                                        checkboxStyle={{
                                            width:0.022*width,
                                            height:0.022*width,
                                            marginBottom:-0.015*height,
                                            backgroundColor:'#fff',
                                            marginLeft:0.1*width,
                                        }}
                                        label=''
                                        onChange={(checked) => {
                                            var list = this.state.choosesubject;
                                            var index;
                                            if(checked){
                                                list.push(item);
                                                this.setState({
                                                    choosesubject:list
                                                })
                                            }else{
                                                for(var i in list){
                                                    if(list[i].subject == item.subject){
                                                        index = i
                                                    }
                                                }
                                                list.splice(index,1);
                                                this.setState({
                                                    choosesubject:list
                                                })
                                            }
                                            console.log(list)
                                            
                                        }}
                                    />
                                    <Image
                                    resizeMode="contain" 
                                    style={{
                                        width:0.065*width,
                                        height:0.065*width,
                                    }} source={item.icon}/>
                                    <Text style={{
                                        width:0.065*width,
                                        textAlign:'center',
                                        fontSize:16*s,
                                        color:'#555'
                                    }}>{item.subject}
                                    </Text>
                                </View>
                            )}
                        />
                        <View style={{flexDirection:'row'}}>
                            <Button onPress={this.choosesubject}>
                                <Text 
                                    style={{
                                        width:0.3*width,
                                        backgroundColor:'rgba(255,191,45,0.1)',
                                        borderRadius:5,
                                        height:0.04*height,
                                        textAlign:'center',
                                        textAlignVertical:'center',
                                        color:'#333',
                                        fontSize:20*s
                                    }}
                                >
                                    <Icon3 color='#FFBF2D' size={18} name='check-square-o'/>  添加所选科目
                                </Text>
                            </Button>
                            <Button onPress={this.choosesubject}>
                                <Text 
                                    style={{
                                        marginLeft:0.02*width,
                                        width:0.3*width,
                                        backgroundColor:'rgba(255,191,45,0.1)',
                                        borderRadius:5,
                                        height:0.04*height,
                                        textAlign:'center',
                                        textAlignVertical:'center',
                                        color:'#333',
                                        fontSize:20*s
                                    }}
                                >
                                    <Icon4 color='#FFBF2D' size={18} name='cycle'/>  重选科目
                                </Text>
                            </Button>
                        </View>  
                    </View>
                    <View style={styles.msgbox}>
                        <FlatList
                            style={{
                                marginTop:0.01*height,
                                marginLeft:'auto',
                                marginRight:'auto',
                            }}
                            data={this.state.subject}
                            extraData={this.state}
                            renderItem={({item})=>(
                                <View style={styles.msg}>
                                    <Image
                                    resizeMode="contain" 
                                    style={styles.listlineimg} 
                                    source={item.icon}/>
                                    <Text style={styles.text}>{item.subject}</Text>
                                    <TextInput
                                        maxLength={3}
                                        style={styles.input}/>
                                    <Text style={styles.text}>分</Text>
                                </View>
                            )}
                        />
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
        alignItems:'center'
        // backgroundColor:'rgba(238,255,221,0.5)',
        // borderColor:'rgba(204,204,204,0.3)',
        // borderWidth:1,
        // backgroundColor:'#ccc',
        // justifyContent:'center'
    },
    msgbox:{
        backgroundColor:'rgba(204,204,204,0.2)',
        width:0.8*width,
        height:0.45*height,
        paddingBottom:0.02*height,
        paddingTop:0.02*height,
        // backgroundColor:'#000',
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:0.03*height,
        justifyContent:'space-around',
        alignItems:'center'
    },
    msg:{
        backgroundColor:'rgba(255,255,255,1)',
        width:0.7*width,
        height:0.06*height,
        // paddingRight:0.05*width,
        // backgroundColor:'#000',
        marginBottom:0.02*height,
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
    listlineimg:{
        width:0.075*width,
        height:0.075*width,
        // backgroundColor:'#ccc',
        marginBottom:'auto',
        marginTop:'auto',
    },
    text:{
        // backgroundColor:'#ccc',
        textAlign:'center',
        textAlignVertical:'center',
        width:0.1*width,
        fontSize:23*s,
        color:'#555',
        // backgroundColor:'#000'
    },
    input:{
        width:0.25*width,
        marginLeft:0.04*width,
        marginRight:0.04*width,
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
        marginTop:0.05*height,
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
