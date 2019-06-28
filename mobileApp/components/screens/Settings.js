import React from 'react'
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';
import css from '../utils/css'
import constants from '../utils/constants'
import Header from '../utils/Header'
import Dropdown from '../utils/Dropdown'
import getNavigationOptions from '../utils/navigation'

export default class Settings extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return getNavigationOptions(navigation, { title: 'Settings' })
    }

    /* Settings
        change email
        delete account
    */

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Header pageName="Settings" />
                </View>
                <View style={styles.changeEmail}>
                    <Text style={styles.label}>Change Email</Text>
                    <TextInput style={styles.input}  />
                </View>
                <View style={styles.deleteAccount}>
                    <Text style={styles.label}>Delete Account</Text>
                    <Text>(Enter your email to confirm)</Text>
                    <TextInput style={styles.input} />

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
    changeEmail: {
        paddingTop: 50
    },
    deleteAccount: {

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
})