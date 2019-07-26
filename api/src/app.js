const doGetRequests = require('./utils')
const _ = require('underscore')
const mongoose = require('mongoose').set('debug', true)
const Schema = require('mongoose').Schema
const fs = require('fs').promises
const uniqueValidator = require('mongoose-unique-validator');
const firebase = require('firebase-admin');
const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport');
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

mongoose.set('debug', false);

// Generate test SMTP service account from ethereal.email
var transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: 'notifymeguelph@gmail.com',
        pass: 'uoguelphnotifyme**'
    }
}));


// setting up firebase with service account
let serviceAccount = require("../serviceAccount.json");
if (!serviceAccount) {
    console.log('YOUR FIREBASE SERVICE ACCOUNT IS NOT THERE')
}
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://guelph-notifyme.firebaseio.com"
})

const dbConnection = 'mongodb://mongo:27017/auth'
console.log(dbConnection)


// User model config
const UserSchema = new Schema({
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    resetPasswordToken: { type: String },
    resetPasswordExpiration: { type: String },
    data: { type: Schema.Types.Mixed }
});

UserSchema.plugin(uniqueValidator);

const User = mongoose.model("User", UserSchema);

// User model config
const CourseSchema = new Schema({
    term: { type: String, required: true },
    status: { type: String, required: true },
    department: { type: String, required: true },
    level: { type: String, required: true },
    course: { type: String, required: true },
    section: { type: String, required: true },
    title: { type: String, required: true },
    faculty: { type: String, required: true },
    meetingInformation: { type: Schema.Types.Mixed, required: true },
    available: { type: Number, required: true },
    capacity: { type: Number, required: true },
    credits: { type: Number, required: true },
    academicLevel: { type: String, required: true },
    location: { type: String, required: true }
});

const Course = mongoose.model("Course", CourseSchema);

// Mongo config
mongoose.connect(dbConnection, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true }).then(async () => {
    console.log("Successfully connected to MongoDB.")
    let seconds = 120


    // loop to refresh DB and check users
    while (true) {
        // get all courses from webadvisor
        let courses = null
        try {
            courses = await getAllCourses()
        } catch (err) {
            continue
        }
        console.log(courses.length)
        courses = _.filter(courses, (course) => {
            if (!course.title || course.status == 'error') return false
            return true
        })
        console.log(courses.length)

        fs.writeFile('./data.json', JSON.stringify(courses), 'utf-8')

        //delete all courses from database
        await Course.deleteMany({})

        // insert the refreshed courses
        await Course.insertMany(courses)

        // get all users and check for courses
        let users = await User.find({})
        await users.forEach(callRequests)

        await sleep(seconds * 1000)
    }

}).catch((err) => console.error(err));

async function callRequests(user) {

    if (!user.data || !user.data.criteria || user.data.criteria.length <= 0 || !user.data.fcm_tokens || user.data.fcm_tokens.length <= 0) {
        return
    }

    let courses = await Course.find({ $or: user.data.criteria })

    let openCourses = _.filter(courses, course => course.available > 0)
    if (openCourses.length > 0) {
        let titles = _.pluck(openCourses, 'title')
        let fcm_tokens = _.without(user.data.fcm_tokens, null, undefined, "")
        contact(titles, fcm_tokens, user.email)
        let history = user.data.history ? user.data.history : []
        history.push(user.data.criteria)
        user.data = {
            fcm_tokens,
            history,
            criteria: []
        }
        user.markModified('data')
        user.save()
    }
}

function contact(courses, fcm_tokens, email) {
    let message = courses.join('\n')
    let notif = {
        notification: {
            title: 'NotifyMe U of G Courses Available',
            body: message
        },
        android: {
            notification: {
                sound: "default"
            }
        },
        apns: {
            payload: {
                aps: {
                    sound: "default"
                }
            }
        },
        data: { courses: JSON.stringify(courses) },
        tokens: fcm_tokens
    }

    firebase.messaging().sendMulticast(notif).then((response) => {
        // Response is a message ID string.
        console.log('Successfully sent message:', response);
    }).catch((error) => {
        console.log('Error sending message:', error);
    })

    // send mail with defined transport object
    transporter.sendMail({
        from: '"NotifyMe" <notifymeguelph@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "U of Guelph Notifyme Courses Available", // Subject line
        text: message, // plain text body
        html: message // html body
    }).then(info => {
        console.log("Message sent: %s", info.messageId);
    })
}

async function getAllCourses() {

    console.log('Getting all courses')

    let promises = []

    // THIS IS MISSING THE LAST DEPARTMENT
    for (let i = 0; i < departments.length; i += 5) {
        let query = {
            courses: [
                { department: departments[i] }
            ],
            semester: 'F19'
        }
        for (let j = 1; j <= 4; j++) {
            if (i + j < departments.length) {
                query.courses.push({ department: departments[i + j] })
            }
        }
        promises.push(doGetRequests(query))
    }
    let values = await Promise.all(promises)
    let courses = _.flatten(values)
    return courses
}

let departments = [
    'ACCT',
    'AGBU',
    'AGR',
    'AHSS',
    'ANSC',
    'ANTH',
    'AQUA',
    'ARAB',
    'ARTH',
    'ASCI',
    'AVC',
    'BADM',
    'BINF',
    'BIOC',
    'BIOL',
    'BIOM',
    'BIOP',
    'BIOT',
    'BOT',
    'BUS',
    'CCJP',
    'CDE',
    'CHEM',
    'CHIN',
    'CIS',
    'CLAS',
    'CLIN',
    'CME',
    'COOP',
    'CROP',
    'CRWR',
    'DAFL',
    'DAGR',
    'DENM',
    'DEQN',
    'DFN',
    'DHRT',
    'DTM',
    'DVT',
    'ECON',
    'ECS',
    'EDRD',
    'ENGG',
    'ENGL',
    'ENVB',
    'ENVM',
    'ENVS',
    'EQN',
    'EURO',
    'FARE',
    'FCSS',
    'FDNT',
    'FINA',
    'FOOD',
    'FRAN',
    'FREN',
    'FRHD',
    'FSQA',
    'GEOG',
    'GERM',
    'GERO',
    'GREK',
    'HHNS',
    'HISP',
    'HIST',
    'HK',
    'HORT',
    'HROB',
    'HTM',
    'HUMN',
    'IBIO',
    'IDEV',
    'IMPR',
    'INDG',
    'INT',
    'IPS',
    'ISS',
    'ITAL',
    'JUST',
    'KIN',
    'LACS',
    'LARC',
    'LAT',
    'LEAD',
    'LING',
    'LRS',
    'LTS',
    'MATH',
    'MBG',
    'MCB',
    'MCM',
    'MCS',
    'MDST',
    'MGMT',
    'MICR',
    'MUSC',
    'NANO',
    'NEUR',
    'NRS',
    'NUTR',
    'OAGR',
    'PABI',
    'PATH',
    'PBIO',
    'PHIL',
    'PHYS',
    'PLNT',
    'POLS',
    'POPM',
    'PORT',
    'PSYC',
    'REAL',
    'RPD',
    'RST',
    'SART',
    'SCMA',
    'SOAN',
    'SOC',
    'SPAN',
    'STAT',
    'THST',
    'TOX',
    'TRMH',
    'UNIV',
    'VETM',
    'WAT',
    'WLU',
    'WMST',
    'XSEN',
    'XSHR',
    'ZOO'
]
