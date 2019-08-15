
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
                console.log('Received values of form: ', values);
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
                <div style={{ display: 'flex', justifyContent: 'center' }}>
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
                                />,
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