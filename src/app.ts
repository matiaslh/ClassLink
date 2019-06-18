import express from 'express';
import * as bodyParser from 'body-parser';
import * as utils from './utils'
const _ = require('underscore')
require('dotenv').config()

const app = express();

// configs
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/notify', (req, res, next) => {
    let body = req.body;
    let cellNumber = body.cellNumber;
    let seconds = 10;

    if (!body.password || utils.sha256(body.password) !== process.env.PASSWORD_HASH) {
        res.json({ status: 'error', message: 'Wrong password' })
        return;
    }

    res.json({ status: 'success' })

    setInterval(function (this: any) {
        utils.doGetRequests(body.query, (courses: any) => {
            let openCourses = _.filter(courses, (elem: any) => {
                return elem.space_available > 0
            });
            console.log(openCourses)
            if (openCourses.length > 0) {
                clearInterval(this);
                utils.contact(cellNumber, courses)
            }
        });
    }, seconds * 1000);
})

app.post('/courses', (req, res, next) => {
    let body = req.body;
    console.log(body.query)
    utils.doGetRequests(body.query, (courses: any) => {
        res.json(courses);
    });
});

// run server

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('Listening on port ' + port);
});
