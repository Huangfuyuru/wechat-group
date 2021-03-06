import React, { Component } from 'react'
import {Route,Link} from 'react-router-dom'
import logo from '../image/logo1.png'
import '../css/login.css'
import Login from './Login'
import Resign from './Resign'
import img from '../image/aaa.jpg'
export default class Menus extends Component {
    constructor(){
        super();
    }
    active=(e)=>{
        var a1 = document.getElementById('a1')
        var a2 = document.getElementById('a2')
        if(e.target.id == 'a1'){
            a2.classList.remove('menus_active')
        }else if(e.target.id == 'a2'){
            a1.classList.remove('menus_active')

        }
        e.target.classList.add('menus_active')

    }
    render() {
        return (
            <div className='menu'
            style={{
               background:`url(https://ae01.alicdn.com/kf/H5a63404f2edf495e980e7440f204f15bC.jpg
               ) center center/cover no-repeat`,
               paddingTop:"5vh"
            }}>
                <nav style={{textAlign:'center'}}><img src={logo} alt='logo' width='35%'/></nav>
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
                    <Link to='/menus/login/qq'><i className='iconfont icon-qqdenglufanbai'></i></Link>
                    <Link to='/menus/login/wechat'><i className='iconfont icon-weixin'></i></Link>
                    <Link to='/menus/login/weibo'><i className='iconfont icon-comiisweibodenglu'></i></Link>
                </footer>
            </div>
        )
    }
}
