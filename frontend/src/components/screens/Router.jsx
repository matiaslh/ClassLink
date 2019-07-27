import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from '../utils/Header'
import SignUp from './SignUp'
import Login from './Login'
import Footer from '../utils/Footer'
import Notify from './Notify'
import Scheduler from './Scheduler'
import NoMatch from './NoMatch'

export default class Router extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div style={appStyle}>
                    <Header />
                    <Switch>
                        <Route exact path="/" render={() => (
                            <SignUp />
                        )} />
                        <Route path="/login" render={() => (
                            <Login />
                        )} />
                        <Route path="/notify" render={() => (
                            <Notify />
                        )} />
                        <Route path="/scheduler" render={() => (
                            <Scheduler />
                        )} />
                        <Route component={NoMatch} />
                    </Switch>
                    <Footer />
                </div>
            </BrowserRouter>
        )
    }
}

const appStyle = {
    textAlign: 'center',
    height: '100%',
    backgroundColor: '#fafafa'
}
