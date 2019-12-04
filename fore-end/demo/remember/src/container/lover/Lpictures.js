import React, { Component } from 'react'
import { NavBar} from 'antd-mobile'; 
import '../../css/lover.css'
import {Link} from "react-router-dom"
export default class Lpictures extends Component {
  constructor(){
    super();
        this.state={
          image:[
            "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1153077516,1329367100&fm=26&gp=0.jpg",
            "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1153077516,1329367100&fm=26&gp=0.jpg"
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
            <div style={{height:"100%",width:"100%" ,backgroundColor:"white"}}>
                <NavBar style={{backgroundColor:"#FFBF2D",color:"white"}}
                         leftContent={[
                          <Link to="/Loverhome" style={{color:"white"}}><div className="iconfont icon-arror_left_blod" style={{ marginRight: '26px' }} /></Link>,
                         ]}
                ><span style={{fontWeight:'bold',fontSize:'6vw',textIndent:'3vw',letterSpacing:'3vw'}}>云相册</span></NavBar>
                {
                  this.state.image.map((index)=>(
                <div className="loveImage-header">
                  <img src={index} style={{height:"80%",width:"94%",marginLeft:"3%",marginTop:"2%"}} alt=""></img>
                 <Link to="/lover/lspictures" style={{color:"black"}}><p style={{fontSize:"5vw",float:"left",margin:"2% 64% 0 3%"}}>所有照片</p><span  style={{color:"#C7C7CC",fontSize:"8vw"}}>></span></Link>
                </div>
                  )
                  )
                }
               
          <Link to="/lover/lcpictures"><img src={require("../../image/jia.jpg")}  className="loveImage-foot"   alt=""></img></Link>
            </div>
        )
    }
}
