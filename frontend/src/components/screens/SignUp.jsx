import React from 'react';
import UserForm from '../utils/UserForm'
import requests from '../utils/requests'
import { withRouter } from "react-router-dom"

class SignUp extends React.Component {

    state = {
        email: '',
        password: '',
        confirmPassword: ''
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value, errorMessage: undefined }, () => {
            if (this.state.password !== this.state.confirmPassword) {
                this.setState({ errorMessage: 'Passwords do not match' })
            }
        })
    }

    handleSubmit = () => {
        console.log(this.state)
        let { email, password, confirmPassword } = this.state
        if (password !== confirmPassword) {
            console.error('WRONG PASSWORD')
            return
        }
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
