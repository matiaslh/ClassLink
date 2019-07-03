import React from 'react';
import UserForm from '../utils/UserForm'
import requests from '../utils/requests';

export default class SignUp extends React.Component {

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
        let {username , password, confirmPassword} = this.state
        if(password !== confirmPassword){
            console.error('WRONG PASSWORD')
            return
        }
        requests.signup({username, password}, ()=>{

        }, console.log)
    }

    render() {
        return (
            <UserForm type="Sign Up" errorMessage={this.state.errorMessage} onChange={this.handleChange} onSubmit={this.handleSubmit} />
        )
    }
}
