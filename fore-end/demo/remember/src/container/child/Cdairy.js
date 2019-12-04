import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { NavBar, Icon } from 'antd-mobile';

export default class Cdairy extends Component {
    constructor(){
        super();
        this.state={
            text:[{
                txt1:'今天 19:02',
                txt2:'今天宝宝又长高了，真滴好开森，每一天都会有好事情发生呢~',
                src1:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1547148758,4026467388&fm=26&gp=0.jpg',
                src2:'http://img3.imgtn.bdimg.com/it/u=1624962778,2099820845&fm=26&gp=0.jpg',
            }]
        }
    }
    render() {
        return (
            // 写日记
            <div className="All">
                <NavBar
                    style={{
                        background:'#FFBF2D',
                        height:'8vh'
                    }}
                    mode="light"
                    icon={<Icon type="left" style={{color:"black"}}/>}
                    onLeftClick={() => this.props.history.push('/Cloud')}
                    ><span style={{
                        fontWeight:'bold',
                        fontSize:'6vw',
                        textIndent:'3vw',
                        letterSpacing:'3vw'
                    }}
                    >日记</span>
                </NavBar>
                {
                    this.state.text.map((text)=>(
                    <div className="Write_body">
                        <div className="Write_body_one">
                        <div className="one"><img src={require("../images/write.svg")}/>{text.txt1}</div>
                        <div className="two">{text.txt2}</div>
                            <div className="three"><img src={text.src1}/><img src={text.src2}/></div>
                        </div>
                        <div className="Write_body_one">
                            <div className="one"><img src={require("../images/write.svg")}/>{text.txt1}</div>
                            <div className="two">{text.txt2}</div>
                            <div className="three"><img src={text.src1}/><img src={text.src2}/></div>
                        </div>
                    </div>
                    ))
                }
                <Link to='/daiCreate'>
                    <div className="Cloud_add">
                        <div>-----------------------------------------------------------</div>
                        <a href="#" target="_blank"><img className="Cloud_img" src={require("../images/add.png")}/></a>
                    </div>
                </Link>
            </div>
        )
    }
}