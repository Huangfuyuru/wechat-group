import React, { Component } from 'react'
import { NavBar} from 'antd-mobile';
import {Link} from "react-router-dom"
import "../../../css/lover.css"
export default class LSpictures extends Component {
    constructor(props){
        super(props)
        console.log(this.props.location.state.id)
        this.state={
            pid:this.props.location.state.id,
            arr:[
                "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1153077516,1329367100&fm=26&gp=0.jpg",
            "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1153077516,1329367100&fm=26&gp=0.jpg"
            ],
            upArr:[]
        }
    }
    componentDidMount(){
        console.log("hh")
            fetch(`http://localhost:3001/lover/lpictures/show?loverPhotoListid=${this.state.pid}`)
            .then(res=>res.json())
            .then(json=>{ 
                this.setState({
                    // arr:json.msg
                },()=>{
                    console.log(json)
                });
            })
    }
    upImages=()=>{
        var file=document.getElementById('imgs').files;
        var url = 'http://localhost:3001/imgs';
        var form = new FormData();
        for(var i=0;i<file.length;i++){
            form.append("file",file[i]);
        };
        fetch(url,{
            method:'POST',
            enctype:'multipart/form-data',
            body:form
        }).then(res=>res.json())
        .then(json=>(
            this.setState((state)=>{
                for(var i=0;i<json.length;i++){
                    state.upArr[i]=json[i].path
                }
        })
        ) )
    }    
    render() {

        return (
            <div style={{height:"100%",width:"100%" ,backgroundColor:"white",marginTop:"10vh"}}>
                  <NavBar 
                 style={{
                    background:'#FFBF2D',
                    height:'8vh',
                    color:'#fff',
                    fontWeight:'bolder',
                    zIndex:'11',
                    position:'fixed',
                    width:'100%',
                    left:0,
                    top:0
                    }}
                    mode="light"
                    icon={'𡿨'}
                    onLeftClick={() => this.props.history.push('/lover/lpictures')}
                 ><span style={{
                     color:'#fff',
                     fontWeight:'bold',
                     fontSize:'6vw',
                     textIndent:'3vw',
                     letterSpacing:'3vw'}}>相册详情</span>
                </NavBar>

            {
                this.state.arr.map((item)=>(
                    <div style={{height:"24%",width:"44%",margin:"3%",float:"left"}}>
                        <img src={item} style={{height:"100%",width:"100%" ,float:"left"}} alt=""></img>
                    </div>
                ))
            }
             <span style={{
                        zIndex:'10',
                        display:'inline-block',
                        width:'40%',
                        fontSize:'5vw',
                        margin:"5% 0 0 30%",
                        color:"#FFBF2D",
                        textAlign:"center",
                        border:"solid 0.5px black",
                        paddingTop:"3%"
                    }}>轻触上传照片<input 
                    style={{
                        opacity: 0,
                        height:"80%",
                        width:"100%",
                        border:"solid 0.5px black",
                        float:"left"
                    }}  
                    id="imgs"  
                    onChange={this.upImages}                         
                    type='file'  
                    accept="image/*" 
                    capture="camera" 
                    name='uimage' 
                    multiple="multiple"
                    alt=""
                    />
                    </span>
            </div>

        )
    }
}
