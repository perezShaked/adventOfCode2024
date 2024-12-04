import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import fs from 'node:fs'

const getData = () => {
  return fs.readFileSync('./src/data/day1data.txt', 'utf8');
}

let cachedData: { leftList: number[], rightList: number[] } | null = null;

const organizeData = () => {
  if(cachedData) return cachedData;

  const data = getData().split('\r\n');

  const leftList: number[] = [];
  const rightList: number[] = [];
  
  data.forEach(element => {
    leftList.push(Number(element.split('   ')[0]));
    rightList.push(Number(element.split('   ')[1]));
  });

  cachedData = {
    leftList: leftList.sort(),
    rightList: rightList.sort()};

  return cachedData;
}

const calculateDistance = (leftList: number[], rightList: number[]) => {
  return leftList.reduce((total, element, index) => {  
    return total += Math.abs(element-rightList[index])
},0)
}

const calculateSimilarity = (leftList: number[], rightList: number[]) => {
  return leftList.reduce((total, element) => {
    return total +=  (rightList.filter(element2 => {
      return element2 === element
    })).length * element;
  },0)
}

export const getday1P1Result = (_req: Request, res: Response) => {
    res.status(StatusCodes.OK).json(calculateDistance(organizeData().leftList, organizeData().rightList));
};

export const getday1P2Result = (_req: Request, res: Response) => {
  res.status(StatusCodes.OK).json(calculateSimilarity(organizeData().leftList, organizeData().rightList));
};