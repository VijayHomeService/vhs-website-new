import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import nodata from "../assests/nodata.mp4";

function Enquiry() {
  const [enquiry, setEnquiry] = useState([]);
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userValue = localStorage.getItem("user");
        if (userValue) {
          setValue(JSON.parse(userValue));
        }
      } catch (error) {
        console.error("Error retrieving user data:", error);
      }
    };

    getUserData();
  }, []);

  console.log("valuesuman", value?._id);

  useEffect(() => {
    if (value) {
      getEnquiry();
    }
  }, [value]);

  const getEnquiry = async () => {
    try {
      const res = await axios.get(
        `https://api.vijayhomeservicebengaluru.in/api/findwithuseridinenquiryfollowup/${value?._id}`
      );
      if (res.status === 200) {
        setEnquiry(res.data?.enquiryfollowup);
      }
    } catch (error) {
      console.error("Error fetching enquiry data:", error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  console.log("enquiry=====", enquiry);

  return (
    <div className="container">
      {isLoading ? (
        <div className="text-center">My Bookings Page</div>
      ) : (
        <div className="">
          {enquiry.length === 0 ? (
            <div className="">
              <div
                className="mt-3"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <video
                  src={nodata} // The path should be relative to the public folder
                  className="no-data-video"
                  muted={false}
                  loop
                  autoPlay
                  style={{ width: "250px", height: "250px" }}
                />
              </div>
              <p
                className="poppins-black mt-2"
                style={{ color: "black", textAlign: "center" }}
              >
                No data found!
              </p>
            </div>
          ) : (
            <div className="mb-5">
              {enquiry.map((item) => (
                <div className="row" style={{ justifyContent: "center" }}>
                  <div
                    className="col-md-8 mt-3"
                    style={{
                      border: "1px solid grey",
                      padding: "10px",
                      borderRadius: "5px",
                    }}
                    onClick={() =>
                      navigate("/enquirydetails", {
                        state: { enquirydata: item },
                      })
                    }
                  >
                    <h3 className="poppins-black" style={{ color: "darkred" }}>
                      {item.category}
                    </h3>
                    {item.appoDate && (
                      <div className="price-date">
                        <span
                          className="poppins-regular"
                          style={{ color: "black" }}
                        >
                          {item.appoTime}
                        </span>
                        <span
                          className="poppins-regular mx-1"
                          style={{ color: "black" }}
                        >
                          {" "}
                          {item.appoDate}
                        </span>
                      </div>
                    )}
                    <div className="poppins-regular" style={{ color: "black" }}>
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Enquiry;
