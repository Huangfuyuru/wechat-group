import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import '../css/login.css'
import logo from '../image/logo.png'
export default class Message extends Component {
   constructor(){
       super();
       this.state={
           src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574914271954&di=5ce6c90533745142d11594040dd0b2b1&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201506%2F19%2F20150619202710_4vZ8s.thumb.224_0.jpeg'
       }
   }
   upfile=()=>{
       var file=document.getElementById('img');
       var url = 'http://localhost:3000/img';
       var form = new FormData();
       form.append("file",file);
       fetch(url,{
           method:'POST',
           body:form
       }).then(res=>res.json())
       .then(res=>(this.setState({src:res.path})))
   }
    render() {
        return (
            <div className='message'>
                <nav style={{textAlign:'center'}}><img src={logo} alt='logo' width='60%'/></nav>
                <div className='message_detail'>
                    <form action='http://localhost:3000/resign/message' method='post'>
                        <p className='img'>
                            <i className='iconfont icon-touxiangshangchuan'></i>  
                            <span>轻触上传头像<input 
                            id='img'
                            // onChange={()=>{
                            //     // this.setState({src:e.target.files[0].name})
                            //     console.log(e.target.files[0])
                            // }}    
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
                            type='text' 
                            name='uname' 
                            placeholder='请输入昵称'/>
                        </p>
                        <p className='message_details message_box'>
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
                            type='tel' 
                            name='utel' 
                            placeholder='请输入手机号'/>
                        </p>
                        {/* <p className='message_details'>
                            <i className='iconfont icon-mima1'></i>
                            <input                         
                            type='password' 
                            name='upass' 
                            placeholder='请输入密码'/>
                        </p> */}
                        <p className='message_details'>
                            <i className='iconfont icon-queren'></i>
                            <input                            
                            type='password' 
                            name='pass' 
                            placeholder='请确认密码'/>
                        </p>
                        <button className='message_but'>
                            <Link to='/menus/resign'>返回</Link>
                        </button>
                        <button className='message_but' type='submit'>提交</button>
                    </form>
                </div>
            </div>
        )
    }
}
