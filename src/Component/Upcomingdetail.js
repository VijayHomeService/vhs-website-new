// http://www.robotstxt.org/robotstxt.html
// User-agent: *
// Disallow: /
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header2 from "./Header2";
import vhslogo from "../assests/vhs-lgo.png";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import moment from "moment/moment";
import { Button } from "react-bootstrap";
import Homenavbar from "./Homenavbar";

function Upcomingdetail() {
  const location = useLocation();
  const { allorder } = location.state || {};
  const [technisian, setTechnisian] = useState([]);
  const value = JSON.parse(localStorage.getItem("user"));
  const [serviceDate, setserviceDate] = useState("");
  const [paymentUrl, setPaymentUrl] = useState("");
  const [paymentMode, setpaymentMode] = useState("");
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const [Transaction, setTransaction] = useState("");
  const [showWebView, setShowWebView] = useState(false);
  const [paymentModel, setpaymentModel] = useState(false);
  const [Url, setUrl] = useState("");
  const [showbutton, setshowbutton] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose3 = () => setpaymentModel(false);
  const handleClose = () => setShow(false);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    // setserviceDate(new Date(dateString).toLocaleDateString(undefined, options))
    console.log(new Date(dateString).toLocaleDateString(undefined, options));
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const [show6, setShow6] = useState(false);

  const handleClose6 = () => setShow6(false);
  const handleShow6 = () => setShow6(true);

  useEffect(() => {
    getallserviceorder();
  }, [value]);

  const getallserviceorder = async () => {
    try {
      const res = await axios.get(
        "https://api.vijayhomeservicebengaluru.in/api/getalltechnician"
      );
      if (res.status === 200) {
        const techdata = res.data?.technician;
        const filteredOrders = res.data?.technician.filter(
          (order) => order._id === allorder.dsrdata[0]?.TechorPMorVendorID
        );

        setTechnisian(filteredOrders);
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error("Error fetching service orders: ", error);
    }
  };
  console.log("allorder====", allorder);

  const updateddata = {
    paymentDate: moment().format("YYYY-MM-DD"),
    paymentType: "Customer",
    paymentMode: "online",
    amount: allorder?.GrandTotal,
    Comment: "website",
    serviceDate: serviceDate,
    serviceId: allorder?._id,
    customerId: value?._id,
    userId: value?._id,
    MUID: "MUID" + Date.now(),
    transactionId: "T" + Date.now(),
  };

  console.log("value?._id", value?._id);

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://api.vijayhomeservicebengaluru.in/api/payment/upcomingpayment",
        updateddata
      );
      console.log("Response:", res.data);

      if (res.status === 200 && res.data.redirectUrl) {
        setpaymentModel(true);
        setUrl(res.data.redirectUrl);
      } else {
        console.log("No redirect URL found in the response.");
      }
    } catch (error) {
      if (error.response) {
        console.error("Payment initiation failed:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <div className="">
      <Header2 />
      <Homenavbar />
      <div className="container">
        <div className="row  pt-3" style={{ justifyContent: "center" }}>
          <div className="col-md-8">
            <p
              className="poppins-semibold mt-4"
              style={{ color: "darkred", fontSize: 18, fontWeight: 600 }}
            >
              {allorder?.category}
            </p>

            <div className="row" style={{ justifyContent: "space-between" }}>
              <div
                className="col-md-6"
                style={{ display: "flex", justifyContent: "center" }}
              >
                {allorder && allorder.paymentMode === "online" ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      padding: 15,
                      boxShadow: "0px 1px 3px rgba(0,0,0,0.12)",
                      backgroundColor: "white",
                      margin: 10,
                      borderRadius: 5,
                      width: "100%", // Make it take the full width of the column
                    }}
                  >
                    <div style={{ flex: 0.7 }}>
                      <div
                        className="poppins-black"
                        style={{ color: "black", fontSize: "15px" }}
                      >
                        Thanks for Choosing Vijay Home Servicess
                      </div>

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          marginTop: 5,
                        }}
                      >
                        <div
                          className="poppins-regular"
                          style={{ color: "green", fontSize: 17 }}
                        >
                          {" "}
                          ● Paid
                        </div>
                        <div
                          className="poppins-regular"
                          style={{
                            color: "green",
                            fontSize: 17,
                            marginLeft: 5,
                          }}
                        >
                          {allorder?.GrandTotal ? (
                            <>₹ {allorder.GrandTotal}</>
                          ) : (
                            <>₹ {allorder.serviceCharge}</>
                          )}
                        </div>
                      </div>

                      {/* <button
                        onClick={toggleModal}
                        style={{
                          borderWidth: 1,
                          borderColor: "grey",
                          padding: 8,
                          borderRadius: 5,
                          width: 130,
                          marginTop: 10,
                          border: "1px solid green",
                          cursor: "pointer",
                          backgroundColor: "white",
                        }}
                      >
                        <span style={{ textAlign: "center", color: "black" }}>
                          View Receipt
                        </span>
                      </button> */}
                    </div>
                    <div
                      style={{
                        flex: 0.3,
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "center",
                      }}
                    >
                      {/* <video
                        src={"/path-to-your-video/a.mp4"}
                        style={{
                          width: 80,
                          height: 80,
                        }}
                        muted={false}
                        autoPlay
                        loop
                      /> */}
                    </div>
                  </div>
                ) : (
                  <div
                    className="d-flex  p-3"
                    style={{
                      backgroundColor: "white",
                      borderRadius: "5px",
                      width: "100%",
                      boxShadow: "0px 1px 3px rgba(0,0,0,0.12)",
                    }}
                  >
                    <div className="col-md-10">
                      <div
                        className="poppins-black"
                        style={{ color: "black", fontSize: "15px" }}
                      >
                        Thanks for Choosing Vijay Home Servicess
                      </div>

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          marginTop: 5,
                        }}
                      >
                        <div
                          className="poppins-regular"
                          style={{ color: "black" }}
                        >
                          {" "}
                          ● Service Charge
                        </div>
                        <div
                          className="poppins-regular"
                          style={{
                            color: "black",
                            marginLeft: "5px",
                            fontSize: "15px",
                          }}
                        >
                          {allorder?.GrandTotal ? (
                            <>₹ {allorder.GrandTotal}</>
                          ) : (
                            <>₹ {allorder.serviceCharge}</>
                          )}
                        </div>
                      </div>
                    </div>
                    <div
                      className="col-md-2"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={vhslogo}
                        style={{ width: "30px", height: "30px" }}
                        alt="VHS"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div
                className="col-md-6"
                style={{ display: "flex", justifyContent: "center" }}
              >
                {technisian[0]?.vhsname ? (
                  <div
                    className="row  p-3"
                    style={{
                      backgroundColor: "white",
                      borderRadius: "5px",
                      width: "100%",
                      boxShadow: "0px 1px 3px rgba(0,0,0,0.12)",
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
                      Technician Details
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                      }}
                    >
                      <div
                        className="poppins-regular"
                        style={{ color: "black", fontSize: "12px" }}
                      >
                        Name :{" "}
                      </div>
                      <div
                        className="poppins-regular"
                        style={{
                          color: "black",
                          fontSize: "12px",
                          marginLeft: "3px",
                          marginTop: "2px",
                        }}
                      >
                        {technisian[0]?.vhsname}
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                      }}
                    >
                      <div
                        className="poppins-regular"
                        style={{ color: "black", fontSize: "12px" }}
                      >
                        Exp :{" "}
                      </div>
                      <div
                        className="poppins-regular"
                        style={{
                          color: "black",
                          fontSize: "12px",
                          marginLeft: "3px",
                          marginTop: "2px",
                        }}
                      >
                        {technisian[0]?.experiance}
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                      }}
                    >
                      <div
                        className="poppins-regular"
                        style={{ color: "black", fontSize: "12px" }}
                      >
                        Languages know :{" "}
                      </div>
                      <div
                        className="poppins-regular"
                        style={{
                          color: "black",
                          fontSize: "12px",
                          marginLeft: "3px",
                          marginTop: "2px",
                        }}
                      >
                        {technisian[0]?.languagesknow}
                      </div>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>

            <div
              className="row mt-3"
              style={{ justifyContent: "space-between" }}
            >
              <div
                className="col-md-6 "
                style={{ display: "flex", justifyContent: "center" }}
              >
                {allorder?.dividedDates?.map((dateInfo) => (
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
                      Service Dates
                    </div>
                    {allorder?.dividedDates?.map((dateInfo) => (
                      <div
                        className="poppins-regular"
                        style={{ color: "grey", fontSize: 14, marginTop: 5 }}
                        key={dateInfo.id}
                      >
                        {formatDate(dateInfo.date)}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div
                className="col-md-6 "
                style={{ display: "flex", justifyContent: "center" }}
              >
                {allorder?.dividedDates?.map((dateInfo) => (
                  <div
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
                      Service slot
                    </div>

                    <div
                      className="poppins-regular"
                      style={{ color: "grey", fontSize: 14, marginTop: 5 }}
                      key={dateInfo.id}
                    >
                      {allorder?.selectedSlotText}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {allorder ? (
              <>
                <div
                  className="mt-3"
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
                    Services details
                  </div>
                  <div style={{ flexDirection: "row", marginTop: "7px" }}>
                    <div className="poppins-regular" style={{ color: "black" }}>
                      {allorder.desc
                        ? allorder.desc.replace(/,/g, "\n")
                        : "Description not available"}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}

            <div
              className="mt-3"
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
                Payment Summary
              </div>

              {allorder && allorder.TotalAmt ? (
                <>
                  <div className="row mt-2">
                    <div className="col-md-8" style={{}}>
                      <div className="poppins-black">Total Amount</div>
                    </div>
                    <div
                      className="col-md-4"
                      style={{ alignItems: "flex-end" }}
                    >
                      <div
                        className="poppins-regular"
                        style={{
                          color: "black",
                          fontSize: "16px",
                          textDecorationLine: "line-through",
                          textAlign: "end",
                        }}
                      >
                        ₹ {allorder?.TotalAmt}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}

              {allorder && allorder.discAmt ? (
                <>
                  <div className="row mt-2">
                    <div className="col-md-8" style={{}}>
                      <div className="poppins-black">Discount</div>
                    </div>
                    <div
                      className="col-md-4"
                      style={{ alignItems: "flex-end" }}
                    >
                      <div
                        className="poppins-regular"
                        style={{
                          color: "black",
                          fontSize: "16px",

                          textAlign: "end",
                        }}
                      >
                        ₹ {allorder?.discAmt}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}

              {allorder && allorder.totalSaved ? (
                <>
                  <div className="row mt-2">
                    <div className="col-md-8" style={{}}>
                      <div className="poppins-black" style={{ color: "green" }}>
                        Saved
                      </div>
                    </div>
                    <div
                      className="col-md-4"
                      style={{ alignItems: "flex-end" }}
                    >
                      <div
                        className="poppins-regular"
                        style={{
                          color: "green",
                          fontSize: "16px",

                          textAlign: "end",
                        }}
                      >
                        ₹ {allorder?.totalSaved}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}

              {allorder && allorder.couponCode ? (
                <>
                  <div className="row mt-2">
                    <div className="col-md-8" style={{}}>
                      <div className="poppins-black" style={{ color: "green" }}>
                        Coupons
                      </div>
                    </div>
                    <div
                      className="col-md-4"
                      style={{ alignItems: "flex-end" }}
                    >
                      <div
                        className="poppins-regular"
                        style={{
                          color: "green",
                          fontSize: "16px",

                          textAlign: "end",
                        }}
                      >
                        ₹ {allorder?.couponCode}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}

              {allorder?.GrandTotal ? (
                <div className="row mt-2">
                  <div className="col-md-8" style={{}}>
                    <div className="poppins-black" style={{ color: "green" }}>
                      GrandTotal
                    </div>
                  </div>
                  <div className="col-md-4" style={{ alignItems: "flex-end" }}>
                    <div
                      className="poppins-regular"
                      style={{
                        color: "green",
                        fontSize: "16px",

                        textAlign: "end",
                      }}
                    >
                      ₹ {allorder?.GrandTotal}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="row mt-2">
                  <div className="col-md-8" style={{}}>
                    <div className="poppins-black" style={{ color: "green" }}>
                      GrandTotal
                    </div>
                  </div>
                  <div className="col-md-4" style={{ alignItems: "flex-end" }}>
                    <div
                      className="poppins-regular"
                      style={{
                        color: "green",
                        fontSize: "16px",

                        textAlign: "end",
                      }}
                    >
                      ₹ {allorder?.serviceCharge}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div
              className="mt-3 mb-3"
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
                Booking Details
              </div>

              <div className="d-flex mt-3">
                <div className="col-md-1">
                  <i
                    className="fa-solid fa-money-bill"
                    style={{ fontSize: "20px" }}
                  ></i>
                </div>
                <div
                  className="col-md-11 poppins-regular mx-2"
                  style={{ fontSize: "14px" }}
                >
                  {/* marginLeft: "-30px" */}
                  Amount :{" "}
                  {allorder?.GrandTotal ? (
                    <>₹ {allorder.GrandTotal}</>
                  ) : (
                    <>₹ {allorder.serviceCharge}</>
                  )}
                </div>
              </div>

              <div className="d-flex mt-3">
                <div className="col-md-1">
                  <i
                    className="fa-solid fa-location-dot"
                    style={{ fontSize: "20px" }}
                  ></i>
                </div>
                <div className="col-md-11 poppins-regular mx-2">
                  {/* style={{ fontSize: "14px", }} */}
                  {allorder?.deliveryAddress?.platNo} ,
                  {allorder?.deliveryAddress?.landmark} ,
                  {allorder?.deliveryAddress?.address}
                </div>
              </div>

              <div className="d-flex mt-3">
                <div className="col-md-1">
                  <i
                    className="fa-regular fa-clock"
                    style={{ fontSize: "20px" }}
                  ></i>
                </div>
                <div
                  className="col-md-11 poppins-regular mx-2"
                  style={{ fontSize: "14px" }}
                >
                  {/* marginLeft: "-30px" */}
                  {allorder?.date}
                </div>
              </div>
            </div>

            <div
              className="row mt-4 mb-2 mb-2"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div
                onClick={handleShow6}
                className="col-md-5 poppins-black"
                style={{
                  backgroundColor: "darkred",
                  padding: "8px",
                  color: "white",
                  textAlign: "center",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Cancellation Policy
              </div>

              <div
                onClick={handlePayment}
                className="col-md-5  poppins-black"
                style={{
                  backgroundColor: "darkred",
                  padding: "8px",
                  color: "white",
                  textAlign: "center",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Pay Now
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Policy */}

      <Modal show={show6} centered style={{ padding: "15px" }}>
        <Modal.Header closeButton>
          <Modal.Title
            className="poppins-semibold"
            id="contained-modal-title-vcenter"
          >
            Cancellation Policy
          </Modal.Title>
        </Modal.Header>
        <i
          onClick={handleClose6}
          className="fa-solid fa-x"
          style={{
            backgroundColor: "darkred",
            padding: "8px",
            width: "30px",
            textAlign: "center",
            color: "white",
            fontSize: "15px",
            borderRadius: "50px",
            position: "absolute",
            right: "15px",
            top: "15px",
            fontSize: "14px",
            // top: "70px",
          }}
        ></i>
        <Modal.Body>
          <div className="poppins-regular" style={{}}>
            We understand that plans can change. Our cancellation policy is
            designed to be fair and transparent for all our customers.
          </div>

          <div className="d-flex mt-2">
            <div className="col-md-1">
              <i
                class="fa-solid fa-star"
                style={{ color: "green", fontSize: "16px" }}
              ></i>
            </div>
            <div className="col-md-11 mt-1 poppins-regular cancellation_text">
              No Cancellation Charges !!
            </div>
          </div>

          <div className="d-flex mt-2">
            <div className="col-md-1">
              <i
                class="fa-solid fa-star"
                style={{ color: "green", fontSize: "16px" }}
              ></i>
            </div>
            <div className="col-md-11 mt-1 poppins-regular cancellation_text">
              Cancellation Charges !!
            </div>
          </div>

          <div className="d-flex mt-2">
            <div className="col-md-1">
              <i
                class="fa-solid fa-star"
                style={{ color: "green", fontSize: "16px" }}
              ></i>
            </div>
            <div className="col-md-11 mt-1 poppins-regular cancellation_text">
              Within 4 Hours to 1 Hour Before Scheduled Slot: Full House
              Cleaning: ₹500
            </div>
          </div>

          <div className="d-flex mt-2">
            <div className="col-md-1">
              <i
                class="fa-solid fa-star"
                style={{ color: "green", fontSize: "16px" }}
              ></i>
            </div>
            <div className="col-md-11 mt-1 poppins-regular cancellation_text">
              Sofa/Kitchen/Bathroom/Mini-Services Cleaning: ₹100
            </div>
          </div>

          <div className="d-flex mt-2">
            <div className="col-md-1">
              <i
                class="fa-solid fa-star"
                style={{ color: "green", fontSize: "16px" }}
              ></i>
            </div>
            <div className="col-md-11 mt-1 poppins-regular cancellation_text">
              Home Repair Services : 200
            </div>
          </div>

          <div className="d-flex mt-2">
            <div className="col-md-1">
              <i
                class="fa-solid fa-star"
                style={{ color: "green", fontSize: "16px" }}
              ></i>
            </div>
            <div className="col-md-11 mt-1 poppins-regular cancellation_text">
              Appliances Services : 200
            </div>
          </div>

          <div className="d-flex mt-2">
            <div className="col-md-1">
              <i
                class="fa-solid fa-star"
                style={{ color: "green", fontSize: "16px" }}
              ></i>
            </div>
            <div className="col-md-11 mt-1 poppins-regular cancellation_text">
              Within 1 Hour and After Scheduled Slot: Full House Cleaning: ₹700
            </div>
          </div>

          <div className="d-flex mt-2">
            <div className="col-md-1">
              <i
                class="fa-solid fa-star"
                style={{ color: "green", fontSize: "16px" }}
              ></i>
            </div>
            <div className="col-md-11 mt-1 poppins-regular cancellation_text">
              Sofa/Kitchen/Bathroom/Mini-Services Cleaning: ₹150
            </div>
          </div>

          <div className="d-flex mt-2">
            <div className="col-md-1">
              <i
                class="fa-solid fa-star"
                style={{ color: "green", fontSize: "16px" }}
              ></i>
            </div>
            <div className="col-md-11 mt-1 poppins-regular cancellation_text">
              We appreciate your understanding and cooperation.
            </div>
          </div>

          <div className="d-flex mt-2">
            <div className="col-md-1">
              <i
                class="fa-solid fa-star"
                style={{ color: "green", fontSize: "16px" }}
              ></i>
            </div>
            <div className="col-md-11 mt-1 poppins-regular cancellation_text">
              Please contact us as soon as possible if you need to cancel or
              reschedule your service to avoid any charges.
            </div>
          </div>

          <div className="d-flex mt-2">
            <div className="col-md-1">
              <i
                class="fa-solid fa-star"
                style={{ color: "green", fontSize: "16px" }}
              ></i>
            </div>
            <div className="col-md-11 mt-1 poppins-regular cancellation_text">
              Before 4 Hours: If you cancel your service more than 4 hours
              before the scheduled slot, there will be no cancellation charges.
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* payment getway */}
      <Modal show={paymentModel} centered onHide={handleClose}>
        <Modal.Header>
          <Modal.Title
            style={{ fontSize: "20px", color: "black", fontWeight: "bold" }}
          >
            Confirm Payment
            <i
              onClick={handleClose3}
              className="fa-solid fa-x"
              style={{
                backgroundColor: "darkred",
                padding: "10px",
                width: "30px",
                textAlign: "center",
                color: "white",
                fontSize: "10px",
                borderRadius: "50px",
                position: "absolute",
                right: "18px",
              }}
            ></i>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: "center", fontSize: "16px" }}>
          <p>
            <i
              className="fa fa-exclamation-circle"
              style={{ fontSize: "24px", color: "darkred" }}
            ></i>
          </p>
          <p>Are you sure you want to proceed with the payment?</p>
          <a
            href={Url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
            className="mt-3"
          >
            <Button variant="primary" style={{ backgroundColor: "darkred" }}>
              Yes, proceed
            </Button>
          </a>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Upcomingdetail;
