const express = require("express");
const { connection } = require("./config/db");
const { userRoute } = require("./routes/user.route");
const { prodRoute } = require("./routes/product.route");
const cors=require("cors")
const {auth}=require("./middlewares/authenticate")
require('dotenv').config()
const app = express();

app.use(cors())

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to olx")
})

app.use("/user", userRoute);
app.use("/product",auth,prodRoute)
app.listen(process.env.port, async() => {
    try {
        await connection;
        console.log("Connected to DB");
    } catch (error) {
        console.log({ "Message": error.message });
    }
    console.log(`Server is running on port ${process.env.port}`);
})