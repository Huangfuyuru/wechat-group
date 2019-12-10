import React, { Component } from 'react'
import { NavBar,WingBlank} from 'antd-mobile';
import "../../../css/lover.css"
import {Link} from "react-router-dom"

export default class Lcreate_souver extends Component {
    render() {
        return (
            <div style={{height:"100%",width:"100%",backgroundColor:"white"}}>
            <NavBar 
                 style={{
                     background:'#FFBF2D',
                     height:'8vh',
                     color:'#fff',
                     fontWeight:'bolder',
                    }}
                    mode="light"
                    icon={'𡿨'}
                    onLeftClick={() => this.props.history.push('/lover/lsouvenir')}
                 ><span style={{
                     color:'#fff',
                     fontWeight:'bold',
                     fontSize:'6vw',
                     textIndent:'3vw',
                     letterSpacing:'3vw'}}>新建纪念日</span>
                </NavBar>
                  <div className="createsou-first">
                  <p >纪念日:</p>
                  <input  type="text" placeholder="please input"/>
                  </div>
                  <div className="createsou-first">
                  <p >日期:</p>
                  <input  type="text" placeholder="例:1999-11-28"/>
                  </div>
                  <h1 style={{margin:"5% 0 0  9%"}}>设置提醒</h1>
                  <WingBlank>
               <button className="createsou-foot">保存</button>
               </WingBlank>
            </div>
        )
    }
}
