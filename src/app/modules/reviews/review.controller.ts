import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { reviewServices } from './review.services';
import AppError from '../../errors/AppError';
import { Product } from '../products/products.model';

const createReview = catchAsync(async (req: Request, res: Response) => {
  const newReview = { ...req.body, isDeleted: false };
  const { productId } = req.body;
  const product = await Product.findById(productId);
  if (!product) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'product not found for post review'
    );
  }
  // const userInfo = await User.findById(userId);
  // if (!userInfo) {
  //   throw new AppError(
  //     httpStatus.NOT_FOUND,
  //     'you are not valid user for post review'
  //   );
  // }
  const result = await reviewServices.createReviewInDB(newReview);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Review created successfully',
    data: result,
  });
});

const getAllReviews = catchAsync(async (req: Request, res: Response) => {
  const result = await reviewServices.getAllReviewsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reviews retrieved successfully',
    data: result,
  });
});
const getReviewsByProductId = catchAsync(
  async (req: Request, res: Response) => {
    const { productId } = req.params;
    const result = await reviewServices.getReviewsByProductIdFromDB(productId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Reviews retrieved successfully',
      data: result,
    });
  }
);

const getSingleReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await reviewServices.getSingleReviewFromDB(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Review not found');
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review retrieved successfully',
    data: result,
  });
});

const updateReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { updateData } = req.body;
  const result = await reviewServices.updateReviewInDB(id, updateData);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Review not found');
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review updated successfully',
    data: result,
  });
});

const deleteReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await reviewServices.deleteReviewInDB(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Review not found');
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review deleted successfully',
    data: result,
  });
});

export const reviewController = {
  createReview,
  getAllReviews,
  getReviewsByProductId,
  getSingleReview,
  updateReview,
  deleteReview,
};
