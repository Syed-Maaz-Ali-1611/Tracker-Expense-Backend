const User = require("../models/User")
const jwt = require("jsonwebtoken")

// Generate JWT token

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: "1h"});
}


//Register User
exports.registerUser = async (req, res) =>{
      console.log('Request body:', req.body); // Add this line
    const { fullName , email , password, profileImageUrl } = req.body;

    //validation checking for missing feilds
    if (!fullName || !email || !password){
        return res.status(400).json({message : "All Feilds are required"});
    } 

    try {
        //check if email is already exist 
        const exisitingUser = await User.findOne({email});
        if(exisitingUser){
            return res.status(400).json({message : "Email already in use"});
        }

        //create user

        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl,
        })

        res.status(201).json({
            id: user._id, 
            user,
            token : generateToken(user._id),
        })
    } catch(err){
        res.status(500).json({message : "Error registering User", error : err.message}); 
    }
}

//Login User
exports.loginUser = async (req, res) =>{
    const {email, password} = req.body;

    // check if email and pass is given 
    if(!email || !password){
        return res.status(400).json({message : "All feilds are required"});
    }

    try{
        const user = await User.findOne({ email });
        if(!user || !(await user.comparePassword(password))){
            return res.status(400).json({message : "Invalid credentials"});
        }

        res.status(200).json({
            id: user._id,
            user,
            token : generateToken(user._id),
        })
    } catch(err){
        res.status(500).json({message : "Error registering User", error : err.message}); 
    }
}

//Register User
exports.getUserInfo = async (req, res) =>{
    try {

        const user = await user.findById(req.user.id).select("-password");
        if (!user){
            return res.status(404).json({message : "User Not Found"});
        }

        res.status(200).json(user);
        
    }catch(err){
        res.status(500).json({message : "Error registering User", error : err.message}); 
    }
}