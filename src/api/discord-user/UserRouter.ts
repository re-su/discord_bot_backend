import express, {Response, Router} from 'express';

import UserController from '../discord-user/UserController';
import isAuthenticated from '../AuthUtils';

const UserRouter: Router = express.Router();

// Define servers route that returns all servers the user is a part of
UserRouter.get('/servers', isAuthenticated, UserController.getUserServers);

// Define logout route that logs out the user and redirects them to the home page
UserRouter.get('/logout', UserController.logout);

export default UserRouter