import { Router } from 'express';
import { getday2P1Result, getday2P2Result } from './get';

export const day2Router = Router();

day2Router.get('/p1', getday2P1Result);
day2Router.get('/p2', getday2P2Result);