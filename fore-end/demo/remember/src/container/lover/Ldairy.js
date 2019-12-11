import React, { Component } from 'react'
import { NavBar} from 'antd-mobile';
import "../../css/lover.css"
import {Link} from "react-router-dom"
export default class Ldairy extends Component {
    constructor(props){
        super(props);
        this.state={
            lover_id:this.props.location.state.lover_id,
            noteArr:[],
            arr:[],
            lid:"",
            id:""
        }
    }
    componentDidMount(){
        fetch(`http://localhost:3001/lover/ldairy?loverid=${this.state.lover_id}`)
        .then(res=>res.json())
        .then(json=>{ 
            this.setState({
                noteArr:json.msg
            });
        })
    }
    deleteNote=(lid,nid)=>{
        fetch(`http://localhost:3001/lover/ldairy/delDairy?loverid=${lid}&loverDiaryid=${nid}`)
        .then(res=>res.json())
        .then(json=>{ 
            console.log("shzu",json)
            this.setState({
                // noteArr:json.msg
            });
        })
    }
    // componentDidUpdate(Props,State){
    //     if(Props.location.search !== this.props.location.search){
    //         let path = this.props.match.params.id
    //         console.log('path',path)
    //         fetch( ``)
    //         .then((res)=>res.json())
    //         .then((res)=>{
    //             this.setState({data:res.data});
    //         })
    //     }
    // }

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
                    onLeftClick={() => this.props.history.push('/index/lover')}
                 ><span style={{
                     color:'#fff',
                     fontWeight:'bold',
                     fontSize:'6vw',
                     textIndent:'3vw',
                     letterSpacing:'3vw'}}>日记</span>
                </NavBar>
                 {
                     this.state.noteArr.map((item)=>(
                        <div className="lovernote-first">
                        <img  src={require("../../image/qian.jpg")} alt=""  style={{float:"left",margin:"3% 0 0 0%",height:"10%",width:"13%"}}></img>
                     <p style={{fontSize:"5vw",float:"left",margin:" 8% 0% 0 0"}}>{item.name}       {item.setdate.split(".")[0]}</p>
                     <p style={{fontSize:"5vw",float:"left",margin:"0"}}>{item.content}</p>
                        <div style={{height:"40%",width:"94%",float:"left",margin:"0 0 0 3%"}}>
                        <img src={item.imgurl[0]}  alt="" style={{height:"100%",width:"48%",border:"solid 0.5px red" ,float:"left",marginLeft:"1%"}}></img>
                        <img src={item.imgurl[1]}  alt="" style={{height:"100%",width:"48%",border:"solid 0.5px red" ,float:"left",marginLeft:"1%"}}></img>
                        </div>
                        <div className="iconfont icon-lajixiang1" onClick={()=>this.deleteNote(item.lid,item.id)}> 
                        </div>
                        </div>
                     ))
               
                }
               <Link to=
               {{
                pathname:"/lover/lcdairy",
                state:{
                    lover_id:this.state.lover_id
                }
            }}
               > <img src={require("../../image/jia.jpg")}  className="lovesou-foot"   alt=""></img></Link>
            </div>
        )
    }
}
