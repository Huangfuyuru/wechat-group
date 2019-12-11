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
            loverid:''
        }
    }
    inputChange1=(e)=>{
        var a=e.target.value;
        this.setState({
            name:a
        })
        console.log(this.state.name)
    }
    inputChange2=(e)=>{
        var a=e.target.value;
        this.setState({
            ldate:a
        })
        console.log(this.state.ldate)
    }
    inputChange3=(e)=>{
        var a=e.target.value;
        this.setState({
            gender:a
        })
        console.log(this.state.gender)
    }
    Finally=()=>{
        console.log(this.state.name,this.state.birthday,this.state.gender,this.state.uid)
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
                loverid:json[0].loverid
            });
        })
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
                    onLeftClick={() => this.props.history.push('/index/My')}
                    ><span style={{
                        fontWeight:'bold',
                        fontSize:'6vw',
                        textIndent:'3vw',
                        letterSpacing:'3vw',
                        color:"white"
                    }}
                    >建立关系</span>
                </NavBar>
                <form method='post' action=''>
                    <div className="create_Relation">
                        对方昵称：&nbsp;
                        <input onChange={(e)=>this.inputChange1(e)} className="one" type="text" placeholder="单行输入"></input>
                    </div>
                    <div className="create_Relation">
                        关系确认日期：&nbsp;
                        <input onChange={(e)=>this.inputChange2(e)} className="one" type="text" placeholder="请输入汉字"></input>
                    </div>
                    <div className="create_Relation">
                        对方性别：&nbsp;
                        <input onChange={(e)=>this.inputChange3(e)} className="one" type="text" placeholder="女/男"></input>
                    </div>
                    <Link to="/index/my">
                        <button onClick={()=>this.Finally} className="relation_button">创建关系</button>
                    </Link>
                </form>
            </div>
        )
    }
}