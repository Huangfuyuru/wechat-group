import React, { Component } from 'react'
import { NavBar, Icon } from 'antd-mobile';
import {Link} from  "react-router-dom"
export default class Lcreate_sound extends Component {
    constructor(props){
        super(props);
        var lid = localStorage.getItem('lid');
        console.log(lid)
        this.state={
            voiceid:'',
            name:'',
            voiceurl:'',
            date:'',
            lover_id:lid
        }
        
    }
    getName=(e)=>{
        this.setState({
            name:e.target.value
        })
    }
    upfile=()=>{
        var file=document.getElementById('voice').files[0];
        var url = 'http://localhost:3001/voice';
        var form = new FormData();
        form.append("file",file);
        fetch(url,{
            method:'POST',
            enctype:'multipart/form-data',
            body:form
        }).then(res=>res.json())
        .then(res=>(
            this.setState({
                voiceurl:res.path
            },()=>{
                console.log(res.path)
            })
        )
    )};
    //增加语音
    upSound=()=>{
        console.log('增加语音')
        fetch(`http://localhost:3001/lover/lsound/lcsound`,{
            method:'POST',
            mode:'cors',
            headers:{
                'Content-Type':"application/x-www-form-urlencoded"
            },
            body:`voiceurl=${this.state.voiceurl}&name=${this.state.name}&loverid=${this.state.lover_id}`
        })
        .then(res=>res.json())
        .then(json=>{
            console.log(json)
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
                    onLeftClick={() => this.props.history.push('/lover/lsound')}
                 ><span style={{
                     color:'#fff',
                     fontWeight:'bold',
                     fontSize:'6vw',
                     textIndent:'3vw',
                     letterSpacing:'3vw'}}>添加语音</span>
                </NavBar>
                <div style={{width: "90vw",fontSize: "6vw",position: "fixed",color :"rgb(0, 0, 0)",padding:"5vh 5vw",textAlign:"center"}}>
                <span style={{display: "inline-block",margin: "3vh 5vw"}}>添加录音文件</span>
                <div style={{textAlign:"center",padding:"5vh 5vw"}}>
                    <input 
                    id ='voice'
                    onChange={this.upfile}
                    type='file'
                    accept="audio/*"
                    capture="microphone"
                    name='voiveurl'
                    />
                </div>
                <span>语音名称:</span>
                <input type='text' name='name' onChange={this.getName} style={{border:" 1px solid #bdbbb8",width: "35vw",height: "5vh"}}/>
                </div>
                <button onClick={this.upSound}  className="addButton">提交</button>
            </div>
        )
    }
}
