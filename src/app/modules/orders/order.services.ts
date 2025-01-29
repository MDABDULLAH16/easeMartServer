// order.services.ts
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TOrder } from './order.interface';

import { Product } from '../products/products.model';
import { Order } from './order.model';

const createOrderInDB = async (payload: TOrder) => {
  // Check if user exists
  const userIdExists = await User.findById(payload.userId);
  if (!userIdExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  const productIdExists = await Product.findById(payload.productId);
  if (!productIdExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }
  const result = (
    await (await Order.create(payload)).populate('userId')
  ).populate('productId');
  return result;
};

const getAllOrdersFromDB = async () => {
  const result = await Order.find({ isDeleted: false });
  return result;
};

const getSingleOrderFromDB = async (_id: string) => {
  const result = await Order.findOne({ _id, isDeleted: false });
  return result;
};

const updateOrderInDB = async (_id: string, payload: Partial<TOrder>) => {
  const result = await Order.findByIdAndUpdate(_id, payload, {
    new: true,
    runValidators: true,
  })
    .populate('userId')
    .populate('productId');
  return result;
};

const deleteOrderInDB = async (_id: string) => {
  const result = await Order.findByIdAndUpdate(
    _id,
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    }
  );
  return result;
};

export const orderServices = {
  createOrderInDB,
  getAllOrdersFromDB,
  getSingleOrderFromDB,
  updateOrderInDB,
  deleteOrderInDB,
};
