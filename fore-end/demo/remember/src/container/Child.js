import React, { Component } from 'react'
import { NavBar,Flex } from 'antd-mobile';
import '../css/child.css'
import {Link} from 'react-router-dom'
export default class Child extends Component {
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
                    background:'#FFBF2D',
                    height:'8vh'
                }}
                ><span style={{
                    fontWeight:'bold',
                    fontSize:'6vw',
                    textIndent:'3vw',
                    letterSpacing:'3vw'
                }}
                >亲子</span></NavBar>
                <div className='child_first'>                   
                    <span style={{
                        zIndex:'10',
                        display:'inline-block',
                        width:'100%',
                        fontSize:'5vw',
                        position:'relative',
                        color:'#000',
                        background:'rgb(255,191,45,0.3)'
                    }}>轻触上传精选照片<input 
                    id='img'
                    onChange={(e)=>{
                        this.setState({src:e.target.files[0].name})
                    console.log(e.target.files[0])
                    }}                             
                    type='file'  
                    accept="image/*" 
                    capture="camera" 
                    name='uimage' 
                    /></span>
                    <div>
                        <img 
                        style={{}}
                        src={this.state.cindex_src} alt='自定义照片墙'/>
                    </div>    
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
