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
            cid:cid,
            voiceurl:'',
            lists:[
                {
                    name:'语音',
                    voiceurl:'地址',
                    setdate:'2019-12-11',
                    childVoiceid:''
                    
                },
            ]
        }
    }
    componentDidMount(){
        fetch(`http://localhost:3001/child/csound?childsid=${this.state.cid}`)
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({
              lists:res
            },()=>console.log(this.state.lists));
        })
      }
      componentDidUpdate(prevProps,prevState){
          fetch(`http://localhost:3001/child/csound?childsid=${this.state.cid}`)
          .then((res)=>res.json())
          .then((res)=>{
              this.setState({
                lists:res
              });
          })
      }
    delCsound=(e)=>{
        fetch(`http://localhost:3001/child/csound/crsound?childsid${Number(this.state.cid)}=&childVoiceid=${this.state.voiceurl}`,{
          method:'GET',
        })
        .then(res=>res.json())
        .then(json=>{
          this.setState({
            code:json.msg
          })
          console.log(json)
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
                            var date = moment(item.setdate).format("YYYY-MM-DD");
                            return <div className='csound_block'
                            key={idx}
                            value={item.voiceurl}>
                                <i
                                onClick={(e)=>{
                                var itemurl = e.target.parentNode.getAttribute('value');
                                console.log(itemurl)
                                this.setState({
                                    voiceurl:itemurl
                                })
                                var delcsound=document.getElementById('delcsound');
                                delcsound.style.display='block';
                                }}  
                                className='iconfont icon-shanchu1'></i>
                                <li>{item.name}</li>
                                <li>{item.voiceurl}</li>
                                <p>记录日期:{date}</p>
                            </div>
                        })
                    }
                </div>

                <div id='delcsound'>
                    <div>确定删除？</div>
                    <button 
                    onClick={()=>{
                        var delwarn=document.getElementById('delwarn');
                        delwarn.style.display='none';
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
