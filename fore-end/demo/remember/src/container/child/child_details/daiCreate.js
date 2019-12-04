import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { NavBar, Icon } from 'antd-mobile';

export default class daiCreate extends Component {
    constructor(){
        super();
        this.state={
        }
    }
    render() {
        return (
            // 创建日记
            <div className="All">
                <NavBar
                    style={{
                        background:'#FFBF2D',
                        height:'8vh'
                    }}
                    mode="light"
                    icon={<Icon type="left" style={{color:'white'}}/>}
                    onLeftClick={() => this.props.history.push('/Cdairy')}
                    ><span style={{
                        fontWeight:'bold',
                        fontSize:'6vw',
                        textIndent:'3vw',
                        letterSpacing:'3vw',
                        color:'white'
                    }}
                    >创建日记</span>
                </NavBar>
                <form method='post' action=''>
                    <textarea rows="3" cols="20" placeholder='请输入内容' style={{width:"350px",height:"180px",marginTop:"30px",border:"solid Lightgray"}}>
                    </textarea>
                    {/* <div className='Dairy_'>
                        <div className='one'>
                            <img src={require('../images/Add(2).png')}/>
                            <p>添加图片</p>
                        </div>
                        <div className='one'>
                            <img src={require('../images/Add(2).png')}/>
                            <p>添加表情</p>
                        </div>
                        <div className='one'>
                            <img src={require('../images/Add(2).png')}/>
                            <p>添加日期</p>
                        </div>
                        <div className='one'>
                            <img src={require('../images/Add(2).png')}/>
                            <p>添加位置</p>
                        </div>
                    </div> */}
                    <Link to="/Cdairy">
                        <button type="submit" className="Create_picture">保存</button>
                    </Link>
                </form>
            </div>
        )
    }
}
