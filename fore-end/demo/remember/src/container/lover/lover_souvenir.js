import React, { Component } from 'react'
import { NavBar} from 'antd-mobile';
import "../css/lover.css"
export default class lover_souvenir extends Component {
    render() {
        return (
            <div style={{height:"100%",width:"100%",backgroundColor:"white"}}>
                 <NavBar style={{backgroundColor:"#FFBF2D",color:"white"}}>恋爱清单</NavBar>
              <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1996765656,1986455071&fm=26&gp=0.jpg" alt="" style={{height:"40%",width:"92%",margin:"4% 0 0 4%"}}></img>
              <div className="loversou-first">
                  <img  src={require("../image/xin.jpg")} alt=""  style={{float:"left",margin:"4% 10%"}}></img>
                  <h1>结婚纪念日</h1>
                  <p style={{fontSize:"5vw"}}>日期：2018-11-18</p>
              </div>
              <div className="loversou-first">
                  <img  src={require("../image/xin.jpg")} alt=""  style={{float:"left",margin:"4% 10%"}}></img>
                  <h1>结婚纪念日</h1>
                  <p style={{fontSize:"5vw"}}>日期：2018-11-18</p>
              </div>
              <img src={require("../image/jia.jpg")}  className="lovesou-foot"   alt=""></img>
            </div>
        )
    }
}
