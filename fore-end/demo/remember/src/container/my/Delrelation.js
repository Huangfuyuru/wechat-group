import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import {Link} from 'react-router-dom';

export default class Delrelation extends Component {
    constructor(props){
        super(props)
        this.state = {
          list:["爱人1"],
          inputValue:""
        }
    }
    componentDidMount(){
        let path = this.props.match.params.id
        console.log('path',path)
        fetch(`http://localhost:3001/my/dellover`)
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({data:res.data});
            console.log('更新前',res.data)
        })
    }
    componentDidUpdate(prevProps,prevState){
        if(prevProps.location.search !==this.props.location.search){
            let path = this.props.match.params.id
            console.log('path',path)
            fetch(`http://localhost:3001/my/dellover`)
            .then((res)=>res.json())
            .then((res)=>{
                this.setState({data:res.data});
                console.log('更新后',res.data)
            })
        }
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
                <h4>您的爱人记录只有唯一的一个</h4>
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
      change(e){
        this.setState({
          inputValue:e.target.value
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
    }