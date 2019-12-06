import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import '../css/login.css'
import { nodeInternals } from 'stack-utils';
import { nonsense } from 'antd-mobile/lib/picker';
export default class Resign extends Component {
    constructor(){
        super();
        this.state={
            tel:'',
            confirm:'',
            passwd:'',
            conpass:'',
            code:''
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
        var warn=document.getElementById('warn');
        fetch('http://localhost:3001/resign/confirm',{
            method:'POST',
            mode:'cors',
            headers:{
                'Content-Type':"application/x-www-form-urlencoded"
            },
            body:`utel=${this.state.tel}`
        }).then(res=>res.json())
        .then(json=>{
            
            this.setState({
                code:json.msg
            },()=>{
                if(json.code==1){
                    warn.style.display='block';
                }
            })
            console.log(json)
        })
    }
    post=()=>{
        var warn=document.getElementById('warn');
        warn.style.display='block';
        fetch('http://localhost:3001/resign',{
            method:'POST',
            mode:'cors',
            headers:{
                'Content-Type':"application/x-www-form-urlencoded"
            },
            body:`utel=${this.state.tel}&confirm=${this.state.confirm}&passwd=${this.state.passwd}&pass=${this.state.conpass}`
        }).then(res=>res.json())
        .then(json=>{
            this.setState({
                code:json.msg
            })
            console.log(json)
        })
    }
    render() {
        return (
            <div className='resign'>
                <p>
                    <i className='iconfont icon-ef-zhanghao'></i>
                    <input onChange={this.changeTel} style={{width:"39%"}} type='tel' name='utel' placeholder='手机号' required/>
                    <span className='get' onClick={this.buttonPost}>获取验证码</span>
                </p>
                <p>
                    <i className='iconfont icon-youjian'></i>
                    <input onChange={this.changeConfirm} type='text' name='confirm' placeholder='验证码' required/>
                </p>
                <p>
                    <i className='iconfont icon-mima'></i>
                    <input onChange={this.changePasswd} type='password' name='passwd' placeholder='密码' required/>

                </p>
                <p>
                    <i className='iconfont icon-queren'></i>
                    <input
                    onChange={this.changePass}                            
                    type='password' 
                    name='pass' 
                    placeholder='请确认密码'/>
                </p>
                <button onClick={this.post} className='but' type='submit'>
                    {/* <Link className='but' to='/resign/message'>立即注册</Link> */}
                    立即注册
                </button>
                <li>注册即同意《用户协议》</li>
                <div id='warn'>
                    <div>{this.state.code}</div>
                    <button 
                    onClick={()=>{
                        var warn=document.getElementById('warn');
                        warn.style.display='none';
                    }}
                     style={{
                        width:'25%',
                        height:'15%',
                        color:'#FFBF2D',
                        border:'none',
                        marginTop:'2vh',
                        background:'#fff',
                        borderRadius:'5px',
                        fontSize:'6vw'
                    }}>确定</button>
                </div>
            </div>
        )
    }
}
