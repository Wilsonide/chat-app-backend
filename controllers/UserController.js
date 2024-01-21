const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
exports.registerUser =  asyncHandler(async(req,res) => {
    const { name,email,password } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('All fields are required');
    }
    const userAvailable = await User.findOne({email});
    if (userAvailable) {
        res.status(400);
        throw new Error('User already exists');
    }
    if (!validator.isEmail(email)) {
        res.status(400);
        throw new Error('Email is not valid');
    }
    if (!validator.isStrongPassword(password)) {
        res.status(400);
        throw new Error('Password is not strong enough');
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const user = await User.create({name,email,password:hashedPassword});
    if (user) {
        res.status(201).json({id:user.id,name});
    } else {
        res.status(400);
        throw new Error('Invalid user data');
}
});


exports.loginUser = asyncHandler(async(req,res) => {
  const { email,password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error('All fields are required');
  }
  const user = await User.findOne({email});
  if (user && (await bcrypt.compare(password,user.password))) {
    const token = jwt.sign({id:user._id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'3d'});
    res.status(200).json({id:user._id,name:user.name,token});
  }
  else {
    res.status(401);
    throw new Error('Invalid credentials');
  }
});

exports.findUser = asyncHandler(async(req,res)=>{
  const userId = req.params.userId
  const user = await User.findById(userId)
  if (!user) {
    res.status(404);
    throw new Error('No such user');
  }
  res.status(200).json(user);
})