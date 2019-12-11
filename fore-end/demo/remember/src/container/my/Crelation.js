import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import {Link} from 'react-router-dom';

export default class Crelation extends Component {
    constructor(props){
        super(props);
        var uid = JSON.parse(localStorage.getItem('uid'));
        this.state={
            name:"s",
            ldate:"2019",
            gender:"女",
            uid:uid,
            loverid:''
        }
    }
    componentDidMount(){
        fetch(`http://localhost:3001/my/addlover`,{
            method:'POST',
            mode:'cors',
            headers:{
                'Content-Type':"application/x-www-form-urlencoded"
            },
            body:`loverid=${this.state.loverid}`
        }).then(res=>res.json())
        .then(json=>{
            console.log(json)
            this.setState({
                loverid:json[0].loverid
            });
        })
    }
    componentDidUpdate(prevProps,prevState){
        if(prevState !== this.state){
            console.log('BJ',this.state.cindex_src)
            console.log('id',this.state.child_id)
            fetch(`http://localhost:3001/my/addlover`,{
                method:'POST',
                mode:'cors',
                headers:{
                    'Content-Type':"application/x-www-form-urlencoded"
                },
                body:`name=${this.state.name}&ldate=${this.state.ldate}&gender=${this.state.ldate}&uid=${this.state.uid}`
            })
            .then(res=>res.json())
            .then(json=>(
                console.log(json)
            ))
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
                    onLeftClick={() => this.props.history.push('/index/My')}
                    ><span style={{
                        fontWeight:'bold',
                        fontSize:'6vw',
                        textIndent:'3vw',
                        letterSpacing:'3vw',
                        color:"white"
                    }}
                    >建立关系</span>
                </NavBar>
                <form method='post' action=''>
                    <div className="create_Relation">
                        对方昵称：&nbsp;
                        <input className="one" type="text" placeholder="单行输入"></input>
                    </div>
                    <div className="create_Relation">
                        关系确认日期：&nbsp;
                        <input className="one" type="text" placeholder="单行输入"></input>
                    </div>
                    <div className="create_Relation">
                        对方性别：&nbsp;
                        <input className="one" type="text" placeholder="单行输入"></input>
                    </div>
                    <Link to="/index/my">
                        <button type="submit" className="relation_button">创建关系</button>
                    </Link>
                </form>
            </div>
        )
    }
}