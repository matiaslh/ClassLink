import React from 'react'
import { AppRegistry, View, TextInput, Text, Button, StyleSheet } from 'react-native';
import UserForms from './UserForms'

export default class SignUp extends React.Component {

    handleSubmit = (state) => {
        console.log(state)
    }

    render() {
        return (
            <View>
                <UserForms type="signUp" title="Sign Up" handleSubmit={this.handleSubmit} />
            </View>
        )
    }
}

