import React, { Component } from 'react'
import {NavBar,WingBlank} from "antd-mobile"
import {Link} from "react-router-dom"
import "../../../css/lover.css"
export default class LSlists extends Component {
    constructor(){
        super();
        this.state={
            lid:JSON.parse(localStorage.getItem('lid')),
            imgArr:[
                {
                    img:require('../../../image/tu1.jpg'),
                    note:"一起看电影",
                
                },
                {
                    img:require('../../../image/tu1.jpg'),
                    note:"一起看电影",
                 
                },
                {
                    img:require('../../../image/tu1.jpg'),
                    note:"一起看电影",
                   
                },
                {
                    img:require('../../../image/tu1.jpg'),
                    note:"一起看电影",
                    
                }
            ],
            listArr:[]
       
        }
    }
    componentDidMount(){
        fetch(`http://localhost:3001/lover/loverlist/list?loverid=${this.state.lid}`)
        .then((res)=>res.json())
        .then((json)=>{
            console.log(json)
        })
    }
    render() {
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
    <button style={{height:"5vh",width:"100%",backgroundColor:"white",fontSize:"5vw",marginTop:"2%"}}>已完成3/{this.state.imgArr.length}</button>
    <div style={{width:"100%",backgroundColor:"#FFEBEE",float:"left"}}>
                {
                    
                    this.state.imgArr.map((item,idex)=>(
                        <div className="limages">
                        <Link to="/lover/lclist"><div  style={{background:`url(${item.img})`,backgroundSize:"100% 100%",height:"100%",width:"100%"}} >
                            <p style={{color:"#888888",textAlign:"center",lineHeight:"190px",margin:"0"}}>{item.note}</p>
                        </div>
                        </Link>
                        </div>
                    ))
                }
                </div>
   
            </div>
        )
    }
}
