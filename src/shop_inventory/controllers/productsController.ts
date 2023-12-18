import { Request, Response } from "express";
import {handleError} from "../../utils/handleErrors";
import {
  addQuantityToProducts,
    getProductById,
    getProductsBySearch,
    updateProductsById,
}from "../services/productsService";
import ServerError from "../../utils/serverErrorClass";

export const handleGetProductById = async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;
      if(Number.isNaN(+productId)) {
        throw new ServerError(404, 'Id must be a number');
      }
      const product = await getProductById(productId);
      res.send(product);
    } catch (error) {
      handleError(res, error);
    }
  };

export const handleGetProductsBySearch = async (req: Request, res: Response) => {
  try{
    const query = req.query;
    if(!Object(query).hasOwnProperty('searchText')){
      throw new ServerError(403, 'Query params not valid');
    };
    const searchText = query.searchText as string;
    const products = await getProductsBySearch(searchText);
    res.send(products);
  }catch (error) {
    handleError(res, error);
  }
}

export const handleUpdateProducts = async (req: Request, res: Response) => {
  try{
    const productsToUpdate = req.body;
    const response = await updateProductsById(productsToUpdate);
    res.send(response);
  }catch (error) {
    if(error instanceof Object){
      res.status(400).send(error);
    }else{
      handleError(res, error);
    }
  }
}

export const handleCancelOrder = async (req: Request, res: Response) => {
  try{
      const productsToUpdate = req.body;
      await addQuantityToProducts(productsToUpdate);
      res.send();
  }catch (error) {
    handleError(res, error);
  }

}