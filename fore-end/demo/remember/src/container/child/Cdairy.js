import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { NavBar, Icon } from 'antd-mobile';

export default class Cdairy extends Component {
    constructor(props){
        super(props);
        var cid = JSON.stringify(localStorage.getItem('cid'))
        this.state={
            cid:cid,
            lists:[]
        }
    }
    componentDidMount(){
        console.log(this.state.cid)
        fetch(`http://localhost:3001/child/cdairy?childsid=${this.state.cid}`)
        .then(res=>res.json())
        .then(json=>{
            this.setState({
                lists:json
            })
        })
    }
    componentDidUpdate(){
        console.log(this.state.cid)
    }
    delDiary=(itemid)=>{
        console.log(itemid)
        fetch(`http://localhost:3001/child/cdairy/crdairy?childsid=${this.state.cid}&childDiaryid=${itemid}`)
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({
                lists:res
            });
        })
    }
    render() {
        return (
            <div className="cdairy">
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
                    >日记</span>
                </NavBar>
                <div className='cdairy_inner'>
                    {
                        this.state.lists&&this.state.lists.map((item)=>(
                            <div
                            style={{
                                background:`${item.backcolor}`
                            }} 
                            key={item.id} 
                            className='cdairy_block'
                            >
                                <p>
                                    <i className='iconfont icon-xieriji'/>
                                    {item.setdate}
                                    <span
                                    style={{
                                        fontSize:'4.3vh',
                                        float:'right',
                                        color:'#bdbbb8'
                                    }}
                                    onClick={()=>this.delDiary(item.id)} 
                                    className='iconfont icon-shanchu1'
                                    ></span>
                                </p>
                                <Link 
                                style={{color:'#000'}}
                                to={{
                                    pathname:'/child/cdairy/show',
                                    state:{item}
                                }}>
                                    <p style={{height:'9vh'}}>{item.content}</p>
                                </Link>
                                <div className='cdairy_imgblock'>
                                    {
                                        item.imgurl&&item.imgurl.map((img,idx)=>(
                                            <div>
                                                <div style={{
                                                    background:`url(${img}) center center/cover no-repeat`
                                                }}></div>
                                            </div>
                                        ))
                                    }
                                </div>
                                {/* <div style={{
                                    background:`url(${item.imgurl[0]}) center center/cover no-repeat`
                                }}></div>
                                <div style={{
                                    background:`url(${item.imgurl[1]}}) center center/cover no-repeat`
                                }}></div>
                                <div style={{
                                    background:`url(${item.imgurl[2]}}) center center/cover no-repeat`
                                }}></div> */}
                            </div>
                        ))
                    }
                </div>

                <div className='allpage_add'>
                    <p></p>
                    <Link
                    to={{
                    pathname:'/child/cdairy/ccdairy',
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