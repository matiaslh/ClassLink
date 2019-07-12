
// import { HOST } from '/vars.js';

let HOST = 'www.notifymeguelph.xyz'
let protocol = 'https://'
// let HOST = '68.183.197.232'
// let protocol = 'http://'
const URL = {
    register: `${protocol}${HOST}/auth/register`,
    login: `${protocol}${HOST}/auth/login`,
    user: `${protocol}${HOST}/auth/user`
}

let logoutFn = async () => {
    sessionStorage.removeItem('session_token')
}

let saveUserFn = async (body) => {

    if (body.data.criteria.length > 5) {
        return { status: 'error', error: 'Too many courses for search' }
    }

    let session_token = sessionStorage.getItem('session_token')
    let options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': session_token
        },
        body: JSON.stringify(body)
    }

    let response = await fetch(URL.user, options).then(res => res.json())
    return response
}

let getUserFn = async () => {

    let session_token = sessionStorage.getItem('session_token')
    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': session_token
        }
    }

    let response = await fetch(URL.user, options).then(res => res.json())
    return response
}

let saveFcmToken = async () => {
    let fcm_token = sessionStorage.getItem('fcm_token')
    let user = await getUserFn()
    if (user.info.data.fcm_tokens.indexOf(fcm_token) === -1) {
        user.info.data.fcm_tokens.push(fcm_token)
    }
    let response = await saveUserFn(user.info)
    return response
}

// returns login endpoint response
let loginFn = async (credentials) => {

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: credentials.email,
            password: credentials.password
        })
    }

    let response = await fetch(URL.login, options).then(res => res.json())

    if (response.status === 'Success') {
        sessionStorage.setItem('session_token', response.info.token)
        saveFcmToken()
    }
    return response
}

let signUpFn = async (credentials) => {

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: credentials.email,
            password: credentials.password
        })
    }

    let response = await fetch(URL.register, options).then(res => res.json())

    if (response.status === 'Success') {
        return await loginFn(credentials)
    } else {
        return response
    }
}

let isLoggedInFn = () => {
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
