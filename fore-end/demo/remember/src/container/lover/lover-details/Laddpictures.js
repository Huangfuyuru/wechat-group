import React, { Component } from 'react'
import { NavBar, Icon } from 'antd-mobile';

export default class Laddpictures extends Component {
    constructor(){
        super();
        var lpicture = JSON.parse(localStorage.getItem('lpicture'));
        this.state={
            pid:lpicture.pid,
            lists:[],
            code:''
        }
    }
    upfiles=()=>{
        var fileObj = document.getElementById('img').files;
        var url = 'http://localhost:3001/imgs/';
        var form = new FormData();
        for(var i = 0;i<fileObj.length;i++){
            form.append("file",fileObj[i]);
        }
        fetch(url,{
            method:'POST',
            body:form,
        }).then(res=>res.json())
        .then(res=>{
            console.log(res)
            this.setState({
                lists:res
            })
        })
    }
    addPictures=()=>{
        console.log(this.state.lists,this.state.pid)
        var lists=JSON.stringify(this.state.lists)
        var addcpictureswarn = document.getElementById('addcpictureswarn');
        addcpictureswarn.style.display='block';
        if(this.state.lists.length==0){
            this.setState({
                code:'请上传照片'
            })
        }else{
            fetch(`http://localhost:3001/lover/lpictures/laddpictures`,{
                method:'POST',
                mode:'cors',
                headers:{
                    'Content-Type':"application/x-www-form-urlencoded"
                },
                body:`loverPhotoListid=${this.state.pid}&imgurl=${lists} `
            }).then(res=>res.json())
            .then(json=>{
                this.setState({
                    code:json.msg
                })
            })
        }
    }
    render() {
        return (
            <div className='addpictures'>
                <NavBar
                    style={{
                    top:0,
                    width:'100%',
                    zIndex:'11',
                    position:'fixed',
                    height:'8vh',
                    background:'#FFBF2D',
                    color:'#fff',
                    fontWeight:'bolder',
                    }}
                    mode="light"
                    icon={'𡿨'}
                    onLeftClick={() => this.props.history.push('/lover/lspictures')}
                    ><span style={{
                        fontWeight:'bold',
                        fontSize:'6vw',
                        textIndent:'3vw',
                        letterSpacing:'3vw',
                        color:"white"
                    }}
                    >添加照片</span>
                </NavBar>
                <div className='addpictures_inner'>
                    <div style={{
                        position:'fixed',
                        background:'#fff',
                        zIndex:'100',
                        width:'100%',
                        height:'18vh',
                        top:'8vh',
                        left:'0',
                    }}>
                        <span 
                        style={{
                            zIndex:'10',
                            display:'inline-block',
                            width:'45vw',
                            lineHeight:'6vh',
                            height:'6vh',
                            fontSize:'6.5vw',
                            textAlign:'center',
                            top:'15vh',
                            left:'28vw',
                            position:'fixed',
                            color:'#000',
                            background:'rgb(255,191,45,0.2)'
                        }}>轻触上传照片<input 
                        id='img'
                        onChange={this.upfiles}                           
                        type='file'  
                        accept="image/*" 
                        capture="camera" 
                        name='uimage'
                        multiple 
                        /></span>
                    </div>
                    <div className='addpictures_block'>
                        {
                            this.state.lists&&this.state.lists.map((item,idx)=>(
                                <div className="scpicture_block"
                                style={{
                                    background:`url(${item.path}) center center/cover no-repeat`
                                }}>
                                </div>
                            ))
                        }
                    </div>

                </div>
                <div style={{
                    position:'fixed',
                    bottom:'0vh',
                    marginLeft:'0',
                    width:'100%',
                    height:'18vh',
                    background:'#fff',
                    zIndex:'100'
                }}>
                    <button className='alladd_button'
                    onClick={this.addPictures}
                    style={{
                        bottom:'5vh',
                    }}>
                        点击添加
                    </button>
                </div>
                <form id='addcpictureswarn'>
                    <div>{this.state.code}</div>
                    <button 
                    onClick={(e)=>{
                        e.target.parentNode.style.display='none'
                        this.props.history.push('/lover/lspictures');
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
                    }}>返回相册</button>
                    <button 
                    onClick={(e)=>{
                        e.target.parentNode.style.display='none'
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
                    }}>继续添加</button>
                </form>
            </div>
        )
    }
}

