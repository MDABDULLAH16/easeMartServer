
import express from 'express';
import { SubscribeController } from './subscribe.controller';

const router = express.Router()

router.post("/subscribe", SubscribeController.createSubscribeReq)
router.get("/subscriber", SubscribeController.getAllSubscriberReq)

export const SubscribeRouter = router;