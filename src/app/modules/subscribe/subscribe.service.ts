import { TSubscribe } from "./subscribe.interface";
import { Subscribe } from "./subscribe.model";

const crateSubscribe = async (payload: TSubscribe) => {
    const result = await Subscribe.create(payload)
    return result;    
}
const getAllSubscriber = async () => {
    const result = await Subscribe.find()
    return result;
}

export const SubscribeService = {
    crateSubscribe,
    getAllSubscriber
}