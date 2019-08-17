import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { withRouter } from "react-router-dom";
import requests from './requests';
import logo from '../../images/favicon.ico' 

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
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
        let isLoggedIn = requests.isLoggedIn()

        if (this.props.location.pathname === '/') {
            button = <NavLink style={styles.font} href='/login'>Log In</NavLink>
        } else if (this.props.location.pathname === '/login') {
            button = <NavLink style={styles.font} href='/'>Sign Up</NavLink>
        } else if (isLoggedIn) {
            button = <NavLink style={styles.font} href='/login' onClick={this.handleLogout}>Log Out</NavLink>
        } else {
            button = <NavLink style={styles.font} href='/login'>Log In</NavLink>
        } 

        return (
            <div style={styles.main}>
                <Navbar style={styles.nav} expand="md">
                    <div style={styles.align}>
                        <NavbarBrand href="/">
                            <img
                                src={logo}
                                width="60"
                                height="60"
                                className="d-inline-block align-top"
                                alt="Logo"
                            />
                        </NavbarBrand>  
                        <NavbarBrand style={styles.logo} href="/">ClassLink</NavbarBrand>       
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
    main: {
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.10)'
    },
    nav: {
        display: 'flex',
        justifyContent: 'space-around',
        height: '80px',
        backgroundColor: 'rgb(250, 250, 250)',
    },
    font: {
        color: '#FC4A1A',
        fontSize: '20px',
        fontFamily: 'Montserrat',
    },
    logo: {
        color: '#FC4A1A',
        fontFamily: 'Montserrat',
        fontSize: '35px',
    },
    align: {
        display: 'flex',
        alignItems: 'center',
    }
}