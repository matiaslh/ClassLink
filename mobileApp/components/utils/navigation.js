import css from './css'

export default function getNavigationOptions(options) {

    let defaultOptions = {
        headerStyle: {
            backgroundColor: css.colours.headerBackground
        },
        headerTitleStyle: {
            color: css.colours.headerText
        }
        // headerRight: (
        //     <Button onPress={() => navigation.navigate('Home')} title="Home" color="blue" />
        // )
    }
    return Object.assign(defaultOptions, options)
}