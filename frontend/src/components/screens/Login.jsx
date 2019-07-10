import React from 'react';
import UserForm from '../utils/UserForm'
import requests from '../utils/requests'
import constants from '../utils/constants'
import { withRouter } from "react-router-dom"

class Login extends React.Component {

    constructor(props){
        super(props)
        
        requests.isLoggedIn().then(loggedIn => {
            if (loggedIn) {
                props.history.push('/notify')
            }
        })
        
        this.state = {
            email: '',
            password: ''
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value, errorMessage: undefined })
    }

    handleSubmit = () => {

        if (!constants.emailRegex.test(this.state.email)) {
            this.setState({ errorMessage: 'Email format is incorrect' })
            return
        }

        let { email, password } = this.state
        let history = this.props.history
        requests.login({ email, password }, () => {
            history.push('/notify')
        }, console.log)
    }

    render() {
        return (
            <UserForm type="Login" onChange={this.handleChange} errorMessage={this.state.errorMessage} onSubmit={this.handleSubmit} />
        )
    }
}

export default withRouter(Login)
