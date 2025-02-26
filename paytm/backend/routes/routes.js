import express from "express";
import { userAuthentication, validUserInput } from "../middlewares/userMiddleware.js";
import { AccountModel, UserModel } from "../db/db.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";
import zod from "zod";
export let userRoute = express.Router();


//user routes here

const updateBodySchema = zod.object({
    password:zod.string().optional(),
    firstName:zod.string().optional(),
    lastName:zod.string().optional(),
})


userRoute.get("/",userAuthentication ,function(req,res) {
    console.log("hitting the /user route");
    res.send("homepage of user");
})

userRoute.post("/signup",validUserInput, async function(req,res) {
    let {username, password, firstName,lastName}= req.body;
    let hashPassword = await bcrypt.hash(password, 5)

    try {
         let user = await UserModel.create({
        username, password:hashPassword, firstName, lastName
    })
    let randomBalance = Math.floor(Math.random()*10000) // always between 0 and 9999
    let accountObject = await AccountModel.create({
        balance:randomBalance,
        userId:user._id
    })

    res.send("you're have signed up so please login") ;
    } catch (err) {
        res.status(411).json({
            message:"username is already there"
        })
    }
   

    
})
userRoute.post("/signin",validUserInput, async function(req,res) {
    
    let {username, password, firstName,lastName}= req.body;

    let user = await UserModel.findOne({username})
    if(!user) {
        return res.status(411).json({
            message:"user invalid"
        })
    }
    let hashPassword = await bcrypt.compare(password, user.password)

    if(user && hashPassword) {
    
        let token = jwt.sign({
            userId:user._id
        }, process.env.JWT_SECRET)
         

    res.json({message:"you're have signin so now heading to dashboard",token:"Bearer "+token});

    } else {
        res.status(403).json({
            message:"user credential invalid"
        })
    }
})

userRoute.put("/", userAuthentication,async function(req,res) {
   let {success} = updateBodySchema.safeParse(req.body);
   let userId = req.userId;
   if(success) {
    let user = await UserModel.updateOne({_id:userId}, req.body);
    res.json({"message":"updated the user"});
   } else {
    res.status(403).json({message:"something went wrong"})
   }
})

userRoute.get("/bulk", userAuthentication, async function(req,res) {
    let filter = req.query.filter || "";
    console.log(filter)
    try {
        
        let users = await UserModel.find({
            "$or":[{
                "firstName":{
                    "$regex":filter
                }   
            },{
                "lastName":{
                    "$regex":filter
                }
            }]
        })
        console.log(users)

        res.json({
            user:users.map(m => ({
                username:m.username,
                userId:m._id,
                firstName:m.firstName,
                lastName:m.lastName
            }))
        })


    }catch(err) {
        res.status(403).json({
            message:'something went wrong'
        })
    }
})