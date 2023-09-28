// AdvancedTest_controller.js
const axios = require("axios");

// Azure Custom Vision API Endpoint and Prediction Key
const predictionEndpoint =
  "https://sightsense-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/0a2c8d86-ddfe-40f6-a515-cbfaf185d778/classify/iterations/Iteration3/image";

const predictionKey = "686c917c52df4492adf6a8ab0d29c736";

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
