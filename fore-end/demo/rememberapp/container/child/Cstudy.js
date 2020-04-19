import React, { Component } from 'react'
import { 
    Text, 
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    FlatList,
    Image,
    ScrollView
} from 'react-native'
import { 
    WingBlank,
    List,
    Tabs,
} from '@ant-design/react-native';
import moment from 'moment'
import Icon1 from 'react-native-vector-icons/Feather'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon3 from 'react-native-vector-icons/Ionicons'
import Icon4 from 'react-native-vector-icons/Ionicons'

import { Actions } from 'react-native-router-flux';
const {width,scale,height} = Dimensions.get('window');
const s = width / 640;


export default class Cdairy extends Component {
    constructor(){
        super();
        this.state={
            enableScrollViewScroll: true,
            listcolor:'#FFBF2D',
            chartcolor:'#bdbbb8',
            lists:[
                {
                    stage:'小学',
                    date:'Wed Apr 15 2020 17:19:31 GMT+0800',
                    records:[
                        {
                            subject:'语文',
                            score:100,
                        },
                        {
                            subject:'数学',
                            score:100,
                        },
                        {
                            subject:'英语',
                            score:100,
                        },
                    ]
                },
                {
                    stage:'高中',
                    date:'Wed Apr 15 2020 17:19:31 GMT+0800',
                    records:[
                        {
                            subject:'语文',
                            score:100,
                        },
                        {
                            subject:'数学',
                            score:100,
                        },
                        {
                            subject:'英语',
                            score:100,
                        },
                        {
                            subject:'物理',
                            score:100,
                        },
                        {
                            subject:'化学',
                            score:100,
                        },
                        {
                            subject:'生物',
                            score:100,
                        },
                    ]
                },
                {
                    stage:'高中',
                    date:'Wed Apr 15 2020 17:19:31 GMT+0800',
                    records:[
                        {
                            subject:'语文',
                            score:100,
                        },
                        {
                            subject:'数学',
                            score:100,
                        },
                        {
                            subject:'英语',
                            score:100,
                        },
                        {
                            subject:'物理',
                            score:100,
                        },
                        {
                            subject:'化学',
                            score:100,
                        },
                        {
                            subject:'生物',
                            score:100,
                        },
                    ]
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
                    <Text style={styles.tabtitletext}>学业曲线</Text>
                </Text>
                
            },
        ];
        const primary=[
            {
                subject:'语文',
                icon:require('../../assets/xxyw.png')
            },
            {
                subject:'数学',
                icon:require('../../assets/xxsx.png')
            },
            {
                subject:'英语',
                icon:require('../../assets/xxyy.png')
            },
            {
                subject:'品德',
                icon:require('../../assets/xxpd.png')
            },
            {
                subject:'科学',
                icon:require('../../assets/xxkx.png')
            },
        ];
        const junior=[
            {
                subject:'语文',
                icon:require('../../assets/czyw.png')
            },
            {
                subject:'数学',
                icon:require('../../assets/czsx.png')
            },
            {
                subject:'英语',
                icon:require('../../assets/czyy.png')
            },
            {
                subject:'物理',
                icon:require('../../assets/czwl.png')
            },
            {
                subject:'化学',
                icon:require('../../assets/czhx.png')
            },
            {
                subject:'生物',
                icon:require('../../assets/czsw.png')
            },
            {
                subject:'历史',
                icon:require('../../assets/czls.png')
            },
            {
                subject:'地理',
                icon:require('../../assets/czdl.png')
            },
            {
                subject:'政治',
                icon:require('../../assets/czzz.png')
            },
        ]
        const senior=[
            {
                subject:'语文',
                icon:require('../../assets/gzyw.png')
            },
            {
                subject:'数学',
                icon:require('../../assets/gzsx.png')
            },
            {
                subject:'英语',
                icon:require('../../assets/gzyy.png')
            },
            {
                subject:'物理',
                icon:require('../../assets/gzwl.png')
            },
            {
                subject:'化学',
                icon:require('../../assets/gzhx.png')
            },
            {
                subject:'生物',
                icon:require('../../assets/gzsw.png')
            },
            {
                subject:'历史',
                icon:require('../../assets/gzls.png')
            },
            {
                subject:'地理',
                icon:require('../../assets/gzdl.png')
            },
            {
                subject:'政治',
                icon:require('../../assets/gzzz.png')
            },
        ]
        return (
            <View>
                <View style={styles.navbar}>
                    <Icon1 
                        style={styles.icon}
                        name='chevron-left'
                        onPress={()=>Actions.pop()}
                    />
                    <Text style={styles.title}>学业记录</Text>
                    <TouchableOpacity onPress={()=>Actions.ccstudy()}>
                        <Icon3 style={styles.icon}  name='md-add'/>
                    </TouchableOpacity>
                </View>
                <WingBlank style={styles.wingblank}>
                    <Tabs 
                        tabs={tabs}
                        tabBarUnderlineStyle={{
                            // borderColor:'#FFBF2D'
                            backgroundColor:'#FFBF2D'
                        }}
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
                        <View
                            onStartShouldSetResponderCapture={() => {
                                this.setState({ enableScrollViewScroll: true });
                            }} 
                            style={styles.tabbox}>
                            <ScrollView 
                                showsVerticalScrollIndicator={false}
                                scrollEnabled={this.state.enableScrollViewScroll}
                                ref={myScroll => (this._myScroll = myScroll)}
                                style={styles.listbox}
                            >
                                {
                                    this.state.lists&&this.state.lists.map((item,idx)=>{
                                        var iconlists=[];
                                        if(item.stage == '小学'){
                                            iconlists = primary;
                                        }else if(item.stage == '初中'){
                                            iconlists = junior;
                                        }else{
                                            iconlists = senior;
                                        }
                                        return <View style={styles.listblock}>
                                            <Text style={styles.listtime}>{ moment(item.date).format(" YYYY年MM月DD日  HH:mm:ss")}</Text>
                                            <Text style={styles.liststage}>{item.stage}</Text>
                                            <View 
                                                style={styles.recordsbox}
                                                onStartShouldSetResponderCapture={() => {
                                                    this.setState({ enableScrollViewScroll: false });
                                                    if (this._myScroll.contentOffset === 0
                                                        && this.state.enableScrollViewScroll === false) {
                                                        this.setState({ enableScrollViewScroll: true });
                                                    }
                                                }}>
                                                <FlatList  
                                                    // style={styles.recordsbox}
                                                    data={item.records}
                                                    numColumns={1}
                                                    ListFooterComponent={
                                                        <View style={{
                                                            height:0.01*height
                                                        }}>
                                                        </View>
                                                    }
                                                    renderItem={({item})=>{
                                                        var icon='';
                                                        for(var i in iconlists){
                                                            if(item.subject == iconlists[i].subject){
                                                                icon = iconlists[i].icon
                                                            }
                                                        }
                                                        return <View style={styles.listline}>
                                                            <Image
                                                            resizeMode="contain" 
                                                            style={styles.listlineicon} 
                                                            source={icon}/>
                                                            <Text style={styles.listlinetitle}>{item.subject}</Text>
                                                            <Text style={styles.listlinetext}>{item.score}分</Text>
                                                        </View>
                                                    }}
                                                    
                                                />  
                                            </View>
                                        </View>
                                    })
                                }
                            </ScrollView>
                            
                        </View>
                        <View style={styles.tabbox}>
                            <Text>Content of Second Tab</Text>
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
        justifyContent:'center',
    },
    tabtitleicon:{
        fontSize:35*s,
    },
    tabtitletext:{
        fontSize:16*s,
    },
    tabbox:{
        alignItems: 'center',
        // justifyContent: 'center',
        height: 0.80*height,
        // backgroundColor: '#fff',
        // backgroundColor:'#ccc'
    },
    listbox:{
        width:0.86*width,
        height:0.75*height,
        marginBottom:0.02*height,
        // backgroundColor:'#ccc',
        transform:[{scale:0.98}]
    },
    listblock:{
        // backgroundColor:'rgba(255,191,45,0.1)',
        backgroundColor:'rgba(204,204,204,0.3)',
        borderRadius:5,
        height:0.35*height,
        transform:[{scale:0.95}],
        justifyContent:'center',
    },
    listtime:{
        // backgroundColor:'#ccc',
        width:0.8*width,
        height:0.03*height,
        marginLeft:'auto',
        marginRight:'auto',
    },
    liststage:{
        // backgroundColor:'#ccc',
        width:0.3*width,
        height:0.05*height,
        textAlign:'center',
        textAlignVertical:'center',
        fontSize:25*s,
        color:'#555',
        marginLeft:'auto',
        marginRight:'auto',
    },
    recordsbox:{
        width:0.75*width,
        // backgroundColor:'#ccc',
        height:0.25*height,
        marginLeft:'auto',
        marginRight:'auto',
        paddingTop:0.015*height,
    },
    listline:{
        width:0.7*width,
        height:0.06*height,
        backgroundColor:'rgba(255,255,255,1)',
        marginBottom:0.02*height,
        marginLeft:'auto',
        marginRight:'auto',
        flexDirection: 'row',
        justifyContent:'center',
    },
    listlineicon:{
        width:0.075*width,
        height:0.075*width,
        // backgroundColor:'#ccc',
        marginBottom:'auto',
        marginTop:'auto',
    },
    listlinetitle:{
        marginLeft:0.02*width,
        width:0.2*width,
        // backgroundColor:"#ccc",
        // textAlign:'center',
        textAlignVertical:'center',
        fontSize:25*s,
    },
    listlinetext:{
        textAlign:'center',
        textAlignVertical:'center',
        width:0.1*width,
        // backgroundColor:"#ccc",
        fontSize:23*s,
        color:'#555',
    },
    chartbox:{
        width:0.86*width,
        height: 0.75*height,
        transform:[{scale:0.98}],
        // backgroundColor:'#ccc'
    }
})