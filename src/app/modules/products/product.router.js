"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoute = void 0;
const express_1 = __importDefault(require("express"));
// import auth from '../../middlewares/auth';
// import { USER_ROLE } from '../user/user.constant';
const products_controller_1 = require("./products.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const product_validation_1 = require("./product.validation");
const router = express_1.default.Router();
// Create a product (Admin-only access)
router.post('/', 
//   auth(USER_ROLE.admin),
// validateRequest(createProductZodSchema),
products_controller_1.productController.createProduct);
// Get all products (Public access)
router.get('/', products_controller_1.productController.getAllProducts);
// Get a single product by ID (Public access)
router.get('/:_id', products_controller_1.productController.getSingleProduct);
// Update a product by ID (Admin-only access)
router.put('/:_id', (0, validateRequest_1.default)(product_validation_1.updateProductSchema), 
//   auth(USER_ROLE.admin),
products_controller_1.productController.updateProduct);
// Delete a product by ID (Admin-only access)
router.delete('/:_id', 
// auth(USER_ROLE.admin),
products_controller_1.productController.deleteProduct);
exports.ProductRoute = router;
