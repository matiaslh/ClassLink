import React from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col, Container } from 'reactstrap';
import css from './css'

export default class UserForm extends React.Component {

    render() {
        return (
            <React.Fragment>
                <header style={s.header}>{this.props.type}</header>
                <div style={s.formWrapper}>
                    <Container>
                        <Row>
                            <Col style={s.heading}>
                                <div>
                                    <h3 style={s.description}>NotifyMe Guelph</h3>
                                    <h5>This app is about yada yada yada</h5>
                                </div>
                            </Col>
                            <Col style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={s.userForm}>
                                    <Form>
                                        <FormGroup>
                                            <div style={s.labelWrapper}>
                                                <Label style={s.label} for="email">Email</Label>
                                                <Input style={s.inputBox} type="text" name="email" id="email" onChange={this.props.onChange} />
                                            </div>
                                        </FormGroup>
                                        <FormGroup>
                                            <div style={s.labelWrapper}>
                                                <Label style={s.label} for="password">Password</Label>
                                                <Input style={s.inputBox} type="password" name="password" id="password" onChange={this.props.onChange} />
                                            </div>
                                        </FormGroup>
                                        {this.props.type === 'Sign Up' && <FormGroup>
                                            <div style={s.labelWrapper}>
                                                <Label style={s.label} for="confirmPassword">Confirm Password</Label>
                                                <Input style={s.inputBox} type="password" name="confirmPassword" id="confirmPassword" onChange={this.props.onChange} />
                                            </div>
                                        </FormGroup>}
                                        <div style={s.errorText}>
                                            {this.props.errorMessage}
                                        </div>
                                        <Button style={s.button} disabled={this.props.errorMessage !== undefined} onClick={this.props.onSubmit}>Submit</Button>
                                    </Form>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment >
        );
    }
}

const s = {
    header: {
        color: '#00b3b3',
        marginTop: '50px',
        fontSize: '30px'
    },
    formWrapper: {
        width: '70%',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingTop: '80px',
        marginTop: '20px'
    },
    userForm: {
        flex: 1,
        paddingLeft: '80px',
        paddingRight: '80px'
    },
    labelWrapper: {
        display: 'flex',
        flexDirection: 'column',
        color: '#00b3b3'
    },
    errorText: {
        color: css.colours.errorText,
        paddingBottom: '10px'
    },
    description: {
        color: '#00b3b3'
    },
    heading: {
        borderRight: '1px solid #00b3b3',
        height: '350px',
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '50px'
    },
    button: {
        backgroundColor: "#00b3b3",
        color: "white"
    },
    label: {
        textAlign: 'left',
        marginBottom: '0px'
    },
    inputBox: {
    }
}

