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
        var fileObj = document.getElementById('file').files;
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
    buttonPost=()=>{
        console.log(this.state.cid)
        var url = 'http://localhost:3001/child/cevents/ccevents';
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
        })
    }
    render() {
        
        return (
            // 添加大事记
            <div className="All">
                <NavBar
                    style={{
                        background:'#FFBF2D',
                        height:'8vh',
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
                <form>
                    <label><input type="checkbox" name="item" value="第一次"/>第一次</label>
                    <input type="text" placeholder="名称" name="name" onChange={this.changeName}/>
                    <p>宝宝做了什么</p>
                    <textarea rows="3" cols="20" placeholder='请输入内容' name="content" onChange={this.changeContent}>
                    </textarea>
                    <input type='file' id='file' onChange={this.UpFile} multiple/>
                    <input id="date" type="date" value={this.state.setdate} onChange={this.changeDate} style={{border:'none'}}/>
                    <div>
                    {
                        this.state.imgurl&&this.state.imgurl.map((item,index)=>{
                            return <img key={index} src={item.path} style={{width:'100%'}}/>
                        })
                    }
                    </div>
                    <button type="button" onClick={this.buttonPost}>保存</button>
                    
                </form>
            </div>
        )
    }
}