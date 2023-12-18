import express from "express";
import {
    handleGetProductById,
    handleGetProductsBySearch,
    handleUpdateProducts,
    handleCancelOrder
} from "../controllers/productsController";

const router = express.Router();

router.get("/:productId", handleGetProductById);

router.get("/", handleGetProductsBySearch);

router.post("/updateInventory", handleUpdateProducts);

router.post("/cancelOrder", handleCancelOrder);

export default router;
