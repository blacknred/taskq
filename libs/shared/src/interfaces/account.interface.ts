import { NotificationMethod, SecuredNotificationMethod } from '../enums';
import type { IBase } from './base.interface';
// import { Merge } from 'type-fest';

// export interface ApiAllUsers {
//   allUsers: Merge<User, { postCount: number }>[];
// }

export interface IAccount extends IBase {
  username: string;
  name: string;
  image?: string;
  details?: string;
  email: string;
  phone?: string;
  isAdmin: boolean;
  locale: string;
  currency: string;
  isTfaEnabled: boolean;
  tfaSecret?: string;
  tfaReserveCode?: string;
  notificationMethod: NotificationMethod;
  securedNotificationMethod: SecuredNotificationMethod;
}

export type IHydratedAccount = IAccount;

export interface IProfile
  extends Pick<IAccount, 'username' | 'name' | 'image' | 'details'> {
  userId: IAccount['id'];
}
