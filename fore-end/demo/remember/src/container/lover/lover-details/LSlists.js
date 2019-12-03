import React, { Component } from 'react'
import {NavBar,WingBlank} from "antd-mobile"
import {Link} from "react-router-dom"
import "../../../css/lover.css"
export default class LSlists extends Component {
    constructor(){
        super();
        this.state={

          imgArr:JSON.parse(localStorage.getItem("key", this.state)) || []
            // imgArr:[
            //     {
            //         img:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=432888676,1370031587&fm=26&gp=0.jpg",
            //         note:"一起看电影",
            //         time:"2019-12-2",
            //     },
            //     {
            //         img:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=432888676,1370031587&fm=26&gp=0.jpg",
            //         note:"一起看电影",
            //         time:"2019-12-2",
            //     },
            //     {
            //         img:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=432888676,1370031587&fm=26&gp=0.jpg",
            //         note:"一起看电影",
            //         time:"2019-12-2",
            //     },
            //     {
            //         img:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=432888676,1370031587&fm=26&gp=0.jpg",
            //         note:"一起看电影",
            //         time:"2019-12-2",
            //     }
               
       
        }
    }
    add=()=>{
        var item={
            img:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=432888676,1370031587&fm=26&gp=0.jpg",
            note:"一起看电影",
            time:"2019-12-2",
        }
        this.setState({
            imgArr: [...this.state.imgArr,item]
        },()=>{
            localStorage.setItem("key",JSON.stringify(this.state.imgArr))
        })
    }
    delete=(a)=>{
        let imgArr= [...this.state.imgArr];
        imgArr.splice(a,1);
        this.setState({
            imgArr:imgArr
        },()=>{
            localStorage.setItem("key",JSON.stringify(this.state.imgArr))
        })
    }
    render() {
        return (
            <div style={{height:"100%",width:"100%",backgroundColor:"white"}}>
                <NavBar style={{background:'#FFBF2D',height:'8vh'}}
                 leftContent={[
                    <Link to="/lover/list" style={{color:"white"}}><div className="iconfont icon-arror_left_blod" style={{ marginRight: '26px' }} /></Link>,
                   ]}
                ><span style={{fontWeight:'bold',fontSize:'6vw',textIndent:'3vw',letterSpacing:'3vw'}}>所有清单</span></NavBar>
    <WingBlank><button style={{height:"20%",width:"100%",backgroundColor:"white",fontSize:"5vw",marginTop:"2%"}}>已完成3/{this.state.imgArr.length}</button></WingBlank>
                {
                    this.state.imgArr.map((item,idex)=>(
                        <div className="limages" >
                            <img src={item.img} alt=""></img>
                            <p>{item.note}</p>
                            <p>{item.time}</p>
                            <button onClick={()=>this.delete(idex)} style={{backgroundColor:"white",height:"20%",width:"30%"}}>删除</button>
                        </div>
                    ))
                }
                <img src={require("../../../image/jia.jpg")}  className="lovesou-foot"   alt="" onClick={this.add}></img>
                
            </div>
        )
    }
}
