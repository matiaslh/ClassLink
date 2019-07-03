import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import css from './css';

export default class UserForm extends React.Component {

    render() {
        return (
            <React.Fragment>
                <header style={header}>{this.props.type}</header>
                <div style={formWrapper}>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <div style={labelWrapper}>
                                <Label style={{ flex: 1 }} for="email">Email</Label>
                                <Input style={{ flex: 3 }} type="text" name="email" id="email" onChange={this.props.onChange} />
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <div style={labelWrapper}>
                                <Label style={{ flex: 1 }} for="password">Password</Label>
                                <Input style={{ flex: 3 }} type="password" name="password" id="password" onChange={this.props.onChange} />
                            </div>
                        </FormGroup>
                        {this.props.type === 'Sign Up' && <FormGroup>
                            <div style={labelWrapper}>
                                <Label style={{ flex: 1 }} for="confirmPassword">Confirm Password</Label>
                                <Input style={{ flex: 3 }} type="password" name="confirmPassword" id="confirmPassword" onChange={this.props.onChange} />
                            </div>
                        </FormGroup>}
                        <div style={errorText}>
                            {this.props.errorMessage}
                        </div>
                        <Button type='button' color="primary" disabled={this.props.errorMessage !== undefined} onClick={this.props.onSubmit} >Submit</Button>
                    </Form>
                </div>
            </React.Fragment>
        );
    }
}

const header = {
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

const errorText = {
    color: css.colours.errorText,
    paddingBottom:'10px'
}