import React, { Component } from 'react'
import { 
    Text, 
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import { 
    WingBlank,
    List,
    Tabs,
} from '@ant-design/react-native';
import Icon1 from 'react-native-vector-icons/Feather'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon3 from 'react-native-vector-icons/Ionicons'

import { Actions } from 'react-native-router-flux';
const {width,scale,height} = Dimensions.get('window');
const s = width / 640;


export default class Cdairy extends Component {
    constructor(){
        super();
        this.state={
            listcolor:'#FFBF2D',
            chartcolor:'#bdbbb8'
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
        // const tabs = [
        //     { title: <Icon2 style={styles.tabtitle} name='playlist-edit'/> },
        //     { title: <Icon2 style={styles.tabtitle} name='chart-bar'/>},
        // ];
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
                        <View style={styles.tabbox}>
                            <Text>Content of First Tab</Text>
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
        // justifyContent: 'center',
        height: 0.80*height,
        // backgroundColor: '#fff',
        // backgroundColor:'#ccc'
    },
})