import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import {Link} from 'react-router-dom';

export default class Delrelation extends Component {
  constructor(props){
    super(props);
    var uid = JSON.parse(localStorage.getItem('uid'));
    this.state={
        uid:uid,
        list:['你好'],
        code:0,
        loverid:'',
    }
  }
  //componentDidMount(){
    //   fetch(`http://localhost:3001/my/dellover?uid=${this.state.uid}`)
    //   .then(res=>res.json())
    //   .then(json=>{ 
    //       this.setState({
    //           list:[json[0].name],
    //           loverid:json[0].loverid
    //       });
    //   })
    //   // 获取code
    //   fetch(`http://localhost:3001/my/dellover/confirm?uid=${this.state.uid}`)
    //   .then(res=>res.json())
    //   .then(json=>{ 
    //       this.setState({
    //           code:json.code
    //       });
    //   })
    // }
  del(index){
    //展开数组
    var list = [...this.state.list]
    //删除元素
    list.splice(index,1)
    this.setState({
      list:list
    })
  }
  bounce=(index)=>{
    // 弹出选择框
    this.state.a=index;
    console.log(index);
    var lwarn=document.getElementById('lwarn');
    var btn1=document.getElementById('btn1');
    lwarn.style.display='block';
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
                <h4>爱人记录：</h4>
            <div>
                {
                  this.state.list.map((ele,index)=>{
                      return <div className="new" key={index} >{ele}<button onClick={this.bounce.bind(this,index)}>删除</button></div>
                  })
                }
              </div>
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