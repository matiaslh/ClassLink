
// import { HOST } from '/vars.js';
let HOST = 'www.notifymeguelph.xyz'
const URL = {
    register: `https://${HOST}:5000/auth/register`,
    login: `https://${HOST}:5000/auth/login`,
    user: `https://${HOST}:5000/auth/user`
}

let logoutFn = async (callback) => {
    sessionStorage.removeItem('session_token')
    if (callback) {
        callback()
    }
}

let saveUserFn = (body, callback, errCallback) => {

    if (!callback) {
        callback = () => { }
    }
    if (!errCallback) {
        errCallback = () => { }
    }

    let session_token = sessionStorage.getItem('session_token')

    fetch(URL.user, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': session_token
        },
        body: JSON.stringify(body)
    }).then(res => res.json()).then(res => {
        if (res.status === 'Success') {
            callback(res.info)
        } else {
            errCallback(res)
        }
    }).catch(errCallback)
}

let getUserFn = (callback, errCallback, saveFcmToken) => {

    let session_token = sessionStorage.getItem('session_token')
    let fcm_token = sessionStorage.getItem('fcm_token')

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
                if (!fcm_token) {
                    console.error("THIS SHOULD HAVE A TOKEN")
                } else {
                    let body = { data: { fcm_tokens: [] } }
                    if (res.info.data) {
                        body = { data: res.info.data }
                    }
                    if (body.data.fcm_tokens.indexOf(fcm_token) === -1) {
                        body.data.fcm_tokens.push(fcm_token)
                    }
                    saveUserFn(body)
                }
            }
        } else {
            errCallback(res)
        }
    }).catch(errCallback)
}

let loginFn = (credentials, callback, errCallback) => {
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
            sessionStorage.setItem('session_token', res.info.token)
            getUserFn(callback, errCallback, true)
        } else {
            errCallback(res)
        }
    }).catch(errCallback)
}

let signUpFn = (credentials, callback, errCallback) => {

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

let isLoggedInFn = async () => {
    let session_token = sessionStorage.getItem('session_token')
    let loggedIn = (!session_token || session_token === undefined || session_token === null || session_token === '' || session_token === 'null') ? false : true
    return loggedIn
}

export default {
    saveUser: saveUserFn,
    getUser: getUserFn,
    login: loginFn,
    logout: logoutFn,
    signup: signUpFn,
    isLoggedIn: isLoggedInFn
}