import React from "react";
import { useContext } from "react";
import axios from "axios";
import { ToastContainer as ReactToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLogOut } from "../../hooks/User_hooks/useLogOut";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/User_context/AuthContext";
import VideoBG from "../../assets/Backround_video.mp4";
import { Link } from "react-router-dom";

export default function UserProfile() {
  const navigate = useNavigate();

  const { logout } = useLogOut();
  const { user } = useContext(AuthContext);

  //logout function
  const handleLogOut = () => {
    logout();
    toast.success("Logging out...");
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  //update function
  const handleEdit = async (UserId) => {
    navigate("/update");
  };

  //delete function
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
          }, 3000);
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <div>
      <video
        src={VideoBG}
        autoPlay
        loop
        muted
        style={{
          width: "100%",
          height: "160%",
          objectFit: "cover",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
        title="Background Video"
      />
      <h1
        style={{
          fontFamily: "Poppins",
          textAlign: "center",
          paddingTop: "80px",
          fontSize: "40px",
        }}
      >
        User Profile
      </h1>
      {user && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "50%",
            margin: "auto",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            fontSize: "20px",
            textAlign: "center",
          }}
        >
          {user.user.firstname} {user.user.lastname}
          <br />
          {user.user.contact}
          <br />
          {user.user.email}
          <br />
          {user.user.addLine1}
          <br />
          {user.user.addLine2}
          <br />
          {user.user.addLine3}
        </div>
      )}
      <br></br>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button
          type="button"
          onClick={() => handleEdit(user.user._id)}
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            marginRight: "10px",
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          Update
        </button>

        <button
          type="button"
          onClick={() => handleDelete(user.user._id)}
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
        >
          Delete
        </button>

        <button
          type="button"
          onClick={handleLogOut}
          style={{
            backgroundColor: "#6c757d",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          Logout
        </button>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link to="/general-test/QuizHome">
          <br></br>
          <button
            type="button"
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
          >
            Go Testing !
          </button>
        </Link>
      </div>

      <ReactToastContainer />
    </div>
  );
}
