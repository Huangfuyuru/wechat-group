import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import { NavBar} from 'antd-mobile';  
import "./css/lover.css"
export default class lover_home extends Component {
    render() {
        return (
            <div style={{height:"100%",width:"100%"}}>
                 <NavBar style={{backgroundColor:"#FFBF2D",color:"white"}}>爱人</NavBar>
                 <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3855483388,2908594882&fm=26&gp=0.jpg" alt=""  style={{height:"28%",width:"94%",paddingTop:"5%",marginLeft:"3%"}} ></img>  
                <div className="lover-home-first">
                 <Link to ="/lover/lpictures"><button className="lover-button">云相册</button></Link>
                 <button className="lover-button">语音记事</button>
                 <Link to ="/lover/ldairy"> <button className="lover-button">日记</button> </Link>
                 <p style={{float:"left",color:"white"}}>hhhhhh</p>
                 <Link to ="/lover/list"><button className="lover-button">恋爱清单</button></Link> 
                 <Link to ="/lover/lsouvenir"><button className="lover-button">纪念日</button></Link>    
                </div>
              <h1>今日</h1>
              <div className="lover-home-second">
                  <img src="" alt="" style={{height:"100%",width:"45%",float:"left",marginRight:"10%" ,backgroundColor:"black"}}></img>
                  <div style={{height:"100%",width:"45%",float:"left",backgroundColor:"black"}}>

                  </div>
              </div>
              <h1>昨天</h1>
              <div className="lover-home-second">
              <img src="" alt="" style={{height:"100%",width:"45%",float:"left",marginRight:"10%" ,backgroundColor:"black"}}></img>
                  <div style={{height:"100%",width:"45%",float:"left",backgroundColor:"black"}}>
                  </div>
              </div>
            </div>
        )
    }
}
