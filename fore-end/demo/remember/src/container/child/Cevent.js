import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { NavBar, Icon } from 'antd-mobile';
import { relativeTimeThreshold } from 'moment';
import moment from 'moment';
import '../../css/child.css'

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
    delItem=(itemid)=>{
        fetch(`http://localhost:3001/child/cevents/crevents?childAdolesceid=${itemid}&childsid=${this.state.cid}`)
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({
                lists:res
            });
        })
    }
    render() {
        return (
            <div className="cevent">
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
                <div className="cevent_inner">
                    {
                        this.state.lists&&this.state.lists.map((item)=>{
                        return  <div
                        className='cevent_block' 
                        key={item.id} 
                        >
                            <i
                            onClick={()=>this.delItem(item.id)}  
                            className='iconfont icon-shanchu1' 
                            style={{
                                fontSize:'4.3vh',
                                position:'relative',
                                top:'2vh',
                                right:'-95%',
                                color:'#bdbbb8'
                            }}></i>
                            <p>
                                <span style={{
                                    marginRight:'3vw'
                                }}>
                                    {item.item[0]}
                                </span>
                                {item.name}
                            </p>
                            <Link to={{
                                pathname:'/child/cevents/show',
                                state:{item}
                            }}>
                                <div style={{
                                    background:`url(${item.imgurl[0]||'#'}) center center/cover no-repeat`
                                }}>

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
