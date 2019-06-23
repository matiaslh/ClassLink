import React from 'react'
import { View, StyleSheet } from 'react-native';
import UserForms from '../utils/UserForms'
import requests from '../utils/requests'
import css from '../utils/css'
import Header from '../utils/Header'
import getNavigationOptions from '../utils/navigation'

export default class SignUp extends React.Component {
    static navigationOptions = () => {
        return getNavigationOptions({ title: 'Sign Up' })
    }

    handleSubmit = (state) => {
        if (state.password !== state.confirmPassword) {
            console.log("Passwords do not match")
            return
        }
        let { username, password } = state
        let navigate = this.props.navigation.navigate
        requests.signup({ username, password }, (user) => navigate('Notify', { criteria: user.criteria }), console.error)
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
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