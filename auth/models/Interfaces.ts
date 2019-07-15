export enum status {
    Success = "Success",
    Failure = "Failure"
}

export interface userModel {
    username: string,
    password: string,
    email: string,
    id: any,
    resetPasswordToken: string,
    resetPasswordExpiration: number,
    save: (err?: Error) => void
};

// term, status, department, level, course, section, title, faculty, meetingInformation, available, capacity, credits, academicLevel

export interface courseModel {
    id: any,
    term: string,
    status: string,
    department: string,
    level: string,
    course: string,
    section: string,
    title: string,
    faculty: string,
    meetingInformation: string,
    available: number,
    capacity: number,
    credits: number,
    academicLevel: string,
    location: string,
    save: (err?: Error) => void
}

export interface MailObject {
    from: string | undefined,
    to: string,
    subject: string,
    text: string
}
