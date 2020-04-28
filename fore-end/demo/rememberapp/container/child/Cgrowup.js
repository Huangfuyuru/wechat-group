import React, { Component } from 'react'
import { 
    Text, 
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    FlatList,
    Alert
} from 'react-native'
import { 
    WingBlank,
    List,
    Tabs,
} from '@ant-design/react-native';
import moment from 'moment';
import Icon1 from 'react-native-vector-icons/Feather'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon3 from 'react-native-vector-icons/Ionicons'
import Icon4 from 'react-native-vector-icons/Entypo'
import { Actions } from 'react-native-router-flux';
import {myFetch} from '../../src/utils'
const {width,scale,height} = Dimensions.get('window');
const s = width / 640;
export default class Cdairy extends Component {
    constructor(){
        super();
        this.state={
            cid:'',
            listcolor:'#FFBF2D',
            chartcolor:'#bdbbb8',
            lists:[]
        }
    }
    componentDidMount(){
        console.log(this.props.cid)
        this.setState({
            cid:this.props.cid
        },console.log(this.state.cid))
        myFetch.get('/child/cgrowup',{
            childsid:this.props.cid,
        }).then(res=>{
            console.log(res)
            if(res){
                this.setState({
                    lists:res
                })
            }else{
                this.setState({
                    lists:[]
                })
            }
        })
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            lists:nextProps.data
        })
    }
    rmGrow = (e)=>{
        Alert.alert('提示', '确定要删除吗？',
            [
                { text: "确定", onPress: ()=>{
                    myFetch.get('/child/cgrowup/crgrowup',{
                        childsid:this.state.cid,
                        childGrowid:e.id
                    }).then(res=>{
                        console.log('删除记录')
                        console.log(res.data)
                        console.log(res)
                        this.setState({
                            lists:res.data
                        })
                        // if(res.data){
                        // }else{
                        //     this.setState({
                        //         lists:[]
                        //     })
                        // }
                        // if(res.data){
                        // }else{
                        //     this.setState({
                        //         lists:[]
                        //     })
                        // }
                        ToastAndroid.showWithGravityAndOffset(
                        res.msg,
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER,
                        25,-100)
                    })
                } },
                { text: "返回", onPress: this.opntion2Selected },
            ]
        )
    }
    render() {
        const tabs = [
            { title: 
                <Text style={{color:this.state.listcolor}}>
                    <Icon2 style={styles.tabtitleicon} name='playlist-edit'/>
                    <Text style={styles.tabtitletext}>记录列表</Text>
                </Text>
            },
            { title: 
                <Text style={{color:this.state.chartcolor}}>
                    <Icon2 style={styles.tabtitleicon} name='chart-bar'/>
                    <Text style={styles.tabtitletext}>成长曲线</Text>
                </Text>
                
            },
        ];
        return (
            <View>
                <View style={styles.navbar}>
                    <Icon1 
                        style={styles.icon}
                        name='chevron-left'
                        onPress={()=>Actions.pop()}
                    />
                    <Text style={styles.title}>成长记录</Text>
                    <TouchableOpacity onPress={()=>Actions.ccgrowup({cid:this.state.cid})}>
                        <Icon3 style={styles.icon}  name='md-add'/>
                    </TouchableOpacity>
                </View>
                <WingBlank style={styles.wingblank}>
                    <Tabs
                        tabs={tabs}
                        tabBarUnderlineStyle={{backgroundColor:'#FFBF2D'}}
                        tabBarActiveTextColor='#FFBF2D'
                        swipeable={true}
                        onTabClick={(tab,index)=>{
                            if(index == 0){
                                this.setState({
                                    listcolor:'#ffbf2d',
                                    chartcolor:'#bdbbb8'
                                })
                            }else{
                                this.setState({
                                    chartcolor:'#ffbf2d',
                                    listcolor:'#bdbbb8'
                                })
                            }
                        }}
                    >
                        {
                            this.state.lists[0]
                            ?<View style={styles.tabbox}>
                                <FlatList  
                                    showsVerticalScrollIndicator={false}
                                    style={styles.listbox}
                                    data={this.state.lists}
                                    numColumns={1}
                                    ListFooterComponent={
                                        <View style={{
                                            height:0.01*height
                                        }}>
                                        </View>
                                    }
                                    renderItem={({item})=>{
                                        return <View style={styles.listblock}>
                                            <View style={styles.listtitle}>
                                                <Text style={styles.listtime}>{ moment(item.setdate).format("YYYY年MM月DD日  HH:mm:ss")}</Text>
                                                <TouchableOpacity onPress={()=>this.rmGrow(item)}>
                                                    <Icon3 color='#333' style={styles.listtitleicon} name='ios-trash'/>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={styles.listline}>
                                                <Text style={styles.listlinetitle}>
                                                    <Icon2 style={styles.listlineicon} name='cake-variant'/>  年龄：</Text>
                                                <Text style={styles.listlinetext}>{item.age}{item.unit}</Text>
                                            </View>
                                            <View style={styles.listline}>
                                                <Text style={styles.listlinetitle}>
                                                    <Icon4 style={styles.listlineicon} name='ruler'/>  身高：</Text>
                                                <Text style={styles.listlinetext}>{item.length}厘米</Text>       
                                            </View>
                                            <View style={styles.listline}>
                                                <Text style={styles.listlinetitle}>
                                                    <Icon2 style={styles.listlineicon} name='scale-bathroom'/>  体重：</Text>
                                                <Text style={styles.listlinetext}>{item.weight}千克</Text>   
                                            </View>
                                        </View>
                                    }}
                                    
                                />  
                            </View>
                            :<View>
                                <Text style={styles.nulltext}>还没有成长记录哦</Text>
                                <View style={styles.nullline}>
                                    <TouchableOpacity>
                                        <Icon1 size={50} color='#333' style={styles.nullicon} name='corner-right-up'/>
                                    </TouchableOpacity>
                                    <Text style={styles.nullcontent}>点击右上角 记录孩子的每一点成长</Text>
                                </View>
                            </View>
                        }
                        <View style={styles.tabbox}>
                            <View style={styles.chartbox}>
                            </View>
                        </View>
                    </Tabs>
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
        borderColor:'rgba(204,204,204,0.3)',
        borderStyle:'solid',
        borderWidth:1,
        justifyContent:'center'
    },
    tabtitleicon:{
        fontSize:35*s,
    },
    tabtitletext:{
        fontSize:16*s,
    },
    tabbox:{
        alignItems: 'center',
        height: 0.8*height,
        // backgroundColor:'#ccc',
        paddingTop:0.02*height,
        paddingBottom:0.03*height,
    },
    listbox:{
        width:0.86*width,
        // backgroundColor:'#ccc',
        transform:[{scale:0.98}]
    },
    listblock:{
        // backgroundColor:'rgba(255,191,45,0.1)',
        backgroundColor:'rgba(255,255,204,0.3)',
        borderRadius:5,
        height:0.27*height,
        transform:[{scale:0.95}],
        justifyContent:'center',
    },
    listtitle:{
        width:0.8*width,
        marginLeft:'auto',
        marginRight:'auto',
        height:0.03*height,
        flexDirection:'row'
    },
    listtime:{
        width:0.7*width,
        height:0.03*height,
    },
    listtitleicon:{
        width:0.1*width,
        height:0.03*height,
        fontSize:40*s,
        textAlign:'right',
    },
    listline:{
        width:0.7*width,
        height:0.06*height,
        backgroundColor:'rgba(204,204,204,0.2)',
        marginTop:0.01*height,
        marginLeft:'auto',
        marginRight:'auto',
        paddingLeft:0.1*width,
        flexDirection:'row',
        alignContent:'center'
    },
    listlineicon:{
        fontSize:32*s,
        color:'#555'
        // backgroundColor:'#000'
    },
    listlinetitle:{
        // backgroundColor:'#000',
        // marginRight:0.1*width,
        // letterSpacing:5,
        width:0.3*width,
        textAlignVertical:'center',
        fontSize:28*s,
    },
    listlinetext:{
        // backgroundColor:'#000',
        letterSpacing:3,
        textAlign:'center',
        textAlignVertical:'center',
        width:0.2*width,
        fontSize:25*s,
        color:'#333'

    },
    nulltext:{
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
        marginTop:0.03*height
    },
    nullline:{
        width:0.8*width,
        marginLeft:'auto',
        marginRight:'auto',
        height:0.2*height,
        marginTop:0.03*height,
        backgroundColor:'rgba(205,205,205,0.2)'
    },
    nullicon:{
        width:0.08*height,
        height:0.08*height,
        marginTop:-0.05*height,
        textAlignVertical:'center',
        marginLeft:0.7*width,
        textAlign:'center',
        backgroundColor:'rgba(255,255,255,0.3)'
    },
    nullcontent:{
        color:'#333',
        height: 0.08*height, 
        width: 0.7*width,
        textAlign:'center',
        textAlignVertical:'center',
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:0.02*height,
        // padding:0.01*width,
        fontSize:25*s,
        backgroundColor:'rgba(255,255,255,0.3)'
    },
    chartbox:{
        width:0.86*width,
        height: 0.75*height,
        transform:[{scale:0.98}],
        // backgroundColor:'#ccc'
    }
})