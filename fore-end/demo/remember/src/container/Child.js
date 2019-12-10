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
            cindex_src:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2037612692,2923078042&fm=26&gp=0.jpg',
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
            // console.log(json)
            this.setState({
                child_id:json[0].id,
                cindex_src:json[0].background
            });
        })
    }
    componentDidUpdate(prevProps,prevState){
        if(prevState !== this.state){
            console.log('BJ',this.state.cindex_src)
            console.log('id',this.state.child_id)
            fetch(`http://localhost:3001/child/changebackground`,{
                method:'POST',
                mode:'cors',
                headers:{
                    'Content-Type':"application/x-www-form-urlencoded"
                },
                body:`childsid=${this.state.child_id}&background=${this.state.cindex_src}`
            })
            .then(res=>res.json())
            .then(json=>(
                console.log(json)
            ))
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
        })
        .then(res=>res.json())
        .then(res=>(
            console.log(res.path),
            this.setState({
            cindex_src:res.path
        },console.log('POST',this.state.cindex_src))
        ))
        
    }
    changeChild=(e)=>{
        // this.setState({
        //     child_id:e.target.key,
        //     cindex_src:e.target.value
        // })
        console.log('li',e.target)
        console.log('value',e.target.value)
        console.log('id',e.target.id)
        // console.log('e',e.target.value[0])
        // console.log('e',e.target.value[1])
        // ,()=>{
        //     for(var i=0;i<this.state.change_id.length;i++){
        //         if(this.state.child_id==this.state.change_id[i]){
        //             this.setState({
        //                 cindex_src:this.state.change_id[i].background
        //             })
        //         }
        //     }
        // })
        // console.log('state',this.state.child_id)
        // console.log('state',this.state.cindex_src)
        var tag = document.getElementById('tag');
        tag.style.display='none';
        this.setState({
            menu_count:this.state.menu_count+1
        })
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
                        height:'8vh',
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
                            console.log('进入')
                            tag.style.display='block';
                            fetch(`http://localhost:3001/child/change?usersid=${this.state.uid}`)
                            .then(res=>res.json())
                            .then(json=>{
                                var array=[];
                                for(var i=0;i<json.length;i++){
                                    array[i]=json[i];
                                }
                                this.setState({
                                    change_id:array
                                })
                                // console.log(json)
                                // console.log(this.state.change_id)
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
                    letterSpacing:'3vw'
                }}
                >亲子</span></NavBar>
                <div id="tag">
                    <div></div>
                    <p>
                        {
                            this.state.change_id.map((item,idx)=>(
                            <li key={idx} id={item.id} value={item.background} 
                            onClick={this.changeChild}>{item.name}</li>
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
            </div>
        )
    }
}
