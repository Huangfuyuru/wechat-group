import React, { Component } from 'react'
import { NavBar, Icon } from 'antd-mobile';
import {Link} from  "react-router-dom"
export default class Lsound extends Component {
    constructor(props){
        super(props);
        this.state={
            lover_id:JSON.parse(localStorage.getItem('lid')),
            name:'',
            voiceurl:'',
            setdate:'',
            loverVoiceid:'',
            arr:[
                {
                    name:'语音',
                    voiceurl:'地址',
                    setdate:'2019-12-14',
                    loverVoived:''
                }
            ]
        }
    }
    
    componentDidMount(){
        console.log('sound');
        console.log(this.state.lover_id);
        fetch(`http://localhost:3001/lover/lsound?loverid=${this.state.lover_id}`)
        .then(res=>res.json())
        .then(json=>{
            this.setState((state)=>{
                if(json.code === 0){
                    for(var i=0;i<json.msg.length;i++){
                    state.arr[i]=json.msg[i]
                    }
                }else{
                    console.log('json',json)
                }
            })
        })
    }

    componentDidUpdate(){
        fetch(`http://localhost:3001/lover/lsound?loverid=${this.state.lover_id}`)
        .then(res=>res.json())
        .then(json=>{
            this.setState((state)=>{
                if(json.code === 0){
                    state.arr=json.msg
                }else{
                    console.log('json',json)
                }
            })
            console.log('arr',this.state.arr);
        })
    }

    delSound=(lid,id)=>{
        console.log('deletesound');
        fetch(`http://localhost:3001/lover/lsound/lrsound?loverid=${lid}&loverVoiceid=${id}`,{
            method:'GET'
        })
        .then(res=>res.josn)
        .then(res=>{
            console.log(res);
            // this.setState({

            // })
        })
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
                <div className='soundList'>
                    {
                        this.state.arr.map((item,idx)=>{
                            return (
                            <div 
                                key={idx}
                                style={{width:"100%"}}
                            >
                                <span style={{lineHeight:"5vh",fontSize:'1.5em'}}>{item.name}</span>
                                <img src={require("../../image/la.jpg")} onClick={()=>this.delSound(item.lid,item.id)} alt="" style={{float:"right"}}/> 

                                <audio id='audio'
                                    src={this.state.voiceurl} 
                                    controls='controls'
                                    className="audio"
                                >
                                您的设备无法播放改语音
                                </audio>
                                <span style={{float:"right"}}>记录时间：{item.setdate}</span>
                            </div>
                            )
                            
                        })
                    }
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
