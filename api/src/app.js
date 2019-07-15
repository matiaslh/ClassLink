const doGetRequests = require('./utils')
const _ = require('underscore')
const mongoose = require('mongoose').set('debug', true)
const Schema = require('mongoose').Schema
const fs = require('fs').promises
const firebase = require('firebase-admin');

// setting up firebase with service account
let serviceAccount = require("../serviceAccount.json");
if (!serviceAccount) {
    console.log('YOUR FIREBASE SERVICE ACCOUNT IS NOT THERE')
}
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://guelph-notifyme.firebaseio.com"
})

const dbConnection = 'mongodb://68.183.197.232:27017/auth'
console.log(dbConnection)

// Course model config
const CourseSchema = new Schema({
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

const Course = mongoose.model("Course", CourseSchema);


// Mongo config
mongoose.connect(dbConnection, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true }).then(() => {
    console.log("Successfully connected to MongoDB.")
    let seconds = 60

    // remove all documents
    setTimeout(async () => {
        // get all courses from webadvisor
        let courses = await getAllCourses()

        Course.deleteMany({}, () => {
            Course.insertMany(courses).then(console.log).catch(console.error)
            fs.writeFile('./data.json', JSON.stringify(courses), 'utf-8');
        })
    }, seconds * 1000)

}).catch((err) => console.error(err));

function callRequests(user) {

    if (!user.data || !user.data.criteria || user.data.criteria.length <= 0 || !user.data.fcm_tokens || user.data.fcm_tokens.length <= 0) {
        return
    }

    let fcm_tokens = user.data.fcm_tokens
    let query = {
        courses: user.data.criteria,
        semester: 'F19'
    }

    doGetRequests(query, async (courses) => {
        let openCourses = _.filter(courses, (elem) => {
            return elem.space_available > 0
        })
        if (openCourses.length > 0) {
            let courses = _.pluck(openCourses, 'title').map(title => {
                let index = title.indexOf(' (')
                return (index != -1) ? title.substring(0, index) : title
            })
            contact(fcm_tokens, courses)

            // remove criteria and add history
            let history = user.data.history ? user.data.history : []
            history.push(user.data.criteria)

            // DO NOT CHANGE FROM USER.DATA = OBJECT CUZ MONGOOSE DOESNT WORK OTHERWISE
            user.data = {
                history,
                criteria: [],
                fcm_tokens
            }

            await user.save()
        }
    })
}

async function getAllCourses() {

    let courses = []
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

        let newCourses = await doGetRequests(query)
        courses = courses.concat(newCourses)
        console.log(i, courses.length)
    }
    return courses
}

function contact(fcm_tokens, courses) {
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
