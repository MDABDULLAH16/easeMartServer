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
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewServices = void 0;
const review_model_1 = require("./review.model");
const createReviewInDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.Review.create(payload);
    return result;
});
const getAllReviewsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.Review.find({ isDeleted: false });
    return result;
});
const getReviewsByProductIdFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.Review.find({ productId });
    return result;
});
const getSingleReviewFromDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.Review.findOne({ _id, isDeleted: false });
    return result;
});
const updateReviewInDB = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.Review.findByIdAndUpdate(_id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteReviewInDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.Review.findByIdAndUpdate(_id, { isDeleted: true }, { new: true, runValidators: true });
    return result;
});
exports.reviewServices = {
    createReviewInDB,
    getAllReviewsFromDB,
    getReviewsByProductIdFromDB,
    getSingleReviewFromDB,
    updateReviewInDB,
    deleteReviewInDB,
};
