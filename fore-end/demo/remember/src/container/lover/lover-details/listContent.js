import React, { Component } from 'react'
import { NavBar,WingBlank} from 'antd-mobile';
import "../../../css/lover.css"
import {Link} from "react-router-dom"
export default class listContent extends Component {
    constructor(props){
        super(props)
        this.state={
            item:this.props.location.state.arr
        }
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
                    onLeftClick={() => this.props.history.push('/lover/llists')}
                 ><span style={{
                     fontSize:'6vw',
                     textIndent:'3vw',
                     color:'black',
                     textOverflow: "ellipsis",
                 letterSpacing:'1vw'}}>{this.state.item.name}</span>
                </NavBar>
                <WingBlank>
                <div style={{height:"55vh",width:"100%"}}>
                <img src={this.state.item.imgurl} alt="" style={{height:"100%",width:"100%",float:"left"}}/>
                </div>
                </WingBlank>
                <WingBlank><p>{this.state.item.content}</p></WingBlank>

                <WingBlank>
                <div style={{height:"5vh",width:"100%"}}>
                <p style={{float:"right",margin:"0"}}>时间：{this.state.item.setdate.split("T")[0]}</p>
                </div>
                </WingBlank>
                <WingBlank>
                <div style={{height:"5vh",width:"100%"}}>
                <p style={{float:"right",margin:"0"}}> 地点：{this.state.item.local}</p>
                </div>
                </WingBlank>
            </div>
        )
    }
}
