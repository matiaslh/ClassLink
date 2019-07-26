
import { courseModel } from '../models/Interfaces';
import { Router, Request, Response } from 'express';
import { Course } from '../models/Course';
import _ from 'underscore'

const router: Router = Router();

router.post('/search', async (req: Request, res: Response) => {
    const { newCourse, schedules } = req.body

    let allSections = await Course.find(newCourse)
    allSections = _.filter(allSections, (course: any) => course.available > 0)
    if (allSections.length === 0) {
        res.json({ status: 'impossible' })
    }

    // console.log(allSections)

    if (schedules.length === 0) {
        for (let i = 0; i < allSections.length; i++) {
            let schedule = createSchedule(allSections[i])
            schedules.push(schedule)
        }
        res.json({ schedules, status: 'success' })
        return
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
    res.json({ schedules: newSchedules, status: 'success' })

})

let addToSchedule = (schedule: any, section: any) => {
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

let createSchedule = (section: any) => {
    let schedule: any = {}
    let times = section.meetingInformation.times
    for (let i = 0; i < times.length; i++) {
        pushSectionToSchedule(schedule, section, times[i])
    }
    return schedule
}

let pushSectionToSchedule = (schedule: any, section: any, currTime: any) => {
    let info = (<any>Object).assign({}, section._doc)
    delete info.meetingInformation
    let newTime = { start: currTime.start, end: currTime.end, meeting: currTime, info }
    if (!schedule[currTime.day]) {
        schedule[currTime.day] = []
    }
    schedule[currTime.day].push(newTime)
}

export const courseRouter: Router = router
