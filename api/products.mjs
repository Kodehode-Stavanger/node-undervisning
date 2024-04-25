import express from "express";
const router = express.Router();
import { ReqError } from "../util/errorHandler.mjs";

router.all("/", (req, res) => {
  if (req.method === "GET") {
    res.status(200).json({
      message: "Products will come here.",
    });
  } else if (req.method === "POST") {
    res.status(201).json({
      message: "Use this to add new products.",
    });
  } else {
    throw new ReqError(
      405,
      `${req.method} not supported on this endpoint. Please refer to the API documentation.`
    );
  }
});

router.all("/:productId", (req, res) => {
  const { productId } = req.params;
  if (req.method === "GET") {
    res.status(200).json({
      productId: productId,
      message: `Information about product with id ${productId} will come here.`,
    });
  } else if (req.method === "DELETE") {
    res.status(200).json({
      productId: productId,
      message: `This will delete product with id ${productId}`,
    });
  } else if (req.method === "PUT") {
    res.status(200).json({
      productId: productId,
      message: `Thiss will update product with id ${productId}`,
    });
  } else {
    throw new ReqError(
      405,
      `${req.method} not supported on this endpoint. Please refer to the API documentation.`
    );
  }
});

export default router;
