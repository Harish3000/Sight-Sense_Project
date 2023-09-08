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

// Get single user data
const readUser = async (req, res) => {
  const { email } = req.params;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // If user is not found, return a 404 error
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Respond with the user object if found
    res.status(200).json(user);
  } catch (error) {
    // Handle unexpected errors and return a 500 Internal Server Error
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
  createUser,
  checkUserByEmail,
  loginUser,
  readUser
};
