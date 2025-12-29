const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

function readProducts() {
  const data = fs.readFileSync("products.json", "utf-8");
  return JSON.parse(data);
}

app.get("/products", (req, res) => {
  const products = readProducts();

  const limit = parseInt(req.query.limit) || products.length;
  const offset = parseInt(req.query.offset) || 0;

  const paginatedProducts = products.slice(offset, offset + limit);

  res.json(paginatedProducts);
});

app.get("/products/:id", (req, res) => {
  const products = readProducts();
  const id = parseInt(req.params.id);

  const product = products.find(p => p.id === id);

  if (!product) {
    res.status(404).json({ message: "Məhsul tapılmadı" });
  } else {
    res.json(product);
  }
});


app.listen(PORT, () => {
  console.log(`Server işləyir 👉 http://localhost:${PORT}`);
});
