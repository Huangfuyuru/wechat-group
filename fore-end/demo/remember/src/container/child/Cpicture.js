import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { NavBar, Icon } from 'antd-mobile';
import moment from 'moment'

export default class Cloud extends Component {
    constructor(){
        super();
        var cid = localStorage.getItem('cid');
        this.state={
            cid:cid,
            lists:
            [
                {
                childPhotoListid:'111',
                name:'222',
                setdate:'333',
                backgroundurl:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1961296464,1745767450&fm=26&gp=0.jpg'
                },
                {
                childPhotoListid:'111',
                name:'222',
                setdate:'333',
                backgroundurl:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1961296464,1745767450&fm=26&gp=0.jpg'
                },
            ]
        }
    }
      // 加载外部数据用componentDidMount
    componentDidMount(){
        fetch(`http://localhost:3001/child/cpictures?childsid=${this.state.cid}`)
        .then((res)=>res.json())
        .then((res)=>{
            console.log(res)
            // this.setState({data:res.data});
        })
    }
    //setState()结束之后都会自动调用componentDidUpdate()
    //如果有更新会进componentDidUpdate里面
    componentDidUpdate(Props,State){
        fetch(`http://localhost:3001/child/cpictures?childsid=${this.state.cid}`)
        .then((res)=>res.json())
        .then((res)=>{
            console.log(res)
            // this.setState({data:res.data});
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
                            <Link 
                            className='cpicture_block'
                            to='/child/cpictures/show'>
                                <div style={{
                                    width:'95%',
                                    height:'75%',
                                    margin:'1.5vh auto',
                                    background:`url(${item.backgroundurl}) center center/cover no-repeat`,
                                }}>
                                </div>
                                <p style={{
                                    borderTop:'1px solid #ccc',
                                    margin:'0',
                                    lineHeight:'5vh',
                                    textAlign:'left',
                                    paddingLeft:'5vw',
                                    color:'#FFBF2D',
                                    fontSize:'6vw'
                                }}>
                                    
                                    {item.name}
                                    <span
                                    style={{
                                        color:'#bdbbb8',
                                        lineHeight:'5vh',
                                        float:'right',
                                        marginRight:'5vw'
                                    }}
                                    >
                                        <i className='iconfont icon-you'/>
                                    </span>
                                </p>
                            </Link>
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