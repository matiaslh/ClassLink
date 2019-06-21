
import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeView from './components/HomeView'
import SignUp from './components/SignUp'
import Login from './components/Login'
import css from './components/cssVariables'

const RootStack = createStackNavigator(
	{
		Home: HomeView,
		SignUp: SignUp,
		Login: Login
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


