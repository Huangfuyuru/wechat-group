import React, { Component } from 'react';
import { NavBar} from 'antd-mobile';
import {Link} from 'react-router-dom';
import '../css/my.css';
import '../css/child.css'

export default class My extends Component {
    constructor(){
        super();
        var umsg = JSON.parse(localStorage.getItem('umsg')); 
        if(umsg.name==''){
            umsg.name='未设置'
        }
        if(umsg.gender==''){
            umsg.gender='未设置'
        }
        if(umsg.imgurl==''){
            umsg.imgurl='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574914271954&di=5ce6c90533745142d11594040dd0b2b1&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201506%2F19%2F20150619202710_4vZ8s.thumb.224_0.jpeg'
        }
        this.state={
            name:umsg.name,
            gender:umsg.gender,
            uid:umsg.id,
            src:'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3356599773,2636457530&fm=15&gp=0.jpg',
            uimg:umsg.imgurl
        }
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
                    <div 
                    style={{
                        background:`url(${this.state.uimg}) center center/cover no-repeat`,
                    }}
                    className="one">
                    </div>
                    <div className="two">
                        <p style={{fontSize:"2.5vh"}}>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;用户名:&nbsp;&nbsp;&nbsp;
                            <span>{this.state.name}</span>
                        </p>
                        <p style={{fontSize:"2.5vh"}}>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;性别:&nbsp;&nbsp;&nbsp;
                            <span>{this.state.gender}</span>
                        </p>
                    </div>
                </div>
                
                <div className="My_body">
                    <div className="one">
                        <div className="line" style={{marginTop:"15%"}}>
                            <img style={{width:"7.5vw",height:"5vh"}} src={require("../image/a-love.png")}/>
                            <Link to='/my/crelation'>
                                <div className="add">&nbsp;增加爱人&nbsp;</div>
                            </Link>
                        </div>
                        <div className="line">
                            <img style={{width:"8vw",height:"5vh"}} src={require("../image/a-child.png")}/>
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
                    <div className="two" >
                        <div className="line" style={{marginTop:"15%"}}>
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
                                    localStorage.setItem('cid',JSON.stringify(''));
                                    localStorage.setItem('lid',JSON.stringify(''));
                                    localStorage.setItem('lbackground',JSON.stringify(''));
                                    localStorage.setItem('cbackground',JSON.stringify(''));
                                }
                            }
                             to='/menus'>
                                <div className="add">退出登录</div>
                            </Link>
                        </div>
                    </div>
                </div>
                {/* 图片 */}
                <div className='my_first'>                   
                    <img style={{overflow:"hidden"}}
                    src={this.state.src} alt='我的背景'/>  
                </div>
            </div>
        )
    }
}