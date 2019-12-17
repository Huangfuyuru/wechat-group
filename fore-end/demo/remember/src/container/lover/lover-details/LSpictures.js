import React, { Component } from 'react'
import { NavBar} from 'antd-mobile';
import {Link} from "react-router-dom"
import "../../../css/lover.css"
export default class LSpictures extends Component {
    constructor(props){
        super(props)
        var lpicture = JSON.parse(localStorage.getItem('lpicture'));
        console.log(lpicture)
        this.state={
            count:0,
            pname:lpicture.pname,
            pid:lpicture.pid,
            dellist:[],
            lists:[],
            code:''
        }
    }
    componentDidMount(){
        console.log(this.state.lists)
            fetch(`http://localhost:3001/lover/lpictures/show?loverPhotoListid=${this.state.pid}`)
            .then(res=>res.json())
            .then(json=>{ 
                console.log('json',json)
                this.setState({
                    lists:json.msg
                },()=>{
                    console.log('点击具体相册',json)
                })
            })
    }
    delboxAppear=()=>{
        var delbox = document.getElementsByTagName('input');
        var delpictureswarn = document.getElementById('delpictureswarn');
        if(this.state.count%2==0){
            for(var i=0;i<delbox.length;i++){
                delbox[i].style.display='block';
                delbox[i].checked=false;
            }
        }else{
            for(var i=0;i<delbox.length;i++){
                delbox[i].style.display='none';
                delpictureswarn.style.display='none';
            }
        }
        this.setState({
            count:this.state.count+1
        })
    }
    check=()=>{
        var delpictureswarn = document.getElementById('delpictureswarn');
        var delbox = document.getElementsByTagName('input');
        for(var i=0;i<delbox.length;i++){
            if(delbox[i].checked){
                delpictureswarn.style.display = 'block'
            }
        }
    }
    delPictures=()=>{
        console.log(this.state.dellist)
        var dellist = JSON.stringify(this.state.dellist)
        fetch(`http://localhost:3001/lover/lpictures/ldelpictures`,{
            method:'POST',
            mode:'cors',
            headers:{
                'Content-Type':"application/x-www-form-urlencoded"
            },
            body:`pid=${this.state.pid}&loverPhotoid=${dellist}`
        }).then(res=>res.json())
        .then(json=>{
            console.log('shan',json)
           this.setState({
               lists:json.data,
               code:json.msg
           })
        })
        var delpicsconfirm=document.getElementById('delpicsconfirm');
        delpicsconfirm.style.display='none'
        var picsconfirmagain = document.getElementById('picsconfirmagain')
        picsconfirmagain.style.display='block'
    }
    render() {
        return (  
            <div className="scpicture">
                <NavBar
                    style={{
                    top:0,
                    width:'100%',
                    zIndex:'11',
                    position:'fixed',
                    height:'8vh',
                    background:'#FFBF2D',
                    color:'#fff',
                    fontWeight:'bolder',
                    }}
                    mode="light"
                    icon={'𡿨'}
                    onLeftClick={() => this.props.history.push('/lover/lpictures')}
                    rightContent={[
                        <span
                        className='iconfont icon-bianji'
                        style={{
                            marginRight:'2vw',
                            fontSize:'5vw',
                            fontWeight:'lighter',
                            letterSpacing:'1vw'
                        }}
                        onClick={this.delboxAppear} 
                        >编辑</span>,
                        ]}
                    ><span style={{
                        fontWeight:'bold',
                        fontSize:'6vw',
                        textIndent:'3vw',
                        letterSpacing:'3vw',
                        color:"white"
                    }}
                    >{this.state.pname}</span>
                </NavBar>
                <div className='scpicture_inner'>
                    {
                        this.state.lists&&this.state.lists.map((item,idx)=>(
                            <div className="scpicture_block"
                            key={item.id}
                            style={{
                                background:`url(${item.imgurl}) center center/cover no-repeat`,
                            }}>
                                <input
                                onClick={this.check}
                                name="pictures" 
                                type="checkbox" 
                                value={item.id} 
                                />
                            </div>
                        ))
                    }
                </div>

                <div id='delpictureswarn'>
                    <button
                    onClick={(e)=>{
                        e.target.parentNode.style.display='none'
                        var delbox = document.getElementsByTagName('input');
                        for(var i=0;i<delbox.length;i++){
                            delbox[i].style.display='none';
                            delbox[i].checked=false;
                        }
                    }}>返回</button>
                    <button
                    onClick={()=>{
                        var delpicsconfirm = document.getElementById('delpicsconfirm')
                        delpicsconfirm.style.display='block';
                        var delbox = document.getElementsByTagName('input');
                        var dels=[]
                        for(var i=0;i<delbox.length;i++){
                            if(delbox[i].checked){
                                dels.push(delbox[i].getAttribute('value'))
                            }
                        }
                        
                        this.setState({
                            dellist:dels
                        })
                    }}
                    >删除</button>
                </div>

                <div className='allpage_add'>
                    <p></p>
                    <Link
                    to={{
                    pathname:'/lover/lpictures/addpictures'
                    }}
                    ><i className='iconfont icon-jia'></i></Link>
                </div>
                <div id='delpicsconfirm'>
                    <div>确定删除？</div>
                    <button 
                    onClick={(e)=>{
                        e.target.parentNode.style.display='none';
                    }}
                    style={{
                        width:'25%',
                        height:'15%',
                        color:'#FFBF2D',
                        border:'none',
                        marginTop:'2vh',
                        background:'#fff',
                        borderRadius:'5px',
                        fontSize:'6vw',
                        marginRight:'10vw'
                    }}>返回</button>
                    <button 
                    onClick={this.delPictures}
                    style={{
                        width:'25%',
                        height:'15%',
                        color:'#FFBF2D',
                        border:'none',
                        marginTop:'2vh',
                        background:'#fff',
                        borderRadius:'5px',
                        fontSize:'6vw'
                    }}>确定</button>
                </div>
                <div id='picsconfirmagain'>
                <div>{this.state.code}</div>
                    <button 
                    onClick={(e)=>{
                        e.target.parentNode.style.display='none';
                    }}
                    style={{
                        width:'25%',
                        height:'15%',
                        color:'#FFBF2D',
                        border:'none',
                        marginTop:'2vh',
                        background:'#fff',
                        borderRadius:'5px',
                        fontSize:'6vw'
                    }}>确定</button>
                </div>
            </div>
        )
    }
}
