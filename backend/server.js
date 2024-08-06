import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";


import connectMongoDB from "./db/connectMongoDb.js";
import authRoutes from "./routes/auth.routes.js"

const app= express ();
dotenv.config();
const PORT = process.env.PORT|| 8000;


app.use(express.json());
app.use(express.urlencoded({extended:true}))// to parse form data
app.use(cookieParser());
app.use("/api/auth",authRoutes);

// console.log(process.env.MONGO_URI);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectMongoDB();
});
