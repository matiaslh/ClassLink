import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import css from './css'

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
            main: "Add/Edit Courses",
            sub: "These are the searches you will be notified for.\nUpdate them as you please."
        },
        EditCourse: {
            main: "U of Guelph NotifyMe",
            sub: "Sign up or login below to get started"
        },
        Settings : {
            main: "Settings",
            sub: "Change your settings below"
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
        color: css.colours.text,
        textAlign: 'center'
    },
    textHeader: {
        color: css.colours.text,
        fontSize: 35,
        textAlign: 'center'
    }
})