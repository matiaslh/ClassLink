const doGetRequests = require('./utils')
const _ = require('underscore')
const mongoose = require('mongoose').set('debug', true)
const uniqueValidator = require('mongoose-unique-validator')
const firebase = require('firebase-admin');
require('dotenv').config({ path: __dirname + '../.env' })

// setting up firebase with service account
let serviceAccount = require("../serviceAccount.json");
if (!serviceAccount) {
    console.log('YOUR FIREBASE SERVICE ACCOUNT IS NOT IN THE .ENV')
}
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://guelph-notifyme.firebaseio.com"
})

// User model config
const UserSchema = new mongoose.Schema({
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    resetPasswordToken: { type: String },
    resetPasswordExpiration: { type: String },
    data: { type: mongoose.Schema.Types.Mixed }
});

UserSchema.plugin(uniqueValidator);

User = mongoose.model("User", UserSchema);

const dbConnection = process.env.MONGO_URI ? process.env.MONGO_URI : 'mongodb://localhost:27017/auth';
console.log(dbConnection)
// Mongo config
mongoose.connect(dbConnection, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true }).then(() => {
    console.log("Succesfully connected to MongoDB.")
    User.find({}).then((users) => {
        users.forEach(callRequests)
    })
}).catch((err) => console.error(err));



function callRequests(user) {

    let fcm_tokens = user.data.fcm_tokens
    let query = user.data.criteria

    doGetRequests(query, (courses) => {
        let openCourses = _.filter(courses, (elem) => {
            return elem.space_available > 0
        });
        let message = "CHECK THIS COURSE NOW: " + JSON.stringify(_.pluck(openCourses, 'title'));
        console.log(message)
        if (openCourses.length > 0) {
            clearInterval(this);
            contact(message, fcm_tokens)
        }
    })
}

function contact(message, fcm_tokens) {
    let notif = {
        notification: {
            title: 'NotifyMe Courses Available',
            body: message
        },
        tokens: fcm_tokens
    }
    firebase.messaging().sendMulticast(notif).then((response) => {
        // Response is a message ID string.
        console.log('Successfully sent message:', response);
    }).catch((error) => {
        console.log('Error sending message:', error);
    })
}


// example query:
// let query = {
//     semester: "F19",
//     courses: [
//         {
//             department: "ENGG"
//         }
//     ]
// }
