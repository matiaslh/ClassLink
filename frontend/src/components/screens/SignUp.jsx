import React from 'react';
import requests from '../utils/requests'
import constants from '../utils/constants'
import { withRouter } from "react-router-dom"
import { openNotification } from "../utils/Alert"
import WrappedNormalLoginForm from '../utils/Form'

class SignUp extends React.Component {

    constructor(props) {
        super(props)

        if (requests.isLoggedIn()) {
            props.history.push('/notify')
        }

        this.state = {
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value, errorMessage: undefined })
    }

    handleSubmit = async () => {

        if (!this.state.email.match(constants.emailRegex)) {
            this.setState({ errorMessage: 'Email format is incorrect' })
            return
        } else if (this.state.password !== this.state.confirmPassword) {
            this.setState({ errorMessage: 'Passwords do not match' })
            return
        }

        let { email, password } = this.state
        let history = this.props.history
        let response = await requests.signup({ email, password })

        if (response.status === 'Success') {
            history.push('/notify')
            openNotification('Welcome', 'Successfully registered. Welcome to ClassLink!')
        } else {
            // add other error messages here
            if (response.info.errors.email) {
                this.setState({ errorMessage: 'Email is already taken' })
                openNotification('Error', this.state.errorMessage)
            }
        }
    }

    render() {
        return (
            <WrappedNormalLoginForm type="Sign Up" errorMessage={this.state.errorMessage} onChange={this.handleChange} onSubmit={this.handleSubmit} />
        )
    }
}

export default withRouter(SignUp)
