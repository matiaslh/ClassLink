import React from 'react'
import { AppRegistry, View, TextInput, Text, Button, StyleSheet } from 'react-native';
import css from './cssVariables'

export default class SignUpForm extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.textView}>
                    <Text style={styles.text}>If you are trying to get into a U of Guelph course that is currently full, NotifyMe can help. It will notify you when one of the courses you are looking for has positions open</Text>
                </View>
                <View>
                    <View style={styles.button}>
                        <Button color="#e84eed" title="Sign Up" onPress={this.props.handleSignUp}></Button>
                    </View>
                    <View style={styles.button}>
                        <Button color="#e84eed" title="Login" onPress={this.props.handleLogin}></Button>
                    </View>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
    },
    textView: {
        marginBottom: '10%'
    },
    text: {
        fontSize: 15,
        color: css.colours.white
    },
    button: {
        marginTop: '10%'
    }
})