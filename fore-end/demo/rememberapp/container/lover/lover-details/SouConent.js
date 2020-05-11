import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TextInput
} from "react-native"
import {myFetch} from '../../../src/utils'
import Icon1 from 'react-native-vector-icons/Feather'
import { Actions } from 'react-native-router-flux';
const { width, scale, height } = Dimensions.get('window');
const s = width / 640;
export default class SouConent extends Component {
    constructor(){
        super()
        this.state = {
            arr:'',
            loverid:"",
            id:""
        }
    }
    componentDidMount(){
        console.log(this.props.data)
        this.setState({
            arr:this.props.data,
            id:this.props.data.id,
            loverid:this.props.data.lid,
        })
    }
    componentWillReceiveProps(nextProps) {
        const adata=nextProps.data;
        adata.map((item)=>{
            if(item.id==this.state.id){
                this.setState({
                    arr:item,
                    loverid:item.lid
                })
            }
        })    
    }
    save=()=>{
        myFetch.get('/lover/lsouvenir',{
            loverid:this.state.loverid,
        }).then(res=>{
            Actions.pop({refresh:({data:res.msg})})
        })
    }
    newStar(star){
        let ss='';
        if(star==1){
            ss = "❤";
        }
        else if(star==2){
            ss = "❤ ❤";
        }
        else if(star==3){
            ss = "❤ ❤ ❤";
        }else if(star==4){
            ss = "❤ ❤ ❤ ❤";
        }else if(star==5){
            ss = "❤ ❤ ❤ ❤ ❤";
        }
        return ss;
    }
    render() {
        const item=this.state.arr
        console.log(this.state.arr);
        return (
            <View>
            <View style={styles.navbar}>
                <Icon1
                    style={styles.icon}
                    name='chevron-left'
                    onPress={this.save}
                />
                <Text style={styles.title}>
                    详 情
                </Text>
                <Icon1
                        style={styles.icon1}
                        name="edit"
                        onPress={()=>Actions.lchsou({data:item})}
                    />
            </View>
                <View style={{
                      width:0.95*width,
                      height:0.85*height,
                    //   backgroundColor:'rgba(221,204,255,.3)',  
                      backgroundColor:"rgba(255,192,203,.2)",                      
                      borderRadius:10,
                      borderColor:"#888",
                      borderWidth:0.5,
                      marginRight:"auto",
                      marginLeft:"auto",
                      marginTop:25*s
                }}>
                    
                    <View style={{flexDirection:"row"}}>
                    <Text style={{
                        fontSize:25*s,
                        marginTop:30*s,
                        marginLeft:35*s,
                        marginRight:35*s
                }}
            >{item.date ? (item.date.length >= 10 ? item.date.substr(0, 10) : item.date) : ""}</Text> 
             <Text style={{
                    fontSize:35*s,
                    textAlign:"center",
                    color:"#FF1744",
                    marginTop:10*s,
                }}
            >{this.newStar(item.mood)}</Text> 
            </View>
                <TextInput 
                multiline={true}
                editable={false}
                style={{
                    marginRight:"auto",
                    marginLeft:"auto",
                    fontSize:25*s,
                    width:0.9*width,
                    backgroundColor:"#fff",                      
                    borderRadius:10,
                    marginBottom:16*s,
                    marginTop:35*s
,                   height:320*s,
                    color:"#000",
                    textAlignVertical: 'top',
                }}>
                    <Text style={{
                        fontSize:25*s,
                        fontWeight:"bold"
                    }}>{item.name}:</Text>
                    {item.content}
                </TextInput>
                  <Image
                style={{
                    height:0.45*height,
                    width:0.9*width,
                    marginRight:"auto",
                    marginLeft:"auto",
                    borderRadius:10,
                    marginTop:0*s
                }}
                 source={{uri:item.imgurl}}></Image>
                </View>
           </View>
        )
    }
}
const styles = StyleSheet.create({
    navbar:{
        width:width,
        height:65*s,
        backgroundColor: '#FFBF2D',
        flexDirection: 'row',
        paddingLeft:0.03*width,
        paddingTop:'1%',
        paddingRight:0.03*width,
        justifyContent:"center"
       
    },
    icon:{
        width:0.08*width,
        color:'#fff',
        fontSize:30,
    },
    icon1:{
        width:0.08*width,
        color:'#fff',
        fontSize:25,
    },
    title: {
        marginLeft: 'auto',
        marginRight: "auto",
        textAlign: 'center',
        fontSize: 20,
        color: '#fff',
        letterSpacing: 3
    },
})
