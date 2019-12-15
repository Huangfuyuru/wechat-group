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
                
                {/* <span>记录声音 记录你</span> */}
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
                <input type='text' name='name' onChange={this.getName}/>
                <button onClick={this.upSound}>提交</button>
            </div>
        )
    }
}
