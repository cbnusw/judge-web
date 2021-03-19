import { UserInfo } from './user-info';
import { PERMISSIONS, ROLES } from '../constants';

export declare type TRole = typeof ROLES[number];
export declare type TPermission = typeof PERMISSIONS[number];

export interface User {
  _id?: string;
  no?: string;
  password?: string;
  roles: Array<TRole>;
  permissions: Array<TPermission>;
  info?: UserInfo;
}
