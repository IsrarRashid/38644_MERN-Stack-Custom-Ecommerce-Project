import express from "express";

const router = express.Router();
import {
  addUser,
  getAllUsers,
  updateUser,
  deleteUser,
  GetSingleUser,
} from "../controllers/registerUserController.js";

// route for adding a new User
router.post("/add", addUser);

// router for get single User
router.get("/get-single-User/:id", GetSingleUser);

// router for getting all Users
router.get("/show-all", getAllUsers);

// route for updating a User
router.post("/update/:id", updateUser);

// route for deleting a User
router.delete("/delete/:id", deleteUser);

export default router;
