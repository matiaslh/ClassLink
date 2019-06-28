
import React from 'react';
import { Icon } from 'react-native-elements'
import { View, Text } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import css from './css'
import requests from './requests';

export default class NavMenu extends React.PureComponent {
    _menu = null

    setMenuRef = ref => {
        this._menu = ref
    }

    logout = () => {
        let navigate = this.props.navigation.navigate
        console.log()

        this.hideMenu()
        requests.logout(() => {
            navigate('Home')
        })
    }

    settingsPage = () => {
        this.hideMenu()
        this.props.navigation.navigate('Settings')
    }

    premiumPage = () => {
        this.hideMenu()
        this.props.navigation.navigate('Premium')
    }

    hideMenu = () => {
        this._menu.hide()
    }

    showMenu = () => {
        this._menu.show()
    }

    // TODO PREMIUM IS DISABLED

    render() {
        let loggedIn = requests.checkLoggedIn()
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Menu
                    ref={this.setMenuRef}
                    button={<View style={{ margin: 10 }}><Icon onPress={this.showMenu} name='menu' color={css.colours.headerButton} /></View>}
                >
                    {loggedIn && <MenuItem onPress={this.settingsPage}>Settings</MenuItem>}
                    {false && <MenuItem onPress={this.premiumPage}>Premium</MenuItem>}
                    <MenuDivider />
                    {loggedIn && <MenuItem onPress={this.logout}>Logout</MenuItem>}
                </Menu>
            </View>
        )
    }
}
