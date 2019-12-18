import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import {Link} from 'react-router-dom';

export default class Use extends Component {
    constructor(props){
        super(props);
        var uid = JSON.parse(localStorage.getItem('uid'));
        var umsg = JSON.parse(localStorage.getItem('umsg'));
        this.state={
            uimage:'',
            uname:'',
            pass:'',
            uid:uid,
            umsg:umsg,
            gender:'',
            code:0,
            src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574914271954&di=5ce6c90533745142d11594040dd0b2b1&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201506%2F19%2F20150619202710_4vZ8s.thumb.224_0.jpeg'
        }
    }
    upfile=()=>{
        var file=document.getElementById('img').files[0];
        var url = 'http://localhost:3001/img';
        var form = new FormData();
        form.append("file",file);
        fetch(url,{
            method:'POST',
            body:form
        }).then(res=>res.json())
        .then(res=>{
            this.setState({src:res.path})
        })
    }
    inputChange1=(e)=>{
        var a=e.target.value;
        if(a==''){
            a=this.state.umsg.name
        }
        this.setState({
            uname:a
        })
    }
    inputChange2=(e)=>{
        var a=e.target.value;
        if(a==''){
            a=this.state.umsg.gender
        }
        this.setState({
            gender:a
        })
    }
    inputChange3=(e)=>{
        var a=e.target.value;
        if(a==''){
            a=this.state.umsg.pass
        }
        this.setState({
            pass:a
        })
    }
    Finally=()=>{
        console.log(this.state.src,this.state.uname,this.state.gender,this.state.pass)
        fetch(`http://localhost:3001/my/information`,{
            method:'POST',
            mode:'cors',
            headers:{
                'Content-Type':"application/x-www-form-urlencoded"
            },
            body:`&uimage=${this.state.src}&uname=${this.state.uname}&gender=${this.state.gender}&pass=${this.state.pass}&uid=${this.state.uid}`
        }).then(res=>res.json())
        .then(json=>{
            this.setState({
                code:json.code
            });
        })
    }
    render(){
        return(
            <div className="All">
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
                <div style={{width:"100%",height:"10px",marginTop:"15%"}}></div>
                <p className="img">
                    <i className='iconfont icon-touxiangshangchuan'></i>  
                    <span>轻触上传头像<input 
                    id='img'
                    onChange={this.upfile}                         
                    type='file'  
                    accept="image/*" 
                    capture="camera" 
                    name='uimage' 
                    placeholder='轻触上传头像'/></span>                          
                    <div style={{
                        width:'20vw',
                        height:'10vh',
                        display:'inline-block',
                        marginLeft:'6vw'}}>
                            <img src={this.state.src} 
                            alt='默认头像'
                            width='100%'/>              
                    </div>
                </p>
                <form action=''>
<<<<<<< HEAD
                    <div className="create_Relation3">
                        昵称：&nbsp;
                        <input onChange={(e)=>this.inputChange1(e)} className="one" type="text" placeholder="单行输入"></input>
                    </div>
                    <div className="create_Relation3">
                        性别：&nbsp;
                        <input onChange={(e)=>this.inputChange2(e)} className="one" type="text" placeholder="男/女"></input>
                    </div>
                    <div className="create_Relation3">
                        新密码：&nbsp;
=======
                    <div className="create_Relation">
                        设置昵称：&nbsp;
                        <input onChange={(e)=>this.inputChange1(e)} className="one" type="text" placeholder="单行输入"></input>
                    </div>
                    <div className="create_Relation">
                        设置性别：&nbsp;
                        <input onChange={(e)=>this.inputChange2(e)} className="one" type="text" placeholder="男/女"></input>
                    </div>
                    <div className="create_Relation">
                        设置新密码：&nbsp;
>>>>>>> 08d5bf4b5ecbab504a35ee3fd9bf2e718577ba73
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