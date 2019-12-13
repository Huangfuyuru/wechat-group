import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { NavBar, Icon } from 'antd-mobile';

export default class Create extends Component {
    constructor(){
        super();
        var cid = JSON.parse(localStorage.getItem('cid'));
        this.state={
            code:'',
            cid:cid,
            name:'',
            backgroundurl:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1961296464,1745767450&fm=26&gp=0.jpg'
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
    ccpicturePost=()=>{
        var ccpicturewarn=document.getElementById('ccpicturewarn');
        ccpicturewarn.style.display='block';
        console.log(this.state.cid)
        fetch(`http://localhost:3001/child/cpictures/ccpictures?childsid=${this.state.cid}&name=${this.state.name}&background=${this.state.backgroundurl}`,{
            method:'GET',
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
                    <div className='ccpicture_name'>
                        相册名称：
                        <input 
                        onChange={this.nameChange} 
                        type="text" 
                        placeholder="单行输入"/>
                    </div>
                    <div>
                        <span 
                        style={{
                            zIndex:'10',
                            display:'inline-block',
                            width:'45vw',
                            lineHeight:'6vh',
                            height:'6vh',
                            fontSize:'6.5vw',
                            top:'28vh',
                            left:'28vw',
                            position:'absolute',
                            color:'#000',
                            background:'rgb(255,191,45,0.2)'
                        }}>轻触上传封面<input 
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
                            position:'relative',
                            top:'13vh',
                            right:'0vw',
                            height:'15vh',
                            width:'45vw',
                            margin:'0',
                            background:`url(${this.state.backgroundurl}) center center/cover no-repeat`
                        }}>
                        </span>
                    </div>
                    {/* 点击创建 */}
                    <button onClick={this.ccpicturePost} className='alladd_button'>创建相册</button>
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