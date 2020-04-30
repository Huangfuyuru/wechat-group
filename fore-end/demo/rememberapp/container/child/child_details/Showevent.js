import React, { Component } from 'react'
import { 
    Text, 
    View,
    StyleSheet,
    Dimensions,
    ScrollView,
    FlatList,
    TouchableOpacity,
    ImageBackground,
    Modal,
    TouchableWithoutFeedback,
    Image
} from 'react-native'
import moment from 'moment'
import Icon1 from 'react-native-vector-icons/Feather'
import { Actions } from 'react-native-router-flux';
import { WingBlank } from '@ant-design/react-native';
const {width,scale,height} = Dimensions.get('window');
const s = width / 640;
const imgurl = 'http://hbimg.b0.upaiyun.com/3503b3b19c1bc0928766b62de18a5433dad71cf911089-tluSYK_fw658'
export default class Cdairy extends Component {
    constructor(){
        super();
        this.state={
            visible:false,
            currentpicture:'',
            inner:'',
            data:'',
            bg:''
        }
    }
    componentDidMount(){
        // console.log('nini'+this.props.data.imgurl);
        this.setState({
            data:this.props.data,
            bg:this.props.bg
        })
    }
    enlarge=(item)=>{
        this.setState({
            visible:true,
            currentpicture:item
        })
    }
    render() {
        const item = this.state.data;
        var bgcolor = 'rgba(221, 204, 255,0.3)'
        if(!this.state.bg){
            bgcolor = 'rgba(238, 255, 238,0.8)'
        }
        return (
            <View>
                <View style={styles.navbar}>
                    <Icon1 
                        style={styles.icon}
                        name='chevron-left'
                        onPress={()=>Actions.pop()}
                    />
                    <Text style={styles.title}>{item.item} {item.name}</Text>
                </View>
                <WingBlank style={{
                    height:0.86*height,
                    marginTop:0.015*height,
                    justifyContent:'center',
                    backgroundColor:bgcolor,
                    alignItems:'center'
                }}>
                    <Text style={styles.setdate}>{ moment(item.setdate).format(" YYYY年MM月DD日  HH:mm")}</Text>
                    <ScrollView style={styles.content}>
                        <Text style={styles.text}>{item.content}</Text>
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
                            onPress={()=>this.enlarge(item)}
                                style={styles.pics}>
                                <ImageBackground
                                    style={styles.pics}
                                    resizeMode="cover"
                                    source={{uri:`${item}`}}
                                >
                                    <Icon1/>
                                </ImageBackground>
                            </TouchableOpacity>
                        )}
                    />  
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
                        <Text style={styles.title}>{item.tag} {item.name}</Text>
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
        height:0.86*height,
        marginTop:0.015*height,
        justifyContent:'center',
        alignItems:'center'
    },
    setdate:{
        // backgroundColor:'#ccc',
        width:0.85*width,
        height:0.05*height,
        textAlignVertical:'center',
        fontSize:23*s,
        color:'#888',
    },
    content:{
        // backgroundColor:'#000'
        backgroundColor:'#fff',
        width:0.8*width,
        padding:0.035*width,
        transform:[{scale:0.98}],
        borderRadius:10
    },
    text:{
        // backgroundColor:'#ccc'
        fontSize:24*s,
        color:'#333',
        lineHeight:0.03*height,
        letterSpacing:1
    },
    picbox:{
        marginTop:0.025*height,
        height:0.4*height,
        padding:0.01*width,
        marginBottom:0.025*height
    },
    pics:{
        width:0.272*width,
        height:0.18*height,
        margin:0.005*width,
        transform: [{scale:0.95}],
    },
})
