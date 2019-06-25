import { Strategy } from 'passport-local';
import { User } from '../models/User';
import { userModel } from '../models/Interfaces'
import bcrypt from 'bcrypt';
import { Request, Response } from 'express'; 
import { NextFunction } from 'connect';
import { Strategy as jwtStrategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';
import { sendResponse } from './APIUtils';

export function configurePassport(passport: any) {
    passport.use(
        new Strategy({ usernameField: 'email' }, (email: string, password: string, done: any) => {
            User.findOne({ email })
            .then((user) => {
                if (!user) return done(null, false, { message: 'Cannot find user.'});
                bcrypt.compare(password, user.password, (err: Error, isMatch: boolean) => {
                    if (err) console.error(err);
                    if (isMatch) return done(null, user);
                    else done(null, false, {message: 'Passwords do not match!'});
                });
            })
            .catch((err) => console.error(err));
        })
    );

    passport.use(
        new jwtStrategy({
            jwtFromRequest: ExtractJwt.fromHeader('authorization'),
            secretOrKey: process.env.JWT_SECRET
        }, (payload, done) => {
            User.findById(payload.sub)
            .then((user) => {
                done(null, user); 
            })  
            .catch((err) => {
                console.error(err);
                done(err, false);
            });
        })
    );
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('jwt', {session: false}, (err: Error, user: userModel, info: any) => {
        if (user && (!err || !info)) {
            req.user = user;
            return next();
        }
        sendResponse(info, 401, res);
    })(req, res, next);
}   