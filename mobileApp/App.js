
import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Home from './components/Home'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Notify from './components/Notify'
import css from './components/cssVariables'

const RootStack = createStackNavigator(
	{
		Home: Home,
		SignUp: SignUp,
		Login: Login,
		Notify: Notify
	},
	{
		initialRouteName: 'Home',
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


