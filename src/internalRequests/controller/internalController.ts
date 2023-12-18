import { Request, Response } from "express";
import {
  addNewProductService,
  deleteProductByIdService,
  getAllProductsService,
  getMyProductsService,
  getProductByIdService,
  updateProductService,
  updateQuantityService
} from "../service/internalService";
import { handleError } from "../../utils/handleErrors";

export const handleGetAllProductsReq = async (req: Request, res: Response) => {
  try {
    const products = await getAllProductsService();
    return res.send(products);
  } catch (error) {
    handleError(res, error);
  }
};

export const handleGetProductByIdReq = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await getProductByIdService(id);
    return res.send(product);
  } catch (error) {
    handleError(res, error);
  }
};

export const handleAddProductReq = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    const token = req.headers.authorization as string;
    const insertProduct = await addNewProductService(product, token);
    return res.send(insertProduct);
  } catch (error) {
    handleError(res, error);
  }
};

export const handleUpdateProductReq = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedProduct = await updateProductService(id, data);
    return res.send(updatedProduct);
  } catch (error) {
    handleError(res, error);
  }
};

export const handleDeleteProductReq = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleting = await deleteProductByIdService(id);
    return res.send(`product ${deleting[0].name} deleted successfully`);
  } catch (error) {
    handleError(res, error);
  }
};

export const handleGetMyProductsReq = async (req: Request, res: Response) => {
  try {
    const token = req.headers["authorization"];
    const products = await getMyProductsService(token as string);
    return res.send(products);
  } catch (error) {
    handleError(res, error);
  }
};

export const handleUpdateQuantityReq = async (req: Request, res: Response) => {
  try{
    const {id} = req.params
    const {quantity} = req.body;
    const updateProduct = await updateQuantityService(id, quantity);
    return res.send(updateProduct);
  }catch (error){
    console.log(error);
    handleError(res, error);
  }
}