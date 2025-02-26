import jwt from "jsonwebtoken"
import zod from "zod"

export function userAuthentication(req,res,next) {
    const authorization = req.headers.authorization;
    
    if(!authorization || !authorization.startsWith("Bearer ")) {
        res.status(403).send("value")
    }
    const token = authorization.split(" ")[1];
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if(!decode.userId) {
            return res.status(403).json({})
        }
        req.userId = decode.userId;
        next();
    }catch (err) {
        return res.status(403).json({})
    }

}
export function validUserInput(req,res,next) {
    let inputSchema = zod.object({
        username:zod.string().min(3).max(30),
        password :zod.string().min(6),
        firstName: zod.string().min(2).optional(),
        lastName: zod.string().min(2).optional(),
    })

    var checkResult = inputSchema.safeParse(req.body);
    console.log(checkResult)
    if(checkResult.success) {
        next()
    }else {
        res.status(411).send("not valid input")
    }

}