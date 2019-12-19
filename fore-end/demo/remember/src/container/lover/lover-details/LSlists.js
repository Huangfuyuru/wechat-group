import React, { Component } from 'react'
import {NavBar,WingBlank} from "antd-mobile"
import {Link} from "react-router-dom"
import "../../../css/lover.css"
export default class LSlists extends Component {
    constructor(){
        super();
        this.state={
            lid:JSON.parse(localStorage.getItem('lid')),
            listArr:[]
        }
    }
    componentDidMount(){
        fetch(`http://localhost:3001/lover/loverlist/list?loverid=${this.state.lid}`)
        .then((res)=>res.json())
        .then((json)=>{
            this.setState({
                listArr:json
            })
            
        })
    }
    render() {
        let num=0;
        return (
            <div style={{width:"100%",backgroundColor:"white",marginTop:"10vh"}}>
              <NavBar
                    style={{
                        backgroundColor:"white",
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
                    onLeftClick={() => this.props.history.push('/lover/llists')}
                    ><span style={{
                    
                        fontSize:'6vw',
                        textIndent:'3vw',
                        letterSpacing:'3vw',
                        color:"black"
                    }}
                    >清单列表</span>
                </NavBar>
                { 
                     this.state.listArr.map((item)=>{
                        if(item.imgurl!==undefined){
                            num+=1
                        }
                     }
                     )
                }
   <div style={{width:"100%",height:"6vh",backgroundColor:"rgb(255, 235, 238)"}}><p style={{height:"5vh",width:"80%",backgroundColor:"#FF1744",fontSize:"5vw",margin:" 2% 0 0 10%",color:"white",borderRadius:"5vw",textAlign:"center",float:"left",lineHeight:"2"}}>已完成{num}/{this.state.listArr.length}</p></div> 
    <div style={{width:"100%",backgroundColor:"#FFEBEE",float:"left"}}>
                {
                    
                     this.state.listArr.map((item,idx)=>{
                         var a;
                         if(item.imgurl===undefined)
                         {
                         
                             a=  <div className="limages" key={idx}>  
                               <Link to={{
                                   pathname:"/lover/lclist",
                                   state:{
                                    listid:item.id,
                                    name:item.name
                                }
                               }}>
                                   <div  style={{background:`url(${require('../../../image/tu1.jpg')})`,backgroundSize:"100% 100%",height:"100%",width:"100%"}} >
                                   <p style={{color:"#888888",textAlign:"center",paddingTop: "14vh",margin:"0",overflow: "hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"}}>{item.name}</p>
                               </div>
                               </Link>
                               </div>
                         
                            }
                            else{
                                a=  <div className="limages" style={{background:`url(${item.imgurl}) `,backgroundSize:"cover",backgroundRepeat:"no-repeat"}} key={idx}>
                                <Link to={{
                                    pathname:"/lover/list1",
                                    state:{
                                     arr:item
                                 }
                                }}>
                                    <div  style={{height:"100%",width:"100%",backgroundColor:"rgb(0,0,0,0.5)",zIndex:"10",float:"left"}} >
                                    <p style={{color:"white",textAlign:"center",lineHeight:"20vh",margin:"0",overflow: "hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"}}>{item.name}</p>
                                   </div>
                                </Link>
                                </div>

                            }
                            return a;
                })      
                }
                </div>
   
            </div>
        )
    }
}