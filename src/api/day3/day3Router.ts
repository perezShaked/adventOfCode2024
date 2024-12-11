import { Router } from 'express';
import { getday3P1Result, getday3P2Result } from './get';

export const day3Router = Router();

day3Router.get('/p1', getday3P1Result);
day3Router.get('/p2', getday3P2Result);
