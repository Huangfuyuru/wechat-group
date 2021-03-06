import React, { Component } from 'react'
import { NavBar,WingBlank} from 'antd-mobile';
import {Link} from "react-router-dom"
import "../../../css/lover.css"
export default class Lcreate_list extends Component {
    constructor(props){
        super(props);
        this.state={
            name:this.props.location.state.name,
            content:"",
            imgurl:"",
            local:"",
            setdate:"",
            listid:this.props.location.state.listid,
            lid:JSON.parse(localStorage.getItem('lid')),
            code:""
        }
    }
    upFile=()=>{
        var file=document.getElementById('list').files[0];
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
                imgurl:json.path
            },()=>{
                var img=document.getElementById("listPhoto");
                img.setAttribute("src",this.state.imgurl);
            })
        ))
    }
    getContent=(e)=>{
        this.setState({
            content:e.target.value
        })
    }
    getDate=(e)=>{
        this.setState({
            setdate:e.target.value
        })
    }
    getLocal=(e)=>{
        this.setState({
            local:e.target.value
        })
    }
    upList=()=>{
        console.log("增加")
        fetch(`http://localhost:3001/lover/loverlist/addloverlist`,{
            method:'POST',
            mode:'cors',
            headers:{
                'Content-Type':"application/x-www-form-urlencoded"
            },
            body:`name=${this.state.name}&content=${this.state.content}&imgurl=${this.state.imgurl}&local=${this.state.local}&listid=${this.state.listid}&lid=${this.state.lid}&setdate=${this.state.setdate}`
        })
        .then(res=>res.json())
        .then(json=>{ 
            console.log(json)
             if(json.code===0){
                 this.setState({
                     code:"增加成功"
                 })
             }
        })
        var uplists=document.getElementById('uplists');
        uplists.style.display='block';
    }
    render() {
        return (
            <div style={{width:"100%",backgroundColor:"white"}}>
            <NavBar
                    style={{
                        height:'8vh',
                        color:'black',
                        zIndex:'11',
                     position:'fixed',
                     width:'100%',
                     left:0,
                     top:0
                    }}
                    mode="light"
                    icon={'𡿨'}
                    onLeftClick={() => this.props.history.push('/lover/lslists')}
                    ><span style={{
                        // fontWeight:'bold',
                        fontSize:'6vw',
                        textIndent:'3vw',
                        letterSpacing:'3vw',
                        color:"black"
                    }}
                    >新建清单</span>
                </NavBar>
                <div style={{marginTop:"10vh"}}>
            <p style={{fontSize:"5vw",float:"left",margin:"5% 5%"}}> 用一张图记录</p>
            <div style={{height:"6vh",width:"40%",backgroundColor:"pink",float:"left",marginTop:"1vh"}} >
                    <span style={{position:"relative",top:"30%",left:"15%"}}>轻触上传封面</span>
                    <input  
                        style={{height:"100%",width:"100%",opacity:"0"}}
                        id="list"  
                        onChange={this.upFile}
                        type='file'  
                        accept="image/*" 
                        capture="camera" 
                        name="imgurl"
                        multiple="multiple"
                        alt=""/>
            </div>
            <div className="createlist-first">
            <img id="listPhoto" src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3560880680,1309107465&fm=26&gp=0.jpg" alt="图片预览" />
            </div>
            <p style={{fontSize:"5vw",float:"left",margin:"5% 5%"}}> 用一句话记录</p>
            <input type="text" className="createlist-second" placeholder="单行输入" onChange={this.getContent}></input>
            <div className="createlist-three">
                  <p >时间:</p>
                  <input  type="text" placeholder="例:1999-11-28" onChange={this.getDate}/>
                  </div>
                  <div className="createlist-three">
                  <p >地址:</p>
                  <input  type="text" placeholder="石家庄" onChange={this.getLocal}/>
                  </div>
                  <WingBlank>
               <button className="createlist-foot" onClick={this.upList}>保存</button>
               </WingBlank>
            </div>

             <form id='uplists'>
                    <div>{this.state.code}</div>
                    <button 
                    onClick={()=>{
                        var uplists=document.getElementById('uplists');
                        uplists.style.display='none';
                        this.props.history.push('/lover/lslists');
                    }}
                    style={{
                        width:'35%',
                        height:'15%',
                        color:'black',
                        border:'none',
                        marginTop:'2vh',
                        background:'#fff',
                        borderRadius:'5px',
                        fontSize:'6vw',
                        marginRight:'2vw'
                    }}>返回列表</button>
                </form> 
            </div>

        )
    }
}
