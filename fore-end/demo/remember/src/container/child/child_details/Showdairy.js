import React, { Component } from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import { NavBar, Icon } from 'antd-mobile';
import Cdairy from '../Cdairy.js';

export default class Showdairy extends Cdairy {
    constructor(props){
        super(props);
        var dairycontent = this.props.location.state.item;
        console.log(dairycontent)
        this.state={
            backcolor:dairycontent.color,
            name:dairycontent.name,
            content:dairycontent.content,
            imgurl:dairycontent.imgurl,
            setdate:dairycontent.setdate
        }
    }
    // 加载外部数据用componentDidMount
    componentDidMount(){
        console.log(this.props.location.state.item)
    }
    
    render() {
        var date = moment(this.state.setdate).format("YYYY-MM-DD");
        return (
            <div className="showdairy">
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
                    onLeftClick={() => this.props.history.push('/child/cdairy')}
                    ><span style={{
                        fontWeight:'bold',
                        fontSize:'6vw',
                        textIndent:'3vw',
                        letterSpacing:'3vw',
                        color:"white"
                    }}
                    >{this.state.setdate}</span>
                </NavBar>
                <div className='showdairy_inner'>
                    <p>{this.state.content}</p>
                    <div style={{
                        height:'70vh',
                        overflowY:'scroll'
                    }}>
                        {
                            this.state.imgurl&&this.state.imgurl.map((item)=>{
                                return <div className='showdairy_block'>
                                    <img src={item} alt='日记图片'/>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}