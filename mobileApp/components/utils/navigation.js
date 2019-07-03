import React from 'react'
import NavMenu from './NavMenu'
import css from './css'

export default function getNavigationOptions(navigation, options) {

    let defaultOptions = {
        headerStyle: {
            backgroundColor: css.colours.headerBackground
        },
        headerTitleStyle: {
            color: css.colours.headerText
        },
        headerRight: (<NavMenu navigation={navigation} />)
    }
    return Object.assign(defaultOptions, options)
}
