import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import {Link} from 'react-router-dom';

export default class Delrelation2 extends Component {
    constructor(props){
        super(props);
        var uid = JSON.parse(localStorage.getItem('uid'));
        this.state = {
          list:["亲子1","亲子2","亲子3"],
          uid:uid,
          inputValue:"",
          childid:'',
          code:0
        }
    }
    //componentDidMount(){
    //   fetch(`http://localhost:3001/my/delchild?uid=${this.state.uid}`)
    //   .then(res=>res.json())
    //   .then(json=>{ 
    //       this.setState({
    //           list:[json[0].name],
    //           childid:json[0].childid
    //       });
    //   })
    //   // 获取code
    //   fetch(`http://localhost:3001/my/delchild/confirm?uid=${this.state.uid}`)
    //   .then(res=>res.json())
    //   .then(json=>{ 
    //       this.setState({
    //           code:json.code
    //       });
    //   })
    // }
  bounce=(index)=>{
    // 弹出选择框
    this.state.a=index;
    console.log(index);
    var lwarn=document.getElementById('lwarn');
    var btn1=document.getElementById('btn1');
    lwarn.style.display='block';
  }
  del=()=>{
    // 判断是否删
      //展开数组
      console.log(this.state.a);
      var list = [...this.state.list]
      list.splice(this.state.a,1)
      this.setState({
        list:list
      });
  }
    
  render(){
    return(
      <div className="All">
        <NavBar
          style={{
              background:'#FFBF2D',
              height:'8vh'
          }}
          mode="light"
          icon={<Icon type="left" style={{color:"white"}}/>}
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
      <h4>亲子记录</h4>
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