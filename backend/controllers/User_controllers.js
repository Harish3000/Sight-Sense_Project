const User = require("../models/User_model");
const mongoose = require("mongoose");

// create a new Item
const createUser = async (req, res) => {
  const { name } = req.body;

  //add the item to the database
  try {
    const obj = await User.create({ name });
    res.status(200).json(obj);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createUser,
};
