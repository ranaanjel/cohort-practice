import express from "express";
import mongoose from "mongoose";
export let accountRouter = express.Router();
import { userAuthentication } from "../middlewares/userMiddleware.js";
import { AccountModel } from "../db/db.js";

accountRouter.get("/balance", userAuthentication,async function (req,res) {
    let userId = req.userId;
    try {

        let account = await AccountModel.findOne({
            userId
        })

        res.json({
            balance:account.balance
        })
        
    }catch(err) {
        res.status(411).json({
            message:"user does not exist || "+ err
        })
    }

})

accountRouter.post("/transfer",userAuthentication, async function (req,res) {
    let payer = req.userId;
    let {to:payee, amount} = req.body;

    const session = await mongoose.startSession();
    
    //does the current user has the balance amount and then only deducting from it
    session.startTransaction();

    let payerInfo = await AccountModel.findOne({
        userId:payer
    }).session(session)
    console.log(payerInfo, payer)
    if(payerInfo.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message:"insufficient balance"
        })
    }

    //does the payee exist in the database if not then exiting as well

    let payeeInfo = await AccountModel.findOne({
        userId:payee
    }).session(session)

    if(!payeeInfo) {
        await session.abortTransaction();
        return res.status(400).json({
            message:"payee don't exist as a user"
        })
    }
    
        let payerAccount = await AccountModel.updateOne({userId:payer},{
            $inc:{balance:-amount}
        }).session(session)
        let payeeAccount = await AccountModel.updateOne({userId:payee},{
            $inc:{balance:amount}
        }).session(session)

        console.log(payerAccount, payeeAccount, amount)

        await session.commitTransaction();
        return res.json({
            messsage:"payment made successfully"
        })

})
