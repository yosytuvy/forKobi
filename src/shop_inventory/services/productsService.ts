import ServerError from "../../utils/serverErrorClass";
import {
    getProductByIdFromDb,
    getProductsBySearchFromDb,
    getProductsByIdFromDb,
    updateProductsInDb
}from "../dal/productsDal";
import { exportIdsToArray, checkQuantity } from "../helpers/helpers";
import { UpdateProductInterface } from "../interfaces/updateProductInterface";

export const getProductById = async (id: string | number) => {
    try {
      
      if(Number.isNaN(+id)) throw new ServerError(404, 'Id must be a number');

      const product = await getProductByIdFromDb(id.toString());
      return product;
    } catch (error) {
      return Promise.reject(error);
    }
};

export const getProductsBySearch = async (searchText: string) => {
  try {
    let products = await getProductsBySearchFromDb(searchText);
    products = products.filter(product => product.quantity > 0);
    return products;
  }catch (error) {
    return Promise.reject(error);
  }
}

export const updateProductsById = async (productsToUpdate: UpdateProductInterface[]) => {
  const ids = exportIdsToArray(productsToUpdate);
  
  try {
    const productsToUpdateFromDb = await getProductsByIdFromDb(ids);
    const response = checkQuantity(productsToUpdate, productsToUpdateFromDb);
    await updateProductsInDb(productsToUpdate, "-");
    return response;
  }catch (error) {
    console.log((error as Error).message);
    return Promise.reject(error);
  }
}

export const addQuantityToProducts = async (productsToUpdate: UpdateProductInterface[]) => {
  try {
    await updateProductsInDb(productsToUpdate, "+");
  }catch (error) {
    console.log((error as Error).message);
    return Promise.reject(error);
  }
}