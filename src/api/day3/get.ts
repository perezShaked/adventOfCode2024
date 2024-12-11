import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import fs from 'node:fs';

const getData = () => {
  return fs.readFileSync('./src/data/day3data.txt', 'utf8');
};

const omitDontStatments = (data: string) => {
  const regex = /(don't\(\).*?(do\(\)))|(don't\(\).*?$)/gs;
  const clearData = data.replace(regex, ' ');
  return clearData;
};

const organizeData = (data: string) => {
  const regex = /(?<=mul\()\d+,\d+(?=\))/g;
  const clearData = data.match(regex) || [];
  return clearData.map((element) => element.split(','));
};

const calculate = (values: string[][]) => {
  return values.reduce((total, element) => {
    return (total += Number(element[0]) * Number(element[1]));
  }, 0);
};

export const getday3P1Result = (_req: Request, res: Response) => {
  res.status(StatusCodes.OK).json(calculate(organizeData(getData())));
};

export const getday3P2Result = (_req: Request, res: Response) => {
  res
    .status(StatusCodes.OK)
    .json(calculate(organizeData(omitDontStatments(getData()))));
};
