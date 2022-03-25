//#region Express Setup
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/public"));
//#endregion

const mongoose = require("mongoose");
const product = require("./models/product");

mongoose.connect("mongodb://127.0.0.1/testWebShop", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/products", async (req, res) => {
  const allProducts = await product.find();
  res.render("products", { products: allProducts });
});

app.get("/product/:productId", (req, res) => {
  const foundProduct = product.findOne({ id: req.params.productId });
  res.render("product", { product: foundProduct });
});

app.get("/", (req, res) => {
  res.render("admin");
});

app.post("/addProduct", async (req, res) => {
  const productName = req.body.productName;
  const productPrice = req.body.productPrice;
  const productDescription = req.body.productDescription;

  // If the above variables aren't set, return
  if (!productName || !productPrice || !productDescription)
    return res.redirect("/");

  try {
    const amountOfProducts = product.length;

    await product.create({
      id: amountOfProducts + 1,
      name: productName,
      price: productPrice,
      img_src: "https://via.placeholder.com/250/",
      description: productDescription,
    });

    res.send(
      "Name: " +
        productName +
        " Price: " +
        productPrice +
        "\nDescription: " +
        productDescription
    );
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

app.listen("8080");
