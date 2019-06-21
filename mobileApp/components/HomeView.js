import React from 'react'
import { AppRegistry, View, TextInput, Text, Button, StyleSheet } from 'react-native';
import css from './cssVariables'
import Header from './Header';

export default class HomeView extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerView}>
                    <Header pageName="HomeView" />
                </View>
                <View style={styles.textView}>
                    <Text style={styles.text}>If you are trying to get into a U of Guelph course that is currently full, NotifyMe can help. It will notify you when one of the courses you are looking for has positions open</Text>
                </View>
                <View style={styles.buttonView}>
                    <View style={styles.button}>
                        <Button color="#e84eed" title="Sign Up" onPress={() => this.props.navigation.navigate('SignUp')}></Button>
                    </View>
                    <View style={styles.button}>
                        <Button color="#e84eed" title="Login" onPress={() => this.props.navigation.navigate('Login')}></Button>
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
        backgroundColor: css.colours.blue,
        height: '100%'
    },
    textView: {
        margin: '10%',
        paddingTop: '20%',
        flex: 2
    },
    text: {
        fontSize: 15,
        color: css.colours.white
    },
    headerView: {
        flex: 1
    },
    buttonView: {
        flex: 4,
        display: 'flex',
        alignItems: 'center'
    },
    button: {
        marginTop: '5%',
        width: '50%'
    }
})