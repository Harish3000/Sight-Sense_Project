// AdvancedTest_controller.js
const axios = require("axios");

// Azure Custom Vision API Endpoint and Prediction Key
const predictionEndpoint =
  "https://imagequality-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/504be7fd-f17e-4de6-8ca3-9d6a06755f1e/classify/iterations/Iteration2/image";
const predictionKey = "a0d49abe649148338884e07910be2ddd";

// Controller function to upload and analyze the image
const uploadImage = async (req, res) => {
  try {
    // Send the image to the Azure Custom Vision API
    const response = await axios.post(predictionEndpoint, req.file.buffer, {
      headers: {
        "Prediction-Key": predictionKey,
        "Content-Type": "application/octet-stream",
      },
    });

    // Send the API response to the frontend
    res.json(response.data);
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the image." });
  }
};

module.exports = {
  uploadImage,
};
