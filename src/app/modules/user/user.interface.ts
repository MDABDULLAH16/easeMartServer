import { USER_ROLE } from './user.constant';

export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: number;
  role: 'admin' | 'user';
  address?: string;
};

export type TUserRole = keyof typeof USER_ROLE;
