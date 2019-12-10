import React, { Component } from 'react'
import { NavBar} from 'antd-mobile';
import "../../css/lover.css"
import {Link} from "react-router-dom"
export default class Ldairy extends Component {
    constructor(props){
        super(props);
        console.log("日记",this.props.location.state)
       
        this.state={
             lover_id:this.props.location.state.lover_id,
            noteArr:[]
        }
    }
    componentDidMount(){
        fetch(`http://localhost:3001/lover/ldairy`,{
            method:'POST',
            mode:'cors',
            headers:{
                'Content-Type':"application/x-www-form-urlencoded"
            },
            body:`loverid=${this.state.lover_id}`
        })
        .then(res=>res.json())
        .then(json=>{ 
            console.log("shuzu",json)
            this.setState({
                noteArr:json
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
                        <img  src={require("../../image/qian.jpg")} alt=""  style={{float:"left",margin:"4% 10%",height:"13%",width:"13%"}}></img>
                     <p style={{fontSize:"5vw"}}>{item.time}</p>
                     <p style={{fontSize:"5vw",float:"left",margin:"2% 2%"}}>{item.note}</p>
                        <img src={item.src}  alt="" style={{height:"40%",width:"40%",border:"solid 0.5px red" ,float:"left",margin:"2% 2%"}}></img>
                        <img src={item.src}  alt="" style={{height:"40%",width:"40%",border:"solid 0.5px red" ,float:"left",margin:"2% 2%"}}></img>
                        </div>
                     ))
               
                }
               <Link to="/lover/lcdairy"> <img src={require("../../image/jia.jpg")}  className="lovesou-foot"   alt=""></img></Link>
            </div>
        )
    }
}
