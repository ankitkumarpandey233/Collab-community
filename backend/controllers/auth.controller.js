import user from "../models/user.model.js";
import bcrypt from 'bcryptjs';


export const signup = async (req, res) => {
    try {
        const { fullName, username, email, password } = req.body;

        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email" });
        }

        // Suggested code may be subject to a license. Learn more: ~LicenseLog:2264423953.
        // Suggested code may be subject to a license. Learn more: ~LicenseLog:2535609617.
        const existingUser = await User.findOne({ username: username });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const existingEmail = await User.findOne({ email: email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        //hash Password

// Suggested code may be subject to a license. Learn more: ~LicenseLog:4236665818.
        if(password.length<6){return res.status(400).json({ message: "password must be 6 digit long" });}
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            username,
            email,
            password: hashedPassword,
        });
        if(newUser){
            generateTokenAndSetCookie(newUser._id,res);
            await newUser.save();
            
            return res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                email: newUser.email,
                followers: newUser.followers,
                following: newUser.following,
                profileImg: newUser.profileImg,
                coverImg: newUser.coverImg,
            })
        }else{
            return res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};
export const login = async (req, res) => {
    try{
// Suggested code may be subject to a license. Learn more: ~LicenseLog:3310913787.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:2614342619.
        const { username, password } = req.body;
// Suggested code may be subject to a license. Learn more: ~LicenseLog:1538526218.
        const user = await User.findOne({ username: username });
        const isPasswordcorrect = await bcrypt.compare(password, user?.password|| "");
        if(!user || !isPasswordcorrect){
            return res.status(400).json({ message: "Invalid username or password" });
        }
        generateTokenAndSetCookie(user._id,res);

        res.status(200).json({ 
            _id:user._id,
            fullName:user.fullName,
            username:user.username,
            email:user.email,
            followers:user.followers,
            following:user.following,
            profileImg:user.profileImg,
            coverImg:user.coverImg
        });
    }catch(error){
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};
export const logout = async (req, res) => {
  try {
    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
export const getMe= async(req,res)=>{

    try{
        const user = await user.findById(req.user._id).select("-password");
    }catch(error){
        console.log(error);
        res.status(500).json({ message: error.message });   
    }
};