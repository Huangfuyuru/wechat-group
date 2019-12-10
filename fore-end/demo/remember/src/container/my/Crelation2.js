import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import {Link} from 'react-router-dom';

export default class Crelation2 extends Component {
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
                    >建立关系</span>
                </NavBar>
                <form method='post' action=''>
                    <div className="create_Relation">
                        对方昵称：&nbsp;
                        <input className="one" type="text" placeholder="单行输入"></input>
                    </div>
                    <div className="create_Relation">
                        对方生日：&nbsp;
                        <input className="one" type="text" placeholder="单行输入"></input>
                    </div>
                    <div className="create_Relation">
                        对方性别：&nbsp;
                        <input className="one" type="text" placeholder="单行输入"></input>
                    </div>
                    <Link to="/index/my">
                        <button type="submit" className="relation_button">创建关系</button>
                    </Link>
                </form>
            </div>
        )
    }
}