import React from 'react';
import UserForm from '../utils/UserForm'

export default class Login extends React.Component {

    state = {
        email: '',
        password: ''
    }

    handleChange = (event) => {
        this.setState({[event.target.name]:event.target.value})
    }

    handleSubmit = () => {
        console.log(this.state)
    }

    render() {
        return (
            <UserForm type="Login" onChange={this.handleChange} onSubmit={this.handleSubmit} />
        )
    }
}
