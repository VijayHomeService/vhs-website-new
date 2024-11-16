import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";

function Esuccess() {
  const location = useLocation();

  const { data, appoTime, appoDate } = location.state || {};
  console.log("data", data, appoTime, appoDate);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     window.location.href = "/"; // Redirect to home page after 3 seconds
  //   }, 2000);

  //   return () => clearTimeout(timer);
  // }, []);

  const handlechange = () => {
    window.location.href = "/"; // Redirect to home page after 3 seconds
  };
  return (
    <div className="container">
      <div
        className="row mb-3"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="col-md-5 shadow-lg p-3"
          style={{ borderRadius: "5px", marginTop: "40px" }}
        >
          <div className="d-flex justify-content-center">
            <video
              className="p-0"
              style={{ objectFit: "cover", width: "200px", height: "200px" }}
              autoPlay
              loop
              src={require("../Assets/Images/a.mp4")}
            ></video>
          </div>
          <div className="d-flex align-items-center justify-content-center mt-2">
            <div
              className="col-md-5 text-center poppins-black"
              style={{ fontSize: "14px" }}
            >
              Category
            </div>
            <div className="col-md-1 mx-2">:</div>
            <div className="col-md-6 poppins-black">{data.category}</div>
          </div>

          <div className="d-flex align-items-center justify-content-center mt-2">
            <div
              className="col-md-5 text-center poppins-black"
              style={{ fontSize: "14px" }}
            >
              Subcategory
            </div>
            <div className="col-md-1 mx-2">:</div>
            <div className="col-md-6 poppins-black">{data.Subcategory}</div>
          </div>

          <div className="d-flex align-items-center justify-content-center mt-2">
            <div
              className="col-md-5 text-center poppins-black"
              style={{ fontSize: "14px" }}
            >
              {" "}
              Service Name
            </div>
            <div className="col-md-1 mx-2">:</div>
            <div className="col-md-6 poppins-black">{data.serviceName}</div>
          </div>
          <div className="d-flex align-items-center justify-content-center mt-2">
            <div
              className="col-md-5 text-center poppins-black"
              style={{ fontSize: "14px" }}
            >
              appoTime
            </div>
            <div className="col-md-1 mx-2">:</div>
            <div className="col-md-6 poppins-black">{appoTime}</div>
          </div>
          <div className="d-flex align-items-center justify-content-center mt-2">
            <div
              className="col-md-5 text-center poppins-black"
              style={{ fontSize: "14px" }}
            >
              appoDate
            </div>
            <div className="col-md-1 mx-2">:</div>
            <div className="col-md-6 poppins-black">{appoDate}</div>
          </div>

          <div className="d-flex justify-content-center mt-3 mb-3">
            <Button
              onClick={handlechange}
              variant="secondary"
              style={{ width: "200px", backgroundColor: "darkred" }}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Esuccess;
