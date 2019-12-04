import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { NavBar, Icon } from 'antd-mobile';

export default class Create extends Component {
    constructor(){
        super();
        this.state={
            
        }
    }
    render() {
        return (
            // 创建相册
            <div className="All">
                <NavBar
                    style={{
                        background:'#FFBF2D',
                        height:'8vh'
                    }}                    
                    mode="light"
                    icon={<Icon type="left" style={{color:"white"}}/>}
                    onLeftClick={() => this.props.history.push('/Cpicture')}
                    ><span style={{
                        fontWeight:'bold',
                        fontSize:'6vw',
                        textIndent:'3vw',
                        letterSpacing:'3vw',
                        color:"white"
                    }}
                    >创建相册</span>
                </NavBar>
                {/* 相册名称 */}
                <form method='post' action=''>
                    <div className="Create_">
                        相册名称：
                        <input className="one" type="text" placeholder="单行输入"></input>
                    </div>
                    {/* 创建日期 */}
                    <div className="Create_">
                        创建日期：
                        <input className="one" type="text" placeholder="Enter date"></input>
                    </div>
                    {/* 点击创建 */}
                    <Link to="/Pages">
                        <button type="submit" className="Create_picture">创建相册</button>
                    </Link>
                </form>
            </div>
        )
    }
}