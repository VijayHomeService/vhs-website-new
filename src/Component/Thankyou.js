import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import thankyou from "../../src/assests/thankyou.png";
import { Button } from "react-bootstrap";
import { useLoadScript } from '@react-google-maps/api';

function Thankyou() {
  useEffect(() => {
    // Create the script element
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.innerHTML = `
      gtag('event', 'conversion', {'send_to': 'AW-934679256/XXl5CMPnko0CENil2L0D'});
    `;

    // Append the script to the head
    document.head.appendChild(script);

    // Clean up: remove the script and timer when the component unmounts
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="container" style={{ height: "80vh" }}>
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-md-6 p-3" style={{ borderRadius: "5px" }}>
          <div
            className="d-flex"
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <img
              src={thankyou}
              alt="Thank you"
              style={{ width: "100px", height: "100px" }}
            />
          </div>
          <div
            className="poppins-semibold text-center mt-3"
            style={{ fontSize: "40px" }}
          >
            Thank you!
          </div>

          <div className="poppins text-center mt-1">
            For submitting the contact details our team will get back to you
            soon.
          </div>
          <div className="poppins text-center mt-1 ">
            To know more about Product and services.
          </div>

          <div
            className="mt-4"
            style={{
              width: "250px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              margin: "0 auto",
            }}
          >
            <Button onClick={() => window.location.assign("/")}>
              Visit Website
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Thankyou;
