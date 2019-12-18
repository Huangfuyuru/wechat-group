import React, { Component } from 'react'
import { NavBar, Icon } from 'antd-mobile';
import {Link} from 'react-router-dom'
import moment from 'moment';
import '../../css/child.css'
export default class Csound extends Component {
    constructor(props){
        super(props);
        var cid = JSON.parse(localStorage.getItem('cid'));
        this.state={
            childVoiceid:'',
            cid:cid,
            voiceurl:'',
            lists:[]
        }
    }
    componentDidMount(){
        fetch(`http://localhost:3001/child/csound?childsid=${this.state.cid}`)
        .then((res)=>res.json())
        .then((res)=>{
            console.log(res)
            this.setState({
              lists:res
            });
        })
        console.log(this.state.lists)
    }
    delCsound=(e)=>{
        console.log(this.state.childVoiceid)
        console.log(this.state.cid)
        fetch(`http://localhost:3001/child/csound/crsound?childsid=${this.state.cid}&childVoiceid=${this.state.childVoiceid}`,{
          method:'GET',
        })
        .then(res=>res.json())
        .then(json=>{
          this.setState({
              lists:json.data,
              code:json.msg,
          })
          console.log('你好',json)
        })
        var delcsound=document.getElementById('delcsound');
        delcsound.style.display='none';
        var csoundagain=document.getElementById('csoundagain');
        csoundagain.style.display='block';
    }
    render() {
        return (
            <div className='csound'>
                <NavBar
                    style={{
                    width:'100%',
                    zIndex:'11',
                    position:'fixed',
                    top:0,
                    height:'8vh',
                    background:'#FFBF2D',
                    color:'#fff',
                    fontWeight:'bolder',
                    }}
                    mode="light"
                    icon={'𡿨'}
                    onLeftClick={() => this.props.history.push('/index/child')}
                    ><span style={{
                        fontWeight:'bold',
                        fontSize:'6vw',
                        textIndent:'3vw',
                        letterSpacing:'3vw',
                        color:"white"
                    }}
                    >语音记事</span>
                </NavBar>

                <div className='csound_inner'>
                    {
                        this.state.lists&&this.state.lists.map((item,idx)=>{
                            // console.log(item)
                            var date = moment(item.setdate).format("YYYY-MM-DD");
                            return <div className='csound_block'
                            key={idx}
                            value={item.id}>
                                <i
                                onClick={(e)=>{
                                var itemid = e.target.parentNode.getAttribute('value');
                                this.setState({
                                    childVoiceid:itemid
                                })
                                var delcsound=document.getElementById('delcsound');
                                delcsound.style.display='block';
                                }}  
                                className='iconfont icon-shanchu1'></i>
                                <li>{item.name}</li>
                                <audio
                                id='audios'
                                style={{
                                    width:'90%',
                                    float:'left',
                                    marginLeft:'4vw',
                                    marginTop:'1vh',
                                    background:''
                                }} 
                                src={item.voiceurl} controls='controls'>
                                    您的设备无法播放该语音
                                </audio>
                                <p>记录日期:{date}</p>
                            </div>
                        })
                    }
                </div>

                <div id='delcsound'>
                    <div>确定删除？</div>
                    <button 
                    onClick={()=>{
                        var delcsound=document.getElementById('delcsound');
                        delcsound.style.display='none';
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
                    onClick={this.delCsound}
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
                    pathname:'/child/csound/ccsound',
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
