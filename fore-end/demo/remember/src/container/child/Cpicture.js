import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { NavBar, Icon } from 'antd-mobile';
import moment from 'moment'

export default class Cloud extends Component {
    constructor(){
        super();
        var cid = JSON.parse(localStorage.getItem('cid'));
        this.state={
            delpics:[],
            cid:cid,
            lists:[]
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
    rmCpicture=(itemid)=>{
        console.log(itemid,this.state.cid)
        fetch(`http://localhost:3001/child/cpictures/crpictures?childsid=${this.state.cid}&childPhotoListid=${itemid}`)
        .then((res)=>res.json())
        .then((res)=>{
            console.log(res)
            this.setState({
                lists:res
            });
        })
        fetch(`http://localhost:3001/child/cpictures/show?childPhotoListid=${itemid}`)
        .then((res)=>res.json())
        .then(json=>{
            this.setState({
                delpics:json
            })
        })
        fetch(`http://localhost:3001/child/cpictures/cdelpictures`,{
            method:'POST',
            mode:'cors',
            headers:{
                'Content-Type':"application/x-www-form-urlencoded"
            },
            body:`childPhotoListid=${itemid}&imgurl=${this.state.delpics} `
        }).then(res=>res.json())
        .then(json=>{
            this.setState({
                code:json.msg
            })
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
                                {/* <Link to={{
                                    pathname:'/child/cpictures/show',
                                    state:{
                                        pname:item.name,
                                        pid:item.id
                                    }
                                }}>
                                </Link> */}
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
                                    onClick={()=>this.rmCpicture(item.id)}
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
            </div>
        )
    }
}