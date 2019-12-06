import React, { Component } from 'react'
import {BrowserRouter as Router, Route,Link} from 'react-router-dom'
import logo from '../image/logo.png'
import '../css/login.css'
import Login from './Login'
import Resign from './Resign'

export default class Menus extends Component {
    constructor(){
        super();
    }
    active=(e)=>{
        var a1 = document.getElementById('a1')
        var a2 = document.getElementById('a2')
        if(e.target.id == 'a1'){
            a2.classList.remove('menus_active')
            console.log(a2.className)
        }else if(e.target.id == 'a2'){
            a1.classList.remove('menus_active')
            console.log(a1.className)

        }
        e.target.classList.add('menus_active')
        console.log(e.target.className)

    }
    render() {
        return (
            <div className='menu'>
                <nav style={{textAlign:'center'}}><img src={logo} alt='logo' width='60%'/></nav>
                <div className='menu_inner'>
                    <div className='inner_header'>
                        <Link id='a1' onClick={(e)=>this.active(e)} className='a1 aa' to='/menus/login'>登录</Link>
                        <Link id='a2' onClick={(e)=>this.active(e)} className='a2 aa' to='/menus/resign'>注册</Link>
                    </div>
                    <div className='inner_content'>
                        <Route exact path='/menus' component={Login}/>
                        <Route path='/menus/login' component={Login}/>
                        <Route path='/menus/resign' component={Resign}/>                          
                    </div>
                </div>
                <footer>
                    <div className='menu_footer'>
                        <i></i>
                        <p>第三方登录</p>
                    </div>
                    {/* <Router> */}
                        <Link to='/menus/login/qq'><i className='iconfont icon-qqdenglufanbai'></i></Link>
                        <Link to='/menus/login/wechat'><i className='iconfont icon-weixin'></i></Link>
                        <Link to='/menus/login/weibo'><i className='iconfont icon-comiisweibodenglu'></i></Link>
                    {/* </Router> */}
                </footer>
            </div>
        )
    }
}
