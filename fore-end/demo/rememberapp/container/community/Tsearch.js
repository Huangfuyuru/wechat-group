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
import { TextInput } from 'react-native-gesture-handler';
const {width,scale,height} = Dimensions.get('window');
const s = width / 640;
export default class Tsearch extends Component {
    constructor(){
        super();
        this.state={
            btndisplay:'none',
            text:''
        }
    }
    componentDidMount(){
        
    }
    componentWillReceiveProps(nextProps) {
        
    }
    search = ()=>{
        
    }
    clear = ()=>{
        this.setState({
            text:'',
            btndisplay:'none'
        })
    }
    render() {
        
        return (
            <View>
                <View style={styles.navbar}>
                    <View style={styles.searchbox}>
                        <View style={styles.search}>
                            <TouchableOpacity onPress={this.search}>
                                <Icon1 name='search' style={styles.icon}/>
                            </TouchableOpacity>
                            <TextInput
                                style={styles.searchinput} 
                                placeholder='  搜索'
                                multiline={false}
                                value={this.state.text}
                                autoFocus
                                onChangeText={text=>{this.setState({text:text,btndisplay:'flex'})}}
                            />
                            <TouchableOpacity onPress={this.clear}>
                                <Text style={{
                                    display:this.state.btndisplay,
                                    backgroundColor:'rgba(205,205,205,0.15)',
                                    width:0.1*width,
                                    height:0.04*height,
                                    textAlignVertical:'center',
                                    textAlign:'center',
                                    borderRadius:5,
                                    color:'#555',   
                                }}>清空</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={()=>Actions.pop()}>
                            <Text style={styles.cancel}>返回</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <WingBlank style={styles.wingblank}>
                   
                </WingBlank>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    navbar:{
        width:width,
        height:0.08*height,
        justifyContent:"center",
        alignItems:'center'
    },
    searchbox:{
        width:width,
        height:0.08*height,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
    },
    search:{
        flexDirection:'row',
        width:0.77*width,
        height:0.06*height,
        alignItems:'center',
        paddingLeft:0.03*width,
        borderColor:'rgba(220,220,220,0.8)',
        borderWidth:1
    },
    icon:{
        width:0.065*width,
        color:'#FFBF2D',
        // backgroundColor:'#fff',
        fontSize:30*s,
    },
    searchinput:{
        width:0.55*width,
        height:0.055*height,
        alignItems:'center',
        backgroundColor:'#fff',
        textAlignVertical:'center',
        fontSize:25*s,
        color:'#333',
        marginRight:0.01*width,
        padding:0
    },
    cancel:{
        width:0.15*width,
        height:0.045*height,
        backgroundColor:'#FFBF2D',
        textAlign:'center',
        textAlignVertical:'center',
        fontSize:23*s,
        color:'#fff',
        borderRadius:5
    },
    wingblank:{
        height:0.8*height,
        marginTop:0.03*height,
        justifyContent:'center'
    },
    
})