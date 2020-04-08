import React, { Component } from 'react'
import { NavBar,WingBlank} from 'antd-mobile';
import "../../../css/lover.css"
import {Link} from "react-router-dom"
export default class Lcreate_souver extends Component {
    constructor(props){
        super(props)
        var lid = JSON.parse(localStorage.getItem('lid'));
        this.state={
            lover_id:lid,
            item:"纪念日",
            name:"",
            imgurl:"",
            content:"",
            code:"",
            date:""
        }
    }
    getTitle=(e)=>{
        this.setState({
                name:e.target.value
            
        })
    }
    getDate=(e)=>{
        this.setState({
            date:e.target.value
    })
    }
    getContent=(e)=>{
        this.setState({
            content:e.target.value
    })
    }
    upfile=()=>{
        var file=document.getElementById('img1').files[0];
        var url = 'http://localhost:3001/img';
        var form = new FormData();
        form.append("file",file);
        fetch(url,{
            method:'POST',
            enctype:'multipart/form-data',
            body:form
        }).then(res=>res.json())
        .then(json=>(
            this.setState((state)=>{
                state.imgurl=json.path
        },()=>{
            var img=document.getElementById("souBack");
            img.setAttribute("src",this.state.imgurl);
        })
        )
    )}
    upSouver=()=>{
        var updairywarn=document.getElementById('updairywarn');
        updairywarn.style.display='block';
        fetch(`http://localhost:3001/lover/lsouvenir/lcsouvenir`,{
            method:'POST',
            mode:'cors',
            headers:{
                'Content-Type':"application/x-www-form-urlencoded"
            },
            body:`item=${this.state.item}&name=${this.state.name}&imgurl=${this.state.imgurl}&loverid=${this.state.lover_id}&date=${this.state.date}`
        })
        .then(res=>res.json())
        .then(json=>{ 
            
                this.setState({
                    code:"上传成功"
                })
            
            console.log(json)
        })
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
                    onLeftClick={() => this.props.history.push('/lover/lsouvenir')}
                 ><span style={{
                     color:'#fff',
                     fontWeight:'bold',
                     fontSize:'6vw',
                     textIndent:'3vw',
                     letterSpacing:'3vw'}}>新建纪念日</span>
                </NavBar>
                  <div className="createsou-first">
                  <p >纪念日:</p>
                  <input  type="text" placeholder="please input" onChange={this.getTitle}/>
                  </div>
                  <div className="createsou-first">
                  <p >日期:</p>
                  <input  type="text" placeholder="例:xxxx-xx-xx" onChange={this.getDate}/>
                  </div>
                  <div className="createsou-first">
                  <p  style={{padding:" 0 15% 0 9%"}}>设置提醒:</p>
                  <input  type="text" placeholder="提醒日期" />
                  </div>
                  <div style={{marginTop:"5vh"}}>
                    <div style={{height:"6vh",width:"40%",backgroundColor:"rgb(255, 191, 45,0.5)",margin:"auto"}} >
                    <span style={{position:"relative",top:"30%",left:"15%"}}>轻触上传封面</span>
                    
                    <input  
                        style={{height:"100%",width:"100%",opacity:"0"}}
                        id="img1"  
                        onChange={this.upfile}
                        type='file'  
                        accept="image/*" 
                        capture="camera" 
                        name="imgurl"
                        multiple="multiple"
                        alt=""/>
                     </div>
                 </div>
                 <div style={{width:"60%",height:"20vh",float:"left",margin:"5vh 0 0 20%"}}>
                     <img  id="souBack" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2591606286,529221099&fm=15&gp=0.jpg" style={{height:"100%",width:"100%",float:"left"}}/>
                 </div>
                  {/* <div style={{float:"left",margin:"8%"}} >
                  <input  
                    style={{width:"90%",height:"100%"}}
                    id="img1"   
                    onChange={this.upfile}
                    type='file'  
                    accept="image/*" 
                    capture="camera" 
                    name="imgurl"
                    multiple="multiple"
                    alt=""/>
                    </div> */}
                  {/* <textarea className="createsou-second" onChange={this.getContent} >内容：</textarea> */}
                 
                  <WingBlank>
               <button className="createsou-foot" onClick={this.upSouver}>保存</button>
               </WingBlank>
               <form id='updairywarn'>
                    <div>{this.state.code}</div>
                    <button 
                    onClick={()=>{
                        var updairywarn=document.getElementById('updairywarn');
                        updairywarn.style.display='none';
                        this.props.history.push('/lover/lsouvenir');
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
                        var updairywarn=document.getElementById('updairywarn');
                        updairywarn.style.display='none';
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
