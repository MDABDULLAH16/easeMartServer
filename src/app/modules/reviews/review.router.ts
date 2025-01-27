import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createReviewSchema, updateReviewSchema } from './review.validation';
import { reviewController } from './review.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(createReviewSchema),
  reviewController.createReview
);

router.get('/', reviewController.getAllReviews);
router.get('/:productId', reviewController.getReviewsByProductId);

router.get('/:id', reviewController.getSingleReview);

router.patch(
  '/:id',
  validateRequest(updateReviewSchema),
  reviewController.updateReview
);

router.delete('/:id', reviewController.deleteReview);

export const ReviewRouter = router;
