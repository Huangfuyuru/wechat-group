import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { NavBar, Icon } from 'antd-mobile';
import moment from 'moment'

export default class Cloud extends Component {
    constructor(){
        super();
        var cid = JSON.parse(localStorage.getItem('cid'));
        this.state={
            childPhotoListid:'',
            cid:cid,
            lists:[],
            code:""
        }
    }
      // 加载外部数据用componentDidMount
    componentDidMount(){
        fetch(`http://localhost:3001/child/cpictures?childsid=${this.state.cid}`)
        .then((res)=>res.json())
        .then((res)=>{
            console.log('点击云相册',res)
            this.setState({
                lists:res
            });
            
        })
    }
    componentDidUpdate(){
        // fetch(`http://localhost:3001/child/cpictures?childsid=${this.state.cid}`)
        // .then((res)=>res.json())
        // .then((res)=>{
        //     console.log('点击云相册',res)
        //     this.setState({
        //         lists:res
        //     });
            
        // })
    }
    rmCpicture=(e)=>{
        e.target.parentNode.style.display = 'none';
        var  cpictureagain = document.getElementById('cpictureagain');
        cpictureagain.style.display = 'block';
        fetch(`http://localhost:3001/child/cpictures/crpictures?childsid=${this.state.cid}&childPhotoListid=${this.state.childPhotoListid}`)
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
            // 云相册
            <div className="cpicture">
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
                    >云相册</span>
                </NavBar>
                <div className='cpicture_inner'>
                    {
                        this.state.lists&&this.state.lists.map((item,idx)=>(
                            <div className='cpicture_block'>
                                <div 
                                onClick={()=>{
                                    var cpicture={
                                        pname:item.name,
                                        pid:item.id
                                    }
                                    localStorage.setItem('cpicture',JSON.stringify(cpicture));
                                    this.props.history.push('/child/cpictures/show')
                                    
                                }}
                                style={{
                                    width:'95%',
                                    height:'75%',
                                    margin:'1.5vh auto',
                                    background:`url(${item.background}) center center/cover no-repeat`,
                                }}>
                                </div>
                                <p style={{
                                    borderTop:'1px solid #ccc',
                                    margin:'0',
                                    lineHeight:'7vh',
                                    textAlign:'left',
                                    paddingLeft:'5vw',
                                    color:'#FFBF2D',
                                    fontSize:'6vw'
                                }}>
                                    
                                    {item.name}
                                    <span
                                    onClick={()=>{
                                        var delcpicture = document.getElementById('delcpicture');
                                        delcpicture.style.display='block';
                                        this.setState({
                                            childPhotoListid:item.id
                                        })
                                    }}
                                    style={{
                                        color:'#bdbbb8',
                                        lineHeight:'6.5vh',
                                        float:'right',
                                        marginRight:'4vw'
                                    }}
                                    >
                                        <i className='iconfont icon-shanchu1'/>
                                    </span>
                                </p>
                            </div>
                        ))
                    }
                </div>

                <div className='allpage_add'>
                    <p></p>
                    <Link
                    to={{
                    pathname:'/child/cpictures/ccpicture',
                    state:{
                        cid:this.state.cid
                    }
                    }}
                    ><i className='iconfont icon-jia'></i></Link>
              </div>

              <div id='delcpicture'>
                    <div>删除相册及相册中所有照片？</div>
                    <button 
                    onClick={(e)=>{
                        e.target.parentNode.style.display='none'
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
                    onClick={this.rmCpicture}
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
                <div id='cpictureagain'>
                    <div>{this.state.code}</div>
                    <button 
                    onClick={(e)=>{
                        e.target.parentNode.style.display='none'; 
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