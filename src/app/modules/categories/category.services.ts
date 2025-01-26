import { TCategory } from './category.interface';
import { Category } from './category.model';

const createCategoryInDB = async (payload: TCategory) => {
  const result = await Category.create(payload);
  return result;
};

const getAllCategoriesFromDB = async () => {
  const result = await Category.find({ isDeleted: false });
  return result;
};

const getSingleCategoryFromDB = async (_id: string) => {
  const result = await Category.findOne({ _id, isDeleted: false });
  return result;
};

const updateCategoryInDB = async (_id: string, payload: Partial<TCategory>) => {
  const result = await Category.findByIdAndUpdate(_id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteCategoryInDB = async (_id: string) => {
  const result = await Category.findByIdAndUpdate(
    _id,
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    }
  );
  return result;
};

export const categoryServices = {
  createCategoryInDB,
  getAllCategoriesFromDB,
  getSingleCategoryFromDB,
  updateCategoryInDB,
  deleteCategoryInDB,
};
