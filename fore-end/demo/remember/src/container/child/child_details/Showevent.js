import React, { Component } from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import { NavBar, Icon } from 'antd-mobile';
import Ccevent from './Ccevent.js';

export default class Showevent extends Ccevent {
    constructor(props){
        super(props);
        var all = this.props.location.state.cnews;
        this.state={
           name:all.name,
           content:all.content,
           imgurl:all.imgurl,
           setdate:all.setdate
        }
    }
    // 加载外部数据用componentDidMount
    componentDidMount(){
        console.log(this.props.location.state.cnews)
    }
    
    render() {
        var date = moment(this.state.setdate).format("YYYY-MM-DD");
        return (
            <div className="All">
                <NavBar
                    style={{
                        background:'#FFBF2D',
                        height:'8vh',
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
                >第一次{this.state.name}</span>
                </NavBar>
                <div>
                    <p>{this.state.content}</p>
                    <div>
                        {
                            this.state.imgurl&&this.state.imgurl.map((item)=>{
                                return <div style={{width:'50%',display:'inline-block'}}>
                                    <img src={item} style={{
                                        width:'auto',
                                        height:'auto',
                                        maxWidth:'100%',
                                        maxHeight:'100%'
                                    }}/>
                                </div>
                            })
                        }
                    </div>
                <p>具体日期:{date}</p>
                </div>
            </div>
        )
    }
}