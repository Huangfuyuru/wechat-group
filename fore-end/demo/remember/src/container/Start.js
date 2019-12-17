import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import logo from '../image/logo.png'
import '../css/start.css'
import Menus from './Menus'
export default class Start extends Component {
    render() {
        return (
            <div>
                
                <div className='start'>
                    <nav style={{
                        marginTop:'30vh',
                        textAlign:'center'
                    }}><img src={logo} alt='logo' width='60%'/></nav>
                    <div className='start_first'>
                        {/* <p>
                            经历过的事，总比想象中更美一些
                        </p>
                        <p>
                            “记得”的作用
                        </p>
                        <p>
                            就是记录生活点滴美好
                        </p>
                        <p>
                            打开“记得”
                        </p>
                        <p>
                            浓浓的泛着木香的旧时光扑面而来……
                        </p> */}
                        {/* <p>
                            关于你的一切，我都会记得~
                        </p>                  */}
                    </div>
                    <button className='start_button' onClick={()=>{
                        var uid = localStorage.getItem('uid');
                        if(uid === JSON.stringify("over")){
                            this.props.history.push('/menus')
                        }else{
                            this.props.history.push('/index/my')
                        }
                        console.log(uid)
                    }
                    }>进入APP</button>
                </div>
            </div>
        )
    }
}
