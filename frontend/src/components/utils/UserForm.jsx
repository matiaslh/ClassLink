import React from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col, Container } from 'reactstrap';
import css from './css'
import Background from '../../images/background1.jpeg'
import WrappedNormalLoginForm from './Form'

export default class UserForm extends React.Component {

    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.props.onSubmit()
        }
    }

    render() {
        return (
            <React.Fragment>
                <div style={s.fullPage}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <header style={s.header}>{this.props.type}</header>
                    </div>
                    {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <WrappedNormalLoginForm type={this.props.type} errorMessage={this.props.errorMessage} onChange={this.props.onChange} onSubmit={this.props.onSubmit} />
                    </div> */}
                    <div style={s.formWrapper}>
                        <Container>
                            <Row>
                                <Col style={{ display: 'flex', alignItems: 'center' }}>
                                    <div style={s.userForm}>
                                        <Form onKeyDown={this.handleKeyDown}>
                                            <FormGroup>
                                                <div style={s.labelWrapper}>
                                                    <Label style={s.label} for="email">Email</Label>
                                                    <Input placeholder="Email" style={s.inputBox} type="text" name="email" id="email" onChange={this.props.onChange} />
                                                </div>
                                            </FormGroup>
                                            <FormGroup>
                                                <div style={s.labelWrapper}>
                                                    <Label style={s.label} for="password">Password</Label>
                                                    <Input placeholder="Password" style={s.inputBox} type="password" name="password" id="password" onChange={this.props.onChange} />
                                                </div>
                                            </FormGroup>
                                            {this.props.type === 'Sign Up' && <FormGroup>
                                                <div style={s.labelWrapper}>
                                                    <Label style={s.label} for="confirmPassword">Confirm Password</Label>
                                                    <Input placeholder="Confirm Password " style={s.inputBox} type="password" name="confirmPassword" id="confirmPassword" onChange={this.props.onChange} />
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
                </div>
            </React.Fragment >
        );
    }
}

const s = {
    fullPage: {
        backgroundImage: `linear-gradient(
            rgba(0, 0, 0, 0.7),
            rgba(0, 0, 0, 0.7)
          ), url(${Background})`,
        height: '85%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    header: {
        color: '#FC4A1A',
        fontFamily: 'Montserrat',
        fontSize: '30px',
        marginTop: '-100px',
        fontWeight: 'bold'
    },
    formWrapper: {
        width: '35%',
        marginLeft: 'auto',
        marginRight: 'auto',
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
        color: '#FC4A1A',
        fontFamily: 'Montserrat',
    },
    errorText: {
        color: css.colours.errorText,
        paddingBottom: '10px'
    },
    description: {
        color: '#FC4A1A'
    },
    heading: {
        borderRight: '1px solid #FC4A1A',
        fontFamily: 'Montserrat',
        height: '350px',
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '50px'
    },
    button: {
        backgroundColor: "#FC4A1A",
        fontFamily: 'Montserrat',
        color: "white"
    },
    label: {
        textAlign: 'left',
        marginBottom: '0px',
        fontWeight: 'bold'
    },

}

