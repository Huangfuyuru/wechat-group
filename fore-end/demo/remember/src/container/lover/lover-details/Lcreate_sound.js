import React, { Component } from 'react'
import { NavBar, Icon } from 'antd-mobile';
import {Link} from  "react-router-dom"
export default class Lcreate_sound extends Component {
    render() {
        return (
            <div>
                 <NavBar 
                 style={{
                     background:'#FFBF2D',
                     height:'8vh',
                     color:'#fff',
                     fontWeight:'bolder',
                    }}
                    mode="light"
                    icon={'𡿨'}
                    onLeftClick={() => this.props.history.push('/lover/lsound')}
                 ><span style={{
                     color:'#fff',
                     fontWeight:'bold',
                     fontSize:'6vw',
                     textIndent:'3vw',
                     letterSpacing:'3vw'}}>添加语音</span>
                </NavBar>
            </div>
        )
    }
}
