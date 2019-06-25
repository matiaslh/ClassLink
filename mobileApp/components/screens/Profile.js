import React from 'react'
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';
import css from '../utils/css'
import constants from '../utils/constants'
import Header from '../utils/Header'
import Dropdown from '../utils/Dropdown'
import getNavigationOptions from '../utils/navigation'

export default class Profile extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return getNavigationOptions(navigation, { title: 'Profile' })
    }

    render(){
        return (
            <View>
                <Text>Profile</Text>
            </View>
        )
    }
}