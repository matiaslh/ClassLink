import express from 'express';
import * as bodyParser from 'body-parser';
import * as utils from './utils'

const cookieParser = require('cookie-parser')

const app = express();

// configs
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/test', (req, res, next) => {
    res.json({
        status: 'success'
    });
});

app.post('/courses', (req, res, next) => {
    let body = req.body;
    let courses = utils.doGetRequests(body.query);
    res.json(courses);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('Listening on port ' + port);
});
