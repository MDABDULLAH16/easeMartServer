/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Product } from "../products/products.model";
import { Order } from "./order.model";
import { initialPayment } from "../payment/payment.utils";



export const createOrder = async (orderData: any) => {
  const { user, products } = orderData;

  let totalPrice = 0;

  //calculate total price;
  const productDetails = await Promise.all(
    products.map(async (item: any) => {
      const product = await Product.findById(item.product);
      if (product) {

        totalPrice += product.price * item.quantity;
        return {product: product?._id, quantity: item.quantity}
      } else {
        throw new AppError(httpStatus.NOT_FOUND,'Product not found for price calculate')
      }
    })
  )
  const transactionId = `TXN-${Date.now()}`;
  
  const order = new Order({
    user, products: productDetails,
    totalPrice,
    status: 'Pending',
    paymentStatus: 'Pending',
    transactionId,
    
    
    
  })
  await order.save()
  //payment initiate

  const paymentData = {
    transactionId,
    totalPrice,
    customerName: user.name,
    customerEmail: user.email,
    customerAddress: user.address,
    customerPhone: user.phone,
  
}

  const paymentInfo = await initialPayment(paymentData)
  // console.log(paymentInfo);
  
  return paymentInfo;
}
export const oderServices = {
  createOrder
}