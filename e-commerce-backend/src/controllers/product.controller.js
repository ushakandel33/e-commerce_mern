import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

// 👉 Create Product (Admin Only)
export const createProduct = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;

    if (!name || !price || !description || !category || !req.file) {
      return res.status(400).json({ message: "All fields are required including image" });
    }

    const result = await cloudinary.uploader.upload(req.file.path);
    fs.unlinkSync(req.file.path);  // Clean temp file

    const product = await Product.create({
      name,
      price,
      description,
      category,
      imageUrl: result.secure_url,
    });

    res.status(201).json({ success: true, message: "Product created", product });
  } catch (error) {
    console.error("Product creation failed:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// 👉 Get All Products (Public)
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Fetching products failed:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// 👉 Get Single Product by ID (Public)
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error("Fetching product failed:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// 👉 Update Product (Admin Only)
export const updateProduct = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    // If there's a new image, upload to Cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      fs.unlinkSync(req.file.path);
      product.imageUrl = result.secure_url;
    }

    // Update other fields
    if (name) product.name = name;
    if (price) product.price = price;
    if (description) product.description = description;
    if (category) product.category = category;

    const updatedProduct = await product.save();
    res.status(200).json({ success: true, message: "Product updated", product: updatedProduct });

  } catch (error) {
    console.error("Product update failed:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// 👉 Delete Product (Admin Only)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.error("Product deletion failed:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
