import React from 'react'
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';
import css from '../utils/css'
import constants from '../utils/constants'
import Header from '../utils/Header'
import getNavigationOptions from '../utils/navigation'

export default class AboutUs extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return getNavigationOptions(navigation, { title: 'About Us' })
    }

    render(){
        return (
            <View>
                <Text>About Us</Text>
            </View>
        )
    }
}