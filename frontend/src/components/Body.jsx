import React from 'react';
import Header from './Header'
import { Button } from 'reactstrap';

export default class Body extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Header />
                <div>
                    <Button color="primary">Sign Up</Button>{' '}
                    <Button color="primary">Log In</Button>{' '}
                </div>
            </React.Fragment>
        );
    }
}