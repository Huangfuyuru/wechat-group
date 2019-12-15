import React, { Component } from 'react'
import { NavBar, Icon } from 'antd-mobile';
import '../../../css/child.css'
export default class Ccsound extends Component {
    constructor(){
        super();
        var cid = localStorage.getItem('cid');
        console.log(cid)
        this.state={
            voiceurl:'',
            name:'',
            cid:cid,
            code:''
        }
    }
    upfile=()=>{
        var file=document.getElementById('voice').files[0];
        var url = 'http://localhost:3001/voice';
        var form = new FormData();
        form.append("file",file);
        fetch(url,{
            method:'POST',
            body:form
        })
        .then(res=>res.json())
        .then(res=>(
            console.log(res),
            this.setState({
                voiceurl:res.path
            },()=>{
                if(res.err==0){
                    this.setState({
                        code:'上传成功！'
                    })
                }else{
                    this.setState({
                        code:'上传失败，请重新上传！'
                    })
                }
            })
        ))
        
    }
    voicePost=()=>{
        var ccsoundwarn=document.getElementById('ccsoundwarn');
        ccsoundwarn.style.display='block';
        fetch(`http://localhost:3001/child/csound/ccsound`,{
            method:'POST',
            mode:'cors',
            headers:{
                'Content-Type':"application/x-www-form-urlencoded"
            },
            body:`voiceurl=${this.state.voiceurl}&name=${this.state.name}&childsid=${Number(this.state.cid)}`
        })
        .then(res=>res.json())
        .then(json=>(
            console.log('54',json)
        ))
    }
    nameChange=(e)=>{
        this.setState({
            name:e.target.value
        })
    }
    render() {
        return (
            <div className='ccsound'>
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
                    onLeftClick={() => this.props.history.push('/child/csound')}
                    ><span style={{
                        fontWeight:'bold',
                        fontSize:'6vw',
                        textIndent:'3vw',
                        letterSpacing:'3vw',
                        color:"white"
                    }}
                    >添加语音</span>
                </NavBar>
                <div className='ccsound_inner'>
                    <div
                    style={{
                        width:'90vw',
                        fontSize:'6vw',
                        position:'fixed',
                        color:'#000',
                    }}>
                        <span>添加录音文件</span>
                        <div>
                            <input 
                            id='voice'
                            onChange={this.upfile}                           
                            type='file'  
                            accept="audio/*" 
                            capture="microphone"
                            name='voiceurl' 
                            />
                            <li className='ccsound_name'>
                                <p>语音名称：</p>
                                <input 
                                onChange={this.nameChange}
                                name='name' 
                                type='text'
                                /> 
                            </li>
                        </div>
                    </div>
                    <button className='alladd_button'
                    onClick={this.voicePost}>点击上传</button>
                </div>
                
                <form id='ccsoundwarn'>
                    <div>{this.state.code}</div>
                    <button 
                    onClick={()=>{
                        var ccsoundwarn=document.getElementById('ccsoundwarn');
                        ccsoundwarn.style.display='none';
                        this.props.history.push('/child/csound');
                    }}
                    style={{
                        width:'35%',
                        height:'15%',
                        color:'#FFBF2D',
                        border:'none',
                        marginTop:'2vh',
                        background:'#fff',
                        borderRadius:'5px',
                        fontSize:'6vw',
                        marginRight:'2vw'
                    }}>返回列表</button>
                    <button 
                    onClick={()=>{
                        var ccsoundwarn=document.getElementById('ccsoundwarn');
                        ccsoundwarn.style.display='none';
                        this.props.form.resetFields();
                    }}
                    style={{
                        width:'35%',
                        height:'15%',
                        color:'#FFBF2D',
                        border:'none',
                        marginTop:'2vh',
                        background:'#fff',
                        borderRadius:'5px',
                        fontSize:'6vw'
                    }}>继续上传</button>
                </form>
            </div>
        )
    }
}
