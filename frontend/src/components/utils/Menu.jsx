import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import colour from './css'
import { withRouter } from "react-router-dom"

class NavMenu extends Component {
    state = {
        current: 'mail',
    };

    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });

        switch (e.key) {
            case 'home':
                this.props.history.push('/login')
                break
            case 'schedule':
                this.props.history.push('/scheduler')
                break
            case 'notification':
                this.props.history.push('/login')
                break
            case 'user':
                this.props.history.push('/scheduler')
                break

        }
    };

    render() {
        return (
            <Menu style={s.main} onClick={this.handleClick} selectedKeys={[this.state.current]} mode="inline">
                <Menu.Item key="home">
                    <Icon type="home" />
                    Home
                </Menu.Item>
                <Menu.Item key="schedule">
                    <Icon type="schedule" />
                    Scheduler
                </Menu.Item>
                <Menu.Item key="notification">
                    <Icon type="notification" />
                    Notifier
                </Menu.Item>
                <Menu.Item key="user">
                    <Icon type="user" />
                    Account
                </Menu.Item>
            </Menu>
        );
    }
}

export default withRouter(NavMenu)

const s = {
    main: {
        backgroundColor: colour.colours.background,
    }
}