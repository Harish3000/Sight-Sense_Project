const express = require("express");
const item = require("../../models/User_model");
const { createUser } = require("../../controllers/User_controllers");
const router = express.Router();

// POST a new user
router.post("/createuser", createUser);

module.exports = router;
