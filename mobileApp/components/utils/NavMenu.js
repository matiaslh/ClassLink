
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
        this.hideMenu()
        requests.logout(() => {
            navigate('Home')
        })
    }

    profilePage = () => {
        this.hideMenu()
        this.props.navigation.navigate('Profile')
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

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Menu
                    ref={this.setMenuRef}
                    button={<View style={{ margin: 10 }}><Icon onPress={this.showMenu} name='menu' color={css.colours.headerButton} /></View>}
                >
                    <MenuItem onPress={this.profilePage}>Profile</MenuItem>
                    <MenuItem onPress={this.premiumPage}>Premium</MenuItem>
                    <MenuDivider />
                    <MenuItem onPress={this.logout}>Logout</MenuItem>
                </Menu>
            </View>
        )
    }
}
