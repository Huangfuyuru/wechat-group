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
                ctime:'现 在',
                cpic_src:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1310375106,1926353045&fm=26&gp=0.jpg',
                ccontent:'你的脖子真可爱，顶着一个猪脑袋'
            },
            {
                ctime:'昨 天',
                cpic_src:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1310375106,1926353045&fm=26&gp=0.jpg',
                ccontent:'你的脖子真可爱，顶着一个猪脑袋'
            },
            {
                ctime:'前 天',
                cpic_src:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1310375106,1926353045&fm=26&gp=0.jpg',
                ccontent:'你的脖子真可爱，顶着一个猪脑袋'
            }
        ]
        }
    }
    componentDidMount(){
        fetch(`http://localhost:3001/lover/changebackground`,{
            method:'POST',
            mode:'cors',
            headers:{
                'Content-Type':"application/x-www-form-urlencoded"
            },
            body:`uid=${this.state.uid}`
        })
        .then(res=>res.json())
        .then(json=>{ 
            this.setState({
                lover_id:JSON.parse(localStorage.getItem('lid'))||json[0].id,
                lover_name:json[0].name,
                cindex_src:JSON.parse(localStorage.getItem('lbackground'))||json[0].background
            },()=>{
                localStorage.setItem('lid',JSON.stringify(this.state.lover_id))
                localStorage.setItem('lbackground',JSON.stringify(this.state.cindex_src))
            }
            );
        })
    }
    
    componentDidUpdate(prevProps,prevState){
        console.log('更新')
        if(prevState.cindex_src != this.state.cindex_src){
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
                localStorage.setItem('lbackground',JSON.stringify(this.state.cindex_src))
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
                 {/* <img src={this.state.cindex_src} alt=""  style={{height:"28%",width:"94%",paddingTop:"5%",marginLeft:"3%"}} ></img>   */}
                 <WingBlank>
                <div className="lover-home-first">
                 <Link to ="/lover/lpictures"><button className="lover-button">云相册</button></Link>
                 <Link to= "/lover/lsound"><button className="lover-button">语音记事</button></Link>
                 <Link to ={{pathname:"/lover/ldairy"}}> <button className="lover-button">日记</button> </Link>
                 <p style={{float:"left",color:"white"}}>hhhhhh</p>
                 <Link to ="/lover/llists"><button className="lover-button">恋爱清单</button></Link> 
                 <Link to =
                  {{
                     pathname:"/lover/lsouvenir",
                     state:{
                         lover_id:this.state.lover_id
                     }
                 }}
                 ><button className="lover-button">纪念日</button></Link>    
                </div>
                </WingBlank>
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
