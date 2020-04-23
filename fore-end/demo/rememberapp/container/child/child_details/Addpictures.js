import React, { Component } from 'react'
import { 
    Text, 
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    FlatList,
    ImageBackground,
    Image
} from 'react-native'
import Icon1 from 'react-native-vector-icons/Feather'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon3 from 'react-native-vector-icons/Entypo'
import Icon4 from 'react-native-vector-icons/FontAwesome'
import { Actions } from 'react-native-router-flux';
import { WingBlank } from '@ant-design/react-native'
const {width,scale,height} = Dimensions.get('window');
const s = width / 640;
export default class Cdairy extends Component {
    constructor(){
        super();
        this.state={
            lists:[
                {
                    path:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3754156404,1749528164&fm=26&gp=0.jpg',
                    id:1
                },
                {
                    path:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3754156404,1749528164&fm=26&gp=0.jpg',
                    id:1
                },
                {
                    path:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3754156404,1749528164&fm=26&gp=0.jpg',
                    id:1
                },
                {
                    path:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3754156404,1749528164&fm=26&gp=0.jpg',
                    id:1
                },
                {
                    path:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3754156404,1749528164&fm=26&gp=0.jpg',
                    id:1
                },
                {
                    path:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3754156404,1749528164&fm=26&gp=0.jpg',
                    id:1
                },
                {
                    path:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3754156404,1749528164&fm=26&gp=0.jpg',
                    id:1
                },
                {
                    path:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3754156404,1749528164&fm=26&gp=0.jpg',
                    id:1
                },
                {
                    path:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3754156404,1749528164&fm=26&gp=0.jpg',
                    id:1
                },
                {
                    path:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3754156404,1749528164&fm=26&gp=0.jpg',
                    id:1
                },
                {
                    path:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3754156404,1749528164&fm=26&gp=0.jpg',
                    id:1
                },
                {
                    path:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3754156404,1749528164&fm=26&gp=0.jpg',
                    id:1
                },
                {
                    path:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3754156404,1749528164&fm=26&gp=0.jpg',
                    id:1
                },
                {
                    path:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3754156404,1749528164&fm=26&gp=0.jpg',
                    id:1
                },
                {
                    path:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3754156404,1749528164&fm=26&gp=0.jpg',
                    id:1
                },
                {
                    path:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3754156404,1749528164&fm=26&gp=0.jpg',
                    id:1
                },
                {
                    path:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3754156404,1749528164&fm=26&gp=0.jpg',
                    id:1
                },
                {
                    path:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3754156404,1749528164&fm=26&gp=0.jpg',
                    id:1
                },
                {
                    path:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3754156404,1749528164&fm=26&gp=0.jpg',
                    id:1
                },
                {
                    path:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3754156404,1749528164&fm=26&gp=0.jpg',
                    id:1
                },
                {
                    path:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3754156404,1749528164&fm=26&gp=0.jpg',
                    id:1
                },
                {
                    path:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3754156404,1749528164&fm=26&gp=0.jpg',
                    id:1
                },
                {
                    path:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3754156404,1749528164&fm=26&gp=0.jpg',
                    id:1
                },
                {
                    path:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3754156404,1749528164&fm=26&gp=0.jpg',
                    id:1
                },
                {
                    path:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3754156404,1749528164&fm=26&gp=0.jpg',
                    id:1
                },
                {
                    path:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3754156404,1749528164&fm=26&gp=0.jpg',
                    id:1
                },
                {
                    path:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3754156404,1749528164&fm=26&gp=0.jpg',
                    id:1
                },
                {
                    path:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3754156404,1749528164&fm=26&gp=0.jpg',
                    id:1
                },
                {
                    path:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3754156404,1749528164&fm=26&gp=0.jpg',
                    id:1
                },
                {
                    path:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3754156404,1749528164&fm=26&gp=0.jpg',
                    id:1
                },
                {
                    path:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3754156404,1749528164&fm=26&gp=0.jpg',
                    id:1
                },
                {
                    path:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3754156404,1749528164&fm=26&gp=0.jpg',
                    id:1
                },
                {
                    path:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3754156404,1749528164&fm=26&gp=0.jpg',
                    id:1
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
                    <Text style={styles.title}>增加照片</Text>
                </View>
                <View style={styles.btnbox}>
                    <TouchableOpacity onPress={this.delpictures} style={styles.btn}>
                        <Icon3 style={styles.btnicon} name='images'/>
                        <Text style={styles.btntext}>图库选择</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn}>
                        <Icon3 style={styles.btnicon} name='camera'/>
                        <Text style={styles.btntext}>立即拍照</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn}>
                        <Icon2 style={styles.btnicon} name='checkbox-multiple-marked-circle'/>
                        <Text style={styles.btntext}>确认上传</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn}>
                        <Icon3 style={styles.btnicon} name='cycle'/>
                        <Text style={styles.btntext}>重新选择</Text>
                    </TouchableOpacity>
                </View>
                <WingBlank style={styles.wingblank}>
                    <FlatList  
                        style={styles.picbox}
                        data={this.state.lists}
                        numColumns={4}
                        ListFooterComponent={
                            <View style={{
                                height:0.03*width
                            }}>
                            </View>
                        }
                        renderItem={({item})=>(
                            <View style={styles.pics}>
                                <Image
                                    style={styles.pics}
                                    resizeMode="cover"
                                    source={{uri:`${item.path}`}}
                                />
                            </View>
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
    btnbox:{
        width:0.7*width,
        marginLeft:'auto',
        marginRight:'auto',
        // backgroundColor:'#000',
        height:0.06*height,
        paddingTop:0.01*height,
        paddingBottom:0.01*height,
        flexDirection:'row',
    },
    btn:{
        width:0.125*width,
        // backgroundColor:'#ffddee',
        marginLeft:0.025*width,
        marginRight:0.025*width,
    },
    btnicon:{
        textAlign:'center',
        height:0.035*height,
        textAlignVertical:'center',
        // backgroundColor:'#ccddff',
        fontSize:35*s,
        color:'#FFBF2D'
    },
    btntext:{
        textAlign:'center',
        fontSize:15*s,
        color:'#bdbbb8'
    },
    wingblank:{
        marginTop:0.01*height,
        height:0.79*height,
        // backgroundColor:'#000'
    },
    picbox:{
        // height:930*s,
        padding:0.01*width,
        borderColor:'rgba(204,204,204,0.3)',
        borderStyle:'solid',
        borderWidth:2,
    },
    pics:{
        width:0.212*width,
        height:0.165*height,
        margin:0.005*width,
        transform: [{scale:0.95}],
        justifyContent:'center',
        alignContent:'center',
    },
})
