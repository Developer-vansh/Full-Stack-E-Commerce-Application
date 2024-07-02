import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import jwt from "jsonwebtoken"
import {User} from "../models/user.model.js"

const authenticateUser = asyncHandler(async (req, res, next) => {
    //we'r using req.header becuase in mobile there is no cookie stored so u have to get it from header
const token=req.cookies?.accessToken ||req.header("Authorization")?.replace("Bearer ", "");
if(!token) throw new ApiError(401,"Unauthorized request");
const decode=  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
const user=await User.findById(decode?._id).select("-password -refreshToken");
if(!user) throw new ApiError(401,"Invalid Access Token");
req.user=user;
next();
});

const checkAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Access denied' });
    }
  };
  
  export  {
    authenticateUser,
    checkAdmin
  };