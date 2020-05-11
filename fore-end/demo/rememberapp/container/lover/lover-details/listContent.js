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
export default class listContent extends Component {
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
        return (
            <View>
            <View style={styles.navbar}>
                <Icon1
                    style={styles.icon}
                    name='chevron-left'
                    onPress={() => Actions.pop()}
                />
                <Text 
                style={styles.title}
                >
                    {item.name? (item.name.length >= 10 ? item.name.substr(0, 10) + "..." : item.name) : ""}
                </Text>
            </View>
                <View style={{
                      width:width,
                      height:0.8*height,
                      backgroundColor:"#fff",
                     
                }}> 
                <Image
                style={{
                    height:0.5*height,
                    width:width,
                     marginRight:"auto",
                    marginLeft:"auto",
                }}
                 source={{uri:item.imgurl}}></Image>
                <TextInput 
                multiline={true}
                editable={false}
                style={{
                    marginRight:"auto",
                    marginLeft:"auto",
                    marginTop:10,
                    fontSize:25*s,
                    width:0.96*width,
                    // backgroundColor:"pink",
                    height:200*s,
                    color:"#000",
                    textAlignVertical: 'top',
                }}>{item.content}
                </TextInput>
                <Text style={{
                     marginLeft:"auto",
                     marginRight:30*s,
                    
                }}
            >{item.setdate? (item.setdate.length >= 10 ? item.setdate.substr(0, 10) : item.setdate) : ""}</Text>
                <Text style={{
                      marginLeft:"auto", 
                     marginTop:10*s,
                     marginRight:30*s,
                }}
            >{item.local}</Text>
                </View>
           </View>
        )
    }  
}
const styles = StyleSheet.create({
    navbar:{
        width:width,
        height:65*s,
        backgroundColor: '#FFBF2D',
        flexDirection: 'row',
        paddingLeft:0.02*width,
        paddingTop:'1%',
        paddingRight:0.1*width,
        justifyContent:"center"
       
    },
    icon:{
        width:0.08*width,
        color:'#fff',
        fontSize:30,
    },
    title: {
        marginLeft:"auto",
        marginRight:"auto",
        textAlign: 'center',
        fontSize: 20,
        color: '#fff',
        letterSpacing: 3
    },
})
