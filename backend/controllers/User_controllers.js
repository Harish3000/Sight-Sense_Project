const User = require("../models/User_model");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

//Generate JWT
const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, {expiresIn: '1d'})
}

//Register user 
const createUser = async (req, res) => {
  const {
    firstname,
    lastname,
    contact,
    addLine1,
    addLine2,
    addLine3,
    gender,
    email,
    password,
  } = req.body;

  try {
    const user = await User.register(
      firstname,
      lastname,
      contact,
      addLine1,
      addLine2,
      addLine3,
      gender,
      email,
      password
    );

    //create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token }); // sending JWT back to the browser
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
}

//Login user
const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password);

    //create a token
    const token = createToken(user._id);

    res.status(200).json({ user, token }); // sending JWT back to the browser
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
}

module.exports = {
  createUser,
  loginUser
};
