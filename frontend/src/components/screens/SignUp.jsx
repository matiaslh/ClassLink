import React from 'react';
import UserForm from '../utils/UserForm'
import requests from '../utils/requests'
import constants from '../utils/constants'
import { withRouter } from "react-router-dom"

class SignUp extends React.Component {

    constructor(props) {
        super(props)
        requests.isLoggedIn().then(loggedIn => {
            if (loggedIn) {
                props.history.push('/notify')
            }
        })
        this.state = {
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value, errorMessage: undefined })
    }

    handleSubmit = () => {

        if (!constants.emailRegex.test(this.state.email)) {
            this.setState({ errorMessage: 'Email format is incorrect' })
            return
        } else if (this.state.password !== this.state.confirmPassword) {
            this.setState({ errorMessage: 'Passwords do not match' })
            return
        }

        let { email, password } = this.state
        let history = this.props.history
        requests.signup({ email, password }, () => {
            history.push('/notify')
        }, console.log)
    }

    render() {
        return (
            <UserForm type="Sign Up" errorMessage={this.state.errorMessage} onChange={this.handleChange} onSubmit={this.handleSubmit} />
        )
    }
}

export default withRouter(SignUp)
