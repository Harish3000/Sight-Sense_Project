const express = require("express");
const router = express.Router();
const { readUser } = require("../../controllers/Admin_controllers");
const roleAuthMiddleware = require('../../middleware/roleAuthMiddleware');


//Read all User Details
router.get("/get-all",roleAuthMiddleware(["admin"]), readUser);

module.exports = router;