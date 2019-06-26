import React from 'react'
import { View, StyleSheet } from 'react-native';
import UserForms from '../utils/UserForms'
import requests from '../utils/requests'
import Header from '../utils/Header';
import css from '../utils/css'
import getNavigationOptions from '../utils/navigation'

export default class Login extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return getNavigationOptions(navigation, { title: 'Login' })
    }

    state = {
        email: '',
        password: '',
        errorMessage: undefined
    }

    onChange = (obj) => {
        obj.errorMessage = undefined
        this.setState(obj)
    }

    handleSubmit = () => {
        let { email, password } = this.state
        let navigate = this.props.navigation.navigate
        requests.login({ email, password }, (user) => navigate('Notify', { user }), (err) => {
            this.setState({ errorMessage: err.info })
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Header pageName="Login" />
                </View>
                <View style={styles.formView}>
                    <UserForms type="login" title="Submit" errorMessage={this.state.errorMessage} onChange={this.onChange} handleSubmit={this.handleSubmit} />
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

