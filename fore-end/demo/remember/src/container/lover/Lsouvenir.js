import React, { Component } from 'react'
import { NavBar} from 'antd-mobile';
import {Link} from "react-router-dom"
import "../../css/lover.css"
export default class Lsouvenir extends Component {
    constructor(){
        super()
        this.state={
            lover_souvenir:[
                {
                    title:"结婚纪念日",
                    date:"2018-11-18"
                },
                {
                    title:"结婚纪念日",
                    date:"2018-11-18"
                },  
                {
                    title:"结婚纪念日",
                    date:"2018-11-18"
                }
            ]
        }
    }
    componentDidMount(){
        let path = this.props.match.params.id
        fetch(``)
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({data:res.data});
        })
    }
    componentDidUpdate(Props,State){
        if(Props.location.search !== this.props.location.search){
            let path = this.props.match.params.id
            console.log('path',path)
            fetch( ``)
            .then((res)=>res.json())
            .then((res)=>{
                this.setState({data:res.data});
            })
        }
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
              <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1996765656,1986455071&fm=26&gp=0.jpg" alt="" style={{height:"40%",width:"92%",margin:"4% 0 0 4%"}}></img>
               {
                   this.state.lover_souvenir.map((item)=>(
                    <div className="loversou-first">
                    <img  src={require("../../image/xin.jpg")} alt=""  style={{float:"left",margin:"4% 10%"}}></img>
                   <h1>{item.title}</h1>
                   <p style={{fontSize:"5vw"}}>日期：{item.date}</p>
                    </div>
                   ))
               }
              <Link to="/lover/lcsouvenir"><img src={require("../../image/jia.jpg")}  className="lovesou-foot"   alt=""></img></Link>
            </div>
        )
    }
}
