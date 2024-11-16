import React, { useState } from "react";
import Footer from "./Footer";
import hbanner1 from "../../src/assests/hbanner1.jpg";
import { Modal } from "react-bootstrap";
import careerimg from "../../src/assests/careerimg.jpg";

function Career() {
  const [show, setShow] = useState(false);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [message, setmessage] = useState("");
  const [resume, setresume] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <div
        className="row"
        style={{ backgroundColor: "aliceblue", padding: "20px" }}
      >
        <div className="col-md-6">
          <div className="poppins-black">Career@Vijay Home Services</div>
        </div>
        <div className="col-md-6">
          <div className="poppins-black">
            <a
              className="poppins-black"
              href="/"
              style={{ textDecoration: "none", color: "black" }}
            >
              Home
            </a>
          </div>
        </div>
      </div>
      <div className="container">
        <div
          className="row"
          style={{ backgroundColor: "white", padding: "45px" }}
        >
          <div className="col-md-6">
            <div className="poppins-semibold">WE ARE HIRING!</div>
            <div className="poppins-thin-italic mt-2">Let's grow together.</div>
            <div className="poppins-regular mt-2">
              We are the fastest growing home cleaning service brand in the
              country, and we offer the best cleaning, painting & pest control
              services. We also make sure to 100% satisfy our customers with the
              best services. You can join us in our journey. just find the best
              positions in the given vacancies below.
            </div>

            <a
              href="https://www.linkedin.com/company/vijay-home-services/jobs/?viewAsMember=true"
              style={{ textDecoration: "none" }}
            >
              <div
                // onClick={handleShow}
                className="poppins-black mt-3"
                style={{
                  backgroundColor: "blue",
                  padding: "7px",
                  textAlign: "center",
                  width: "50%",
                  borderRadius: "5px",
                  color: "white",
                  fontSize: "14px",
                }}
              >
                See all Opportunity
              </div>
            </a>
          </div>
          <div
            className="col-md-6"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={careerimg}
              alt="hbanner3"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>
      </div>

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Body>
          <div className="poppins-semibold">Form</div>

          <div className="mt-2">
            <div className="poppins-light">Name</div>
            <input
              type="text"
              className="input col-md-12 mt-2 vhs-input-value"
              onChange={(e) => setname(e.target.value)}
            />
          </div>

          <div className="">
            <div className="poppins-light">Email</div>
            <input
              type="text"
              className="input col-md-12 mt-2 vhs-input-value"
              onChange={(e) => setemail(e.target.value)}
            />
          </div>

          <div className="">
            <div className="poppins-light">Mobile Number</div>
            <input
              type="number"
              className="input col-md-12 mt-2 vhs-input-value"
              onChange={(e) => setphone(e.target.value)}
            />
          </div>

          <div className="">
            <div className="poppins-light">Message</div>
            <input
              type="text"
              className="input col-md-12 mt-2 vhs-input-value"
              onChange={(e) => setmessage(e.target.value)}
            />
          </div>

          <div className="">
            <div className="poppins-light">Upload Resume</div>
            <input
              type="file"
              className="input  mt-2 "
              onChange={(e) => setresume(e.target.value)}
            />
          </div>

          <div
            onClick={handleClose}
            className="poppins-black"
            style={{
              backgroundColor: "darkred",
              padding: "7px",
              borderRadius: "5px",
              marginTop: "20px",
              color: "white",
              textAlign: "center",
            }}
          >
            Submit
          </div>
        </Modal.Body>
      </Modal>
      <Footer />
    </div>
  );
}
export default Career;
