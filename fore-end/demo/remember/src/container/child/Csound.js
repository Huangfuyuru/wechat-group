import React, { Component } from 'react'
import { NavBar, Icon } from 'antd-mobile';
import {Link} from 'react-router-dom'
export default class Csound extends Component {
    constructor(props){
        super(props);
        this.state={
            csounds:[]
        }
    }
    render() {
        return (
            <div>
                <NavBar
                    style={{
                    width:'100%',
                    zIndex:'11',
                    position:'fixed',
                    top:0,
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
                    >语音记事</span>
                </NavBar>

                <div className='csound_inner'>

                </div>

                <div className='cgrowup_add'>
                <p></p>
                <Link
                to={{
                  pathname:'/child/csound/ccsound',
                  state:{
                    cid:this.state.cid
                  }
                }}
                ><i className='iconfont icon-jia'></i></Link>
              </div>

            </div>
        )
    }
}
