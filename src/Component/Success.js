import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Success() {
  const location = useLocation();
  const { data } = location.state || {};
  console.log("data", data);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6" style={{ padding: "20px" }}>
          <div className="d-flex" style={{ justifyContent: "center" }}>
            <video
              className="p-0"
              style={{ objectFit: "cover", width: "200px", height: "200px" }}
              autoPlay
              loop
              src={require("../Assets/Images/a.mp4")}
            ></video>
          </div>

          {/* Category */}
          <div className="row">
            <div className="col-md-4">
              <div className="">Category</div>
            </div>
            <div className="col-md-8">
              <div className="">{data.category}</div>
            </div>
          </div>

          {/* Other details */}
          <div className="row mt-3">
            <div className="col-md-4">
              <div className="">Service</div>
            </div>
            <div className="col-md-8">
              <div className="">{data.service}</div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-4">
              <div className="">Description</div>
            </div>
            <div className="col-md-8">
              <div className="">{data.desc}</div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-4">
              <div className="">Payment Mode</div>
            </div>
            <div className="col-md-8">
              <div className="">{data.paymentMode}</div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-4">
              <div className="">Selected Slot Text</div>
            </div>
            <div className="col-md-8">
              <div className="">{data.selectedSlotText}</div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-4">
              <div className="">Date</div>
            </div>
            <div className="col-md-8">
              <div className="">{data.date}</div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-4">
              <div className="">City</div>
            </div>
            <div className="col-md-8">
              <div className="">{data.city}</div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-4">
              <div className="">Contract Type</div>
            </div>
            <div className="col-md-8">
              <div className="">{data.contractType}</div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-4">
              <div className="">Service Charge</div>
            </div>
            <div className="col-md-8">
              <div className="">{data.serviceCharge}</div>
            </div>
          </div>

          {/* Success Button */}
          <div
            onClick={() => window.location.assign("/")}
            className="mt-5"
            style={{
              backgroundColor: "darkred",
              padding: "8px",
              color: "white",
              fontSize: "14px",
              textAlign: "center",
              borderRadius: "5px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Success
          </div>

          {/* Offer Alert Section */}
          <div className="mt-5 text-center">
            <h4>Offer Alert!</h4>
            <a href="/services/painting-services">
              <video
                style={{ width: "100%", height: "auto", cursor: "pointer" }}
                autoPlay
                loop
                muted
                src={require("../Assets/Images/offer video.webm")}
              ></video>
            </a>
            <p className="mt-2" style={{ fontWeight: "bold", color: "darkred" }}>
              Click the video to explore our painting services!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Success;
