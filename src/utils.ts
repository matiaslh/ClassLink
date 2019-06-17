const request = require('request');
const fs = require('fs');
var querystring = require('querystring');
const { JSDOM } = require("jsdom");

export function doGetRequests(query: any, callback: Function) {

    const urlGet = 'https://webadvisor.uoguelph.ca/WebAdvisor/WebAdvisor?CONSTITUENCY=WBST&type=P&pid=ST-WESTS12A&TOKENIDX=';
    const urlPost = 'https://webadvisor.uoguelph.ca/WebAdvisor/WebAdvisor?TOKENIDX='
    const urlPostParams = '&SS=1&APP=ST&CONSTITUENCY=WBST'

    let postFields = getPostFields(query);
    var formData = querystring.stringify(postFields);
    var contentLength = formData.length;


    request(urlGet, { json: true }, (err: any, res: any, body: any) => {
        if (err) { return console.log(err); }

        let cookies = getCookies(res.headers['set-cookie']);
        let sessionId = cookies.LASTTOKEN

        let jar = request.jar();
        res.headers['set-cookie'].forEach((elem: any) => {
            jar.setCookie(request.cookie(elem), urlGet + sessionId);
        });

        request({ url: urlGet + sessionId, json: true, jar: jar }, (err: any, res: any, body: any) => {
            if (err) { return console.log(err); }

            let cookies = getCookies(res.headers['set-cookie']);
            let sessionId = cookies.LASTTOKEN

            let jar = request.jar();
            res.headers['set-cookie'].forEach((elem: any) => {
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
            }, (err: any, res: any, body: any) => {
                if (err) { return console.log(err); }

                fs.writeFile("/temp1.log", body, function (err: any) {
                    if (err) {
                        return console.log("error" + err);
                    }

                    console.log("The file was saved!");
                });
                console.log('done')
                let courses = getAllCourses(body)
                callback(courses);
            });

        });

    });

}

function getCell(columns: any, i: number, selector?: string) {
    let p = columns[i].querySelector(selector ? selector : 'p');
    return p.innerHTML;
}

export function getAllCourses(html: string): any {

    let root = new JSDOM(html);

    let errorText = root.window.document.querySelector('div.errorText');
    if (errorText != null && errorText.innerHTML) {
        return { status: 'error', message: errorText.innerHTML }
    }

    let table = root.window.document.querySelector('table.mainTable table table');
    if (table.length == 0) {
        return { status: 'error' };
    }

    let courses: any = [];
    let rows = table.querySelectorAll('tr');

    for (let i = 0; i < rows.length; i++) {
        let cols = rows[i].querySelectorAll('td');
        if (cols.length > 0) {
            let course: any = {};
            course.term = getCell(cols, 1);
            course.status = getCell(cols, 2);
            course.title = getCell(cols, 3, 'a');
            course.location = getCell(cols, 4);
            course.meetings = getCell(cols, 5);
            course.faculty = getCell(cols, 6);
            course.space = getCell(cols, 7);
            course.credits = getCell(cols, 8);
            course.academic_level = getCell(cols, 10);
            courses.push(course);
        }
    }
    courses.status = 'success';
    return courses;
}

export function getPostFields(query: any): any {

    let postFields: any = {
        "VAR1": "", "VAR10": "Y", "VAR11": "Y", "VAR12": "Y", "VAR13": "Y", "VAR14": "Y", "VAR15": "Y", "VAR16": "Y", "DATE.VAR1": "", "DATE.VAR2": "", "LIST.VAR1_CONTROLLER": "LIST.VAR1", "LIST.VAR1_MEMBERS": "LIST.VAR1*LIST.VAR2*LIST.VAR3*LIST.VAR4", "LIST.VAR1_MAX": "5", "LIST.VAR2_MAX": "5", "LIST.VAR3_MAX": "5", "LIST.VAR4_MAX": "5", "LIST.VAR1_1": "", "LIST.VAR2_1": "", "LIST.VAR3_1": "",
        "LIST.VAR4_1": "", "LIST.VAR1_2": "", "LIST.VAR2_2": "", "LIST.VAR3_2": "", "LIST.VAR4_2": "", "LIST.VAR1_3": "", "LIST.VAR2_3": "", "LIST.VAR3_3": "", "LIST.VAR4_3": "", "LIST.VAR1_4": "", "LIST.VAR2_4": "", "LIST.VAR3_4": "", "LIST.VAR4_4": "", "LIST.VAR1_5": "", "LIST.VAR2_5": "", "LIST.VAR3_5": "", "LIST.VAR4_5": "", "VAR7": "", "VAR8": "", "VAR3": "", "VAR6": "", "VAR21": "", "VAR9": "", "SUBMIT_OPTIONS": ""
    }
    postFields.VAR1 = query.semester;
    let propName = 'LIST.VAR';
    query.courses.forEach((elem: any, index: number) => {
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

export function getCookies(cookieArray: Array<string>) {
    let newObject: any = {};
    for (let cookie of cookieArray) {
        let index = cookie.indexOf('=');
        newObject[cookie.substring(0, index)] = cookie.substring(index + 1)
    }
    return newObject;
}