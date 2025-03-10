import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { customerServices } from "./customer.service";


const createCustomerReq = catchAsync(async (req, res) => {
    const customer = await customerServices.createCustomer(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        message: 'Message sent successfully',
        data: customer,
        success: true
    })
})

export const customerController = {
    createCustomerReq
}