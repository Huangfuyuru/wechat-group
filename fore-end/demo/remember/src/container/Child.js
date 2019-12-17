import React, { Component } from 'react'
import { NavBar,Flex,Icon } from 'antd-mobile';
import '../css/child.css'
import {Link} from 'react-router-dom'
export default class Child extends Component {
    constructor(props){
        super(props);
        var uid = JSON.parse(localStorage.getItem('uid'));
        this.state={
            menu_count:0,
            uid:uid,
            change_id:[],
            child_id:'',
            cindex_src:'',
            cnews:[{
                ctime:'引导',
                cpic_src:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1310375106,1926353045&fm=26&gp=0.jpg',
                ccontent:'在这里展示您最近三篇日记大致内容'
            }]
        }
    }
    componentDidMount(){
        console.log('第一次加载');
        fetch(`http://localhost:3001/child`,{
            method:'POST',
            mode:'cors',
            headers:{
                'Content-Type':"application/x-www-form-urlencoded"
            },
            body:`uid=${this.state.uid}`
        }).then(res=>res.json())
        .then(json=>{
            console.log('json',json)
            this.setState({
                child_id:JSON.parse(localStorage.getItem('cid'))||json[0].id,
                cindex_src:JSON.parse(localStorage.getItem('cbackground'))||json[0].background,
                change_id:json
            },()=>{
                localStorage.setItem('cid',JSON.stringify(this.state.child_id));
                localStorage.setItem('cbackground',JSON.stringify(this.state.cindex_src))
            });
        })
    }
    componentDidUpdate(prevProps,prevState){
        console.log('更新')
        if(prevState.cindex_src != this.state.cindex_src){
            var url = 'http://localhost:3001/child/changebackground';
            fetch(url,{
                method:'POST',
                headers:{
                    'Content-Type':"application/x-www-form-urlencoded"
                },
                body:`childsid=${Number(this.state.child_id)}&background=${this.state.cindex_src}`
            }).then(res=>res.json())
            .then(json=>{
                console.log('json',json)
            })
        }
        
    }
    upfile=()=>{
        var file=document.getElementById('img').files[0];
        var url = 'http://localhost:3001/img';
        var form = new FormData();
        var img='';
        form.append("file",file);
        fetch(url,{
            method:'POST',
            body:form
        })
        .then(res=>res.json())
        .then(res=>(
            console.log(res.path),
            img=res.path,
            this.setState({
                cindex_src:res.path
            },()=>{
                localStorage.setItem('cbackground',JSON.stringify(this.state.cindex_src))
            })
        ))

        console.log(img)
        
    }
    changeChild=(id,background)=>{
        console.log(id,background)
        this.setState({
            child_id:id,
            menu_count:this.state.menu_count+1,
            cindex_src:background
        },()=>{
            localStorage.setItem('cid',JSON.stringify(this.state.child_id));
            localStorage.setItem('cbackground',JSON.stringify(this.state.cindex_src))
        })
        var tag = document.getElementById('tag');
        tag.style.display='none';
    }
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
                            tag.style.display='block';
                        }else{
                            tag.style.display='none';
                        }
                        this.setState({
                            menu_count:this.state.menu_count+1
                        });

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
                <div id="tag">
                    <div></div>
                    <p>
                        { 
                            this.state.change_id&&this.state.change_id.map((item,idx)=>(
                            <li key={item.id}
                            onClick={()=>this.changeChild(item.id,item.background)}>{item.name}</li>
                            ))
                        }
                    </p>
                </div>
                <div className='child_first'>                   
                    <span style={{
                        zIndex:'10',
                        display:'inline-block',
                        width:'100%',
                        fontSize:'5vw',
                        top:'8vh',
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
                    <div style={{
                        marginTop:'8.8vh'
                    }}>
                        <img 
                        src={this.state.cindex_src} alt='自定义照片墙'/>
                    </div>    
                </div>
                <div className='child_second'>
                    <Flex>
                        <Flex.Item>
                            <Link 
                            to={{
                                pathname:'/child/cpictures',
                                state:this.state.child_id
                            }}
                            >云相册</Link>
                        </Flex.Item>
                        <Flex.Item>
                            <Link 
                            to={{
                                pathname:'/child/csound',
                                state:this.state.child_id
                            }}
                            >语音记事</Link>
                        </Flex.Item>
                        <Flex.Item>
                            <Link 
                            to={{
                                pathname:'/child/cevents',
                                state:this.state.child_id
                            }}
                            >大事记</Link>
                        </Flex.Item>
                    </Flex>
                    <Flex>
                        <Flex.Item>
                            <Link 
                            to={{
                                pathname:'/child/cgrowup',
                                state:this.state.child_id
                            }}
                            >成长记录</Link>
                        </Flex.Item>
                        <Flex.Item>
                            <Link
                            to={{
                                pathname:'/child/cstudy',
                                state:this.state.child_id
                            }} 
                            >学业记录</Link>
                        </Flex.Item>
                        <Flex.Item>
                            <Link 
                            to={{
                                pathname:'/child/cdairy',
                                state:this.state.child_id
                            }}
                            >日记</Link>
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
            </div>
        )
    }
}
