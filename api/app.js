const doGetRequests = require('./utils')
const _ = require('underscore')
const mongoose = require('mongoose').set('debug', true)
const uniqueValidator = require('mongoose-unique-validator')
const firebase = require('firebase-admin');

// setting up firebase with service account
let serviceAccount = require("./serviceAccount.json");
if (!serviceAccount) {
    console.log('YOUR FIREBASE SERVICE ACCOUNT IS NOT THERE')
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

const dbConnection = 'mongodb://68.183.197.232:27017/auth'
console.log(dbConnection)
// Mongo config
mongoose.connect(dbConnection, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true }).then(() => {
    console.log("Successfully connected to MongoDB.")
    let seconds = 10
    setInterval(() => {
        User.find({}).then((users) => {
            users.forEach(callRequests)
        })
    }, seconds * 1000)

}).catch((err) => console.error(err));



function callRequests(user) {

    if (!user.data || !user.data.criteria || user.data.criteria.length <= 0 || !user.data.fcm_token || user.data.fcm_token.length <= 0) {
        return
    }

    let fcm_tokens = user.data.fcm_token
    let query = {
        courses: user.data.criteria,
        semester: 'F19'
    }

    doGetRequests(query, async (courses) => {
        let openCourses = _.filter(courses, (elem) => {
            return elem.space_available > 0
        })
        if (openCourses.length > 0) {
            let message = "CHECK THIS COURSE NOW: " + JSON.stringify(_.pluck(openCourses, 'title'));
            contact(message, fcm_tokens)

            //remove criteria from user
            user.data = {
                fcm_token:fcm_tokens,
                criteria: []
            }
            await user.save()
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
