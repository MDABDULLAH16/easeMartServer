"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const auth_utils_1 = require("../Auth/auth.utils");
const verifyToken = (req, res, next) => {
    try {
        // Get the Authorization header
        const authHeader = req.headers.authorization;
        // Log the Authorization header to see what's coming in
        // console.log('Auth Header:', authHeader);
        // Check if the Authorization header is present and starts with 'Bearer '
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new AppError_1.default(401, 'Access token is missing or malformed');
        }
        // Extract the token by removing the 'Bearer ' prefix
        const accessToken = authHeader.split(' ')[1];
        // Log the extracted access token
        // console.log('Access Token:', accessToken);
        // Verify the access token
        jsonwebtoken_1.default.verify(accessToken, config_1.default.jwt_access_secret, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    // Access token expired, check refresh token from cookies
                    const refreshToken = req.cookies.refreshToken;
                    if (!refreshToken) {
                        throw new AppError_1.default(401, 'Refresh token is missing');
                    }
                    // Verify the refresh token
                    jsonwebtoken_1.default.verify(refreshToken, config_1.default.jwt_refresh_secret, (refreshErr, refreshDecoded) => {
                        if (refreshErr) {
                            throw new AppError_1.default(403, 'Refresh token is invalid or expired');
                        }
                        // Create a new access token
                        const newAccessToken = (0, auth_utils_1.createToken)({ email: refreshDecoded.email, role: refreshDecoded.role }, config_1.default.jwt_access_secret, config_1.default.expire_in_access);
                        // Set the new access token in the cookie
                        res.cookie('accessToken', `Bearer ${newAccessToken}`, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV === 'production',
                            maxAge: 15 * 60 * 1000, // 15 minutes in milliseconds
                            sameSite: 'strict',
                        });
                        // Attach the decoded refresh token data to the request object
                        req.user = refreshDecoded;
                        next();
                    });
                }
                else {
                    throw new AppError_1.default(403, 'Access token is invalid');
                }
            }
            else {
                // Token is valid, attach the decoded token data to the request object
                req.user = decoded;
                next();
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.verifyToken = verifyToken;
