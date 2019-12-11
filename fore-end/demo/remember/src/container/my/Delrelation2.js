import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import {Link} from 'react-router-dom';

export default class Delrelation2 extends Component {
    constructor(props){
        super(props)
        this.state = {
          list:["亲子1","亲子2","亲子3"],
          inputValue:"",
          a:false
        }
    }
    change(e){
      this.setState({
        inputValue:e.target.value
      })
    }
    bounce=()=>{
      // 弹出选择框
      var lwarn=document.getElementById('lwarn');
      var btn1=document.getElementById('btn1');
      lwarn.style.display='block';
    }
    del(index){
      // 判断是否删除
      if(this.state.a===true){
        //展开数组
        var list = [...this.state.list]
        list.splice(index,1)
        this.setState({
          list:list
        })
      }
      else{
        this.state.a=false;
      }
    }
    All(index){
      this.state.bounce;
      this.state.del;
    }
    // componentDidMount(){
    //     let path = this.props.match.params.id
    //     console.log('path',path)
    //     fetch(`http://localhost:3001/my/delchild`)
    //     .then((res)=>res.json())
    //     .then((res)=>{
    //         this.setState({data:res.data});
    //         console.log('更新前',res.data)
    //     })
    // }
    // componentDidUpdate(prevProps,prevState){
    //     if(prevProps.location.search !==this.props.location.search){
    //         let path = this.props.match.params.id
    //         console.log('path',path)
    //         fetch(`http://localhost:3001/my/delchild`)
    //         .then((res)=>res.json())
    //         .then((res)=>{
    //             this.setState({data:res.data});
    //             console.log('更新后',res.data)
    //         })
    //     }
    // }
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
              <h4>请选择要删除的亲子记录</h4>
              <div>
                {
                  this.state.list.map((ele,index)=>{
                    // 把index传入
                    return <div id="new" key={index} >{ele}<button onClick={this.All.bind(this,index)}>删除</button></div>
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
                      this.state.a=true;
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
                    this.state.a=true;
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