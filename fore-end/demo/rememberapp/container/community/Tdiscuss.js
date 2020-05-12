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
    TouchableOpacity,
    TextInput
} from 'react-native'
import moment from 'moment'
import { Actions } from 'react-native-router-flux';
import { WingBlank } from '@ant-design/react-native';
import {myFetch} from '../../src/utils'
import Icon1 from 'react-native-vector-icons/Feather'
import Icon2 from 'react-native-vector-icons/Entypo'
import Icon3 from 'react-native-vector-icons/Ionicons'
import Icon4 from 'react-native-vector-icons/FontAwesome'
import Icon5 from 'react-native-vector-icons/Fontisto'
const {width,scale,height} = Dimensions.get('window');
const s = width / 640;
const image = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587984040970&di=7e865af6555429dd11f70d1928f46878&imgtype=0&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D2381951604%2C3164827774%26fm%3D214%26gp%3D0.jpg'
export default class Cdairy extends Component {
    constructor(){
        super();
        this.state={
            placeholder:'快来添加一条评论吧',
            lists:[
                {
                    id:1,
                    name:'时樾哥哥',
                    content:'我有好多评论想评论我有好多评论想评论我有好多评论想评论我有好多评论想评论我有好多评论想评论我有好多评论想评论'
                },
                {
                    id:2,
                    name:'时樾哥哥',
                    content:'棒'
                },
                {
                    id:3,
                    name:'时樾哥哥',
                    content:'棒'
                },
            ],
            refreshing:false,
        }
    }
    componentDidMount(){
        
    }
    componentWillReceiveProps(nextProps) {
        
    }
    
    render() {
        return (
            <View>
                <View style={styles.navbar}>
                    <TouchableOpacity onPress={()=>Actions.pop()}>
                        <Icon1 style={styles.icon} name='chevron-left'/>
                    </TouchableOpacity>
                    <Text style={styles.title}>评论</Text>
                    <Icon3 style={styles.icon}/>
                </View>
                <WingBlank style={styles.wingblank}>
                    <View style={styles.footerline}>
                        <TextInput
                            autoFocus
                            style={styles.textinput}
                            onChangeText={text=>{this.setState({context:text})}}
                            placeholder={this.state.placeholder}
                            multiline={false}
                        />
                        <TouchableOpacity>
                            <Icon5 style={styles.iconbtn} name='smiley'/>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon4 style={styles.iconbtn} name='send-o'/>
                        </TouchableOpacity>
                    </View>
                    {
                        this.state.lists[0]
                        ?<FlatList
                            style={styles.list}
                            refreshing = {this.state.refreshing}
                            onRefresh={()=>{this.setState({refreshing:false})}}
                            extraData={this.state}
                            data={this.state.lists}
                            horizontal={false}
                            showsVerticalScrollIndicator={true}
                            // ItemSeparatorComponent={}
                            renderItem={({item})=>(
                                <View style={styles.linebox}>
                                    <View style={styles.linetitle}>
                                        <TouchableOpacity onPress={()=>{}}>
                                            <Image 
                                                style={styles.innertitlepic}
                                                source={{uri:`${image}`}}
                                            />
                                        </TouchableOpacity>
                                        <Text style={styles.linename}>{item.name}</Text>
                                        {/* <View style={styles.timebox}>
                                        </View> */}
                                        <Text style={styles.linetime}>{moment(new Date()).format('YYYY-MM-DD   HH:mm')}</Text>
                                    </View>
                                    <TouchableOpacity style={styles.linecontentbox} onPress={()=>this.setState({placeholder:`回复@${item.name}`})}>
                                        <Text style={styles.linecontent}>{item.content}</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                        :<View style={styles.list}>
                            <View style={styles.nullpics}>
                                <Image 
                                    style={{
                                        width:0.3*width,
                                        height:0.3*width,
                                        // backgroundColor:'#000'
                                    }}
                                    resizeMode="contain"
                                    source={require('../../assets/shafa.png')}
                                />                               
                                <Text style={styles.nulltext}>一条评论都没有呢，快来抢占沙发吧</Text>                          
                            </View>
                        </View>
                    }                  
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
        // backgroundColor:'#ccc'
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
        marginTop:0.015*height,
        height:0.85*height,
        alignItems:'center',
        // backgroundColor:'#000'
    },
    list:{
        width:0.93*width,
        height:0.7*height,
        marginTop:0.02*height,
        // backgroundColor:'#ccc'
    },
    linebox:{
        // backgroundColor:'#ccc',
        marginBottom:0.01*height
    },
    linetitle:{
        // backgroundColor:'#ddd',
        flexDirection:'row',
        width:0.8*width
    },
    innertitlepic:{
        width:0.07*height,
        height:0.07*height,
        borderRadius:100,
    },
    timebox:{
        justifyContent:'center'
    },
    linename:{
        width:0.5*width,
        fontSize:23*s,
        marginLeft:0.02*width,
        // backgroundColor:"#ccc",
        textAlignVertical:'center'
    },
    linetime:{
        width:0.25*width,
        fontSize:18*s,
        textAlign:'right',
        marginLeft:0.02*width,
        color:'#999',
        // backgroundColor:"#ccc",
        textAlignVertical:'center'
    },
    linecontentbox:{
        width:0.75*width,
        // height:0.09*height,
        // backgroundColor:'#ddd',
        marginTop:-0.015*height,
        marginLeft:0.07*height+0.02*width,
    },
    linecontent:{
        lineHeight:0.03*height,
        fontSize:22*s,
        color:'#333',
        // backgroundColor:'#ddd',
    },
    nullpics:{
        width:0.9*width,
        height:0.5*height,
        // backgroundColor:'#ccddff',
        marginTop:0.05*height,
        justifyContent:'center',
        alignItems:'center'
    },
    nulltext:{
        width:0.8*width,
        height:0.1*height,
        textAlign:'center',
        textAlignVertical:'center',
        fontSize:23*s,
        color:'#bdbbb8'
        // backgroundColor:'#ccc'
    },
    footerline:{
        flexDirection:'row',
        height:0.05*height,
        // backgroundColor:'#ccc',
        justifyContent:'center',
        alignItems:'center'
    },
    textinput:{
        backgroundColor:'rgba(255,255,255,0.3)',
        borderColor:'rgba(204,204,204,0.8)',
        borderWidth:1,
        width:0.72*width,
        height:0.05*height,
        fontSize:23*s,
        color:'#333',
        textAlignVertical: 'top',
        paddingLeft:0.03*width,
        marginRight:0.02*width
    },
    iconbtn:{
        width:0.06*width,
        // backgroundColor:'#ddccff',
        margin:0.015*width,
        fontSize:35*s,
        color:'#FFBF2D'
    }
})
