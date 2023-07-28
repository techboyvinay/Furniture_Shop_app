import JWT from "jsonwebtoken";
import usersModel from "../models/usersModel.js";

//protected Routs token base
export const requireSignIn = async(req, res, next) => {
    try{
        const decode = JWT.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        );
        req.user = decode;
        next();
    }catch(error){
        console.log(error);
    }
};

//admin access
export const isAdmin = async (req,res,next) => {
    try{
        const user = await usersModel.findById(req.user._id);
        if(user.role !== 1){
            return res.status(401).send({
                success: false,
                message: "UnAthorized Access",
            });
        }else{
            next();
        }
    }catch(error){
        console.log(error);
        res.status(401).send({
            success:false,
            error,
            message:"Error in admin middleware",
        });

    }
}