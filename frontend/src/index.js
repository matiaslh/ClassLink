import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import dotenv from 'dotenv'
dotenv.config()

// const options = {
//     // you can also just use 'bottom center'
//     position: positions.BOTTOM_CENTER,
//     timeout: 5000,
//     offset: '30px',
//     // you can also just use 'scale'
//     transition: transitions.SCALE
// }

const Root = () => (
    <AlertProvider template={AlertTemplate}>
        <App style={{ height: '100%' }} />
    </AlertProvider>
)

ReactDOM.render(<Root />, document.getElementById('root'));

