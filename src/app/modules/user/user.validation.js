"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationSchemas = void 0;
// user.validation.ts
const zod_1 = require("zod");
const userCreateSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, 'Name is required'),
        email: zod_1.z.string().email('Invalid email address'),
        password: zod_1.z.string().min(6, 'Password must be at least 6 characters long'),
        phone: zod_1.z.number().min(1, 'Phone number is required'),
        role: zod_1.z.enum(['admin', 'user'], { required_error: 'Role is required' }),
        address: zod_1.z.string().min(1, 'Address is required'),
    }),
});
exports.userValidationSchemas = {
    userCreateSchema,
};
