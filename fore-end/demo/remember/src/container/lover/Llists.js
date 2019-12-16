import React, { Component } from 'react'
import { NavBar} from 'antd-mobile';
import "../../css/lover.css"
import {Link} from "react-router-dom"
export default class Llists extends Component {
    componentDidMount(){
        let path = this.props.match.params.id
        fetch(``)
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({data:res.data});
        })
    }
    componentDidUpdate(Props,State){
        if(Props.location.search !== this.props.location.search){
            let path = this.props.match.params.id
            console.log('path',path)
            fetch( ``)
            .then((res)=>res.json())
            .then((res)=>{
                this.setState({data:res.data});
            })
        }
    }
    render() {
        return (
            <div style={{width:"100%",backgroundColor:"white",marginTop:"10vh"}}>
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
                    onLeftClick={() => this.props.history.push('/index/lover')}
                 ><span style={{
                     fontWeight:'bold',
                     fontSize:'6vw',
                     textIndent:'3vw',
                     color:'#fff',
                     letterSpacing:'3vw'}}>恋爱清单</span>
                </NavBar>
                <div className="loverlist-header">
                    <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3560880680,1309107465&fm=26&gp=0.jpg" alt="" style={{height:"65%",width:"90%",margin:"4% 0 0 5%"}}></img>
                    <div className="loverlist-first">
                        <h1 style={{color:"#FFBF2D",textAlign:"center"}}>第一次牵手</h1>
                      {/* <Link to="/lover/crlist"><img src={require("../image/jia.jpg")}  className="lovelist-jia"   alt=""></img></Link>  */}
                    </div>  
                </div>
               <Link to="/lover/lslists"> <p className="loverlist-foot">
                    所有清单
                </p></Link>
            </div>
        )
    }
}
