const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;


const dataPath = path.join(__dirname, "employees.json");


app.get("/employees", (req, res) => {
  fs.readFile(dataPath, "utf-8", (err, data) => {
    if (err) {
      res.status(500).json({ message: "Məlumat oxunmadı" });
    } else {
      res.json(JSON.parse(data));
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server işləyir 👉 http://localhost:${PORT}`);
});
