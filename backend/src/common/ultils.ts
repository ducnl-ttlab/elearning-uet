import * as moment from 'moment';
import { User } from 'src/modules/user/entity/user.entity';
import { EXPIRED_TOKEN_SECONDS } from './constant';
import { FilteredUser } from './interfaces';
import * as _ from 'lodash';
export const filterUser = (user: User): FilteredUser => {
  delete user.password;
  delete user.resetToken;
  delete user.expiredTokenTime;
  return user;
};

export const hasResetTokenExpired = (
  resetTokenTime: Date,
  expiredTime?: number,
) => {
  let seconds = moment().unix() - moment(resetTokenTime).unix();
  let timeExpiration = expiredTime || EXPIRED_TOKEN_SECONDS;
  return timeExpiration < seconds;
};

export const generateDigits = (numberRandom: number = 6) => {
  let baseNumber = Math.pow(10, numberRandom);
  let MaxBaseNumber = Math.pow(10, numberRandom - 1);
  return Math.floor(baseNumber + Math.random() * 9 * MaxBaseNumber);
};

export const removeExtention = (fileName: string) => {
  return fileName.split('.').slice(0, -1).join('.');
};

export const stringToMysqlTimeStamp = (yyyymmdd: string) => {
  return moment(yyyymmdd).add(1, 'day').format() as unknown as Date;
};

export const coursePeriod = (startTime: string, endTime: string) => {
  return {
    startCourseTime: stringToMysqlTimeStamp(startTime),
    endCourseTime: stringToMysqlTimeStamp(endTime),
  };
};

export const mysqlTime = (time: Date) => {
  return moment(time).utc().format('YYYY-MM-DD') as unknown as Date;
};
export const mysqlToTime = (startTime: Date, endTime: Date) => {
  return {
    startCourseTime: mysqlTime(startTime),
    endCourseTime: mysqlTime(endTime),
  };
};

export const mysqlTimeStamp = (time: Date) => {
  return moment(time).utc().format('YYYY-MM-DD hh-mm-ss') as unknown as Date;
};

export function getPaginatedItems(items: any, page?: number, pageSize?: number) {
  let pg = page || 1,
    pgSize = pageSize || 100,
    offset = (pg - 1) * pgSize,
    pagedItems = _.drop(items, offset).slice(0, pgSize),
    showPageSize = items.length < pgSize ? items.length : pgSize

  return {
    items: pagedItems,
    page: pg,
    pageSize: showPageSize,
    total_pages: Math.ceil(items.length / pgSize),
  };
}


