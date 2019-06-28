
import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase'
import { Alert } from 'react-native'
import Home from './components/screens/Home'
import SignUp from './components/screens/SignUp'
import Login from './components/screens/Login'
import Notify from './components/screens/Notify'
import EditCourse from './components/screens/EditCourse'
import Settings from './components/screens/Settings'
import Premium from './components/screens/Premium'


// persistence is to open the same page even after restarting the app
const persistenceKey = 'persistenceKey'
const persistNavigationState = async (navState) => {
	try {
		await AsyncStorage.setItem(persistenceKey, JSON.stringify(navState))
	} catch (err) {
		console.log(err)
	}
}
const loadNavigationState = async () => {
	const jsonString = await AsyncStorage.getItem(persistenceKey)
	return JSON.parse(jsonString)
}

const rootStack = createStackNavigator(
	{
		Home: Home,
		SignUp: SignUp,
		Login: Login,
		Notify: Notify,
		EditCourse: EditCourse,
		Settings: Settings,
		Premium: Premium
	},
	{
		initialRouteName: 'Home'
	}
);

const AppContainer = createAppContainer(rootStack);

export default class App extends React.Component {
	// rest of this is to send notifications from nodejs through firebase
	componentDidMount = async () => {
		await AsyncStorage.clear()
		this.checkPermission();
		this.createNotificationListeners();
	}
	componentWillUnmount = () => {
		this.notificationListener();
		this.notificationOpenedListener();
	}
	checkPermission = async () => {
		const enabled = await firebase.messaging().hasPermission();
		if (enabled) {
			this.getToken();
		} else {
			this.requestPermission();
		}
	}
	getToken = async () => {
		let fcm_tokens = await AsyncStorage.getItem('fcm_tokens');
		if (!fcm_tokens) {
			fcm_tokens = await firebase.messaging().getToken();
			if (fcm_tokens) {
				// user has a device token
				await AsyncStorage.setItem('fcm_tokens', fcm_tokens);
			}
		}
	}
	requestPermission = async () => {
		try {
			await firebase.messaging().requestPermission();
			this.getToken();
		} catch (error) {
		}
	}
	createNotificationListeners = async () => {
		//  Triggered when a particular notification has been received in foreground
		this.notificationListener = firebase.notifications().onNotification((notification) => {
			this.showAlert(notification);
		});

		//  If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
		this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
			this.showAlert(notificationOpen.notification);
		});


		//  If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
		const notificationOpen = await firebase.notifications().getInitialNotification();
		if (notificationOpen) {
			this.showAlert(notificationOpen.notification);
		}

		//  Triggered for data only payload in foreground
		this.messageListener = firebase.messaging().onMessage((message) => {
			//process data message
			console.log(JSON.stringify(message));
		});
	}

	showAlert = (notification) => {
		let courses = JSON.parse(notification._data.courses)
		Alert.alert(
			"NotifyMe U of G Courses Available", //title
			courses.join("\n"), // body
			[
				{ text: 'OK' },
			],
			{ cancelable: false },
		);
	}

	render() {
		return <AppContainer persistNavigationState={persistNavigationState} loadNavigationState={loadNavigationState} />;
	}
}

