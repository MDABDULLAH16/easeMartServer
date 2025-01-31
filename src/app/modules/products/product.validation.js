"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductSchema = exports.createProductZodSchema = void 0;
const zod_1 = require("zod");
// Zod schema for creating a product
exports.createProductZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, 'Product name is required'),
        description: zod_1.z.string(),
        price: zod_1.z.number().min(0, 'Price must be non-negative'),
        stockQuantity: zod_1.z.number().min(0, 'Stock quantity must be non-negative'),
        category: zod_1.z.string().min(1, 'Category is required'),
        image: zod_1.z.string().min(1, 'Images field is required'),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
// export const createCategoryZodSchema = z.object({
//   body: z.object({
//     name: z.string().min(1, 'Category name is required'),
//     description: z.string().optional(),
//     image: z.string().optional(),
//   }),
// });
// Zod schema for updating a product
exports.updateProductSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    price: zod_1.z.number().min(0).optional(),
    stockQuantity: zod_1.z.number().min(0).optional(),
    category: zod_1.z.string().optional(),
    image: zod_1.z.string().optional(),
});
