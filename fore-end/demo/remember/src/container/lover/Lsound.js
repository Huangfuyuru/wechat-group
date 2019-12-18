import React, { Component } from 'react'
import { NavBar} from 'antd-mobile';
import {Link} from  "react-router-dom"
export default class Lsound extends Component {
    constructor(props){
        super(props);
        var lid=JSON.parse(localStorage.getItem('lid'));
        this.state={
            lover_id:lid,
            loverVoiceid:"",
            code:"",
            arr:[]
        }
    }  
    componentDidMount(){
        // console.log(this.state.arr)
        // console.log('sound');
        fetch(`http://localhost:3001/lover/lsound?loverid=${this.state.lover_id}`)
        .then(res=>res.json())
        .then(json=>(
            console.log(json),
            this.setState({
                arr:json.msg
            })
        ))
    }
   delSound=()=>{
        console.log(this.state.loverVoiceid)
        console.log('deletesound');
        fetch(`http://localhost:3001/lover/lsound/lrsound?loverid=${this.state.lover_id}&loverVoiceid=${this.state.loverVoiceid}`,{
            method:'GET'
        })
        .then(res=>res.json())
        .then(json=>{
            console.log(json);
            if(json.code==0){
            this.setState({
                arr:json.msg,
                code:"删除成功！"
            })
        }
        })
        var dellsound=document.getElementById('dellsound');
        dellsound.style.display='none';
        var csoundagain=document.getElementById('csoundagain');
        csoundagain.style.display='block';
    }
    render() {
        return (
            <div style={{width:"100%",backgroundColor:"white",marginTop:"10vh",paddingBottom:"10vh"}}>
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
                       onLeftClick={() => this.props.history.push('/index/lover')}
                    ><span style={{
                        fontWeight:'bold',
                        fontSize:'6vw',
                        textIndent:'3vw',
                        letterSpacing:'3vw',
                        color:'white'
                    }}
                    >语音记事</span>
                </NavBar>
                <div className="sounds">记录声音 记录你</div>
               
                    {
                        
                       this.state.arr&&this.state.arr.map((item)=>(
                        <div className='soundList'>

                            <div style={{width:"100%"}} value={item.id}>
                                <span style={{lineHeight:"5vh",fontSize:'1.5em'}}>{item.name}</span>
                                <img src={require("../../image/la.jpg")} 
                                onClick={(e)=>{
                                    var itemid = e.target.parentNode.getAttribute('value');
                                    this.setState({
                                        loverVoiceid:itemid
                                    })
                                    var dellsound=document.getElementById('dellsound');
                                    dellsound.style.display='block';
                                    }} 
                                 alt="" style={{float:"right"}}/> 
                                <audio id='audio'
                                    src={this.state.voiceurl} 
                                    controls='controls'
                                    className="audio"
                                >
                                您的设备无法播放改语音
                                </audio>
                                <span style={{float:"right"}}>记录时间：{item.setdate.split("T")[0]}</span>
                            </div>
                            </div>

                            
                        ))
                    }
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
                    onClick={this.delSound}
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
                <div>{this.state.code}</div>
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
                    pathname:'/lover/lcsound',
                    }}
                    ><i className='iconfont icon-jia'></i></Link>
              </div>
            </div>
        )
    }
}
