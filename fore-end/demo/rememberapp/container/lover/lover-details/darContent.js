import React, { Component } from 'react'
import { 
    Text, 
    View,
    StyleSheet,
    Dimensions,
    FlatList,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    Modal,
    Image,
    TouchableWithoutFeedback,
} from 'react-native'
import { Actions } from 'react-native-router-flux';
import moment from 'moment'
import Icon1 from 'react-native-vector-icons/Feather'
import Icon2 from 'react-native-vector-icons/Fontisto'
import { WingBlank } from '@ant-design/react-native';
const {width,scale,height} = Dimensions.get('window');
const s = width / 640;
const image = 'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1106982671,1158338553&fm=26&gp=0.jpg'
export default class dairy extends Component {
    constructor(){
        super();
        this.state={
            visible:false,
            currentpicture:image,
            inner:'',
            data:''
        }
    }
    componentDidMount(){
        console.log(this.props.data);
        this.setState({
            data:this.props.data
        })
    }
    enlarge=(image)=>{
        this.setState({
            visible:true,
            currentpicture:image
        })
    }
    savePictures = ()=>{

    }
    render() {
        const item = this.state.data
        var iconcolor = '#ffffff';
        var textcolor = '#000000';
        var weathercolor = '#ffffff';
        // if(item.content == 'undefined'){
        //     item.content = '（您没有添加文字内容哦~）';
        // }
        if(item.backcolor == '#ffffff' || item.backcolor == '#ffffaa'){
            iconcolor = '#FFBF2D',
            weathercolor = '#999999'
        }
        if(item.backcolor == '#000000'){
            textcolor = '#ffffff'
        }
        if(item.weather == 'day-sunny' || item.weather == 'night-clear'){
            weathercolor = '#FFBF2D'
            if(item.backcolor == 'orange'){
                weathercolor = '#ffffff'
            }
        }
        return (
            <View>
                <View style={styles.navbar}>
                    <Icon1 
                        style={styles.icon}
                        name='chevron-left'
                        onPress={()=>Actions.pop()}
                    />
                    <Text style={styles.title}>
                        { moment(item.setdate).format(" YYYY年MM月DD日  HH:mm")}
                    </Text>
                    <TouchableOpacity onPress={()=>Actions.lcdairy({loverid:this.state.loverid})}>
                        <Icon1 style={styles.icon1}  name='edit'/>
                    </TouchableOpacity>
                </View>
                <WingBlank style={styles.wingblank}>
                    <View style={{
                        borderRadius:10,
                        marginLeft:'auto',
                        marginRight:'auto',
                        backgroundColor:`${item.backcolor}`,
                        width:0.9*width,
                        height:0.84*height,
                        // marginTop:10*s,
                        borderWidth:5,
                        borderColor:'rgba(204,204,204,0.1)'
                        
                    }}>
                        <ImageBackground
                            style={{
                                width:'100%',
                                height:'100%',
                                transform: [{scale:0.98}]
                            }}
                            resizeMode="cover"
                            source={{uri:`${item.bgimg}`}}
                        >
                            <Icon2 color={weathercolor} style={styles.lineweather} name={item.weather}/>
                            <ScrollView
                                style={styles.textbox}
                                showsHorizontalScrollIndicator={false}
                            >
                                <Text
                                    style={{
                                        color:`${textcolor}`,
                                        lineHeight:35*s,
                                        width:0.83*width,
                                        alignContent:'center',
                                        marginLeft:'auto',
                                        marginRight:'auto',
                                        marginTop:0.024*width,
                                        padding:0.01*width,
                                        fontSize:23*s,
                                        transform: [{scale:0.98}]
                                    }}
                                    selectable = {true}
                                >
                                    {item.content}
                                </Text>
                            </ScrollView> 
                            <FlatList
                                style={styles.picbox}
                                data={item.imgurl}
                                numColumns={3}
                                ListFooterComponent={
                                    <View style={{
                                        height:0.04*width
                                    }}>
                                    </View>
                                }
                                renderItem={({item})=>(
                                    <TouchableOpacity
                                        onPress={this.enlarge.bind(this,item)}
                                        style={styles.pics}>
                                        <ImageBackground
                                            // onPress={this.enlarge}
                                            style={styles.pics}
                                            resizeMode="cover"
                                            source={{uri:`${item}`}}
                                        >
                                            <Icon1/>
                                        </ImageBackground>
                                    </TouchableOpacity>
                                )}
                            />  
                        </ImageBackground>
                    </View>
                </WingBlank>
                <Modal
                    transparent
                    visible={this.state.visible}
                >
                    <View style={styles.navbar}>
                        <Icon1 
                            style={styles.icon}
                            name='chevron-left'
                            onPress={()=>{this.setState({visible:false})}}
                        />
                        <Text style={styles.title}>
                            { moment(item.setdate).format(" YYYY年MM月DD日  HH:mm")}
                        </Text>
                    </View>
                    <View style={{
                        backgroundColor:'#fff',
                        height:height
                    }}>
                        <WingBlank style={styles.wingblank}>
                            <TouchableWithoutFeedback
                                onLongPress={this.savePictures}
                            >
                                <Image
                                    style={{
                                        width:0.9*width,
                                        height:0.83*height,
                                        marginLeft:'auto',
                                        marginRight:'auto',
                                        zIndex:1,

                                    }}
                                    resizeMode="contain"
                                    source={{uri:`${this.state.currentpicture}`}}
                                />
                            </TouchableWithoutFeedback>
                        </WingBlank>
                    </View>
                </Modal>
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
    icon1:{
        width:0.08*width,
        color:'#fff',
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
    wingblank:{
        height:0.86*height,
        marginTop:0.015*height,
        borderColor:'rgba(204,204,204,0.3)',
        borderStyle:'solid',
        borderWidth:1,
        justifyContent:'center',
    },
    lineweather:{
        marginLeft:'auto',
        marginRight:'auto',
        // backgroundColor:'#000',
        width:0.85*width,
        height:0.04*height,
        textAlignVertical:'center',
        textAlign:'right',
        fontSize:40*s,
    },
    textbox:{
        height:0.2*height,
        // backgroundColor:'#000'
    },
    picbox:{
        marginTop:0.025*height,
        height:0.6*height,
        padding:0.01*width,
        // backgroundColor:"red",
        backgroundColor:'rgba(255,255,255,0.4)',
    },
    pics:{
        width:0.272*width,
        height:0.18*height,
        margin:0.005*width,
        transform: [{scale:0.95}],
    },
})
