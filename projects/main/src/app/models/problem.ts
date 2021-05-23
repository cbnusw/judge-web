import { IUserInfo } from './user-info';

export interface IProblemContent {
  content: string;
  type: ['html', 'pdf'];
}

export interface IInputOutput {
  inFile: string;
  outFile: string;
}

export interface IProblem {
  _id?: string;
  title?: string;
  content?: IProblemContent;
  contest?: string;
  ioSet?: Array<IInputOutput>;
  writer?: IUserInfo;
}
