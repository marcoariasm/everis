import { IAdminUser } from './admin-user.interface';

export interface IAdminFlow {
  signature?: string;
  user?: IAdminUser,
}
