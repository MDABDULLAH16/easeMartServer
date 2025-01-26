import { Types } from 'mongoose';

export type TOrder = {
  userId: Types.ObjectId;
  productId: Types.ObjectId;
  productName: string;
  userName: string;
  userAddress: string;
  quantity: number;
  email: string;
  price: number;
  isDeleted: boolean;
};
