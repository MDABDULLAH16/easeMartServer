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
exports.orderServices = void 0;
// order.services.ts
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const products_model_1 = require("../products/products.model");
const order_model_1 = require("./order.model");
const createOrderInDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if user exists
    const userIdExists = yield user_model_1.User.findById(payload.userId);
    if (!userIdExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const productIdExists = yield products_model_1.Product.findById(payload.productId);
    if (!productIdExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Product not found');
    }
    const result = (yield (yield order_model_1.Order.create(payload)).populate('userId')).populate('productId');
    return result;
});
const getAllOrdersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.find({ isDeleted: false });
    return result;
});
const getSingleOrderFromDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.findOne({ _id, isDeleted: false });
    return result;
});
const updateOrderInDB = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.findByIdAndUpdate(_id, payload, {
        new: true,
        runValidators: true,
    })
        .populate('userId')
        .populate('productId');
    return result;
});
const deleteOrderInDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.findByIdAndUpdate(_id, { isDeleted: true }, {
        new: true,
        runValidators: true,
    });
    return result;
});
exports.orderServices = {
    createOrderInDB,
    getAllOrdersFromDB,
    getSingleOrderFromDB,
    updateOrderInDB,
    deleteOrderInDB,
};
