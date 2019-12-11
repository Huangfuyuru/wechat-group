import React, { Component } from 'react'
import { NavBar} from 'antd-mobile';
import {Link} from "react-router-dom"
import "../../css/lover.css"
export default class Lsouvenir extends Component {
    constructor(props){
        super(props)
        var lid = JSON.parse(localStorage.getItem('lid'));
        this.state={
            lover_id:lid,
            arr:[]
        }
    }
    componentDidMount(){
        fetch(`http://localhost:3001/lover/lsouvenir?loverid=${this.state.lover_id}`)
        .then(res=>res.json())
        .then(json=>{ 
            this.setState({
                arr:json
            },()=>{
                console.log("shuzu",this.state.arr)
            });
        })
    }
    render() {
        return (
            <div style={{height:"100%",width:"100%",backgroundColor:"white"}}>
                 <NavBar style={{
                     background:'#FFBF2D',
                     height:'8vh',
                     color:'#fff',
                     fontWeight:'bolder',
                    }}
                    mode="light"
                    icon={'𡿨'}
                    onLeftClick={() => this.props.history.push('/index/lover')}
                 ><span style={{
                     fontWeight:'bold',
                     fontSize:'6vw',
                     textIndent:'3vw',
                     color:'#fff',
                     letterSpacing:'3vw'}}>纪念日</span>
                </NavBar>
              {/* <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1996765656,1986455071&fm=26&gp=0.jpg" alt="" style={{height:"40%",width:"92%",margin:"4% 0 0 4%"}}></img> */}
               {
                   this.state.arr.map((item)=>(
                    <div className="loversou-first" style={{position:"static"}}>
                    <img  src="https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=60605163,304913415&fm=26&gp=0.jpg" alt=""  style={{float:"left",height:"100%",width:"50%"}}></img>
                    <h1 style={{marginTop:"8%",textAlign:"center"}}>{item.name}</h1>
                    <p style={{fontSize:"5vw" ,textAlign:"center"}}>{item.date.split("T")[0]}</p>
                     {/* <textarea style={{fontSize:"5vw",float:"right",width:"53%",height:"80%",border:"0.5px solid #888888"}} readonly="readonly">{item.content}</textarea> */}
                   <img alt="" src={require("../../image/la.jpg")} style={{float:"right"}}/>
                    </div>
                   ))
               }
              <Link to="/lover/lcsouvenir"><img src={require("../../image/jia.jpg")}  className="lovesou-foot"   alt=""></img></Link>
            </div>
        )
    }
}
