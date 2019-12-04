import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { NavBar, Icon } from 'antd-mobile';

export default class Cloud extends Component {
    constructor(){
        super();
        this.state={
            picture:[{
                pic1:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1310375106,1926353045&fm=26&gp=0.jpg',
                pic2:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2037612692,2923078042&fm=26&gp=0.jpg',
                txt1:"所有照片",
                txt2:"百天纪念",
            }]
        }
    }
      // 加载外部数据用componentDidMount
    componentDidMount(){
        let path = this.props.match.params.id
        fetch(``)
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({data:res.data});
        })
    }
    //setState()结束之后都会自动调用componentDidUpdate()
    //如果有更新会进componentDidUpdate里面
    componentDidUpdate(Props,State){
        if(Props.location.search !== this.props.location.search){
            let path = this.props.match.params.id
            console.log('path',path)
            fetch( ``)
            .then((res)=>res.json())
            .then((res)=>{
                this.setState({data:res.data});
            })
        }
    }
    render() {
        return (
            // 云相册
            <div className="All">
                <NavBar
                    style={{
                        background:'#FFBF2D',
                        height:'8vh'
                    }}
                    mode="light"
                    icon={<Icon type="left" style={{color:"black"}}/>}
                    onLeftClick={() => this.props.history.push('/Cloud')}
                    ><span style={{
                        fontWeight:'bold',
                        fontSize:'6vw',
                        textIndent:'3vw',
                        letterSpacing:'3vw'
                    }}
                    >云相册</span>
                </NavBar>
                {/* 照片及描述 */}
                {
                    this.state.picture.map((picture)=>(
                        <div>
                            <Link to='/Pages'>
                                <div className="Cloud_">
                                    <div className="one"><img src={picture.pic1} /></div>
                                    <div className="two">{picture.txt1}</div>
                                </div>
                            </Link>
                            <Link to='/Pages'>
                                <div className="Cloud_">
                                    <div className="one"><img src={picture.pic2} /></div>
                                    <div className="two">{picture.txt2}</div>
                                </div>
                            </Link>
                        </div>
                    ))
                }
                <Link to='/Create'>
                    <div className="Cloud_add">
                        <div>-----------------------------------------------------------</div>
                        <a href="#" target="_blank"><img className="Cloud_img" src={require("../../image/add.png")}/></a>
                    </div>
                </Link>
            </div>
        )
    }
}