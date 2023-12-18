import express from "express";
import {
  handleAddProductReq,
  handleDeleteProductReq,
  handleGetAllProductsReq,
  handleGetMyProductsReq,
  handleGetProductByIdReq,
  handleUpdateProductReq,
  handleUpdateQuantityReq,
} from "../controller/internalController";
import { requireAuth } from "../../middleware/auth";

const internalRouter = express.Router();

internalRouter.get("/", requireAuth, handleGetAllProductsReq);
internalRouter.get("/products", requireAuth, handleGetMyProductsReq);
internalRouter.get("/:id", requireAuth, handleGetProductByIdReq);
internalRouter.post("/", requireAuth, handleAddProductReq);
internalRouter.put("/updateQuantity/:id", requireAuth, handleUpdateQuantityReq);
internalRouter.put("/:id", requireAuth, handleUpdateProductReq);
internalRouter.delete("/:id", requireAuth, handleDeleteProductReq);

export default internalRouter;
