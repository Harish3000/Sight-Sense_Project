import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../styles/GeneralTest/Clinical/AddForm.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer as ReactToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddForm() {
  const [clinicName, setclinicName] = useState("");
  const [clinicLocation, setclinicLocation] = useState("");
  const [clinicContact, setclinicContact] = useState("");
  const [clinicWebsite, setclinicWebsite] = useState("");
  const navigate = useNavigate();

  const ValidateForm = () => {
    let isValid = true;

    if (!clinicName) {
      isValid = false;
      toast.error("Enter the clinic Name for your clinic!");
    } else if (!clinicLocation) {
      isValid = false;
      toast.error("Enter clinicLocation to create a clinic!!");
    }
    return isValid;
  };

  const AddNewClinic = (e) => {
    e.preventDefault();

    if (ValidateForm()) {
      const newClinicData = {
        clinicName,
        clinicLocation,
        clinicContact,
        clinicWebsite,
      };

      axios
        .post("http://localhost:4000/Clinics/newClinic", newClinicData)
        .then(() => {
          toast.success("New Clinic Created!");
          setTimeout(() => {
            navigate("/clinicHome");
          }, 3000);
        })
        .catch((err) => {
          toast.error("An Error Occured : ", err);
        });
    }
  };

  return (
    <div className="add-form-body">
      <div className="add-form-box">
        <div className="padding-div">
          <div className="box-container">
            <div className="add-clinic-heading">
              <h1>New Clinic</h1>
            </div>

            <form onSubmit={AddNewClinic}>
              <input
                id="clinicName-input"
                type="text"
                placeholder="Clinic Name"
                name="clinicName"
                value={clinicName}
                onChange={(e) => setclinicName(e.target.value)}
              />

              <br />

              <input
                id="clinicName-input"
                type="text"
                placeholder="Clinic Location"
                name="clinicLocation"
                value={clinicLocation}
                onChange={(e) => setclinicLocation(e.target.value)}
              />

              <br />

              <input
                id="clinicName-input"
                type="text"
                placeholder="Clinic Contact"
                name="clinicContact"
                value={clinicContact}
                onChange={(e) => setclinicContact(e.target.value)}
              />

              <br />

              <input
                id="clinicName-input"
                type="text"
                placeholder="Clinic Website"
                name="clinicWebsite"
                value={clinicWebsite}
                onChange={(e) => setclinicWebsite(e.target.value)}
              />

              <br />

              <div className="btn-div">
                <button className="btns-in-add-form create" type="submit">
                  Create
                </button>
                <Link to="/clinicHome">
                  <button
                    className="btns-in-add-form cancle"
                    type="button"
                    link
                  >
                    Cancel
                  </button>
                </Link>
                <br />
              </div>
            </form>
          </div>
        </div>
      </div>
      <ReactToastContainer />
    </div>
  );
}
