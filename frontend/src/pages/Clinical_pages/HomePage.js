import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../styles/GeneralTest/Clinical/HomePage.css";
import { ToastContainer as ReactToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import cancelimg from "../../assets/Clinical_assets/cancel.png";
import deleteimg from "../../assets/Clinical_assets/delete.png";
import editimg from "../../assets/Clinical_assets/edit.png";
import saveimg from "../../assets/Clinical_assets/save.png";

export default function HomePage() {
  const [clinics, setClinics] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [editingClinicId, setEditingClinicId] = useState(null);
  const [ClinicSelected, setClinicSelected] = useState(false);

  useEffect(() => {
    async function getClinics() {
      try {
        const response = await axios.get(
          "http://localhost:4000/Clinics/clinics"
        );
        setClinics(response.data);
      } catch (error) {
        toast.error(error.message);
      }
    }
    getClinics();
  }, []);

  const showDeleteConfirmation = (clinicId) => {
    // Custom confirmation toast for delete
    toast.info(
      <div className="deleteConfirm">
        <p className="delete-confiramation-box-text">
          Are you sure you want to delete this clinic?
        </p>
        <button className="confirm-btns" onClick={() => handleDelete(clinicId)}>
          Yes
        </button>
        <button
          className="confirm-btns"
          onClick={() => {
            toast.dismiss(); // Dismiss the confirmation toast when "No" is clicked
          }}
        >
          No
        </button>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      }
    );
  };

  const handleDelete = async (clinicId) => {
    try {
      await axios.delete(`http://localhost:4000/Clinics/delete/${clinicId}`);
      setClinics((prevClinics) =>
        prevClinics.filter((clinic) => clinic._id !== clinicId)
      );
      setSelectedClinic(null);
      toast.dismiss();
    } catch (error) {
      console.log("Error deleting clinic:", error);
      toast.error(`Error deleting clinic: ${error.message}`);
    }
  };

  const handleEdit = (clinicId) => {
    setSelectedClinic(clinics.find((clinic) => clinic._id === clinicId));
    setEditingClinicId(clinicId);
    setClinicSelected(true);
  };

  const handleEditCancel = () => {
    setEditingClinicId(null);
  };

  const handleSave = async (updatedClinic) => {
    try {
      await axios.put(
        `http://localhost:4000/Clinics/edit/${updatedClinic._id}`,
        updatedClinic
      );
      handleEditCancel();
      const updatedClinics = await axios.get(
        "http://localhost:4000/Clinics/clinics"
      );
      setClinics(updatedClinics.data);
    } catch (error) {
      console.log("Error updating clinic:", error);
      toast.error(`Error updating clinic: ${error.message}`);
    }
  };

  return (
    <div className="home-body">
      <div className="header-section-1">
        <h1 className="app-name">Clinical Management</h1>
        <br />

        <br />
        <br />
      </div>
      <div className="div-home-body">
        <table className="table-display">
          <tbody>
            {clinics.map((n, index) => (
              <React.Fragment key={n.id}>
                <tr className="card1" onClick={() => setSelectedClinic(n)}>
                  <div className="card1-container">
                    <td className="clinicName-column">{n.clinicName}</td>
                    <br />
                    <td className="clinicLocation-column">
                      {n.clinicLocation}
                    </td>
                  </div>
                </tr>
                {index < clinics.length - 1 && (
                  <tr key={index}>
                    <td
                      className="spacer"
                      style={{ height: "5px", width: "10px" }}
                    ></td>
                  </tr>
                )}
              </React.Fragment>
            ))}
            <br />
          </tbody>
        </table>

        {selectedClinic && (
          <div className="div-for-paddding-card2">
            <div className="card2">
              <div className="icon-div">
                {editingClinicId === selectedClinic._id ? (
                  <>
                    <span
                      className="icon save-icon"
                      onClick={() => handleSave(selectedClinic)}
                    >
                      <img src={saveimg} className="icons" />
                    </span>
                    <span
                      className="icon cancel-icon"
                      onClick={() => handleEditCancel()}
                    >
                      <img src={cancelimg} className="icons" />
                    </span>
                  </>
                ) : (
                  <>
                    <span
                      className="icon edit-icon"
                      onClick={() => handleEdit(selectedClinic._id)}
                    >
                      <img src={editimg} className="icons" />
                    </span>
                    <span
                      className="icon delete-icon"
                      onClick={() => showDeleteConfirmation(selectedClinic._id)}
                    >
                      <img src={deleteimg} className="icons" />
                    </span>
                  </>
                )}
              </div>
              <div className="card-2-padding">
                <div className="clinicName-div">
                  {/* Edit name */}
                  {!editingClinicId ||
                  editingClinicId !== selectedClinic._id ? (
                    <h3 className="clinic-column-display">
                      {ClinicSelected ? "" : selectedClinic.clinicName}
                    </h3>
                  ) : (
                    <input
                      type="text"
                      value={selectedClinic.clinicName}
                      onChange={(e) =>
                        setSelectedClinic((prevClinic) => ({
                          ...prevClinic,
                          clinicName: e.target.value,
                        }))
                      }
                    />
                  )}

                  {/* Edit location */}
                  {!editingClinicId ||
                  editingClinicId !== selectedClinic._id ? (
                    <h3 className="clinic-column-display">
                      {ClinicSelected ? "" : selectedClinic.clinicLocation}
                    </h3>
                  ) : (
                    <input
                      type="text"
                      value={selectedClinic.clinicLocation}
                      onChange={(e) =>
                        setSelectedClinic((prevClinic) => ({
                          ...prevClinic,
                          clinicLocation: e.target.value,
                        }))
                      }
                    />
                  )}

                  {/* Edit contact */}
                  {!editingClinicId ||
                  editingClinicId !== selectedClinic._id ? (
                    <h3 className="clinic-column-display">
                      {ClinicSelected ? "" : selectedClinic.clinicContact}
                    </h3>
                  ) : (
                    <input
                      type="text"
                      value={selectedClinic.clinicContact}
                      onChange={(e) =>
                        setSelectedClinic((prevClinic) => ({
                          ...prevClinic,
                          clinicContact: e.target.value,
                        }))
                      }
                    />
                  )}

                  {/* Edit website */}
                  {!editingClinicId ||
                  editingClinicId !== selectedClinic._id ? (
                    <h3 className="clinic-column-display">
                      {ClinicSelected ? "" : selectedClinic.clinicWebsite}
                    </h3>
                  ) : (
                    <input
                      type="text"
                      value={selectedClinic.clinicWebsite}
                      onChange={(e) =>
                        setSelectedClinic((prevClinic) => ({
                          ...prevClinic,
                          clinicWebsite: e.target.value,
                        }))
                      }
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="add-new-btn-div">
        <Link to="/newClinic" className="add-new-clinics-btn">
          <button className="add-new-btn ">+</button>
        </Link>
      </div>
      <ReactToastContainer />
    </div>
  );
}
