import { Router } from 'express';
import { UserRouter } from '../modules/user/user.router';
import { AuthRoutes } from '../Auth/auth.route';
import { ProductRoute } from '../modules/products/product.router';
import { CategoryRouter } from '../modules/categories/category.router';
import { OrderRoute } from '../modules/orders/order.router';
import { ReviewRouter } from '../modules/reviews/review.router';
import { PaymentRoute } from '../modules/payment/payment.route';
import { CustomerMessageRoute } from '../modules/message/customer.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: UserRouter,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/products',
    route: ProductRoute,
  },
  {
    path: '/categories',
    route: CategoryRouter,
  },
  {
    path: '/orders',
    route: OrderRoute,
  },
 
  {
    path: '/reviews',
    route: ReviewRouter,
  },
  {
    path: '/payment',
    route: PaymentRoute,
  },
  {
    path: '/customer',
    route: CustomerMessageRoute,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
// moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
