import React, { Component } from 'react'
import { 
    Text, 
    TextInput,
    StyleSheet, 
    Dimensions, 
    View, 
    Image, 
    TouchableOpacity, 
    AsyncStorage,
    ToastAndroid,
    StatusBar,
    ScrollView,
    Picker,
} from 'react-native'
import {
    Actions
} from 'react-native-router-flux'
import { Flex, WingBlank } from '@ant-design/react-native'
import Button from 'react-native-button';
const { width, scale, height } = Dimensions.get('window');
const s1 = width / 640;
const h = height / 1012;
export default class Use extends Component {
    inputChange1=(e)=>{
        this.setState({
            name:e.target.value
        })
    }
    inputChange2=(e)=>{
        this.setState({
            gender:e.target.value
        })
    }
    inputChange3=(e)=>{
        this.setState({
            pass:e.target.value
        })
    }
    render() {
        return (
            <View style={{ 
                width: width, 
                height: height, 
                backgroundColor: "#fff",
            }}>
                <StatusBar 
                    backgroundColor='#FFBF2D'
                />
                <View style={styles.navbar}>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 20,
                        textIndent: 3,
                        letterSpacing: 3,
                        color: "#ffff",
                        lineHeight: 40
                    }}
                    >设置</Text>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    navbar:{
        width:width,
        height:65*s1,
        backgroundColor:'#FFBF2D',
        flexDirection: 'row',
        paddingTop:'1%',
        justifyContent:"center"
    },
})
//  import React, { Component } from 'react';
// import { NavBar, Icon } from 'antd-mobile';
// import {Link} from 'react-router-dom';

// export default class Use extends Component {
//     constructor(props){
//         super(props);
//         var uid = JSON.parse(localStorage.getItem('uid'));
//         var umsg = JSON.parse(localStorage.getItem('umsg'));
//         this.state={
//             umsg:umsg,
//             name:umsg.name,
//             pass:umsg.pass,
//             uid:uid,
//             gender:umsg.gender,
//             imgurl:umsg.imgurl,
//             // uimage:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574914271954&di=5ce6c90533745142d11594040dd0b2b1&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201506%2F19%2F20150619202710_4vZ8s.thumb.224_0.jpeg',
//             code:0,
//         }
//     }
//     upfile=()=>{
//         var file=document.getElementById('img').files[0];
//         var url = 'http://localhost:3001/img';
//         var form = new FormData();
//         form.append("file",file);
//         fetch(url,{
//             method:'POST',
//             body:form
//         }).then(res=>res.json())
//         .then(res=>{
//             this.setState({
//                 src:res.path,
//                 imgurl:res.path
//             })
//         })
//     }
//     inputChange1=(e)=>{
//         this.setState({
//             name:e.target.value
//         })
//     }
//     inputChange2=(e)=>{
//         this.setState({
//             gender:e.target.value
//         })
//     }
//     inputChange3=(e)=>{
//         this.setState({
//             pass:e.target.value
//         })
//     }
//     Finally=()=>{
//         var umsg = JSON.parse(localStorage.getItem('umsg'));
//         umsg.name=this.state.name;
//         umsg.imgurl=this.state.imgurl;
//         umsg.pass=this.state.pass;
//         umsg.gender=this.state.gender;
//         localStorage.setItem('umsg',JSON.stringify(umsg))
//         fetch(`http://localhost:3001/my/information`,{
//             method:'POST',
//             mode:'cors',
//             headers:{
//                 'Content-Type':"application/x-www-form-urlencoded"
//             },
//             body:`&uimage=${this.state.imgurl}&uname=${this.state.name}&gender=${this.state.gender}&pass=${this.state.pass}&uid=${this.state.uid}`
//         }).then(res=>res.json())
//         .then(json=>{
//             this.setState({
//                 code:json.code
//             });
//         })
//     }
//     render(){
//         return(
//             <div className="All">
//                 <NavBar
//                     style={{
//                     top:0,
//                     width:'100%',
//                     zIndex:'11',
//                     position:'fixed',
//                     height:'8vh',
//                     background:'#FFBF2D',
//                     color:'#fff',
//                     fontWeight:'bolder',
//                     }}
//                     mode="light"
//                     icon={'𡿨'}
//                     onLeftClick={() => this.props.history.push('/index/my')}
//                     ><span style={{
//                         fontWeight:'bold',
//                         fontSize:'6vw',
//                         textIndent:'3vw',
//                         letterSpacing:'3vw',
//                         color:"white"
//                     }}
//                     >设置</span>
//                 </NavBar>
//                 <div style={{width:"100%",height:"10px",marginTop:"15%"}}></div>
//                 <p className="img">
//                     <i className='iconfont icon-touxiangshangchuan'></i>  
//                     <span>轻触上传头像<input 
//                     id='img'
//                     onChange={this.upfile}                         
//                     type='file'  
//                     accept="image/*" 
//                     capture="camera" 
//                     name='uimage' 
//                     placeholder='轻触上传头像'/></span>                          
//                     <div style={{
//                         width:'20vw',
//                         height:'10vh',
//                         display:'inline-block',
//                         marginLeft:'6vw'}}>
//                             <img src={this.state.imgurl} 
//                             alt='默认头像'
//                             width='100%'/>              
//                     </div>
//                 </p>
//                 <form action='' style={{marginTop:"10%"}}>
//                     <div className="create_Relation">
//                         设置昵称：&nbsp;
//                         <input onChange={(e)=>this.inputChange1(e)} className="one" type="text" placeholder="昵称不超过6个字"></input>
//                     </div>
//                     <div className="create_Relation">
//                         设置性别：&nbsp;
//                         <input onChange={(e)=>this.inputChange2(e)} className="one" type="text" placeholder="男/女"></input>
//                     </div>
//                     <div className="create_Relation">
//                         设置新密码：&nbsp;
//                         <input onChange={(e)=>this.inputChange3(e)} className="one" type="text" placeholder="单行输入"></input>
//                     </div>
//                     <Link to="/index/my">
//                         <button onClick={this.Finally} className="relation_button">确认修改</button>
//                     </Link>
//                 </form>
//             </div>
//         )
//     }
// }