import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer as ReactToastContainer, toast } from "react-toastify";
import "../../styles/GeneralTest/Clinical/forms.css";
import VideoBG from "../../assets/Backround_video.mp4";
import { Button, Modal, Form, Input, message } from "antd";

function Admin() {
  const [admins, setAdmins] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/Clinics/admin")
      .then((response) => {
        setAdmins(response.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to fetch clinic data.");
      });
  }, []);

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Do you want to delete this Account?",
      onOk: () => {
        axios
          .delete(`http://localhost:4000/Clinics/delete/` + id)
          .then((res) => {
            message.success("Delete Successfully", 5000);
            window.location.reload();
          })
          .catch((err) => {
            message.error("Failed to delete Clinic");
            console.error(err);
          });
      },
      okButtonProps: {
        style: { backgroundColor: "red", borderColor: "red" },
      },
    });
  };

  return (
    <div style={{ position: "relative" }}>
      <video
        src={VideoBG}
        autoPlay
        loop
        muted
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
        title="Background Video"
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh", // Adjusted height to cover the entire viewport
        }}
      >
        <div className="d-flex vh-100   justify-content-center align-items-center">
          <div className="table-container">
            <div className="header-admin">
              Admin Dashboard -Clinical management
            </div>
            <br />
            <Link to="/createClinic" className="btn btn-add">
              Add +
            </Link>
            <br />
            <br />
            <table className="table">
              <thead className="table-header-admin">
                <tr>
                  <th>Clinic Name</th>
                  <th>Location</th>
                  <th>Contact</th>
                  <th>Website</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => (
                  <tr className="table-data-admin">
                    <td>{admin.clinicName}</td>
                    <td>{admin.clinicLocation}</td>
                    <td>{admin.clinicContact}</td>
                    <td>{admin.clinicWebsite}</td>
                    <td>
                      <Link
                        to={`/updateClinic/${admin._id}`}
                        className="btn btn-success"
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-danger"
                        onClick={(e) => handleDelete(admin._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ReactToastContainer />
        </div>
      </div>
    </div>
  );
}

export default Admin;
