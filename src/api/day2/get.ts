import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import fs from 'node:fs';

const getData = () => {
  return fs.readFileSync('./src/data/day2data.txt', 'utf8');
};

const organizeData = () => {
  const data = getData().split('\r\n');
  return data;
};

const countSafe = (data: string[]) => {
  return data.reduce((total, element) => {
    const cleanElement = element.split(' ').map((i) => Number(i));
    return (total =
      isUpSafe(cleanElement) || isDownSafe(cleanElement)
        ? (total += 1)
        : total);
  }, 0);
};

const countSafeWithOneRemove = (data: string[]) => {
  return data.reduce((total, element) => {
    const cleanElement = element.split(' ').map((i) => Number(i));
    if (isUpSafe(cleanElement) || isDownSafe(cleanElement)) {
      total += 1;
    } else {
      removeOneLevel(cleanElement).some((e) => isUpSafe(e) || isDownSafe(e))
        ? (total += 1)
        : total;
    }
    return total;
  }, 0);
};

const removeOneLevel = (report: number[]) => {
  const reportsWithoutOneLevel: number[][] = [];
  report.forEach((_e, i) => {
    reportsWithoutOneLevel.push(report.filter((element, index) => index !== i));
  });
  return reportsWithoutOneLevel;
};

const isUpSafe = (report: number[]) => {
  return report.every(
    (element, index) =>
      index === 0 ||
      (element > report[index - 1] && element - report[index - 1] < 4)
  );
};

const isDownSafe = (report: number[]) => {
  return report.every(
    (element, index) =>
      index === 0 ||
      (element < report[index - 1] && report[index - 1] - element < 4)
  );
};

export const getday2P1Result = (_req: Request, res: Response) => {
  res.status(StatusCodes.OK).json(countSafe(organizeData()));
};

export const getday2P2Result = (_req: Request, res: Response) => {
  res.status(StatusCodes.OK).json(countSafeWithOneRemove(organizeData()));
};
