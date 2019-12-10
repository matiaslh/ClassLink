const request = require('request');
const querystring = require('querystring');
const { JSDOM } = require("jsdom");

const timeout = 3 * 1000;

module.exports = function doGetRequests(query) {

    let promise = new Promise(function (resolve, reject) {

        const urlGet = 'https://webadvisor.uoguelph.ca/WebAdvisor/WebAdvisor?CONSTITUENCY=WBST&type=P&pid=ST-WESTS12A&TOKENIDX=';
        const urlPost = 'https://webadvisor.uoguelph.ca/WebAdvisor/WebAdvisor?TOKENIDX='
        const urlPostParams = '&SS=1&APP=ST&CONSTITUENCY=WBST'

        let postFields = getPostFields(query);
        var formData = querystring.stringify(postFields);
        var contentLength = formData.length;

        request(urlGet, { json: true, timeout }, (err, res, body) => {
            if (err) { reject(err); return }

            let cookies = getCookies(res.headers['set-cookie']);
            let sessionId = cookies.LASTTOKEN

            let jar = request.jar();
            res.headers['set-cookie'].forEach((elem) => {
                jar.setCookie(request.cookie(elem), urlGet + sessionId);
            })

            request({ url: urlGet + sessionId, json: true, jar: jar, timeout }, (err, res, body) => {
                if (err) { reject(err); return }

                let cookies = getCookies(res.headers['set-cookie']);
                let sessionId = cookies.LASTTOKEN

                let jar = request.jar();
                res.headers['set-cookie'].forEach((elem) => {
                    jar.setCookie(request.cookie(elem), urlGet + sessionId);
                })

                request.post({
                    url: urlPost + sessionId + urlPostParams,
                    body: formData,
                    jar: jar,
                    followAllRedirects: true,
                    timeout,
                    headers: {
                        'Content-Length': contentLength,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }, (err, res, body) => {
		    if (err) { 
			    reject(err);
			    return 
		    }
                    let courses = getAllCourses(body)
                    resolve(courses)
                })
            })
        })
    }).catch(err => {
        return undefined
    })
    return promise

}

function getTime(str) {
    let colonIndex = str.indexOf(':')
    let hrs = str.substring(0, colonIndex)
    let mins = str.substring(colonIndex + 1, colonIndex + 3)
    let AmPm = str.substring(colonIndex + 3)
    let result = parseInt(hrs + mins)
    return (AmPm === 'AM' || hrs === '12') ? result : result + 1200
}

function getPosition(string, subString, index) {
    return string.split(subString, index).join(subString).length;
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

    let table = root.window.document.querySelector('table.mainTable table table');
    if (!table || table.length == 0) {
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

            let meetings = getCell(cols, 5);
            let times = []
            let exam = {}
            if (meetings) {
                let raw = meetings.split('\n')
                for (let i = 0; i < raw.length; i++) {
                    let currStr = raw[i]
                    let dates = currStr.substring(0, currStr.indexOf(' '))
                    currStr = currStr.substring(currStr.indexOf(' ') + 1)
                    let type = currStr.substring(0, currStr.indexOf(' '))
                    currStr = currStr.substring(currStr.indexOf(' ') + 1)
                    let colonIndex = currStr.indexOf(':')
                    let days = null, start = null, end = null, room = null
                    if (colonIndex !== -1) {
                        days = currStr.substring(0, colonIndex - 3)
                        days = days.split(', ')
                        currStr = currStr.substring(colonIndex - 2)
                        let dashIndex = currStr.indexOf(' - ')
                        start = getTime(currStr.substring(0, dashIndex))
                        currStr = currStr.substring(dashIndex + 3)
                        let commaIndex = currStr.indexOf(', ')
                        end = getTime(currStr.substring(0, commaIndex))
                        currStr = currStr.substring(commaIndex + 2)
                        room = currStr
                    }
                    if (days != null) {
                        for (let j = 0; j < days.length; j++) {
                            let item = { dates, day: days[j], type, start, end, room }
                            if (item.type === 'EXAM') {
                                exam = item
                            } else {
                                times.push(item)
                            }
                        }
                    } else {
                        // THESE ARE ALL DATES THAT ARE TBA
                        // console.log({ title: course.title, meetings })
                    }
                }
            }

            course.meetingInformation = { details: meetings, times, exam }
            course.faculty = getCell(cols, 6);
            let space = getCell(cols, 7);
            let slashIndex = space.indexOf('/')
            let available = parseInt(space.substring(0, slashIndex - 1))
            if (available === NaN || available === null || available === undefined || !available) {
                available = 0
            }
            course.available = available
            let capacity = parseInt(space.substring(slashIndex + 2))
            if (capacity === NaN || capacity === null || capacity === undefined || !capacity) {
                capacity = 0
            }
            course.capacity = capacity
            course.credits = parseInt(getCell(cols, 8))
            course.academicLevel = getCell(cols, 10)

            let firstPositionStar = getPosition(course.title, '*', 1)
            let secondPositionStar = getPosition(course.title, '*', 2)
            let firstPositionSpace = getPosition(course.title, ' ', 1)


            course.department = course.title.substring(0, firstPositionStar)
            course.course = course.title.substring(firstPositionStar + 1, secondPositionStar)
            course.level = course.course.substring(0, 1)
            course.section = course.title.substring(secondPositionStar + 1, firstPositionSpace)


            courses.push(course);
        }
    }
    return courses;
}

function getPostFields(query) {

    let postFields = {"VAR1":query.semester, "VAR10":"Y", "VAR11":"Y","VAR12":"Y", "VAR13":"Y", "VAR14":"Y", "VAR15":"Y", "VAR16":"Y", "DATE.VAR1":"", "DATE.VAR2":"", "LIST.VAR1_CONTROLLER":"LIST.VAR1", "LIST.VAR1_MEMBERS":"LIST.VAR1*LIST.VAR2*LIST.VAR3*LIST.VAR4", "LIST.VAR1_MAX":"5", "LIST.VAR2_MAX":"5", "LIST.VAR3_MAX":"5", "LIST.VAR4_MAX":"5", "LIST.VAR1_1":"", "LIST.VAR2_1":"", "LIST.VAR3_1":"", "LIST.VAR4_1":"", "LIST.VAR1_2":"", "LIST.VAR2_2":"", "LIST.VAR3_2":"", "LIST.VAR4_2":"", "LIST.VAR1_3":"", "LIST.VAR2_3":"", "LIST.VAR3_3":"", "LIST.VAR4_3":"", "LIST.VAR1_4":"", "LIST.VAR2_4":"", "LIST.VAR3_4":"", "LIST.VAR4_4":"", "LIST.VAR1_5":"", "LIST.VAR2_5":"", "LIST.VAR3_5":"", "LIST.VAR4_5":"", "VAR7":"", "VAR8":"", "VAR3":"", "VAR6":"", "VAR21":"", "VAR9":"", "SUBMIT_OPTIONS":""}
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
