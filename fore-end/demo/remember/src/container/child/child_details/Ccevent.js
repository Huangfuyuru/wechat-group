import React, { Component } from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import { NavBar, Icon } from 'antd-mobile';

export default class eventAdd extends Component {
    constructor(props){
        super(props);
        var cid = JSON.parse(localStorage.getItem('cid'));
        this.state={
            cid:cid,
        }
        console.log(this.state.cid)
    }
    render() {
        return (
            // 添加大事记
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
                    >添加大事记</span>
                </NavBar>
                <form>
                    <label><input type="checkbox" name="item" value="第一次" checked/>第一次</label>
{/*                     
                    <p className="Add_body_one">第一次</p> */}
                    <input className="input1" type="text" placeholder="单行输入"/>
                    <p className="Add_body_two">描述文字</p>
                    <textarea rows="3" cols="20" placeholder='请输入内容' className="input2">
                    </textarea>
                    <p className="Add_body_two">添加图片</p>
                    <div className="Add_body_date">
                        <div className="one">日期</div>
                        <div><input className="input3" type="text" placeholder="Enter Date"/></div>
                    </div>
                    {/* 保存 */}
                    <Link to="/child/cevents">
                        <button type="submit" className="Create_picture">保存</button>
                    </Link>
                </form>
            </div>
        )
    }
}