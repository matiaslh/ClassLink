
import _ from 'underscore'

// constants
export const days = ['Mon', 'Tues', 'Wed', 'Thur', 'Fri']
export const monday = new Date('07/22/2019')
export const paginationLength = 6
export const thumbnailSize = {
    width: 150,
    height: 100
}

export const colours = {
    "colour-0": "rgba(242, 177, 52, 1)",
    'colour-1': "rgba(102, 195, 131 , 1)",
    "colour-2": "rgba(242, 177, 255, 1)",
    "colour-3": "rgba(235, 85, 59, 1)",
    "colour-4": "rgba(60, 100, 59, 1)"
}

// map a number in one range to another range
export const mapToRange = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;

export function getTime(day, time) {
    let daysToAdd = days.indexOf(day)
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