import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import { NavBar,Flex } from 'antd-mobile';

import "../css/lover.css"
export default class lover_home extends Component {
    constructor(){
        super();
        this.state={
            cindex_src:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3855483388,2908594882&fm=26&gp=0.jpg",
            cnews:[{
                ctime:'现 在',
                cpic_src:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1310375106,1926353045&fm=26&gp=0.jpg',
                ccontent:'你的脖子真可爱，顶着一个猪脑袋'
            },
            {
                ctime:'刚 才',
                cpic_src:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1310375106,1926353045&fm=26&gp=0.jpg',
                ccontent:'醒来觉得甚是爱你~'
            }]
        }
    }
    render() {
        return (
            <div style={{height:"100%",width:"100%"}}>
                 <NavBar style={{backgroundColor:"#FFBF2D",color:"white"}}><span style={{
                    fontWeight:'bold',
                    fontSize:'6vw',
                    textIndent:'3vw',
                    letterSpacing:'3vw'
                }}
                >爱人</span></NavBar>
                 <img src={this.state.cindex_src} alt=""  style={{height:"28%",width:"94%",paddingTop:"5%",marginLeft:"3%"}} ></img>  
                <div className="lover-home-first">
                 <Link to ="/lover/lpictures"><button className="lover-button">云相册</button></Link>
                 <button className="lover-button">语音记事</button>
                 <Link to ="/lover/ldairy"> <button className="lover-button">日记</button> </Link>
                 <p style={{float:"left",color:"white"}}>hhhhhh</p>
                 <Link to ="/lover/llists"><button className="lover-button">恋爱清单</button></Link> 
                 <Link to ="/lover/lsouvenir"><button className="lover-button">纪念日</button></Link>    
                </div>
   
                <div style={{paddingBottom:'8vh'}}>
                    {
                        this.state.cnews.map((cnews,idx)=>(
                            <div className='child_third' key={idx}>
                                <i></i>
                                <li>{cnews.ctime}</li>
                                <Flex>
                                    <Flex.Item>
                                        <img src={cnews.cpic_src} width='100%'/>                                  
                                    </Flex.Item>
                                    <Flex.Item>
                                        <span>{cnews.ccontent}</span>
                                    </Flex.Item>
                                </Flex>
                            </div>
                        ))
                    }
                </div>
             
            </div>
        )
    }
}
