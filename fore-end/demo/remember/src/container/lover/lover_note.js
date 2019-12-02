import React, { Component } from 'react'
import { NavBar} from 'antd-mobile';
import "../css/lover.css"
import {Link} from "react-router-dom"
export default class lover_note extends Component {
    render() {
        return (
            <div style={{height:"100%",width:"100%",backgroundColor:"white"}}>
                 <NavBar style={{backgroundColor:"#FFBF2D",color:"white"}} 
                   leftContent={[
                    <Link to="/Loverhome" style={{color:"white"}}><div className="iconfont icon-arror_left_blod" style={{ marginRight: '26px' }} /></Link>,
                   ]}
                 >日记</NavBar>
                <div className="lovernote-first">
                <img  src={require("../image/qian.jpg")} alt=""  style={{float:"left",margin:"4% 10%",height:"13%",width:"13%"}}></img>
                <p style={{fontSize:"5vw"}}>今天 19：02</p>
                <p style={{fontSize:"5vw",float:"left",margin:"2% 2%"}}>今天又是开心的日子，吃饭饭,逛街，看电影，玩游戏</p>
                <img src={require("../image/qian.jpg")}  alt="" style={{height:"40%",width:"40%",border:"solid 0.5px red" ,float:"left",margin:"2% 2%"}}></img>
                <img src={require("../image/qian.jpg")}  alt="" style={{height:"40%",width:"40%",border:"solid 0.5px red" ,float:"left",margin:"2% 2%"}}></img>
                </div>
                <div className="lovernote-first">
                <img  src={require("../image/qian.jpg")} alt=""  style={{float:"left",margin:"4% 10%",height:"13%",width:"13%"}}></img>
                <p style={{fontSize:"5vw"}}>今天 19：02</p>
                <p style={{fontSize:"5vw",float:"left",margin:"2% 2%"}}>今天又是开心的日子，吃饭饭,逛街，看电影，玩游戏</p>
                <img src={require("../image/qian.jpg")}  alt="" style={{height:"40%",width:"40%",border:"solid 0.5px red" ,float:"left",margin:"2% 2%"}}></img>
                <img src={require("../image/qian.jpg")}  alt="" style={{height:"40%",width:"40%",border:"solid 0.5px red" ,float:"left",margin:"2% 2%"}}></img>
                </div>
               <Link to="/lover/crnote"> <img src={require("../image/jia.jpg")}  className="lovesou-foot"   alt=""></img></Link>
            </div>
        )
    }
}
