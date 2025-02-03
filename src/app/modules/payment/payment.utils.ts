/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"
 import dotenv from 'dotenv'
import AppError from "../../errors/AppError"


 dotenv.config()
 export const initialPayment = async (paymentData:any) => {
try {
    
    const response = await axios.post(process.env.PAYMENT_URL!, {
        store_id: process.env.STORE_ID,
        signature_key: process.env.SIGNATURE_KEY,
    tran_id: paymentData.transactionId,
    success_url: `https://easemartletest.vercel.app/api/payment/confirmation?transactionId=${paymentData.transactionId}&status=success`,
    fail_url: `https://easemartletest.vercel.app/api/payment/confirmation?status=faild`,
    cancel_url: "https://easemartletestv2.vercel.app/checkout",
    amount: paymentData.totalPrice,
    currency: "BDT",
    desc: "Merchant Registration Payment",
    cus_name:paymentData.customerName,
    cus_email:paymentData.customerEmail,
    cus_add1: paymentData.customerAddress,
    cus_add2: "N/A",
    cus_cit: "N/A",
    cus_state: "N/A",
    cus_postcode: "N/A",
    cus_country: "Bangladesh",
    cus_phone: paymentData.customerPhone,
    type: "json"
    })
    
     return response.data;
    
} catch (err) {
    throw new Error('Payment initialization Error')
}
}

export const verifyPayment = async (transId :string) => {
    try {
        const result = await axios.get(process.env.PAYMENT_VERIFY_URL!, {
        params: {
            request_id: transId,
            signature_key: process.env.SIGNATURE_KEY,
            store_id: process.env.STORE_ID,
            type:"json"
        }
    })
    return result.data
    } catch (err) {
        throw new Error('Payment Verify Error')
    }
}