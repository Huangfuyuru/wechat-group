import React, { Component } from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import { NavBar, Icon } from 'antd-mobile';
import Ccevent from './Ccevent.js';

export default class Showevent extends Ccevent {
    constructor(props){
        super(props);
        var eventcontent = this.props.location.state.item;
        this.state={
           name:eventcontent.name,
           content:eventcontent.content,
           imgurl:eventcontent.imgurl,
           setdate:eventcontent.setdate
        }
    }
    // 加载外部数据用componentDidMount
    componentDidMount(){
        console.log(this.props.location.state.item)
    }
    
    render() {
        var date = moment(this.state.setdate).format("YYYY-MM-DD");
        return (
            <div className="showevent">
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
                    onLeftClick={() => this.props.history.push('/child/cevents')}
                    ><span style={{
                        fontWeight:'bold',
                        fontSize:'6vw',
                        textIndent:'3vw',
                        letterSpacing:'3vw',
                        color:"white"
                    }}
                    >{this.state.name}</span>
                </NavBar>
                <div className='showevent_inner'>
                    <p>标题：<span>{this.state.name}</span></p>
                    <p>内容：<span>{this.state.content}</span></p>
                    <div>
                        {
                            this.state.imgurl&&this.state.imgurl.map((item)=>{
                                return <div className='showevent_block'>
                                    <img src={item} alt='大事记图片'/>
                                </div>
                            })
                        }
                    </div>
                    <p style={{
                        float:'right',
                        marginRight:'10vw',
                        fontSize:'6vw',
                        fontWeight:'normal'
                    }}>具体日期:{date}</p>
                </div>
            </div>
        )
    }
}