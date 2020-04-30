import React, { Component } from 'react'
import { 
    Text, 
    StyleSheet, 
    Dimensions, 
    View, 
    Image, 
    TouchableOpacity, 
    AsyncStorage,
    StatusBar,
    ScrollView,
    FlatList,
    ImageBackground,
    DrawerLayoutAndroid
} from 'react-native'
import { 
    Flex, 
    WingBlank,
    Icon, 
    SearchBar, 
    TabBar,
    Tabs
} from '@ant-design/react-native'
import {
    Actions
} from 'react-native-router-flux'
import Icon1 from 'react-native-vector-icons/Feather'
import Icon2 from 'react-native-vector-icons/Ionicons'
import ImagePicker from 'react-native-image-picker'
// import ImagePicker from 'react-native-image-crop-picker'
const { width, scale, height } = Dimensions.get('window');
const s = width / 640;
const h = height / 1012;
const image = 'http://img.zcool.cn/community/019de45c32c171a80121df90bbe9ca.jpg@1280w_1l_2o_100sh.jpg'
export default class Lover extends Component {
    constructor(props){
        super(props);
        // var uid = JSON.parse(localStorage.getItem('uid'));
        this.state={
        }
    }
    componentDidMount(){
        console.log('社区第一次加载');
       
    }
    componentDidUpdate(prevProps,prevState){
        console.log('更新')
    
    }
    render() {
        const tabs = [{ title: '关注'},{ title: '推荐'}];
        return (
            <View style={{ 
                width: width, 
                height: height, 
                backgroundColor: "#fff",
            }}>
                <StatusBar 
                    backgroundColor='#FFBF2D'
                />
                <Tabs
                renderUnderline={() => null}
                styles={{
                    topTabBarSplitLine: {
                        borderBottomWidth: 0,
                    },
                }}
                tabs={tabs}
                renderTabBar={tabProps => (
                    <View style={styles.navbar}>
                        <Text style={styles.title}></Text>
                        {tabProps.tabs.map((tab, i) => (
                            <TouchableOpacity
                            key={tab.key || i}
                            onPress={() => {
                                const { goToTab, onTabClick } = tabProps;
                                onTabClick && onTabClick(tabs[i], i);
                                goToTab && goToTab(i);
                            }}
                            >
                                <Text
                                    style={{
                                        height:0.055*height,
                                        textAlign:'center',
                                        textAlignVertical:'center',
                                        width:0.15*width,
                                        fontSize:tabProps.activeTab === i ? 28*s : 24*s,
                                        // backgroundColor:'#ccc',
                                        fontWeight: tabProps.activeTab === i ? 'bold' : 'normal',
                                        color: tabProps.activeTab === i ? '#FFBF2D' : '#222',
                                    }}
                                >
                                    {tab.title}
                                </Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity>
                            <Icon2 style={styles.icon} name='ios-search'/>
                        </TouchableOpacity>
                    </View>
                )}
                >
                    <WingBlank style={styles.wingblank}>

                    </WingBlank>
                    {/* <View style={styles.tabbox}>
                        
                    </View> */}
                </Tabs>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    navbar:{
        width:width,
        height:0.07*height,
        // backgroundColor:'#FFBF2D',
        backgroundColor:'#fff',
        flexDirection: 'row',
        paddingTop:0.015*height,
        justifyContent:"center",
        paddingRight: 0.03 * width,
        paddingLeft: 0.03 * width,
    },
    icon: {
        width: 0.32 * width,
        paddingRight:0.027*width,
        color: '#333',
        fontSize: 30,
        textAlign:'right',
        textAlignVertical:'center',
    },
    title: {
        width: 0.32 * width,
        fontWeight: 'bold',
        fontSize: 20,
        letterSpacing: 3,
        color: "#ffff",
    },
    wingblank:{
        height:0.8*height,
        marginTop:0.025*height,
        justifyContent:'center',
        // backgroundColor:'#FFBF2D',
        backgroundColor:'#ccc'
    },
    tabbox:{
        // alignItems: 'center',
        // height: 0.8*height,
        // backgroundColor:'#ccc',
        // paddingTop:0.02*height,
        // paddingBottom:0.03*height,
    },
})
