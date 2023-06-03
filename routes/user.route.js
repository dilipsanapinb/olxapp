const express=require("express");

const { User } = require("../models/user.model");

const userRoute = express.Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
require("dotenv").config();

userRoute.post("/api/signup", async (req, res) => {
    let { email, password, confirmpassword } = req.body;
    try {
        bcrypt.hash(password, 5, async function (err, hash) {
            if (err) {
            console.log("Error:error in register the user", err);
            res.status(404).send({ "Message": err.message });
            } else {
                let user = new User({ email, password: hash });
                await user.save();
                res.status(200).send({ "Message": "Registration is successfull", "data": user });
            }
        });
    } catch (error) {
        console.log("Error:error in register the user", error);
        res.status(500).send({ "Message": error.message });
    }
})

userRoute.post("/api/signin", async (req, res) => {
    let { email, password } = req.body;
    let user = await User.findOne({ "email": email });
    let hashPass = user.password;
    
    try {
        bcrypt.compare(password, hashPass, async function (err, result) {
            if (result) {
                var token = jwt.sign({ userID: user._id }, process.env.key);
                res.status(201).send({"Message":"Login is Successfull","token":token})
            } else {
                console.log("Error:error in login the user", err);
                res.status(404).send({ Message: err.message });
            }
        });
    } catch (error) {
        console.log("Error:error in login the user", err);
        res.status(404).send({ Message: err.message });
    }
});
module.exports={userRoute}