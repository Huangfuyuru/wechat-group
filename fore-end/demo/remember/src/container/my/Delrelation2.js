import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import {Link} from 'react-router-dom';

export default class Delrelation2 extends Component {
    // constructor(){
    //     super();
    //     this.state={
    //         message:[{
    //             msg1:'亲子1',
    //             msg2:'亲子2'
    //         }]
    //     }
    // }
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
    constructor(props){
        super(props)
        this.state = {
          list:["星期一","星期二","星期三"],
          inputValue:""
        }
      }
    render(){
        
        return(
            // <div className="All">
            //     <NavBar
            //         style={{
            //             background:'#FFBF2D',
            //             height:'8vh'
            //         }}
            //         mode="light"
            //         icon={<Icon type="left" style={{color:"white"}}/>}
            //         onLeftClick={() => this.props.history.push('/index/my')}
            //         ><span style={{
            //             fontWeight:'bold',
            //             fontSize:'6vw',
            //             textIndent:'3vw',
            //             letterSpacing:'3vw',
            //             color:"white"
            //         }}
            //         >删除关系</span>
            //     </NavBar>
            //     {
            //         this.state.message.map((message)=>(
            //             <div className="My_body" style={{marginTop:"10%"}}>
            //                 <div className="one">
            //                     <div className="line">
            //                         <label><input type="checkbox" name="checkfruit" value="one"/>{message.msg1}</label>
            //                     </div>
            //                     <div className="line">
            //                         <label><input type="checkbox" name="checkfruit" value="two"/>{message.msg1}</label>
            //                     </div>
            //                 </div>
            //                 <div className="two">
            //                     <div className="line">
            //                         <label><input type="checkbox" name="checkfruit" value="three"/>{message.msg2}</label>
            //                     </div>
            //                     <div className="line">
            //                         <label><input type="checkbox" name="checkfruit" value="four"/>{message.msg2}</label>
            //                     </div>
            //                 </div>
            //             </div>
            //         ))
            //     }
            //     <form method='post' action=''>
            //         <Link to="/index/my">
            //             <button type="submit" className="relation_button" >确认删除</button>
            //         </Link>
            //     </form>
            // </div>
            <div>
            {
              this.state.list.map((ele,index)=>{
                // 把index传入
                return <p key={index} >{ele}<button onClick={this.del.bind(this,index)}>删除</button></p> 
              })
            }
            <input type="text" value={this.state.inputValue} onChange={this.change.bind(this)}/>
            <button onClick={this.add.bind(this)}>添加</button>
          </div>
        )
      }
     
      change(e){
        this.setState({
          inputValue:e.target.value
        })
      }
     
      add(){
        this.setState({
          list:[...this.state.list,this.state.inputValue],
          inputValue:""
        })
      }
     
      del(index){
        //展开数组
        var list = [...this.state.list]
        //删除元素
        list.splice(index,1)
        this.setState({
          list:list
        })
      }
        // )
    }
// }