
import { AsyncStorage } from 'react-native';

// import { HOST } from '/vars.js';
HOST = '10.0.75.1'
const URL = {
    register: `http://${HOST}:5000/auth/register`,
    login: `http://${HOST}:5000/auth/login`,
    user: `http://${HOST}:5000/auth/user`
}

logoutFn = (callback) => {
    AsyncStorage.removeItem('session_token').then(()=>{
        if(callback){
            callback()
        }
    })
}

saveUserFn = (body, callback, errCallback) => {

    if (!callback) {
        callback = () => { }
    }
    if (!errCallback) {
        errCallback = () => { }
    }

    AsyncStorage.getItem('session_token').then(session_token => {
        fetch(URL.user, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': session_token
            },
            body: JSON.stringify(body)
        }).then(res => res.json()).then(res => {
            if (res.status == 'Success') {
                callback(res.info)
            } else {
                errCallback(res)
            }
        }).catch(errCallback)
    })
}

getUserFn = (callback, errCallback) => {
    AsyncStorage.getItem('session_token').then(session_token => {
        fetch(URL.user, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': session_token
            }
        }).then(res => res.json()).then(res => {
            if (res.status === 'Success') {
                console.log(res)
                callback(res.info)
            } else {
                errCallback(res)
            }
        }).catch(errCallback)
    })
}

loginFn = (credentials, callback, errCallback) => {
    console.log(HOST);
    fetch(URL.login, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
        })
    }).then(res => res.json()).then(res => {
        if (res.status === 'Success') {
            AsyncStorage.setItem('session_token', res.info.token).then(getUserFn(callback, errCallback)).catch(errCallback)
        } else {
            errCallback(res)
        }
    }).catch(errCallback)
}

signUpFn = (credentials, callback, errCallback) => {
    fetch(URL.register, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: credentials.email,
            password: credentials.password
        })
    }).then(res => res.json()).then(res => {
        if (res.status === 'Success') {
            loginFn(credentials, callback, errCallback)
        } else {
            errCallback(res)
        }
    }).catch(errCallback)
}

export default {
    saveUser: saveUserFn,
    getUser: getUserFn,
    login: loginFn,
    logout: logoutFn,
    signup: signUpFn
}