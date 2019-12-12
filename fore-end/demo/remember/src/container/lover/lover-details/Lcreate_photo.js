import React, { Component } from 'react'
import { NavBar,WingBlank} from 'antd-mobile';
import "../../../css/lover.css"
import {Link} from "react-router-dom"
export default class Lcreate_photo extends Component{
    constructor(props){
        super(props);
        var lid = JSON.parse(localStorage.getItem('lid'));
        this.state={
            lover_id:lid,
        }
    }
    
    render() {
        return (
            <div style={{height:"100%",width:"100%",backgroundColor:"white"}}>
           <NavBar 
                 style={{
                     background:'#FFBF2D',
                     height:'8vh',
                     color:'#fff',
                     fontWeight:'bolder',
                    }}
                    mode="light"
                    icon={'𡿨'}
                    onLeftClick={() => this.props.history.push('/lover/lpictures')}
                 ><span style={{
                     color:'#fff',
                     fontWeight:'bold',
                     fontSize:'6vw',
                     textIndent:'3vw',
                     letterSpacing:'3vw'}}>创建相册</span>
                </NavBar>
            <div className="photo-first">
                  <p >相册名称:</p>
                  <input  type="text" placeholder="please input"/>
                  </div>
                  <div className="photo-first">
                  <p >创建日期:</p>
                  <input  type="text" placeholder="例:1999-11-28"/>
                  </div>
                  <WingBlank>
               <button className="photo-foot">创建相册</button>
               </WingBlank>
            </div>
        )
    }
}
