import React, { Component } from 'react'
import { TabBar } from 'antd-mobile';
// import {Route} from 'react-router-dom'
// import {BrowserRouter as Router, Route,Link} from 'react-router-dom'

import Child from './Child';
import My from './My';
import Lover from "./Lover"
// import Friends from "./Friends"
export default class Child_index extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selectedTab: 'yellowTab',
          hidden: false,
          fullScreen: false,
        //   userid:this.props.location.state.userid
        };
        // console.log(this.state.userid)
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
            <div>
                <div style={{ 
                    position: 'fixed', 
                    height: '100%', 
                    width: '100%', 
                    top: 0 
                    }}>
                    <TabBar
                    unselectedTintColor="#808080"
                    tintColor="#FFBF2D"
                    barTintColor="white"
                    >
                        {/* <Link>你好</Link> */}
                    <TabBar.Item
                        title="亲子"
                        key="index"
                        icon={
                        <i
                        className='iconfont icon-qinzi'
                        />
                        }
                        selectedIcon={
                        <i
                        className='iconfont icon-qinzi'
                        />
                        }
                        selected={this.state.selectedTab === 'blueTab'}
                        onPress={() => {
                            this.props.history.push({
                                pathname:'/index/child',
                            })
                        this.setState({
                            selectedTab: 'blueTab',
                        });
                        }}
                    >
                        <Child/>
                    </TabBar.Item>

                    <TabBar.Item
                        icon={
                        <i
                        className='iconfont icon-aiqing'
                        />
                        }
                        selectedIcon={
                        <i
                        className='iconfont icon-aiqing'
                        />
                        }
                        title="爱人"
                        key="idea"
                        //badge={'new'}//消息提示显示new
                        selected={this.state.selectedTab === 'redTab'}
                        onPress={() => {
                            this.props.history.push({
                                pathname:'/index/lover',
                            })
                        this.setState({
                            selectedTab: 'redTab',
                        });
                        }}
                    >
                        <Lover/>
                    </TabBar.Item>

                    <TabBar.Item
                        icon={
                        <i
                        className='iconfont icon-haoyou'
                        />
                        }
                        selectedIcon={
                        <i
                        className='iconfont icon-haoyou'
                        />
                        }
                        title="朋友"
                        key="mall"
                        //dot //小红点
                        selected={this.state.selectedTab === 'greenTab'}
                        onPress={() => {
                            this.props.history.push({
                                pathname:'/index/friends',
                            })
                        this.setState({
                            selectedTab: 'greenTab',
                        });
                        }}
                    >
                        {/* <Friends/> */}
                    </TabBar.Item>

                    <TabBar.Item
                        icon={
                        <i
                        className='iconfont icon-gerenzhongxin'
                        />
                        }
                        selectedIcon={
                        <i
                        className='iconfont icon-gerenzhongxin'
                        />
                        }
                        title="我的"
                        key="mine"
                        selected={this.state.selectedTab === 'yellowTab'}
                        onPress={() => {
                            this.props.history.push({
                                pathname:'/index/my',
                            })
                        this.setState({
                            selectedTab: 'yellowTab',
                        });
                        }}
                    >
                        <My/>
                    </TabBar.Item>
                    </TabBar>
                </div>
            </div>
        )
    }
}



{/* 添加身高 */}
<form method='post' action='http://localhost:3001/child/cgrowup/ccgrowup'>
<div className="Create_">
    身高(cm)：
    <input name='length' className="one" type="text" placeholder="单行输入"></input>
</div>
{/* 添加体重 */}
<div className="Create_">
    体重(kg)：
    <input name='weight' className="one" type="text" placeholder="单行输入"></input>
</div>
{/* 日期 */}
<div className="Create_">
    年龄(岁)：
    <input name='age' className="one" type="text" placeholder="单行输入"></input>
</div>
{/* 点击创建 */}
{/* <Link to='/child/cgrowup'> */}
    <button type="submit" className="Create_picture">添加记录</button>
{/* </Link> */}
</form>