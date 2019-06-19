import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Header from './Header';
import SignUp from './SignUp';
import Login from './Login';

export default class Router extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div style={appStyle}>
                    <Header />
                    <Route exact path="/" render={() => (
                        <SignUp />
                    )} />
                    <Route path="/login" render={() => (
                        <Login />
                    )} />
                </div>
            </BrowserRouter>
        )
    }
}

const appStyle = {
    textAlign: 'center',
    height: '100%',
    backgroundColor: '#282c34'
}
