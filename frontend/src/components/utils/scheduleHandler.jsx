import requests from "./requests";
import _ from 'underscore'

const scheduleKey = 'schedules'

export function clearSchedules() {
    storeSchedules([])
}

export function getStoredSchedules() {
    let schedules = getSchedules()
    if (!schedules) {
        storeSchedules([])
        return []
    } else {
        return schedules
    }
}

export async function getAllSchedules(schedules, newCourse) {

    let response = await requests.getSections(newCourse)
    let allSections = response.sections

    allSections = _.filter(allSections, (course) => course.available > 0) // might add preference for this
    if (allSections.length === 0) {
        return []
    }

    if (schedules.length === 0) {
        for (let i = 0; i < allSections.length; i++) {
            let schedule = createSchedule(allSections[i])
            schedules.push(schedule)
        }
        storeSchedules(schedules)
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
    storeSchedules(newSchedules)
    return newSchedules
}

let addToSchedule = (schedule, section) => {
    let newSchedule = JSON.parse(JSON.stringify(schedule))
    let times = section.meetingInformation.times
    for (let i = 0; i < times.length; i++) {
        let currTime = times[i]
        if (schedule[currTime.day]) {
            for (let j = 0; j < schedule[currTime.day].length; j++) {
                let scheduleTime = schedule[currTime.day][j]
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
    let schedule = {}
    let times = section.meetingInformation.times
    for (let i = 0; i < times.length; i++) {
        pushSectionToSchedule(schedule, section, times[i])
    }
    return schedule
}

let pushSectionToSchedule = (schedule, section, currTime) => {
    let info = Object.assign({}, section._doc)
    delete info.meetingInformation
    let newTime = { start: currTime.start, end: currTime.end, meeting: currTime, info }
    if (!schedule[currTime.day]) {
        schedule[currTime.day] = []
    }
    schedule[currTime.day].push(newTime)
}

let getSchedules = () => {
    let scheduleStr = localStorage.getItem(scheduleKey)
    return JSON.parse(scheduleStr)
}

let storeSchedules = (schedules) => {
    let scheduleStr = JSON.stringify(schedules)
    localStorage.setItem(scheduleKey, scheduleStr)
}
