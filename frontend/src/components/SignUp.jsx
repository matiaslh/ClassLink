import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default class SignUp extends React.Component {

    state = {
        username: '',
        password: '',
        cellNumber: ''
    }

    handleChange = (event) => {
        let name = event.target.name
        let value = event.target.value
        let obj = {}
        obj[name] = value
        this.setState(obj)
    }

    handleSubmit = (event) => {
        event.preventDefault()
        console.log(this.state)
    }

    render() {
        return (
            <React.Fragment>
                <header style={signUpHeader} >Sign Up</header>
                <div style={formWrapper}>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <div style={labelWrapper}>
                                <Label style={{ flex: 1 }} for="username">Username</Label>
                                <Input style={{ flex: 3 }} type="text" name="username" id="username" onChange={this.handleChange} />
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <div style={labelWrapper}>
                                <Label style={{ flex: 1 }} for="password">Password</Label>
                                <Input style={{ flex: 3 }} type="password" name="password" id="password" onChange={this.handleChange} />
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <div style={labelWrapper}>
                                <Label style={{ flex: 1 }} for="cellNumber">Cell Number</Label>
                                <Input style={{ flex: 3 }} type="text" name="cellNumber" id="cellNumber" onChange={this.handleChange} />
                            </div>
                        </FormGroup>
                        <Button type='submit'>Submit</Button>
                    </Form>
                </div>
            </React.Fragment>
        );
    }
}

const signUpHeader = {
    color: 'white',
    marginTop: '50px',
    fontSize: '20'
}

const formWrapper = {
    width: '30%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: '40px',
    marginTop: '20px',
    border: '1px solid #ccc'
}

const labelWrapper = {
    display: 'flex',
    flexDirection: 'row',
    color: 'white',
    marginRight: '40px',
    marginLeft: '10px'

}