import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header2 from "./Header2";
import axios from "axios";
import Homenavbar from "./Homenavbar";

function Enquirydetails() {
  const location = useLocation();
  const { enquirydata } = location.state || {};
  console.log("enquirydata=====suman", enquirydata);
  const [technician, setTechnisian] = useState([]);

  const handleQuotationLink = (enquirydata) => {
    const quotationLink = `https://vijayhomeservicebengaluru.in/quotations?id=${enquirydata?.EnquiryId}`;
    window.location.href = quotationLink;
  };

  useEffect(() => {
    getalltechnician();
  }, [enquirydata]);

  const getalltechnician = async () => {
    try {
      const res = await axios.get(
        "https://api.vijayhomeservicebengaluru.in/api/getalltechnician"
      );
      if (res.status === 200) {
        const techdata = res.data?.technician;
        const filteredOrders = res.data?.technician.filter(
          (order) => order._id === enquirydata?.techId
        );

        setTechnisian(filteredOrders);
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error("Error fetching service orders: ", error);
    }
  };

  return (
    <div className="">
      <Header2 />
      <Homenavbar />
      <div className="row  pt-3" style={{ justifyContent: "center" }}>
        <div className="col-md-7">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              padding: 15,
              boxShadow: "0px 1px 3px rgba(0,0,0,0.12)",
              backgroundColor: "white",

              borderRadius: 5,
              width: "100%", // Make it take the full width of the column
            }}
          >
            <div
              className="poppins-black"
              style={{ color: "black", fontSize: "15px" }}
            >
              {enquirydata?.response === "New"
                ? "Thank for enquiry our executive will visit place as per scheduled."
                : " Thanks for enquiry our team will call you shortly to discuss about the service."}
            </div>
          </div>

          <div className="row mt-3" style={{ justifyContent: "space-between" }}>
            <div className="col-md-6" style={{ justifyContent: "center" }}>
              <div
                style={{
                  padding: 15,
                  boxShadow: "0px 1px 3px rgba(0,0,0,0.12)",
                  backgroundColor: "white",
                  borderRadius: 5,
                  width: "100%",
                }}
              >
                <div
                  className="poppins-black"
                  style={{
                    fontSize: 15,
                    color: "darkred",
                    fontWeight: 700,
                  }}
                >
                  Service Details
                </div>
                <div className="row mt-2">
                  <div className="col-md-1">
                    <i
                      className="fa-solid fa-layer-group"
                      style={{ color: "black", fontSize: "18px" }}
                    ></i>
                  </div>
                  <div
                    className="col-md-11 poppins-regular"
                    style={{ fontSize: "14px" }}
                  >
                    {enquirydata?.category}
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-md-1">
                    <i
                      className="fa-solid fa-broom"
                      style={{ color: "black", fontSize: "18px" }}
                    ></i>
                  </div>
                  <div
                    className="col-md-11 poppins-regular"
                    style={{ fontSize: "14px" }}
                  >
                    {enquirydata?.enquirydata[0]?.intrestedfor}
                  </div>
                </div>
              </div>
            </div>

            <div
              className="col-md-6"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div
                //   className="shadow-lg"
                style={{
                  flexDirection: "row",
                  padding: 15,
                  boxShadow: "0px 1px 3px rgba(0,0,0,0.12)",
                  backgroundColor: "white",
                  borderRadius: 5,
                  width: "100%",
                }}
              >
                <div
                  className="poppins-black"
                  style={{
                    fontSize: 15,
                    color: "darkred",
                    fontWeight: 700,
                  }}
                >
                  Appointment Details
                </div>

                <div className="poppins-regular mt-2">
                  Appo Date : {enquirydata?.appoDate}
                </div>

                <div className="poppins-regular mt-2">
                  Appo Time : {enquirydata?.appoTime}
                </div>
              </div>
            </div>
          </div>

          <div
            className="mt-3"
            style={{
              padding: 15,
              boxShadow: "0px 1px 3px rgba(0,0,0,0.12)",
              backgroundColor: "white",
              borderRadius: 5,
              width: "100%", // Make it take the full width of the column
            }}
          >
            <div
              className="poppins-black"
              style={{
                fontSize: 15,
                color: "darkred",
                fontWeight: 700,
              }}
            >
              Address
            </div>

            <div className="row mt-3">
              <div
                className="col-md-1"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <i
                  className="fa-solid fa-location-dot"
                  style={{ fontSize: "20px" }}
                ></i>
              </div>
              <div
                className="col-md-11 poppins-regular"
                style={{ fontSize: "14px", marginLeft: "-30PX" }}
              >
                {enquirydata?.enquirydata[0]?.address}
              </div>
            </div>
          </div>

          {technician.length > 0 ? (
            <div
              className="mt-3"
              style={{
                padding: 15,
                boxShadow: "0px 1px 3px rgba(0,0,0,0.12)",
                backgroundColor: "white",
                borderRadius: 5,
                width: "100%", // Make it take the full width of the column
              }}
            >
              <div
                className="poppins-black"
                style={{
                  fontSize: 15,
                  color: "darkred",
                  fontWeight: 700,
                }}
              >
                Executive
              </div>

              <div className="poppins-black mt-2" style={{ color: "grey" }}>
                {technician[0]?.vhsname}
              </div>
            </div>
          ) : (
            <></>
          )}

          <div
            onClick={handleQuotationLink(enquirydata)}
            className="poppins-black mt-4"
            style={{
              backgroundColor: "darkred",
              padding: "8px",
              color: "white",
              textAlign: "center",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Quotation
          </div>
        </div>
      </div>
    </div>
  );
}

export default Enquirydetails;
