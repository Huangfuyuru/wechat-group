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
                        <i
                        className='iconfont icon-qiehuan'
                        style={{
                            marginRight:'2vw',
                            fontSize:'8.5vw',
                            fontWeight:'lighter'
                        }}
                        onClick={()=>{
                            var tag = document.getElementById('tag');
                            if(this.state.menu_count%2==0){
                                console.log('进入')
                                tag.style.display='block';
                                fetch(`http://localhost:3001/child/change?usersid=${this.state.uid}`)
                                .then(res=>res.json())
                                .then(json=>{
                                    this.setState({
                                        change_id:json
                                    })
                                })
                            }else{
                                console.log('退出')
                                tag.style.display='none';
                            }
                            this.setState({
                                menu_count:this.state.menu_count+1
                            });
                            console.log('切换亲子');
    
                        }} 
                        key="1" type="ellipsis" />,
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
            </div>
        )
    }
}