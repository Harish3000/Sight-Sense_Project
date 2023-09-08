import React, { useState } from "react";
import { Upload, Button, Spin, message, Image } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

function ImageUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (info) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleUpload = async () => {
    try {
      if (!selectedFile) {
        message.error("Please select a file first.");
        return;
      }

      setLoading(true);

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
      message.error("An error occurred while processing the image.");
    } finally {
      setLoading(false);
    }
  };

  const renderImagePreview = () => {
    if (selectedFile) {
      return (
        <div>
          <Image src={URL.createObjectURL(selectedFile)} />
        </div>
      );
    }
    return (
      <div>
        <Image
          src="https://via.placeholder.com/150"
          alt="Default Image"
          width={150}
          height={150}
        />
      </div>
    );
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Azure Advanced Analysis</h1>
      <h2>Image Preview:</h2>
      {renderImagePreview()}
      <div style={{ marginTop: "20px" }}>
        <Upload
          accept="image/*"
          customRequest={() => {}}
          showUploadList={false}
          onChange={(info) => {
            setSelectedFile(info.file.originFileObj);
            handleFileChange(info);
          }}
        >
          <Button icon={<UploadOutlined />}>Select Image</Button>
        </Upload>
      </div>
      <div style={{ marginTop: "10px" }}>
        <Button type="primary" onClick={handleUpload} disabled={!selectedFile}>
          Upload
        </Button>
      </div>
      {loading && (
        <div style={{ marginTop: "20px" }}>
          <Spin tip="Processing..." />
        </div>
      )}
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
