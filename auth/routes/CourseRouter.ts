
import { courseModel } from '../models/Interfaces';
import { Router, Request, Response } from 'express';
import { Course } from '../models/Course';

const router: Router = Router();

router.post('/addCourse', (req: Request, res: Response) => {
    const { term, status, department, level, course, section, title, faculty, meetingInformation, available, capacity, credits, academicLevel, location } = req.body
    const newCourse: courseModel = new Course({ term, status, department, level, course, section, title, faculty, meetingInformation, available, capacity, credits, academicLevel, location })
    newCourse.save()
    res.json({ status: 'success' })
})
