import React, { Component } from 'react'
import { NavBar,WingBlank} from 'antd-mobile';
import "../css/lover.css"
export default class S extends Component {
    render() {
        return (
            <div style={{height:"100%",width:"100%",backgroundColor:"white"}}>
            <NavBar style={{backgroundColor:"#FFBF2D",color:"white"}}>新建纪念日</NavBar>
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
