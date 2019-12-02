import React, { Component } from 'react'
import { NavBar,WingBlank} from 'antd-mobile';
import "../../../css/lover.css"

import {Link} from "react-router-dom"
export default class Lcreate_photo extends Component {
    render() {
        return (
            <div style={{height:"100%",width:"100%",backgroundColor:"white"}}>
            <NavBar style={{backgroundColor:"#FFBF2D",color:"white"}}
                           leftContent={[
                            <Link to="/lover/lpictures" style={{color:"white"}}><div className="iconfont icon-arror_left_blod" style={{ marginRight: '26px' }} /></Link>,
                           ]}
            >创建相册</NavBar>
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
