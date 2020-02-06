
import React from 'react';
import 'antd/dist/antd.css';
import './styles/form.css';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import css from './css'
import Background from '../../images/background1.jpeg'

class NormalLoginForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
            }
        });
        this.props.onSubmit();

    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div style={s.fullPage}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <header style={s.header}>{this.props.type}</header>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
                    <div style={{ flex: 1, borderRight: '1px solid white', color: 'white', padding: '20px' }}>
                        <h4 style={{ color: 'white' }}>Welcome to ClassLink!</h4>
                        <p>ClassLink is made specially for University of Guelph students.</p>
                        <ul style={{ textAlign: 'left' }}>
                            <li>If you are trying to get into a course that is full, just sign up and add that course to your watch list to get an email when there's an available spot!</li>
                            <li>You can add unlimited courses and sections to your watch list and you will be notified ASAP! No need to be checking WebAdvisor every 5 minutes anymore!</li>
                            <li>If you are trying to create a schedule for next semester, you can use ClassLink to add any courses you want to take and select the most preferable Schedule using our tool!</li>
                        </ul>
                    </div>
                    <div style={{ flex: 1, padding: '20px' }}>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <Form.Item>
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: 'Please input your username!' }],
                                })(
                                    <Input
                                        name="email"
                                        onChange={this.props.onChange}
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Email"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: 'Please input your Password!' }],
                                })(
                                    <Input
                                        name="password"
                                        onChange={this.props.onChange}
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="Password"
                                        onKeyPress={(event) => {if (event.key === 'Enter') this.handleSubmit(event)} }
                                        />
                                )}
                            </Form.Item>
                                {
                                    this.props.type === 'Sign Up' &&
                                    <Form.Item>
                                        <Input
                                            name="confirmPassword"
                                            onChange={this.props.onChange}
                                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            type="password"
                                            placeholder="Confirm Password"
                                            onKeyPress={(event) => {if (event.key === 'Enter') this.handleSubmit(event)} }
                                        />
                                    </Form.Item>
                                }
                            <Form.Item>
                                {getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                })(<Checkbox style={s.remember}>Remember me</Checkbox>)}
                                <a style={s.font} className="login-form-forgot" href="">
                                    Forgot password
                                </a>
                                <Button style={s.button} type="primary" htmlType="submit" className="login-form-button">
                                    {this.props.type}
                                </Button>
                                <a style={s.font} href={this.props.type === 'Sign Up'? "/login" : "/" }>
                                    {this.props.type === 'Sign Up' ? 'Already registered? Login Now!' : 'New to ClassLink? Register Now!' }
                                </a>
                            </Form.Item>
                            <div style={s.errorText}>
                                {this.props.errorMessage}
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Form.create({ name: 'normal_login' })(NormalLoginForm);

const s = {
    font: {
        color: '#FC4A1A',
    },
    remember: {
        float: 'left',
        color: '#FC4A1A'
    },
    button: {
        backgroundColor: '#FC4A1A',
        border: 'none'
    },
    fullPage: {
        backgroundImage: `linear-gradient(
            rgba(0, 0, 0, 0.7),
            rgba(0, 0, 0, 0.7)
          ), url(${Background})`,
        height: '85%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        fontFamily: 'Montserrat',
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