import {Router} from 'express'
import { day1Router } from './day1';

export const apiRouter = Router();

apiRouter.use('/day1', day1Router);