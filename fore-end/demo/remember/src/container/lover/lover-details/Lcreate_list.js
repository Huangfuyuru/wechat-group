import React, { Component } from 'react'
import { NavBar,WingBlank} from 'antd-mobile';
import {Link} from "react-router-dom"
import "../../../css/lover.css"
export default class Lcreate_list extends Component {
    render() {
        return (
            <div style={{height:"100%",width:"100%",backgroundColor:"white"}}>
            <NavBar style={{backgroundColor:"#FFBF2D",color:"white"}}
                   leftContent={[
                    <Link to="/lover/list" style={{color:"white"}}><div className="iconfont icon-arror_left_blod" style={{ marginRight: '26px' }} /></Link>,
                   ]}
            >新建清单</NavBar>
            <p style={{fontSize:"5vw",float:"left",margin:"5% 5%"}}> 用一张图记录</p>
            <img className="createlist-first" src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3560880680,1309107465&fm=26&gp=0.jpg" alt="" ></img>
            <p style={{fontSize:"5vw",float:"left",margin:"5% 5%"}}> 用一句话记录</p>
            <input type="text" className="createlist-second" placeholder="单行输入"></input>
            <div className="createlist-three">
                  <p >时间:</p>
                  <input  type="text" placeholder="例:1999-11-28"/>
                  </div>
                  <div className="createlist-three">
                  <p >地址:</p>
                  <input  type="text" placeholder="石家庄"/>
                  </div>
                  <WingBlank>
               <button className="createlist-foot">保存</button>
               </WingBlank>
            </div>

        )
    }
}
