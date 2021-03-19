import { TRole } from './user';

export interface UserInfo {
  _id?: string;
  image?: string;
  no?: string;
  name?: string;
  email?: string;
  phone?: string;
  // center?: string;
  department?: string;
  position?: string;
  roles?: Array<TRole>;
}
