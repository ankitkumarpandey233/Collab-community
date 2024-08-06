import user from "../models/user.model.js";
import jwt from "jsonwebtoken";

 
// Suggested code may be subject to a license. Learn more: ~LicenseLog:1835061067.
export  const protectRoute = async (req, res, next) =>{
    try{
        const token = req.cookies.jwt;
        if(!token){
// Suggested code may be subject to a license. Learn more: ~LicenseLog:159440590.
            return res.status(401).json({ message: "Unauthorized" });
        }
// Suggested code may be subject to a license. Learn more: ~LicenseLog:2308842458.
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
// Suggested code may be subject to a license. Learn more: ~LicenseLog:988226421.
        if(!decoded){
            return res.status(401).json({ message: "Unauthorized" });
        }
        const user = await User.findById(decoded.userId).select("-password");
        if(!user){
            return res.status(401).json({ message: "user not found" });
        }
        req.user = user;
        next();
        }catch(error){
            console.log(error);;
        }
    }
