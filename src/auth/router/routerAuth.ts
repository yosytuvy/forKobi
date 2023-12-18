import express from "express";
import {
  handleLogin,
  handleUserRegistration,
  handleDelete,
} from "../controller/authController";

const router = express.Router();

router.post("/login", handleLogin);
router.post("/signup", handleUserRegistration);
router.delete("/delete", handleDelete);

export default router;
