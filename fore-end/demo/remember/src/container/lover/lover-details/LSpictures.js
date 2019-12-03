import React, { Component } from 'react'
import { NavBar} from 'antd-mobile';
import {Link} from "react-router-dom"
import "../../../css/lover.css"
export default class LSpictures extends Component {
    constructor(){
        super()
        this.state={
            arr:[
                "http://img3.imgtn.bdimg.com/it/u=3777141573,3920211760&fm=26&gp=0.jpg",
                "http://img3.imgtn.bdimg.com/it/u=3777141573,3920211760&fm=26&gp=0.jpg",
                "http://img3.imgtn.bdimg.com/it/u=3777141573,3920211760&fm=26&gp=0.jpg",
                "http://img3.imgtn.bdimg.com/it/u=3777141573,3920211760&fm=26&gp=0.jpg",
                "http://img3.imgtn.bdimg.com/it/u=3777141573,3920211760&fm=26&gp=0.jpg",
                "http://img3.imgtn.bdimg.com/it/u=3777141573,3920211760&fm=26&gp=0.jpg",
            ]
        }
    }
    render() {

        return (
            <div style={{height:"100%",width:"100%" ,backgroundColor:"white"}}>
                  <NavBar style={{backgroundColor:"#FFBF2D",color:"white"}}
                       leftContent={[
                        <Link to="/lover/lpictures" style={{color:"white"}}><div className="iconfont icon-arror_left_blod" style={{ marginRight: '26px' }} /></Link>,
                       ]}
            ><span style={{fontWeight:'bold',fontSize:'6vw',textIndent:'3vw',letterSpacing:'3vw'}}>相册页面</span></NavBar>

            {
                this.state.arr.map((item)=>(
                    <div style={{height:"35%",width:"46%",margin:" 2% 2% 0 2%",float:"left"}}>
                        <img src={item} style={{height:"100%",width:"100%" ,float:"left"}} alt=""></img>
                    </div>
                ))
            }
            </div>
        )
    }
}
