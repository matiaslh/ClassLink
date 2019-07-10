import React from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col, Container } from 'reactstrap';
import css from './css';

export default class UserForm extends React.Component {

    render() {
        return (
            <React.Fragment>
                <header style={header}>{this.props.type}</header>
                <div style={formWrapper}>
                    <Container>
                        <Row>
                            <Col style={border}>
                                <h3 style={description}>NotifyMe Guelph</h3>
                                <h5>This app is about yada yada yada</h5>
                            </Col>
                            <Col >
                                <div style={{ flex: 2 }}>
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
                                        <Button type='button' style={button} disabled={this.props.errorMessage !== undefined} onClick={this.props.onSubmit}>Submit</Button>
                                    </Form>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

const header = {
    color: '#00b3b3',
    marginTop: '50px',
    fontSize: '30px'
}

const formWrapper = {
    width: '70%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: '80px',
    marginTop: '20px',
    // border: '1px solid #00b3b3'
}

const labelWrapper = {
    display: 'flex',
    flexDirection: 'row',
    color: '#00b3b3',
    marginRight: '40px',
    marginLeft: '10px'
}

const errorText = {
    color: css.colours.errorText,
    paddingBottom:'10px'
}

const description = {
    color: '#00b3b3'
}

const border = {
    borderRight: '1px solid #00b3b3',
    height: '300px'
}

const button = {
    backgroundColor: "#00b3b3",
    color: "white"
}