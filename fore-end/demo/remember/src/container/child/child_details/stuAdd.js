import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { NavBar, Icon } from 'antd-mobile';

export default class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'one',
            score1: 0,
            score2:0,
            score3:0
        };
        this.handleChange = this.handleChange.bind(this);
    }
    // 获取输入的数学英语语文的值
    inputChange1(e){
        this.setState({
            score1:e.target.value
        })
    }
    inputChange2(e){
        this.setState({
            score2:e.target.value
        })
    }
    inputChange3(e){
        this.setState({
            score3:e.target.value
        })
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }
    render() {
        return (
            // 添加学业记录
            <div className="All">
                <NavBar
                    style={{
                        background:'#FFBF2D',
                        height:'8vh'
                    }}
                    mode="light"
                    icon={<Icon type="left" style={{color:"white"}}/>}
                    onLeftClick={() => this.props.history.push('/Cstudy')}
                    ><span style={{
                        fontWeight:'bold',
                        fontSize:'6vw',
                        textIndent:'3vw',
                        letterSpacing:'3vw',
                        color:"white"
                    }}
                    >添加学业记录</span>
                </NavBar>
                {/* 当前年级 */}
                <form method='post' action=''>
                    <div className="Create_study1">
                        <label>当前年级：
                            <select value={this.state.value} onChange={this.handleChange}>
                                <option value="one">小学一年级</option>
                                <option value="two">小学二年级</option>
                                <option value="three">小学三年级</option>
                            </select>
                        </label>
                    </div>
                    <div className="Create_study">
                        考试类型：
                        <input className="one" type="text" placeholder="单行输入"></input>
                    </div>
                    {/* 创建日期 */}
                    <div className="Create_study">
                        添加学科：
                        <input className="one" type="text" placeholder="单行输入"></input>
                    </div>
                    <div className="Create_study">
                        考试日期：
                        <input className="one" type="text" placeholder="Enter date"></input>
                    </div>
                    {/* 成绩录入 */}
                    <div style={{width:"100%",textAlign:"center",fontWeight:"bold",fontSize:"5vw"}}>成绩录入</div>
                    <div className="Create_study2" style={{marginTop:"20px"}}>
                        数学：
                        <input className="one" type="text" placeholder="单行输入" onChange={(e)=>this.inputChange1(e)}></input>
                    </div>
                    <hr className="hr1"/>
                    <div className="Create_study2">
                        语文：
                        <input className="one" type="text" placeholder="单行输入" onChange={(e)=>this.inputChange2(e)}></input>
                    </div>
                    <hr className="hr1"/>
                    <div className="Create_study2">
                        英语：
                        <input className="one" type="text" placeholder="单行输入" onChange={(e)=>this.inputChange3(e)}></input>
                    </div>
                    <hr className="hr1"/>
                    {/* 添加记录 */}
                    <Link to="/Cstudy">
                        <button type="submit" className="Create_picture">添加记录</button>
                    </Link>
                </form>
            </div>

        )
    }
}