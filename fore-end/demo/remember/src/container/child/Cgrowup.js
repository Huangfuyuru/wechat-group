import React, { Component } from 'react';
import { Tabs, WhiteSpace,NavBar,Icon,TabBar } from 'antd-mobile';
import {Link} from 'react-router-dom';
import moment from 'moment';

export default class Write extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'redTab',
      hidden: false,
      fullScreen: false,
      number:[{
          num1:100,
          num2:30,
          src1:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3073295182,3150460296&fm=26&gp=0.jpg",
          src2:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=506811022,40650669&fm=26&gp=0.jpg"
      }]
    };
  }
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
            // 成长记录
            <div className="All">
              <NavBar
                    style={{
                        background:'#FFBF2D',
                        height:'8vh'
                    }}
                    mode="light"
                    icon={<Icon type="left" style={{color:"black"}}/>}
                    onLeftClick={() => this.props.history.push('/Cloud')}
                    ><span style={{
                        fontWeight:'bold',
                        fontSize:'6vw',
                        textIndent:'3vw',
                        letterSpacing:'3vw'
                    }}
                    >成长记录</span>
                </NavBar>
                {/* Tabs组件 */}
                <div style={{ 
                    position: 'fixed', 
                    height: '100%', 
                    width: '100%', 
                    top: '50px', 
                    }}>
                    <TabBar
                    unselectedTintColor="#808080"
                    tintColor="#FFBF2D"
                    barTintColor="white"
                    tabBarPosition="top"
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
                              <p>身高：<span>{number.num1}cm&nbsp;&nbsp;</span>体重：<span>{number.num2}kg</span></p>
                              <p className="one">日期：{moment().format('YYYY-MM-DD')}</p>
                            </div>
                            <div className="Write_">
                              <p>身高：<span>{number.num1}cm&nbsp;&nbsp;</span>体重：<span>{number.num2}kg</span></p>
                              <p className="one">日期：{moment().format('YYYY-MM-DD')}</p>
                            </div>
                            <Link to='/growAdd'>
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
                        title="身高曲线"
                        key="idea"
                        selected={this.state.selectedTab === 'redTab'}
                        onPress={() => {
                        this.setState({
                            selectedTab: 'redTab',
                        });
                        }}
                    >
                      {/* 身高曲线 */}
                      {
                        this.state.number.map((number)=>(
                            <div style={{ display: 'flex',paddingTop:"20px", flexDirection:"column",height: '100%', backgroundColor: '#fff' }}>
                              <div className="Write_two">
                                <img src={number.src1}/>
                              </div>
                            </div>
                        ))
                      }
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
                        title="体重曲线"
                        key="mall"
                        selected={this.state.selectedTab === 'greenTab'}
                        onPress={() => {
                        this.setState({
                            selectedTab: 'greenTab',
                        });
                        }}
                    >
                      {/* 体重曲线 */}
                      {
                        this.state.number.map((number)=>(
                          <div style={{ display: 'flex',flexDirection:"column", height: '100%',paddingTop:"20px", backgroundColor: '#fff' }}>
                            <div className="Write_two">
                              <img src={number.src2}/>
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