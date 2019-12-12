import React, { Component } from 'react'
import { NavBar} from 'antd-mobile'; 
import '../../css/lover.css'
import {Link} from "react-router-dom"
import Item from 'antd-mobile/lib/popover/Item';
export default class Lpictures extends Component {
  constructor(){
    super();
    var lid = JSON.parse(localStorage.getItem('lid'));
        this.state={
          lover_id:lid,
          arr:[],
          image:[
            "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1153077516,1329367100&fm=26&gp=0.jpg",
            "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1153077516,1329367100&fm=26&gp=0.jpg"
          ]
        }
  }
  componentDidMount(){
    console.log(this.state.lover_id);
    fetch(`http://localhost:3001/lover/lpictures?loverid=${this.state.lover_id}`)
    .then(res=>res.json())
    .then(json=>{ 
        this.setState({
          arr:json.msg
        },()=>{
          console.log("加载后",json)
        });
    })
  }
  //   for(var i=0;i<this.state.arr.length;i++){
  //   fetch(`http://localhost:3001/lover/lpictures/show?loverPhotoListid=${this.state.arr.id[i]}`)
  //   .then(res=>res.json())
  //   .then(json=>{ 
  //       this.setState({
  //         // arr:json.msg
  //       },()=>{
  //           console.log(json)
  //       });
  //   })
  // }
delPhoto=(id,lid)=>{
  console.log(id,lid)
  fetch(`http://localhost:3001/lover/lpictures/lrpictures?loversid=${lid}&loverPhotoListid=${id}`)
    .then(res=>res.json())
    .then(json=>{ 
        this.setState({
          // arr:json.msg
        },()=>{
          console.log("删除返回",json)
        });
    })

}
    render() {
        return (
            <div style={{height:"100%",width:"100%" ,backgroundColor:"white",marginTop:"10vh"}}>
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
                  color:'#fff',
                  textIndent:'3vw',
                  letterSpacing:'3vw'}}>云相册</span>
                </NavBar>
                {
                  this.state.arr.map((index)=>(
                <div className="loveImage-header">                    
                 <img  style={{height:"80%",width:"94%",margin:"2% 0 0% 3%"}} alt=""></img>
                    <div>
                    <Link to={{
                    pathname:"/lover/lspictures",
                    state:{
                      id:index.id
                    }
                    }} style={{color:"black"}}>
                  <p style={{fontSize:"5vw",float:"left",margin:"2% 0% 0 5%"}}>{index.name}</p>
                  </Link>
                  <span  style={{color:"#C7C7CC",fontSize:"8vw" ,float:"right",marginRight:"2%"}} onClick={()=>this.delPhoto(index.id,this.state.lover_id)}><img src={require("../../image/la.jpg")}/></span>
                    </div> 
                </div>
                  )
                  )
                }
               
               <div className='allpage_add'>
                    <p></p>
                    <Link
                    to={{
                    pathname:'/lover/lcpictures',
                    state:{
                        cid:this.state.cid
                    }
                    }}
                    ><i className='iconfont icon-jia'></i></Link>
              </div>

            </div>
        )
    }
}
