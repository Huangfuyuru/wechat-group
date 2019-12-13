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
        }
    }
    getName=(e)=>{
        this.setState({
            name:e.target.value
        })
    }
    upPhoto=()=>{
        console.log("执行")
            fetch(`http://localhost:3001/lover/lpictures/lcpictures`,{
                method:"POST",
                mode:'cors',
                headers:{
                'Content-Type':"application/x-www-form-urlencoded"
            },
            body:`loverid=${this.state.lover_id}&name=${this.state.name}`
            })
            .then(res=>res.json())
            .then(json=>{ 
                this.setState({
                },()=>{
                    console.log("添加",json)
                });
            })
    }
    render() {
        return (
            <div style={{height:"100%",width:"100%",backgroundColor:"white",marginTop:"10vh"}}>
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
                  <Link to="/lover/lpictures">
                  <WingBlank>
               <button className="photo-foot" onClick={this.upPhoto}>创建相册</button>
               </WingBlank>
               </Link>
            </div>
        )
    }
}
