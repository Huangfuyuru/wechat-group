import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import {Link} from 'react-router-dom';

export default class Delrelation2 extends Component {
    constructor(props){
        super(props);
        var uid = JSON.parse(localStorage.getItem('uid'));
        this.state = {
          list:[],//用来存放name
          list2:'',
          list3:[],//用来存放id
          list4:'',
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
        console.log('现在',json);
        console.log(json.length);
          for(var i=0;i<json.length;i++){
            this.setState({
              list2:this.state.list2+json[i].name+',',
              list:this.state.list2.split(','),
              list4:this.state.list4+json[i].id+',',
              list3:this.state.list4.split(',')
            });
          }
          
      })
      // 获取code
    }
  bounce=(index)=>{
    // 弹出选择框
    // this.state.index=index;
    this.state.a=index;
    // console.log(index);
    console.log(this.state.a);
    var lwarn=document.getElementById('lwarn');
    var btn1=document.getElementById('btn1');
    lwarn.style.display='block';
  }
  del=()=>{
    this.state.loverid=this.state.list3[this.state.a];
    fetch(`http://localhost:3001/my/dellover/confirm?loversid=${this.state.loverid}`)
      .then(res=>res.json())
      .then(json=>{ 
          this.setState({
              code:json.code
          });
      })
      // 判断是否删
      //展开数组
      // console.log(this.state.a);
      var list = [...this.state.list];
      var list3= [...this.state.list3];
      list.splice(this.state.a,1);
      list3.splice(this.state.a,1);
      this.setState({
        list:list,
        list3:list3
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
          this.state.list.map((ele,index)=>{
            // 把index传入
            return <div id="new" key={index} >{ele}<button onClick={this.bounce.bind(this,index)}>删除</button></div>
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