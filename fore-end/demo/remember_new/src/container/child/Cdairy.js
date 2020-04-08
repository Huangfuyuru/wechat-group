import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { NavBar, Icon } from 'antd-mobile';
import moment from 'moment';


export default class Cdairy extends Component {
    constructor(props){
        super(props);
        var cid = JSON.stringify(localStorage.getItem('cid'))
        this.state={
            childDiaryid:'',
            cid:cid,
            code:'',
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
    delCdiary=(e)=>{
        e.target.parentNode.style.display='none'
        var cdiaryagain = document.getElementById('cdiaryagain')
        cdiaryagain.style.display='block'
        fetch(`http://localhost:3001/child/cdairy/crdairy?childsid=${this.state.cid}&childDiaryid=${this.state.childDiaryid}`)
        .then((res)=>res.json())
        .then((res)=>{
            console.log(res)
            this.setState({
                lists:res.data,
                code:res.msg
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
                        this.state.lists&&this.state.lists.map((item)=>{
                            if(item.content == 'undefined'){
                                item.content = '没有添加文字内容哦~'
                            }
                            return <div
                            style={{
                                background:`${item.backcolor}`
                            }} 
                            key={item.id} 
                            className='cdairy_block'
                            >
                                <p>
                                    <i className='iconfont icon-xieriji'/>
                                    { moment(item.setdate).format("YYYY-MM-DD")}
                                    <span
                                    style={{
                                        fontSize:'4.3vh',
                                        float:'right',
                                        color:'#000'
                                    }}
                                    onClick={()=>{
                                        this.setState({
                                            childDiaryid:item.id
                                        })
                                        var delcdiary = document.getElementById('delcdiary');
                                        delcdiary.style.display='block'
                                    }} 
                                    className='iconfont icon-shanchu1'
                                    ></span>
                                </p>
                                <Link 
                                style={{color:'#000'}}
                                to={{
                                    pathname:'/child/cdairy/show',
                                    state:item
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
                            </div>
                        }
                    )}
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

              <div id='delcdiary'>
                    <div>确定删除？</div>
                    <button 
                    onClick={()=>{
                        var delcdiary=document.getElementById('delcdiary');
                        delcdiary.style.display='none';
                    }}
                    style={{
                        width:'25%',
                        height:'15%',
                        color:'#FFBF2D',
                        border:'none',
                        marginTop:'2vh',
                        background:'#fff',
                        borderRadius:'5px',
                        fontSize:'6vw',
                        marginRight:'10vw'
                    }}>返回</button>
                    <button 
                    onClick={this.delCdiary}
                    style={{
                        width:'25%',
                        height:'15%',
                        color:'#FFBF2D',
                        border:'none',
                        marginTop:'2vh',
                        background:'#fff',
                        borderRadius:'5px',
                        fontSize:'6vw'
                    }}>确定</button>
                </div>
                <div id='cdiaryagain'>
                <div>{this.state.code}</div>
                    <button 
                    onClick={()=>{
                        var cdiaryagain=document.getElementById('cdiaryagain');
                        cdiaryagain.style.display='none';
                    }}
                    style={{
                        width:'25%',
                        height:'15%',
                        color:'#FFBF2D',
                        border:'none',
                        marginTop:'2vh',
                        background:'#fff',
                        borderRadius:'5px',
                        fontSize:'6vw'
                    }}>确定</button>
                </div>

              
            </div>
        )
    }
}