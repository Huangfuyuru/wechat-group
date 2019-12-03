import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import './css/login.css'
export default class Login extends Component {
    render() {
        return (
            <form className='login'>
                <p>
                    <i className='iconfont icon-ef-zhanghao'></i>
                    <input type='tel' name='utel' placeholder='请输入手机号'/>
                </p>
                <p>
                    <i className='iconfont icon-mima'></i>
                    <input type='password' name='pass' placeholder='请输入密码'/>

                </p>
                <Link to='/index'>
                    <button className='but' type='submit'>登录</button>
                </Link>
            </form>
        )
    }
}
