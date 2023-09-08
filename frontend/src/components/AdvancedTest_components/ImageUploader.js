import React, { useState, useRef } from "react";
import { Upload, Button, Spin, message, Image, Modal } from "antd";
import { UploadOutlined, CameraOutlined } from "@ant-design/icons";
import axios from "axios";
import Webcam from "react-webcam";
import "./ImageUploader.css";

function ImageUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cameraVisible, setCameraVisible] = useState(false);
  const [disableButtons, setDisableButtons] = useState(false);
  const webcamRef = useRef(null);

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
      setDisableButtons(true);

      // Close the camera modal after uploading
      closeCamera();
    } catch (error) {
      console.error("Error:", error);
      message.error("An error occurred while processing the image.");
    } finally {
      setLoading(false);
    }
  };

  const openCamera = () => {
    setCameraVisible(true);
  };

  const closeCamera = () => {
    setCameraVisible(false);
  };

  const takePicture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setSelectedFile(dataURLtoFile(imageSrc, "snapshot.png"));
    closeCamera();
  };

  const redoTest = () => {
    window.location.reload();
  };

  const dataURLtoFile = (dataUrl, fileName) => {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
  };

  const renderImagePreview = () => {
    if (selectedFile) {
      return (
        <div className="image-preview">
          <Image src={URL.createObjectURL(selectedFile)} />
        </div>
      );
    }
    return (
      <div className="image-preview">
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
    <div className="card">
      <h1>Azure Advanced Analysis</h1>
      <h2>Image Preview:</h2>
      {renderImagePreview()}
      <div style={{ marginTop: "20px" }}>
        <Button
          icon={<UploadOutlined />}
          onClick={openCamera}
          disabled={disableButtons}
        >
          Open Camera
        </Button>
      </div>
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
          <Button icon={<UploadOutlined />} disabled={disableButtons}>
            Select Image
          </Button>
        </Upload>
      </div>
      <div style={{ marginTop: "10px" }}>
        <Button
          type="primary"
          onClick={handleUpload}
          disabled={!selectedFile || disableButtons}
        >
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
      {disableButtons && (
        <div style={{ marginTop: "20px" }}>
          <Button type="primary" onClick={redoTest}>
            Re-Do Test
          </Button>
        </div>
      )}
      <Modal
        title="Camera"
        visible={cameraVisible}
        onCancel={closeCamera}
        footer={[
          <Button key="back" onClick={closeCamera}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={takePicture}
            disabled={disableButtons}
          >
            Take Picture
          </Button>,
        ]}
        width={800}
        bodyStyle={{ height: 500 }}
      >
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/png"
          width={768}
          height={476}
        />
      </Modal>
    </div>
  );
}

export default ImageUploader;
