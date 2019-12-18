import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import {Link} from 'react-router-dom';

export default class Crelation extends Component {
    constructor(props){
        super(props);
        var uid = JSON.parse(localStorage.getItem('uid'));
        this.state={
            name:'',
            ldate:'',
            gender:'',
            uid:uid,
            code:0,
        }
    }
    inputChange1=(e)=>{
        var a=e.target.value;
        this.setState({
            name:a
        })
    }
    inputChange2=(e)=>{
        var a=e.target.value;
        this.setState({
            ldate:a
        })
    }
    inputChange3=(e)=>{
        var a=e.target.value;
        this.setState({
            gender:a
        })
    }
    Finally=()=>{
        console.log(this.state.name,this.state.ldate,this.state.gender,this.state.uid)
        fetch(`http://localhost:3001/my/addlover`,{
            method:'POST',
            mode:'cors',
            headers:{
                'Content-Type':"application/x-www-form-urlencoded"
            },
            body:`name=${this.state.name}&ldate=${this.state.ldate}&gender=${this.state.gender}&uid=${this.state.uid}`
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
<<<<<<< HEAD
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
                    >建立关系</span>
                </NavBar>
                <div style={{width:"100%",height:"10vh"}}></div>
                <h3>爱人关系</h3>
                <form action=''>
                    <div className="create_Relation2" style={{marginTop:"15%"}}>
                        对方昵称：&nbsp;
                        <input onChange={(e)=>this.inputChange1(e)} className="one" type="text" placeholder="单行输入"></input>
                    </div>
                    <div className="create_Relation2">
                        关系确认日期：&nbsp;
                        <input onChange={(e)=>this.inputChange2(e)} className="one" type="text" placeholder="xxxx-xx-xx"></input>
                    </div>
                    <div className="create_Relation2">
                        对方性别：&nbsp;
                        <input onChange={(e)=>this.inputChange3(e)} className="one" type="text" placeholder="男/女"></input>
                    </div>
                    <Link to="/index/my">
                        <button onClick={this.Finally} className="relation_button">创建关系</button>
                    </Link>
                </form>
            </div>
=======
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
                >建立关系</span>
            </NavBar>
            <div style={{width:"100%",height:"10vh"}}></div>
            <h3>爱人关系</h3>
            <form action=''>
                <div className="create_Relation2" style={{marginTop:"15%"}}>
                    对方昵称：&nbsp;
                    <input onChange={(e)=>this.inputChange1(e)} className="one" type="text" placeholder="单行输入"></input>
                </div>
                <div className="create_Relation2">
                    关系确认日期：&nbsp;
                    <input onChange={(e)=>this.inputChange2(e)} className="one" type="text" placeholder="xxxx-xx-xx"></input>
                </div>
                <div className="create_Relation2">
                    对方性别：&nbsp;
                    <input onChange={(e)=>this.inputChange3(e)} className="one" type="text" placeholder="男/女"></input>
                </div>
                <Link to="/index/my">
                    <button onClick={this.Finally} className="relation_button">创建关系</button>
                </Link>
            </form>
        </div>
>>>>>>> 08d5bf4b5ecbab504a35ee3fd9bf2e718577ba73
        )
    }
}