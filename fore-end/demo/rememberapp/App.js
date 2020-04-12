/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React,{useState,useEffect, Children} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  BackHandler,
  ToastAndroid,
  AsyncStorage,
} from 'react-native';
import {
  Router, 
  Overlay, 
  Scene, 
  Tabs, 
  Lightbox, 
  Modal,
  Actions,
} from 'react-native-router-flux';
import SplashScreen from 'react-native-splash-screen'
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Fontisto';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import Login from './src/common/Login';
import SwiperPage from './src/common/SwiperPage';
import Register from './src/common/Register';
import Child from './container/Child';
import Lover from './container/Lover';
import Community from './container/Community';
import My from './container/My';
import Lpictures from "./container/lover/Lpictures"
import Ldairy from "./container/lover/Ldairy"
import Llists from "./container/lover/Llists"
import Lsound from "./container/lover/Lsound"
import Lsouvenir from "./container/lover/Lsouvenir"
import T from './components/Tlists'
const {width,scale} = Dimensions.get('window');
const s = width / 640;
console.disableYellowBox=true;
const App = () => {
	let now = 0;
	let [isInstall,setInstall] = useState(true);
	let init = ()=>{
		AsyncStorage.getItem('isInstall')
		.then(res=>{
			if(!res){
				setInstall(false)
			}
		})
		AsyncStorage.getItem('isLogin')
		.then(res=>{
			if(res == 'false'){
				SplashScreen.hide();
                Actions.login();
			}else{
				SplashScreen.hide();
			}
		})
	}
	useEffect(()=>{
		init();
	},[])
	let afterInstall = ()=>{
		console.log('after install')
		setInstall(true)
	}
	if(!isInstall){
		return <View style={{flex:1}}>
			<SwiperPage 
				afterInstall={afterInstall}
			/>
		</View>
	}
	return (
		<Router
			backAndroidHandler={()=>{
				if(new Date().getTime()-now<2000){
					BackHandler.exitApp();
				}else{
					ToastAndroid.show('确定要退出吗',100);
					now = new Date().getTime();
					return true;
				}
			}}
		>
			<Overlay>
			<Modal key="modal" hideNavBar>
				<Lightbox key="lightbox">
					<Scene key="root">
						<Tabs 
							key='tabbar'
							hideNavBar
							activeTintColor="#FFBF2D"
              inactiveTintColor="#949494"
							tabBarStyle={{
								backgroundColor:'#fff',
                height:76*s,
							}}
						>
							{/* 亲子 */}
              <Scene key='child'
								title='亲子'
								icon={
									({focused})=><Icon3
										color={focused?'#FFBF2D':'#949494'} 
										name="face-recognition"
										size={25}
									/>
								}
							>
								<Scene key='chi' hideNavBar={true} component={Child}/>
							</Scene>

							{/* 爱人 */}
							<Scene key='lover'
								title='爱人'
								icon={
									({focused})=><Icon3
										color={focused?'#FFBF2D':'#949494'} 
										name="heart-pulse"
										size={30}
									/>
								}
								
							>
								<Scene key="love" hideNavBar={true} component={Lover} />
								<Scene key="lpictures" hideNavBar={true} component={Lpictures} />
								<Scene key='lsound' hideNavBar={true} component={Lsound} />
								<Scene key='llists' hideNavBar={true} component={Llists} />
								<Scene key='lsouvenir' hideNavBar={true} component={Lsouvenir} />
								<Scene key='ldairy' hideNavBar={true} component={Ldairy} />
							</Scene>
							{/* 社区 */}
							<Scene key='community'
								title='社区'
								icon={
									({focused})=><Icon3
										color={focused?'#FFBF2D':'#949494'} 
										name="camera-iris"
										size={25}
									/>
								}
								
							>
								<Scene key="com" hideNavBar={true} component={Community}/>
							</Scene>

              {/* 我的 */}
							<Scene key='mine'
								title='个人中心'
								icon={
									({focused})=><Icon3
										color={focused?'#FFBF2D':'#949494'} 
										name="home-circle"
										size={28}
									/>
								}
								
							>
								<Scene key="my" hideNavBar={true} component={My}/>
								
							</Scene>
						</Tabs>
					</Scene>
				</Lightbox>
				<Scene key='login' component={Login}/>
				<Scene key='register' component={Register}/>
			</Modal>
			</Overlay>
		</Router>
	);
};

const styles = StyleSheet.create({
  title:{
    width:'100%',
    height:300,
    backgroundColor:'red'
  }
})

export default App;