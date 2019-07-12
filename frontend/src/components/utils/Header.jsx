import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { withRouter } from "react-router-dom";
import requests from './requests';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    handleLogout = () => {
        requests.logout()
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        let button;

        if (this.props.location.pathname === '/') {
            button = <NavLink style={styles.font} href='/login'>Log In</NavLink>
        } else if (this.props.location.pathname === '/login') {
            button = <NavLink style={styles.font} href='/'>Sign Up</NavLink>
        } else if (this.props.location.pathname === '/notify') {
            button = <NavLink style={styles.font} href='/login' onClick={this.handleLogout}>Log Out</NavLink>
        }

        return (
            <div>
                <Navbar style={styles.nav} color="dark" dark expand="md">
                    <div>
                        <NavbarBrand style={styles.font} href="/">NotifyMe Guelph</NavbarBrand>
                    </div>
                    <div>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                {button}
                            </NavItem>
                        </Nav>
                    </div>
                </Navbar>
            </div>
        );
    }
}

export default withRouter(Header)

const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    font: {
        color: 'white'
    }
}