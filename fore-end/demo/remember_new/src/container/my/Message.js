import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import {Link} from 'react-router-dom';

export default class Message extends Component {
    constructor(){
        super();
        this.state={

        }
    }
    render(){
        return(
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
                onLeftClick={() => this.props.history.push('/index/my')}
                ><span style={{
                    fontWeight:'bold',
                    fontSize:'6vw',
                    textIndent:'3vw',
                    letterSpacing:'3vw',
                    color:"white"
                }}
                >消息反馈</span>
            </NavBar>
            <div style={{width:"100%",height:"10px",marginTop:"15%"}}></div>
            <div style={{marginTop:"20px"}} className="msg1">
                <img src={require('../../image/server.png')} />
                你好，请问有什么问题吗？
            </div>
            <div className="msg2">
                不能上传头像
                <img src={require('../../image/user.png')}/>
            </div>
            <div className="msg1">
                <img src={require('../../image/server.png')} />
                反馈已收到，尽快解决
            </div>
        </div>
        )
    }
}