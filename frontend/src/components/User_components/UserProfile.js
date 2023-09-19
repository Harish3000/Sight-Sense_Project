import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer as ReactToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLogOut } from "../../hooks/User_hooks/useLogOut";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/User_context/AuthContext";
import edit from "../../assets/User_assets/img/edit.png";
import deleteI from "../../assets/User_assets/img/delete.png";
import profileimg from "../../assets/User_assets/img/profile_img.png";
import DonutChart from "react-donut-chart";

export default function UserProfile() {
  const navigate = useNavigate();

  const { logout } = useLogOut();
  const { user } = useContext(AuthContext);
  const [testData, setTestData] = useState([]);
  const [testDate, setTestDate] = useState();
  const [testScore, setTestScore] = useState([]);
  const [correctTest, setCorrectTest] = useState([]);

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (!userString) {
      navigate("/login");
      return;
    }

    const user = JSON.parse(userString);
    const token = user.token;

    const getTestData = () => {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get(`http://localhost:4000/api/users/read-all`, { headers })
        .then((res) => {
          setTestData(res.data);
          console.log(res.data);

          // After fetching the data, set it in local storage
          localStorage.setItem("testData", JSON.stringify(res.data));
        })
        .catch((err) => {
          alert(err.message);
        });
    };

    getTestData();
  }, []);

  useEffect(() => {
    // Check if there's cached data in local storage
    const cachedTestData = localStorage.getItem("testData");
    if (cachedTestData) {
      setTestData(JSON.parse(cachedTestData));
    }
  }, []);

  // To fetch the correct test data
  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (!userString) {
      navigate("/login");
      return;
    }
    const user = JSON.parse(userString);
    const userFirstName = user.user.firstname;
    const filteredTest = testData.filter(
      (test) => test.user_id === userFirstName
    );
    setCorrectTest(filteredTest);
  }, [testData]);

  // This useEffect sets testDate and testScore when correctTest changes
  useEffect(() => {
    if (correctTest.length > 0) {
      setTestDate(correctTest[0].test_date);
      setTestScore(correctTest[0].test_score);
    }

    console.log("Test Date : ", testDate);
    console.log("Test Score : ", testScore);
  }, [correctTest]);

  // Pie chart data
  let totalQuestions = 15; // Total of 15 questions
  let correctAns = Number((testScore / totalQuestions) * 100); // Correct answers percentage
  let wrongAns = 100 - correctAns; // Wrong answers percentage

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
        const response = await axios.delete(
          `http://localhost:4000/api/users/${user.user._id}`
        );

        if (response.status === 200) {
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

  //Donought chart data
  const chartData = {
    labels: ["Correct Answers", "Wrong Answers"],
    datasets: [
      {
        label: "Last Updated Test Results",
        data: [correctAns, wrongAns],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        hoverOffset: 4,
      },
    ],
  };

  const [Conclusion, setConclusion] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check the condition and update Conclusion and message accordingly
    if (correctAns > 50) {
      setConclusion(true);
      setMessage("Your vision appears promising and holds great potential.");
    } else {
      setConclusion(false);
      setMessage("Opting for advanced testing is the preferred choice.");
    }
  }, [correctAns]);

  return (
    <div style={{ paddingTop: "30px", paddingLeft:"70px", paddingRight:"70px" }}>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex" }}>
            <div style={{ flex: 0.6 }}>
              <img
                src={profileimg}
                alt="Profile Image"
                style={{ height: "100px", width: "100px" }}
              />
            </div>
            <div style={{ flex: 2 }}>
              <h1
                style={{
                  fontSize: "44px",
                }}
              >
                {user && (
                  <div>
                    {user.user.firstname} {user.user.lastname}
                  </div>
                )}
              </h1>
            </div>
          </div>
          <div>
            <div style={{ display: "flex" }}>
              <div style={{ paddingLeft: "30px", paddingTop: "40px" }}>
                <div
                  style={{
                    flex: 1,
                    border: "2px solid #000",
                    padding: "10px",
                    backgroundColor: "#F0F8FF",
                    boxShadow: " 0 4px 8px 0 rgba(0,0,0,0.2)",
                    transition: "0.3s",
                    height: "450px",
                    fontSize: "20px",
                    cursor: "pointer",
                  }}
                >
                  {/* Profile details */}
                  {user && (
                    <div
                      style={{
                        paddingTop: "30px",
                        fontSize: "18px",
                        paddingLeft: "30px",
                        paddingBottom: "40px",
                        paddingRight: "20px",
                      }}
                    >
                      <div>
                        <div style={{ paddingLeft: "300px" }}>
                          <div style={{ paddingBottom: "10px" }}>
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
                      <h4>Contact</h4> {user.user.contact}
                      <br />
                      <br />
                      <h4>Email</h4> {user.user.email}
                      <br />
                      <br />
                      <h4>Address</h4> {user.user.addLine1},{" "}
                      {user.user.addLine2}, {user.user.addLine3}
                      <br />
                    </div>
                  )}
                </div>
                <div>
                <div style={{ padding: "20px" }}>
              
              <br></br>
            </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ flex: "1" }}>
          something
        </div>
      <div style={{display:"flex"}}>
        <div>
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

      </div> 
      </div>

<div style={{display:"flex"}}>
  <div style={{flex:1}}>

  <div>
            <h4 style={{ paddingTop: "60px", paddingLeft: "40px" }}>Previous Basic Test Stats</h4>
            <DonutChart
              data={[
                {
                  label: "CorrectAnswers",
                  value: correctAns,
                },
                {
                  label: "Wrong Answers",
                  value: wrongAns,
                },
              ]}
            />

            <div>
            <h6 style={{ fontStyle: "italic" , paddingLeft:"45px", paddingBottom:"40px"}}>
                This data is last updated on : {testDate}
              </h6>
            </div>
          </div>

  </div>
      <div style={{paddingTop: "120px", paddingBottom: "40px", flex: 1}}>
        <h4>SUMMERY OF BASIC TESTING</h4>
        <br></br>
        <h5>
                Total number of basic test questions -
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;15
              </h5>
              <h5>Number of correctly answered questions - {testScore}</h5>
              <h5>Number of wrongly answered questions - &nbsp;&nbsp;{15 - testScore}</h5>
              <h5>
                Precentage of correct answers -
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {correctAns.toFixed(2)} %
              </h5>

              <h4 style={{color: "#007bff", paddingTop: "20px"}}> Conclusion</h4>
              <h4>{message}</h4>
      </div>
      </div>
      <ReactToastContainer />
    </div>
  );
}
