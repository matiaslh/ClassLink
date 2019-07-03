import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Header from '../utils/Header';
import SignUp from './SignUp';
import Login from './Login';
import css from '../utils/css';
import Notify from './Notify';

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
                    <Route path="/notify" render={() => (
                        <Notify />
                    )} />
                </div>
            </BrowserRouter>
        )
    }
}

const appStyle = {
    textAlign: 'center',
    height: '100%',
    backgroundColor: css.colours.background
}
