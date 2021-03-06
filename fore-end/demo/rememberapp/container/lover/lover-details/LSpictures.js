import React, { Component } from 'react'
import { 
    Text, 
    View,
    StyleSheet,
    Dimensions,
    FlatList,
    Image,
    TouchableOpacity,
    Alert,
    ImageBackground,
    Modal,
    TouchableWithoutFeedback,
    CameraRoll,
    ToastAndroid,
    ScrollView,
    // CheckBox,
} from 'react-native'
import { 
    WingBlank,
    List,
} from '@ant-design/react-native';
import {myFetch} from '../../../src/utils'
import { Actions } from 'react-native-router-flux';
import Icon1 from 'react-native-vector-icons/Feather'
import Icon2 from 'react-native-vector-icons/MaterialIcons'
import Icon3 from 'react-native-vector-icons/Entypo'
import Icon4 from 'react-native-vector-icons/EvilIcons'
import Icon5 from 'react-native-vector-icons/MaterialCommunityIcons'
// import Icon1 from 'react-native-vector-icons/Feather'
import Button from 'react-native-button'
import CheckBox from 'react-native-checkbox'
import Item from '@ant-design/react-native/lib/list/ListItem';
const {width,scale,height} = Dimensions.get('window');
const s = width / 640;
const image = 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2342845640,3656514420&fm=26&gp=0.jpg'
// const image = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587984434404&di=bf40c32f66d4044edf58042a728f0bd1&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F3503b3b19c1bc0928766b62de18a5433dad71cf911089-tluSYK_fw658'
// const image = 'http://img.taopic.com/uploads/allimg/111130/500-111130135A160.jpg'
export default class Cdairy extends Component {
    constructor(){
        super();
        this.state={
            times:0,
            checkboxtimes:0,
            checkboxdisabled:'none',
            visible:false,
            boxopacity:'none',
            chooseopacity:0,
            currentpicture:'',
            lists:[],
            pid:"",
            currentpictureid:"",
        };
        this.onChange = activeSections => {
            this.setState({ activeSections });
        };
    }
    componentDidMount(){
        this.setState({
            pid:this.props.pid
        })
        myFetch.get('/lover/lpictures/show',{
            loverPhotoListid:this.props.pid
        }).then(res=>{
            // console.log("相册详情",res)
            if(res.code==0){
                const arr0=res.msg;
                arr0.map((item)=>{
                   item.check=false;
                })
                this.setState({
                    lists: arr0
                })
            }else{
                this.setState({
                    lists:[]
                })
            }
        })
    }
    componentWillReceiveProps(nextProps) {
        myFetch.post('/lover/lpictures/laddpictures',{
            loverPhotoListid:this.state.pid,
            imgurl:nextProps.data
        }).then(res=>{
            if(res.data){
                const arr0=res.data;
                arr0.map((item)=>{
                   item.check=false;
                })
                this.setState({
                    lists: arr0
                })
            }else{
                this.setState({
                    lists:[]
                })
            }
        })
    }
    delUplist(uplist){
        myFetch.post('/lover/lpictures/ldelpictures',{
            pid:this.state.pid,
            loverPhotoid:uplist
        }).then(res=>{
            if(res.data){
                const arr0=res.data;
                arr0.map((item)=>{
                   item.check=false;
                })
                this.setState({
                    lists: arr0
                })
                ToastAndroid.showWithGravityAndOffset(
                    res.msg,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
                25,0)
            }
            else{
                this.setState({
                    lists: []
                })
            }
        })
    }
    compile = ()=>{
        this.setState({
            times:this.state.times+1
        },()=>{
            if(this.state.times % 2 == 0){
                this.setState({
                    boxopacity:'none'
                })
            }else{
                this.setState({
                    boxopacity:'flex'
                }) 
            }
        })
    }
    delpictures = ()=>{
        if(this.state.lists[0]){
            this.setState({
                checkboxtimes:this.state.checkboxtimes+1
            },()=>{
                if(this.state.checkboxtimes % 2 == 0){
                    this.setState({
                        checkboxdisabled:'none',
                    })
                    const data=[...this.state.lists];
                    const uplist=[];
                    data.map((item) => {
                        if(item.check){
                            uplist.push(item.id)
                        }
                    })
                    this.delUplist(uplist)
                }else{
                    this.setState({
                        checkboxdisabled:'flex'
                    }) 
                }
            })
        }else{
            ToastAndroid.showWithGravityAndOffset(
            '一张图片都没有！',
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
            0,-350)
        }
    }
    enlarge=(item)=>{
        this.setState({
            visible:true,
            currentpicture:item.imgurl,
            currentpictureid:item.id,
        })
    }
    delete=(checked,id)=>{
        const data=[...this.state.lists]
        data.map((item) => {
            if (item.id == id) {
                if(checked){
                    item.check=true;
                }
                else{
                    item.check=false;
                }
            }
        })
        this.setState({
            lists:data
        })
    }
    savePictures=()=>{
        Alert.alert('提示', '',
            [
                { text: "返回", onPress: this.opntion2Selected },
                { text: "删除", onPress: ()=>{
                    Alert.alert('提示', '确定要删除吗？',
                        [
                            { text: "确定", onPress: ()=>{
                                this.setState({
                                    visible:false
                                })
                                const del=[this.state.currentpictureid]
                                this.delUplist(del)
                            } },
                            { text: "返回", onPress: this.opntion2Selected },
                        ]
                    )
                } },
                { text: "保存", onPress: ()=>{
                    Alert.alert('提示', '确定要保存到本地？',
                        [
                            { text: "确定", onPress: ()=>{
                                ToastAndroid.showWithGravityAndOffset(
                                    '已保存！',
                                ToastAndroid.SHORT,
                                ToastAndroid.CENTER,
                                25,0)
                            } },
                            { text: "返回", onPress: this.opntion2Selected },
                        ]
                    )
                } },
                
                
            ]
        )
        // const storeLocation = `${RNFS.ExternalDirectoryPath}`;
        // let pathName = new Date().getTime() + "联系我们.png"
        // let downloadDest = `${storeLocation}/${pathName}`;
        // const ret = RNFS.downloadFile({fromUrl:this.state.pic,toFile:downloadDest});
        // ret.promise.then(res => {
        //     if(res && res.statusCode === 200){
        //         var promise = CameraRoll.saveToCameraRoll("file://" + downloadDest);
        //         promise.then(function(result) {
        //             Alert.alert("图片已保存至相册")
        //         }).catch(function(error) {
        //             Alert.alert("保存失败")
        //         })
        //     }
        // })
    }
    render() {
        return (
            <View>
                <View style={styles.navbar}>
                    <TouchableOpacity onPress={()=>Actions.pop()}>
                        <Icon1 style={styles.icon} name='chevron-left'/>
                    </TouchableOpacity>
                    <Text style={styles.title}>{this.props.pname}</Text>
                    <TouchableOpacity onPress={this.compile}>
                        <Icon1 style={styles.icon} name='more-horizontal'/>
                    </TouchableOpacity>
                </View>
                <View 
                    style={{
                        width:0.3*width,
                        marginLeft:0.7*width,
                        height:0.055*height,
                        paddingTop:0.008*height,
                        paddingBottom:0.01*height,
                    }}>
                    <View style={{
                        display:this.state.boxopacity,
                        flexDirection:'row',
                    }}
                    >
                        <TouchableOpacity onPress={this.delpictures} style={styles.btn}>
                            <Icon1 style={styles.btnicon} name='trash-2'/>
                            <Text  style={styles.btntext}>删除</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>Actions.addpictures()} style={styles.btn}>
                            <Icon5 style={styles.btnicon} name='image-plus'/>
                            <Text style={styles.btntext}>添加</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <WingBlank style={styles.wingblank}>
                {
                    this.state.lists[0]
                    ?<FlatList  
                        style={styles.picbox}
                        data={this.state.lists}
                        numColumns={4}
                        ListFooterComponent={
                            <View style={{
                                height:0.04*width
                            }}>
                            </View>
                        }
                        renderItem={({item})=>(
                            <TouchableOpacity
                                key={item.id}
                                onPress={()=>this.enlarge(item)}
                                style={styles.pics}>
                                <ImageBackground
                                    style={styles.pics}
                                    resizeMode="cover"
                                    source={{uri:`${item.imgurl}`}}
                                >
                                    <CheckBox
                                        checkboxStyle={{
                                            backgroundColor:'rgba(255,255,255,0.5)',
                                            display:`${this.state.checkboxdisabled}`,
                                            marginLeft:0.16*width,
                                        }}
                                        label=''
                                        onChange={
                                            checked => this.delete(checked, item.id)
                                            // checked => console.log('I am checked', checked)
                                        }
                                    />
                                    
                                </ImageBackground>
                            </TouchableOpacity>
                        )}
                    />  
                    :<View style={styles.picbox}>
                        <Text style={styles.nulltext}>哎呀~ 竟然一张照片都没有</Text>
                        <ImageBackground
                            style={styles.nullpics}
                            resizeMode="cover"
                            source={{uri:`${image}`}}
                        >
                            <TouchableOpacity>
                                <Icon1
                                    style={styles.nullicon}
                                    name='corner-right-up'
                                    size={50}
                                    color='#333'
                                />
                            </TouchableOpacity>
                            <Text style={styles.nullinnertext}>点击右上角添加一张图片吧</Text>
                        </ImageBackground>
                    </View>
                }
                    
                </WingBlank>
                <Modal
                    transparent
                    visible={this.state.visible}
                >
                    <View style={styles.navbar}>
                        <TouchableOpacity onPress={()=>{this.setState({visible:false})}}>
                            <Icon1 style={styles.icon} name='chevron-left'/>
                        </TouchableOpacity>
                        <Text style={styles.title}>我的相册</Text>
                        <Icon1 style={styles.icon}/>
                    </View>
                    <View style={{
                        backgroundColor:'#fff',
                        height:height
                    }}>
                        <WingBlank style={{
                            height:0.8*height,
                            marginTop:0.05*height,
                            borderColor:'rgba(204,204,204,0.3)',
                            borderStyle:'solid',
                            borderWidth:1,
                            justifyContent:'center'
                            // backgroundColor:'rgba(255,255,255,0.1)',
                        }}>
                            <TouchableWithoutFeedback
                                onLongPress={this.savePictures}
                            >
                                <Image
                                    style={{
                                        width:0.9*width,
                                        height:0.78*height,
                                        marginLeft:'auto',
                                        marginRight:'auto',
                                        zIndex:1,
                                        // backgroundColor:'#000'

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
    title:{
        marginLeft:'auto',
        marginRight:"auto",
        textAlign:'center',
        fontSize:20,
        color:'#fff',
        letterSpacing:3
    },
    btn:{
        width:0.1*width,
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
        height:0.8*height,
        padding:0.01*width,
        borderColor:'rgba(204,204,204,0.3)',
        borderStyle:'solid',
        borderWidth:1,
        // backgroundColor:'rgba(255,191,45,0.1)'
    },
    pics:{
        width:0.212*width,
        height:180*s,
        margin:0.005*width,
        // backgroundColor:"pink",
        transform: [{scale:0.95}]
    },
    nulltext:{
        marginTop:0.01*height,
        width:0.55*width,
        height:0.05*height,
        fontSize:23*s,
        letterSpacing:1,
        color:'#333',
        backgroundColor:'rgba(221, 221, 221,0.2)',
        marginLeft:'auto',
        marginRight:'auto',
        textAlign:'center',
        textAlignVertical:'center',
    },
    nullpics:{
        width:0.85*width,
        height:0.7*height,
        alignItems:'center',
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:0.01*height
    },
    nullicon:{
        width:0.08*height,
        height:0.08*height,
        marginTop:-0.04*height,
        marginLeft:0.75*width,
        textAlignVertical:'center',
        textAlign:'center',
        // backgroundColor:'#ccc'
        backgroundColor:'rgba(255,255,255,0.3)'
    },
    nullinnertext:{
        fontSize:30*s,
        color:'#333',
        height: 0.05*height, 
        width: 0.65*width,
        transform: [{scale:0.9}],
        textAlign:'center',
        marginTop:0.1*height,
        backgroundColor:'rgba(255,255,255,0.3)',
        textAlignVertical:'center'
    }
})
