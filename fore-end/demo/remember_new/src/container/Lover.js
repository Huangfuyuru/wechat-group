import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import { NavBar,Flex ,WingBlank} from 'antd-mobile';
import "../css/lover.css"
export default class lover_home extends Component {
    constructor(props){
        super(props);
        var uid = JSON.parse(localStorage.getItem('uid'));
        this.state={
            uid:uid,
            lover_id:'',
            cindex_src:"",
            cnews:[{
                ctime:'以下内容仅自己可见',
                cpic_src:'http://hbimg.b0.upaiyun.com/5e684526ee92464a8ece366b7d065488c24b8b3f4397-wktEBb_fw658',
                ccontent:'在这里展示您最近三篇日记大致内容'
            }
        ]
        }
    }
    componentDidMount(){
        fetch(`http://localhost:3001/lover`,{
            method:'POST',
            mode:'cors',
            headers:{
                'Content-Type':"application/x-www-form-urlencoded"
            },
            body:`uid=${this.state.uid}`
        })
        .then(res=>res.json())
        .then(json=>{ 
            console.log(json)
            this.setState({
                lover_id:JSON.parse(localStorage.getItem('lid'))||json[0].id,
                lover_name:json[0].name,
                cindex_src:JSON.parse(localStorage.getItem('lbackground'))||json[0].background
            },()=>{
                localStorage.setItem('lid',JSON.stringify(this.state.lover_id))
                // localStorage.setItem('lbackground',JSON.stringify(this.state.cindex_src))
            }
            );
        })
    }
    
    componentDidUpdate(prevProps,prevState){
        if(prevState.cindex_src != ""){
            var url = 'http://localhost:3001/lover/changebackground';
            fetch(url,{
                method:'POST',
                headers:{
                    'Content-Type':"application/x-www-form-urlencoded"
                },
                body:`lover_id=${Number(this.state.lover_id)}&background=${this.state.cindex_src}`
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
        form.append("file",file);
        fetch(url,{
            method:'POST',
            body:form
        }).then(res=>res.json())
        .then(res=>(this.setState({
            cindex_src:res.path},()=>{
                // localStorage.setItem('lbackground',JSON.stringify(this.state.cindex_src))
            })))
    }
    render() {
        return (
            <div style={{width:"100%",backgroundColor:"white"}}>
                 <NavBar style={{
                     width:'100%',
                     zIndex:'11',
                     position:'fixed',
                     background:'#FFBF2D',
                     height:'8vh',
                }}><span style={{
                    fontWeight:'bold',
                    fontSize:'6vw',
                    textIndent:'3vw',
                    letterSpacing:'3vw'
                }}
                >爱人</span></NavBar>
                  <div className='lover_first'>                   
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
                    }}
                    >
                        <img 
                        src={this.state.cindex_src} alt='自定义照片墙'/>
                    </div>  
            </div> 
            <div className='child_second'>
                    <Flex>
                        <Flex.Item>
                            <Link 
                            to={{
                                pathname:'/lover/lpictures',
                            }}
                            >云相册</Link>
                        </Flex.Item>
                        <Flex.Item>
                            <Link 
                            to={{
                                pathname:'/lover/lsound',
                            }}
                            >语音记事</Link>
                        </Flex.Item>
                        <Flex.Item>
                            <Link 
                            to={{
                                pathname:'/lover/ldairy',
                            }}
                            >恋爱日记</Link>
                        </Flex.Item>
                    </Flex>
                    <Flex>
                        <Flex.Item>
                            <Link 
                            to={{
                                pathname:'/lover/llists',
                            }}
                            >恋爱清单</Link>
                        </Flex.Item>
                        <Flex.Item>
                            <Link
                            to={{
                                pathname:'/lover/lsouvenir',
                                lover_id:this.state.lover_id
                            }} 
                            >纪念日</Link>
                        </Flex.Item>
                    </Flex>
                </div>
                 {/* <img src={this.state.cindex_src} alt=""  style={{height:"28%",width:"94%",paddingTop:"5%",marginLeft:"3%"}} ></img>   */}                
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
