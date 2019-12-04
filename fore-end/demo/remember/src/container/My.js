import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';

export default class My extends Component {
    constructor(){
        super();
        this.state={
            message:[{
                msg1:'微微一笑',
                msg2:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3183274783,1271682948&fm=26&gp=0.jpg',
                msg3:'女',
                msg4:'计算机/互联网',
                msg5:256
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
                    icon={<Icon type="left" style={{color:"white"}}/>}
                    onLeftClick={() => this.props.history.push('/Cstudy')}
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
                        <div className="My_body">
                            <div style={{width:"250px"}}><img className="Img" src={require("./images/love.png")}/></div>
                            <div style={{width:"150px",textAlign:"left"}}>昵称:</div>
                            <div style={{width:"100%",textAlign:"left"}}>{message.msg1}</div>
                        </div>
                    ))
                }
                {
                    this.state.message.map((message)=>(
                        <div className="My_body">
                            <div style={{width:"250px"}}><img className="Img" src={require("./images/sex.png")}/></div>
                            <div style={{width:"150px",textAlign:"left"}}>头像:</div>
                            <div style={{width:"100%",textAlign:"left"}}>
                                <img style={{wdith:"30px",height:"40px"}} src={message.msg2}/>
                            </div>
                        </div>
                    ))
                }
                {
                    this.state.message.map((message)=>(
                        <div className="My_body">
                            <div style={{width:"250px"}}><img className="Img" src={require("./images/work2.png")}/></div>
                            <div style={{width:"150px",textAlign:"left"}}>性别:</div>
                            <div style={{width:"100%",textAlign:"left"}}>{message.msg3}</div>
                        </div>
                    ))
                }
                {
                    this.state.message.map((message)=>(
                        <div className="My_body">
                            <div style={{width:"250px"}}><img className="Img" src={require("./images/work.png")}/></div>
                            <div style={{width:"150px",textAlign:"left"}}>职业:</div>
                            <div style={{width:"100%",textAlign:"left"}}>{message.msg4}</div>
                        </div>
                    ))
                }
                {
                    this.state.message.map((message)=>(
                        <div className="My_body">
                            <div style={{width:"250px"}}><img className="Img" src={require("./images/time.png")}/></div>
                            <div style={{width:"180px",textAlign:"left"}}>已使用:</div>
                            <div style={{width:"100%",textAlign:"left"}}>{message.msg5}天</div>
                        </div>
                    ))
                }
                {/* 我的记录 */}
                <div className="My_write">
                    我的记录
                </div>
                <form method='post' action=''>
                    <div className="My_count">
                        <button type="submit">亲子记录</button>
                    </div>
                    <div className="My_count">
                        <button type="submit">爱人记录</button>
                    </div>
                </form>
            </div>
        )
    }
}