import React from 'react';
import { Button } from 'reactstrap';
import { withRouter } from "react-router-dom";

class Header extends React.Component {

    handleLogin = () => {
        this.props.history.push('/login')
    }

    handleLogout = () => {
        this.props.history.push('/login')
    }

    render() {

        let button;

        if (this.props.location.pathname === '/') {
            button = <Button color="primary" onClick={this.handleLogin}>Log In</Button>
        } else if (this.props.location.pathname === '/login') {
            button = ''
        } else if(this.props.location.pathname === '/notify'){
            button = <Button color="primary" onClick={this.handleLogout}>Log Out</Button>
        }

        return (
            <div style={headerWrapper}>
                <div style={flex} color="white">
                    Logo
                    </div>
                <div style={{ flex: '3' }}>
                    <header style={appHeader}>
                        University of Guelph NotifyMe
                        </header>
                </div>
                <div style={buttonWrapper}>{button}</div>
            </div>
        )
    }
}

export default withRouter(Header)

const headerWrapper = {
    padding: '20px',
    display: 'flex',
    flexDirection: 'row',
    flex: '1',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
}

const flex = {
    flex: '1'
}

const buttonWrapper = {
    display: 'flex',
    flex: '1',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
}

const appHeader = {
    fontSize: '50',
    color: 'white'
}
