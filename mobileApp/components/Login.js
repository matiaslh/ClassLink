import React from 'react'
import { AppRegistry, View, TextInput, Text, Button, StyleSheet } from 'react-native';
import UserForms from './UserForms'
import Header from './Header';
import css from './css'

export default class Login extends React.Component {

    static navigationOptions = {
        title: 'Login'
    }

    handleSubmit = (state) => {
        console.log(state)
        this.props.navigation.navigate('Notify')
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerView}>
                    <Header pageName="Login" />
                </View>
                <View style={styles.formView}>
                    <UserForms type="login" title="Submit" handleSubmit={this.handleSubmit} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: css.colours.background,
        height: '100%'
    },
    formView:{
        paddingTop:'10%'
    }
})

