import React, { Component } from 'react'
import { 
    Text, 
    View,
    StyleSheet,
    Dimensions,
} from 'react-native'
import Icon1 from 'react-native-vector-icons/Feather'
import { Actions } from 'react-native-router-flux';
const {width,scale} = Dimensions.get('window');
const s = width / 640;
export default class Cdairy extends Component {
    render() {
        return (
            <View>
                <View style={styles.navbar}>
                    <Icon1 
                        style={styles.icon}
                        name='chevron-left'
                        onPress={()=>Actions.pop()}
                    />
                    <Text 
                        style={{
                            width:0.6*width,
                            marginLeft:'auto',
                            marginRight:"auto",
                            textAlign:'center',
                            fontSize:20,
                            color:'#fff'
                        }}
                    >语音记事</Text>
                </View>
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
        paddingRight:0.05*width,
        justifyContent:"center"
    },
    icon:{
        color:'#fff',
        fontSize:30
    },
})
