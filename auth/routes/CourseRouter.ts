
import { courseModel } from '../models/Interfaces'
import { Router, Request, Response } from 'express'
import { Course } from '../models/Course'

const router: Router = Router();

router.post('/search', async (req: Request, res: Response) => {
    const { course } = req.body
    let sections = await Course.find(course)
    res.json({ sections, status: 'success' })
})

export const courseRouter: Router = router
