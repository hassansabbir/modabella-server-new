import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiErrors";
import { IProduct } from "./product.interface";
import unlinkFile from "../../../shared/unlinkFile";
import { Product } from "./product.model";

const createProductToDB = async (payload: IProduct) => {
  const { title, image } = payload;
  const isExistName = await Product.findOne({ title: title });

  if (isExistName) {
    unlinkFile(image);
    throw new ApiError(
      StatusCodes.NOT_ACCEPTABLE,
      "This Product Name Already Exist"
    );
  }

  const createProduct: any = await Product.create(payload);
  if (!createProduct) {
    unlinkFile(image);
    throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to create Product");
  }

  return createProduct;
};

const getProductsFromDB = async (): Promise<IProduct[]> => {
  const result = await Product.find({});
  return result;
};

const getProductByIdFromDB = async (id: string): Promise<IProduct | null> => {
  const result = await Product.findById(id);
  return result;
};

const updateProductToDB = async (id: string, payload: IProduct) => {
  const isExistProduct: any = await Product.findById(id);

  if (!isExistProduct) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Product doesn't exist");
  }

  if (payload.image) {
    unlinkFile(isExistProduct?.image);
  }

  const updateProduct = await Product.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return updateProduct;
};

const deleteProductToDB = async (id: string): Promise<IProduct | null> => {
  const deleteProduct = await Product.findByIdAndDelete(id);
  if (!deleteProduct) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Product doesn't exist");
  }
  return deleteProduct;
};

export const ProductService = {
  createProductToDB,
  getProductsFromDB,
  getProductByIdFromDB,
  updateProductToDB,
  deleteProductToDB,
};
