import {Router} from 'express'
import { day1Router } from './day1';
import { day2Router } from './day2';

export const apiRouter = Router();

apiRouter.use('/day1', day1Router);
apiRouter.use('/day2', day2Router);