import React from 'react'
import { View, Button, StyleSheet } from 'react-native'
import css from './css'

export default function getNavigationOptions(navigation, options) {

    let defaultOptions = {
        headerStyle: {
            backgroundColor: css.colours.headerBackground
        },
        headerTitleStyle: {
            color: css.colours.headerText
        },
        headerRight: (
            <View style={styles.button}>
                <Button onPress={() => navigation.navigate('Home')} title="Upgrade" color={css.colours.upgradeButton} />
            </View>
        )
    }
    return Object.assign(defaultOptions, options)
}

const styles = StyleSheet.create({
    button:{
        margin:10
    }
})