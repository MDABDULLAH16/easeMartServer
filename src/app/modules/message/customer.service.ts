import { TCustomer } from "./customer.interface";
import { Customer } from "./customer.model";

const createCustomer = async (payload: TCustomer) => {
    const customer = await Customer.create(payload);
    return customer;
}

export const customerServices = {
    createCustomer
}