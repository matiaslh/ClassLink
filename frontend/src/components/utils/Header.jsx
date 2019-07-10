import React from 'react';
import { Button, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
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

    handleLogin = () => {
        this.props.history.push('/login')
    }

    handleLogout = () => {
        requests.logout(() => {
            this.props.history.push('/login')
        })
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
            button = <NavLink style={styles.font} href='/notify'>Log Out</NavLink>
        }

        return (
            <div>
                <Navbar style={styles.nav} color="dark" dark expand="md">
                    <div>
                        <NavbarBrand style={styles.font} href="/">NotifyMe Guelph</NavbarBrand>
                    </div>
                    <NavbarToggler onClick={this.toggle} />
                    <div>
                        <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                {button}
                            </NavItem>
                        </Nav>
                        </Collapse>
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