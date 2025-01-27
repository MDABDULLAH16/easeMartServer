import { IReview } from './review.interface';
import { Review } from './review.model';

const createReviewInDB = async (payload: IReview) => {
  const result = await Review.create(payload);
  return result;
};

const getAllReviewsFromDB = async () => {
  const result = await Review.find({ isDeleted: false });
  return result;
};
const getReviewsByProductIdFromDB = async (productId: string) => {
  const result = await Review.find({ productId });
  return result;
};

const getSingleReviewFromDB = async (_id: string) => {
  const result = await Review.findOne({ _id, isDeleted: false });
  return result;
};

const updateReviewInDB = async (_id: string, payload: Partial<IReview>) => {
  const result = await Review.findByIdAndUpdate(_id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteReviewInDB = async (_id: string) => {
  const result = await Review.findByIdAndUpdate(
    _id,
    { isDeleted: true },
    { new: true, runValidators: true }
  );
  return result;
};

export const reviewServices = {
  createReviewInDB,
  getAllReviewsFromDB,
  getReviewsByProductIdFromDB,
  getSingleReviewFromDB,
  updateReviewInDB,
  deleteReviewInDB,
};
