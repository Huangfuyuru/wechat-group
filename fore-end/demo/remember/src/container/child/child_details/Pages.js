import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { NavBar, Icon } from 'antd-mobile';
export default class Pages extends Component {
    constructor(){
        super();
        this.state={
            picture:[{
                pic1:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1340456730,3614528906&fm=26&gp=0.jpg',
                pic2:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2037612692,2923078042&fm=26&gp=0.jpg',
                pic3:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1941444633,1579151784&fm=26&gp=0.jpg'
            }]
        }
    }
    render() {
        return (
            // 相册页面
            <div className="All">
                <NavBar
                    style={{
                        background:'#FFBF2D',
                        height:'8vh'
                    }}
                    mode="light"
                    icon={<Icon type="left" style={{color:"white"}}/>}
                    onLeftClick={() => this.props.history.push('/Cpicture')}
                    ><span style={{
                        fontWeight:'bold',
                        fontSize:'6vw',
                        textIndent:'3vw',
                        letterSpacing:'3vw',
                        color:"white"
                    }}
                    >相册页面</span>
                </NavBar>
                {
                    this.state.picture.map((picture)=>(
                        <div className="Pages_picture">
                            <div style={{width:"100%"}}><img src={picture.pic1}/></div>
                            <div style={{width:"100%"}}><img src={picture.pic2}/></div>
                            <div style={{width:"100%"}}><img src={picture.pic3}/></div>
                        </div>
                    ))
                }
            </div>
        )
    }
}