import React, { Component } from 'react'
import { 
    Text, 
    StyleSheet, 
    Dimensions, 
    View, 
    Image, 
    TouchableOpacity, 
    TouchableHighlight,
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
import Swiper from 'react-native-swiper'
// import ImagePicker from 'react-native-image-crop-picker'
const { width, scale, height } = Dimensions.get('window');
const s = width / 640;
const h = height / 1012;
const image = 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3230746282,4148313693&fm=15&gp=0.jpg'
const image1 = 'http://img.zcool.cn/community/019de45c32c171a80121df90bbe9ca.jpg@1280w_1l_2o_100sh.jpg'
export default class Community extends Component {
    constructor(props){
        super(props);
        // var uid = JSON.parse(localStorage.getItem('uid'));
        this.state={
            onPress:0,
            refreshing:false,
            lists:[
                {
                    title:1
                },
                {
                    title:2
                },
                {
                    title:3
                },
                {
                    title:4
                },
            ]
        }
    }
    componentDidMount(){
        console.log('社区第一次加载');
       
    }
    componentDidUpdate(prevProps,prevState){
        console.log('更新')
    
    }
    render() {
        const renderPagination = (index, total, context) => {
            return (
              <View style= {styles.paginationStyle}>
                <Text style={styles.text}>
                  <Text style={styles.paginationText}>{index+1}</Text>/{total}
                </Text>
              </View>
            );
          }
        const VIEWABILITY_CONFIG = {
    		viewAreaCoveragePercentThreshold: 80,//item滑动80%部分才会到下一个
		};
        const tabs = [{ title: '关注'},{ title: '推荐'}];
        const linetabs = [{title:'全部'},{title:'亲子'},{title:'爱人'}]
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
                renderUnderline={() =>null}
                // swipeable={true}
                // tabBarUnderlineStyle={{borderColor:'#000'}}
                styles={{
                    topTabBarSplitLine: {
                        borderBottomWidth: 0,
                    },
                }}
                tabs={tabs}
                renderTabBar={tabProps => (
                    <View style={styles.navbar}>
                        <View style={styles.navbartitle}>
                            <TouchableOpacity onPress={()=>Actions.tsearch()}>
                                <Icon2 style={styles.title} name='ios-search'/>
                            </TouchableOpacity>
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
                                            width:0.2*width,
                                            fontSize:tabProps.activeTab === i ? 28*s : 24*s,
                                            // backgroundColor:'#ccc',
                                            fontWeight: tabProps.activeTab === i ? 'bold' : 'normal',
                                            color: tabProps.activeTab === i ? '#FFBF2D' : 'rgba(0,0,0,0.6)',
                                        }}
                                    >
                                        {tab.title}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                            <TouchableOpacity onPress={()=>Actions.tdiscuss()}>
                                <Icon2 style={styles.icon} name='ios-add-circle-outline'/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.navbarline}>
                            {linetabs.map((item, i) => (
                                <TouchableOpacity
                                    onPress={()=>{
                                    this.setState({onPress:i})
                                }}
                                >
                                    <Text
                                        style={{
                                            height:0.04*height,
                                            textAlign:'center',
                                            textAlignVertical:'center',
                                            width:0.1*width,
                                            fontSize:18*s,
                                            // backgroundColor:'#ccc',
                                            color:this.state.onPress == i ? 'rgba(0,0,0,0.7)' : '#999',
                                        }}
                                    >
                                        {item.title}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                )}
                >
                    <WingBlank style={styles.wingblank}>
                        <FlatList
                            refreshing = {this.state.refreshing}
                            onRefresh={()=>{this.setState({refreshing:false})}}
                            extraData={this.state}
                            data={this.state.lists}
                            horizontal={false}
                            pagingEnabled={true}
                            viewabilityConfig={VIEWABILITY_CONFIG}
                            showsVerticalScrollIndicator={false}
                            renderItem={({item})=>(
                                <View style={styles.innerbox}>
                                    <View style={styles.innertitle}>

                                    </View>
                                    <View style={styles.innerpics}>
                                        <Swiper
                                            renderPagination = {renderPagination} 
                                            style={styles.wrapper} 
                                            showsButtons={true}
                                            // loop={false}
                                            horizontal={true}
                                            autoplay={true}>
                                            <View style={{width:'100%',height:'100%'}}>
                                                {/* <Image
                                                    // resizeMode="cover" 
                                                    style={styles.img}
                                                    source={{uri:image}}/> */}
                                                <Text>1</Text>
                                            </View>
                                            <View style={{width:'100%',height:'100%'}}>
                                                {/* <Image
                                                    // resizeMode="cover" 
                                                    style={styles.img}
                                                    source={{uri:image1}}/> */}
                                                <Text>2</Text>
                                            </View>
                                            <View style={{width:'100%',height:'100%'}}>
                                                {/* <Image
                                                    // resizeMode="cover" 
                                                    style={styles.img}
                                                    source={{uri:image1}}/> */}
                                                <Text>3</Text>                                   
                                            </View>                                        
                                        </Swiper>

                                    </View>
                                </View>
                            )}
                            getItemLayout={(data, index) => {
                                return {length: height, offset: height * index, index}
                            }}
                            // keyExtractor={(item, index) => index.toString()}
                            // onViewableItemsChanged={this._onViewableItemsChanged}
                        />
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
        height:0.115*height,
        width:width,
        alignItems:'center',
        marginBottom:0.005*height
    },
    navbartitle:{
        width:width,
        height:0.07*height,
        backgroundColor:'#fff',
        flexDirection: 'row',
        paddingTop:0.015*height,
        justifyContent:'center',
        paddingRight: 0.03 * width,
        paddingLeft: 0.03 * width,
    },
    icon: {
        width: 0.08 * width,
        marginLeft:0.2*width,
        color: '#FFBF2D',
        fontSize: 32,
        textAlign:'center',
        textAlignVertical:'center',
    },
    title: {
        width: 0.08 * width,
        marginRight:0.2*width,
        color: '#999',
        fontSize: 30,
        textAlign:'center',
        textAlignVertical:'center',
    },
    navbarline:{
        width:0.4*width,
        height:0.05*height,
        flexDirection: 'row',
        justifyContent:"center",
    },
    wingblank:{
        height:0.75*height,
        marginTop:0.01*height,
        justifyContent:'center',
        // backgroundColor:'#FFBF2D',
        backgroundColor:'rgba(250,250,250,1)'
    },
    innerbox:{
        // backgroundColor:'#ccc',
        height:0.75*height,
        alignItems:'center'
    },
    innertitle:{
        width:0.9*width,
        height:0.1*height,
        // backgroundColor:'#000',
        marginBottom:0.01*height,
        marginTop:0.01*height
    },
    innerpics:{
        width:0.87*width,
        // backgroundColor:'#ddccff',
        height:0.5*height,
        alignItems:'center'
    },
    wrapper:{
        width:0.87*width,
        // backgroundColor:'#000',
        height:0.5*height
    },
    paginationStyle: {
        position: 'absolute',
        bottom: 10,
        right: 10
    },
    img:{
        width:0.87*width,
        height:0.5*height
    }
})
