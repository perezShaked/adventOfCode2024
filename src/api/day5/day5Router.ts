import { Router } from 'express';
import { getday5P1Result, getday5P2Result } from './get';

export const day5Router = Router();

day5Router.get('/p1', getday5P1Result);
day5Router.get('/p2', getday5P2Result);
