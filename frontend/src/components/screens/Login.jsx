import React from 'react';
import requests from '../utils/requests'
import constants from '../utils/constants'
import { withRouter } from "react-router-dom"
import { openNotification } from "../utils/Alert"
import WrappedNormalLoginForm from '../utils/Form'

class Login extends React.Component {

    constructor(props) {
        super(props)

        if (requests.isLoggedIn()) {
            props.history.push('/notify')
        }

        this.state = {
            email: '',
            password: ''
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value, errorMessage: undefined })
    }

    handleSubmit = async () => {

        if (!this.state.email.match(constants.emailRegex)) {
            this.setState({ errorMessage: 'Email format is incorrect' })
            return
        }

        let { email, password } = this.state
        let history = this.props.history
        let response = await requests.login({ email, password })
        if (response.status === 'Success') {
            history.push('/notify')
            openNotification('Welcome', 'Successfully logged in')
        } else {
            this.setState({ errorMessage: 'Email or password is incorrect' })
            openNotification('Error', this.state.errorMessage)
        }
    }

    render() {
        return (
            <WrappedNormalLoginForm type="Login" errorMessage={this.state.errorMessage} onChange={this.handleChange} onSubmit={this.handleSubmit} />            
        )
    }
}

export default withRouter(Login)
