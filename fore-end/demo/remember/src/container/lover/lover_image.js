import React, { Component } from 'react'
import { NavBar} from 'antd-mobile'; 
import '../css/lover.css'
export default class lover_image extends Component {
    render() {
        return (
            <div style={{height:"100%",width:"100%" ,backgroundColor:"white"}}>
                <NavBar style={{backgroundColor:"#FFBF2D",color:"white"}}>云相册</NavBar>
                <div className="loveImage-header">
                  <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1153077516,1329367100&fm=26&gp=0.jpg" style={{height:"80%",width:"94%",marginLeft:"3%",marginTop:"2%"}} alt=""></img>
                  <p style={{fontSize:"5vw",float:"left",margin:"2% 64% 0 3%"}}>所有照片</p><span  style={{color:"#C7C7CC",fontSize:"8vw"}}>></span>
                </div>
                <div className="loveImage-header">
                  <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1153077516,1329367100&fm=26&gp=0.jpg" style={{height:"80%",width:"94%",marginLeft:"3%",marginTop:"2%"}} alt=""></img>
                  <p style={{fontSize:"5vw",float:"left",margin:"2% 64% 0 3%"}}>所有照片</p><span  style={{color:"#C7C7CC",fontSize:"8vw"}}>></span>
                </div>
            <img src={require("../image/jia.jpg")}  className="loveImage-foot"   alt=""></img>
            </div>
        )
    }
}
