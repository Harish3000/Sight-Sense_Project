const User = require("../models/User_model");
const mongoose = require("mongoose");

// create a new User
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

  // Add user to the database
  try {
    const obj = await User.create({
      firstname,
      lastname,
      contact,
      addLine1,
      addLine2,
      addLine3,
      gender,
      email,
      password,
    });

    res.json("Added");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating user" });
  }
};

// Check if a user with the given email exists
const checkUserByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.json({ exists: true }); // Email exists
    } else {
      res.json({ exists: false }); // Email doesn't exist
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Login function
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (user) {
      if (user.password === password) {
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
  checkUserByEmail,
  loginUser
};
