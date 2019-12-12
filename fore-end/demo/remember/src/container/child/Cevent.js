import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { NavBar, Icon } from 'antd-mobile';
import { relativeTimeThreshold } from 'moment';
import moment from 'moment';
// import '../../css/child.css'

export default class Cevent extends Component {
    constructor(props){
        super(props);
        var cid = JSON.parse(localStorage.getItem('cid'));
        this.state={
            cid:cid,
            lists:[],
            
        }
    }
    componentDidMount(){
        fetch(`http://localhost:3001/child/cevents?childsid=${this.state.cid}`)
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({
            lists:res
            });
        })
    }
    render() {
        return (
            //大事记
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
                    onLeftClick={() => this.props.history.push('/index/child')}
                    ><span style={{
                        fontWeight:'bold',
                        fontSize:'6vw',
                        textIndent:'3vw',
                        letterSpacing:'3vw',
                        color:"white"
                    }}
                    >大事记</span>
                </NavBar>
                <div className="ceventBody"
                style={{
                    minHeight: "78vh",
                    marginTop: "15vw",
                    boxShadow: "0px 1px 5px 0px #bdbbb8 inset",
                    padding: "3vh 5vw",
                    textAlgin: "center",
                    marginBottom: "15vh"
                }}
                >
                {
                    this.state.lists&&this.state.lists.map((cnews)=>{
                       
                return    <div className='inner' key={cnews.id} style={{height:'20vh'}}>
                            <Link to={{
                                pathname:'/child/cevents/show',
                            }}>
                                <div style={{height:"100%"}}>
                                    <div style={{float:'left',
                                    width:"50%",
                                    height:'100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: "center"}}>
                                        <p><span>{cnews.item[0]}</span>{cnews.name}</p>
                                    </div>
                                    <div style={{float:'right',
                                    width:"50%",
                                    height:'100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: "center"}}>
                                        <img src={cnews.imgurl[0]||'#'} style={{width:'100%'}}/>
                                    </div>
                                    
                                </div>
                            </Link>
                        </div>
                    })
                }
                </div>
                <div className='allpage_add'>
                    <p></p>
                    <Link
                    to={{
                        pathname:'/child/cevents/ccevent',
                        state:{
                            cid:this.state.cid
                        }
                    }}
                    ><i className='iconfont icon-jia'></i></Link>
                </div>
            </div>
        
        )
    }
}
