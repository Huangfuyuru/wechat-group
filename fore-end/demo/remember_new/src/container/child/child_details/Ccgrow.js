import React, { Component } from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import { NavBar, Icon } from 'antd-mobile';

export default class growAdd extends Component {
    constructor(props){
        super(props);
        var cid = JSON.parse(localStorage.getItem('cid'));
        // console.log(cid)
        this.state={
            cid:cid,
            height:'',
            weight:'',
            age:'',
            code:''
        }
    }
    changeHeight=(e)=>{
        this.setState({
            height:e.target.value
        })
        // console.log(this.state.height)
    }
    changeWeight=(e)=>{
        this.setState({
            weight:e.target.value
        })
        // console.log(this.state.tel)
    }
    changeAge=(e)=>{
        this.setState({
            age:e.target.value
        })
        // console.log(this.state.tel)
    }
    buttonPost=()=>{
        var addwarn=document.getElementById('addwarn');
        fetch('http://localhost:3001/child/cgrowup/ccgrowup',{
            method:'POST',
            mode:'cors',
            headers:{
                'Content-Type':"application/x-www-form-urlencoded"
            },
            body:`length=${this.state.height}&weight=${this.state.weight}&age=${this.state.age}&childsid=${Number(this.state.cid)}`
        }).then(res=>res.json())
        .then(json=>{
            this.setState({
                code:json.msg
            },()=>{
                addwarn.style.display='block';
            })
            console.log(json)
        })
    }
    render() {
        return (
            // 成长记录
            <div className="ccgrow">
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
                    onLeftClick={() => this.props.history.push('/child/cgrowup')}
                    ><span style={{
                        fontWeight:'bold',
                        fontSize:'6vw',
                        textIndent:'3vw',
                        letterSpacing:'3vw',
                        color:"white"
                    }}
                    >添加记录</span>
                </NavBar>
                <div className='ccgrow_inner'>
                    <div>
                        <span>身高（cm）：</span>
                        <input onChange={this.changeHeight} name='length' type='text' placeholder='单行输入'/>
                    </div>
                    <div>
                        <span>体重（kg）：</span>
                        <input onChange={this.changeWeight} name='weight' type='text' placeholder='单行输入'/>
                    </div>
                    <div>
                        <span>年龄（岁）：</span>
                        <input onChange={this.changeAge} name='age' type='text' placeholder='单行输入'/>
                    </div>

                    <button className='alladd_button' onClick={this.buttonPost}>添加记录</button>
                    <form id='addwarn'>
                        <div>{this.state.code}</div>
                        <button 
                        onClick={()=>{
                            var addwarn=document.getElementById('addwarn');
                            addwarn.style.display='none';
                            this.props.history.push('/child/cgrowup');
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
                        }}>返回记录</button>
                        <button 
                        onClick={()=>{
                            var addwarn=document.getElementById('addwarn');
                            addwarn.style.display='none';
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
                
            </div>
        )
    }
}