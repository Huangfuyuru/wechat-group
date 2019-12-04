import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import '../css/login.css'

export default class Login extends Component {
    constructor(){
        super();
        this.state={
            tel:'',
            pass:''
        }
    }
    changeTel=(e)=>{
        this.setState({
            tel:e.target.value
        })
        // console.log(this.state.tel)
    }
    changePass=(e)=>{
        this.setState({
            pass:e.target.value
        })
        // console.log(this.state.tel)
    }
    getData=()=>{
        fetch('http://localhost:3001/login',{
            method:'POST',
            mode:'cors',
            headers:{
                'Content-Type':"application/x-www-form-urlencoded"
            },
            body:`utel=${this.state.tel}&pass=${this.state.pass}`
        }).then(res=>res.json())
        .then(json=>{console.log(json)})
    }
    render() {
        return (
            <form className='login'>
                <p>
                    <i className='iconfont icon-ef-zhanghao'></i>
                    <input onChange={this.changeTel} type='tel' name='utel' placeholder='请输入手机号'/>
                </p>
                <p>
                    <i className='iconfont icon-mima'></i>
                    <input onChange={this.changePass} type='password' name='pass' placeholder='请输入密码'/>

                </p>
                <Link to='/index'>
                    <button onClick={this.getData} className='but'>登录</button>
                </Link>
            </form>
        )
    }
}
