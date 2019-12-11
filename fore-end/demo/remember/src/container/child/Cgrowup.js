import React, { Component } from 'react';
import { Tabs, WhiteSpace,NavBar,Icon,TabBar } from 'antd-mobile';
import {Link} from 'react-router-dom';
import moment from 'moment';
import '../../css/child.css'

export default class Write extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props.location.state)
    this.state = {
      selectedTab: 'blueTab',
      hidden: false,
      fullScreen: false,
      // cid:this.props.location.state,
      cid:300001,
      lists:[
        {
          length:'170cm',
          weight:'50kg',
          age:'20',
          setdate:'2019-12-10'
        },
        {
          length:'170cm',
          weight:'50kg',
          age:'20',
          setdate:'2019-12-10'
        },
        {
          length:'170cm',
          weight:'50kg',
          age:'20',
          setdate:'2019-12-10'
        },
        {
          length:'170cm',
          weight:'50kg',
          age:'20',
          setdate:'2019-12-10'
        },
        {
          length:'170cm',
          weight:'50kg',
          age:'20',
          setdate:'2019-12-10'
        },
        {
          length:'170cm',
          weight:'50kg',
          age:'20',
          setdate:'2019-12-10'
        },
        {
          length:'170cm',
          weight:'50kg',
          age:'20',
          setdate:'2019-12-10'
        },
        {
          length:'170cm',
          weight:'50kg',
          age:'20',
          setdate:'2019-12-10'
        },
        {
          length:'170cm',
          weight:'50kg',
          age:'20',
          setdate:'2019-12-10'
        },
        {
          length:'170cm',
          weight:'50kg',
          age:'20',
          setdate:'2019-12-10'
        },
        {
          length:'170cm',
          weight:'50kg',
          age:'20',
          setdate:'2019-12-10'
        },
        {
          length:'170cm',
          weight:'50kg',
          age:'20',
          setdate:'2019-12-10'
        },
        
      ],
      number:[{
          num1:100,
          num2:30,
          src1:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3073295182,3150460296&fm=26&gp=0.jpg",
          src2:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=506811022,40650669&fm=26&gp=0.jpg"
      }]
    };
  }
  componentDidMount(){
    // let path = this.props.match.params.id
    console.log(this.state.cid)
    fetch(`http://localhost:3001/child/cgrowup?childsid=${this.state.cid}`)
    .then((res)=>res.json())
    .then((res)=>{
      console.log('成长',res)
        this.setState({
          lists:res
        });
    })
  }
  //setState()结束之后都会自动调用componentDidUpdate()
  //如果有更新会进componentDidUpdate里面
  componentDidUpdate(Props,State){
    // if(Props.location.search !== this.props.location.search){
    //   let path = this.props.match.params.id
    //   console.log('path',path)
    //   fetch( `http://localhost:3001/child/cgrowup?childsid=`)
    //       .then((res)=>res.json())
    //       .then((res)=>{
    //           this.setState({data:res.data});
    //       })
    // }
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
          <div style={{position:'fixed',height:'100%',width:'100%',top:'8vh',zIndex:'10'}}>
            <TabBar
            unselectedTintColor="#808080" 
            tintColor="#FFBF2D" 
            barTintColor="white" 
            tabBarPosition="top">
              <TabBar.Item
                title="记录列"
                key="index"
                icon={
                  <i className='iconfont icon-qinzi'/>
                }
                selectedIcon={
                  <i className='iconfont icon-qinzi'/>
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
                  this.state.lists.map((item,idx)=>{
                      var date = moment(item.setdate).format("YYYY-MM-DD HH:mm:ss");
                      console.log(item.setdate)
                      return <div className='cgrowup_block'
                      style={{
                        border:'1px solid #FFBF2D',
                        height:'20vh',
                        borderRadius:'10px',
                        marginTop:'2vh',
                        marginBottom:'2vh',
                        paddingTop:'3vh'
                      }} 
                      key={idx}>
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
            </TabBar.Item>

            <TabBar.Item
              icon={
                <i className='iconfont icon-aiqing'/>
              }
              selectedIcon={
                <i className='iconfont icon-aiqing'/>
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
            <div className='cgrowup_inner'>
                {
                  this.state.lists.map((item,idx)=>(
                    <div className='cgrowup_block'
                    style={{
                      border:'1px solid #FFBF2D',
                      height:'20vh',
                      borderRadius:'10px',
                      marginTop:'2vh',
                      marginBottom:'2vh',
                      paddingTop:'3vh'
                    }} 
                    key={idx}>
                      <li>身高：<span>{item.length}</span></li>
                      <li>体重：<span>{item.weight}</span></li>
                      <li>年龄：<span>{item.age}</span></li>
                      <p>记录创建日期:{item.setdate}</p>
                    </div>
                    
                  ))
                }
              </div>
          </TabBar.Item>

          <TabBar.Item
            icon={
              <i className='iconfont icon-haoyou'/>
            }
            selectedIcon={
              <i className='iconfont icon-haoyou'/>
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
          <div className='cgrowup_inner'>
                {
                  this.state.lists.map((item,idx)=>(
                    <div className='cgrowup_block'
                    style={{
                      border:'1px solid #FFBF2D',
                      height:'20vh',
                      borderRadius:'10px',
                      marginTop:'2vh',
                      marginBottom:'2vh',
                      paddingTop:'3vh'
                    }} 
                    key={idx}>
                      <li>身高：<span>{item.height}</span></li>
                      <li>体重：<span>{item.weight}</span></li>
                      <li>年龄：<span>{item.age}</span></li>
                      <p>记录创建日期:{item.date}</p>
                    </div>
                    
                  ))
                }
              </div>
          </TabBar.Item>
        </TabBar>
      </div>
    </div>
  )
}
}