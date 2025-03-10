
import express from 'express';
import { customerController } from "./customer.controller";

const router = express.Router();
router.post('/message', customerController.createCustomerReq);

export const CustomerMessageRoute=  router;