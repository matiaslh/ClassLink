import React from 'react'
import { View, Text, Button, StyleSheet, AsyncStorage } from 'react-native'
import css from '../utils/css'
import Header from '../utils/Header'
import getNavigationOptions from '../utils/navigation'
import requests from '../utils/requests'

export default class Home extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return getNavigationOptions(navigation, { title: 'Home' })
    }

    constructor(props) {
        super(props)
        AsyncStorage.getItem('session_token').then(session_token => {
            if (session_token) {
                requests.getUser((res) => {
                    props.navigation.navigate('Notify', { criteria: res.criteria })
                }, (err) => { }) // do nothing
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <Header pageName="HomeView" />
                </View>
                <View style={styles.textView}>
                    <Text style={styles.text}>If you are trying to get into a U of Guelph course that is currently full, NotifyMe can help. It will notify you when one of the courses you are looking for has positions open</Text>
                </View>
                <View style={styles.buttonView}>
                    <View style={styles.button}>
                        <Button color={css.colours.button} title="Sign Up" onPress={() => this.props.navigation.navigate('SignUp')}></Button>
                    </View>
                    <View style={styles.button}>
                        <Button color={css.colours.button} title="Login" onPress={() => this.props.navigation.navigate('Login')}></Button>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: css.colours.background,
        height: '100%'
    },
    textView: {
        margin: '10%',
        paddingTop: '20%',
        flex: 2
    },
    text: {
        color: css.colours.text
    },
    buttonView: {
        flex: 4,
        display: 'flex',
        alignItems: 'center'
    },
    button: {
        marginTop: css.lengths.betweenButtons,
        width: css.lengths.buttonWidth
    }
})