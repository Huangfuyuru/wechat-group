import React, { Component } from 'react'
import { NavBar,WingBlank} from 'antd-mobile';
import "../css/lover.css"
import {Link} from "react-router-dom"
export default class create_note extends Component {
    render() {
        return (
            <div style={{height:"100%",width:"100%",backgroundColor:"white"}}>
            <NavBar style={{backgroundColor:"#FFBF2D",color:"white"}}
                       leftContent={[
                        <Link to="/lover/ldairy" style={{color:"white"}}><div className="iconfont icon-arror_left_blod" style={{ marginRight: '26px' }} /></Link>,
                       ]}
            >创建日记</NavBar>
                <input type="text"   className="createnote-first"></input>
                <div className="createnote-second">
                    <img src={require("../image/tu.jpg")}  style={{height:"76%",width:"22%" ,float:"left",marginLeft:"3%"}} alt=""></img>
                    <img src={require("../image/biao.jpg")}  style={{height:"76%",width:"22%" ,float:"left",marginLeft:"3%"}} alt=""></img>
                    <img src={require("../image/ri.jpg")}  style={{height:"76%",width:"22%" ,float:"left",marginLeft:"3%"}} alt=""></img>
                    <img src={require("../image/wei.jpg")}  style={{height:"76%",width:"22%" ,float:"left",marginLeft:"3%"}} alt=""></img>
                </div>

                <WingBlank>
               <button className="createnote-foot">保存</button>
               </WingBlank>
            </div>

        )
    }
}
