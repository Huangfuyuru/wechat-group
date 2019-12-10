import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import {Link} from 'react-router-dom';

export default class Use extends Component {
    constructor(){
        super();
        this.state={

        }
    }
    upfile=()=>{
        var file=document.getElementById('img').files[0];
        var url = 'http://localhost:3001/my/information';
        var form = new FormData();
        form.append("file",file);
        fetch(url,{
            method:'POST',
            body:form
        }).then(res=>res.json())
        .then(res=>(this.setState({
            cindex_src:res.path
        },()=>{
            console.log(this.state.cindex_src)
            fetch(`http://localhost:3001/child/changebackground?childsid=${this.state.child_id}&background=${this.state.cindex_src}`,{
            method:'GET',
        })}
        )))
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
                    >设置</span>
                </NavBar>
                <form method='post' action=''>
                    <div className="img-up">
                        <span className="one">
                            轻触上传精选照片
                            <input id='img'onChange={this.upfile} type='file'accept="image/*"capture="camera" name='uimage'/>
                        </span>
                    </div>
                    <div className="create_Relation">
                        昵称：&nbsp;
                        <input className="one" type="text" placeholder="单行输入"></input>
                    </div>
                    <div className="create_Relation">
                        性别：&nbsp;
                        <input className="one" type="text" placeholder="单行输入"></input>
                    </div>
                    <div className="create_Relation">
                        新密码：&nbsp;
                        <input className="one" type="text" placeholder="单行输入"></input>
                    </div>
                    <Link to="/index/my">
                        <button type="submit" className="relation_button">确认修改</button>
                    </Link>
                </form>
            </div>
        )
    }
}