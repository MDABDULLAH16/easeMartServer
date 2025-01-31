"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_router_1 = require("../modules/user/user.router");
const auth_route_1 = require("../Auth/auth.route");
const product_router_1 = require("../modules/products/product.router");
const category_router_1 = require("../modules/categories/category.router");
const order_router_1 = require("../modules/orders/order.router");
const review_router_1 = require("../modules/reviews/review.router");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        route: user_router_1.UserRouter,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/products',
        route: product_router_1.ProductRoute,
    },
    {
        path: '/categories',
        route: category_router_1.CategoryRouter,
    },
    {
        path: '/orders',
        route: order_router_1.OrderRoute,
    },
    {
        path: '/reviews',
        route: review_router_1.ReviewRouter,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
// moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
