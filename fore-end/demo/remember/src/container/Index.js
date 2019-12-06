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
          userid:this.props.location.state.userid
        };
        console.log(this.state.userid)
        // console.log(this.props.location.state)
      }
      componentDidMount(){
        fetch('http://localhost:3001/child')
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({child_id:res.data,cindex_src:res.data,cnews:res.data});
        })
    }
    render() {
        return (
            <div className='index'>
                <div>
                    
                    <Route exact path='/index' compoment={My}/>
                    {/* <Route path='/index/child' compoment={Child}/>
                    <Route path='/index/lover' compoment={Lover}/>
                    <Route path='/index/friends' compoment={Friends}/>
                    <Route path='/index/my' compoment={My}/> */}
                </div>
                <footer className='index_footer'>
                    <Link to='/index/child'>
                        <div>
                        <i
                        className='iconfont icon-qinzi'
                        />
                        <p>亲子</p>
                        </div>
                    </Link>
                    <Link to='/index/lover'>
                        <div>
                        <i
                        className='iconfont icon-aiqing'
                        />
                        <p>爱人</p>
                        </div>
                    </Link>
                    <Link to='/index/friends'>
                        <div>
                        <i
                        className='iconfont icon-haoyou'
                        />
                        <p>好友</p>
                        </div>
                    </Link>
                    <Link to='/index/my'>
                        <div>
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
