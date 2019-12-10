import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import {Link} from 'react-router-dom';

export default class Delrelation extends Component {
    constructor(){
        super();
        this.state={
            message:[{
                msg1:'爱人1',
                msg2:'爱人2'
            }]
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
                    >删除关系</span>
                </NavBar>
                {
                    this.state.message.map((message)=>(
                        <div className="My_body" style={{marginTop:"10%"}}>
                            <div className="one">
                                <div className="line">
                                    <label><input type="checkbox" name="checkfruit" value="one"/>{message.msg1}</label>
                                </div>
                                <div className="line">
                                    <label><input type="checkbox" name="checkfruit" value="two"/>{message.msg1}</label>
                                </div>
                            </div>
                            <div className="two">
                                <div className="line">
                                    <label><input type="checkbox" name="checkfruit" value="three"/>{message.msg2}</label>
                                </div>
                                <div className="line">
                                    <label><input type="checkbox" name="checkfruit" value="four"/>{message.msg2}</label>
                                </div>
                            </div>
                        </div>
                    ))
                }
                <form method='post' action=''>
                    <Link to="/index/my">
                        <button type="submit" className="relation_button">确认删除</button>
                    </Link>
                </form>
            </div>
        )
    }
}