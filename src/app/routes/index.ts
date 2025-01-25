import { Router } from 'express';
import { UserRouter } from '../modules/user/user.router';
import { AuthRoutes } from '../Auth/auth.route';
import { ProductRoute } from '../modules/products/product.router';

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
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
// moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
