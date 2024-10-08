import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";


import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";


export const getUserProfile = async (req, res) => {
    const { username } = req.params;

    try {
        const user = await User.findOne({ username }).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (error) {
        console.log("error in get user profile function ");
        res.status(500).json({ message: error.message });
    }
};



export const folllowUnfollowUser = async (req, res) => {
	try {
		const { id } = req.params;
		const userToModify = await User.findById(id);
		const currentUser = await User.findById(req.user._id);

		if (id === req.user._id.toString()) {
			return res.status(400).json({ error: "You can't follow/unfollow yourself" });
		}

		if (!userToModify || !currentUser) return res.status(400).json({ error: "User not found" });

		const isFollowing = currentUser.following.includes(id);

		if (isFollowing) {
			// Unfollow the user
			await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
			await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });

			res.status(200).json({ message: "User unfollowed successfully" });
		} else {
			// Follow the user
			await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
			await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
			// Send notification to the user
			const newNotification = new Notification({
				type: "follow",
				from: req.user._id,
				to: userToModify._id,
			});

			await newNotification.save();

			res.status(200).json({ message: "User followed successfully" });
		}
	} catch (error) {
		console.log("Error in followUnfollowUser: ", error.message);
		res.status(500).json({ error: error.message });
	}
};



export const getSuggestedUsers = async (req, res) => {
    try {
        const userId = req.user._id;

        const userFollowedByMe = await User.findById(userId).select("following");

        const users = await User.aggregate([
            {
                $match: {
                    _id: { $ne: userId },
                },
            },
            { $sample: { size: 10 } },
        ]);

        const filteredUsers = users.filter((user) => !userFollowedByMe.following.includes(user._id));
        const suggestedUsers = filteredUsers.slice(0, 4);

        suggestedUsers.forEach((user) => (user.password = null));

        res.status(200).json(suggestedUsers);
    } catch (error) {
        console.log("Error in getSuggestedUsers: ", error.message);
        res.status(500).json({ error: error.message });
    }
};


export const updateUser = async (req, res) => {
    const { fullName, username, email, currentPassword, newPassword, bio, link } = req.body;
    let { profileImg, coverImg } = req.body;

    const userId = req.user._id;
    try {
        let user = await User.findById(userId);
        if(!user)return res.status(404).json({ message: "User not found" });

        if((!newPassword && currentPassword) || (newPassword && !currentPassword)){
            return res.status(400).json({ message: "Please provide both current and new password" });
        }

        if(currentPassword && newPassword){
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if(!isMatch){
                return res.status(400).json({ message: "Invalid current password" });
            }
            if(newPassword.length<6 ){
                return res.status(400).json({ message: "New password must be at least 6 characters long" });
            }
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);
        }

        if(profileImg){
           if(user.profileImg){
            await cloudinary.uploader.destroy(user.profileImg.split("/").pop().split(".")[0]);
           }
          const uploadResponse =  await cloudinary.uploader.upload(profileImg);   
          profileImg= uploadResponse.secure_url;
        }

        if(coverImg){
            if(user.coverImg){
                await cloudinary.uploader.destroy(user.coverImg.split("/").pop().split(".")[0]);
               }
            const uploadResponse =  await cloudinary.uploader.upload(coverImg);   
            coverImg= uploadResponse.secure_url;
        }

        user.fullName = fullName || user.fullName;
        user.username = username || user.username;
        user.email = email || user.email;
        user.bio = bio || user.bio;
        user.link = link || user.link;
        user.profileImg = profileImg || user.profileImg;
        user.coverImg = coverImg || user.coverImg;

        await user.save();

        user.password= null;

        return res.status(200).json(user);  

    } catch (error) {
        console.log("error in update user function ");
        res.status(500).json({ message: error.message });
    }
};



// Get followers of a user
export const getUserFollowers = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId).populate('followers');
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user.followers);
    } catch (error) {
        console.log("error in getUserFollowers function ");
        res.status(500).json({ error: error.message });
    }
};

// Get following users of a user
export const getUserFollowing = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId).populate('following');
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user.following);
    } catch (error) {
        console.log("error in getUserFollowing function ");
        res.status(500).json({ error: error.message });
    }
};

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.log("error in getAllUsers function ");
        res.status(500).json({ error: error.message });
    }
};
