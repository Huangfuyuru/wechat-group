import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
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
                    {item.txt}
                </Text>
            </View>
                <View style={{
                      width:0.9*width,
                      height:0.8*height,
                      backgroundColor:"#fff",
                    //   marginLeft:"auto",
                    //   marginRight:"auto",
                    //   marginTop:10,
                    //   borderColor:"#C7C7CC",
                    //   borderWidth:1,
                      borderRadius:15,
                }}> 
                <Image
                style={{
                    height:0.55*height,
                    width:width,
                    // marginLeft:"auto",
                    // marginRight:"auto",
                    // marginTop:10,
                    // borderRadius:10
                }}
                 source={{uri:item.src}}></Image>
                <Text style={{
                    marginRight:"auto",
                    marginTop:10,
                    fontSize:15
                }}>今天打卡了砰然心动，青梅竹马，简直不要不要的！</Text>
                <Text style={{
                     marginLeft:"auto",
                     marginTop:30,
                }}
                >2020-03-16</Text>
                <Text style={{
                     marginLeft:"auto",
                     marginTop:20,
                }}
                >北京</Text>
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
        justifyContent:"center",
       
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
