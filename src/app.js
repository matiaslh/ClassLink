const express = require('express')
const bodyParser = require('body-parser')
const utils = require('./utils')
const _ = require('underscore')
require('dotenv').config()

const app = express();

// configs
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* SAMPLE REQUEST
POST: http://localhost:8080/notify
BODY:
{
	"cellNumber": "+14164567878",
	"query": {
		"semester": "F19",
		"courses": [
			{
                "department": "CIS",
				"course": "3760"
            },
            {
				"department": "CIS",
				"course": "3750"
			}
		]
	}
}
*/
app.post('/notify', (req, res, next) => {
    let body = req.body;
    let cellNumber = body.cellNumber;
    let seconds = 10;

    setInterval(function () {
        utils.doGetRequests(body.query, (courses) => {
            // console.log(courses)
            if (!res.headersSent) {
                if (courses.status === 'error') {
                    res.json(courses)
                } else {
                    res.json({ status: 'success' })
                }
            }
            let openCourses = _.filter(courses, (elem) => {
                return elem.space_available > 0
            });
            let message = "CHECK THIS COURSE NOW: " + JSON.stringify(_.pluck(openCourses, 'title'));
            console.log(message)
            if (openCourses.length > 0) {
                clearInterval(this);
                utils.contact(cellNumber, message)
            }
        });
    }, seconds * 1000);
})

app.post('/courses', (req, res, next) => {
    let body = req.body;
    console.log(body.query)
    utils.doGetRequests(body.query, (courses) => {
        res.json(courses);
    });
});

// run server

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('Listening on port ' + port);
});
