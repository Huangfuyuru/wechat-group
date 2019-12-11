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
        })
        )
    )}
    upSouver=()=>{
        console.log('lcsouenir');
        fetch(`http://localhost:3001/lover/lsouvenir/lcsouvenir`,{
            method:'POST',
            mode:'cors',
            headers:{
                'Content-Type':"application/x-www-form-urlencoded"
            },
            body:`item=${this.state.item}&name=${this.state.name}&imgurl=${this.state.imgurl}&loverid=${this.lover_id}&date=${this.state.date}`
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
                  <input  type="text" placeholder="例:1999-11-28" onChange={this.getDate}/>
                  </div>
                  <div style={{float:"left",margin:"8%"}} >
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
                    </div>
                  {/* <textarea className="createsou-second" onChange={this.getContent} >内容：</textarea> */}
                  <h1 style={{margin:"5% 0 0  9%"}}>设置提醒</h1>
                  <Link to="/lover/lsouvenir">
                  <WingBlank>
               <button className="createsou-foot" onClick={this.upSouver}>保存</button>
               </WingBlank>
               </Link>
            </div>
        )
    }
}
