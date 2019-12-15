import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { NavBar, Icon } from 'antd-mobile';
import '../../../css/child.css'
export default class Showpicture extends Component {
    constructor(props){
        super(props);
        this.state={
            pname:this.props.location.state,
            lists:[
                {
                    imgurl:'http://n1.itc.cn/img8/wb/recom/2016/08/22/147185560609215845.JPEG'
                },
                {
                    imgurl:'http://n1.itc.cn/img8/wb/recom/2016/08/22/147185560609215845.JPEG'
                },
                {
                    imgurl:'http://n1.itc.cn/img8/wb/recom/2016/08/22/147185560609215845.JPEG'
                },
            ]
        }
    }
    render() {
        return (
            // 相册页面
            <div className="scpicture">
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
                    onLeftClick={() => this.props.history.push('/child/cpictures')}
                    rightContent={[
                        <span
                        className='iconfont icon-bianji'
                        style={{
                            marginRight:'2vw',
                            fontSize:'5vw',
                            fontWeight:'lighter',
                            letterSpacing:'1vw'
                        }}
                        onClick={()=>{
                            console.log('ni')
                        }} 
                        >编辑</span>,
                        ]}
                    ><span style={{
                        fontWeight:'bold',
                        fontSize:'6vw',
                        textIndent:'3vw',
                        letterSpacing:'3vw',
                        color:"white"
                    }}
                    >{this.state.pname}</span>
                </NavBar>
                <div className='scpicture_inner'>
                    {
                        this.state.lists&&this.state.lists.map((item)=>(
                            <div className="scpicture_block"
                            style={{
                                background:`url(${item.imgurl}) center center/cover no-repeat`,
                            }}>
                            </div>
                        ))
                    }
                </div>

                <div className='allpage_add'>
                    <p></p>
                    <Link
                    to={{
                    pathname:'/child/cpictures/addpictures',
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