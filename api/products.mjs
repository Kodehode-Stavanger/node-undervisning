import express from "express";
const router = express.Router();
import { ReqError } from "../util/errorHandler.mjs";
import {
  getProducts,
  getProduct,
  deleteProduct,
  getCategory,
  addProduct,
  updateProduct,
} from "../util/dbQueries.mjs";

router.all("/", (req, res) => {
  //Route to fetch all products
  if (req.method === "GET") {
    let data;
    const { category } = req.query;

    //query the DB
    if (category) data = getCategory(category);
    else data = getProducts();

    //respond with json data
    res.status(200).json({ results: data });

    // Route to add a new product to the DB
  } else if (req.method === "POST") {
    addProduct(req.body);
    res.status(201).json({
      message: "Product successfully added.",
      productAdded: req.body,
    });
  } else {
    throw new ReqError(405, "Unsupported method");
  }
});

router.all("/:productId", (req, res) => {
  // get the product id from params
  const { productId } = req.params;
  // initialize variables to hold data and message to return
  let data, message;

  if (req.method === "GET") {
    // handle GET a single product

    data = getProduct(productId);
    if (data.length !== 0) {
      "Successfully fetched data for product " + productId;
    } else {
      throw new ReqError(404, "Product not found");
    }
  } else if (req.method === "DELETE") {
    // handle DELETE a single product

    data = getProduct(productId);
    deleteProduct(productId);
    message = "Successfully deleted product " + productId;
  } else if (req.method === "PUT") {
    // handle UPDATE a single product

    updateProduct(req.body);
    data = getProduct(productId);
    message = "Successfully updated product " + productId;
  } else {
    // handle unsupported methods to this route.

    throw new ReqError(405, "Unsupported method");
  }

  // sending message and data.

  res.status(200).json({
    message: message,
    product: data,
  });
});

export default router;
