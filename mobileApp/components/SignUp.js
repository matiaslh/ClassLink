import React from 'react'
import { AppRegistry, View, TextInput, Text, Button, StyleSheet } from 'react-native';
import UserForms from './UserForms'
import Header from './Header';
import css from './css'

export default class SignUp extends React.Component {
    static navigationOptions = {
        title: 'Sign Up'
    }

    handleSubmit = (state) => {
        if (state.password !== state.confirmPassword) {
            console.log("Passwords do not match")
            return
        }
        let {username, password} = state
        fetch('/auth/register', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                email: 'nope',
                password: password,
            })
        }).then(res => {
            if (res.status === 'Success') {
                fetch('/auth/login', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password,
                    })
                }).then(res => {
                    if (res.status === 'Success') {
                        this.props.navigation.navigate('Notify')
                    }
                }).catch(err => console.log(err))
            }
        }).catch(err => console.log(err))
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerView}>
                    <Header pageName="SignUp" />
                </View>
                <View style={styles.formView}>
                    <UserForms type="signUp" title="Submit" handleSubmit={this.handleSubmit} />
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
    formView: {
        paddingTop: '10%'
    }
})