import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { NavBar, Icon } from 'antd-mobile';

export default class daiCreate extends Component {
    constructor(props){
        super(props);
        var cid = JSON.stringify(localStorage.getItem('cid'));
        this.state={
            cid:cid,
            color:'',
            lists:[],
            code:''
        }
    }
    
    upfiles=()=>{
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
                lists:res1
            })
        })
    }
    contentChange=(e)=>{
        this.setState({
            content:e.target.value
        })
    }
    colorChange=(e)=>{
        this.setState({
            color:e.target.value
        })
    }
    addDiary=()=>{
        var url = 'http://localhost:3001/child/cdairy/ccdairy';
        var ccdairywarn = document.getElementById('ccdairywarn');
        ccdairywarn.style.display='block';
        var imgurl = JSON.stringify(this.state.lists)
        fetch(url,{
            method:'POST',
            mode:'cors',
            headers:{
                'Content-Type':"application/x-www-form-urlencoded"
            },
            body:`cid=${this.state.cid}&backcolor=${this.state.color}&content=${this.state.content}&imgurl=${imgurl}`
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
            // 创建日记
            <div className="ccdairy">
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
                    onLeftClick={() => this.props.history.push('/child/cdairy')}
                    ><span style={{
                        fontWeight:'bold',
                        fontSize:'6vw',
                        textIndent:'3vw',
                        letterSpacing:'3vw',
                        color:"white"
                    }}
                    >写日记</span>
                </NavBar>
                <form className='ccdairy_inner'>
                    <textarea
                    onChange={this.contentChange}
                    rows="8" 
                    cols="30" 
                    placeholder='请输入日记内容' 
                    style={{
                        marginTop:"5vh",
                        border:"1px solid #FFBF2D",
                        background:`${this.state.color}`
                    }}>
                    </textarea>
                    <p>
                        <span 
                        style={{
                            fontSize: '6vh',
                            color: '#FFBF2D',
                            position:'absolute',
                        }}
                        className='iconfont icon-paizhaoxiangjimianxing'>
                            <input
                             id='img'
                             onChange={this.upfiles}                           
                             type='file'  
                             accept="image/*" 
                             capture="camera" 
                             name='uimage'
                             multiple 
                            />
                        </span>
                        <span 
                        style={{
                            fontSize: '5vh',
                            color: '#FFBF2D',
                            position:'absolute',
                            marginTop:'1.5vw',
                            left:'25vw'
                        }}
                        className='iconfont icon-xinzhi'>
                            <input
                            onChange={this.colorChange}
                            style={{
                                position:'relative',
                                left:'-10vw',
                                top:'-1vh',
                                opacity:'0'
                            }}
                            type='color'
                            name='color'
                            />
                        </span>
                    </p>
                </form>
                <div className='ccdairy_block'>
                    <p>图片预览：</p>
                    <div className='ccdairy_pics'>
                        {
                            this.state.lists&&this.state.lists.map((item,idx)=>(
                                <div
                                key={idx} 
                                style={{
                                    background:`url(${item}) center center/cover no-repeat`
                                }}></div>
                            ))
                        }
                    </div>
                </div>
                <button 
                onClick={this.addDiary}
                style={{
                    bottom:'3vh'
                }}
                className='alladd_button'>添加日记</button>

                <div id='ccdairywarn'>
                    <p>{this.state.code}</p>
                    <button
                    onClick={(e)=>{
                        e.target.parentNode.style.display='none';
                        this.props.history.push('/child/cdairy')
                    }}
                    >确定</button>
                </div>
            </div>
        )
    }
}
