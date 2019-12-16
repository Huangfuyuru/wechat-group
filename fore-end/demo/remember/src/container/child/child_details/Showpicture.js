import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { NavBar, Icon } from 'antd-mobile';
import '../../../css/child.css'
export default class Showpicture extends Component {
    constructor(props){
        super(props);
        var cpicture = JSON.parse(localStorage.getItem('cpicture'));
        this.state={
            count:0,
            pname:cpicture.pname,
            pid:cpicture.pid,
            dellist:[],
            lists:[]
        }
    }
    componentDidMount(){
        fetch(`http://localhost:3001/child/cpictures/show?childPhotoListid=${this.state.pid}`)
        .then((res)=>res.json())
        .then(json=>{
            this.setState({
                lists:json
            })
            console.log(json)
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
        fetch(`http://localhost:3001/child/cpictures/cdelpictures`,{
            method:'POST',
            mode:'cors',
            headers:{
                'Content-Type':"application/x-www-form-urlencoded"
            },
            body:`pid=${this.state.pid}&childPhotoid=${dellist}`
        }).then(res=>res.json())
        .then(json=>{
            console.log(json)
        })
        var delpicsconfirm=document.getElementById('delpicsconfirm');
        delpicsconfirm.style.display='none'
    }
    render() {
        return (
            // 相册页面
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
                    onLeftClick={() => this.props.history.push('/child/cpictures')}
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
                            value={item.id}
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
                        // console.log(e.target.parentNode.id)
                    }}>返回</button>
                    <button
                    onClick={()=>{
                        var delpicsconfirm = document.getElementById('delpicsconfirm')
                        delpicsconfirm.style.display='block';
                        var delbox = document.getElementsByTagName('input');
                        var dels=[]
                        for(var i=0;i<delbox.length;i++){
                            if(delbox[i].checked){
                                dels.push(delbox[i].parentNode.getAttribute('value'))
                                // console.log(delbox[i].parentNode.getAttribute('value'))
                            }
                        }
                        this.setState({
                            dellist:dels
                        })
                    }}
                    >删除</button>
                </div>

                <div id='delpicsconfirm'>
                    <div>确定删除？</div>
                    <button onClick={(e)=>{
                        e.target.parentNode.style.display='none';
                    }}>返回</button>
                    <button onClick={this.delPictures}>确定</button>
                </div>
                <div className='allpage_add'>
                    <p></p>
                    <Link
                    to={{
                    pathname:'/child/cpictures/addpictures',
                    state:{
                        cid:this.state.cid
                    }
                    }}
                    ><i className='iconfont icon-jia'></i></Link>
              </div>
            </div>
        )
    }
}