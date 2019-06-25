
import { AsyncStorage } from 'react-native';

// import { HOST } from '/vars.js';
HOST = ''
const URL = {
    register: `http://${HOST}:5000/auth/register`,
    login: `http://${HOST}:5000/auth/login`,
    user: `http://${HOST}:5000/auth/user`
}

// saveUserFn = (callback, errCallback)

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
                // callback(res.info.data)
                console.log(res)
                callback({
                    user:res.info,
                    criteria: [
                        {
                            department: 'ENGG',
                            level: '200',
                            course: '1000',
                            section: '2000'
                        },
                        {
                            department: 'CIS',
                            level: '200',
                            course: '1010',
                            section: '2030'
                        },
                        {
                            department: 'CIS',
                            level: '200',
                            course: '1010',
                            section: '2030'
                        },
                        {
                            department: 'CIS',
                            level: '200',
                            course: '1010',
                            section: '2030'
                        }
                    ]
                })
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
            username: credentials.username,
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
            username: credentials.username,
            email: 'nope',
            password: credentials.password,
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
    getUser: getUserFn,
    login: loginFn,
    signup: signUpFn
}