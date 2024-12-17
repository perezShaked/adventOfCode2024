import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import fs from 'node:fs';

const getData = () => {
  return fs.readFileSync('./src/data/day5data.txt', 'utf8');
};

const organizeRoles = (data: string) => {
  const regexRoles = /\d+\|\d+/g;
  const roles = data.match(regexRoles) || [];
  return roles.map((element) => {
    return element.split('|');
  });
};

const organizePages = (data: string) => {
  const regexPages = /(\d+\,)+\d+/g;
  const pagesOrder = data.match(regexPages) || [];
  return pagesOrder.map((element) => element.split(','));
};

const checkPagesOrder = (roles: string[][], pagesOrder: string[]) => {
  if (
    roles.some((element) => {
      const [first, secund] = element;
      const indexOfFirst = pagesOrder.indexOf(first);
      const indexOfSecund = pagesOrder.indexOf(secund);
      if (indexOfFirst !== -1 && indexOfSecund !== -1) return indexOfFirst > indexOfSecund;
    })
  )
    return false;
  return true;
};

const getMiddleNumber = (pagesOrder: string[]) => {
  return Number(pagesOrder[(pagesOrder.length - 1) / 2]);
};

const count = (roles: string[][], pagesOrders: string[][]) => {
  return pagesOrders.reduce((total, element) => {
    if (checkPagesOrder(roles, element)) {
      return (total += getMiddleNumber(element));
    }
    return total;
  }, 0);
};

const countIncorrectOrder = (roles: string[][], pagesOrders: string[][]) => {
  return pagesOrders.reduce((total, element) => {
    if (!checkPagesOrder(roles, element)) {
      return (total += getMiddleNumber(repairIncorrectOrder(roles, element)));
    }
    return total;
  }, 0);
};

const repairIncorrectOrder = (roles: string[][], pagesOrder: string[]) => {
  roles.forEach((element) => {
    const [first, secund] = element;
    const indexOfFirst = pagesOrder.indexOf(first);
    const indexOfSecund = pagesOrder.indexOf(secund);
    if (indexOfFirst !== -1 && indexOfSecund !== -1) {
      if (indexOfFirst > indexOfSecund) {
        const temp = pagesOrder[indexOfFirst];
        pagesOrder[indexOfFirst] = pagesOrder[indexOfSecund];
        pagesOrder[indexOfSecund] = temp;
      }
    }
  });
  if (!checkPagesOrder(roles, pagesOrder)) repairIncorrectOrder(roles, pagesOrder);
  return pagesOrder;
};

export const getday5P1Result = (_req: Request, res: Response) => {
  res.status(StatusCodes.OK).json(count(organizeRoles(getData()), organizePages(getData())));
};

export const getday5P2Result = (_req: Request, res: Response) => {
  res
    .status(StatusCodes.OK)
    .json(countIncorrectOrder(organizeRoles(getData()), organizePages(getData())));
};
