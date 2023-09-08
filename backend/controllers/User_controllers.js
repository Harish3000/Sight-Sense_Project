const User = require("../models/User_model");
const mongoose = require("mongoose");

//register user 
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

    res.status(200).json({ email, user });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
}

module.exports = {
  createUser
};
