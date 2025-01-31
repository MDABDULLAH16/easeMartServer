import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { productServices } from './products.services';


const createProduct = catchAsync(async (req, res) => {
  // const product = { ...req.body, isDeleted: false };
  
  const result = await productServices.createProductInDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product created successfully',
    data: result,
  });
});

// const getAllProducts = catchAsync(async (req, res) => {
//   const result = await productServices.getAllProductsFromDB();
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'All products retrieved successfully',
//     data: result,
//   });
// });
export const getAllProducts = catchAsync(async (req, res) => {
  const { name } = req.query;

  // Fetch all products or search by name
  const products = await productServices.getAllProductsFromDB(name as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: name
      ? `Products with name '${name}' retrieved successfully`
      : 'All products retrieved successfully',
    data: products,
  });
});
const getSingleProduct = catchAsync(async (req, res) => {
  const { _id } = req.params;
  const result = await productServices.getSingleProductFromDB(_id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product retrieved successfully',
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const { _id } = req.params;
  const data = req.body;
  const result = await productServices.updateProductInDB(_id, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product updated successfully',
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const { _id } = req.params;
  const result = await productServices.deleteProductInDB(_id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product deleted successfully',
    data: result,
  });
});

export const productController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
