import React, { Component } from 'react';
import { NavBar} from 'antd-mobile';
import {Link} from 'react-router-dom';
import '../css/my.css'

export default class My extends Component {
    constructor(){
        super();
        var umsg = JSON.parse(localStorage.getItem('umsg'));
        this.state={
            umsg:umsg
        }
        console.log(umsg);
    }
    render() {
        return (
            <div className="All">
                <NavBar
                    style={{
                    top:0,
                    width:'100%',
                    zIndex:'11',
                    position:'fixed',
                    height:'8vh',
                    background:'#FFBF2D',
                    color:'#fff',
                    fontWeight:'bolder',
                    }}
                    mode="light"
                    icon={'𡿨'}
                    ><span style={{
                        fontWeight:'bold',
                        fontSize:'6vw',
                        textIndent:'3vw',
                        letterSpacing:'3vw',
                        color:"white"
                    }}
                    >我的</span>
                </NavBar>
                {/* 个人信息 */}
                <div className="My_message">
                    <div className="one">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <img src={this.state.umsg.imgurl}/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                    <div className="two">
                        <p style={{fontSize:"2.5vh"}}>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;用户名:&nbsp;&nbsp;&nbsp;
                            <span>{this.state.umsg.name}</span>
                        </p>
                        <p style={{fontSize:"2.5vh"}}>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;性别:&nbsp;&nbsp;&nbsp;
                            <span>{this.state.umsg.gender}</span>
                        </p>
                    </div>
                </div>
                <div className="My_body">
                    <div className="one">
                        <div className="line">
                            <img style={{width:"28px",height:"28px"}} src={require("../image/a-love.png")}/>
                            <Link to='/my/crelation'>
                                <div className="add">&nbsp;增加爱人&nbsp;</div>
                            </Link>
                        </div>
                        <div className="line">
                            <img style={{width:"30px",height:"30px"}} src={require("../image/a-child.png")}/>
                            <Link to='/my/crelation2'>
                                <div className="add">&nbsp;增加亲子&nbsp;</div>
                            </Link>                        
                        </div>
                        <div className="line">
                            <img src={require("../image/a-message.png")}/>
                            <Link to='/my/message'>
                               <div style={{marginLeft:"8%"}} className="add">&nbsp;消息反馈&nbsp;</div>
                            </Link>                        
                        </div>
                        <div className="line">
                            <img src={require("../image/a-use.png")}/>
                            <Link to='/my/use'>
                                <div style={{marginLeft:"8%"}} className="add">&nbsp;设&nbsp;置&nbsp;</div>
                            </Link>
                        </div>
                    </div>
                    <div className="two">
                        <div className="line">
                            <img src={require("../image/del.png")}/>
                            <Link to='/my/delrelation'>
                                <div className="add">删除爱人</div>
                            </Link>
                        </div>
                        <div className="line">
                            <img src={require("../image/del3.png")}/>
                            <Link to='/my/delrelation2'>
                                <div className="add">删除亲子</div>
                            </Link>
                        </div>
                        <div className="line">
                            <img src={require("../image/out.png")}/>
                            <Link
                            onClick={
                                ()=>{
                                    localStorage.setItem('uid',JSON.stringify('over'));
                                    localStorage.setItem('umsg',JSON.stringify('null'));
                                }
                            }
                             to='/menus'>
                                <div className="add">退出登录</div>
                            </Link>
                        </div>
                    </div>
                </div>
                {/* 图片 */}
                <div className="My_bottom">
                    <img src={'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3356599773,2636457530&fm=15&gp=0.jpg'} />
                </div>
            </div>
        )
    }
}