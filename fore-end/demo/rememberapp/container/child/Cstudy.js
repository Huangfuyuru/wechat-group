import React, { Component } from 'react';
import { Tabs, WhiteSpace,NavBar,Icon,TabBar } from 'antd-mobile';
import moment from 'moment';
import '../../css/child.css'
import {Link} from 'react-router-dom';
import line from '../../image/line2.png'
export default class Cstudy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'blueTab',
      hidden: false,
      fullScreen: false,
      lists:[
        {
          chinese:'98',
          math:'100',
          english:'95',
          setdate:'12-16'
        },
        {
          chinese:'98',
          math:'100',
          english:'95',
          setdate:'12-16'
        },
        {
          chinese:'98',
          math:'100',
          english:'95',
          setdate:'12-16'
        },
        {
          chinese:'98',
          math:'100',
          english:'95',
          setdate:'12-16'
        },
        {
          chinese:'98',
          math:'100',
          english:'95',
          setdate:'12-16'
        },
      ]
    };
  }
  // 加载外部数据用componentDidMount
  componentDidMount(){
    let path = this.props.match.params.id
    fetch(``)
    .then((res)=>res.json())
    .then((res)=>{
        this.setState({data:res.data});
    })
  }

  componentDidUpdate(Props,State){
    if(Props.location.search !== this.props.location.search){
        let path = this.props.match.params.id
        console.log('path',path)
        fetch( ``)
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({data:res.data});
        })
    }
  }
    render() {
        return (
            //学业记录
            <div className="cstudy">
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
                  onLeftClick={() => this.props.history.push('/index/child')}
                  ><span style={{
                      fontWeight:'bold',
                      fontSize:'6vw',
                      textIndent:'3vw',
                      letterSpacing:'3vw',
                      color:"white"
                  }}
                  >学业记录</span>
                </NavBar>
                {/* Tabs组件 
                <TabExample />  */}
                 <div 
                 style={{ 
                  position:'fixed',
                  height:'100%',
                  width:'100%',
                  top:'8vh',
                  zIndex:'10',
                  marginTop:'0.5vh',
                  }}>
                    <TabBar
                    tabBarPosition="top"
                    unselectedTintColor="#808080"
                    tintColor="#FFBF2D"
                    barTintColor="white"
                    >
                    <TabBar.Item
                        title="记录列"
                        key="index"
                        icon={
                        <i
                        className='iconfont icon-jiluliebiao'
                        />
                        }
                        selectedIcon={
                        <i
                        className='iconfont icon-jiluliebiao'
                        />
                        }
                        selected={this.state.selectedTab === 'blueTab'}
                        onPress={() => {
                        this.setState({
                            selectedTab: 'blueTab',
                        });
                        }}
                    >
                      {/* 记录列 */}
                      <div className='cstudy_inner'>

                        {
                          this.state.lists&&this.state.lists.map((item)=>(
                              <div className='cgrowup_block'
                              style={{
                                border:'1px solid #FFBF2D',
                                height:'20vh',
                                borderRadius:'10px',
                                marginTop:'2vh',
                                marginBottom:'2vh',
                                paddingTop:'3vh'
                              }} >
                                  <i className='iconfont icon-shanchu1'></i>
                                  <li>语文：{item.chinese}</li>
                                  <li>数学：{item.math}</li>
                                  <li>英语：{item.english}</li>
                                  <p>添加日期：{item.setdate}</p>
                              </div>
                            ))
                        }
                      </div>

                      <div className='cgrowup_add'>
                        <p></p>
                        <Link
                        to={{
                          pathname:'/child/cstudy/ccstudy',
                          state:{
                            cid:this.state.cid
                          }
                        }}
                        ><i className='iconfont icon-jia'></i></Link>
                      </div>
                    </TabBar.Item>
                    
                    <TabBar.Item
                        icon={
                        <i
                        className='iconfont icon-chengjifenxi'
                        />
                        }
                        selectedIcon={
                        <i
                        className='iconfont icon-chengjifenxi'
                        />
                        }
                        title="成绩曲线"
                        key="idea"
                        selected={this.state.selectedTab === 'redTab'}
                        onPress={() => {
                        this.setState({
                            selectedTab: 'redTab',
                        });
                        }}
                    >
                      {/* 成绩曲线 */}
                      <div className='cstudy_inner'>
                        <img style={{
                          marginTop:'10vh',
                          width:"100%"
                        }} src={line}/>
                      </div>
                    </TabBar.Item>
                    </TabBar>
                </div>
            </div>
        )
    }
}