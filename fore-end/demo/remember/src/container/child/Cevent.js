import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { NavBar, Icon } from 'antd-mobile';

export default class Cevent extends Component {
    constructor(){
        super();
        this.state={
            cnews:[{
                cmom:'第一次叫妈妈',
                cdad:'第一次叫爸爸',
                cpic:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1310375106,1926353045&fm=26&gp=0.jpg',
                cpic2:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2037612692,2923078042&fm=26&gp=0.jpg'
            }]
        }
    }
    render() {
        return (
            //大事记
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
                    onLeftClick={() => this.props.history.push('/index/child')}
                    ><span style={{
                        fontWeight:'bold',
                        fontSize:'6vw',
                        textIndent:'3vw',
                        letterSpacing:'3vw',
                        color:"white"
                    }}
                    >大事记</span>
                </NavBar>
                {
                    this.state.cnews.map((cnews)=>(
                        <div className="Write_body">
                            <Link to='small'>
                                <div className="one">
                                    <p>{cnews.cmom}</p>
                                    <img src={cnews.cpic}/>
                                </div>
                            </Link>
                            <Link to='/small'>
                                <div className="one">
                                    <p>{cnews.cdad}</p>
                                    <img src={cnews.cpic2}/>
                                </div>
                            </Link>
                        </div>
                    ))
                }
                <Link to='/eventAdd'>
                    <div className="Cloud_add">
                        <div>-----------------------------------------------------------</div>
                        <a href="#" target="_blank"><img className="Cloud_img" src={require("../../image/add.png")}/></a>
                    </div>
                </Link>
            </div>
        )
    }
}
