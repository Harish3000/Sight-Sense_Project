const User = require("../models/User_model");

//Read user data
const readUser = async (req, res) => {
    User
      .find()
      .then((AllUserData) => {
        res.json(AllUserData);
      })
      .catch((err) => {
        console.log(err);
      });
  
  };

module.exports = {readUser};