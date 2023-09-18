import React from "react";
import { useContext } from "react";
import axios from "axios";
import { ToastContainer as ReactToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLogOut } from "../../hooks/User_hooks/useLogOut";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/User_context/AuthContext";
import { Link } from "react-router-dom";
import edit from '../../assets/User_assets/img/edit.png';
import deleteI from '../../assets/User_assets/img/delete.png';
import profileimg from "../../assets/User_assets/img/profile_img.png";
import { useEffect } from "react";
import { useState } from "react";

export default function UserProfile() {
  const navigate = useNavigate();

  const { logout } = useLogOut();
  const { user } = useContext(AuthContext);
  const [testData, setTestData] = useState([]);
  const [correctTest, setCorrectTest] = useState([]);

  // Fetch test data
  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (!userString) {
      // Handle the case where there's no user in localStorage, e.g., redirect to login
      navigate("/login"); // Replace with your login route
      return;
    }

    const user = JSON.parse(userString);
    const token = user.token;

    const getTestData = () => {
      const headers = {
        Authorization: `Bearer ${token}`, // Include the token in the request headers
      };
      axios
        .get(`http://localhost:4000/api/users/read-all`, { headers })
        .then((res) => {
          setTestData(res.data);
          console.log(res.data); // Use 'res.data' instead of 'testData' as it may not be updated immediately
        })
        .catch((err) => {
          alert(err.message);
        });
    };

    getTestData();
  }, []);

  // To fetch the correct test data
  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (!userString) {
      // Handle the case where there's no user in localStorage, e.g., redirect to login
      navigate("/login"); // Replace with your login route
      return;
    }

    const user = JSON.parse(userString);
    const userFirstName = user.user.firstname;

    // Filter the test data to only include tests with the user's first name
    const filteredTest = testData.filter(
      (test) => test.user_id === userFirstName
    );

    // Update the state with the filtered test data
    setCorrectTest(filteredTest);
  }, [testData]); // Include testData in the dependencies array so that this effect runs when testData changes

  // logout function
  const handleLogOut = () => {
    logout();
    navigate("/");
  };

  // update function
  const handleEdit = async (UserId) => {
    navigate("/update");
  };

  // delete function
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );

    if (confirmDelete) {
      try {
        // Send a DELETE request to delete the user's account
        const response = await axios.delete(
          `http://localhost:4000/api/users/${user.user._id}`
        );

        if (response.status === 200) {
          // Logout the user and redirect to the homepage
          logout();
          toast.success("Profile has been successfully deleted");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex" }}>
            <div
              style={{ flex: 0.5, paddingTop: "80px", paddingLeft: "100px" }}
            >
              <img
                src={profileimg}
                alt="Profile Image"
                style={{ height: "100px", width: "100px" }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <h1
                style={{
                  paddingTop: "80px",
                  fontSize: "44px",
                }}
              >
                {user && (<div>{user.user.firstname} {user.user.lastname}</div>)}
              </h1>
            </div>
          </div>

          <div style={{ display: "flex" }}>
            <div style={{ flex: 1 }}>
              {/* Your profile details */}
              {user && (
                <div style={{ paddingTop: "50px", fontSize: "18px", paddingLeft: "100px" }}>
                  <h4>Contact</h4> {user.user.contact}
                  <br />
                  <br />
                  <h4>Email</h4> {user.user.email}
                  <br />
                  <br />
                  <h4>Address</h4> {user.user.addLine1}, {user.user.addLine2}, {user.user.addLine3}
                  <br />
                </div>
              )}
            </div>
            <div style={{ flex: 0.4 , paddingTop: "60px"}}>
              <div>
                <button
                  type="button"
                  onClick={() => handleEdit(user.user._id)}
                  style={{
                    backgroundColor: "#007bff",
                    color: "#fff",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    border: "none",
                    marginRight: "10px",
                    cursor: "pointer",
                    fontSize: "18px",
                  }}
                >
                  <img
                src={edit}
                alt="Edit icon"
                style={{ height: "20px", width: "20px" }}
              />
                </button>
              </div>

              <br></br>
              <div>
                <button
                  type="button"
                  onClick={() => handleDelete(user.user._id)}
                  style={{
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    border: "none",
                    marginRight: "10px",
                    cursor: "pointer",
                    fontSize: "18px",
                  }}
                >
                  <img
                src={deleteI}
                alt="Delete icon"
                style={{ height: "20px", width: "20px" }}
              />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <p>div for chart and test results details</p>
        </div>
      </div>
      <ReactToastContainer />
    </div>
  );
}
