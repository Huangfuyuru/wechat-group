import React, { Component } from 'react'
import { NavBar} from 'antd-mobile';
import {Link} from "react-router-dom"
import "../../css/lover.css"
export default class Lsouvenir extends Component {
    constructor(){
        super()
        this.state={
            lover_souvenir:[
                {
                    title:"结婚纪念日",
                    date:"2018-11-18"
                },
                {
                    title:"结婚纪念日",
                    date:"2018-11-18"
                },  
                {
                    title:"结婚纪念日",
                    date:"2018-11-18"
                }
            ]
        }
    }
    render() {
        return (
            <div style={{height:"100%",width:"100%",backgroundColor:"white"}}>
                 <NavBar style={{backgroundColor:"#FFBF2D",color:"white"}}
                           leftContent={[
                            <Link to="/Loverhome" style={{color:"white"}}><div className="iconfont icon-arror_left_blod" style={{ marginRight: '26px' }} /></Link>,
                           ]}
                 ><span style={{fontWeight:'bold',fontSize:'6vw',textIndent:'3vw',letterSpacing:'3vw'}}>纪念日</span></NavBar>
              <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1996765656,1986455071&fm=26&gp=0.jpg" alt="" style={{height:"40%",width:"92%",margin:"4% 0 0 4%"}}></img>
               {
                   this.state.lover_souvenir.map((item)=>(
                    <div className="loversou-first">
                    <img  src={require("../../image/xin.jpg")} alt=""  style={{float:"left",margin:"4% 10%"}}></img>
                   <h1>{item.title}</h1>
                   <p style={{fontSize:"5vw"}}>日期：{item.date}</p>
                    </div>
                   ))
               }
              <Link to="/lover/crsouvenir"><img src={require("../../image/jia.jpg")}  className="lovesou-foot"   alt=""></img></Link>
            </div>
        )
    }
}
