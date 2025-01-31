"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
// Define the Mongoose Schema corresponding to the IUser interface
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Unique email
    password: { type: String, required: true },
    phone: { type: Number, required: true },
    role: { type: String, enum: ['admin', 'user'] },
    address: { type: String, required: true },
}, { timestamps: true });
// Hide the password field when converting the document to JSON
userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};
exports.User = (0, mongoose_1.model)('User', userSchema);
