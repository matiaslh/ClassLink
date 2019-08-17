import requests from "./requests";
import { guid } from 'react-agenda'
import { getTime, getColourForCourse, minutesBetween, sortDefault } from './helpers'

class Schedule {

    days = {}
    courses = []
    items = []

    constructor(section) {
        if (section) {
            this.addCourseFromSection(section)
            let times = section.meetingInformation.times
            for (let i = 0; i < times.length; i++) {
                this.forcePushSection(section, times[i])
            }
            this.setConstants()
        }
    }

    generateItems = () => {
        let keys = this.getDayKeys()
        let items = []
        for (let i = 0; i < keys.length; i++) {
            let currDayTimes = this.getDayTimes(keys[i])
            let currDay = keys[i]
            for (let j = 0; j < currDayTimes.length; j++) {
                let currTime = currDayTimes[j]
                let item = {
                    _id: guid(),
                    name: currTime.meeting.type + ' - ' + currTime.section.department + '*' + currTime.section.course + ' - ' + currTime.section.section,
                    startDateTime: getTime(currDay, currTime.start),
                    endDateTime: getTime(currDay, currTime.end),
                    classes: getColourForCourse(this.getCourses(), currTime.section.department, currTime.section.course),
                    section: currTime.section
                }
                items.push(item)
            }
        }
        this.setItems(items)
    }

    addSection = section => {
        let newSchedule = this.clone()
        let times = section.meetingInformation.times
        for (let i = 0; i < times.length; i++) {
            let currTime = times[i]
            let dayTimes = this.getDayTimes(currTime.day)
            if (dayTimes) {
                for (let j = 0; j < dayTimes.length; j++) {
                    let scheduleTime = dayTimes[j]
                    if (!(scheduleTime.start > currTime.end || scheduleTime.end < currTime.start)) {
                        this.setDays(undefined)
                        return
                    }
                }
            }
            newSchedule.forcePushSection(section, currTime)
        }
        this.setDays(newSchedule.getDays())
        this.addCourseFromSection(section)
        this.setConstants()
    }

    forcePushSection = (section, currTime) => {

        let durationMins = minutesBetween(currTime.start, currTime.end)
        let newTime = { start: currTime.start, end: currTime.end, durationMins, meeting: currTime, section }
        let dayTimes = this.getDayTimes(currTime.day)
        if (!dayTimes) {
            this.initDayTimes(currTime.day)
        }

        // update the start, end and classDuration of day
        let currDay = this.getDays()[currTime.day]
        if (!currDay.start || newTime.start < currDay.start) {
            currDay.start = newTime.start
        }
        if (!currDay.end || newTime.end > currDay.end) {
            currDay.end = newTime.end
        }

        currDay.minutesInClass += newTime.durationMins // this doesnt work for CIS*1300 since it adds it twice
        currDay.minutesBetweenClasses = minutesBetween(currDay.start, currDay.end) - currDay.minutesInClass
        this.getDayTimes(currTime.day).push(newTime)
    }

    setConstants = () => {
        let keys = this.getDayKeys()
        let days = this.getDays()

        // find total number of minutes between classes
        let minsBetween = 0
        for (let i = 0; i < keys.length; i++) {
            let day = days[keys[i]]
            minsBetween += day.minutesBetweenClasses

            // threshold for when you have only one course on a day
            if (day.minutesBetweenClasses === 0) {
                minsBetween += 120
            }
        }
        this.minutesBetweenClasses = minsBetween
    }

    getCourses = () => {
        return this.courses
    }

    setCourses = courses => {
        this.courses = courses
    }

    addCourseFromSection = section => {
        this.courses.push({ department: section.department, course: section.course })
    }

    getItems = () => {
        return this.items
    }

    setItems = items => {
        this.items = items
    }

    getDayKeys = () => {
        return Object.keys(this.getDays())
    }

    getDayTimes = day => {
        return this.getDays()[day] ? this.getDays()[day].times : undefined
    }

    initDayTimes = day => {
        this.getDays()[day] = { times: [], minutesInClass: 0 }
    }

    getDays = () => {
        return this.days
    }

    setDays = days => {
        this.days = days
    }

    toString = () => {
        return JSON.stringify(this.getDays())
    }

    hasData = () => {
        return this.getDays() !== undefined && this.getCourses() !== undefined
    }

    clone = () => {
        let newSchedule = new Schedule()
        newSchedule.setDays(JSON.parse(JSON.stringify(this.getDays())))
        newSchedule.setCourses(JSON.parse(JSON.stringify(this.getCourses())))
        newSchedule.setItems(JSON.parse(JSON.stringify(this.getItems())))
        newSchedule.setConstants()
        return newSchedule
    }

}

// SORTING: SPACE_BETWEEN_LOAD_BALANCED, SPACE_BETWEEN_NON_LOAD_BALANCED
function sortSchedules(schedules) {
    let sort = getSort()
    let xMult = 1, yMult = -1

    if (!sort.descending) {
        xMult = -1
        yMult = 1
    }

    const compareFns = {
        minutesBetweenClasses: (a, b, aMult, bMult) => {
            return aMult * a.minutesBetweenClasses + bMult * b.minutesBetweenClasses
        },
        daysOff: (a, b, aMult, bMult) => {
            return aMult * a.getDayKeys().length + bMult * b.getDayKeys().length
        }
    }

    schedules.sort((scheduleX, scheduleY) => {
        return compareFns[sort.value](scheduleX, scheduleY, xMult, yMult) || compareFns[sortDefault](scheduleX, scheduleY, xMult, yMult)
    })
}

export async function getSchedulesFromCourses(courses) {
    let schedules = []
    for (let i = 0; i < courses.length; i++) {
        schedules = await getAllSchedules(schedules, courses[i], { firstCourse: i === 0, alreadyInLocalStorage: true })
    }
    sortSchedules(schedules)
    return schedules
}

export async function getAllSchedules(schedules, newCourse, options) {

    let { firstCourse, alreadyInLocalStorage } = options

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
            let schedule = new Schedule(allSections[i])
            schedules.push(schedule)
        }
        sortSchedules(schedules)
        return schedules
    }

    let newSchedules = []
    for (let i = 0; i < allSections.length; i++) {
        let currSection = allSections[i]
        for (let j = 0; j < schedules.length; j++) {
            let currSchedule = schedules[j].clone()
            currSchedule.addSection(currSection)
            if (currSchedule.hasData()) {
                newSchedules.push(currSchedule)
            }
        }
    }
    sortSchedules(newSchedules)
    return newSchedules
}

export function getCourses() {
    let coursesStr = localStorage.getItem('courses')
    if (!coursesStr) {
        return []
    }
    return JSON.parse(coursesStr)
}

export function storeCourses(courses) {
    let coursesStr = JSON.stringify(courses)
    localStorage.setItem('courses', coursesStr)
}

function getSort() {
    let sort = localStorage.getItem('sort')
    if (!sort) {
        return { value: sortDefault, descending: true }
    }
    return JSON.parse(sort)
}

export function storeSort(sort) {
    let sortStr = JSON.stringify(sort)
    localStorage.setItem('sort', sortStr)
}

export function storeBlockedTimes(blockedTimes) {
    localStorage.setItem('blockedTimes', blockedTimes)
}
