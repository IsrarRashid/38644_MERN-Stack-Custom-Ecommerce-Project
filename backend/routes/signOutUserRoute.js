import express from "express";
import {
  signOutUser,
  GetSignInUser,
} from "../controllers/signOutController.js";

const router = express.Router();

// route for sign out the user
router.post("/signout", signOutUser);
router.get("/get-signed-in-user", GetSignInUser);
export default router;
