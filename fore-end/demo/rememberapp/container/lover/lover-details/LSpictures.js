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
    ScrollView
} from 'react-native'
import { 
    WingBlank,
    List,
} from '@ant-design/react-native';
import { Actions } from 'react-native-router-flux';
import Icon1 from 'react-native-vector-icons/Feather'
// import Icon1 from 'react-native-vector-icons/Feather'
import Button from 'react-native-button'
const {width,scale,height} = Dimensions.get('window');
const s = width / 640;
export default class LSpictures extends Component {
    constructor(){
        super();
        this.state={
            visible:false,
            currentpicture:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1965785648,597280275&fm=26&gp=0.jpg',
            lists:[
                {
                    name:'我的相册',
                    pid:1,
                    background:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1965785648,597280275&fm=26&gp=0.jpg'
                },
                {
                    name:'我的相册',
                    pid:1,
                    background:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1965785648,597280275&fm=26&gp=0.jpg'
                },
                {
                    name:'我的相册',
                    pid:1,
                    background:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1965785648,597280275&fm=26&gp=0.jpg'
                },
                {
                    name:'我的相册',
                    pid:1,
                    background:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1965785648,597280275&fm=26&gp=0.jpg'
                },
                {
                    name:'我的相册',
                    pid:1,
                    background:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1965785648,597280275&fm=26&gp=0.jpg'
                },
                {
                    name:'我的相册',
                    pid:1,
                    background:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1965785648,597280275&fm=26&gp=0.jpg'
                },
                {
                    name:'我的相册',
                    pid:1,
                    background:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1965785648,597280275&fm=26&gp=0.jpg'
                },
                {
                    name:'我的相册',
                    pid:1,
                    background:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1965785648,597280275&fm=26&gp=0.jpg'
                },
                {
                    name:'我的相册',
                    pid:1,
                    background:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1965785648,597280275&fm=26&gp=0.jpg'
                },
                {
                    name:'我的相册',
                    pid:1,
                    background:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1965785648,597280275&fm=26&gp=0.jpg'
                },
                {
                    name:'我的相册',
                    pid:1,
                    background:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1965785648,597280275&fm=26&gp=0.jpg'
                },
                {
                    name:'我的相册',
                    pid:1,
                    background:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1965785648,597280275&fm=26&gp=0.jpg'
                },
                {
                    name:'我的相册',
                    pid:1,
                    background:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1965785648,597280275&fm=26&gp=0.jpg'
                },
                {
                    name:'我的相册',
                    pid:1,
                    background:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1965785648,597280275&fm=26&gp=0.jpg'
                },
                {
                    name:'我的相册',
                    pid:1,
                    background:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1965785648,597280275&fm=26&gp=0.jpg'
                },
                {
                    name:'我的相册',
                    pid:1,
                    background:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1965785648,597280275&fm=26&gp=0.jpg'
                },
                {
                    name:'我的相册',
                    pid:1,
                    background:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1965785648,597280275&fm=26&gp=0.jpg'
                },
                {
                    name:'我的相册',
                    pid:1,
                    background:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1965785648,597280275&fm=26&gp=0.jpg'
                },
                {
                    name:'我的相册',
                    pid:1,
                    background:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1965785648,597280275&fm=26&gp=0.jpg'
                },
                {
                    name:'我的相册',
                    pid:1,
                    background:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1965785648,597280275&fm=26&gp=0.jpg'
                },
                {
                    name:'我的相册',
                    pid:1,
                    background:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1965785648,597280275&fm=26&gp=0.jpg'
                },
                {
                    name:'我的相册',
                    pid:1,
                    background:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1965785648,597280275&fm=26&gp=0.jpg'
                },
            ],
            activeSections: [2, 0],
            childs:[1,2,3,4]

        };
        this.onChange = activeSections => {
            this.setState({ activeSections });
        };
    }

    enlarge=()=>{
        this.setState({
            visible:true
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
                                ToastAndroid.showWithGravityAndOffset(
                                    '已删除！',
                                ToastAndroid.SHORT,
                                ToastAndroid.CENTER,
                                25,0)
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
        const lists = this.state.lists;
        
        return (
            <View>
                <View style={styles.navbar}>
                    <Icon1 
                        style={styles.icon}
                        name='chevron-left'
                        onPress={()=>Actions.pop()}
                    />
                    <Text style={styles.title}>我的相册</Text>
                    <Icon1
                        onPress={()=>{
                            
                        }}
                        
                        style={styles.icon}
                        name='more-horizontal'
                    />
                    
                </View>
                <WingBlank>
                    <FlatList  
                        style={styles.picbox}
                        data={lists}
                        numColumns={4}
                        ListFooterComponent={
                            <View style={{
                                height:0.04*width
                            }}>
                            </View>
                        }
                        renderItem={({item})=>(
                            <TouchableOpacity
                                onPress={this.enlarge}
                                style={styles.pics}>
                                <ImageBackground
                                    // onPress={this.enlarge}
                                    style={styles.pics}
                                    resizeMode="cover"
                                    source={{uri:`${item.background}`}}
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
                        <Text style={styles.title}>我的相册</Text>
                        <Icon1 style={styles.icon}/>
                    </View>
                    <View style={{
                        backgroundColor:'#fff',
                        height:height
                    }}>
                        <WingBlank style={{
                            height:900*s,
                            marginTop:30*s,
                            borderColor:'rgba(204,204,204,0.3)',
                            borderStyle:'solid',
                            borderWidth:1,
                            // backgroundColor:'rgba(255,255,255,0.1)',
                        }}>
                            <TouchableWithoutFeedback
                                onLongPress={this.savePictures}
                            >
                                <Image
                                    style={{
                                        width:0.9*width,
                                        height:900*s,
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
    title:{
        marginLeft:'auto',
        marginRight:"auto",
        textAlign:'center',
        fontSize:20,
        color:'#fff',
        letterSpacing:3
    },
    picbox:{
        marginTop:50*s,
        height:930*s,
        padding:0.01*width,
        borderColor:'rgba(204,204,204,0.3)',
        borderStyle:'solid',
        borderWidth:2,
        // backgroundColor:'rgba(255,191,45,0.1)'
    },
    pics:{
        width:0.212*width,
        height:180*s,
        margin:0.005*width,
        transform: [{scale:0.95}]
    },
})
