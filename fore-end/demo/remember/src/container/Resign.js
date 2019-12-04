import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Resign extends Component {
    constructor(){
        super();
        this.state={
            tel:'',
            confirm:'',
            passwd:''
        }
    }
    changeTel=(e)=>{
        this.setState({
            tel:e.target.value
        })
        // console.log(this.state.tel)
    }
    changeConfirm=(e)=>{
        this.setState({
            confirm:e.target.value
        })
        // console.log(this.state.tel)
    }
    changePasswd=(e)=>{
        this.setState({
            passwd:e.target.value
        })
        // console.log(this.state.tel)
    }
    buttonPost=()=>{
        // console.log(this.state.tel)
        fetch('http://localhost:3001/resign/confirm',{
            method:'POST',
            mode:'cors',
            headers:{
                'Content-Type':"application/x-www-form-urlencoded"
            },
            body:`utel=${this.state.tel}`
        }).then(res=>res.json())
        .then(json=>{console.log(json)})
    }
    post=()=>{
        fetch('http://localhost:3001/resign',{
            method:'POST',
            mode:'cors',
            headers:{
                'Content-Type':"application/x-www-form-urlencoded"
            },
            body:`utel=${this.state.tel}&confirm=${this.state.confirm}&passwd=${this.state.passwd}`
        }).then(res=>res.json())
        .then(json=>{console.log(json)})
    }
    render() {
        return (
            <form className='resign' method='post' action='http://localhost:3000/resign'>
                <p>
                    <i className='iconfont icon-ef-zhanghao'></i>
                    <input onChange={this.changeTel} style={{width:"39%"}} type='tel' name='utel' placeholder='手机号'/>
                    <span className='get' onClick={this.buttonPost}>获取验证码</span>
                </p>
                <p>
                    <i className='iconfont icon-youjian'></i>
                    <input onChange={this.changeConfirm} type='text' name='confirm' placeholder='验证码'/>
                </p>
                <p>
                    <i className='iconfont icon-mima'></i>
                    <input onChange={this.changePasswd} type='password' name='passwd' placeholder='密码'/>

                </p>
                <button onClick={this.post} className='but' type='submit'>
                    <Link className='but' to='/resign/message'>立即注册</Link>
                    {/* 立即注册 */}
                </button>
                <li>注册即同意《用户协议》</li>
            </form>
        )
    }
}
