import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
mongoose.connect(process.env.DATABASE_NOSQL_URL)

//schema for the user

const UserSchema = mongoose.Schema({
    username:{type:String, unique:true, required:true, minLength:3},
    password: {type:String, required:true, minLength:6},
    firstName: {type:String, required:true},
    lastName : {type:String, required:true}
});
  
const WalletSchema = mongoose.Schema({
    balance:{type:Number, required:true},
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        unique:true,
        ref:"User"
    }   
})

const UserModel =  mongoose.model("User",UserSchema);
const AccountModel =  mongoose.model("Account",WalletSchema);

export {UserModel, AccountModel}