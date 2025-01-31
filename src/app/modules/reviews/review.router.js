"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const review_validation_1 = require("./review.validation");
const review_controller_1 = require("./review.controller");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(review_validation_1.createReviewSchema), review_controller_1.reviewController.createReview);
router.get('/', review_controller_1.reviewController.getAllReviews);
router.get('/:productId', review_controller_1.reviewController.getReviewsByProductId);
router.get('/:id', review_controller_1.reviewController.getSingleReview);
router.patch('/:id', (0, validateRequest_1.default)(review_validation_1.updateReviewSchema), review_controller_1.reviewController.updateReview);
router.delete('/:id', review_controller_1.reviewController.deleteReview);
exports.ReviewRouter = router;
