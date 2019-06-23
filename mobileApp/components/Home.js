import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native';
import css from './css'
import Header from './Header';

export default class Home extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Home'
            // headerStyle: {
            //     backgroundColor: 'white'
            // }
            // headerRight: (
            //     <Button onPress={() => navigation.navigate('Home')} title="Home" color="blue" />
            // )
        }
    }

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
        backgroundColor: css.colours.background,
        height: '100%'
    },
    textView: {
        margin: '10%',
        paddingTop: '20%',
        flex: 2
    },
    text: {
        fontSize: 15,
        color: css.colours.text
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