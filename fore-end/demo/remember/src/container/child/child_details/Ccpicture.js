import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { NavBar, Icon } from 'antd-mobile';

export default class Create extends Component {
    constructor(){
        super();
        this.state={
            name:'',
            backgroundurl:''
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
        })
        .then(res=>res.json())
        .then(res=>(
            console.log(res.path),
            this.setState({
                backgroundurl:res.path
            })
        ))
        
    }
    nameChange=(e)=>{
        this.setState({
            name:e.target.value
        })
    }
    render() {
        return (
            // 创建相册
            <div className="All">
                <NavBar
                    style={{
                    top:0,
                    width:'100%',
                    zIndex:'11',
                    position:'fixed',
                    height:'8vh',
                    background:'#FFBF2D',
                    color:'#fff',
                    fontWeight:'bolder',
                    }}
                    mode="light"
                    icon={'𡿨'}
                    onLeftClick={() => this.props.history.push('/child/cpictures')}
                    ><span style={{
                        fontWeight:'bold',
                        fontSize:'6vw',
                        textIndent:'3vw',
                        letterSpacing:'3vw',
                        color:"white"
                    }}
                    >创建相册</span>
                </NavBar>
                <div className='ccpicture_inner'>
                    <div>
                        相册名称：
                        <input 
                        onClick={this.nameChange} 
                        type="text" 
                        placeholder="单行输入"/>
                    </div>
                    {/* 创建日期 */}
                    <div>
                        创建日期：
                        <span 
                        style={{
                            zIndex:'10',
                            display:'inline-block',
                            width:'50%',
                            fontSize:'5vw',
                            // top:'8vh',
                            position:'relative',
                            color:'#000',
                            background:'rgb(255,191,45,0.3)'
                        }}>轻触上传相册封面<input 
                        id='img'
                        onChange={this.upfile}                           
                        type='file'  
                        accept="image/*" 
                        capture="camera" 
                        name='uimage' 
                        /></span>
                        <span
                        style={{
                            display:'inline-block',
                            height:'10vh',
                            width:'10vh',
                            background:'#ccc'
                        }}>
                            <img 
                            src={this.state.backgroundurl} alt='封面预览'/>
                        </span>
                    </div>
                    {/* 点击创建 */}
                    <button >创建相册</button>
                    <Link to="/child/cpictures/show"> 
                    </Link>
                </div>

                <form id='ccpicturewarn'>
                    <div>{this.state.code}</div>
                    <button 
                    onClick={()=>{
                        var ccsoundwarn=document.getElementById('ccpicturewarn');
                        ccsoundwarn.style.display='none';
                        this.props.history.push('/child/cpictures');
                    }}
                    style={{
                        width:'35%',
                        height:'15%',
                        color:'#FFBF2D',
                        border:'none',
                        marginTop:'2vh',
                        background:'#fff',
                        borderRadius:'5px',
                        fontSize:'6vw',
                        marginRight:'2vw'
                    }}>返回列表</button>
                    <button 
                    onClick={()=>{
                        var ccpicturewarn=document.getElementById('ccpicturewarn');
                        ccpicturewarn.style.display='none';
                        this.props.form.resetFields();
                    }}
                    style={{
                        width:'35%',
                        height:'15%',
                        color:'#FFBF2D',
                        border:'none',
                        marginTop:'2vh',
                        background:'#fff',
                        borderRadius:'5px',
                        fontSize:'6vw'
                    }}>继续创建</button>
                </form>
            </div>
        )
    }
}