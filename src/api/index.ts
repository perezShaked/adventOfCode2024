import { Router } from 'express';
import { day1Router } from './day1';
import { day2Router } from './day2';
import { day3Router } from './day3';
import { day4Router } from './day4';

export const apiRouter = Router();

apiRouter.use('/day1', day1Router);
apiRouter.use('/day2', day2Router);
apiRouter.use('/day3', day3Router);
apiRouter.use('/day4', day4Router);
