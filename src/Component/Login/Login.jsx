import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function Signup() {
  const [mainContact, setMainContact] = useState("");
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [status, setStatus] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const location = useLocation();
  const { city } = location.state || {};
  console.log("city===21", city);

  const queryString = window.location.search;

  console.log("queryString", queryString);

  const getQueryParams = (queryString, param) => {
    const params = new URLSearchParams(queryString);
    return params.get(param);
  };

  const utmSource = getQueryParams(queryString, "utm_source");

  console.log("utmSource", utmSource);

  const utm_source = localStorage.getItem("utm_source");

  useEffect(() => {
    const fullQueryString = location.search;

    if (fullQueryString) {
      localStorage.setItem("fullQuery", fullQueryString);
      console.log("Stored full query string:", fullQueryString);
    }
  }, [location]);

  const storedQuery = localStorage.getItem("fullQuery");
  console.log("Retrieved query string:", storedQuery);

  useEffect(() => {
    if (utmSource) {
      localStorage.setItem("utm_source", utmSource);
    }
  }, [utmSource]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer]);

  const sendOTP = async () => {
    const isValidMobile = /^\d{10}$/.test(mainContact);

    if (!isValidMobile) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    try {
      const response = await axios.post(
        "https://api.vijayhomeservicebengaluru.in/api/sendotp/sendByCartBook",
        {
          mainContact: mainContact,
          customerName: name,
          reference: utm_source ? utm_source : storedQuery,
        }
      );
      if (response.status === 200) {
        alert("Successful login");
        setUser(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        navigate("/cart", {
          state: { city: city },
        });
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div
            className="row"
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <div
              className="col-md-5"
              style={{
                marginTop: "10%",
                border: "1px solid grey",
                padding: "20px",
                borderRadius: "5px",
              }}
            >
              <div
                className="row"
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <img
                  src="./images/vhs.webp"
                  style={{
                    width: "110px",
                    height: "90px",
                    textAlign: "center",
                  }}
                  alt="VHS Logo"
                />

                <div
                  className="mt-3 poppins-semibold"
                  style={{
                    color: "black",
                    fontSize: "17px",
                    textAlign: "center",
                    // fontWeight: "bold",
                  }}
                >
                  Book With Mobile Number
                </div>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  placeholder="Enter Name"
                  style={{
                    border: "1px solid grey",
                    height: "45px",
                    width: "60%",
                    marginTop: "15px",
                  }}
                />

                <input
                  type="text"
                  value={mainContact}
                  onChange={(e) => setMainContact(e.target.value)}
                  placeholder="Enter Mobile Number"
                  style={{
                    border: "1px solid grey",
                    height: "45px",
                    width: "60%",
                  }}
                />

                <div
                  onClick={sendOTP}
                  className="mb-2 poppins-black"
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontSize: "14px",
                    backgroundColor: "darkred",
                    padding: "5px",
                    width: "60%",
                    borderRadius: "5px",
                  }}
                >
                  Next
                </div>
              </div>
            </div>
          </div>
        </div>
             
               {/* New Text Content with Auto Pulse Effect */}
               <div
          className="text-container"
          style={{
            textAlign: "center",
            marginTop: "0.5in", // 0.5-inch gap between login container and text
            fontSize: "27px", // Font size set to 27px
            fontWeight: "1000", // Make font bold
            fontFamily: "Poppins, sans-serif", // Apply Poppins font
            animation: "pulse 1s infinite", // Apply pulse effect automatically
          }}
        >
          <p style={{ margin: "0", color: "#004aad" }}>
            "We offer <span style={{ color: "#960f14" }}>Top Quality</span>
          </p>
          <p style={{ margin: "0", color: "#004aad" }}>Services"</p>
        </div>
      </div>

      <div>
        {/* Inline CSS for Pulse Animation */}
        <style>
          {`
            @keyframes pulse {
              0% {
                transform: scale(1);
              }
              50% {
                transform: scale(1.1);
              }
              100% {
                transform: scale(1);
              }
            }
            .text-container {
        animation: pulse 1s infinite;
        will-change: transform;
      }

      /* Media query for mobile devices */
      @media (max-width: 767px) {
        .text-container {
          font-size: 20px; /* Adjust font size for mobile */
          animation: pulse 1.5s infinite; /* Slightly slower animation for mobile */
        }
      }  
          `}

        </style>
      </div>
    </div>
  );
}

export default Signup;
