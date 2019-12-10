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
        var file=document.getElementById('img1').files[0];
        var url = 'http://localhost:3001/imgs';
        var form = new FormData();
        form.append("file",file);
        fetch(url,{
            method:'POST',
            body:form
        }).then(res=>res.json())
        .then(json=>(this.setState({
            imgurl:json[0].path
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
            <NavBar style={{backgroundColor:"#FFBF2D",color:"white"}}
                       leftContent={[
                        <Link to="/lover/ldairy" style={{color:"white"}}><div className="iconfont icon-arror_left_blod" style={{ marginRight: '26px' }} /></Link>,
                       ]}
            >创建日记</NavBar>
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
