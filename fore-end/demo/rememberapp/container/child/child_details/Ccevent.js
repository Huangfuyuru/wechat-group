import React, { Component } from 'react'
import { 
    Text, 
    View,
    StyleSheet,
    Dimensions,
    Picker,
    TextInput,
    TouchableOpacity,
    FlatList,
    Image,
    ToastAndroid
} from 'react-native'
import moment from 'moment'
import Icon1 from 'react-native-vector-icons/Feather'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon3 from 'react-native-vector-icons/Entypo'
import Icon4 from 'react-native-vector-icons/FontAwesome'
import Icon5 from 'react-native-vector-icons/AntDesign'

import { Actions } from 'react-native-router-flux';
import { WingBlank } from '@ant-design/react-native';
const {width,scale,height} = Dimensions.get('window');
const s = width / 640;
export default class Cdairy extends Component {
    constructor(){
        const imgurl = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586712889480&di=9c4a333188094ae5642b0487ec2bd34f&imgtype=0&src=http%3A%2F%2Fwx2.sinaimg.cn%2Flarge%2F007bRu2Ggy1gbtrl6i7ezj30rs0fme2h.jpg'
        var date = moment( new Date()).format("YYYY-MM-DD").split('-')
        super();
        this.state={
            tag:'第一次',
            year:date[0],
            month:date[1],
            day:date[2],
            lists:[imgurl,imgurl,imgurl,imgurl,imgurl,imgurl,imgurl,]
        }
    }
    timenotice = ()=>{
       console.log(this.state.year)
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
                    <Text style={styles.title}>新增大事记</Text>
                </View>
                <WingBlank>
                    <View style={styles.msgbox}>
                        <View style={styles.msg}>
                            <Text style={styles.text}>
                                <Icon4 style={styles.listlineicon} name='calendar-check-o'/>  日期：</Text>
                            <TextInput
                                onFocus={this.timenotice}
                                keyboardType='numeric'
                                maxLength={4}
                                defaultValue={this.state.year}
                                style={styles.input}/>
                            <Text style={styles.unit}>
                                年
                            </Text>
                            <TextInput
                                onFocus={this.timenotice}
                                keyboardType='numeric'
                                maxLength={2}
                                defaultValue={this.state.month}
                                style={styles.input}/>
                            <Text style={styles.unit}>
                                月
                            </Text>
                            <TextInput
                                onFocus={this.timenotice}
                                keyboardType='numeric'
                                maxLength={2}
                                defaultValue={this.state.day}
                                style={styles.input}/>
                            <Text style={styles.unit}>
                                日
                            </Text>
                        </View>
                        <View style={styles.msg}>
                            <Text style={styles.text}>
                                <Icon3 style={styles.listlineicon} name='price-tag'/>  标签：</Text>
                            <Text style={styles.tag}>
                                <Picker
                                    selectedValue={this.state.tag}
                                    mode='dropdown'
                                    style={{width:0.215*width}}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({
                                            tag: itemValue,
                                        })
                                    }>
                                    <Picker.Item label="第一次" value="第一次" />
                                    <Picker.Item label="过生日" value="过生日" />
                                    <Picker.Item label="毕业了" value="毕业了" />
                                    <Picker.Item label="超难忘" value="超难忘" />
                                    <Picker.Item label="超感动" value="超感动" />
                                    <Picker.Item label="超开心" value="超开心" />
                                    <Picker.Item label="温情时刻" value="温情时刻" />
                                </Picker>
                            </Text>
                        </View>
                        <View style={styles.msg}>
                            <Text style={styles.text}>
                                <Icon5 style={styles.listlineicon} name='edit'/>  名称：</Text>
                            <TextInput
                                maxLength={10}
                                style={styles.tag}/>
                        </View>
                    </View>
                    <TextInput
                        style={styles.content}
                        placeholder='详细内容'
                        multiline={true}
                    />
                    <View style={styles.picchoose}>
                        <Text style={styles.pictext}>添加图片</Text>
                        <TouchableOpacity style={styles.picbtn}>
                            <Icon2 size={45*s} style={styles.iconpic} name='image-plus'/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.picbtn}>
                            <Icon3 size={40*s} style={styles.iconpic} name='camera'/>
                        </TouchableOpacity>
                    </View>
                    <FlatList 
                        style={styles.picbox}
                        data={this.state.lists}
                        numColumns={3}
                        ListFooterComponent={
                            <View style={{
                                height:0.03*width
                            }}>
                            </View>
                        }
                        renderItem={({item})=>(
                            <Image
                                style={styles.pics}
                                resizeMode="cover"
                                source={{uri:`${item}`}}
                            />
                        )}
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
    msgbox:{
        backgroundColor:'rgba(204,204,204,0.2)',
        width:0.8*width,
        height:0.23*height,
        paddingBottom:0.01*height,
        paddingTop:0.01*height,
        // backgroundColor:'#000',
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:0.015*height,
        justifyContent:'space-around',
        alignItems:'center'
    },
    msg:{
        backgroundColor:'rgba(255,255,255,1)',
        width:0.75*width,
        height:0.06*height,
        marginLeft:'auto',
        marginRight:'auto',
        flexDirection: 'row',
        justifyContent:'center',
    },
    tag:{
        width:0.38*width,
        marginRight:0.06*width,
        textAlign:'center',
        textAlignVertical:'center',
        borderColor:'#bdbbb8',
        borderStyle:'solid',
        borderBottomWidth:1,
        fontSize:25*s,
        color:'#333'
    },
    listlineicon:{
        fontSize:35*s,
        color:'#FFBF2D',
        // backgroundColor:'#ccc'
    },
    text:{
        textAlign:'center',
        marginRight:0.02*width,
        textAlignVertical:'center',
        width:0.19*width,
        fontSize:23*s,
        color:'#555',
        // backgroundColor:'#000'
    },
    input:{
        width:0.11*width,
        borderColor:'#bdbbb8',
        borderStyle:'solid',
        borderBottomWidth:1,
        fontSize:22*s,
        textAlign:'center',
        color:'#333'
    },
    unit:{
        textAlign:'center',
        marginLeft:0.003*width,
        marginRight:0.003*width,
        textAlignVertical:'center',
        width:0.03*width,
        fontSize:23*s,
        color:'#555',
    },
    content:{
        borderColor:'rgba(255,191,45,0.3)',
        borderWidth:1,
        height:0.2*height,
        marginTop:0.01*height,
        marginBottom:0.01*height,
        fontSize:23*s,
        textAlignVertical: 'top',
        transform: [{scale:0.95}],
        padding:0.03*width,
    },
    picchoose:{
        // margin:0.02*width,
        height:0.05*height,
        paddingTop:0.007*height,
        transform: [{scale:0.95}],
        // borderRadius:5,
        backgroundColor:'rgba(204,204,204,0.2)',
        flexDirection:'row',
        // backgroundColor:'#ccc'
    },
    pictext:{
        width:0.3*width,
        height:0.04*height,
        // backgroundColor:'#ddd',
        marginRight:0.25*width,
        color:'#555',
        fontSize:25*s,  
        textAlign:'center' ,
        textAlignVertical:'center', 
    },
    iconpic:{
        width:0.15*width,
        textAlign:'center',
        height:0.04*height,
        textAlignVertical:'center',
        // backgroundColor:'#ccddff',
        color:'#888'
    },
    picbox:{
        height:0.35*height,
        backgroundColor:'rgba(204,204,204,0.2)',
        padding:0.01*width,
        width:0.89*width,
        transform: [{scale:0.98}],
        marginRight:'auto',
        marginLeft:'auto',
    },
    pics:{
        width:0.275*width,
        height:0.18*height,
        margin:0.007*width,
        transform: [{scale:0.95}],
    },
})
