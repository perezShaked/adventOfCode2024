import { Router } from 'express';
import { getday1P1Result, getday1P2Result } from './get';

export const day1Router = Router();

day1Router.get('/p1', getday1P1Result);
day1Router.get('/p2', getday1P2Result);