
import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { AsyncStorage } from 'react-native';
import Home from './components/screens/Home'
import SignUp from './components/screens/SignUp'
import Login from './components/screens/Login'
import Notify from './components/screens/Notify'
import EditCourse from './components/screens/EditCourse'
import Profile from './components/screens/Profile'
import Premium from './components/screens/Premium'
import AboutUs from './components/screens/AboutUs'

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
		Profile: Profile,
		Premium: Premium,
		AboutUs: AboutUs
	},
	{
		initialRouteName: 'Home',
	}
);

const AppContainer = createAppContainer(rootStack);

export default class App extends React.Component {
	render() {
		return <AppContainer persistNavigationState={persistNavigationState} loadNavigationState={loadNavigationState} />;
	}
}

