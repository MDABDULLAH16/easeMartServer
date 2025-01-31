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
exports.productServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const category_model_1 = require("../categories/category.model");
const products_model_1 = require("./products.model");
const createProductInDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(payload);
    const isExistingCategory = yield category_model_1.Category.findById(payload.category);
    if (!isExistingCategory) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Category Not Found');
    }
    const result = (yield products_model_1.Product.create(payload)).populate('category');
    return result;
});
// const getAllProductsFromDB = async () => {
//   const result = await Product.find();
//   return result;
// };
// Get all products or search by name
const getAllProductsFromDB = (name) => __awaiter(void 0, void 0, void 0, function* () {
    if (name) {
        // Search by name (case-insensitive)
        return yield products_model_1.Product.find({ name: { $regex: name, $options: 'i' } });
    }
    // Return all products if no name is provided
    return yield products_model_1.Product.find({ isDeleted: false });
});
const getSingleProductFromDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.Product.findOne({ _id });
    return result;
});
const updateProductInDB = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.Product.findByIdAndUpdate(_id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteProductInDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.Product.findByIdAndUpdate(_id, { isDeleted: true }, {
        new: true,
        runValidators: true,
    });
    return result;
});
exports.productServices = {
    createProductInDB,
    getAllProductsFromDB,
    getSingleProductFromDB,
    updateProductInDB,
    deleteProductInDB,
};
