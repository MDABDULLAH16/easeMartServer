/* eslint-disable @typescript-eslint/no-unused-vars */
import {  resolve } from 'path';
import { Order } from '../orders/order.model';
import { verifyPayment } from './payment.utils';
import { readFileSync } from 'fs';

const confirmationService = async (transactionId: string,status:string) => {
  const verifyResponse = await verifyPayment(transactionId);
//   console.log(verifyResponse);
    let result;
    let message =''
  if (verifyResponse && verifyResponse.pay_status === 'Successful') {
    result = await Order.findOneAndUpdate(
      { transactionId },
      { paymentStatus: 'Paid' }
      );
      message='Successfully Paid'
  } else {
      message="Payment failed"
    }
    const filePath = resolve(process.cwd(), 'dist/views/paymentView.html');
    let template = readFileSync(filePath, 'utf-8')
template= template.replace("{{message}}",message)
    
      return template;
};

export const paymentServices = {
  confirmationService,
};