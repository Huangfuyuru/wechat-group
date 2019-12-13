import React, { Component } from 'react'
import { NavBar} from 'antd-mobile';
import "../../css/lover.css"
import {Link} from "react-router-dom"
export default class Ldairy extends Component {
    constructor(props){
        super(props);
        var lid = JSON.parse(localStorage.getItem('lid'));
        this.state={
             lover_id:lid,
            noteArr:[],
            lid:"",
            id:""
        }
    }
    componentDidMount(){
        fetch(`http://localhost:3001/lover/ldairy?loverid=${this.state.lover_id}`)
        .then(res=>res.json())
        .then(json=>{ 
            this.setState({
                noteArr:json.msg
            });
        })
    }
    deleteNote=(lid,nid)=>{
        fetch(`http://localhost:3001/lover/ldairy/delDairy?loverid=${lid}&loverDiaryid=${nid}`)
        .then(res=>res.json())
        .then(json=>{ 
            this.setState({
                noteArr:json.msg
            });
        })
    }
    componentDidUpdate(prevProps,prevState){
        console.log("zhiqin",prevState);
        console.log(this.state)
        if(prevState !== this.state){

        // fetch(`http://localhost:3001/lover/ldairy?loverid=${this.state.lover_id}`)
        // .then(res=>res.json())
        // .then(json=>{ 
        //     this.setState({
        //         noteArr:json.msg
        //     });
        // })
    }
    }

    render() {
        return (
            <div style={{height:"100%",width:"100%",backgroundColor:"white",marginTop:"10vh"}}>
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
                    onLeftClick={() => this.props.history.push('/index/lover')}
                 ><span style={{
                     color:'#fff',
                     fontWeight:'bold',
                     fontSize:'6vw',
                     textIndent:'3vw',
                     letterSpacing:'3vw'}}>日记</span>
                </NavBar>
                 {
                     this.state.noteArr.map((item,value)=>(
                        <div className="lovernote-first" key={{value}}>
                            <img  src={require("../../image/qian.jpg")} alt=""  style={{float:"left",margin:"3% 0 0 0%",height:"10%",width:"13%"}}></img>
                            <p style={{fontSize:"5vw",float:"left",margin:" 8% 0% 0 0",fontWeight:"bold"}}>{item.name}  {item.setdate.split(".")[0].replace('T',' ')}</p>
                            <img src={require("../../image/la.jpg")} onClick={()=>this.deleteNote(item.lid,item.id)} alt="" style={{float:"right"}}/> 

                            <textarea style={{fontSize:"5vw",float:"left",height:"35%",width:"88%",margin:"5% 0 0 4%",padding:"3% 0 0 3%",border:"none"}} readOnly="readOnly" value={item.content}></textarea>
                            <div style={{height:"30%",width:"94%",float:"left",margin:"2% 0 0 3%"}}>
                            <img src={item.imgurl[0]}  alt="" style={{height:"100%",width:"48%",float:"left",marginLeft:"1%"}}></img>
                            <img src={item.imgurl[1]}  alt="" style={{height:"100%",width:"48%",float:"left",marginLeft:"1%"}}></img>
                            </div>
                            
                        </div>
                     ))
               
                }
                <div className='allpage_add'>
                    <p></p>
                    <Link
                    to={{
                    pathname:'/lover/lcdairy',
                    }}
                    ><i className='iconfont icon-jia'></i></Link>
              </div>
            </div>
        )
    }
}
