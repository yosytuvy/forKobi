import { string } from "joi";
import {
  getMyProductsQuery,
  sendAddProductQuery,
  sendDeleteProductQuery,
  sendGetAllProductsQuery,
  sendGetProductByIdQuery,
  sendUpdateProductQuery,
  sendUpdateQuantityQuery,
} from "../dal/internalDal";
import { getArrOfObjEntries } from "../helpers/getArrOfObjEntries";
import { AdminProductInterface } from "../interfaces/adminProductINterface";
import jwt, { JwtPayload } from "jsonwebtoken";

export const getAllProductsService = async () => {
  try {
    const products = await sendGetAllProductsQuery();
    if (!products.length) throw new Error("No products");
    return products;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getProductByIdService = async (id: string) => {
  try {
    if (Number.isNaN(+id)) throw new Error("id must be a number");
    const product = await sendGetProductByIdQuery(id);
    if (!product.length) throw new Error("Product not found");

    return product;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addNewProductService = async (
  product: Omit<AdminProductInterface, "id">,
  token: string
) => {
  try {
    const decodedToken = jwt.decode(token);
    const { email } = decodedToken as JwtPayload;
    if (product.name === undefined)
      throw new Error("please provide valid product");
    product.createdBy = email;
    const entries = getArrOfObjEntries(product);
    const newProduct = await sendAddProductQuery(entries);
    return newProduct;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateProductService = async (
  id: string,
  update: Omit<AdminProductInterface, "id">
) => {
  try {
    const entries = getArrOfObjEntries(update);
    const updatedProduct = await sendUpdateProductQuery(id, entries);
    return updatedProduct;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteProductByIdService = async (id: string) => {
  try {
    const deleting = await sendDeleteProductQuery(id);
    if (!deleting.length) throw new Error("product not found");
    return deleting;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getMyProductsService = async (token: string) => {
  try {
    const decodedToken = jwt.decode(token);
    const { email } = decodedToken as JwtPayload;
    if (email) {
      const products = await getMyProductsQuery(email);
      return products;
    }

    return "just error of me";
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateQuantityService = async(id:string, quantity:number) => {
  try {
    const updateProduct = await new Promise(resolve => {
      setTimeout(() => {
        resolve(sendUpdateQuantityQuery(id, quantity));
      }, 1000);
      // }, 5000*quantity);
    });
    
    return updateProduct;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
}