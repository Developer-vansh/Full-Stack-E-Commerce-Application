import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";


const generateAccessAndRefreshToken = async (user) => {
  try {
    const refreshToken = user.generateRefreshToken();
    const accessToken = user.generateAccessToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something Went Wrong While GEnerating Token");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  //get user details from frontend
  const { fullname, email, password,role } = req.body;

  //validation-not empty
  if (
    [fullname, email, password].some((value) => value.trim() === "")
  ) {
    throw new ApiError(400, "All Fields are required");
  }

  //check if user already exists: username,email
  const existedUser = await User.findOne( { email });
  if (existedUser) {
    throw new ApiError(409, "User with email already exists");
  }

  //create user object -create entry in db
  const user = await User.create({
    fullname,
    email,
    password,
    role
  });

  // remove password and refresh token field from response
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  // check for user creation
  if (!createdUser) throw new ApiError(500, "User creation failed");

  // return response
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User created successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  // get user email/username and pasword from frontend
  const { email, password } = req.body;
  //validation non-empty
  if ( !email || ! password)
    throw new ApiError(400, "Field is requred");
  // find user
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(400, "User does not exist");
  // verify password wheter it is correct or not
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) throw new ApiError(401, "Invalid User credentials");
  //generate access token and refresh token
  const { accessToken, refreshToken } =
    await generateAccessAndRefreshToken(user);
  //fetch updated user && send cookies
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  const option = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json(
      new ApiResponse(
        200,
        { loggedInUser, accessToken, refreshToken },
        "User Logged In Successfully"
      )
    );
});

const logOutUser = asyncHandler(async (req, res) => {
  //remove refresh token from db
  User.findByIdAndUpdate(
    req.user._id,
    { $unset: { refreshToken: 1 } },
    { new: true }
  );
  //remove cookies from frontend
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Logged Out Successfully"));
});

export {
  registerUser,
  loginUser,
  logOutUser
};
