import React, { Component } from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import { NavBar, Icon } from 'antd-mobile';

export default class growAdd extends Component {
    constructor(){
        super();
        this.state={
        }
    }
    render() {
        return (
            // 成长记录
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
                    onLeftClick={() => this.props.history.push('/child/cgrowup')}
                    ><span style={{
                        fontWeight:'bold',
                        fontSize:'6vw',
                        textIndent:'3vw',
                        letterSpacing:'3vw',
                        color:"white"
                    }}
                    >添加记录</span>
                </NavBar>
                {/* 添加身高 */}
                <form method='post' action=''>
                    <div className="Create_">
                        身高(cm)：
                        <input className="one" type="text" placeholder="单行输入"></input>
                    </div>
                    {/* 添加体重 */}
                    <div className="Create_">
                        体重(kg)：
                        <input className="one" type="text" placeholder="单行输入"></input>
                    </div>
                    {/* 日期 */}
                    <div className="Add_date">
                        <div></div>
                        <div style={{width:"100px"}}></div>
                        <div>日期：{moment().format('YYYY-MM-DD')}</div>
                    </div>
                    {/* 点击创建 */}
                    <Link to='/child/cgrowup'>
                        <button type="submit" className="Create_picture">添加记录</button>
                    </Link>
                </form>
            </div>
        )
    }
}