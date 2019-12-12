import React, { Component } from 'react'
import { NavBar, Icon } from 'antd-mobile';
import {Link} from  "react-router-dom"
export default class Lsound extends Component {
    constructor(props){
        super(props);
        this.state={
            lover_id:JSON.parse(localStorage.getItem('lid')),
            arr:[]
        }
    }
    
    componentDidMount(){
        console.log('sound');
        console.log(this.state.lover_id);
        fetch(`http://localhost:3001/lover/lsound?loverid=${this.state.lover_id}`)
        .then(res=>res.json())
        .then(json=>{
            console.log('json',json);
        })
    }
    render() {
        return (
            <div>
                <NavBar
                    style={{
                        background:'#FFBF2D',
                        height:'8vh',
                        color:'#fff',
                        fontWeight:'bolder',
                       }}
                       mode="light"
                       icon={'𡿨'}
                       onLeftClick={() => this.props.history.push('/index/lover')}
                    ><span style={{
                        fontWeight:'bold',
                        fontSize:'6vw',
                        textIndent:'3vw',
                        letterSpacing:'3vw',
                        color:'white'
                    }}
                    >语音记事</span>
                </NavBar>

                <Link to="/lover/lcsound"><img src={require("../../image/jia.jpg")}  className="lovesou-foot"   alt=""></img></Link>
            </div>
        )
    }
}
