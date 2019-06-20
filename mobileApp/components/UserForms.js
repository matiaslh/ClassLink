import React from 'react'
import { AppRegistry, View, TextInput, Text, Button, StyleSheet } from 'react-native';
import css from './cssVariables'

export default class UserForms extends React.Component {

    state = {
        username: '',
        password: '',
        confirmPassword: ''
    }

    passwordsMatch = () => {
        return this.state.password === this.state.confirmPassword
    }

    render() {
        return (
            <View>
                <View>
                    <Text style={styles.label}>Username</Text>
                    <TextInput style={styles.input} name="username" onChangeText={(username) => this.setState({ username })} />
                    <Text style={styles.label}>Password</Text>
                    <TextInput secureTextEntry={true} style={styles.input} name="password" onChangeText={(password) => this.setState({ password })} />
                    {this.props.type === 'signUp' && <Text style={styles.label}>Confirm Password</Text>}
                    {this.props.type === 'signUp' && <TextInput secureTextEntry={true} style={styles.input} name="confirmPassword" onChangeText={(confirmPassword) => this.setState({ confirmPassword })} />}
                </View>
                <View>
                    {!this.passwordsMatch() && <Text style={styles.errorText} >Passwords do not match</Text>}
                </View>
                <View style={styles.submitView}>
                    <Button type='button' color={css.colours.pink} title={this.props.title} disabled={!this.passwordsMatch()} onPress={() => this.props.handleSubmit(this.state)}></Button>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        width: 200,
        borderColor: 'gray',
        backgroundColor: css.colours.white,
        borderWidth: 1,
        marginBottom:'5%'
    },
    label: {
        color: css.colours.white,
        textAlign: 'left'
    },
    submitView: {
        paddingTop: '10%'
    },
    errorText: {
        color: css.colours.error
    }
});