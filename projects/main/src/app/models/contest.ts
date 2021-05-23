import { IUserInfo } from './user-info';

export interface IPeriod {
  start: Date;
  end: Date;
}


export interface IContest{
  _id?: string;
  title?: string;
  content?: string;
  writer?: IUserInfo;
  problems?: Array<string>;
  applyingPeriod?: IPeriod;
  testPeriod: IPeriod;
  contestants?: Array<IUserInfo>;
  createdAt?: Date;
  updatedAt?: Date;
}
