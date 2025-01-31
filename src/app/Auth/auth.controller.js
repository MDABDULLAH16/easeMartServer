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
exports.refreshToken = exports.loginUser = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const user_service_1 = require("../modules/user/user.service");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const passwordHelper_1 = require("../helpers/passwordHelper");
const auth_utils_1 = require("./auth.utils");
const config_1 = __importDefault(require("../config"));
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
const auth_service_1 = require("./auth.service");
exports.loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // Check if user exists
    const userInfo = yield user_service_1.userServices.isUserExistIntoDB(email);
    if (!userInfo) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User doesn't exist");
    }
    // Validate password
    const isPasswordValid = (0, passwordHelper_1.checkPassword)(password, userInfo.password);
    if (!isPasswordValid) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'Password does not match');
    }
    // Prepare token data
    const tokenData = {
        email: userInfo.email,
        role: userInfo.role,
    };
    const accessToken = `${(0, auth_utils_1.createToken)(tokenData, config_1.default.jwt_access_secret, config_1.default.expire_in_access // e.g., '15m'
    )}`;
    // Create the refresh token (long-lived)
    const refreshToken = `Bearer ${(0, auth_utils_1.createToken)(tokenData, config_1.default.jwt_refresh_secret, // Use a different secret for the refresh token
    config_1.default.expire_in_refresh // e.g., '7d'
    )}`;
    // Set the refresh token in an HTTP-only cookie
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: 'strict',
    });
    // // Set the access token in an HTTP-only cookie
    // res.cookie('accessToken', accessToken, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
    //   maxAge: 15 * 60 * 1000, // 15 minutes
    //   sameSite: 'strict',
    // });
    // Send the response with user info
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User logged in successfully',
        data: {
            accessToken,
            // refreshToken, // Optionally send the access token to the client
            userInfo,
        },
    });
}));
exports.refreshToken = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    const result = yield auth_service_1.AuthServices.refreshToken(refreshToken);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Access token is retrieved successfully!',
        data: result,
    });
}));
