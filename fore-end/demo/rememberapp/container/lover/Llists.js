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
            tabs: [
                {
                    src: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3028025991,1307034645&fm=26&gp=0.jpg",
                    txt: "一起去对方的高中、大学",
                    tit: '★★★★★'
                },
                {
                    src: "https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1354279089,2926899578&fm=26&gp=0.jpg",
                    txt: "一起做手工艺品",
                    tit: '★★★'
                },
                {
                    src:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1351639397,1746387236&fm=26&gp=0.jpg",
                    txt: "一起去旅行",
                    tit: '★★'
                },
                {
                    src: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=326370248,1769001733&fm=26&gp=0.jpg",
                    txt: "一起去看电影",
                    tit: '★★★★'
                },
                

            ],
        }
    }
    
    componentDidMount(){
        this.setState({
            loverId:this.props.loverId
        },()=>{
            console.log("爱人ID",this.state.loverId)
            myFetch.get('/lover/loverlist',{
                loverid:this.state.loverId
            }).then(res=>{
                console.log('清单数据',res)
            })
        })
       
    }
    render() {
        return (
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
                        // marginBottom:60*s,
                    }}
                    // tabBarBackgroundColor="#fff"
                    // tabBarActiveTextColor="#FF1744"
                    // tabBarInactiveTextColor="#FF1744"
                    // tabBarTextStyle={{
                    //     fontSize:20
                    // }}
                    // tabBarUnderlineStyle={{
                    //     borderColor:"#fff",
                    //     borderWidth:1
                    // }}
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
                                 source={{ uri: item.src }}></Image>
                                <Text style={{
                                     marginTop:"8%",
                                     fontSize:20,
                                }}>{item.txt ? (item.txt.length >= 12 ? item.txt.substr(0, 12) + "..." : item.txt) : ""}</Text>
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
            </View>

        );
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