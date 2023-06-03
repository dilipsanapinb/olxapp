const express = require("express");
const {Product}=require("../models/products.model");
const { User } = require("../models/user.model");
const prodRoute = express.Router();

// get all products

prodRoute.get("/api/product", async (req, res) => {
    let page=parseInt(req.query.page)||1;
    let pageSize = parseInt(req.query.limit) || 4;
    let offset = (page - 1) * pageSize;
    let totalProducts=await Product.countDocuments()
    try {
        let perPageData = await Product.find().skip(offset).limit(pageSize);
        res.status(200).json({currentPage:page,totalPages:Math.ceil(totalProducts/pageSize),totalProducts,perPageData})
    } catch (error) {
        console.log("Error:error in getting all products data", error);
        res.status(500).send({"Message": error.message });
    }
})


// filter the data

prodRoute.get("/api/product/filter/", async (req, res) => {
    let category=req.query.category
  try {
    let page=parseInt(req.query.page)||1;
    let pageSize = parseInt(req.query.limit) || 4;
    let offset = (page - 1) * pageSize;
    let totalProducts=await Product.countDocuments()
        let perPageData = await Product.find({category}).skip(offset).limit(pageSize);
        res.status(200).json({currentPage:page,totalPages:Math.ceil(totalProducts/pageSize),totalProducts,perPageData})
  } catch (error) {
    console.log("Error:error in getting all products data", error);
    res.status(500).send({ Message: error.message });
  }
});

// search name=

prodRoute.get("/api/product/name/", async (req, res) => {
  let name = req.query.name;
  try {
    let page = parseInt(req.query.page) || 1;
    let pageSize = parseInt(req.query.limit) || 4;
    let offset = (page - 1) * pageSize;
    let totalProducts = await Product.countDocuments();
    let perPageData = await Product.find({ name })
      .skip(offset)
      .limit(pageSize);
    res
      .status(200)
      .json({
        currentPage: page,
        totalPages: Math.ceil(totalProducts / pageSize),
        totalProducts,
        perPageData,
      });
  } catch (error) {
    console.log("Error:error in getting all products data", error);
    res.status(500).send({ Message: error.message });
  }
});

prodRoute.get("/api/product/sortbydate/asc", async (req, res) => {
        let page=parseInt(req.query.page)||1;
    let pageSize = parseInt(req.query.limit) || 4;
    let offset = (page - 1) * pageSize;
    let totalProducts=await Product.countDocuments()
    try {
        let perPageData = await Product.find()
          .sort({ "postedAt": 1 })
          .skip(offset)
          .limit(pageSize);
        res.status(200).json({currentPage:page,totalPages:Math.ceil(totalProducts/pageSize),totalProducts,perPageData})

    } catch (error) {
        console.log("Error:error in getting all products data in asc order", error);
        res.status(500).send({ Message: error.message });
    }
})

prodRoute.get("/api/product/sortbydate/desc", async (req, res) => {
  let page = parseInt(req.query.page) || 1;
  let pageSize = parseInt(req.query.limit) || 4;
  let offset = (page - 1) * pageSize;
  let totalProducts = await Product.countDocuments();
  try {
    let perPageData = await Product.find()
      .sort({ postedAt: -1 })
      .skip(offset)
      .limit(pageSize);
    res
      .status(200)
      .json({
        currentPage: page,
        totalPages: Math.ceil(totalProducts / pageSize),
        totalProducts,
        perPageData,
      });
  } catch (error) {
    console.log("Error:error in getting all products data in asc order", error);
    res.status(500).send({ Message: error.message });
  }
});



prodRoute.post("/api/product", async(req, res) => {
    let { name, description, category, image, location, postedAt, price } = req.body;
    try {
        let product = new Product({
          name,
          description,
          category,
          image,
          location,
          postedAt,
          price,
        });
        await product.save();
        res.status(201).send({ "Message": "Product added Successfully", "Product": product });
    } catch (error) {
        console.log("Error:error in addding the products data", error);
        res.status(500).send({ "Message": error.message });
    }
})

prodRoute.patch("/api/product/:id", async (req, res) => {
    let id = req.params.id;
    let payload = req.body;
    try {
        let product = await Product.findByIdAndUpdate({ '_id': id }, payload);
        // await product.save();
        res.status(201).send({"Message":"Product Updated Successfully"})
    } catch (error) {
        console.log("Error:error in  edit products data", error);
        res.status(500).send({ "Message": error.message });
    }
})

// delete

prodRoute.delete("/api/product/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let product = await Product.findByIdAndDelete({ "_id": id });
    res
      .status(200)
      .send({ Message: "Product Deleted Successfully" });
  } catch (error) {
    console.log("Error:error in delete products data", error);
    res.status(500).send({ "Message": error.message });
  }
});

module.exports={prodRoute}