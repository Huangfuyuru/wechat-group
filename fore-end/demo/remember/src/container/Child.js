import React, { Component } from 'react'
import { NavBar,Flex,Icon } from 'antd-mobile';
import '../css/child.css'
import {Link} from 'react-router-dom'
export default class Child extends Component {
    constructor(props){
        super(props);
        let a = this.props.location.state
        console.log('孩子',this.props.location.state)
        this.state={
            uid:a.uid,
            change_id:[],
            child_id:'',
            cindex_src:'',
            // child_id:this.props.location.state.cid,
            // cindex_src:this.props.location.state.cpic,
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
        console.log('完成')
        fetch(`http://localhost:3001/child`,{
            method:'POST',
            mode:'cors',
            headers:{
                'Content-Type':"application/x-www-form-urlencoded"
            },
            body:`uid=${this.state.uid}`
        }).then(res=>res.json())
        .then(json=>{
            this.setState({
                child_id:json[0].id,
                cindex_src:json[0].background
            });
        })
    }
    componentDidUpdate(){
        fetch(`http://localhost:3001/child`,{
            method:'POST',
            mode:'cors',
            headers:{
                'Content-Type':"application/x-www-form-urlencoded"
            },
            body:`uid=${this.state.uid}`
        }).then(res=>res.json())
        .then(json=>{
            this.setState({
                child_id:json[0].id,
                cindex_src:json[0].background
            });
        })
    }
    upfile=()=>{
        var file=document.getElementById('img').files[0];
        var url = 'http://localhost:3001/img';
        var form = new FormData();
        form.append("file",file);
        fetch(url,{
            method:'POST',
            body:form
        }).then(res=>res.json())
        .then(res=>(this.setState({
            cindex_src:res.path
        },()=>{
            fetch(`http://localhost:3001/child/changebackground?childsid=${this.state.child_id}&background=${this.state.cpic_src}`,{
            method:'GET',
            mode:'cors',
            headers:{
                'Content-Type':"application/x-www-form-urlencoded"
            },
        })}
        )))
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
                    rightContent={[
                    <i
                    className='iconfont icon-qiehuan'
                    style={{
                        marginRight:'2vw',
                        fontSize:'8.5vw',
                        fontWeight:'lighter'
                    }}
                    onClick={()=>{
                        console.log('切换亲子')
                    }} 
                    key="1" type="ellipsis" />,
                    ]}
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
                    onChange={this.upfile}                           
                    type='file'  
                    accept="image/*" 
                    capture="camera" 
                    name='uimage' 
                    /></span>
                    <div>
                        <img 
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
                <div style={{paddingBottom:'9vh'}}>
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
                <div className='choosechild'>

                </div>
            </div>
        )
    }
}
