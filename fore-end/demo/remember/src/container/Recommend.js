import React, { Component } from 'react'
import { NavBar,Flex } from 'antd-mobile';
import '../css/child.css'
import {Link} from 'react-router-dom'
export default class Recommend extends Component {
    constructor(){
        super();
        this.state={
            child_id:'',
            cindex_src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575287176951&di=956b2ed9d8a0421af46e81e7b2a0f45b&imgtype=0&src=http%3A%2F%2Fwww.gacedesign.com%2Fuploads%2Fimage%2F20170710%2F1499689128.jpg',
            cnews:[{
                ctime:'现在',
                cpic_src:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1310375106,1926353045&fm=26&gp=0.jpg',
                ccontent:'你的脖子真可爱，顶着一个猪脑袋'
            },
            {
                ctime:'刚才',
                cpic_src:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1310375106,1926353045&fm=26&gp=0.jpg',
                ccontent:'醒来觉得甚是爱你~'
            }]
        }
    }
    componentDidMount(){
        fetch('')
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({child_id:res.data,cindex_src:res.data,cnews:res.data});
        })
    }
    
    // componentDidUpdate(prevProps,prevState){
    //     if(prevProps.match.params.page!==this.props.match.params.page){
    //         fetch('https://cnodejs.org/api/v1/topics?page='+1)
    //             .then((res)=>res.json())
    //             .then((res)=>{
    //                     this.setState({data:res.data});
    //                 })
    //     }
    // }
    render() {
        return (
            <div className='child'>
                    <NavBar
                    style={{
                        width:'100%',
                        zIndex:'11',
                        position:'fixed',
                        background:'#FFBF2D',
                        height:'8vh'
                    }}
                ><span style={{
                    fontWeight:'bold',
                    fontSize:'6vw',
                    textIndent:'3vw',
                    letterSpacing:'3vw'
                }}
                >推荐</span></NavBar>
                
            </div>
        )
    }
}
