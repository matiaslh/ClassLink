
import _ from 'underscore'

// constants
export const DAYS = ['Mon', 'Tues', 'Wed', 'Thur', 'Fri']
export const monday = new Date('07/22/2019')
export const paginationLength = 6
export const thumbnailSize = {
    width: 150,
    height: 100
}

export const colours = {
    "colour-0": "#7AC9A7",
    'colour-1': "#F38220",
    "colour-2": "#F9A71A",
    "colour-3": "#FFCC74",
    "colour-4": "#E48000"
}

// map a number in one range to another range
export const mapToRange = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;

export function getTime(day, time) {
    let daysToAdd = DAYS.indexOf(day)
    return new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + daysToAdd, Math.floor(time / 100), time % 100)
}

export function getColourForCourse(courses, department, course) {
    let colourIndex = _.findIndex(courses, { department, course })
    let key = 'colour-' + colourIndex
    return key
}

export function minutesBetween(start, end) {
    let durationHrs = (Math.floor(end / 100) - Math.floor(start / 100))
    let durationMins = end % 100 - start % 100
    let minutesDuration = durationHrs * 60 + durationMins
    return minutesDuration
}

export const sortingLabels = {
    minutesBetweenClasses: 'Least Time on Campus',
    daysOff: 'Most Days Off'
}

export const sortDefault = 'minutesBetweenClasses'