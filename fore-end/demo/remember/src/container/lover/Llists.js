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
                { name: '推荐' },
                { name: '冬季' },
                { name: '宜家' },
                { name: '小清新'},
                { name: '小户型' },
                { name: '个性色彩'},
              ]
        }
    }
    componentDidMount(){
        fetch(`http://localhost:3001/lover/loverlist?loverid=${this.state.loverid}`)
        .then((res)=>res.json())
        .then((json)=>{
            this.setState({

            },()=>{
                console.log(json)
            });
        })
    }
    render() {
        return (
            <div style={{width:"100%",backgroundColor:"white",marginTop:"10vh",overflow:"hidden",height:"100%"}}>
                 <NavBar style={{
                     background:'#FFBF2D',
                     height:'8vh',
                     color:'#fff',
                     fontWeight:'bolder',
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
                     fontWeight:'bold',
                     fontSize:'6vw',
                     textIndent:'3vw',
                     color:'#fff',
                     letterSpacing:'3vw'}}>恋爱清单</span>
                </NavBar>
                <Tabs tabs={this.state.tabs}
            initialPage={0}
            tabBarUnderlineStyle={{border:"1px solid #3fcccb"}}
            tabBarActiveTextColor="#3fcccb"
            tabBarPosition="bottom"
            renderTabBar={props => <Tabs.DefaultTabBar {...props} page={2} />}
            onChange={(tab, index) => { console.log('onChange', index, tab); }}
            onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
          >
                <div className="loverlist-header">
                    <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3560880680,1309107465&fm=26&gp=0.jpg" alt="" style={{height:"65%",width:"90%",margin:"4% 0 0 5%"}}></img>
                    <div className="loverlist-first">
                        <h1 style={{color:"#FFBF2D",textAlign:"center"}}>第一次牵手</h1>
                      {/* <Link to="/lover/crlist"><img src={require("../image/jia.jpg")}  className="lovelist-jia"   alt=""></img></Link>  */}
                    </div>  
                </div>
                </Tabs>


                <div className='allpage_add'>
                    <p></p>
                    <Link
                    to={{
                    pathname:'/lover/lcpictures',
                    state:{
                        cid:this.state.cid
                    }
                    }}
                    ><i className='iconfont icon-jia'></i></Link>
              </div>


               {/* <Link to="/lover/lslists"> <p className="loverlist-foot">
                    所有清单
                </p></Link> */}
            </div>
        )
    }
}
