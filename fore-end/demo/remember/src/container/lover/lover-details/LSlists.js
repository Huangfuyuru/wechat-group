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
            ]
       
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
                    onLeftClick={() => this.props.history.push('/lover/llists')}
                    ><span style={{
                        fontWeight:'bold',
                        fontSize:'6vw',
                        textIndent:'3vw',
                        letterSpacing:'3vw',
                        color:"white"
                    }}
                    >清单列表</span>
                </NavBar>
    <WingBlank><button style={{height:"5vh",width:"100%",backgroundColor:"white",fontSize:"5vw",marginTop:"2%"}}>已完成3/{this.state.imgArr.length}</button></WingBlank>
    <WingBlank><div style={{width:"100%"}}>
                {
                    this.state.imgArr.map((item,idex)=>(
                        <Link to="/lover/lclist"><div className="limages" style={{background:`url(${item.img})`,backgroundSize:"100% 100%"}} >
                            {/* <img src={item.img} alt=""></img> */}
                            <p style={{color:"#888888",textAlign:"center",lineHeight:"170px"}}>{item.note}</p>
                        </div>
                        </Link>
                    ))
                }
                </div>
    </WingBlank>
            </div>
        )
    }
}
