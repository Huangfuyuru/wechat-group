/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { useState, useEffect, Children } from 'react';
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
import Cpictures from './container/child/Cpicture'
import Ccpictures from './container/child/child_details/Ccpicture'
import Cspictures from './container/child/child_details/Showpicture'
import Capictures from './container/child/child_details/Addpictures'
import Csound from './container/child/Csound'
import Ccsound from './container/child/child_details/Ccsound'
import Cdairy from './container/child/Cdairy'
import Ccdairy from './container/child/child_details/Ccdairy'
import Csdairy from './container/child/child_details/Showdairy';
import Cgrowup from './container/child/Cgrowup'
import Ccgrowup from './container/child/child_details/Ccgrow'
import Cevents from './container/child/Cevent'
import Ccevents from './container/child/child_details/Ccevent'
import Csevents from './container/child/child_details/Showevent'
import Cstudy from './container/child/Cstudy'
import Ccstudy from './container/child/child_details/Ccstudy'


import Lover from './container/Lover';
// 
import Lpictures from "./container/lover/Lpictures"
import LCpictures from "./container/lover/lover-details/Lcreate_photo"
import LSpictures from "./container/lover/lover-details/LSpictures"
import Laddpictures from "./container/lover/lover-details/Laddpictures"
// 
import Ldairy from "./container/lover/Ldairy"
import LCdairy from "./container/lover/lover-details/Lcreate_note"
import LSdairy from  "./container/lover/lover-details/darContent"
// 
import Llists from "./container/lover/Llists"
import LSlists from "./container/lover/lover-details/LSlists"
import Llist from "./container/lover/lover-details/listContent"
import LClists from "./container/lover/lover-details/Lcreate_list"

// 
import Lsound from "./container/lover/Lsound"
import LCsound from "./container/lover/lover-details/Lcreate_sound"
// 
import Lsouvenir from "./container/lover/Lsouvenir"
import LCsouvenir from "./container/lover/lover-details/Lcreate_souver"
// 
import Community from './container/Community';
import My from './container/My';

import Mychilds from './container/my/Mychilds'
import Mylover from './container/my/Mylover'
import Mmchilds from './container/my/Mmchilds'
import Mmlover from './container/my/Mmlover'
import Myfriend from './container/my/Myfriend'
import Message from './container/my/Message'
import Use from './container/my/Use'


import T from './components/Tlists'
import Mychild from './container/my/Mychilds';
const { width, scale } = Dimensions.get('window');
const s = width / 640;
console.disableYellowBox = true;
const App = () => {
	let now = 0;
	let [isInstall, setInstall] = useState(true);
	let init = () => {
		AsyncStorage.getItem('isInstall')
			.then(res => {
				if (!res) {
					setInstall(false)
				}
			})
		AsyncStorage.getItem('isLogin')
			.then(res => {
				if (res == 'false') {
					SplashScreen.hide();
					Actions.login();
				} else {
					SplashScreen.hide();
				}
			})
	}
	useEffect(() => {
		init();
	}, [])
	let afterInstall = () => {
		console.log('after install')
		setInstall(true)
	}
	if (!isInstall) {
		return <View style={{ flex: 1 }}>
			<SwiperPage
				afterInstall={afterInstall}
			/>
		</View>
	}
	return (
		<Router
			backAndroidHandler={() => {
				if (Actions.currentScene != 'child'
					&& Actions.currentScene != 'lover'
					&& Actions.currentScene != 'community'
					&& Actions.currentScene != 'mine') {
					Actions.pop();
					return true;
				} else {
					if (new Date().getTime() - now < 2000) {
						BackHandler.exitApp();
					} else {
						ToastAndroid.show('确定要退出吗', 100);
						now = new Date().getTime();
						return true;
					}
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
									backgroundColor: '#fff',
									borderTopColor: 'rgba(204,204,204,0.1)',
									borderTopWidth: 3,
									height: 70 * s,
								}}
							>
								{/* 亲子 */}
								<Scene key='child'
									title='亲子'
									icon={
										({ focused }) => <Icon3
											color={focused ? '#FFBF2D' : '#949494'}
											name="face-recognition"
											size={25}
										/>
									}
								>
									<Scene key='child' hideNavBar={true} component={Child} />
									<Scene
										key='cpictures'
										hideTabBar
										hideNavBar={true}
										component={Cpictures} />
									<Scene
										key='ccpictures'
										hideTabBar
										hideNavBar={true}
										component={Ccpictures} />
									<Scene
										key='cspictures'
										hideTabBar
										hideNavBar={true}
										component={Cspictures} />
									<Scene
										key='capictures'
										hideTabBar
										hideNavBar={true}
										component={Capictures} />
									<Scene
										key='csound'
										hideTabBar
										hideNavBar={true}
										component={Csound} />
									<Scene
										key='ccsound'
										hideTabBar
										hideNavBar={true}
										component={Ccsound} />
									<Scene
										key='cdairy'
										hideTabBar
										hideNavBar={true}
										component={Cdairy} />
									<Scene
										key='ccdairy'
										hideTabBar
										hideNavBar={true}
										component={Ccdairy} />
									<Scene
										key='csdairy'
										hideTabBar
										hideNavBar={true}
										component={Csdairy} />
									<Scene
										key='cgrowup'
										hideTabBar
										hideNavBar={true}
										component={Cgrowup} />
									<Scene
										key='ccgrowup'
										hideTabBar
										hideNavBar={true}
										component={Ccgrowup} />
									<Scene
										key='cevents'
										hideTabBar
										hideNavBar={true}
										component={Cevents} />
									<Scene
										key='ccevents'
										hideTabBar
										hideNavBar={true}
										component={Ccevents} />
									<Scene
										key='csevents'
										hideTabBar
										hideNavBar={true}
										component={Csevents} />
									<Scene
										key='cstudy'
										hideTabBar
										hideNavBar={true}
										component={Cstudy} />
									<Scene
										key='ccstudy'
										hideTabBar
										hideNavBar={true}
										component={Ccstudy} />

								</Scene>

								{/* 爱人 */}
								<Scene key='lover'
									title='爱人'
									icon={
										({ focused }) => <Icon3
											color={focused ? '#FFBF2D' : '#949494'}
											name="heart-pulse"
											size={30}
										/>
									}

								>
									<Scene key="lover" hideNavBar={true} component={Lover} />

									<Scene key="lpictures" hideTabBar hideNavBar={true} component={Lpictures} />
									<Scene key='lspictures' hideTabBar hideNavBar={true} component={LSpictures} />
									<Scene key='lcpictures' hideTabBar hideNavBar={true} component={LCpictures} />
									<Scene key='addpictures' hideTabBar hideNavBar={true} component={Laddpictures} />

									<Scene key='lsound' hideTabBar hideNavBar={true} component={Lsound} />
									<Scene key='lcsound' hideTabBar hideNavBar={true} component={LCsound} />


									<Scene key='llists' hideTabBar hideNavBar={true} component={Llists} />
									<Scene key='lclist' hideTabBar hideNavBar={true} component={LClists} />
									<Scene key='lslists' hideTabBar hideNavBar={true} component={LSlists} />
									<Scene key='list' hideTabBar hideNavBar={true} component={Llist} />

									<Scene key='lsouvenir' hideTabBar hideNavBar={true} component={Lsouvenir} />
									<Scene key='lcsouvenir' hideTabBar hideNavBar={true} component={LCsouvenir} />


									<Scene key='ldairy' hideTabBar hideNavBar={true} component={Ldairy} />
									<Scene key='lcdairy' hideTabBar hideNavBar={true} component={LCdairy} />
									<Scene key='lsdairy' hideTabBar hideNavBar={true} component={LSdairy} />

								</Scene>
								{/* 社区 */}
								<Scene key='community'
									title='社区'
									icon={
										({ focused }) => <Icon3
											color={focused ? '#FFBF2D' : '#949494'}
											name="camera-iris"
											size={25}
										/>
									}

								>
									<Scene key="community" hideNavBar={true} component={Community} />
								</Scene>

								{/* 我的 */}
								<Scene key='mine'
									title='个人中心'
									icon={
										({ focused }) => <Icon3
											color={focused ? '#FFBF2D' : '#949494'}
											name="home-circle"
											size={28}
										/>
									}

								>
									<Scene key="mine" hideNavBar={true} component={My} />
									<Scene key="Mychilds" hideNavBar={true} component={Mychilds} />
									<Scene key="Mylover" hideNavBar={true} component={Mylover} />
									<Scene key='Mmchilds' hideNavBar={true} component={Mmchilds} />
									<Scene key='Mmlover' hideNavBar={true} component={Mmlover} />
									<Scene key='Myfriend' hideNavBar={true} component={Myfriend} />
									<Scene key='Message' hideNavBar={true} component={Message} />
									<Scene key='Use' hideNavBar={true} component={Use} />

								</Scene>
							</Tabs>
						</Scene>
					</Lightbox>
					<Scene key='login' component={Login} />
					<Scene key='register' component={Register} />
				</Modal>
			</Overlay>
		</Router>
	);
};

const styles = StyleSheet.create({

})

export default App;