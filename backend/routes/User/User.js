const express = require("express");
const user = require("../../models/User_model");
const { createUser, checkUserByEmail, loginUser } = require("../../controllers/User_controllers");
const router = express.Router();

// POST a new user
router.post("/createuser", createUser);

// Login route
router.post("/login", loginUser);

// Check if a user with the given email exists
router.get("/check-email/:email", checkUserByEmail);

module.exports = router;
