import React, { Component } from 'react'
import { NavBar,WingBlank} from 'antd-mobile';
import "../css/lover.css"
export default class create_photo extends Component {
    render() {
        return (
            <div style={{height:"100%",width:"100%",backgroundColor:"white"}}>
            <NavBar style={{backgroundColor:"#FFBF2D",color:"white"}}>创建相册</NavBar>
            <div className="photo-first">
                  <p >相册名称:</p>
                  <input  type="text" placeholder="please input"/>
                  </div>
                  <div className="photo-first">
                  <p >创建日期:</p>
                  <input  type="text" placeholder="例:1999-11-28"/>
                  </div>
                  <WingBlank>
               <button className="photo-foot">创建相册</button>
               </WingBlank>
            </div>
        )
    }
}
