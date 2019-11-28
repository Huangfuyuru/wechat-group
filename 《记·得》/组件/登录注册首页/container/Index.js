import React, { Component } from 'react'
import { NavBar, Icon,TabBar } from 'antd-mobile';
export default class Child_index extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selectedTab: 'redTab',
          hidden: false,
          fullScreen: false,
        };
      }
    render() {
        return (
            <div>
                <NavBar
                icon={<Icon type="left" />}
                style={{background:'#FFBF2D'}}
                onLeftClick={() => console.log('onLeftClick')}
                >亲子</NavBar>
                <div className='Children_first'>

                </div>
                <div className='Children_second'>

                </div>
                <div className='Children_third'>

                </div>
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
                        this.setState({
                            selectedTab: 'blueTab',
                        });
                        }}
                    >
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
                        this.setState({
                            selectedTab: 'redTab',
                        });
                        }}
                    >
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
                        this.setState({
                            selectedTab: 'greenTab',
                        });
                        }}
                    >
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
                        this.setState({
                            selectedTab: 'yellowTab',
                        });
                        }}
                    >
                    </TabBar.Item>
                    </TabBar>
                </div>
            </div>
        )
    }
}
