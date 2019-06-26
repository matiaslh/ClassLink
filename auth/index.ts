import express, { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import { profileRouter } from './routes/ProfileRouter';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import passport = require('passport');
import { configurePassport } from './config/passport';
import { passwordRouter } from './routes/Password';
import { redirectRouter } from './routes/Redirect';

const app = express();

app.use((req: Request, res: Response, next: any) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

// Set environment variables
dotenv.config();

if (!process.env.MONGO_URI) {
    console.log('YOU HAVE NO .ENV FILE WITH MONGO URI, YOU ARE AN IDIOT')
    console.log('YOU HAVE NO .ENV FILE WITH MONGO URI, YOU ARE AN IDIOT')
    console.log('YOU HAVE NO .ENV FILE WITH MONGO URI, YOU ARE AN IDIOT')
    console.log('YOU HAVE NO .ENV FILE WITH MONGO URI, YOU ARE AN IDIOT')
    console.log('YOU HAVE NO .ENV FILE WITH MONGO URI, YOU ARE AN IDIOT')
}

const dbConnection: any = process.env.MONGO_URI;

// Mongo config
mongoose.connect(dbConnection, { useNewUrlParser: true })
    .then(() => console.log("Succesfully connected to MongoDB."))
    .catch((err: mongoose.Error) => console.error(err));

// Fix mongo deprecation warnings
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// Passport config
configurePassport(passport);
app.use(passport.initialize());

// General config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/auth', profileRouter);
app.use('/auth/password', passwordRouter);
app.use('/redirect/', redirectRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('Listening on port ' + port);
});