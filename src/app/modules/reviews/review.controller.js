"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const review_services_1 = require("./review.services");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const products_model_1 = require("../products/products.model");
const user_model_1 = require("../user/user.model");
const createReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newReview = Object.assign(Object.assign({}, req.body), { isDeleted: false });
    const { productId, userId } = req.body;
    const product = yield products_model_1.Product.findById(productId);
    if (!product) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'product not found for post review');
    }
    const userInfo = yield user_model_1.User.findById(userId);
    if (!userInfo) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'you are not valid user for post review');
    }
    const result = yield review_services_1.reviewServices.createReviewInDB(newReview);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'Review created successfully',
        data: result,
    });
}));
const getAllReviews = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_services_1.reviewServices.getAllReviewsFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Reviews retrieved successfully',
        data: result,
    });
}));
const getReviewsByProductId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const result = yield review_services_1.reviewServices.getReviewsByProductIdFromDB(productId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Reviews retrieved successfully',
        data: result,
    });
}));
const getSingleReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield review_services_1.reviewServices.getSingleReviewFromDB(id);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Review not found');
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Review retrieved successfully',
        data: result,
    });
}));
const updateReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { updateData } = req.body;
    const result = yield review_services_1.reviewServices.updateReviewInDB(id, updateData);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Review not found');
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Review updated successfully',
        data: result,
    });
}));
const deleteReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield review_services_1.reviewServices.deleteReviewInDB(id);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Review not found');
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Review deleted successfully',
        data: result,
    });
}));
exports.reviewController = {
    createReview,
    getAllReviews,
    getReviewsByProductId,
    getSingleReview,
    updateReview,
    deleteReview,
};
