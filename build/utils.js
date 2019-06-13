"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var requestify = require('requestify');
function doGetRequests(query) {
    var url = 'https://webadvisor.uoguelph.ca/WebAdvisor/WebAdvisor?CONSTITUENCY=WBST&type=P&pid=ST-WESTS12A&TOKENIDX=';
    requestify.get(url).then(function (response) {
        var originalCookies = response.headers["set-cookie"];
        var cookies = getCookies(originalCookies);
        var session_id = cookies.LASTTOKEN;
        var options = { cookies: originalCookies };
        console.log(options);
        console.log(url + session_id);
        requestify.get(url + session_id, options).then(function (response_cookie) {
            var originalCookies = response.headers["set-cookie"];
            var cookies = getCookies(originalCookies);
            var session_id = cookies.LASTTOKEN;
            var options = { cookies: originalCookies };
            var postFields = getPostFields(query);
            requestify.post(url + session_id + '&SS=1&APP=ST&CONSTITUENCY=WBST', postFields, options).then(function (response_final) {
                var html = document.createElement('html');
                html.innerHTML = response_final;
                var result = getAllCourses(html);
                console.log(result);
                return result;
            });
        });
    }).catch(function (err) {
        console.log('Requestify Error', err);
    });
}
exports.doGetRequests = doGetRequests;
function getAllCourses(html) {
    var table = html.querySelector('table.mainTable');
    if (!table) {
        return { status: 'error' };
    }
    var courses = {};
    var rows = table.querySelectorAll('tr');
    for (var i = 0; i < rows.length; i++) {
        var cols = rows[i].querySelectorAll('td');
        var course = {};
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
exports.getAllCourses = getAllCourses;
function getPostFields(query) {
    var postFields = {
        "VAR1": query.semester, "VAR10": "Y", "VAR11": "Y", "VAR12": "Y", "VAR13": "Y", "VAR14": "Y", "VAR15": "Y", "VAR16": "Y", "DATE.VAR1": "", "DATE.VAR2": "", "LIST.VAR1_CONTROLLER": "LIST.VAR1", "LIST.VAR1_MEMBERS": "LIST.VAR1*LIST.VAR2*LIST.VAR3*LIST.VAR4", "LIST.VAR1_MAX": "5", "LIST.VAR2_MAX": "5", "LIST.VAR3_MAX": "5", "LIST.VAR4_MAX": "5", "LIST.VAR1_1": "", "LIST.VAR2_1": "", "LIST.VAR3_1": "",
        "LIST.VAR4_1": "", "LIST.VAR1_2": "", "LIST.VAR2_2": "", "LIST.VAR3_2": "", "LIST.VAR4_2": "", "LIST.VAR1_3": "", "LIST.VAR2_3": "", "LIST.VAR3_3": "", "LIST.VAR4_3": "", "LIST.VAR1_4": "", "LIST.VAR2_4": "", "LIST.VAR3_4": "", "LIST.VAR4_4": "", "LIST.VAR1_5": "", "LIST.VAR2_5": "", "LIST.VAR3_5": "", "LIST.VAR4_5": "", "VAR7": "", "VAR8": "", "VAR3": "", "VAR6": "", "VAR21": "", "VAR9": "", "SUBMIT_OPTIONS": ""
    };
    var propName = 'LIST.VAR';
    query.courses.forEach(function (elem, index) {
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
exports.getPostFields = getPostFields;
function getCookies(cookieArray) {
    var newObject = {};
    for (var _i = 0, cookieArray_1 = cookieArray; _i < cookieArray_1.length; _i++) {
        var cookie = cookieArray_1[_i];
        var split = cookie.split("=");
        newObject[split[0]] = split[1];
    }
    return newObject;
}
exports.getCookies = getCookies;
