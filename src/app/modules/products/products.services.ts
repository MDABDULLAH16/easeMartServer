import { TProduct } from './products.interface';
import { Product } from './products.model';

const createProductInDB = async (payload: TProduct) => {
  const result = (await Product.create(payload)).populate('category');

  return result;
};

// const getAllProductsFromDB = async () => {
//   const result = await Product.find();
//   return result;
// };
// Get all products or search by name
const getAllProductsFromDB = async (name?: string) => {
  if (name) {
    // Search by name (case-insensitive)
    return await Product.find({ name: { $regex: name, $options: 'i' } });
  }

  // Return all products if no name is provided
  return await Product.find();
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
