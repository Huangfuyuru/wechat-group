import React, { Component } from 'react'
import { TabBar } from 'antd-mobile';
// import {Route} from 'react-router-dom'
import {BrowserRouter as Router, Route,Link} from 'react-router-dom'
import '../css/index.css'
import Child from './Child';
import My from './My';
import Lover from "./Lover"
import Friends from "./Recommend"
// import Friends from "./Friends"
export default class Child_index extends Component {
    constructor(props) {
        super(props);
        var uid = JSON.parse(localStorage.getItem('uid'));
        this.state = {
          userid:uid,
          cpic:'',
          lpic:'',
          cid:'',
          lid:''
        };
      }
    addClass=(e)=>{
        var tabs=document.getElementsByClassName('index_tab');
        for(var i=0;i<tabs.length;i++){
            tabs[i].classList.remove('active');
        };
        e.target.classList.add('active');
    }
    getMessage=(e)=>{
        var eid=e.target.id;
        fetch(`http://localhost:3001/${eid}`,{
            method:'POST',
            mode:'cors',
            headers:{
                'Content-Type':"application/x-www-form-urlencoded"
            },
            body:`uid=${this.state.userid}`
        }).then(res=>res.json())
        .then(json=>{

            switch(eid){
                case 'child':
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
                    break;
            }
        })
    }
    render() {
        return (
            <div className='index'>
                <footer className='index_footer'>
                    <Link  
                    onClick={this.getMessage} 
                    to={{
                        pathname:'/index/child',
                        state:{
                            uid:this.state.userid
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
                            uid:this.state.userid
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
                        pathname:'/index/recommend',
                        state:this.state.userid
                    }} >
                        <div id='friend' onClick={this.addClass} className='index_tab'>
                            <i
                            className='iconfont icon-weibiaoti-_huaban'
                            />
                            <p>推荐</p>
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
