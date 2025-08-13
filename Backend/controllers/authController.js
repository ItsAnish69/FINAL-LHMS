const Controller = require('../services/userServices')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require("dotenv").config();
const mail = require('../utils/mailer')
const crypto = require('crypto');


//user register
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role){
        return res.status(500).json("Missing fields! Requires name, email ,password and role");
    }

    // Check for user in DB
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });
    
    await user.save();

    //send the email to the new user registration
    await mail.sendEmail(
      email,
      "Welcome to the Library Management System",
      `Hello ${name},\n\nThank you for registering as a ${role} in our Library Management System.
      \n\nHere is your password: ${password} \nFor further login to our Library Management System.\nPlease Kindly use the provided password\n\nBest regards,\nLibrary Team`
        );

    res.status(200).json({
      message: "Registration Successfull",
      user:{
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }})

  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
};


// user login
const loginUser = async(req, res) =>{
    try{
    const {email, password} = req.body;

        if (!email || !password){
        return res.status(500).json("Missing fields! Requires email and password");
    }

        //find user in the DB
        const user = await User.findOne({email}).select("+password");
        if(!user) return res.status(400).json("User not found");

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(401).json({Message: "Invalid password"});

        //create a JWT token
        const token = jwt.sign(
            {id: user._id, 
            email: user.email,
            role: user.role
          },
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRES_IN || "3d"}
        );

        res.status(200).json({
            message: "Login Successful",
            token,
            user:{
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
        }})
    } catch(err){
        res.status(500).json("Login Failed: " + err.message);
    }
}

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json("Missing field! Please, enter the email");
    

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json("Email not found");

        // Generate a random OTP or token
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        
        //save the otp in the new field in user document
        user.otp = otp;
        user.otpExpires = Date.now() + 15 * 60 * 1000; // 15 minutes
        await user.save();

        // Send OTP via email
        await mail.sendOtp(
            email,
            "OTP for the forgot-Password",
            `Your password reset OTP is: ${otp}. It is valid for 15 minutes.`
        );

        res.status(200).json({ message: "OTP sent to your email address" });
    } catch (err) {
        res.status(500).json({ message: "Failed to send OTP", error: err.message });
    }
};

    const otpVerify = async(req, res) => {
        //extract the otp from the http request
        const { otp } = req.body;
        if( !otp) return res.status(400).json('Missing field! email and OTP is required.')

    try{
        const user = await User.findOne({
            otp: otp, 
            otpExpires: { $gt: Date.now() }
        });

        if(!user){ 
            return res.status(400).json("Invalid OTP");}


        res.status(200).json('OTP verification successfull');
    } catch (err) {
        res.status(500).json({ message: "OTP verification failed", error: err.message });
    }
}

    const changePassword = async(req, res) =>{
        const {newpass, confirmpass , otp} = req.body;
        if(!newpass|| !confirmpass) return res.status(400).json('Missing fields! New password is required');

        try{
        const user = await User.findOneAndUpdate({otp: otp}).select('+password');
        if(!user) return res.status(400).json("Invalid user")

            user.password = await bcrypt.hash(newpass, 10);
            await user.save();
            res.status(200).json("Password changed successfully");
        } catch (err) {
            res.status(500).json({ message: "Password change failed", error: err.message });
        }
    }


module.exports = {
    loginUser,
    registerUser,
    forgotPassword,
    otpVerify,
    changePassword
};