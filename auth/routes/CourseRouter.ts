
import { courseModel } from '../models/Interfaces'
import { Router, Request, Response } from 'express'
import { Course } from '../models/Course'

const router: Router = Router();

router.post('/search', async (req: Request, res: Response) => {
    const { course } = req.body
    let sections = await Course.find(course)
    res.json({ sections, status: 'success' })
})

router.get('/courses', async (req: Request, res: Response) => {
    let courses = await Course.aggregate().group({
        _id: {
            department: '$department',
            course: '$course'
        }
    }).project({ _id: 0, label: { $concat: ['$_id.department', '*', '$_id.course'] } })
    // { $project: { _id: 0, department: "$_id.department", course: "$_id.course" } }
    res.json(courses)
})

export const courseRouter: Router = router
