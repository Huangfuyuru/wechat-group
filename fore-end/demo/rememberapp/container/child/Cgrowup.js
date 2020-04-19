import React, { Component } from 'react'
import { 
    Text, 
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    FlatList
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
const {width,scale,height} = Dimensions.get('window');
const s = width / 640;


export default class Cdairy extends Component {
    constructor(){
        super();
        this.state={
            listcolor:'#FFBF2D',
            chartcolor:'#bdbbb8',
            lists:[
                {
                    id:1,
                    age:4,
                    unit:'岁',
                    length:100,
                    weight:40,
                    date:'Wed Apr 15 2020 17:19:31 GMT+0800'

                },
                {
                    id:2,
                    age:5,
                    unit:'岁',
                    length:128,
                    weight:40,
                    date:'Wed Apr 15 2020 17:19:31 GMT+0800'

                },
                {
                    id:3,
                    age:6,
                    unit:'岁',
                    length:130,
                    weight:40,
                    date:'Wed Apr 15 2020 17:19:31 GMT+0800'

                },
                {
                    id:4,
                    age:7,
                    unit:'岁',
                    length:145,
                    weight:40,
                    date:'Wed Apr 15 2020 17:19:31 GMT+0800'

                },
            ]
        }
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
        const option = {
            title: {
                text: 'ECharts demo'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
          };
        return (
            <View>
                <View style={styles.navbar}>
                    <Icon1 
                        style={styles.icon}
                        name='chevron-left'
                        onPress={()=>Actions.pop()}
                    />
                    <Text style={styles.title}>成长记录</Text>
                    <TouchableOpacity onPress={()=>Actions.ccgrowup()}>
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
                        <View style={styles.tabbox}>
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
                                        <Text style={styles.listtime}>{ moment(item.date).format(" YYYY年MM月DD日  HH:mm:ss")}</Text>
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
        backgroundColor:'rgba(238,255,221,0.5)',
        borderRadius:5,
        height:0.26*height,
        transform:[{scale:0.95}],
        justifyContent:'center',
    },
    listtime:{
        // backgroundColor:'#ccc',
        width:0.8*width,
        marginLeft:'auto',
        marginRight:'auto',
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
    chartbox:{
        width:0.86*width,
        height: 0.75*height,
        transform:[{scale:0.98}],
        // backgroundColor:'#ccc'
    }
})