import React from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default class Login extends React.Component {
    render() {
        return (
        <React.Fragment>
            <header style={signUpHeader} >Login</header>
            <div style={formWrapper}>
                <Form>
                    <FormGroup>
                        <div style={labelWrapper}>
                            <Label style={{ flex: 1 }} for="username">Username</Label>
                            <Input style={{ flex: 3 }} type="text" name="username" id="username" />
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div style={labelWrapper}>
                            <Label style={{ flex: 1 }} for="password">Password</Label>
                            <Input style={{ flex: 3 }} type="password" name="password" id="password" />
                        </div>
                    </FormGroup>
                    <Button>Submit</Button>
                </Form>
            </div>
        </React.Fragment>
        )
    }
}
