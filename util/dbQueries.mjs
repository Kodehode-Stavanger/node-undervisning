import sqlite3 from "better-sqlite3";
import { join } from "path";
const { dirname } = import.meta;

//initialize DB

const db = new sqlite3(join(dirname, "..", "database", "store.sqlite"));

const getProducts = () => db.prepare("SELECT * FROM products").all();

const getProduct = (id) =>
  db.prepare("SELECT * FROM products WHERE id = ?").all(id);

const deleteProduct = (id) =>
  db.prepare("DELETE FROM products WHERE id = ?").run(id);

const updateProduct = ({ name, category, stock, price, id }) =>
  db
    .prepare(
      "UPDATE products SET name = ?, category = ?, stock = ?, price = ? WHERE id = ?"
    )
    .run(name, category, stock, price, id);

const getCategory = (category) =>
  db
    .prepare(`SELECT * FROM products WHERE LOWER(category) = ?`)
    .all(category.toLowerCase());

const addProduct = ({ name, category, stock, price }) =>
  db
    .prepare(
      `INSERT INTO products (name, category, stock, price)
    VALUES (?, ?, ?, ?);`
    )
    .run(name, category, stock, price);

export {
  getProducts,
  getProduct,
  deleteProduct,
  addProduct,
  getCategory,
  updateProduct,
};
