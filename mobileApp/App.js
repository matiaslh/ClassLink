
import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Home from './components/Home'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Notify from './components/Notify'
import EditCourse from './components/EditCourse'
import css from './components/css'

const RootStack = createStackNavigator(
	{
		Home: Home,
		SignUp: SignUp,
		Login: Login,
		Notify: Notify,
		EditCourse: EditCourse
	},
	{
		initialRouteName: 'Notify',
	}
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
	render() {
		return <AppContainer style={styles.container} />;
	}
}

const styles = StyleSheet.create({
	container: {
	}
})


