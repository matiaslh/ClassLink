import React from 'react'
import { AppRegistry, View, TextInput, Text, Button, StyleSheet } from 'react-native';
import css from './cssVariables'

export default class Header extends React.Component {

    headers = {
        HomeView: {
            main: "U of Guelph NotifyMe",
            sub: "Sign up or login below to get started"
        },
        SignUp: {
            main: "U of Guelph NotifyMe",
            sub: "Sign up or login below to get started"
        },
        Login: {
            main: "U of Guelph NotifyMe",
            sub: "Sign up or login below to get started"
        },
        Notify: {
            main: "U of Guelph NotifyMe",
            sub: "Sign up or login below to get started"
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.textHeader}>{this.headers[this.props.pageName].main}</Text>
                <Text style={styles.textSubHeader}>{this.headers[this.props.pageName].sub}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '5%'
    },
    textSubHeader: {
        color: css.colours.text
    },
    textHeader: {
        color: css.colours.text,
        fontSize: 35
    }
})