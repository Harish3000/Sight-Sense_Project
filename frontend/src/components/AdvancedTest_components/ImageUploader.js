import React, { useState } from "react";
import axios from "axios";

function ImageUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await axios.post(
        "http://localhost:4000/api/advancedTest/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Format and update the prediction result
      const formattedPredictions = response.data.predictions.map(
        (prediction) => {
          const probabilityPercentage = (prediction.probability * 100).toFixed(
            2
          );
          return `${prediction.tagName}: ${probabilityPercentage}%`;
        }
      );

      setPredictionResult(formattedPredictions.join("\n"));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>Azure Advanced Analysis</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {predictionResult && (
        <div>
          <h2>Predictions:</h2>
          <pre>{predictionResult}</pre>
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
