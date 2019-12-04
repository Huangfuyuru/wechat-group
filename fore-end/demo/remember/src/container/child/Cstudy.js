import React, { Component } from 'react';
import { Tabs, WhiteSpace,NavBar,Icon,TabBar } from 'antd-mobile';
import moment from 'moment';
import {Link} from 'react-router-dom';

export default class Csdtudy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'redTab',
      hidden: false,
      fullScreen: false,
      number:[{
          num1:90,
          num2:88,
          num3:93,
          src1:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=774845037,279801609&fm=26&gp=0.jpg",
      }]
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
  //setState()结束之后都会自动调用componentDidUpdate()
  //如果有更新会进componentDidUpdate里面
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
            <div className="All">
                <NavBar
                    style={{
                        background:'#FFBF2D',
                        height:'8vh'
                    }}
                    mode="light"
                    icon={<Icon type="left" style={{color:"white"}}/>}
                    onLeftClick={() => this.props.history.push('/Cloud')}
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
                 <div style={{ 
                    position: 'fixed', 
                    height: '100%', 
                    width: '100%', 
                    top: '50px'
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
                        this.setState({
                            selectedTab: 'blueTab',
                        });
                        }}
                    >
                      {/* 记录列 */}
                      {
                        this.state.number.map((number)=>(
                          <div style={{ display: 'flex',flexDirection:"column", height: '100%', backgroundColor: '#fff' }}>
                            <div className="Write_">
                              <p>数学：<span>{number.num1}&nbsp;&nbsp;</span>英语：<span>{number.num2}</span></p>
                              <p className="one">日期：{moment().format('YYYY-MM-DD')}</p>
                            </div>
                            <div className="Write_">
                              <p>数学：<span>{number.num3}&nbsp;&nbsp;</span>英语：<span>{number.num2}</span></p>
                              <p className="one">日期：{moment().format('YYYY-MM-DD')}</p>
                            </div>
                            <div className="Write_">
                              <p>数学：<span>{number.num2}&nbsp;&nbsp;</span>英语：<span>{number.num1}</span></p>
                              <p className="one">日期：{moment().format('YYYY-MM-DD')}</p>
                            </div>
                            <Link to='/stuAdd'>
                              <div className="Cloud_add">
                                <div>-------------------------------------------------------------</div>
                                <a href="#" target="_blank"><img className="Cloud_img" src={require("../../image/add.png")}/></a>
                              </div>
                            </Link>
                          </div>
                           ))
                          }
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
                      {
                        this.state.number.map((number)=>(
                          <div style={{ display: 'flex', flexDirection:"column",height: '100%', backgroundColor: '#fff' }}>
                            <div className="Write_two">
                              <img src={number.src1}/>
                            </div>
                          </div>
                        ))
                      }
                    </TabBar.Item>
                    </TabBar>
                </div>
            </div>
        )
    }
}