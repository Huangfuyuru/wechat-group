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
          loverPhotoListid:""
        }
  }
  componentDidMount(){
    console.log(this.state.lover_id);
    fetch(`http://localhost:3001/lover/lpictures?loverid=${this.state.lover_id}`)
    .then(res=>res.json())
    .then(json=>{ 
      console.log(json)
        this.setState({
          arr:json.msg
        });
    })
  }
delPhoto=()=>{
  console.log(this.state.loverPhotoListid)
  fetch(`http://localhost:3001/lover/lpictures/lrpictures?loverid=${this.state.lover_id}&loverPhotoListid=${this.state.loverPhotoListid}`)
    .then(res=>res.json())
    .then(json=>{ 
        this.setState({
          arr:json.msg
        },()=>{
          console.log("删除返回",json)
        });
    })
    var dellsound=document.getElementById('dellsound');
    dellsound.style.display='none';
    var csoundagain=document.getElementById('csoundagain');
    csoundagain.style.display='block';
}
    render() {
        return (
            <div style={{width:"100%" ,backgroundColor:"white",marginTop:"10vh",paddingBottom:"10vh"}}>
                <NavBar style={{
                     background:'#FFBF2D',
                     height:'8vh',
                     color:'#fff',
                     fontWeight:'bolder',
                     zitem:'11',
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
                <div className='cpicture_inner'>
                  {
                    this.state.arr&&this.state.arr.map((item,idx)=>(
                      <div key={idx} className='cpicture_block'>
                          <div 
                          onClick={()=>{
                            var lpicture={
                              pname:item.name,
                              pid:item.id
                            }
                            localStorage.setItem('lpicture',JSON.stringify(lpicture));
                            this.props.history.push('/lover/lspictures')
                            }}
                          style={{
                              width:'95%',
                              height:'75%',
                              margin:'1.5vh auto',
                              background:`url(${item.imgurl}) center center/cover no-repeat`,
                          }}>
                          </div>
                          <p style={{
                              borderTop:'1px solid #ccc',
                              margin:'0',
                              lineHeight:'7vh',
                              textAlign:'left',
                              paddingLeft:'5vw',
                              color:'#FFBF2D',
                              fontSize:'6vw'
                          }}>
                              
                              {item.name}
                              <span
                              onClick={()=>{
                                this.setState({
                                    loverPhotoListid:item.id
                                })
                                var dellsound=document.getElementById('dellsound');
                                dellsound.style.display='block';
                              }} 
                              style={{
                                  color:'#bdbbb8',
                                  lineHeight:'6.5vh',
                                  float:'right',
                                  marginRight:'4vw'
                              }}
                              >
                                  <i className='iconfont icon-shanchu1'/>
                              </span>
                          </p>
                      </div>
                    )
                    )
                  }
                </div>
               
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
                    onClick={this.delPhoto}
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
                <div>删除成功</div>
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
                    pathname:'/lover/lcpictures',
                    }}
                    ><i className='iconfont icon-jia'></i></Link>
              </div>

            </div>
        )
    }
}
