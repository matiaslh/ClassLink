const request = require('request');
const querystring = require('querystring');
const { JSDOM } = require("jsdom");

module.exports = function doGetRequests(query, callback) {

    const urlGet = 'https://webadvisor.uoguelph.ca/WebAdvisor/WebAdvisor?CONSTITUENCY=WBST&type=P&pid=ST-WESTS12A&TOKENIDX=';
    const urlPost = 'https://webadvisor.uoguelph.ca/WebAdvisor/WebAdvisor?TOKENIDX='
    const urlPostParams = '&SS=1&APP=ST&CONSTITUENCY=WBST'

    let postFields = getPostFields(query);
    var formData = querystring.stringify(postFields);
    var contentLength = formData.length;

    request(urlGet, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }

        let cookies = getCookies(res.headers['set-cookie']);
        let sessionId = cookies.LASTTOKEN

        let jar = request.jar();
        res.headers['set-cookie'].forEach((elem) => {
            jar.setCookie(request.cookie(elem), urlGet + sessionId);
        });

        request({ url: urlGet + sessionId, json: true, jar: jar }, (err, res, body) => {
            if (err) { return console.log(err); }

            let cookies = getCookies(res.headers['set-cookie']);
            let sessionId = cookies.LASTTOKEN

            let jar = request.jar();
            res.headers['set-cookie'].forEach((elem) => {
                jar.setCookie(request.cookie(elem), urlGet + sessionId);
            });

            request.post({
                url: urlPost + sessionId + urlPostParams,
                body: formData,
                jar: jar,
                followAllRedirects: true,
                headers: {
                    'Content-Length': contentLength,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }, (err, res, body) => {
                if (err) { return console.log(err); }
                console.log('done')
                let courses = getAllCourses(body)
                // console.log(courses)
                callback(courses);
            });

        });

    });
}

function getCell(columns, i, selector) {
    let p = columns[i].querySelector(selector ? selector : 'p');
    return p.innerHTML;
}

function getAllCourses(html) {

    let root = new JSDOM(html);

    let errorText = root.window.document.querySelector('div.errorText');
    if (errorText != null && errorText.innerHTML) {
        return { status: 'error', message: errorText.innerHTML }
    }

    let table = root.window.document.querySelector('table.mainTable');
    if (table.length == 0) {
        return { status: 'error' };
    }
    table = table.window.document.querySelector('table')
    if (table.length == 0) {
        return { status: 'error' };
    }
    table = table.window.document.querySelector('table')
    if (table.length == 0) {
        return { status: 'error' };
    }

    let courses = [];
    let rows = table.querySelectorAll('tr');

    for (let i = 0; i < rows.length; i++) {
        let cols = rows[i].querySelectorAll('td');
        if (cols.length > 0) {
            let course = {};
            course.term = getCell(cols, 1);
            course.status = getCell(cols, 2);
            course.title = getCell(cols, 3, 'a');
            course.location = getCell(cols, 4);
            course.meetings = getCell(cols, 5);
            course.faculty = getCell(cols, 6);
            let space = getCell(cols, 7);
            let slashIndex = space.indexOf('/')
            course.space_available = parseInt(space.substring(0, slashIndex - 1))
            course.space_total = parseInt(space.substring(slashIndex + 2))
            course.credits = getCell(cols, 8);
            course.academic_level = getCell(cols, 10);
            courses.push(course);
        }
    }
    return courses;
}

function getPostFields(query) {

    let postFields = {
        "VAR1": "", "DATE.VAR1": "", "DATE.VAR2": "", "LIST.VAR1_CONTROLLER": "LIST.VAR1", "LIST.VAR1_MEMBERS": "LIST.VAR1*LIST.VAR2*LIST.VAR3*LIST.VAR4", "LIST.VAR1_MAX": "5", "LIST.VAR2_MAX": "5", "LIST.VAR3_MAX": "5", "LIST.VAR4_MAX": "5", "LIST.VAR1_1": "", "LIST.VAR2_1": "", "LIST.VAR3_1": "",
        "LIST.VAR4_1": "", "LIST.VAR1_2": "", "LIST.VAR2_2": "", "LIST.VAR3_2": "", "LIST.VAR4_2": "", "LIST.VAR1_3": "", "LIST.VAR2_3": "", "LIST.VAR3_3": "", "LIST.VAR4_3": "", "LIST.VAR1_4": "", "LIST.VAR2_4": "", "LIST.VAR3_4": "", "LIST.VAR4_4": "", "LIST.VAR1_5": "", "LIST.VAR2_5": "", "LIST.VAR3_5": "", "LIST.VAR4_5": "", "VAR7": "", "VAR8": "", "VAR3": "", "VAR6": "", "VAR21": "", "VAR9": "", "SUBMIT_OPTIONS": ""
    }
    postFields.VAR1 = query.semester;
    let propName = 'LIST.VAR';
    query.courses.forEach((elem, index) => {
        if (elem.department) {
            postFields[propName + '1_' + (index + 1)] = elem.department;
        }
        if (elem.level) {
            postFields[propName + '2_' + (index + 1)] = elem.level;
        }
        if (elem.course) {
            postFields[propName + '3_' + (index + 1)] = elem.course;
        }
        if (elem.section) {
            postFields[propName + '4_' + (index + 1)] = elem.section;
        }
    });
    return postFields;
}

function getCookies(cookieArray) {
    let newObject = {};
    for (let cookie of cookieArray) {
        let index = cookie.indexOf('=');
        newObject[cookie.substring(0, index)] = cookie.substring(index + 1)
    }
    return newObject;
}
