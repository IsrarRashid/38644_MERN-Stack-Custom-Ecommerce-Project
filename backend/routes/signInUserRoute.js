import express from "express";
import { signInUser } from "../controllers/signInController.js";

const router = express.Router();

// route for signing-In the user
router.post("/signin", signInUser);

export default router;
