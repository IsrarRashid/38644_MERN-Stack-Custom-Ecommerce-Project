import express from "express";
import multer from "multer";
import path from "path";
import {
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  GetSingleProduct,
} from "../controllers/productController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, uniqueSuffix + extension);
  },
});

const upload = multer({ storage });

// route for adding a new Product
router.post("/add", upload.single("image"), addProduct);

// router for get single product
router.get("/get-single-product/:id", GetSingleProduct);

// router for getting all products
router.get("/show-all", getAllProducts);

// route for updating a product
router.post("/update/:id", updateProduct);

// route for deleting a product
router.delete("/delete/:id", deleteProduct);

export default router;
