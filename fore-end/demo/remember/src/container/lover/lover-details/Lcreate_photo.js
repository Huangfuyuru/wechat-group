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
            background:"",
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
    upBack=()=>{

        var file=document.getElementById('back').files[0];
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
                var img=document.getElementById("background");
                img.setAttribute("src",this.state.background);
            })
        ))
    }
    render() {
        return (
            <div style={{width:"100%",backgroundColor:"white",marginTop:"10vh"}}>
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
            <div className="photo-first">
                  <p >相册名称:</p>
                  <input  type="text" placeholder="please input" onChange={this.getName}/>
                  </div>
                  <div className="cover-div" >
                    <span className="cover-font">轻触上传相册封面</span>
                    <input  
                        className="cover"
                        id="back"  
                        onChange={this.upBack}
                        type='file'  
                        accept="image/*" 
                        capture="camera" 
                        name="imgurl"
                        multiple="multiple"
                        alt=""/>
                    </div>
                    <div id="yuBack" style={{height:"20%",width:"40%",float:"left",marginLeft:"30%"}}>
                        <img id="background" style={{width:"100%",height:"100%"}} src="http://img3.imgtn.bdimg.com/it/u=4100812006,4207999617&fm=26&gp=0.jpg" alt="封面预览"/>
                    </div>
                  <WingBlank>
               <button className="photo-foot" onClick={this.upPhoto}>创建相册</button>
               </WingBlank>
               
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
