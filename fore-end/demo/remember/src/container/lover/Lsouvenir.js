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
            loverImpDateid:"",
            code:"",
            arr:[]
        }
    }
    componentDidMount(){
        fetch(`http://localhost:3001/lover/lsouvenir?loverid=${this.state.lover_id}`)
        .then(res=>res.json())
        .then(json=>{ 
            this.setState({
                arr:json.msg
            },()=>{
                console.log(json);
            });
        })
    }
    delSou=()=>{
        console.log("删除")
        fetch(`http://localhost:3001/lover/lsouvenir/delSouvenir?loverid=${this.state.lover_id}&loverImpDateid=${this.state.loverImpDateid}`)
        .then(res=>res.json())
        .then(json=>{ 
            if(json.code===0){
            this.setState({
                arr:json.msg,
                code:"删除成功！"
            });
        }
        })
        var dellsound=document.getElementById('dellsound');
        dellsound.style.display='none';
        var csoundagain=document.getElementById('csoundagain');
        csoundagain.style.display='block';
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
                   this.state.arr&&this.state.arr.map((item,idx)=>(
                    <div  className="loversou-first"  value={item.id} key={idx}>
                    <div style={{height:"100%",width:"100%",float:"left"}} value={item.id}>
                    <div  style={{float:"left",height:"100%",width:"50%",background:`url(${item.imgurl})`,backgroundSize:"100% 100%"}}></div>
                    <span className=" iconfont icon-jinianriyingxiao" ></span>
                    <h2 style={{marginTop:"0",textAlign:"center",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.name}</h2>
                    <p style={{fontSize:"5vw" ,margin:"0 0 0 10%",float:"left"}}>{item.date.split("T")[0]}</p>
                     {/* <textarea style={{fontSize:"5vw",float:"right",width:"53%",height:"80%",border:"0.5px solid #888888"}} readonly="readonly">{item.content}</textarea> */}
                   <img alt="" src={require("../../image/la.jpg")} style={{float:"right",height: "24%",position: "relative",top: "12%"}} 
                   onClick={(e)=>{
                    var itemid = e.target.parentNode.getAttribute('value');
                    this.setState({
                        loverImpDateid:itemid
                    })
                    var dellsound=document.getElementById('dellsound');
                    dellsound.style.display='block';
                    }} 
                   />
                   </div>
                    </div>
                   ))
               }

            <div id='dellsound'>
                    <div>确定删除？</div>
                    <button 
                    onClick={()=>{
                        var dellsound=document.getElementById('dellsound');
                        dellsound.style.display='none';
                    }}
                    style={{
                        width:'25%',
                        height:'15%',
                        color:'#FFBF2D',
                        border:'none',
                        marginTop:'2vh',
                        background:'#fff',
                        borderRadius:'5px',
                        fontSize:'6vw',
                        marginRight:'10vw'
                    }}>返回</button>
                    <button 
                    onClick={this.delSou}
                    style={{
                        width:'25%',
                        height:'15%',
                        color:'#FFBF2D',
                        border:'none',
                        marginTop:'2vh',
                        background:'#fff',
                        borderRadius:'5px',
                        fontSize:'6vw'
                    }}>确定</button>
                </div>
                <div id='csoundagain'>
                <div>{this.state.code}</div>
                    <button 
                    onClick={()=>{
                        var csoundagain=document.getElementById('csoundagain');
                        csoundagain.style.display='none';
                    }}
                    style={{
                        width:'25%',
                        height:'15%',
                        color:'#FFBF2D',
                        border:'none',
                        marginTop:'2vh',
                        background:'#fff',
                        borderRadius:'5px',
                        fontSize:'6vw'
                    }}>确定</button>
                 </div>   
          
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
