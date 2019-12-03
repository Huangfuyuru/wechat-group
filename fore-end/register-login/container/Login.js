import React, { Component } from 'react'
import { List, InputItem, WhiteSpace } from 'antd-mobile';
import '../css/login.css'
export default class Login extends Component {
    render() {
        return (
            <form className='login'>
                <p>
                    <i className='iconfont icon-ef-zhanghao'></i>
                    <input type='phone' name='user' placeholder='请输入手机号'/>
                </p>
                <p>
                    <i className='iconfont icon-mima'></i>
                    <input type='password' name='pwd' placeholder='请输入密码'/>

                </p>
                <button className='but' type='submit'>登录</button>
            </form>
        )
    }
}
