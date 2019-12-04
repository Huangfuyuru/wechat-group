import React, { Component } from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import { NavBar, Icon } from 'antd-mobile';
import Cevent from './Cevent.js';

export default class small extends Cevent {
    constructor(){
        super();
        this.state={
            
        }
    }
    // 加载外部数据用componentDidMount
    componentDidMount(){
        let path = this.props.match.params.id
        fetch(``)
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({data:res.data});
        })
    }
    //setState()结束之后都会自动调用componentDidUpdate()
    //如果有更新会进componentDidUpdate里面
    componentDidUpdate(Props,State){
        if(Props.location.search !== this.props.location.search){
            let path = this.props.match.params.id
            console.log('path',path)
            fetch( ``)
            .then((res)=>res.json())
            .then((res)=>{
                this.setState({data:res.data});
            })
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
                    onLeftClick={() => this.props.history.push('/Cevent')}
                    ><span style={{
                        fontWeight:'bold',
                        fontSize:'6vw',
                        textIndent:'3vw',
                        letterSpacing:'3vw',
                        color:"white"
                    }}
                    >第一次叫妈妈</span>
                </NavBar>
            </div>
        )
    }
}