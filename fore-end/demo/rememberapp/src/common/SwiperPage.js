import React, { Component } from 'react'
import { 
    Text, 
    View, 
    Image, 
    StyleSheet, 
    AsyncStorage,
    TouchableOpacity 
} from 'react-native'
import Swiper from 'react-native-swiper'
import { Actions } from 'react-native-router-flux';

export default class SwiperPage extends Component {
    start = ()=>{
        AsyncStorage.setItem('isInstall','true',()=>{
            this.props.afterInstall()
        });
        AsyncStorage.getItem('isLogin')
		.then(res=>{
			if(!res){
                Actions.login();
			}
		})
    };
    render() {
        return (
            <Swiper 
                style={styles.wrapper} 
                showsButtons={false}>
                <View style={styles.slide}>
                    <Image 
                        style={styles.img}
                        source={require('../../assets/bg1.png')}/>
                </View>
                <View style={styles.slide}>
                    <Image 
                        style={styles.img}
                        source={require('../../assets/bg2.png')}/>
                    <TouchableOpacity 
                        style={styles.start}  
                        onPress={this.start}
                    >
                        <Text 
                            style={{
                                color: '#fff',
                                height:50,
                                fontSize:20,
                                letterSpacing:5,
                                textAlign:'center',
                                textAlignVertical: 'center',
                            }}
                        >
                            立即体验
                        </Text>
                    </TouchableOpacity>
                </View>
            </Swiper>
        );

    }
}

const styles = StyleSheet.create({
    slide:{
        width:'100%',
        height:'100%'
    },
    img:{
        width:'100%',
        height:'100%'
    },
    start:{
        marginRight:'auto',
        marginLeft:'auto',
        bottom:150,
        width:150,
        height:50,
        backgroundColor:'#333',
        borderRadius:10

    }
})