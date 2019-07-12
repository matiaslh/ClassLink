import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { courseModel } from './Interfaces'

// User model config
const CourseSchema: mongoose.Schema<any> = new Schema({
    department: { type: String, required: true },
    level: { type: String, required: true },
    course: { type: String, required: true },
    section: { type: String, required: true }
});

CourseSchema.plugin(uniqueValidator);

export const Course: mongoose.Model<any> = mongoose.model("Course", CourseSchema);

export function saveUser(newCourse: courseModel, callback: any) {
    newCourse.save(callback)
}

