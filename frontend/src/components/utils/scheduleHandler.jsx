import requests from "./requests";
const coursesKey = 'courses'

export function clearCourses() {
    storeCourses([])
}

export async function getInitialSchedules() {
    let courses = getCourses()
    let schedules = []
    for (let i = 0; i < courses.length; i++) {
        schedules = await getAllSchedules(schedules, courses[i], i === 0, true)
    }
    return schedules
}

export async function getAllSchedules(schedules, newCourse, firstCourse, alreadyInLocalStorage) {

    let courses = getCourses()
    let response = await requests.getSections(newCourse)
    let allSections = response.sections

    if (!alreadyInLocalStorage) {
        courses.push(newCourse)
        storeCourses(courses)
    }

    // allSections = allSections.filter(course => course.available > 0) // might add preference for this
    if (allSections.length === 0) {
        return []
    }

    // adding first course
    if (firstCourse || courses.length === 1) {
        for (let i = 0; i < allSections.length; i++) {
            let schedule = createSchedule(allSections[i])
            schedules.push(schedule)
        }
        return schedules
    }

    let newSchedules = []
    for (let i = 0; i < allSections.length; i++) {
        let currSection = allSections[i]
        for (let j = 0; j < schedules.length; j++) {
            let currSchedule = schedules[j]
            let scheduleToAdd = addToSchedule(currSchedule, currSection)
            if (scheduleToAdd) {
                newSchedules.push(scheduleToAdd)
            }
        }
    }
    return newSchedules
}

let addToSchedule = (schedule, section) => {
    let newSchedule = JSON.parse(JSON.stringify(schedule))
    let times = section.meetingInformation.times
    for (let i = 0; i < times.length; i++) {
        let currTime = times[i]
        if (schedule.days[currTime.day]) {
            for (let j = 0; j < schedule.days[currTime.day].length; j++) {
                let scheduleTime = schedule.days[currTime.day][j]
                if (!(scheduleTime.start > currTime.end || scheduleTime.end < currTime.start)) {
                    return null
                }
            }
        }
        pushSectionToSchedule(newSchedule, section, currTime)
    }
    return newSchedule
}

let createSchedule = (section) => {
    let schedule = { days: {} }
    let times = section.meetingInformation.times
    for (let i = 0; i < times.length; i++) {
        pushSectionToSchedule(schedule, section, times[i])
    }
    return schedule
}

let pushSectionToSchedule = (schedule, section, currTime) => {
    let newTime = { start: currTime.start, end: currTime.end, meeting: currTime, section }
    if (!schedule.days[currTime.day]) {
        schedule.days[currTime.day] = []
    }
    schedule.days[currTime.day].push(newTime)
}

export function getCourses() {
    let coursesStr = localStorage.getItem(coursesKey)
    if (!coursesStr) {
        return []
    }
    return JSON.parse(coursesStr)
}

let storeCourses = (courses) => {
    let coursesStr = JSON.stringify(courses)
    localStorage.setItem(coursesKey, coursesStr)
}
