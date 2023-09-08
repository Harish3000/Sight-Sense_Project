const express = require("express");
const user = require("../../models/User_model");
const { createUser, loginUser} = require("../../controllers/User_controllers");
const router = express.Router();

// POST a new user
router.post("/createuser", createUser);

// Login route
router.post("/login", loginUser);

module.exports = router;
