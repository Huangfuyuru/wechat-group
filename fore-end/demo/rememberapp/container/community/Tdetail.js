import React, { Component } from 'react'
import {
    Text, 
    View,
    TouchableOpacity,
    Image,
    StyleSheet,
    Dimensions
} from 'react-native'
import Swiper from 'react-native-swiper'
import Icon1 from 'react-native-vector-icons/Feather'
import Icon3 from 'react-native-vector-icons/Entypo'
import { WingBlank } from '@ant-design/react-native'
import {
    Actions
} from 'react-native-router-flux'
const { width, scale, height } = Dimensions.get('window');
const s = width / 640;
const h = height / 1012;
const image3 = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587985300669&di=0dd8b86dafb708019e01377b9d394503&imgtype=0&src=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D1229184673%2C3594306478%26fm%3D214%26gp%3D0.jpg'
export default class Tdetail extends Component {
    constructor(){
        super();
        this.state={
            imgurl:[image3,image3,image3,image3,image3,],
            content:'ddd'
        }
    }
    render() {
        const renderPagination = (index, total, context) => {
            return (
              <View style= {styles.paginationStyle}>
                <Text style={styles.text}>
                  <Text style={styles.paginationText}>{index+1}</Text>/{total}
                </Text>
              </View>
            );
          }
        return (
            <View>
                <View style={styles.navbar}>
                    <TouchableOpacity onPress={()=>Actions.pop()}>
                        <Icon1 style={styles.icon} name='chevron-left'/>
                    </TouchableOpacity>
                    <Text style={styles.title}></Text>
                    <TouchableOpacity>
                        <Icon3 style={styles.icon}  name=''/>
                    </TouchableOpacity>
                </View>
                <WingBlank style={styles.inner}>
                    <View style={this.state.content.length>0?styles.pic:styles.piccover}>
                        <Swiper
                            renderPagination = {renderPagination} 
                            loop={false}
                        >
                            
                            {
                                this.state.imgurl&&this.state.imgurl.map((img,idx)=>(
                                        <Image 
                                            style={this.state.content.length>0?styles.img:styles.imgcover}
                                            resizeMode="contain"
                                            source={{uri:`${image3}`}}
                                        />
                                ))
                            }                     
                        </Swiper>
                    </View> 
                    {
                        this.state.content.length>0
                        ?<TouchableOpacity>
                            <Text style={styles.content}>{this.state.content ? (this.state.content.length > 55 ? this.state.content.substr(0, 55) + " . . . " : this.state.content) : ""}</Text>
                        </TouchableOpacity>
                        :null
                    }
                    <View style={styles.innerfooter}>
                        {/* <View style={styles.footerbox}>
                            <TouchableOpacity onPress={()=>this.like(item)}>
                                {
                                    item.addZan
                                    ?<Icon3 style={styles.footericon} color='red' name='heart'/>
                                    :<Icon3 style={styles.footericon} color='#666' name='heart-outlined'/>
                                }
                            </TouchableOpacity>
                            <Text style={styles.zannum}>{item.zannum<10000 ?item.zannum:(item.zannum/10000).toFixed(1)+'万'}</Text>
                        </View>
                        <View style={styles.footerbox}>
                            <TouchableOpacity onPress={()=>Actions.tdiscuss({
                                article_id:item.id,
                                host_id:item.uid,
                                user_id:this.state.uid,
                                page:this.state.page,
                                callBack:this.poprefresh.bind(this)
                                })}>
                                <Icon4 style={styles.footericon} color='#666' name='comment-processing-outline'/>
                            </TouchableOpacity>
                            <Text style={styles.zannum}>{item.comment<10000 ?item.comment:(item.comment/10000).toFixed(1)+'万'}</Text>
                        </View>
                        <View style={styles.footerbox}>
                            <TouchableOpacity onPress={()=>{
                                this.sendflower(item);
                                
                            }}>
                                {
                                    this.state.sendflower
                                    ?<Icon4 style={styles.footericon} color='red' name='flower-tulip'/>
                                    :<Icon4 style={styles.footericon} color='#666' name='flower-tulip-outline'/>
                                }
                            </TouchableOpacity>
                            <Text style={styles.zannum}>{item.num}</Text>
                        </View>
                        <View style={styles.footerbox}>
                            <TouchableOpacity>
                                <Icon4 style={styles.footericon} color='#666' name='share-outline'/>
                            </TouchableOpacity>
                            <Text style={styles.zannum}>分享</Text>
                        </View> */}
                    </View>
                </WingBlank >
            </View>
        )
    }
}

const styles = StyleSheet.create({
    navbar:{
        width:width,
        height:65*s,
        backgroundColor:'#FFBF2D',
        // backgroundColor:'#fff',
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
    title:{
        marginLeft:'auto',
        marginRight:"auto",
        textAlign:'center',
        fontSize:20,
        // color:'#fff',
        color:'#FFBF2D',
        letterSpacing:3
    },
    inner:{
        backgroundColor:'#ccc',
        marginTop:0.012*height,
        height:0.88*height,
        alignItems:'center'
    },
    paginationStyle: {
        position: 'absolute',
        bottom: 10,
        right: 10
    },
    pic:{
        height:0.6*height,
    },
    piccover:{
        height:0.8*height,
    },
    img:{
        width:0.9*width,
        height:0.6*height,
        marginRight:'auto',
        marginLeft:'auto',
        // backgroundColor:'#000'
    },
    imgcover:{
        width:0.9*width,
        height:0.8*height,
        marginRight:'auto',
        marginLeft:'auto',
        backgroundColor:'#000'
    },
    content:{

    },
    innerfooter:{
        width:0.87*width,
        height:0.06*height,
        // backgroundColor:'#ddd',
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'flex-end'
    },
    footerbox:{
        // backgroundColor:'#ccc',
        width:0.13*width,
        height:0.06*height,
        alignItems:'center',
        justifyContent:'center'
    },
    footericon:{
        width:0.13*width,
        height:0.04*height,
        // backgroundColor:'#ccc',
        // textAlignVertical:'bottom',
        // color:'#FFBF2D',
        textAlign:'center',
        fontSize:45*s,
    },
    zannum:{
        // backgroundColor:'#ccc',
        height:0.02*height,
        fontSize:18*s,
        // color:'#FFBF2D',
        textAlignVertical:'center'
    },
})

