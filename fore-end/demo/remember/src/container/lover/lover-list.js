import React, { Component } from 'react'
import { NavBar} from 'antd-mobile';
import "../css/lover.css"
export default class lover_list extends Component {
    render() {
        return (
            <div style={{height:"100%",width:"100%",backgroundColor:"white"}}>
                 <NavBar style={{backgroundColor:"#FFBF2D",color:"white"}}>恋爱清单</NavBar>
                <div className="loverlist-header">
                    <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3560880680,1309107465&fm=26&gp=0.jpg" alt="" style={{height:"65%",width:"90%",margin:"4% 0 0 5%"}}></img>
                    <div className="loverlist-first">
                        <h1 style={{color:"#FFBF2D",float:"left",margin:"8% 0 0 28%"}}>第一次牵手</h1>
                        <img src={require("../image/jia.jpg")}  className="lovelist-jia"   alt=""></img>
                    </div>  
                </div>
                <p className="loverlist-foot">
                    所有清单
                </p>
            </div>
        )
    }
}
