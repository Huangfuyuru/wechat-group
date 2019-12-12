import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import '../css/login.css'

export default class Login extends Component {
    constructor(){
        super();
        this.state={
            tel:'',
            pass:'',
            code:''
        }
    }
    changeTel=(e)=>{
        this.setState({
            tel:e.target.value
        })
    }
    changePass=(e)=>{
        this.setState({
            pass:e.target.value
        })
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
        .then(json=>{
            localStorage.setItem('uid',JSON.stringify(json.id))
            var uid = JSON.parse(localStorage.getItem('uid'));
            if(json.code==0){
                this.props.history.push({
                    pathname:'/index/my',
                    state:{
                        userid:uid
                    }
                });
                console.log(uid)
                console.log('登录成功')
            }else{
                this.setState({
                    code:json.msg
                },()=>{
                    var lwarn=document.getElementById('lwarn');
                    lwarn.style.display='block';
                })
            }
        })
    }
    render() {
        return (
            <div className='login'>
                <p>
                    <i className='iconfont icon-ef-zhanghao'></i>
                    <input onChange={this.changeTel} type='tel' name='utel' placeholder='请输入手机号'/>
                </p>
                <p>
                    <i className='iconfont icon-mima'></i>
                    <input onChange={this.changePass} type='password' name='pass' placeholder='请输入密码'/>

                </p>
                <button onClick={this.getData} className='but'>登录</button>
                <div id='lwarn'>
                    <div>{this.state.code}</div>
                    <button 
                    onClick={()=>{
                        var warn=document.getElementById('lwarn');
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
