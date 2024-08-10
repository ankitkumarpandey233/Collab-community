import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors"; // Import the CORS middleware


import userRoutes from "./routes/user.routes.js"
import authRoutes from "./routes/auth.routes.js"
import postRoutes from "./routes/post.routes.js";
import notificationRoutes from "./routes/notification.routes.js";



import connectMongoDB from "./db/connectMongoDb.js";




const app= express ();
dotenv.config();

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(cors({
    origin: "http://localhost:3000", // Replace with your frontend's origin
    credentials: true,
}));


const PORT = process.env.PORT|| 8000;

app.use(cors());
app.use(express.json("5mb"));
app.use(express.urlencoded({extended:true}))// to parse form data
app.use(cookieParser());
app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);

// console.log(process.env.MONGO_URI);

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
    connectMongoDB();
});

