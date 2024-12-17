import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import fs from 'node:fs';

const getData = () => {
  return fs.readFileSync('./src/data/day6data.txt', 'utf8');
};

const organizeMap = (data: string) => {
  const rows = data.split('\r\n');
  return rows;
};

const mapAfterGuardWalk = (map: string[], counter: number) => {
  const guardPosition = getGuardPosition(map);
  if (isGuardAtTheEdge(map, guardPosition)) {
    return map;
  }
  updateNextStep(map, getGuardPosition(map));
  return mapAfterGuardWalk(map, counter + 1);
};

const isGuardAtTheEdge = (map: string[], gardPosition: [number, number]) => {
  const [row, col] = gardPosition;
  const gardDirection = map[row][col];
  if (
    (gardDirection === Directions.UP && gardPosition[0] === 0) ||
    (gardDirection === Directions.RIGHT && gardPosition[1] === map[0].length - 1) ||
    (gardDirection === Directions.LEFT && gardPosition[1] === 0) ||
    (gardDirection === Directions.DOWN && gardPosition[0] === map.length - 1)
  ) {
    return true;
  }
  return false;
};

const getGuardPosition = (map: string[]) => {
  const guardRegex = /\^|\>|\<|v/;
  let position: [number, number] = [0, 0];
  map.forEach((element, index) => {
    const match = element.match(guardRegex);
    if (match?.index) {
      position = [index, match.index];
    }
  });
  return position;
};

const updateNextStep = (map: string[], gardPosition: [number, number]) => {
  const [row, col] = gardPosition;
  const gardDirection = map[row][col];
  const [nextRow, nextCol] = nextStepPosition(map, gardPosition);
  if (map[nextRow][nextCol] === '.' || map[nextRow][nextCol] === 'X') {
    map[row] = map[row].replace(gardDirection, 'X');
    map[nextRow] =
      map[nextRow].substring(0, nextCol) + gardDirection + map[nextRow].substring(nextCol + 1);
  } else if (map[nextRow][nextCol] === '#') {
    map[row] = map[row].replace(gardDirection, rotateGuard(gardDirection));
  }
  return map;
};

enum Directions {
  UP = '^',
  RIGHT = '>',
  LEFT = '<',
  DOWN = 'v',
}

const rotateGuard = (gardDirection: string) => {
  if (gardDirection === Directions.UP) return '>';
  if (gardDirection === Directions.RIGHT) return 'v';
  if (gardDirection === Directions.LEFT) return '^';
  return '<';
};

const nextStepPosition = (map: string[], gardPosition: [number, number]) => {
  const [row, col] = gardPosition;
  const gardDirection = map[row][col];
  if (gardDirection === Directions.UP) return [row - 1, col];
  if (gardDirection === Directions.RIGHT) return [row, col + 1];
  if (gardDirection === Directions.LEFT) return [row, col - 1];
  if (gardDirection === Directions.DOWN) return [row + 1, col];
  return [-1, -1];
};

const countX = (map: string[]) => {
  return map.reduce((total, element) => {
    return total + (element.match(/X/g)?.length || 0);
  }, 1);
};

export const getday6P1Result = (_req: Request, res: Response) => {
  res.status(StatusCodes.OK).json(countX(mapAfterGuardWalk(organizeMap(getData()), 0)));
};

export const getday6P2Result = (_req: Request, res: Response) => {
  res.status(StatusCodes.OK).json();
};
