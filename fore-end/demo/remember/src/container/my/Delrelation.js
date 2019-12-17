import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import {Link} from 'react-router-dom';

export default class Delrelation2 extends Component {
    constructor(props){
        super(props);
        var uid = JSON.parse(localStorage.getItem('uid'));
        this.state = {
          list:[],//用来存放name
          uid:uid,
          inputValue:"",
          loverid:0,
          a:0,
          code:0
        }
    }
    componentDidMount(){
      fetch(`http://localhost:3001/my/dellover?uid=${this.state.uid}`)
      .then(res=>res.json())
      .then(json=>{ 
          this.setState({
             list:json
          })
      })
    }
  bounce=(index)=>{
    // 弹出选择框
    this.state.a=index;
    console.log(this.state.a);
    var lwarn=document.getElementById('lwarn');
    var btn1=document.getElementById('btn1');
    lwarn.style.display='block';
  }
  del=()=>{
    this.state.loverid=this.state.list[this.state.a].id;
    fetch(`http://localhost:3001/my/dellover/confirm?loversid=${this.state.loverid}`)
      .then(res=>res.json())
      .then(json=>{ 
          this.setState({
              code:json.code
          });
      })
      //展开数组
      var list = [...this.state.list];
      list.splice(this.state.a,1);
      this.setState({
        list:list,
      });
  }
    
  render(){
    return(
      <div className="All">
        <NavBar
          style={{
          top:0,
          width:'100%',
          zIndex:'11',
          position:'fixed',
          height:'8vh',
          background:'#FFBF2D',
          color:'#fff',
          fontWeight:'bolder',
          }}
          mode="light"
          icon={'𡿨'}
          onLeftClick={() => this.props.history.push('/index/my')}
          ><span style={{
              fontWeight:'bold',
              fontSize:'6vw',
              textIndent:'3vw',
              letterSpacing:'3vw',
              color:"white"
          }}
          >删除关系</span>
      </NavBar>
      <div style={{width:"100%",height:"5px",marginTop:"15%"}}></div>
      <h4>爱人记录</h4>
      <div>
        {
          // this.state.list===[]?<h3>暂无爱人记录</h3>
          // :this.state.list.map((ele,index)=>{
          //   // 把index传入
          //   return <div id="new" key={index} >爱人名：&nbsp;{ele.name}<button onClick={this.bounce.bind(this,index)}>删除</button></div>
          // })
          //  this.state.list===[]?<p>空</p>: 
          this.state.list.map((ele,index)=>{
            // 把index传入
            return <div id="new" key={index} >爱人名：&nbsp;{ele.name}<button onClick={this.bounce.bind(this,index)}>删除</button></div>
          })
        }
      </div>
      {/* 确认框 */}
      <div id='lwarn'>
        <div>请再次确认</div>
          <button 
          id="btn1"
          onClick={(index)=>{
              var warn=document.getElementById('lwarn');
              warn.style.display='none';
              this.del();
          }}
          style={{
            width:'25%',
            height:'15%',
            color:'#FFBF2D',
            border:'none',
            marginTop:'2vh',
            background:'#fff',
            borderRadius:'5px',
            fontSize:'6vw'
          }}>确定</button>
        <button 
        id="btn1"
        onClick={()=>{
            var warn=document.getElementById('lwarn');
            warn.style.display='none';
        }}
        style={{
          width:'25%',
          height:'15%',
          color:'#FFBF2D',
          border:'none',
          marginTop:'2vh',
          marginLeft:'2vh',
          background:'#fff',
          borderRadius:'5px',
          fontSize:'6vw'
        }}>取消</button>
        </div>
      </div>
    )
  }
}