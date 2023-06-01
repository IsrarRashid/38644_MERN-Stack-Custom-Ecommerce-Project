import ProductModel from "../models/productModel.js";
import fs from "fs";

// add a new product
export const addProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const image = req.file.filename;

    let product = new ProductModel({
      name,
      description,
      price,
      image,
    });

    await product.save();

    res.status(201).send({
      success: true,
      message: "task added successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to add product" });
  }
};

// get single product
export const GetSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findById(id);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "failed to get product" });
  }
};

// get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// update a product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
      },
      { new: true }
    );

    if (updatedProduct) {
      res.json(updatedProduct);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
};

// delete a product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await ProductModel.findByIdAndRemove(id);

    if (deletedProduct) {
      res.json(deletedProduct);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "failed to delete product" });
  }
};
