import React, { Component } from 'react'
import { NavBar,WingBlank} from 'antd-mobile';
import "../../../css/lover.css"
import {Link} from "react-router-dom"
import imgsrc from "../../../image/tu.jpg"

export default class Lcreate_note extends Component {
    constructor(props){
        super(props);
        var lid = JSON.parse(localStorage.getItem('lid'));
        this.state={
            lover_id:lid,
            name:"",
            content:"",
            code:"",
            imgurl:[]
        }
    }
    changeTitle=(e)=>{
        this.setState({
            name:e.target.value
        })
    }
    changeContent=(e)=>{
        this.setState({
            content:e.target.value
        })
    }
    upfile=()=>{
        var file=document.getElementById('img1').files;
        var url = 'http://localhost:3001/imgs';
        var form = new FormData();
        for(var i=0;i<file.length;i++){
            form.append("file",file[i]);
        };
        fetch(url,{
            method:'POST',
            enctype:'multipart/form-data',
            body:form
        }).then(res=>res.json())
        .then(json=>(
            
            this.setState((state)=>{

                for(var i=0;i<json.length;i++){
                    state.imgurl[i]=json[i].path
                }
        },()=>{
            var yu =document.getElementById("yulan");
            for (var i = 0; i <this.state.imgurl.length; i++) {
                var img = document.createElement("img");
                img.setAttribute("src",this.state.imgurl[i]);
                img.setAttribute("id","lan");
                img.setAttribute("alt","图片预览");
                yu.appendChild(img)
            }
        })
        )
    )}
    upDairy=()=>{
        var updairywarn=document.getElementById('updairywarn');
        updairywarn.style.display='block';
        fetch(`http://localhost:3001/lover/ldairy/addDairy`,{
            method:'POST',
            mode:'cors',
            headers:{
                'Content-Type':"application/x-www-form-urlencoded"
            },
            body:`loverid=${this.state.lover_id}&name=${this.state.name}&content=${this.state.content}&imgurl=${this.state.imgurl}`
        })
        .then(res=>res.json())
        .then(json=>{ 
             if(json.code===0){
                 this.setState({
                     code:"上传成功"
                 })
             }
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
                    onLeftClick={() => this.props.history.push('/lover/ldairy')}
                 ><span style={{
                     color:'#fff',
                     fontWeight:'bold',
                     fontSize:'6vw',
                     textIndent:'3vw',
                     letterSpacing:'3vw'}}>创建日记</span>
                </NavBar>
                <div className="note-title">
                  <p >标题:</p>
                  <input  type="text" placeholder="请输入"  onChange={this.changeTitle}/>
                  </div>
                <textarea onChange={this.changeContent} className="createnote-first">
                </textarea>
                图片预览：
                <div style={{height:"24vh",width:"92%",overflowY:"scroll",border:"solid 1px #888888",margin:"2vh"}} id="yulan">
                 </div>
                <div className="createnote-second">
                    <div  style={{height:"76%",width:"22%" ,float:"left",marginLeft:"3%",backgroundImage:`url(${imgsrc})`,backgroundSize:"100% 100%"}} >
                    <input  
                    style={{width:"100%",height:"100%",opacity:"0"}}
                    id="img1"   
                    onChange={this.upfile}
                    type='file'  
                    accept="image/*" 
                    capture="camera" 
                    name="imgurl"
                    multiple="multiple"
                    alt=""/>
                    </div>
                    <img src={require("../../../image/biao.jpg")}  style={{height:"76%",width:"22%" ,float:"left",marginLeft:"3%"}} alt=""></img>
                    <img src={require("../../../image/ri.jpg")}  style={{height:"76%",width:"22%" ,float:"left",marginLeft:"3%"}} alt=""></img>
                    <img src={require("../../../image/wei.jpg")}  style={{height:"76%",width:"22%" ,float:"left",marginLeft:"3%"}} alt=""></img>
                </div>
                <WingBlank>
               <button className="createnote-foot" onClick={this.upDairy}>保存</button>
               </WingBlank>
               <form id='updairywarn'>
                    <div>{this.state.code}</div>
                    <button 
                    onClick={()=>{
                        var updairywarn=document.getElementById('updairywarn');
                        updairywarn.style.display='none';
                        this.props.history.push('/lover/ldairy');
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
