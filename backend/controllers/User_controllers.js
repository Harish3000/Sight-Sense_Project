const User = require("../models/User_model");
const mongoose = require("mongoose");

// create a new Item
const createUser = async (req, res) => {
  const { firstname,
          lastname,
          contact,
          addLine1,
          addLine2,
          addLine3,
          gender,
          email,
          pwd
   } = req.body;

  //add the item to the database
  try {
    const obj = await User.create({ firstname,
      lastname,
      contact,
      addLine1,
      addLine2,
      addLine3,
      gender,
      email,
      pwd });
    res.status(200).json(obj);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createUser,
};
