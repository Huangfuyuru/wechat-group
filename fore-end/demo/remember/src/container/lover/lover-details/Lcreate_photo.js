import React, { Component } from 'react'
import { NavBar,WingBlank} from 'antd-mobile';
import "../../../css/lover.css"
import {Link} from "react-router-dom"
export default class Lcreate_photo extends Component{
    constructor(props){
        super(props);
        var lid = JSON.parse(localStorage.getItem('lid'));
        this.state={
            lover_id:lid,
            name:"",
            background:"http://img3.imgtn.bdimg.com/it/u=4100812006,4207999617&fm=26&gp=0.jpg",
            code:"",
        }
    }
    getName=(e)=>{
        this.setState({
            name:e.target.value
        })
    }
    upPhoto=()=>{
        console.log("执行");
        var upsoundwarn=document.getElementById('upsoundwarn');
        upsoundwarn.style.display='block';
            fetch(`http://localhost:3001/lover/lpictures/lcpictures`,{
                method:"POST",
                mode:'cors',
                headers:{
                'Content-Type':"application/x-www-form-urlencoded"
            },
            body:`loverid=${this.state.lover_id}&name=${this.state.name}&background=${this.state.background}`
            })
            .then(res=>res.json())
            .then(json=>{ 
                if(json.code===0){
                this.setState({
                    code:"创建成功！"
                },()=>{
                    console.log("添加",json)
                });
            }
            })
        
    }
    ccpicturePost=()=>{
        var ccpicturewarn=document.getElementById('ccpicturewarn');
        ccpicturewarn.style.display='block';
        console.log(this.state.lid)
        fetch(`http://localhost:3001/lover/lpictures/lcpictures`,{
            method:'POST',
            mode:'cors',
            headers:{
                'Content-Type':"application/x-www-form-urlencoded"
            },
            body:`loverid=${this.state.lover_id}&name=${this.state.name}&background=${this.state.backgroundurl}`
        }).then(res=>res.json())
        .then(json=>{
            this.setState({
                code:json.msg
            })
            console.log(json)
        })

    }
    upBack=()=>{
        var file=document.getElementById('img').files[0];
        var url = 'http://localhost:3001/img';
        var form = new FormData();
        form.append("file",file);
        fetch(url,{
            method:'POST',
            enctype:'multipart/form-data',
            body:form
        }).then(res=>res.json())
        .then(json=>( 
            this.setState({
                background:json.path
            },()=>{
                // var img=document.getElementById("background");
                // img.setAttribute("src",this.state.background);
            })
        ))
    }
    render() {
        return (
            <div className='ccpicture'>
                <NavBar 
                style={{
                    background:'#FFBF2D',
                    height:'8vh',
                    color:'#fff',
                    fontWeight:'bolder',
                    zIndex:'11',
                    position:'fixed',
                    width:'100%',
                    left:0,
                    top:0
                    }}
                    mode="light"
                    icon={'𡿨'}
                    onLeftClick={() => this.props.history.push('/lover/lpictures')}
                ><span style={{
                    color:'#fff',
                    fontWeight:'bold',
                    fontSize:'6vw',
                    textIndent:'3vw',
                    letterSpacing:'3vw'}}>创建相册</span>
                </NavBar>
            <div className='ccpicture_inner'>
                    <div className='ccpicture_name'>
                        相册名称：
                        <input 
                        onChange={this.getName} 
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
                        onChange={this.upBack}                           
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
                            background:`url(${this.state.background}) center center/cover no-repeat`
                        }}>
                        </span>
                    </div>
                    {/* 点击创建 */}
                    <button onClick={this.upPhoto} className='alladd_button'>创建相册</button>
            </div>
               
               <form id='upsoundwarn'>
                    <div>{this.state.code}</div>
                    <button 
                    onClick={()=>{
                        var upsoundwarn=document.getElementById('upsoundwarn');
                        upsoundwarn.style.display='none';
                        this.props.history.push('/lover/lpictures');
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
                        var upsoundwarn=document.getElementById('upsoundwarn');
                        upsoundwarn.style.display='none';
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
                    }}>继续上传</button>
                </form>
            </div>
        )
    }
}
