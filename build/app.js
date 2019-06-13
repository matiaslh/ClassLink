"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var bodyParser = __importStar(require("body-parser"));
var utils = __importStar(require("./utils"));
var cookieParser = require('cookie-parser');
var app = express_1.default();
// configs
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/test', function (req, res, next) {
    res.json({
        status: 'success'
    });
});
app.post('/courses', function (req, res, next) {
    var body = req.body;
    var courses = utils.doGetRequests(body.query);
    res.json(courses);
});
var port = process.env.PORT || 8080;
app.listen(port, function () {
    console.log('Listening on port ' + port);
});
