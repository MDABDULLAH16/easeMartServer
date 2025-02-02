import express from 'express';
import { ordersController } from './order.controller';



const router = express.Router();

router.post(
  '/',
  // validateRequest(createOrderZodSchema)
  ordersController.createOrderReq
)



export const OrderRoute = router;
