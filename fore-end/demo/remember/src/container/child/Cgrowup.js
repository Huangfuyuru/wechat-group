import React, { Component } from 'react';
import { Tabs, WhiteSpace,NavBar,Icon,TabBar } from 'antd-mobile';
import {Link} from 'react-router-dom';
import moment from 'moment';
import '../../css/child.css'
import line1 from '../../image/line3.png'
import line2 from '../../image/line4.png'
export default class Write extends Component {
  constructor(props) {
    super(props);
    var cid = JSON.parse(localStorage.getItem('cid'));
    // console.log(this.props.location.state)
    this.state = {
      selectedTab: 'blueTab',
      hidden: false,
      fullScreen: false,
      // cid:this.props.location.state,
      cid:cid,
      childGrowid:'',
      code:'',
      lists:[
      ],
    };
  }
  componentDidMount(){
    fetch(`http://localhost:3001/child/cgrowup?childsid=${this.state.cid}`)
    .then((res)=>res.json())
    .then((res)=>{
        this.setState({
          lists:res
        });
    })
  }
  //setState()结束之后都会自动调用componentDidUpdate()
  //如果有更新会进componentDidUpdate里面
  componentDidUpdate(prevProps,prevState){
      fetch(`http://localhost:3001/child/cgrowup?childsid=${this.state.cid}`)
      .then((res)=>res.json())
      .then((res)=>{
          this.setState({
            lists:res
          });
      })
  }
  delPOST=()=>{
      fetch(`http://localhost:3001/child/cgrowup/crgrowup?childsid=${this.state.cid}&childGrowid=${this.state.childGrowid}`,{
        method:'GET',
      })
      .then(res=>res.json())
      .then(json=>{
        this.setState({
          code:json.msg
        })
        console.log(json)
      })
      var delwarn=document.getElementById('delwarn');
      delwarn.style.display='none';
      var warnagain=document.getElementById('warnagain');
      warnagain.style.display='block';
  }
  render() {
    return (
        // 成长记录
        <div>
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
            >成长记录</span>
          </NavBar>
            {/* Tabs组件 */}
          <div style={{
            position:'fixed',
            height:'100%',
            width:'100%',
            top:'8vh',
            zIndex:'10',
            marginTop:'0.5vh',
            }}>
            <TabBar
            unselectedTintColor="#808080"
            tintColor="#FFBF2D" 
            barTintColor="white" 
            tabBarPosition="top">
              <TabBar.Item
                title="记录列"
                key="index"
                icon={
                  <i className='iconfont icon-jiluliebiao'/>
                }
                selectedIcon={
                  <i className='iconfont icon-jiluliebiao'/>
                }
                selected={this.state.selectedTab === 'blueTab'}
                onPress={() => {
                  this.setState({
                      selectedTab: 'blueTab',
                  });
                }}
              >
                {/* 记录列 */}
              
              <div className='cgrowup_inner'>
                {
                  this.state.lists&&this.state.lists.map((item,idx)=>{
                      var date = moment(item.setdate).format("YYYY-MM-DD");
                      // console.log(item)
                      return <div className='cgrowup_block'
                      style={{
                        border:'1px solid #FFBF2D',
                        height:'20vh',
                        borderRadius:'10px',
                        marginTop:'2vh',
                        marginBottom:'2vh',
                        paddingTop:'3vh'
                      }} 
                      key={idx}
                      value={item.id}>
                        <i
                        onClick={(e)=>{
                          var itemid = e.target.parentNode.getAttribute('value');
                          this.setState({
                            childGrowid:itemid
                          })
                          var delwarn=document.getElementById('delwarn');
                          delwarn.style.display='block';
                        }}  
                        className='iconfont icon-shanchu1'></i>
                        <li>身高：<span>{item.length}</span></li>
                        <li>体重：<span>{item.weight}</span></li>
                        <li>年龄：<span>{item.age}</span></li>
                        <p>记录日期:{date}</p>
                      </div>
                    })
                }
              </div>
              <div className='cgrowup_add'>
                <p></p>
                <Link
                to={{
                  pathname:'/child/cgrowup/ccgrow',
                  state:{
                    cid:this.state.cid
                  }
                }}
                ><i className='iconfont icon-jia'></i></Link>
              </div>
              <div id='delwarn'>
                <div>确定删除？</div>
                    <button 
                    onClick={()=>{
                        var delwarn=document.getElementById('delwarn');
                        delwarn.style.display='none';
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
                    onClick={this.delPOST}
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
              <div id='warnagain'>
                <div>{this.state.code}</div>
                    <button 
                    onClick={()=>{
                        var warnagain=document.getElementById('warnagain');
                        warnagain.style.display='none';
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
            </TabBar.Item>

            <TabBar.Item
              icon={
                <i className='iconfont icon-qinziAPPtubiao-'/>
              }
              selectedIcon={
                <i className='iconfont icon-qinziAPPtubiao-'/>
              }
              title="身高曲线"
              key="idea"
              selected={this.state.selectedTab === 'redTab'}
              onPress={() => {
                fetch(`http://localhost:3001/child/cgrowup/charts?childsid=${this.state.cid}`)
                .then(res=>res.json())
                .then(json=>{
                  console.log(json)
                })
                this.setState({
                    selectedTab: 'redTab',
                });
              }}
            >
            {/* 身高曲线 */}
            <div className='cgrowup_inner'>
                <img style={{
                  width:"100%",
                  marginTop:'10vh'
                }} src={line1}/>
            </div>
          </TabBar.Item>

          <TabBar.Item
            icon={
              <i className='iconfont icon-tizhong'/>
            }
            selectedIcon={
              <i className='iconfont icon-tizhong'/>
            }
            title="体重曲线"
            key="mall"
            selected={this.state.selectedTab === 'greenTab'}
            onPress={() => {
              fetch(`http://localhost:3001/child/cgrowup/charts?childsid=${this.state.cid}`)
                .then(res=>res.json())
                .then(json=>{
                  console.log(json)
                })
              this.setState({
                  selectedTab: 'greenTab',
              });
            }}
          >
          {/* 体重曲线 */}
          <div className='cgrowup_inner'>
            <img style={{
              width:"100%",
              marginTop:'10vh'
            }} src={line2}/>
          </div>
          </TabBar.Item>
        </TabBar>
      </div>
    </div>
  )
}
}