// import mongoose, { Types } from 'mongoose';

import { Types } from "mongoose";


export interface TProduct {
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  // category:string;
  category:Types.ObjectId;
  image: string;
  isDeleted?: boolean;
}
