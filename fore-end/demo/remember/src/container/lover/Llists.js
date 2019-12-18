import React, { Component } from 'react'
import { NavBar,Icon,Tabs} from 'antd-mobile';
import "../../css/lover.css"
import {Link} from "react-router-dom"
export default class Llists extends Component {
    constructor(props){
        super(props);
        this.state={
            loverid: JSON.parse(localStorage.getItem('lid')),
            tabs :[
              ]
        }
    }
    componentDidMount(){
        fetch(`http://localhost:3001/lover/loverlist?loverid=${this.state.loverid}`)
        .then((res)=>res.json())
        .then((json)=>{
            this.setState({
               tabs:json
            },()=>{
                console.log(json)
            });
        })
    }
    render() {
        return (
            <div style={{width:"100%",backgroundColor:"white",marginTop:"10vh",overflow:"hidden",height:"100%"}}>
                 <NavBar style={{
                     height:'8vh',
                     color:'black',
                     zIndex:'11',
                     position:'fixed',
                     width:'100%',
                     left:0,
                     top:0
                    }}
                    mode="light"
                    icon={'𡿨'}
                    rightContent={[<Link to="/lover/lslists"><div className="iconfont icon-gengduo" key="0"   style={{ color:"white",marginRight: '10px' }} /></Link>,]}
                    onLeftClick={() => this.props.history.push('/index/lover')}
                 ><span style={{
                    
                     fontSize:'6vw',
                     textIndent:'3vw',
                     color:'black',
                     letterSpacing:'3vw'}}>恋爱清单</span>
                </NavBar>
                <Tabs tabs={this.state.tabs}
            initialPage={0}
            tabBarUnderlineStyle={{border:"1px solid #3fcccb"}}
            tabBarActiveTextColor="#3fcccb"
            tabBarPosition="bottom"
            renderTabBar={props => <Tabs.DefaultTabBar {...props} page={2} />}
            // onChange={(tab, index) => { console.log('onChange', index, tab); }}
            // onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
          >
              {
                  this.state.tabs&&this.state.tabs.map((item)=>(
                <div className="loverlist-header">
                    <Link to={{
                        pathname:'/lover/list',
                        state:{
                            arr:item
                        }
                        }}
                    >
                    <div style={{height:"65%",width:"90%",margin:"4% 0 0 5%",border:"solid 0.5px #888888"}}>
                    <img src={item.imgurl} alt="" style={{height:"100%",width:"100%"}}/>
                   </div>
                   </Link>
               <div className="loverlist-first">
                 <p style={{color:"black",textAlign:"center",fontSize:"6vw",lineHeight:"12vh"}}>{item.name}</p>
            </div>  
                </div>
                ))

              }
        </Tabs>
                <div className='allpage_share'>
                  <p style={{fontSize:"5.5vw",color:"white",margin:"4% 0 0 0"}}>分&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;享</p>
              </div>
            </div>
        )
    }
}
