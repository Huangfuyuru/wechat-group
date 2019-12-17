import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import {Link} from 'react-router-dom';

export default class Use extends Component {
    constructor(props){
        super(props);
        var uid = JSON.parse(localStorage.getItem('uid'));
        this.state={
            uimage:'',
            uname:'',
            pass:'',
            uid:uid,
            gender:'',
            code:0,
        }
    }
    upfile=()=>{
        var file=document.getElementById('img').files[0];
        var url = 'http://localhost:3001/img';
        var form = new FormData();
        form.append("file",file);
        console.log(form);
        fetch(url,{
            method:'POST',
            body:form
        })
        .then(res=>res.json())
        .then(res=>(
            console.log(res.path),
            this.setState({
                uimage:res.path
            })
        ))
        console.log(this.state.uimage);
    }
    inputChange1=(e)=>{
        var a=e.target.value;
        this.setState({
            uname:a
        })
    }
    inputChange2=(e)=>{
        var a=e.target.value;
        this.setState({
            gender:a
        })
    }
    inputChange3=(e)=>{
        var a=e.target.value;
        this.setState({
            pass:a
        })
    }
    Finally=()=>{
        // this.state.uimage,
        console.log(this.state.uname,this.state.gender,this.state.pass)
        fetch(`http://localhost:3001/my/information`,{
            method:'POST',
            mode:'cors',
            headers:{
                'Content-Type':"application/x-www-form-urlencoded"
            },
            // uimage=${this.state.uimage}
            body:`&uname=${this.state.uname}&gender=${this.state.gender}&pass=${this.state.pass}&uid=${this.state.uid}`
        }).then(res=>res.json())
        .then(json=>{
            console.log(json)
            this.setState({
                code:json.code
            });
        })
        console.log(this.state.code);
    }
    render(){
        return(
            <div className="All">
                <NavBar
                    style={{
                        background:'#FFBF2D',
                        height:'8vh'
                    }}
                    mode="light"
                    icon={<Icon type="left" style={{color:"white"}}/>}
                    onLeftClick={() => this.props.history.push('/index/my')}
                    ><span style={{
                        fontWeight:'bold',
                        fontSize:'6vw',
                        textIndent:'3vw',
                        letterSpacing:'3vw',
                        color:"white"
                    }}
                    >设置</span>
                </NavBar>
                <div className='child_first'>                   
                    <span style={{
                        zIndex:'10',
                        display:'inline-block',
                        width:'100%',
                        fontSize:'5vw',
                        top:'8vh',
                        position:'relative',
                        color:'#000',
                        background:'rgb(255,191,45,0.3)'
                    }}>轻触上传精选照片<input 
                    id='img'
                    onChange={this.upfile}                           
                    type='file'  
                    accept="image/*" 
                    capture="camera" 
                    name='uimage' 
                    /></span>
                    <div style={{
                        marginTop:'8.8vh'
                    }}>
                        <img 
                        src={this.state.cindex_src} alt='自定义照片墙'/>
                    </div>    
                </div>
                <form action=''>
                    <div className="create_Relation">
                        昵称：&nbsp;
                        <input onChange={(e)=>this.inputChange1(e)} className="one" type="text" placeholder="单行输入"></input>
                    </div>
                    <div className="create_Relation">
                        性别：&nbsp;
                        <input onChange={(e)=>this.inputChange2(e)} className="one" type="text" placeholder="男/女"></input>
                    </div>
                    <div className="create_Relation">
                        新密码：&nbsp;
                        <input onChange={(e)=>this.inputChange3(e)} className="one" type="text" placeholder="单行输入"></input>
                    </div>
                    <Link to="/index/my">
                        <button onClick={this.Finally} className="relation_button">确认修改</button>
                    </Link>
                </form>
            </div>
        )
    }
}