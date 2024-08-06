// Suggested code may be subject to a license. Learn more: ~LicenseLog:3466424220.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:1331179989.
import express from "express";
import { getMe,signup,login, logout } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js"
const router= express.Router();

router.get("/me",protectRoute,getMe);
router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);

export default router;
