import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import {Link} from 'react-router-dom';
import '../css/my.css'

export default class My extends Component {
    constructor(){
        super();
        this.state={
            message:[{
                msg1:'Dior',
                msg2:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3183274783,1271682948&fm=26&gp=0.jpg',
                msg3:'女',
                msg4:'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3356599773,2636457530&fm=15&gp=0.jpg'
            }]
        }
    }
    render() {
        return (
            <div className="All">
                <NavBar
                    style={{
                        background:'#FFBF2D',
                        height:'8vh'
                    }}
                    mode="light"
                    ><span style={{
                        fontWeight:'bold',
                        fontSize:'6vw',
                        textIndent:'3vw',
                        letterSpacing:'3vw',
                        color:'white'
                    }}
                    >我的</span>
                </NavBar>
                {/* 个人信息 */}
                {
                    this.state.message.map((message)=>(
                        <div className="My_message">
                            <div className="one">
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <img src={message.msg2}/>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </div>
                            <div className="two">
                                <p>
                                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;用户名:&nbsp;&nbsp;&nbsp;
                                    <span>{message.msg1}</span>
                                </p>
                                <p>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;性别:&nbsp;&nbsp;&nbsp;
                                    <span>{message.msg3}</span>
                                </p>
                            </div>
                        </div>
                    ))
                }
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
                        <Link to='/my/delrelation'>
                            <div className="line2">删除爱人</div>
                        </Link>
                        <Link to='/my/delrelation2'>
                            <div className="line2">删除亲子</div>
                        </Link>
                        <Link to='/menus'>
                            <div className="line2">退出登录</div>
                        </Link>
                    </div>
                </div>
                {/* 图片 */}
                {
                    this.state.message.map((message)=>(
                        <div className="My_bottom">
                            <img src={message.msg4} />
                        </div>
                    ))
                }
            </div>
        )
    }
}