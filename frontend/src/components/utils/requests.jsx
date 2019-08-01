
// import { HOST } from '/vars.js';

// let HOST = 'notifymeguelph.xyz'
// let protocol = 'https://'
let HOST = 'localhost:5000'
let protocol = 'http://'
const URL = {
    register: `${protocol}${HOST}/auth/register`,
    login: `${protocol}${HOST}/auth/login`,
    user: `${protocol}${HOST}/auth/user`,
    sectionSearch: `${protocol}${HOST}/schedule/search`,
    courses: `${protocol}${HOST}/schedule/courses`
}

let getSectionsFn = async (course) => {

    let body = {
        course
    }

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
    let response = await fetch(URL.sectionSearch, options).then(res => res.json())
    return response
}

let logoutFn = async () => {
    sessionStorage.removeItem('session_token')
}

let saveUserFn = async (body) => {

    if (body.data.criteria && body.data.criteria.length > 5) {
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
    let fcm_tokens = (user.info.data && user.info.data.fcm_tokens) ? user.info.data.fcm_tokens : []
    if (fcm_tokens.indexOf(fcm_token) === -1) {
        fcm_tokens.push(fcm_token)
    }
    if (!user.info.data) {
        user.info.data = {}
    }
    user.info.data.fcm_tokens = fcm_tokens
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

let getAllCourses = async () => {

    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    return await fetch(URL.courses, options).then(res => res.json())
}

export default {
    saveUser: saveUserFn,
    getUser: getUserFn,
    login: loginFn,
    logout: logoutFn,
    signup: signUpFn,
    isLoggedIn: isLoggedInFn,
    getSections: getSectionsFn,
    getAllCourses: getAllCourses
}
