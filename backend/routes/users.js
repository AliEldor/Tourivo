import express from "express";
import {
  createUser,
  deleteUser,
  getAllUser,
  getSingleUser,
  updateUser,
} from "../controllers/userController.js";
import { validate, validateUser } from "../requests/UserRequest.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.put("/:id", verifyUser, validateUser("updateUser"), validate, updateUser);

router.delete("/:id", verifyUser, validateUser("deleteUser"), validate, deleteUser);

router.get("/:id", verifyUser, validateUser("getSingleUser"), validate, getSingleUser);

router.get("/", verifyAdmin, validateUser("getAllUser"), validate, getAllUser);

export default router;