import User from "../models/userModel.js";
import Product from "../models/productModels.js";
import asyncHandler from "express-async-handler";

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().sort({createdAt: "descending"});
  res.json(products);
});

const createProduct = asyncHandler( async (req, res) => {
  const { title, author, caption, category,image, gear, blurhash} = req.body;

   try {

    const product = await Product.create({
      title,
      author,
      caption,
      gear,
      image:image,
      category,
      blurhash
    });

    if (product) {
      res.status(201).json({
        title: product.title,
        author: product.author,
        caption: product.caption,
        gear: product.gear,
        image: product.image,
        category: product.category,
        blurhash: product.blurhash
      });
    } else {
      res.status(400);
      throw new Error("Invalid product data");
    }
  } catch (error) {
    console.error(error); // Log the error to the console for debugging
  res.status(400).json({ message: "Failed to create product", error: error.message });
  }
});

export { getProducts, getUsers, createProduct };