import express, {Router} from 'express';

import MusicController from "./MusicController";
import isAuthenticated from '../AuthUtils';

const MusicRouter: Router = express.Router();

MusicRouter.get("/about", MusicController.about);

export default MusicRouter