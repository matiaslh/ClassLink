
import AsyncStorage from '@react-native-community/async-storage';

// import { HOST } from '/vars.js';
HOST = '68.183.197.232'
const URL = {
    register: `http://${HOST}:5000/auth/register`,
    login: `http://${HOST}:5000/auth/login`,
    user: `http://${HOST}:5000/auth/user`
}

logoutFn = (callback) => {
    AsyncStorage.removeItem('session_token').then(() => {
        if (callback) {
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

getUserFn = (callback, errCallback, saveFcmToken) => {
    AsyncStorage.multiGet(['session_token', 'fcm_tokens']).then(values => {
        let session_token = values[0][1]
        let fcm_tokens = values[1][1]

        fetch(URL.user, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': session_token
            }
        }).then(res => res.json()).then(res => {
            if (res.status === 'Success') {
                callback(res.info)
                if (saveFcmToken) {
                    if (!fcm_tokens) {
                        console.error("THIS SHOULD HAVE A TOKEN")
                    } else {
                        let body = { data: { fcm_tokens: [] } }
                        if (res.info.data) {
                            body = { data: res.info.data }
                        }
                        if (body.data.fcm_tokens.indexOf(fcm_tokens) == -1) {
                            body.data.fcm_tokens.push(fcm_tokens)
                        }
                        saveUserFn(body)
                    }
                }
            } else {
                errCallback(res)
            }
        }).catch(errCallback)
    })
}

loginFn = (credentials, callback, errCallback) => {
    fetch(URL.login, {
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
            AsyncStorage.setItem('session_token', res.info.token).then(getUserFn(callback, errCallback, true)).catch(errCallback)
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