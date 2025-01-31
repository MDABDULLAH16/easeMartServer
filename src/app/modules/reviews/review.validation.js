"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateReviewSchema = exports.createReviewSchema = void 0;
const zod_1 = require("zod");
exports.createReviewSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().min(1, 'User ID is required'),
        productId: zod_1.z.string().min(1, 'Product ID is required'),
        description: zod_1.z.string().min(1, 'Description is required'),
        star: zod_1.z
            .number()
            .min(1, 'Star must be at least 1')
            .max(5, 'Star cannot exceed 5'),
    }),
});
exports.updateReviewSchema = zod_1.z.object({
    body: zod_1.z.object({
        description: zod_1.z.string().optional(),
        star: zod_1.z.number().min(1).max(5).optional(),
    }),
});
