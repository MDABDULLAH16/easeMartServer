"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./app/routes"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const globalErrorhandler_1 = __importDefault(require("./app/middlewares/globalErrorhandler"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
// Use cookie-parser middleware
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000'],
    credentials: true,
}));
// application routes
app.use('/api', routes_1.default);
app.get('/', (req, res) => {
    res.send('Welcome to EaseMart');
});
app.use(globalErrorhandler_1.default);
app.use(notFound_1.default);
exports.default = app;
