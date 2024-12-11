import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import fs from 'node:fs';

const getData = () => {
  return fs.readFileSync('./src/data/day4data.txt', 'utf8');
};

const organizeData = (data: string) => {
  const regex = /[X|M|A|S]/g;
  const clearData = data.split('\r\n');
  return clearData; //.map((element) => element.split(','));
};

const calculate = (values: string[][]) => {
  return values.reduce((total, element) => {
    return (total += Number(element[0]) * Number(element[1]));
  }, 0);
};

export const getday4P1Result = (_req: Request, res: Response) => {
  res.status(StatusCodes.OK).json(organizeData(getData()));
};

export const getday4P2Result = (_req: Request, res: Response) => {
  res.status(StatusCodes.OK).json();
};
