import React, { Component } from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import { NavBar, Icon } from 'antd-mobile';
import '../../../css/child.css'
export default class eventAdd extends Component {
    constructor(props){
        super(props);
        var cid = JSON.parse(localStorage.getItem('cid'));
        var nDate = new Date();
        var nowDate = nDate.toLocaleDateString().split('/').join('-');
        this.state={
            cid:cid,
            name:'',
            item:['第一次'],
            content:'',
            imgurl:[],
            setdate:nowDate,
            code:''
        }
    }
    changeName=(e)=>{
        this.setState({ 
            name:e.target.value
        })
    }
    changeContent=(e)=>{
        this.setState({
            content:e.target.value
        })
    }
    changeDate=(e)=>{
        this.setState({
            setdate:e.target.value
        })
    }
    UpFile=()=>{
        var fileObj = document.getElementById('img').files;
        var url = 'http://localhost:3001/imgs/';
        var form = new FormData();
        for(var i=0;i<fileObj.length;i++){
            form.append('file',fileObj[i])
        }
        fetch(url,{
            method:'POST',
            body:form
        }).then(res=>res.json())
        .then(res=>{
            var res1 = res.map((item)=>{
                return item.path
            })
            this.setState({
                imgurl:res1
            })
        })
    }
    addEvent=()=>{
        var url = 'http://localhost:3001/child/cevents/ccevents';
        var cceventwarn = document.getElementById('cceventwarn');
        cceventwarn.style.display='block';
        fetch(url,{
            method:'POST',
            mode:'cors',
            headers:{
                'Content-Type':"application/x-www-form-urlencoded"
            },
            body:`cid=${this.state.cid}&name=${this.state.name}&item=${this.state.item}&content=${this.state.content}&imgurl=${this.state.imgurl}&setdate=${this.state.setdate}`
        }).then(res=>res.json())
        .then(res=>{
            console.log(res)
            this.setState({
                code:res.msg
            })
        })
    }
    render() {
        return (
            <div className="ccevent">
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
                    onLeftClick={() => this.props.history.push('/child/cevents')}
                    ><span style={{
                        fontWeight:'bold',
                        fontSize:'6vw',
                        textIndent:'3vw',
                        letterSpacing:'3vw',
                        color:"white"
                    }}
                    >添加大事记</span>
                </NavBar>
                <div className='ccevent_inner'>
                    <label>
                        <input 
                        type="checkbox" 
                        name="item" 
                        value="第一次"/>
                        第一次：
                    </label>
                    <input
                    style={{
                        width:"53vw",
                        height:'6vh',
                        marginLeft:'3vw'
                    }}
                    type="text" 
                    placeholder="大事名称" 
                    name="name" 
                    onChange={this.changeName}/>
                    <p>
                        大事日期：
                        <input 
                        id="date" 
                        type="date" 
                        value={this.state.setdate} 
                        onChange={this.changeDate} 
                        style={{
                            height:'6vh'
                        }}/>
                    </p>
                    <p>详细记录</p>
                    <textarea 
                    rows="6"
                    cols="28" 
                    placeholder='请输入内容' 
                    name="content" 
                    onChange={this.changeContent}>
                    </textarea>
                    <span 
                    style={{
                        zIndex:'10',
                        display:'inline-block',
                        width:'45vw',
                        lineHeight:'6vh',
                        height:'6vh',
                        fontSize:'6.5vw',
                        textAlign:'center',
                        top:'68vh',
                        left:'28vw',
                        position:'absolute',
                        color:'#000',
                        background:'rgb(255,191,45,0.2)'
                    }}>轻触上传照片<input 
                    id='img'
                    onChange={this.UpFile}                           
                    type='file'  
                    accept="image/*" 
                    capture="camera" 
                    name='uimage'
                    multiple 
                    /></span>
                    <div className='ccevent_block'>
                        <p>照片预览：</p>
                        {
                            this.state.imgurl&&this.state.imgurl.map((item,index)=>{
                                console.log(item)
                                return <div
                                style={{
                                    background:`url(${item}) center center/cover no-repeat`
                                }}>
                                </div>
                            })
                        }
                    </div>
                    <div 
                    style={{
                        position:'fixed',
                        bottom:'0vh',
                        width:'100%',
                        height:'15vh',
                        background:'#fff',
                        zIndex:'100',
                    }}>
                        <button className='alladd_button'
                        onClick={this.addEvent}
                        style={{
                            bottom:'2vh',
                        }}>
                            点击添加
                        </button>
                    </div>      
                </div>

                <form id='cceventwarn'>
                    <div>{this.state.code}</div>
                    <button 
                    onClick={(e)=>{
                        e.target.parentNode.style.display='none'
                        this.props.history.push('/child/cevents');
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