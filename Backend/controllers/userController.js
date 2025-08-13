const Controller = require('../services/userServices')
const User = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();


const addUserController = async(req, res) =>{
    try{
    const {name, email, password, role} = req.body
    if(!name || !email || !password){
        return res.status(500).json("Missing fields! Requires name, email and password");
    }

    const existEmail = await Controller.existingEmail(email);
    if(existEmail){
       return res.status(409).json("Duplicate Email found!")
    }

    //hashed password
    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
        name,
        email,
        password: hashPassword,
        role
    });
    await user.save();
    res.status(200).json("User created Successfully");
    } catch(err){
        res.status(400).json({err: err.message});
    }
};

const getAllUserController = async(req, res) =>{
    try{
    const User = await Controller.getAllUser();
    res.status(200).json(User);
    }catch(err){
        res.status(500).json({err: err.message});
    }
};

const getUserController = async(req, res) =>{
    try{
    const User = await Controller.getUserById(req.params.id);
    res.status(200).json(User);
    }catch(err){
        res.status(500).json({err: err.message});
    }
};

const updateUserController = async(req, res) =>{
    try{
    const User = await Controller.updateUser(req.params.id, req.body);
    res.status(200).json(User);
    }catch(err){
        res.status(500).json({err: err.message});
    }
};

const deleteUserController = async(req, res) =>{
    try{
    const User = await Controller.deleteUser(req.params.id);
    res.status(200).json(User);
    }catch(err){
        res.status(500).json({err: err.message});
    }
};

module.exports = {
    addUserController,
    getAllUserController,
    getUserController,
    updateUserController,
    deleteUserController,
}