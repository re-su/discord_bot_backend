import express, {Router} from 'express';
import passport from "passport";

const AuthRouter: Router = express.Router();

// Define auth routes using passport and redirect user based on success or failure
AuthRouter.get('/discord', passport.authenticate('discord'));

AuthRouter.get('/discord/callback', passport.authenticate('discord', {
    failureRedirect: '/'
}), function (req, res) {
    res.redirect('http://localhost:3001/servers') // Successful auth
});

export default AuthRouter