// AdvancedTest.js
const express = require("express");
const multer = require("multer");
const router = express.Router();
const advancedTestController = require("../../controllers/AdvancedTest_controller");

// Configure Multer for handling file uploads
const storage = multer.memoryStorage(); // Store the uploaded file in memory
const upload = multer({ storage });

// Route for uploading and analyzing the image
router.post(
  "/upload",
  upload.single("image"),
  advancedTestController.uploadImage
);

module.exports = router;
