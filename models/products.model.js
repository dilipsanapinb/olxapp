const mongoose = require("mongoose");

const prodSchema = mongoose.Schema({
  name: String,
    description: String,
    category: String,
    image: String,
    location: String,
    postedAt: String,
  price:String
});

const Product = mongoose.model("Product", prodSchema);

module.exports={Product}