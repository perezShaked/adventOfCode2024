import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import fs from 'node:fs';

const getData = () => {
  return fs.readFileSync('./src/data/day4data.txt', 'utf8');
};

const organizeData = (data: string) => {
  const rows = data.split('\r\n');
  const clearData = rows.map((element) => element.split(''));
  return clearData;
};

const checkRight = (row: number, index: number, data: string[][]) => {
  if (data[row].length - index < 4) return false;
  if (data[row][index + 1] === 'M' && data[row][index + 2] === 'A' && data[row][index + 3] === 'S')
    return true;
  return false;
};

const checkLeft = (row: number, index: number, data: string[][]) => {
  if (index < 3) return false;
  if (data[row][index - 1] === 'M' && data[row][index - 2] === 'A' && data[row][index - 3] === 'S')
    return true;
  return false;
};

const checkDown = (row: number, index: number, data: string[][]) => {
  if (data.length - row < 4) return false;
  if (data[row + 1][index] === 'M' && data[row + 2][index] === 'A' && data[row + 3][index] === 'S')
    return true;
  return false;
};

const checkUp = (row: number, index: number, data: string[][]) => {
  if (row < 3) return false;
  if (data[row - 1][index] === 'M' && data[row - 2][index] === 'A' && data[row - 3][index] === 'S')
    return true;
  return false;
};

const checkUpRight = (row: number, index: number, data: string[][]) => {
  if (row < 3 || data[row].length - index < 4) return false;
  if (
    data[row - 1][index + 1] === 'M' &&
    data[row - 2][index + 2] === 'A' &&
    data[row - 3][index + 3] === 'S'
  )
    return true;
  return false;
};

const checkUpLeft = (row: number, index: number, data: string[][]) => {
  if (row < 3 || index < 3) return false;
  if (
    data[row - 1][index - 1] === 'M' &&
    data[row - 2][index - 2] === 'A' &&
    data[row - 3][index - 3] === 'S'
  )
    return true;
  return false;
};

const checkDownRight = (row: number, index: number, data: string[][]) => {
  if (data.length - row < 4 || data[row].length - index < 4) return false;
  if (
    data[row + 1][index + 1] === 'M' &&
    data[row + 2][index + 2] === 'A' &&
    data[row + 3][index + 3] === 'S'
  )
    return true;
  return false;
};

const checkDownLeft = (row: number, index: number, data: string[][]) => {
  if (data.length - row < 4 || index < 3) return false;
  if (
    data[row + 1][index - 1] === 'M' &&
    data[row + 2][index - 2] === 'A' &&
    data[row + 3][index - 3] === 'S'
  )
    return true;
  return false;
};

const checkCrossMAS = (row: number, index: number, data: string[][]) => {
  if (index < 1 || data[row].length - index < 2 || data.length - row < 2 || row < 1) return false;
  const up = row + 1;
  const down = row - 1;
  const right = index + 1;
  const left = index - 1;

  if (data[up][left] === 'M') {
    if (data[down][left] === 'M' && data[up][right] === 'S' && data[down][right] === 'S')
      return true;
    if (data[up][right] === 'M' && data[down][left] === 'S' && data[down][right] === 'S')
      return true;
  }

  if (data[down][right] === 'M') {
    if (data[down][left] === 'M' && data[up][right] === 'S' && data[up][left] === 'S') return true;
    if (data[up][right] === 'M' && data[down][left] === 'S' && data[up][left] === 'S') return true;
  }
  return false;
};

const countCrossMAS = (data: string[][]) => {
  return data.reduce((total, element, row) => {
    return (total += element.reduce((rowTotal, letter, index) => {
      if (letter === 'A') {
        return (rowTotal += Number(checkCrossMAS(row, index, data)));
      }
      return rowTotal;
    }, 0));
  }, 0);
};

const countXMAS = (data: string[][]) => {
  return data.reduce((total, element, row) => {
    return (total += element.reduce((rowTotal, letter, index) => {
      if (letter === 'X') {
        return (rowTotal +=
          Number(checkDown(row, index, data)) +
          Number(checkDownLeft(row, index, data)) +
          Number(checkDownRight(row, index, data)) +
          Number(checkUp(row, index, data)) +
          Number(checkUpLeft(row, index, data)) +
          Number(checkUpRight(row, index, data)) +
          Number(checkLeft(row, index, data)) +
          Number(checkRight(row, index, data)));
      }
      return rowTotal;
    }, 0));
  }, 0);
};

export const getday4P1Result = (_req: Request, res: Response) => {
  res.status(StatusCodes.OK).json(countXMAS(organizeData(getData())));
};

export const getday4P2Result = (_req: Request, res: Response) => {
  res.status(StatusCodes.OK).json(countCrossMAS(organizeData(getData())));
};
