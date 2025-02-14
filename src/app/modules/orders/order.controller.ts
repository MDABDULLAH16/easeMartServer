import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { oderServices } from './order.services';

const createOrderReq = catchAsync(async (req, res) => {
  const orderData = { ...req.body, isDeleted: false };
  const result = await oderServices.createOrder(orderData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Oder create Successfully',
    data: result,
  });
});

const getOrderByUserId = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await oderServices.getUserByUserId(userId);
  sendResponse(res, {
    data: result,
    message: 'Order retrieve by User',
    success: true,
    statusCode: httpStatus.OK,
  });
});

export const ordersController = {
  createOrderReq,
  getOrderByUserId,
};
