import React, { Component } from 'react'
import { NavBar,WingBlank} from 'antd-mobile';
import "../../../css/lover.css"
import {Link} from "react-router-dom"
import imgsrc from "../../../image/tu.jpg"

export default class Lcreate_note extends Component {
    constructor(props){
        super(props);
        this.state={
            lover_id:this.props.location.state.lover_id,
            name:"",
            content:"",
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
        .then(json=>(this.setState({
            imgurl:json[0].path//还有问题！
        })
        )
    )}
    upDairy=()=>{
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
            console.log(json)
        })
    }
    render() {
        return (
            <div style={{height:"100%",width:"100%",backgroundColor:"white"}}>
           <NavBar 
                 style={{
                     background:'#FFBF2D',
                     height:'8vh',
                     color:'#fff',
                     fontWeight:'bolder',
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
                <input 
                onChange={this.changeContent}
                type="text"  className="createnote-first"></input>
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
            </div>

        )
    }
}
