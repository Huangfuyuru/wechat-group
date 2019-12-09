import React, { Component } from 'react'
import { TabBar } from 'antd-mobile';
// import {Route} from 'react-router-dom'
import {BrowserRouter as Router, Route,Link} from 'react-router-dom'
import '../css/index.css'
import Child from './Child';
import My from './My';
import Lover from "./Lover"
import Friends from "./Friends"
// import Friends from "./Friends"
export default class Child_index extends Component {
    constructor(props) {
        super(props);
        this.state = {
          userid:this.props.location.state.userid,
          cpic:'',
          lpic:'',
          cid:'',
          lid:''
        };
        // console.log(this.props.location)
        // console.log(this.props.location.state)
        console.log(this.state.userid)
      }
    // componentDidMount(){
    //     fetch('http://localhost:3001/login')
    //     .then((res)=>res.json())
    //     .then((json)=>{
    //         this.setState({userid:json.id});
    //     })
    // }
    // componentDidUpdate(){ 
    //     fetch('http://localhost:3001/login')
    //     .then((res)=>res.json())
    //     .then((json)=>{
    //         this.setState({userid:json.id});
    //     })
    // }
    addClass=(e)=>{
        var tabs=document.getElementsByClassName('index_tab');
        for(var i=0;i<tabs.length;i++){
            tabs[i].classList.remove('active');
        };
        e.target.classList.add('active');
        console.log(e.target.className);
    }
    getMessage=(e)=>{
        var eid=e.target.id;
        console.log(e.target.id);
        console.log('id:',this.state.userid);
        fetch(`http://localhost:3001/${eid}`,{
            method:'POST',
            mode:'cors',
            headers:{
                'Content-Type':"application/x-www-form-urlencoded"
            },
            body:`uid=${this.state.userid}`
        }).then(res=>res.json())
        .then(json=>{
            console.log(json);
            console.log(json[0].background);
            console.log(json[0].id);
            switch(eid){
                case 'child':
                    console.log('eid')
                    this.setState({
                        cid:json[0].id,
                        cpic:json[0].background
                    })
                    break;
                case 'lover':
                    this.setState({
                        lid:json[0].id,
                        lpic:json[0].background
                    })
                    break;
                default:
                    console.log(`this is ${eid}`);
                    break;
            }
        })
    }
    render() {
        console.log('cid',this.state.cid)
        return (
            <div className='index'>
                <div>
                    
                </div>
                <footer className='index_footer'>
                    <Link  
                    onClick={this.getMessage} 
                    to={{
                        pathname:'/index/child',
                        state:{
                            cid:this.state.cid,
                            cpic:this.state.cpic
                        }
                    }}
                    >
                        <div id='child'  onClick={this.addClass} className='index_tab'>
                            <i
                            className='iconfont icon-qinzi'
                            />
                            <p>亲子</p>
                        </div>
                    </Link>
                    <Link 
                    onClick={this.getMessage} 
                    to={{
                        pathname:'/index/lover',
                        state:{
                            lid:this.state.lid,
                            lpic:this.state.lpic
                        }
                    }}
                    >
                        <div id='lover'  onClick={this.addClass} className='index_tab'>
                            <i
                            className='iconfont icon-aiqing'
                            />
                            <p>爱人</p>
                        </div>
                    </Link>
                    <Link 
                    onClick={this.getMessage} 
                    to={{
                        pathname:'/index/friend',
                        state:this.state.userid
                    }} >
                        <div id='friend' onClick={this.addClass} className='index_tab'>
                            <i
                            className='iconfont icon-haoyou'
                            />
                            <p>好友</p>
                        </div>
                    </Link>
                    <Link
                    onClick={this.getMessage} 
                    to={{
                        pathname:'/index/my',
                        state:this.state.userid
                    }}>
                        <div id='my' onClick={this.addClass} className='index_tab'>
                            <i
                            className='iconfont icon-gerenzhongxin'
                            />
                            <p>我的</p>
                        </div>
                    </Link>
                </footer>
            </div>
        )
    }
}
