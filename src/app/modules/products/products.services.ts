import { TProduct } from './products.interface';
import Product from './products.model';

const createProductInDB = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};

const getAllProductsFromDB = async () => {
  const result = await Product.find({ isDeleted: false });
  return result;
};

const getSingleProductFromDB = async (_id: string) => {
  const result = await Product.findOne({ _id });
  return result;
};

const updateProductInDB = async (_id: string, payload: TProduct) => {
  const result = await Product.findByIdAndUpdate(_id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteProductInDB = async (_id: string) => {
  const result = await Product.findByIdAndUpdate(
    _id,
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    }
  );
  return result;
};

export const productServices = {
  createProductInDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductInDB,
  deleteProductInDB,
};
