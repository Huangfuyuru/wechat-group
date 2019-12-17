import React, { Component } from 'react';
import { NavBar,Flex } from 'antd-mobile';
import '../css/child.css';
import {Link} from 'react-router-dom';
export default class Recommend extends Component {
    constructor(){
        super();
        this.state={

        }
    }
    componentDidMount(){
       
    }
    render() {
        return (
            <div className='recommend'>
                    <NavBar
                    style={{
                        width:'100%',
                        zIndex:'11',
                        position:'fixed',
                        background:'#FFBF2D',
                        height:'8vh'
                    }}
                ><span style={{
                    fontWeight:'bold',
                    fontSize:'6vw',
                    textIndent:'3vw',
                    letterSpacing:'3vw'
                }}
                >推荐</span></NavBar>
                
            </div>
        )
    }
}
