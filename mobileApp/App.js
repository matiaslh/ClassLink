
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import HomeView from './components/HomeView'
import SignUp from './components/SignUp'
import Login from './components/Login'
import css from './components/cssVariables'

export default class App extends Component {

  handleSignUp = () => {
    console.log("handle sign up")
    this.state.page = <SignUp />
    this.forceUpdate()
  }

  handleLogin = () => {
    console.log("handle login")
    this.state.page = <Login />
    this.forceUpdate()
  }

  state = {
    pageName: 'HomeView',
    page: (<HomeView handleSignUp={this.handleSignUp} handleLogin={this.handleLogin} />)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.textHeader}>U of Guelph NotifyMe</Text>
          <Text style={styles.text}>Sign up or login below to get started</Text>
        </View>
        <View style={styles.pageContainer}>
          {this.state.page}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: css.colours.blue,
  },
  pageContainer: {
    width: '50%',
    flex: 3,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '20%',
    flex: 1,
  },
  text: {
    color: 'white'
  },
  textHeader: {
    color: 'white',
    fontSize: 35
  }
});
