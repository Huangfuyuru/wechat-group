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
            },()=>{
                console.log(json)
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
    <button style={{height:"5vh",width:"100%",backgroundColor:"white",fontSize:"5vw",marginTop:"2%"}}>已完成{num}/{this.state.listArr.length}</button>
    <div style={{width:"100%",backgroundColor:"#FFEBEE",float:"left"}}>
                {
                    
                     this.state.listArr.map((item)=>{
                         var a;
                         if(item.imgurl===undefined)
                         {
                         
                             a=  <div className="limages">
                               <Link to={{
                                   pathname:"/lover/lclist",
                                   state:{
                                    listid:item.id,
                                    name:item.name
                                }
                               }}>
                                   <div  style={{background:`url(${require('../../../image/tu1.jpg')})`,backgroundSize:"100% 100%",height:"100%",width:"100%"}} >
                                   <p style={{color:"#888888",textAlign:"center",lineHeight:"200px",margin:"0"}}>{item.name}</p>
                               </div>
                               </Link>
                               </div>
                         
                            }
                            else{
                                a=  <div className="limages">
                                <Link to={{
                                    pathname:"/lover/list",
                                    state:{
                                     arr:item
                                 }
                                }}>
                                    <div  style={{background:`url(${item.imgurl}) `,backgroundSize:"100% 100%",height:"100%",width:"100%"}} >
                                    <p style={{color:"white",textAlign:"center",lineHeight:"200px",margin:"0"}}>{item.name}</p>
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