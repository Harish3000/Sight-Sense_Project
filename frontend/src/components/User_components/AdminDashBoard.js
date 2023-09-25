import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer as ReactToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { saveAs } from "file-saver";

export default function AdminDashBoard() {
  const [allUsers, setAllUsers] = useState([]);
  const [searchEmail, setSearchEmail] = useState(""); // State for search email input
  const navigate = useNavigate();
  const role = "admin";

  // Function to handle download report
  const handleDownload = () => {
    // Assuming you have a state variable called `filteredUsers` that contains the filtered users
    const itemsToExport = filteredUsers || allUsers;
    const now = new Date();
    const timestamp = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
    const csvData = [
      ["Sight Sense"],
      ["User Report"],
      ["                                                  "],
      ["First Name", "Last Name", "Email", "Contact", "Address"],
      ...itemsToExport.map((user) => [
        user.firstname,
        user.lastname,
        user.email,
        user.contact,
        `${user.addLine1}, ${user.addLine2}, ${user.addLine3}`,
      ]),
      [
        "                                                                                           ",
      ],
      [`Report Generated at ${timestamp}`],
      ["All Rights Reserved - SightSence.lk"],
    ];

    const csv = csvData.map((row) => row.join(",")).join("\n");

    const file = new Blob([csv], { type: "text/csv;charset=utf-8" });
    saveAs(file, "User_Report.csv");
  };

  // Delete one user
  const deleteUser = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div>
            <h1 style={{ fontSize: "24px", textAlign: "center" }}>
              Confirm Deletion
            </h1>
            <p style={{ fontSize: "18px", textAlign: "center" }}>
              Are you sure you want to delete this user?
            </p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                style={{
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  border: "none",
                  marginRight: "10px",
                  cursor: "pointer",
                  fontSize: "18px",
                }}
                onClick={async () => {
                  try {
                    await axios.delete(
                      `http://localhost:4000/api/admin/delete/${id}`
                    );
                    toast.success("User deleted successfully");
                  } catch (error) {
                    toast.error(error.message);
                  }
                  onClose();
                }}
              >
                Yes
              </button>
              <button
                style={{
                  backgroundColor: "#6c757d",
                  color: "#fff",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  border: "none",
                  marginRight: "10px",
                  cursor: "pointer",
                  fontSize: "18px",
                }}
                onClick={() => {
                  onClose();
                }}
              >
                No
              </button>
            </div>
          </div>
        );
      },
    });
  };

  // Function to handle logout
  const handleLogOut = () => {
    navigate("/");
  };

  useEffect(() => {
    const getAllUsers = () => {
      axios
        .get(`http://localhost:4000/api/admin/get-all?role=${role}`)
        .then((res) => {
          const filteredUsers = res.data.filter(
            (user) => !user.email.startsWith("admin")
          );
          setAllUsers(filteredUsers);
        })
        .catch((err) => {
          toast.error(err.message);
        });
    };

    getAllUsers();
  }, []);

  // Function to filter users based on email
  const filteredUsers = allUsers.filter((user) =>
    user.email.includes(searchEmail)
  );

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchEmail(e.target.value);
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div style={{ flex: "1" }}>{/* div for logo */}</div>
      </div>
      <div
        style={{ display: "flex", padding: "20px", backgroundColor: "#DADADA" }}
      >
        <div
          style={{
            flex: "0.3",
            paddingRight: "20px",
            backgroundColor: "#488A99",
            height: "780px",
          }}
        >
          <div style={{ padding: "20px" }}>
            <h2 style={{ textAlign: "center" }}>Admin Dashboard</h2>
          </div>

          <div>
            <Link to="/admin-dashboard" style={{ textDecoration: "none" }}>
              <div style={{ padding: "20px" }}>
                <div
                  style={{
                    backgroundColor: "#484848",
                    padding: "20px",
                  }}
                >
                  <h4 style={{ color: "white", textAlign: "center" }}>
                    {" "}
                    USERS
                  </h4>
                </div>
              </div>
            </Link>
          </div>
          <div>
            <Link to="/clinics" style={{ textDecoration: "none" }}>
              <div style={{ padding: "20px" }}>
                <div
                  style={{
                    backgroundColor: "#484848",
                    padding: "20px",
                  }}
                >
                  <h4 style={{ color: "white", textAlign: "center" }}>
                    CLINICS
                  </h4>
                </div>
              </div>
            </Link>

            <div>
              <button
                type="button"
                onClick={handleLogOut}
                style={{
                  backgroundColor: "#20283E",
                  color: "#fff",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "20px",
                  marginLeft: "150px",
                  marginTop: "400px",
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <div
          style={{
            flex: "1",
            paddingLeft: "20px",
            paddingRight: "20px",
            paddingTop: "20px",
          }}
        >
          <div
            style={{ flex: "1", paddingBottom: "20px", paddingLeft: "650px" }}
          >
            {/* div for search bar */}
            <input
              type="text"
              placeholder="Search by email"
              value={searchEmail}
              onChange={handleSearchChange}
              style={{ padding: "10px", width: "350px", borderRadius: "10px" }}
            />

            <button
              onClick={() => setSearchEmail("")}
              style={{ padding: "10px", marginLeft: "15px" }}
            >
              Clear
            </button>
            <button
              onClick={handleDownload}
              style={{
                backgroundColor: "#16a34a",
                color: "white",
                padding: "10px 20px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
                fontSize: "18px",
                marginLeft: "15px",
              }}
            >
              Download Report
            </button>
          </div>

          <div style={{ paddingLeft: "120px", width: "1150px" }}>
            <div style={{ padding: "20px", backgroundColor: "white" }}>
              <table>
                <thead>
                  <tr>
                    <th style={{ padding: "20px", fontSize: "20px" }}>
                      First Name
                    </th>
                    <th style={{ padding: "20px", fontSize: "20px" }}>
                      Last Name
                    </th>
                    <th style={{ padding: "20px", fontSize: "20px" }}>Email</th>
                    <th style={{ padding: "20px", fontSize: "20px" }}>
                      Contact
                    </th>
                    <th style={{ padding: "20px", fontSize: "20px" }}>
                      Address
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => (
                    <tr key={index}>
                      <td style={{ padding: "10px", fontSize: "18px" }}>
                        {user.firstname}
                      </td>
                      <td style={{ padding: "10px", fontSize: "18px" }}>
                        {user.lastname}
                      </td>
                      <td style={{ padding: "10px", fontSize: "18px" }}>
                        {user.email}
                      </td>
                      <td style={{ padding: "10px", fontSize: "18px" }}>
                        {user.contact}
                      </td>
                      <td style={{ padding: "10px", fontSize: "18px" }}>
                        {user.addLine1}, {user.addLine2}, {user.addLine3}
                      </td>
                      <td style={{ padding: "10px", fontSize: "18px" }}>
                        <button
                          style={{
                            backgroundColor: "#dc3545",
                            color: "#fff",
                            padding: "5px 12px",
                            borderRadius: "5px",
                            border: "none",
                            marginRight: "10px",
                            cursor: "pointer",
                            fontSize: "18px",
                          }}
                          onClick={() => {
                            deleteUser(user._id);
                          }}
                        >
                          Delete User
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ReactToastContainer />
    </div>
  );
}
