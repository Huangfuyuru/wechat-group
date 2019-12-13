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
            });
        })
    }
    delSou=(lid,sid)=>{
        console.log("删除")
        fetch(`http://localhost:3001/lover/lsouvenir/delSouvenir?loverid=${lid}&loverImpDateid=${sid}`)
        .then(res=>res.json())
        .then(json=>{ 
            this.setState({
                arr:json.msg
            });
        })
    }
    render() {
        return (
            <div style={{width:"100%",backgroundColor:"white",marginTop:"10vh",paddingBottom:"10vh"}}>
                 <NavBar style={{
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
                    onLeftClick={() => this.props.history.push('/index/lover')}
                 ><span style={{
                     fontWeight:'bold',
                     fontSize:'6vw',
                     textIndent:'3vw',
                     color:'#fff',
                     letterSpacing:'3vw'}}>纪念日</span>
                </NavBar>
                <h1></h1>
                <p></p>
                <h2></h2>
              {/* <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1996765656,1986455071&fm=26&gp=0.jpg" alt="" style={{height:"40%",width:"92%",margin:"4% 0 0 4%"}}></img> */}
               {
                   this.state.arr.map((item)=>(
                    <div className="loversou-first" style={{}}>
                    <img  src={item.imgurl} alt=""  style={{float:"left",height:"100%",width:"50%"}}></img>
                    <h2 style={{marginTop:"8%",textAlign:"center"}}>{item.name}</h2>
                    <p style={{fontSize:"5vw" ,margin:"0 0 0 10%",float:"left"}}>{item.date.split("T")[0]}</p>
                     {/* <textarea style={{fontSize:"5vw",float:"right",width:"53%",height:"80%",border:"0.5px solid #888888"}} readonly="readonly">{item.content}</textarea> */}
                   <img alt="" src={require("../../image/la.jpg")} style={{float:"right"}}  onClick={()=>this.delSou(item.lid,item.id)}/>
                    </div>
                   ))
               }
               <div className='allpage_add'>
                    <p></p>
                    <Link
                    to={{
                    pathname:'/lover/lcsouvenir',
                    }}
                    ><i className='iconfont icon-jia'></i></Link>
              </div>
            </div>
        )
    }
}
