import React, { Component } from 'react'
import {View ,Text} from "react-native"
export default class Lsouvenir extends Component {
    render() {
        return (
            <View style={{
                width: '100%',
                backgroundColor: '#FFBF2D',
                height: "5%",
                justifyContent: "center",
                flexDirection: 'row'
            }}><Text style={{
                fontWeight: 'bold',
                fontSize: 20,
                textIndent: 3,
                letterSpacing: 3,
                color: "#ffff",
                lineHeight: 40
            }}
            >纪念日</Text></View>
        )
    }
}
