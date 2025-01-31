import express from 'express';
// import validateRequest from '../../middlewares/validateRequest';
// import { createOrderZodSchema, updateOrderZodSchema } from './order.validation';
import { orderController } from './order.controller';

const router = express.Router();

router.post(
  '/',
  // validateRequest(createOrderZodSchema)
  orderController.createOrder
);

router.get('/', orderController.getAllOrders);

router.get('/:id', orderController.getSingleOrder);

router.patch(
  '/:id',
  // validateRequest(updateOrderZodSchema),
  orderController.updateOrder
);

router.delete('/:id', orderController.deleteOrder);

export const OrderRoute = router;
