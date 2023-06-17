const express = require("express");
const { UserModel } = require("../models/user.model");
const userRouter = express.Router()

userRouter.post("/register",async(req,res)=>{
    const {email,password} = req.body
    try {
        bcrypt.hash(password, 5, async(err, hash)=> {
            const user = new UserModel({email,password:hash})
            await user.save()
            res.send({"msg":"A new user is added!"})
        });
    } catch (error) {
        res.send(error)
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}= req.body
    try {
        const user = await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, async(err, result) =>{
                res.send({"msg":"Login successful"})
            });
        }
    } catch (error) {
        res.send(error)
    }
})

module.exports={userRouter}