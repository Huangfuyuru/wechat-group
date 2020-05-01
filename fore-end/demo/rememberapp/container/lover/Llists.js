import React from 'react';
import {
    ScrollView,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';
import { Tabs,Icon} from '@ant-design/react-native';
import Icon1 from 'react-native-vector-icons/Feather'
import Icon2 from 'react-native-vector-icons/Ionicons'
import { Actions } from 'react-native-router-flux';
import {myFetch} from '../../src/utils'
const { width, scale, height } = Dimensions.get('window');
const s = width / 640;
export default class Llists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loverId: "",
            arr:[],
            tabs: [
                {
                    imgurl: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3028025991,1307034645&fm=26&gp=0.jpg",
                    name: "快来做任务吧！",
                    tit: '★★★★★',
                    content:"跟你最爱的人一起，经历最美好的事情！",
                    setdate:"2020-04-27",
                    local:"乐园"
                }
            ]
        }
    }
    componentDidMount(){
        this.setState({
            loverId:this.props.loverId
        },()=>{
            myFetch.get('/lover/loverlist',{
                loverid:this.state.loverId
            }).then(res=>{
                // console.log("shuju",res)
                this.setState({  
                    arr:res.msg
                })
            })
        })
    }
    newStar(star){
        let ss='';
        if(star==1){
            ss = "★";
        }
        else if(star==2){
            ss = "★★";
        }
        else if(star==3){
            ss = "★★★";
        }else if(star==4){
            ss = "★★★★";
        }else if(star==5){
            ss = "★★★★★";
        }
        return ss;
    }
    componentWillReceiveProps(nextProps) {
        console.log("next",nextProps.data)
        this.setState({
            arr:nextProps.data
        })
    }
    render() {
        if(this.state.arr==null||this.state.arr==[]){
            return(
            <View style={{ flex: 1}}>
                <View style={styles.navbar}>
                    <Icon1
                        style={styles.icon}
                        name='chevron-left'
                        onPress={() => Actions.pop()}
                    />
                    <Text style={styles.title}>恋爱清单</Text>
                    <Icon2 
                        style={styles.icon}
                        name="md-add"
                        onPress={()=>Actions.lslists({loverId:this.state.loverId})}
                    />
                </View>
                <Tabs
                    tabs={this.state.tabs}
                    initialPage={0}
                    tabBarPosition="bottom"
                    renderTabBar={props => <Tabs.DefaultTabBar {...props} page={1} />}
                    style={{
                        marginTop:40*s,
                        
                    }}
                >
                    {
                        this.state.tabs.map((item,idx) => (
                            <TouchableOpacity activeOpacity={0.9} onPress={()=>Actions.list({data:this.state.tabs[idx]})}>
                            <View style={{ 
                                height: 850 * s,
                                width:width*0.90,
                                borderColor:"#C7C7CC",
                                borderWidth:1,
                                borderRadius:15,
                                flexDirection:"column",
                                alignItems:"center",
                                marginLeft:"auto",
                                marginRight:"auto",
                                 }}>
                                <Image
                                style={{
                                    height: 650 * s,
                                    width:width*0.85,
                                    borderColor:"#C7C7CC",
                                    borderWidth:1,
                                    borderRadius:15,
                                    marginTop:"3%"
                                }}
                                 source={{ uri: item.imgurl }}></Image>
                                <Text style={{
                                     marginTop:"8%",
                                     fontSize:20,
                                }}>{item.name ? (item.name.length >= 12 ? item.name.substr(0, 12) + "..." : item.name) : ""}</Text>
                                 <Text style={{
                                     marginTop:"8%",
                                     fontSize:20,
                                     color:"#FF1744",
                                }}>{item.tit}</Text>
                            </View>
                            </TouchableOpacity>
                        ))
                    }
                </Tabs>
            </View>)
    }
    else{
        return(
            <View style={{ flex: 1}}>
                 <View style={styles.navbar}>
                    <Icon1
                        style={styles.icon}
                        name='chevron-left'
                        onPress={() => Actions.pop()}
                    />
                    <Text style={styles.title}>恋爱清单</Text>
                    <Icon2 
                        style={styles.icon}
                        name="md-add"
                        onPress={()=>Actions.lslists({loverId:this.state.loverId})}
                    />
                </View>
                <Tabs
                    tabs={this.state.arr}
                    initialPage={0}
                    tabBarPosition="bottom"
                    renderTabBar={props => <Tabs.DefaultTabBar {...props} page={1} />}
                    style={{
                        marginTop:40*s,
                        
                    }}
                >
                    {
                        this.state.arr.map((item,idx) => (
                            <TouchableOpacity activeOpacity={0.9} onPress={()=>Actions.list({data:this.state.arr[idx]})}>
                            <View style={{ 
                                height: 850 * s,
                                width:width*0.90,
                                borderColor:"#C7C7CC",
                                borderWidth:1,
                                borderRadius:15,
                                flexDirection:"column",
                                alignItems:"center",
                                marginLeft:"auto",
                                marginRight:"auto",
                                 }}>
                                <Image
                                style={{
                                    height: 650 * s,
                                    width:width*0.85,
                                    borderColor:"#C7C7CC",
                                    borderWidth:1,
                                    borderRadius:15,
                                    marginTop:"3%"
                                }}
                                 source={{ uri: item.imgurl }}></Image>
                                <Text style={{
                                     marginTop:"8%",
                                     fontSize:20,
                                }}>{item.name ? (item.name.length >= 12 ? item.name.substr(0, 12) + "..." : item.name) : ""}</Text>
                                 <Text style={{
                                     marginTop:20*s,
                                     fontSize:20,
                                     color:"#FF1744",
                                }}>{this.newStar(item.difficulty)}</Text>
                            </View>
                            </TouchableOpacity>
                        ))
                    }
                </Tabs>
            </View>
        )
    }
}
}
const styles = StyleSheet.create({
    navbar:{
        width:width,
        height:65*s,
        backgroundColor: '#FFBF2D',
        // backgroundColor:'white',
        flexDirection: 'row',
        paddingLeft:0.03*width,
        paddingTop:'1%',
        paddingRight:0.03*width,
        justifyContent:"center",
        // borderBottomColor:"black",
        // borderBottomWidth:0.5
    },
    icon:{
        width:0.08*width,
        color:'#fff',
        fontSize:28,
    },
    title: {
        marginLeft: 'auto',
        marginRight: "auto",
        textAlign: 'center',
        fontSize: 20,
        color: '#fff',
        letterSpacing: 3
    },
})