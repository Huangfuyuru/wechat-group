import React, { Component } from 'react'
import { 
    Text, 
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    FlatList,
    Image,
    ScrollView,
    Modal,
    Alert
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
import {Echarts, echarts} from 'react-native-secharts';
import { Actions } from 'react-native-router-flux';
import {myFetch} from '../../src/utils'
const {width,scale,height} = Dimensions.get('window');
const s = width / 640;


export default class Cdairy extends Component {
    constructor(){
        super();
        this.state={
            cid:'',
            currentitem:'',
            visible:false,
            enableScrollViewScroll: true,
            listcolor:'#FFBF2D',
            chartcolor:'#bdbbb8',
            lists:[],
            onPress:0,
            subjectlist:[],
            scorelist:[]

        }
    }
    componentDidMount(){
        console.log(this.props.cid)
        this.setState({
            cid:this.props.cid
        })
        myFetch.get('/child/cstudy',{
            cid:this.props.cid
        }).then(res=>{
            // console.log('成绩：')
            // console.log(res)
            var list=[];
            if(res){
                // if(res[0].stage === '小学'){
                //     this.setState({onPress:0})
                // }else if(res[0].stage === '初中'){
                //     this.setState({onPress:1})
                // }else{
                //     this.setState({onPress:2})
                // }

                // var list = [];
                var subjectlist = [];
                var scorelist =[];
                // for(var i in res){
                //     console.log(res[i])
                //     if(res[i].stage === res[0].stage){
                //         subjectlist.push(res[i].cont.subject);
                //         scorelist.push(res[i].cont.scorelist);
                //     }        
                // }
                for(var i in res[0].cont){
                    subjectlist.push(res[0].cont[i].subject);
                    scorelist.push(res[0].cont[i].score);
                }
                // console.log(scorelist)
                this.setState({
                    lists:res,
                    subjectlist:subjectlist,
                    scorelist:scorelist
                })
            }else{
                this.setState({
                    lists:[],
                    subjectlist:[],
                    scorelist:[]
                })
            }
        })
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.data){
            var subjectlist = [];
            var scorelist =[];
            for(var i in nextProps.data[0].cont){
                subjectlist.push(nextProps.data[0].cont[i].subject);
                scorelist.push(nextProps.data[0].cont[i].score);
            }
            this.setState({
                lists:nextProps.data,
                subjectlist:subjectlist,
                scorelist:scorelist
            })
        }
    }
    rmStudy = (e)=>{
        Alert.alert('提示', '确定要删除吗？',
            [
                { text: "确定", onPress: ()=>{
                    myFetch.get('/child/cstudy/dchildScore',{
                        cid:this.state.cid,
                        id:e.id
                    }).then(res=>{
                        var subjectlist = [];
                        var scorelist =[];
                        for(var i in res.data[0].cont){
                            subjectlist.push(res.data[0].cont[i].subject);
                            scorelist.push(res.data[0].cont[i].score);
                        }
                        this.setState({
                            lists:res.data,
                            subjectlist:subjectlist,
                            scorelist:scorelist
                        })
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
        const currentitem = this.state.currentitem;
        var currenttitle ='';
        var time = (moment(currentitem.date).format("YYYY-MM-DD")).split('-');
        // console.log(Number(time[1]))
        if(Number(time[1])>=3 && Number(time[1])<=8){
            currenttitle = time[0]+'年 下学期'
        }else{
            currenttitle = time[0]+'年 上学期'
        }
        var option = {
            title:{
                text:currenttitle
            },
            xAxis: {
                type: 'category',
                data: this.state.subjectlist
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: this.state.scorelist,
                    type: 'bar',
                    color: ['#aaddee'],
                },
            ]
        };
        const choosetabs = [{title:'小学'},{title:'初中'},{title:'高中'}]
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
                    <Text style={styles.tabtitletext}>成绩曲线</Text>
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
                    <TouchableOpacity onPress={()=>Actions.pop()}>
                        <Icon1 style={styles.icon} name='chevron-left'/>
                    </TouchableOpacity>
                    <Text style={styles.title}>学业记录</Text>
                    <TouchableOpacity onPress={()=>Actions.ccstudy({cid:this.state.cid})}>
                        <Icon3 style={styles.icon}  name='md-add'/>
                    </TouchableOpacity>
                </View>
                <WingBlank style={styles.wingblank}>
                    <Tabs 
                        tabs={tabs}
                        // page={0}
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
                        {
                            this.state.lists[0]
                            ?<View
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
                                                <View style={styles.listtitle}>
                                                    <Text style={styles.listtime}>{ moment(item.setdate).format("YYYY年MM月DD日  HH:mm:ss")}</Text>
                                                    <TouchableOpacity onPress={()=>this.rmStudy(item)}>
                                                        <Icon3 color='#333' style={styles.listtitleicon} name='ios-trash'/>
                                                    </TouchableOpacity>
                                                </View>              
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
                                                    <TouchableOpacity 
                                                        onPress={()=>{
                                                            this.setState({
                                                                visible:true,
                                                                currentitem:item
                                                            })
                                                        }}
                                                    >
                                                        <FlatList
                                                            // style={styles.recordsbox}
                                                            data={item.cont}
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
                                                                    <Text style={styles.listlinetext}>{isNaN(item.score)?0:item.score}分</Text>
                                                                </View>
                                                            }}
                                                        />  
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        })
                                    }
                                </ScrollView>
                            </View>
                            :<View>
                                <Text style={styles.nulltext}>还没有学业记录哦</Text>
                                <View style={styles.nullline}>
                                    <TouchableOpacity>
                                        <Icon1 size={50} color='#333' style={styles.nullicon} name='corner-right-up'/>
                                    </TouchableOpacity>
                                    <Text style={styles.nullcontent}>点击右上角 记录孩子的每一次进步</Text>
                                </View>
                            </View>
                        }
                        <View style={styles.tabbox}>
                            <View style={styles.choosechart}>
                                {/* {choosetabs.map((item, i) => (
                                    <TouchableOpacity
                                        onPress={()=>{
                                        this.setState({onPress:i});
                                    }}
                                    >
                                        <Text
                                            style={{
                                                height:0.025*height,
                                                textAlign:'center',
                                                textAlignVertical:'center',
                                                width:0.2*width,
                                                fontSize:20*s,
                                                // backgroundColor:'#ccc',
                                                color:this.state.onPress == i ? '#FFBF2D' : '#999',
                                            }}
                                        >
                                            {
                                                this.state.onPress == i
                                                ?<Icon3 size={20*s} color='#FFBF2D' name='md-radio-button-on'/>
                                                :<Icon3 size={20*s} color='#999' name='md-radio-button-off'/>
                                            } {item.title}
                                        </Text>
                                    </TouchableOpacity>
                                ))} */}
                            </View>
                            <View style={styles.chartbox}>
                                <Echarts
                                    // onPress={null} 
                                    option={option} 
                                    height={0.75*height}
                                    backgroundColor	= 'rgba(205,205,205,0.1)'
                                />
                            </View>
                        </View>
                    </Tabs>
                </WingBlank>

                <Modal
                    transparent
                    visible={this.state.visible}
                >
                    <View style={styles.navbar}>
                        <TouchableOpacity onPress={()=>{this.setState({visible:false})}}>
                            <Icon1 style={styles.icon} name='chevron-left'/>
                        </TouchableOpacity>
                        <Text style={styles.title}>{currentitem.stage} {moment(currentitem.date).format("YYYY年MM月DD日")}</Text>
                        <Icon3 style={styles.icon}/>
                    </View>
                    <View style={{
                        backgroundColor:'#fff',
                        height:height
                    }}>
                        <WingBlank style={styles.wingblank}>
                            <View style={styles.currentitem}>
                                <Text style={styles.currenttitle}>{currenttitle}</Text>
                                <FlatList
                                    data={currentitem.cont}
                                    numColumns={1}
                                    ListFooterComponent={
                                        <View style={{
                                            height:0.01*height
                                        }}>
                                        </View>
                                    }
                                    renderItem={({item})=>{
                                        var iconlist=[];
                                            if(item.stage == '小学'){
                                                iconlist = primary;
                                            }else if(item.stage == '初中'){
                                                iconlist = junior;
                                            }else{
                                                iconlist = senior;
                                            }
                                        var icon='';
                                        for(var i in iconlist){
                                            if(item.subject == iconlist[i].subject){
                                                icon = iconlist[i].icon
                                            }
                                        }
                                        return <View style={{
                                            width:0.7*width,
                                            height:0.06*height,
                                            backgroundColor:'rgba(255,255,255,1)',
                                            marginBottom:0.02*height,
                                            marginLeft:'auto',
                                            marginRight:'auto',
                                            flexDirection: 'row',
                                            justifyContent:'center',
                                        }}>
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
        height: 0.8*height,
        // backgroundColor:'#ccc'
    },
    listbox:{
        width:0.86*width,
        height:0.75*height,
        marginBottom:0.02*height,
        // backgroundColor:'#ccddff',
        transform:[{scale:0.98}]
    },
    listblock:{
        // backgroundColor:'rgba(255,191,45,0.1)',
        // backgroundColor:'#ccc',
        backgroundColor:'rgba(204,204,204,0.3)',
        borderRadius:5,
        height:0.35*height,
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
        width:0.2*width,
        // backgroundColor:"#ccc",
        fontSize:23*s,
        color:'#555',
    },
    currentitem:{
        backgroundColor:'rgba(204,204,204,0.3)',
        borderRadius:5,
        transform:[{scale:0.95}],
        height:0.85*height,
        paddingTop:0.03*height,
        justifyContent:'center'
    },
    currenttitle:{
        width:0.5*width,
        marginLeft:'auto',
        marginRight:'auto',
        height:0.07*height,
        backgroundColor:"#fff",
        textAlign:'center',
        textAlignVertical:'center',
        color:'#333',
        fontSize:30*s,
        borderRadius:10,
        marginBottom:0.03*height
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
    choosechart:{
        // backgroundColor:"#ddd",
        width:0.8*width,
        justifyContent:'center',
        flexDirection:'row',
        height:0.01*height,
        // height:0.025*height,
        marginTop:0.01*height,
    },
    chartbox:{
        width:0.86*width,
        height: 0.75*height,
        // marginTop:0.01*height,
        transform:[{scale:0.98}],
        // backgroundColor:'#ccc'
    }
})