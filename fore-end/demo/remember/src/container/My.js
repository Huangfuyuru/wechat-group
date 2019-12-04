import React, { Component } from 'react';
import { NavBar, Icon,TabBar,Flex, WhiteSpace } from 'antd-mobile';
import '../css/my.css'
export default class My extends Component {
    render() {
        return (
            <div className="All">
                {/* 头部 */}
                <NavBar
                style={{background:'#FFBF2D',fontWeight:'bold'}}
                onLeftClick={() => console.log('onLeftClick')}
                >我的</NavBar>
                {/* <div className="My_head">
                    <div style={{width:"100%"}}><a href="#" target="_blank">←</a></div>
                    <div style={{width:"100%"}}>我的</div>
                    <div style={{width:"100%"}}></div>
                </div> */}
                {/* 个人信息 */}
                <div className="My_body">
                    {/* <div style={{width:"250px"}}><img className="Img" src={require("./images/love.png")}/></div> */}
                    <div style={{width:"150px",textAlign:"left"}}>昵称:</div>
                    <div style={{width:"100%",textAlign:"left"}}>后台获取</div>
                </div>
                <div className="My_body">
                    {/* <div style={{width:"250px"}}><img className="Img" src={require("./images/sex.png")}/></div> */}
                    <div style={{width:"150px",textAlign:"left"}}>头像:</div>
                    <div style={{width:"100%",textAlign:"left"}}>后台获取</div>
                </div>
                <div className="My_body">
                    {/* <div style={{width:"250px"}}><img className="Img" src={require("./images/work2.png")}/></div> */}
                    <div style={{width:"150px",textAlign:"left"}}>性别:</div>
                    <div style={{width:"100%",textAlign:"left"}}>女</div>
                </div>
                <div className="My_body">
                    {/* <div style={{width:"250px"}}><img className="Img" src={require("./images/work.png")}/></div> */}
                    <div style={{width:"150px",textAlign:"left"}}>职业:</div>
                    <div style={{width:"100%",textAlign:"left"}}>计算机/互联网</div>
                </div>
                <div className="My_body">
                    {/* <div style={{width:"250px"}}><img className="Img" src={require("./images/time.png")}/></div> */}
                    <div style={{width:"180px",textAlign:"left"}}>已使用:</div>
                    <div style={{width:"100%",textAlign:"left"}}>256天</div>
                </div>
                {/* 我的记录 */}
                <div className="My_write">
                    {/* <img style={{width:"80px",height:"40px"}} src={require('./images/logo.png')}/> */}
                </div>
                <div className="My_count">
                    <a href="#" target="_blank">亲子记录</a>
                </div>
                <div className="My_count">
                    <a href="#" target="_blank">爱人记录</a>
                </div>
            </div>
        )
    }
}