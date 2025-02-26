import express from "express";
import dotenv from "dotenv"
dotenv.config()
import cors from "cors"

console.log(process.env.DATABASE_NOSQL_URL)

import { userRoute } from "./routes/routes.js";
import { accountRouter } from "./routes/account.js";
let app = express();

app.use(cors())
app.use(express.json())

app.use("/user", userRoute);
app.use("/account", accountRouter);

app.use(function(err,req,res,next) {
    console.log(err, " : error occured")
})

app.listen(3000, function() {
    console.log("listening at port 3000 - node server http");
})