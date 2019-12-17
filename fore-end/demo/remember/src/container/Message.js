import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import '../css/login.css'
import logo from '../image/logo.png'
export default class Message extends Component {
   constructor(){
       super();
       this.state={
           src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574914271954&di=5ce6c90533745142d11594040dd0b2b1&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201506%2F19%2F20150619202710_4vZ8s.thumb.224_0.jpeg',
           uname:'',
           utel:'',
           conpass:''
        }
   }
   upfile=()=>{
       var file=document.getElementById('img').files[0];
       var url = 'http://localhost:3001/img';
       var form = new FormData();
       form.append("file",file);
       fetch(url,{
           method:'POST',
           body:form
       }).then(res=>res.json())
       .then(res=>{
           console.log(res.path);
           this.setState({src:res.path})
       })
   }
   changeName=(e)=>{
       this.setState({
           uname:e.target.value
       })
    }
   changeTel=(e)=>{
       this.setState({
           utel:e.target.value
       })
    }
   changePass=(e)=>{
       this.setState({
           conpass:e.target.value
       })
    }
    buttonPost=()=>{
        var obj=document.getElementsByName('usex');
        var a='';
        for(var i=0;i<obj.length;i++){
            if(obj[i].checked){
                a = obj[i].value;
                // console.log(a)
            }
        }
        fetch('http://localhost:3001/resign/message',{
            method:'POST',
            mode:'cors',
            headers:{
                'Content-Type':"application/x-www-form-urlencoded"
            },
            body:`utel=${this.state.utel}&uimage=${this.state.src}&uname=${this.state.uname}&pass=${this.state.conpass}&usex=${a}`
        }).then(res=>res.json())
        .then(json=>{console.log(json)})
    }
    render() {
        return (
            <div className='message'>
                <nav style={{textAlign:'center'}}><img src={logo} alt='logo' width='60%'/></nav>
                <div className='message_detail'>
                    <p className='img'>
                        <i className='iconfont icon-touxiangshangchuan'></i>  
                        <span>轻触上传头像<input 
                        id='img'
                        onChange={this.upfile}                         
                        type='file'  
                        accept="image/*" 
                        capture="camera" 
                        name='uimage' 
                        placeholder='轻触上传头像'/></span>                          
                        <div style={{
                            width:'20vw',
                            height:'10vh',
                            display:'inline-block',
                            marginLeft:'6vw'}}>
                                <img src={this.state.src} 
                                alt='默认头像'
                                width='100%'/>              
                        </div>
                    </p>
                    <p className='message_details' >
                        <i className='iconfont icon-zhanghao'></i>
                        <input
                        onChange={this.changeName}                           
                        type='text' 
                        name='uname' 
                        placeholder='请输入昵称'/>
                    </p>
                    <p className='message_details message_box' onClick={this.changeSex}>
                        <i className='iconfont icon-zu'></i>
                        <input
                        type='radio' 
                        name='usex' 
                        value='woman' 
                        checked/>女
                        <input 
                        id='man'
                        type='radio' 
                        name='usex' 
                        value='man'/>男
                    </p>
                    <p className='message_details'>
                        <i className='iconfont icon-_'></i>
                        <input 
                        onChange={this.changeTel}                            
                        type='tel' 
                        name='utel' 
                        placeholder='请输入手机号'/>
                    </p>
                    <p className='message_details'>
                        <i className='iconfont icon-queren'></i>
                        <input
                        onChange={this.changePass}                            
                        type='password' 
                        name='pass' 
                        placeholder='请确认密码'/>
                    </p>
                    <button className='message_but'>
                        <Link to='/menus/resign'>返回</Link>
                    </button>
                    <button onClick={this.buttonPost} className='message_but' type='submit'>提交</button>
                </div>
            </div>
        )
    }
}
