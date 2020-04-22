import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TextInput
} from "react-native"
import Icon1 from 'react-native-vector-icons/Feather'
import { Actions } from 'react-native-router-flux';
const { width, scale, height } = Dimensions.get('window');
const s = width / 640;
export default class SouConent extends Component {
    constructor(){
        super()
        this.state = {
            arr:''
        }
    }
    componentDidMount(){
        this.setState({
            arr:this.props.data
        })
    }
    render() {
        const item=this.state.arr
        console.log(this.state.arr);
        return (
            <View>
            <View style={styles.navbar}>
                <Icon1
                    style={styles.icon}
                    name='chevron-left'
                    onPress={() => Actions.pop()}
                />
                <Text style={styles.title}>
                    详 情
                </Text>
            </View>
                <View style={{
                      width:0.95*width,
                      height:0.8*height,
                    //   backgroundColor:'rgba(221,204,255,.3)',  
                      backgroundColor:"rgba(255,192,203,.2)",                      
                      borderRadius:10,
                      borderColor:"#888",
                      borderWidth:0.5,
                      marginRight:"auto",
                      marginLeft:"auto",
                      marginTop:15*s
                }}>
                    <View style={{flexDirection:"row"}}>
                    <Text style={{
                        fontSize:25*s,
                        marginTop:30*s,
                        marginLeft:35*s,
                        marginRight:35*s
                }}
            >{item.date} 09:16</Text> 
             <Text style={{
                    fontSize:35*s,
                    textAlign:"center",
                    color:"#FF1744",
                    marginTop:10*s,
                }}
            >{item.heart}</Text> 
            </View>
                <TextInput 
                multiline={true}
                editable={false}
                style={{
                    marginRight:"auto",
                    marginLeft:"auto",
                    fontSize:25*s,
                    width:0.9*width,
                    backgroundColor:"#fff",                      
                    borderRadius:10,
                    marginBottom:30*s,
                    marginTop:35*s
,                   height:80*s,
                    color:"#000",
                    textAlignVertical: 'top',
                }}>{item.txt}
                </TextInput>
                  <Image
                style={{
                    height:0.5*height,
                    width:0.9*width,
                    marginRight:"auto",
                    marginLeft:"auto",
                    borderRadius:10,
                    marginTop:20*s
                }}
                 source={{uri:item.src}}></Image>
                </View>
           </View>
        )
    }
}
const styles = StyleSheet.create({
    navbar:{
        width:width,
        height:65*s,
        // backgroundColor:'white',
        backgroundColor: '#FFBF2D',
        flexDirection: 'row',
        paddingLeft:0.03*width,
        paddingTop:'1%',
        paddingRight:0.03*width,
        // justifyContent:"center",
       
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
