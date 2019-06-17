const requestify = require('requestify');
const spawn = require("child_process").spawn;

export function doGetRequests(query: any, callback: Function) {
    let queryStr = JSON.stringify(query);
    queryStr = queryStr.replace(new RegExp('"', 'g'), '\\"');
    console.log(queryStr)
    const pythonProcess = spawn('python', ["path/to/script.py", queryStr]);
    pythonProcess.stdout.on('data', (data: any) => {
        console.log(data);
        callback(data);
    });
}

export function getAllCourses(html: HTMLHtmlElement): any {

    let table = html.querySelector('table.mainTable');

    if (!table) {
        return { status: 'error' };
    }

    let courses: any = {};
    let rows = table.querySelectorAll('tr');

    for (let i = 0; i < rows.length; i++) {
        let cols = rows[i].querySelectorAll('td');
        let course: any = {};
        course.term = cols[1].querySelector('p').innerHTML;
        course.status = cols[2].querySelector('p').innerHTML;
        course.title = cols[3].querySelector('p').innerHTML;
        course.location = cols[4].querySelector('p').innerHTML;
        course.meetings = cols[5].querySelector('p').innerHTML;
        course.faculty = cols[6].querySelector('p').innerHTML;
        course.space = cols[7].querySelector('p').innerHTML;
        course.credits = cols[8].querySelector('p').innerHTML;
        course.academic_level = cols[9].querySelector('p').innerHTML;
    }
    courses.status = 'success';
    return courses;
}

export function getPostFields(query: any): any {
    let postFields: any = {
        "VAR1": query.semester, "VAR10": "Y", "VAR11": "Y", "VAR12": "Y", "VAR13": "Y", "VAR14": "Y", "VAR15": "Y", "VAR16": "Y", "DATE.VAR1": "", "DATE.VAR2": "", "LIST.VAR1_CONTROLLER": "LIST.VAR1", "LIST.VAR1_MEMBERS": "LIST.VAR1*LIST.VAR2*LIST.VAR3*LIST.VAR4", "LIST.VAR1_MAX": "5", "LIST.VAR2_MAX": "5", "LIST.VAR3_MAX": "5", "LIST.VAR4_MAX": "5", "LIST.VAR1_1": "", "LIST.VAR2_1": "", "LIST.VAR3_1": "",
        "LIST.VAR4_1": "", "LIST.VAR1_2": "", "LIST.VAR2_2": "", "LIST.VAR3_2": "", "LIST.VAR4_2": "", "LIST.VAR1_3": "", "LIST.VAR2_3": "", "LIST.VAR3_3": "", "LIST.VAR4_3": "", "LIST.VAR1_4": "", "LIST.VAR2_4": "", "LIST.VAR3_4": "", "LIST.VAR4_4": "", "LIST.VAR1_5": "", "LIST.VAR2_5": "", "LIST.VAR3_5": "", "LIST.VAR4_5": "", "VAR7": "", "VAR8": "", "VAR3": "", "VAR6": "", "VAR21": "", "VAR9": "", "SUBMIT_OPTIONS": ""
    }
    let propName = 'LIST.VAR';
    query.courses.forEach((elem: any, index: number) => {
        if (elem.department) {
            postFields[propName + '1_' + (index + 1)] = elem;
        }
        if (elem.level) {
            postFields[propName + '2_' + (index + 1)] = elem;
        }
        if (elem.course) {
            postFields[propName + '3_' + (index + 1)] = elem;
        }
        if (elem.section) {
            postFields[propName + '4_' + (index + 1)] = elem;
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