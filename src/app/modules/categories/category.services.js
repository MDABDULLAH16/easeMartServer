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
exports.categoryServices = void 0;
const category_model_1 = require("./category.model");
const createCategoryInDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.Category.create(payload);
    return result;
});
const getAllCategoriesFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.Category.find({ isDeleted: false });
    return result;
});
const getSingleCategoryFromDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.Category.findOne({ _id, isDeleted: false });
    return result;
});
const updateCategoryInDB = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.Category.findByIdAndUpdate(_id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteCategoryInDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.Category.findByIdAndUpdate(_id, { isDeleted: true }, {
        new: true,
        runValidators: true,
    });
    return result;
});
exports.categoryServices = {
    createCategoryInDB,
    getAllCategoriesFromDB,
    getSingleCategoryFromDB,
    updateCategoryInDB,
    deleteCategoryInDB,
};
