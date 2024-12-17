import { Router } from 'express';
import { getday6P1Result, getday6P2Result } from './get';

export const day6Router = Router();
day6Router.get('/p1', getday6P1Result);
day6Router.get('/p2', getday6P2Result);
