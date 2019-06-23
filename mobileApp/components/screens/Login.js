import React from 'react'
import { View, StyleSheet } from 'react-native';
import UserForms from '../utils/UserForms'
import requests from '../utils/requests'
import Header from '../utils/Header';
import css from '../utils/css'
import getNavigationOptions from '../utils/navigation'

export default class Login extends React.Component {
    static navigationOptions = () => {
        return getNavigationOptions({ title: 'Login' })
    }

    handleSubmit = (state) => {
        let { username, password } = state
        let navigate = this.props.navigation.navigate
        requests.login({ username, password }, (user) => navigate('Notify', { criteria: user.criteria }), console.error)
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
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
    formView: {
        paddingTop: '10%'
    }
})

