import React, { Component } from 'react'
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  PermissionsAndroid,
  ImageBackground,
  Alert,
  ToastAndroid,
  Platform
} from "react-native"
import moment from 'moment'
import { myFetch } from '../../../src/utils'
import Icon1 from 'react-native-vector-icons/Feather'
import Icon2 from "react-native-vector-icons/Entypo"
import Icon3 from "react-native-vector-icons/FontAwesome5"
import Icon4 from "react-native-vector-icons/Ionicons"
import Icon5 from 'react-native-vector-icons/FontAwesome'
import Icon6 from 'react-native-vector-icons/AntDesign'
import Icon7 from 'react-native-vector-icons/MaterialCommunityIcons'
import { Actions } from "react-native-router-flux"
import { WingBlank } from '@ant-design/react-native'
import RNFileSelector from "react-native-file-selector"
import { AudioRecorder, AudioUtils } from 'react-native-audio';
import Button from 'react-native-button'
const { width, scale, height } = Dimensions.get('window');
const s = width / 640;
export default class Lcreate_sound extends Component {
  constructor() {
    var date = moment(new Date()).format("YYYY-MM-DD").split('-');
    super();
    this.state = {
      opacity: 1,
      childsid:"",
      year: date[0],
      month: date[1],
      day: date[2],
      name: "",
      vouri: "",
      img: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1097372906,871370388&fm=26&gp=0.jpg',
      currentTime: 0,//
      recording: false,//是否录音
      stoppedRecording: false,
      audioPath: AudioUtils.DocumentDirectoryPath + '/test.mp3',//生成的录音
      hasPermission: undefined,
    }
    this.timer = null
  }
  componentDidMount() {
    this.setState({
      childsid: this.props.childsid
    });
    // 页面加载完成后获取权限
    this.checkPermission().then((hasPermission) => {
      this.setState({ hasPermission });

      //如果未授权, 则执行下面的代码
      if (!hasPermission) return;
      this.prepareRecordingPath(this.state.audioPath);
      AudioRecorder.onProgress = (data) => {
        this.setState({ currentTime: Math.floor(data.currentTime) });
      };
      AudioRecorder.onFinished = (data) => {
        if (Platform.OS === 'ios') {
          this.finishRecording(data.status === "OK", data.audioFileURL);
        }
      };

    })
  }
  checkPermission() {
    if (Platform.OS !== 'android') {
      return Promise.resolve(true);
    }
    const rationale = {
      'title': '获取录音权限',
      'message': 'XXX正请求获取麦克风权限用于录音,是否准许'
    };
    return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, rationale)
      .then((result) => {
        // alert(result);     //结果: granted ,    PermissionsAndroid.RESULTS.GRANTED 也等于 granted
        return (result === true || PermissionsAndroid.RESULTS.GRANTED)
      })
  }
  prepareRecordingPath(audioPath) {
    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: "Low",
      AudioEncoding: "mp3",
      AudioEncodingBitRate: 32000
    });
  }
  formatMediaTime(duration) {
    let min = Math.floor(duration / 60);
    let second = duration - min * 60;
    min = min >= 10 ? min : "0" + min;
    second = second >= 10 ? second : "0" + second;
    return min + ":" + second;
  }
  /**
  * 开始录音
  * 
  */
  async _record() {
    if (!this.state.recording) {
      if (this.state.recording) {
        ToastAndroid.show("正在录音", ToastAndroid.SHORT);
        console.warn('Already recording!');
        return;
      }

      if (!this.state.hasPermission) {
        ToastAndroid.show("无法录音，请授予权限", ToastAndroid.SHORT);
        console.warn('Can\'t record, no permission granted!');
        return;
      }

      if (this.state.stoppedRecording) {
        this.prepareRecordingPath(this.state.audioPath);
      }

      this.setState({ recording: true });

      try {
        const filePath = await AudioRecorder.startRecording();
        this.timer = setInterval(function () {
          var opacity = this.state.opacity;
          var num = this.state.currentTime;
          num = num + 1;
          opacity -= 0.8
          if (opacity < 0.1) {
            opacity = 1;
          }
          this.setState({
            currentTime: num,
            opacity: opacity
          });
        }.bind(this), 1000);
        // console.warn(filePath);
      } catch (error) {
        console.error(error);
      }
    }
    else {
      try {
        this.timer && clearInterval(this.timer);
        const filePath = await AudioRecorder.stopRecording();
        this.setState({
          // currentTime: 0,
          stoppedRecording: true,
          recording: false,
          opacity: 1
        });
        if (this.state.stoppedRecording) {
          this.prepareRecordingPath(this.state.audioPath);
        }
        const formData = new FormData()
        formData.append('file', "file://" + this.state.audioPath);
        fetch("http://148.70.223.218:3001/sound", {
          method: 'post',
          headers: {
            'Content-Type': 'multipart/form-data',
            'Content-Encoding': 'identity'
          },
          body: formData
        }).then(res => {
          console.log('res', res)
        }).catch(err => {
          console.log('err', err)
        })
        // return filePath;
      } catch (error) {
        console.error(error);
      }
    }
  }
  additem = () => {
    myFetch.post(`/child/csound/ccsound`, {
      name: this.state.name,
      setdate: this.state.year + "-" + this.state.month + "-" + this.state.day,
      childsid: this.state.childsid,
      voiceurl: "https://webfs.yun.kugou.com/202005121224/a294c0ffcfb16b0320d9d929db13df07/G207/M07/1E/0F/b4cBAF6r6lWAev55ABLPq4wIH38048.mp3"
    })
      .then(res => {
        if(res.data!=[]){
          setTimeout(()=>{
              Actions.pop({refresh:({data:res.data})})
          },1000)
          ToastAndroid.show(this.state.name+'，'+res.msg, ToastAndroid.SHORT);
      }else{
          ToastAndroid.show(res.msg, ToastAndroid.SHORT);
      }
      })
  }
  upFile = () => {
   let filterFile = ".+(.mp3|.m4a|.aac)$";
    RNFileSelector.Show({
      title: "选择文件",
      closeMenu: true,
      filter: filterFile,
      onDone: function (path) {
        let Path =`file://${path}`;
        let fileParams = {mime: '', path: Path}
        let fileArr = path.split('.');
        console.log(path)
      },
      onCancel: function () {
        console.log("取消")
      }
    })
  }
  render() {
    const time = this.state.currentTime;
    return (
      <View>
        <View style={styles.navbar}>
          <Icon1
            style={styles.icon}
            name='chevron-left'
            onPress={() => Actions.pop()}
          />
          <Text style={styles.title}>新增语音</Text>
        </View>
        <WingBlank style={styles.wingblank}>
          <View style={styles.msgbox}>
            <View style={styles.msg}>
              <Text style={styles.text}>
                <Icon5 style={styles.listlineicon} name='calendar-check-o' />  日期：</Text>
              <TextInput
                keyboardType='numeric'
                maxLength={4}
                defaultValue={this.state.year}
                style={styles.input}
                editable={false}
                onChangeText={(text) => {
                  this.setState({ year: text });
                }}
              />
              <Text style={styles.unit}>
                年
                            </Text>
              <TextInput
                onFocus={this.timenotice}
                keyboardType='numeric'
                maxLength={2}
                defaultValue={this.state.month}
                style={styles.input}
                editable={false}
                onChangeText={(text) => {
                  this.setState({ month: text });
                }}
              />
              <Text style={styles.unit}>
                月
                            </Text>
              <TextInput
                onFocus={this.timenotice}
                keyboardType='numeric'
                maxLength={2}
                defaultValue={this.state.day}
                style={styles.input}
                editable={false}
                onChangeText={(text) => {
                  this.setState({ day: text });
                }}
              />
              <Text style={styles.unit}>
                日
                            </Text>
            </View>
            <View style={styles.msg}>
              <Text style={styles.text}>
                <Icon6 style={styles.listlineicon} name='edit' />  名称：</Text>
              <TextInput
                maxLength={10}
                placeholder='第一次去旅行'
                style={styles.tag}
                onChangeText={(text) => {
                  this.setState({ name: text });
                }}
              />
            </View>
          </View>
          <View style={styles.viocechoose}>
            <Text style={styles.viocetext}>添加语音</Text>
            <TouchableOpacity style={styles.viocebtn} onPress={this.upFile}>
              <Icon7 size={45 * s} style={styles.iconvioce} name='audiobook' />
            </TouchableOpacity>
            <TouchableOpacity style={styles.viocebtn} onPress={() => {
              this._record()
            }}>
              <Icon4 size={48 * s} style={styles.iconvioce} name='md-mic' />
            </TouchableOpacity>
          </View>
          <View style={[styles.vioce]}>
            <Text style={{
              textAlignVertical: 'center',
              textAlign: 'center',
              fontSize: 30,
              color: "red",
              opacity: this.state.opacity
            }}>●&nbsp;&nbsp;</Text>
            <Text style={{
              textAlignVertical: 'center',
              textAlign: 'center',
              fontSize: 25,
            }}>00:{this.formatMediaTime(time)}</Text>
          </View>
          {/* <RNFileSelector title={"hhhhh"}  onDone={() => {
            console.log("file selected: " + path);
          }} onCancel={() => {
            console.log("cancelled");
          }} /> */}
          <Button
            onPress={this.additem}
            style={styles.addbtn}>添加语音</Button>
        </WingBlank>
      </View>

    )
  }
}
const styles = StyleSheet.create({
  navbar: {
    width: width,
    height: 65 * s,
    backgroundColor: '#FFBF2D',
    flexDirection: 'row',
    paddingLeft: 0.02 * width,
    paddingTop: '1%',
    paddingRight: 0.1 * width,
    justifyContent: "center"
  },
  icon: {
    width: 0.08 * width,
    color: '#fff',
    fontSize: 30,
  },
  title: {
    marginLeft: 'auto',
    marginRight: "auto",
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
    letterSpacing: 3
  },
  wingblank: {
    // backgroundColor:'#ccc',
    height: 0.75 * height,
    marginTop: 0.025 * height
  },
  msgbox: {
    // backgroundColor:'rgba(204,204,204,0.2)',
    // backgroundColor:'rgba(204,204,204,0.1)',
    width: 0.9 * width,
    height: 0.18 * height,
    paddingBottom: 0.01 * height,
    paddingTop: 0.01 * height,
    // backgroundColor:'#000',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 0.015 * height,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  msg: {
    backgroundColor: 'rgba(255,255,255,1)',
    // backgroundColor:'rgba(204,204,204,0.2)',
    width: 0.85 * width,
    height: 0.06 * height,
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  listlineicon: {
    fontSize: 35 * s,
    color: '#FFBF2D',
    // backgroundColor:'#ccc'
  },
  text: {
    textAlign: 'center',
    marginRight: 0.02 * width,
    textAlignVertical: 'center',
    width: 0.19 * width,
    fontSize: 23 * s,
    color: '#555',
    // backgroundColor:'#000'
  },
  input: {
    width: 0.13 * width,
    fontSize: 22 * s,
    textAlign: 'center',
    color: '#333'
  },
  unit: {
    textAlign: 'center',
    marginLeft: 0.003 * width,
    marginRight: 0.003 * width,
    textAlignVertical: 'center',
    width: 0.03 * width,
    fontSize: 23 * s,
    color: '#555',
  },
  tag: {
    width: 0.5 * width,
    // backgroundColor:'#ccc',
    textAlign: 'center',
    textAlignVertical: 'center',
    borderColor: '#bdbbb8',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    fontSize: 25 * s,
    color: '#333'
  },
  textbtn: {
    textAlign: 'center',
    textAlignVertical: 'center',
    width: 0.25 * width,
    height: 45 * s,
    fontSize: 26 * s,
    color: '#333',
    textAlignVertical: 'center',
  },
  viocechoose: {
    // backgroundColor:'rgba(255,255,255,1)',
    backgroundColor: 'rgba(204,204,204,0.2)',
    borderRadius: 5,
    paddingTop: 0.01 * height,
    width: 0.85 * width,
    height: 0.06 * height,
    marginTop: 0.05 * height,
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  viocetext: {
    width: 0.3 * width,
    height: 0.04 * height,
    // backgroundColor:'#ddd',
    marginRight: 0.25 * width,
    color: '#555',
    fontSize: 25 * s,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  iconvioce: {
    width: 0.15 * width,
    textAlign: 'center',
    height: 0.04 * height,
    textAlignVertical: 'center',
    // backgroundColor:'#ccddff',
    color: '#FFBF2D'
  },
  vioce: {
    width: 0.85 * width,
    height: 0.1 * height,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 0.01 * height,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: 'rgba(204,204,204,0.2)',
  },
  addbtn: {
    width: 0.8 * width,
    height: 80 * s,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 0.1 * height,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#FFBF2D',
    borderRadius: 5,
    color: '#FFBF2D',
    fontSize: 22,
    textAlignVertical: 'center'
  }
})