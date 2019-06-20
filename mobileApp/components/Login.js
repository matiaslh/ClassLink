import React from 'react'
import { AppRegistry, View, TextInput, Text, Button, StyleSheet } from 'react-native';
import UserForms from './UserForms'

export default class Login extends React.Component {

    handleSubmit = (state) => {
        console.log(state)
    }

    render() {
        return (
            <View>
                <UserForms type="login" title="Login" handleSubmit={this.handleSubmit} />
            </View>
        )
    }
}

