import React from 'react'
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';
import css from './css'

export default class UserForms extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.label}>Email</Text>
                    <TextInput style={styles.input} name="email" onChangeText={(email) => this.props.onChange({ email })} />
                    <Text style={styles.label}>Password</Text>
                    <TextInput secureTextEntry={true} style={styles.input} name="password" onChangeText={(password) => this.props.onChange({ password })} />
                    {this.props.type === 'signUp' && <Text style={styles.label}>Confirm Password</Text>}
                    {this.props.type === 'signUp' && <TextInput secureTextEntry={true} style={styles.input} name="confirmPassword" onChangeText={(confirmPassword) => this.props.onChange({ confirmPassword })} />}
                </View>
                <View>
                    <Text style={styles.errorText}>{this.props.errorMessage}</Text>
                </View>
                <View style={styles.button}>
                    <Button color={css.colours.button} title={this.props.title} disabled={this.props.errorMessage !== undefined} onPress={this.props.handleSubmit}></Button>
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
        height: css.lengths.inputHeight,
        width: css.lengths.inputWidth,
        backgroundColor: css.colours.input,
        borderColor: css.colours.inputBorder,
        borderWidth: 1,
        marginBottom: css.lengths.betweenInputs,
    },
    label: {
        color: css.colours.text,
        textAlign: 'left'
    },
    button: {
        width: css.lengths.buttonWidth,
        marginTop: css.lengths.betweenButtons
    },
    errorText: {
        color: css.colours.error,
        padding: 20
    }
})