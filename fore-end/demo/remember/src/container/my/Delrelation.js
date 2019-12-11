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
        name:''
    }
}
// componentDidMount(){
//     fetch(`http://localhost:3001/my/dellover`)
//     .then(res=>res.json())
//     .then(json=>{ 
//         console.log("shzu",json)
//         this.setState({
//             name:json[0].name,
//             // json[0].loverid
//             list:['你还']
//         });
//         console.log(this.state.list);
//     })
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
                      return <div className="new" key={index} >{ele}<button onClick={this.del.bind(this,index)}>删除</button></div>
                  })
                }
              </div>
          </div>
        )
      }
    }