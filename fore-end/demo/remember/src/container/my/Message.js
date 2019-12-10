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
                        background:'#FFBF2D',
                        height:'8vh'
                    }}
                    mode="light"
                    icon={<Icon type="left" style={{color:"white"}}/>}
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
                {/* <form method='post' action=''>
                </form> */}
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