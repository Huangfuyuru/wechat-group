import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Resign extends Component {
    render() {
        return (
            <form className='resign' method='post' action=''>
                <p>
                    <i className='iconfont icon-ef-zhanghao'></i>
                    <input style={{width:"39%"}} type='tel' name='tel' placeholder='手机号'/>
                    <button className='get'>获取验证码</button>
                </p>
                <p>
                    <i className='iconfont icon-youjian'></i>
                    <input type='text' name='pass' placeholder='验证码'/>
                </p>
                <p>
                    <i className='iconfont icon-mima'></i>
                    <input type='password' name='passwd' placeholder='密码'/>

                </p>
                <button className='but'>
                    <Link className='but' to='/resign/message'>立即注册</Link>
                    {/* 立即注册 */}
                </button>
                <li>注册即同意《用户协议》</li>
            </form>
        )
    }
}
