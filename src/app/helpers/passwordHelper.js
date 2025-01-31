"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPassword = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashPassword = (payload) => {
    return bcrypt_1.default.hashSync(payload, 8);
};
exports.hashPassword = hashPassword;
const checkPassword = (password, hash) => {
    return bcrypt_1.default.compareSync(password, hash);
};
exports.checkPassword = checkPassword;
