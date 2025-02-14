import express from 'express';
import { ordersController } from './order.controller';

const router = express.Router();

router.post(
  '/',
  // validateRequest(createOrderZodSchema)
  ordersController.createOrderReq
);
router.get(
  '/',
  // validateRequest(createOrderZodSchema)
  ordersController.getOrderByUserId
);

export const OrderRoute = router;
