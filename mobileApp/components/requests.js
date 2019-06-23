
const URL = {
    register: 'http://10.19.2.104:5000/auth/register',
    login: 'http://10.19.2.104:5000/auth/login',
    getUser: 'http://10.19.2.104:5000/auth/user'
}

getUserFn = (callback, errCallback) => {

    callback({
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

    // fetch(URL.getUser, {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         username: credentials.username,
    //         password: credentials.password,
    //     })
    // }).then(res => res.json()).then(res => {
    //     if (res.status === 'Success') {
    //         callback(res)
    //     } else {
    //         errCallback(res)
    //     }
    // }).catch(errCallback)
}

loginFn = (credentials, callback, errCallback) => {
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
            callback(res)
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