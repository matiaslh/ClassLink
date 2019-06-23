import React from 'react'
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';
import css from './css'

export default class UserForms extends React.Component {

    state = {
        username: '',
        password: '',
        confirmPassword: '',
    }

    passwordsMatch = () => {
        return this.props.type !== 'signUp' || this.state.password === this.state.confirmPassword
    }

    errorMessage = () => {
        if (!this.passwordsMatch()) {
            return "Passwords do not match"
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.label}>Username</Text>
                    <TextInput style={styles.input} name="username" onChangeText={(username) => this.setState({ username })} />
                    <Text style={styles.label}>Password</Text>
                    <TextInput secureTextEntry={true} style={styles.input} name="password" onChangeText={(password) => this.setState({ password })} />
                    {this.props.type === 'signUp' && <Text style={styles.label}>Confirm Password</Text>}
                    {this.props.type === 'signUp' && <TextInput secureTextEntry={true} style={styles.input} name="confirmPassword" onChangeText={(confirmPassword) => this.setState({ confirmPassword })} />}
                </View>
                <View>
                    <Text style={styles.errorText}>{this.errorMessage()}</Text>
                </View>
                <View style={styles.submitView}>
                    <Button type='button' color={css.colours.button} title={this.props.title} disabled={!this.passwordsMatch()} onPress={() => this.props.handleSubmit(this.state)}></Button>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    input: {
        height: 30,
        width: 200,
        backgroundColor: css.colours.input,
        marginBottom: '5%',
    },
    label: {
        color: css.colours.text,
        textAlign: 'left'
    },
    submitView: {
        width: '50%',
        paddingTop: '2%'
    },
    errorText: {
        color: css.colours.error
    }
})