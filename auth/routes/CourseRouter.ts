
import { courseModel } from '../models/Interfaces';
import { Router, Request, Response } from 'express';
import { Course } from '../models/Course';
import _ from 'underscore'

const router: Router = Router();

router.post('/addCourse', (req: Request, res: Response) => {
    const { term, status, department, level, course, section, title, faculty, meetingInformation, available, capacity, credits, academicLevel, location } = req.body
    const newCourse: courseModel = new Course({ term, status, department, level, course, section, title, faculty, meetingInformation, available, capacity, credits, academicLevel, location })
    newCourse.save()
    res.json({ status: 'success' })
})

router.post('/schedule', async (req: Request, res: Response) => {
    const { courses } = req.body

    let coursesGrouped = []
    for (let i = 0; i < courses.length; i++) {
        let possibleCourses = await Course.find(courses[i])
        possibleCourses = _.filter(possibleCourses, (course: any) => course.available > 0)
        if (possibleCourses.length === 0) {
            res.json({ status: 'impossible' })
        }
        coursesGrouped.push(possibleCourses)
    }

    console.log(coursesGrouped)

})
