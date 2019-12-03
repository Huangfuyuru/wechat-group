import React, { Component } from 'react'
import { NavBar} from 'antd-mobile';
import "../css/lover.css"
import {Link} from "react-router-dom"
export default class lover_list extends Component {
    render() {
        return (
            <div style={{height:"100%",width:"100%",backgroundColor:"white"}}>
                 <NavBar style={{backgroundColor:"#FFBF2D",color:"white"}}
                               leftContent={[
                                <Link to="/Loverhome" style={{color:"white"}}><div className="iconfont icon-arror_left_blod" style={{ marginRight: '26px' }} /></Link>,
                               ]}
                 ><span style={{fontWeight:'bold',fontSize:'6vw',textIndent:'3vw',letterSpacing:'3vw'}}>恋爱清单</span></NavBar>
                <div className="loverlist-header">
                    <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3560880680,1309107465&fm=26&gp=0.jpg" alt="" style={{height:"65%",width:"90%",margin:"4% 0 0 5%"}}></img>
                    <div className="loverlist-first">
                        <h1 style={{color:"#FFBF2D",float:"left",margin:"8% 0 0 28%"}}>第一次牵手</h1>
                      {/* <Link to="/lover/crlist"><img src={require("../image/jia.jpg")}  className="lovelist-jia"   alt=""></img></Link>  */}
                    </div>  
                </div>
               <Link to="/lover/listall"> <p className="loverlist-foot">
                    所有清单
                </p></Link>
            </div>
        )
    }
}
