import React from 'react'
import { View, StyleSheet } from 'react-native';
import UserForms from '../utils/UserForms'
import requests from '../utils/requests'
import css from '../utils/css'
import Header from '../utils/Header'
import getNavigationOptions from '../utils/navigation'

export default class SignUp extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return getNavigationOptions(navigation, { title: 'Sign Up' })
    }

    state = {
        email: '',
        password: '',
        confirmPassword: '',
        errorMessage: undefined
    }

    onChange = (obj) => {
        obj.errorMessage = undefined
        this.setState(obj, () => {
            if (this.state.password !== this.state.confirmPassword) {
                this.setState({ errorMessage: 'Passwords do not match' })
            } else {
                this.setState({ errorMessage: undefined })
            }
        })
    }

    handleSubmit = () => {
        let { email, password, confirmPassword } = this.state
        if (password !== confirmPassword) {
            console.error("Passwords do not match")
            return
        }
        let navigate = this.props.navigation.navigate
        requests.signup({ email, password }, (user) => navigate('Notify', { user }), (err) => {
            let message = ''
            if(err){
                if(err.info && typeof(err.info) === 'string'){
                    message = err.info
                }else if(err.info && err.info.message){
                    message = err.info.message
                }else{
                    message = "Invalid fields"
                }
            }
            this.setState({ errorMessage: message })
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Header pageName="SignUp" />
                </View>
                <View style={styles.formView}>
                    <UserForms type="signUp" title="Submit" errorMessage={this.state.errorMessage} onChange={this.onChange} handleSubmit={this.handleSubmit} />
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