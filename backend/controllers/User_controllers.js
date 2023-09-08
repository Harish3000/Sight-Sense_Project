const User = require("../models/User_model");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        res.json({ message: "Success" });
      } else {
        res.json({ error: "Incorrect" });
      }
    } else {
      res.json({ error: "No record existing!!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createUser,
  loginUser
};
