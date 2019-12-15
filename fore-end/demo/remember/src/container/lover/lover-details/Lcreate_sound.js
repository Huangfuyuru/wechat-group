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
            lover_id:''
        }
        
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
        .then(json=>(
            console.log(json),
            this.setState((state)=>{
                state.voiceurl=json.voiceurl
        })
        )
    )};
    //增加语音
    upSound=()=>{
        fetch(`http://localhost:3000/lover/lsound/lcsound`,{
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
            <div>
                 <NavBar 
                 style={{
                     background:'#FFBF2D',
                     height:'8vh',
                     color:'#fff',
                     fontWeight:'bolder',
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
                
                {/* <span>添加录音文件</span> */}
                <div>
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
                <input type='text' name='name' />
                <button onClick={this.upSound}>提交</button>
            </div>
        )
    }
}
