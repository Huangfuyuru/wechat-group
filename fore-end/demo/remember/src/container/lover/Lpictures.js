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
        });
    })
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
}
    render() {
        return (
            <div style={{height:"100%",width:"100%" ,backgroundColor:"white"}}>
                <NavBar style={{
                     background:'#FFBF2D',
                     height:'8vh',
                     color:'#fff',
                     fontWeight:'bolder',
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
                  <img  style={{height:"80%",width:"94%",marginLeft:"3%",marginTop:"2%"}} alt=""></img>
                  <Link to={{
                    pathname:"/lover/lspictures",
                    state:{
                      id:index.id
                    }
                    }} style={{color:"black"}}>
                    <div>
                  <p style={{fontSize:"5vw",float:"left",margin:"2% 0% 0 5%"}}>{index.name}</p><span  style={{color:"#C7C7CC",fontSize:"8vw" ,float:"right",marginRight:"2%"}}>></span>
                    </div>
                    </Link>
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
