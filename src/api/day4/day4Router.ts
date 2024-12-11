import { Router } from 'express';
import { getday4P1Result, getday4P2Result } from './get';

export const day4Router = Router();

day4Router.get('/p1', getday4P1Result);
day4Router.get('/p2', getday4P2Result);
