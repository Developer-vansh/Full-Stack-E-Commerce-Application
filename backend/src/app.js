import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors";
const app= express({limit:'20kb'});
// for body parser
app.use(express.json());
//for url params
app.use(express.urlencoded({extended:true}));
//for image,files
app.use(express.static("public"));
app.use(cookieParser());
app.use(cors( {origin: process.env.CORS_ORIGINS, credentials: true}));
//Server Wokring
app.get('/',(req,res)=>{res.send("Welcome To E-commerce API")});

//routes
import userRouter from './routes/user.routes.js'
import productRouter from './routes/product.routes.js'
import cartRouter from './routes/cart.routes.js'

//route declaration
app.use('/',userRouter,productRouter,cartRouter);

export default app;
