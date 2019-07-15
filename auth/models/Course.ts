import mongoose, { Schema } from 'mongoose';

// User model config
const CourseSchema: mongoose.Schema<any> = new Schema({
    term: { type: String, required: true },
    status: { type: String, required: true },
    department: { type: String, required: true },
    level: { type: String, required: true },
    course: { type: String, required: true },
    section: { type: String, required: true },
    title: { type: String, required: true },
    faculty: { type: String, required: true },
    meetingInformation: { type: String, required: true },
    available: { type: Number, required: true },
    capacity: { type: Number, required: true },
    credits: { type: Number, required: true },
    academicLevel: { type: String, required: true },
    location: { type: String, required: true }
});

export const Course: mongoose.Model<any> = mongoose.model("Course", CourseSchema);

