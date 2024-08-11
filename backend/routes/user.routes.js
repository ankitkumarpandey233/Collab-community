import express from "express";
import { protectRoute } from "../middleware/protectRoute.js"
import { getUserProfile, folllowUnfollowUser, getSuggestedUsers,updateUser,getUserFollowers,getUserFollowing,getAllUsers} from "../controllers/user.controller.js";

const router= express.Router();


router.get("/profile/:username", protectRoute, getUserProfile);
router.get("/suggested",protectRoute, getSuggestedUsers);
router.post("/follow/:id",protectRoute, folllowUnfollowUser);
router.post("/update",protectRoute,updateUser);
router.get('/:userId/followers',protectRoute, getUserFollowers);
router.get('/:userId/following',protectRoute, getUserFollowing);
router.get('/', getAllUsers);


export default router;