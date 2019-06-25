
import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Home from './components/screens/Home'
import SignUp from './components/screens/SignUp'
import Login from './components/screens/Login'
import Notify from './components/screens/Notify'
import EditCourse from './components/screens/EditCourse'
import Profile from './components/screens/Profile'
import Premium from './components/screens/Premium'

const rootStack = createStackNavigator(
	{
		Home: Home,
		SignUp: SignUp,
		Login: Login,
		Notify: Notify,
		EditCourse: EditCourse,
		Profile: Profile,
		Premium: Premium
	},
	{
		initialRouteName: 'Home',
	}
);

const AppContainer = createAppContainer(rootStack);

export default class App extends React.Component {
	render() {
		return <AppContainer />;
	}
}

