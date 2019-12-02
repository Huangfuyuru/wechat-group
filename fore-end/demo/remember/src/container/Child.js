import React, { Component } from 'react'
import { NavBar, Icon,TabBar,Flex, WhiteSpace } from 'antd-mobile';
import '../css/child.css'
import {BrowserRouter as Router, Route,Link} from 'react-router-dom'

export default class Child extends Component {
    constructor(){
        super();
        this.state={
            cindex_src:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1111897272,37524471&fm=26&gp=0.jpg',
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
    render() {
        return (
            <div className='child'>
                <NavBar
                style={{background:'#FFBF2D',fontWeight:'bold'}}
                onLeftClick={() => console.log('onLeftClick')}
                >亲子</NavBar>
                <div className='child_first'>
                    <span>轻触上传头像<input 
                    id='img'
                    onChange={(e)=>{
                        this.setState({src:e.target.files[0].name})
                    console.log(e.target.files[0])
                    }}                             
                    type='file'  
                    accept="image/*" 
                    capture="camera" 
                    name='uimage' 
                    placeholder='轻触上传头像'/></span>    
                    <img src={this.state.cindex_src} alt='自定义照片墙'/>
                </div>
                <div className='child_second'>
                    <Flex>
                        <Flex.Item>
                            <Link to='/child/cpictures'>云相册</Link>
                        </Flex.Item>
                        <Flex.Item>
                            <Link to='/child/csound'>语音记事</Link>
                        </Flex.Item>
                        <Flex.Item>
                            <Link to='/child/cevents'>大事记</Link>
                        </Flex.Item>
                    </Flex>
                    <Flex>
                        <Flex.Item>
                            <Link to='/child/cgrowup'>成长记录</Link>
                        </Flex.Item>
                        <Flex.Item>
                            <Link to='/child/cstudy'>学业记录</Link>
                        </Flex.Item>
                        <Flex.Item>
                            <Link to='/child/cdairy'>日记</Link>
                        </Flex.Item>
                    </Flex>
                </div>
                <div>
                    {
                        this.state.cnews.map((cnews)=>(
                            <div className='child_third'>
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
