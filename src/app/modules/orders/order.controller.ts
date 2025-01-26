// order.controller.ts
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { orderServices } from './order.services';
import { Product } from '../products/products.model';
import AppError from '../../errors/AppError';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const { productId, quantity } = req.body;

  // Find the product and check stock
  const product = await Product.findById(productId);
  if (!product) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Product not found To create Order'
    );
  }

  if (product.stockQuantity < quantity) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Insufficient stock! Only ${product.stockQuantity} items are available.`
    );
  }

  // Deduct the quantity from stock
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    { $inc: { stockQuantity: -quantity } }, // Decrement stock
    { new: true, runValidators: true }
  );

  //   console.log('Updated product stock:', updatedProduct?.stockQuantity);

  // Prepare the order data
  const orderData = { ...req.body, isDeleted: false };
  const result = await orderServices.createOrderInDB(orderData);

  //   console.log('Order created:', result);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Order created successfully',
    data: result,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await orderServices.getAllOrdersFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders retrieved successfully',
    data: result,
  });
});

const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await orderServices.getSingleOrderFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order retrieved successfully',
    data: result,
  });
});

const updateOrder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await orderServices.updateOrderInDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order updated successfully',
    data: result,
  });
});

const deleteOrder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await orderServices.deleteOrderInDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order deleted successfully',
    data: result,
  });
});

export const orderController = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
  deleteOrder,
};
