"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderZodSchema = exports.createOrderZodSchema = void 0;
const zod_1 = require("zod");
exports.createOrderZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().min(1, 'User ID is required'),
        productId: zod_1.z.string().min(1, 'Product ID is required'),
        productName: zod_1.z.string().min(1, 'Product name is required'),
        userName: zod_1.z.string().min(1, 'User name is required'),
        userAddress: zod_1.z.string().min(1, 'User Address is required'),
        email: zod_1.z.string().email('Valid email is required'),
        quantity: zod_1.z.number().positive('Quantity must be a positive number'),
        price: zod_1.z.number().positive('Price must be a positive number'),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
exports.updateOrderZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().optional(),
        productId: zod_1.z.string().optional(),
        productName: zod_1.z.string().min(1, 'Product name is required').optional(),
        userName: zod_1.z.string().optional(),
        userAddress: zod_1.z.string().optional(),
        email: zod_1.z.string().email('Valid email is required').optional(),
        quantity: zod_1.z
            .number()
            .positive('Quantity must be a positive number')
            .optional(),
        price: zod_1.z.number().positive('Price must be a positive number').optional(),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
