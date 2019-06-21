import React from 'react'
import { AppRegistry, View, TextInput, Text, Button, StyleSheet } from 'react-native';
import UserForms from './UserForms'
import Header from './Header';
import css from './cssVariables'

export default class Login extends React.Component {

    handleSubmit = (state) => {
        console.log(state)
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerView}>
                    <Header pageName="SignUp" />
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
        backgroundColor: css.colours.blue,
        height: '100%'
    },
    formView:{
        paddingTop:'10%'
    }
})

