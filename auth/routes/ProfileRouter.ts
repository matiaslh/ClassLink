import { Router, Request, Response } from 'express';
import { User, saveUser } from '../models/User';
import passport from 'passport';
import { NextFunction } from 'connect';
import { ensureAuthenticated } from '../config/passport';
import { userModel } from '../models/Interfaces';
import { sendResponse } from '../config/APIUtils';
import jwt from 'jsonwebtoken';

const getToken = (user: userModel) => {
  const secret: any = process.env.JWT_SECRET;
  return jwt.sign({
    iss: 'auth-server',
    sub: user.id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1)
  }, secret);
}

const router: Router = Router();

router.post('/login', (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', {session: false}, (err, user) => {
    if (err || !user) {
      console.error(err);
      return res.redirect('/redirect/loginFailure');
    }
    const token = getToken(user);
    const info = {
        description: "Successfully logged in.",
        token: token,
    };
    sendResponse(info, 200, res);
  })(req, res, next);
});

router.post('/register', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) res.redirect('/redirect/missingFieldError');
  let newUser = new User({ email, password });
  saveUser(newUser, (err: Error) => {
    if (err) { 
      sendResponse(err, 500, res);
    } else {
      sendResponse("Successfully created new user.", 200, res);
    }
  });
});

router.get('/user', ensureAuthenticated, (req: Request, res: Response) => {
  let user: any =  new Object(JSON.parse(JSON.stringify(req.user)));
  delete user.password;
  sendResponse(user, 200, res);
});

router.put('/user', ensureAuthenticated, (req: Request, res: Response) => {
  const { data, email } = req.body;
  if (!data && !email) return res.redirect('/redirect/missingFieldError');
  req.user.data = data ? data : req.user.data;
  req.user.email = email ? email : req.user.email;
  req.user.save()
    .then((user: userModel) => {
      sendResponse('Successfully updated user.', 200, res);
    })
    .catch((err: Error) => {
      sendResponse(err, 500, res);
    });
});

router.delete('/user', ensureAuthenticated, (req: Request, res: Response) => {
  User.findByIdAndDelete({ _id: req.user.id })
    .then((user: userModel) => {
      sendResponse('Successfully deleted user.', 200, res);
    })
    .catch((err: Error) => {
      sendResponse(err, 500, res);
    });
})

export const profileRouter: Router = router
