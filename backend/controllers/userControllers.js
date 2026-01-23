import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";


// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
  
    if (user && (await user.matchPassword(password))) {
     // generateToken(res, user._id);
  
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        occupation: user.occupation,
        image: user.image,
        detailedDescription:user.detailedDescription,
        contact_no: user.contact_no,
        about: user.about,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  });
  // @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, uploadedImage, occupation, about,contact_no } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    image: uploadedImage,
    occupation,
    about,
    contact_no,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      occupation: user.occupation,
      about: user.about,
      image: user.uploadedImage,
      contact_no: user.contact_no,
    });
    
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});
const editProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne({email: req.body.email});

  if (user) {
      user.occupation= req.body.occupation
      user.about= req.body.about
      user.image= req.body.uploadedImage
      user.contact_no= req.body.contact_no
     if(req.body.password){
      user.password= req.body.password
     }
    const updatedUser = await user.save();

    res.status(201).json({
      name: updatedUser.name,
      email: updatedUser.email,
      occupation: updatedUser.occupation,
      about: updatedUser.about,
      image: updatedUser.uploadedImage,
      contact_no: updatedUser.contact_no,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

  export {authUser,getUserProfile,registerUser,editProfile}