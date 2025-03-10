import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SubscribeService } from "./subscribe.service";

const createSubscribeReq = catchAsync(async (req, res) => {
    const result = await SubscribeService.crateSubscribe(req.body);
    sendResponse(res, {
   
        data: result,
        message: 'Subscribe successful',
        statusCode: httpStatus.CREATED,
        success: true,
    })
})
const getAllSubscriberReq = catchAsync(async (req, res) => {
    const result = await SubscribeService.getAllSubscriber();
    sendResponse(res, {
        data: result,
        message: 'All subscriber',
        statusCode: httpStatus.OK,
        success: true,
    })
})

export const SubscribeController = {
    createSubscribeReq,
    getAllSubscriberReq
}