import React, { useState } from "react";
import Homenavbar from "./Homenavbar";
import NavbarCompo from "./navbar";
import Footer from "./Footer";
import joinus from "../../src/assests/joinus.png";
import joinus1 from "../../src/assests/joinus1.png";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { Checkbox, TextField, Grid, Box } from "@mui/material";
import axios from "axios";
import { set } from "lodash";

function Registerus() {
  const services = [
    "Refrigerator Repair",
    "Washing Machine Repair",
    "Air Conditioning Repair / Service",
    "TV Installation / Repair",
    "Microwave Oven Repair",
  ];

  const [selectedServices, setSelectedServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCheckboxChange = (event) => {
    const { checked, value } = event.target;
    if (checked) {
      setSelectedServices([...selectedServices, value]);
    } else {
      setSelectedServices(
        selectedServices.filter((service) => service !== value)
      );
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredServices = services.filter((service) =>
    service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [service, setservice] = useState("");
  const [city, setcity] = useState("");
  const [companyName, setcompanyName] = useState("");
  const [aadhaarNo, setaadhaarNo] = useState("");
  const [gst, setgst] = useState("");
  const [contact1Name, setcontact1Name] = useState("");
  const [contact1Mobile, setcontact1Mobile] = useState("");
  const [contact1Email, setcontact1Email] = useState("");
  const [address1, setaddress1] = useState("");
  const [pincode, setpincode] = useState("");
  const [streetLocation, setstreetLocation] = useState("");
  const [housePlot, sethousePlot] = useState("");
  const [apartmentBuilding, setapartmentBuilding] = useState("");
  const [landmark, setlandmark] = useState("");
  const [blockCity, setblockCity] = useState("");
  const [district, setdistrict] = useState("");
  const [state, setstate] = useState("");
  const [country, setcountry] = useState("");
  const [pincodeServe, setpincodeServe] = useState("");
  const [areaServe, setareaServe] = useState("");
  const [pinstate, setpinstate] = useState("");
  const [pindistrict, setpindistrict] = useState("");
  const [pinblock, setpinblock] = useState("");

  const [formData, setFormData] = useState({
    service: "",
    city: "",
    companyName: "",
    aadhaarNo: "",
    gst: "",
    contact1Name: "",
    contact1Mobile: "",
    contact1Email: "",
    address1: "",
    pincode: "",
    streetLocation: "",
    housePlot: "",
    apartmentBuilding: "",
    landmark: "",
    blockCity: "",
    district: "",
    state: "",
    country: "",
    pincodeServe: "",
    areaServe: "",
    pinstate: "",
    pindistrict: "",
    pinblock: "",
    // Initialize file states
    photo: null,
    aadhaarFront: null,
    aadhaarBack: null,
  });

  // Step 2: Handle text field changes
  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Step 3: Handle file changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0], // Take the first selected file
    });
  };

  const handleSubmit1 = async (e) => {
    e.preventDefault();

    try {
      const config = {
        url: "/send-email1",
        method: "post",
        baseURL: "https://api.vijayhomeservicebengaluru.in/api",
        headers: { "Content-Type": "application/json" },
        data: {
          service,
          city,
          companyName,
          aadhaarNo,
          gst,
          contact1Name,
          contact1Mobile,
          contact1Email,
          address1,
          pincode,
          streetLocation,
          housePlot,
          apartmentBuilding,
          landmark,
          blockCity,
          district,
          state,
          country,
          pincodeServe,
          areaServe,
          // aadhaarFront,
          // aadhaarBack,
          pinstate,
          pindistrict,
          pinblock,
          // photo,
        },
      };

      const response = await axios(config);

      if (response.status === 200) {
        alert("Email sent successfully!");
        window.location.reload("");
        // setName("");
        // setContactNo("");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Email sent successfully!");
      window.location.reload("");
    }
  };

  // Step 4: Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formPayload = new FormData(); // Use FormData for multipart form submission

    // Append all text fields
    for (const key in formData) {
      if (formData[key] instanceof File) {
        formPayload.append(key, formData[key]); // Append files
      } else {
        formPayload.append(key, formData[key]); // Append text fields
      }
    }

    try {
      const response = await fetch("http://localhost:8080/api/send-email1", {
        method: "POST",
        body: formPayload, // Send FormData
      });

      const result = await response.json();
      if (response.ok) {
        alert("Form submitted and email sent successfully!");
      } else {
        alert(`Failed to submit: ${result.message}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form.");
    }
  };

  return (
    <div>
      <NavbarCompo />
      <Homenavbar />
      <div className="container">
        <div className="">
          <img src={joinus} alt="vhs" style={{ width: "100%" }} />

          <div className="poppins-black mt-3">
            All <span style={{ color: "red" }}> * </span> fields are mandatory
          </div>

          <div className="row mt-3">
            <div className="col-md-6">
              <div className="poppins-black">
                Choose Your Services <span style={{ color: "red" }}> *</span>
              </div>
              <input
                type="text"
                placeholder="Search for services..."
                value={service}
                onChange={(e) => setservice(e.target.value)}
                className="j-input"
                style={{ width: "100%" }}
              />
              {/* {searchQuery && (
                <ul className="service-items">
                  {filteredServices.map((service) => (
                    <li key={service} className="service-item">
                      <label>
                        <input
                          type="checkbox"
                          value={service}
                          checked={selectedServices.includes(service)}
                          onChange={handleCheckboxChange}
                        />
                        {service}
                      </label>
                    </li>
                  ))}
                </ul>
              )}
              {searchQuery && selectedServices.length > 0 && (
                <div className="selected-services">
                  <h3>Selected Services</h3>
                  <ul>
                    {selectedServices.map((service) => (
                      <li key={service}>{service}</li>
                    ))}
                  </ul>
                </div>
              )} */}
            </div>
            <div className="col-md-6">
              <div className="poppins-black">
                Select Your City <span style={{ color: "red" }}> *</span>
              </div>
              <input
                value={city}
                onChange={(e) => setcity(e.target.value)}
                type="text"
                className="j-input col-md-12"
              />
            </div>
          </div>

          <div className="">
            <div
              className="border mt-3"
              style={{ borderRadius: "5px", padding: "5px 20px" }}
            >
              <div className="poppins-black mt-3">
                Vendor Information <span style={{ color: "red" }}>* </span>
              </div>
              <div className="row mt-2">
                <div className="col-md-4">
                  <div className="poppins-regular">
                    Company Name <span style={{ color: "red" }}>* </span>
                  </div>
                  <input
                    value={companyName}
                    onChange={(e) => setcompanyName(e.target.value)}
                    type="text"
                    className="j-input col-md-12"
                  />
                </div>
                <div className="col-md-4">
                  <div className="poppins-regular">
                    Aadhaar No <span style={{ color: "red" }}>* </span>
                  </div>
                  <input
                    value={aadhaarNo}
                    onChange={(e) => setaadhaarNo(e.target.value)}
                    type="text"
                    className="j-input col-md-12"
                  />
                </div>
                <div className="col-md-4">
                  <div className="poppins-regular">
                    GST <span style={{ color: "red" }}>* </span>
                  </div>
                  <input
                    value={gst}
                    onChange={(e) => setgst(e.target.value)}
                    type="text"
                    className="j-input col-md-12"
                  />
                </div>
              </div>
            </div>

            <div className="">
              <div className="poppins-black mt-3">
                Contacts <span style={{ color: "red" }}>* </span>
              </div>
              <div
                className="border mt-2"
                style={{ borderRadius: "5px", padding: "5px 20px" }}
              >
                <div className="row mt-2">
                  <div className="poppins-black mb-2">
                    Contact 1 <span style={{ color: "red" }}>* </span>
                  </div>
                  <div className="col-md-4">
                    <div className="poppins-regular">
                      Name <span style={{ color: "red" }}>* </span>
                    </div>
                    <input
                      value={contact1Name}
                      onChange={(e) => setcontact1Name(e.target.value)}
                      type="text"
                      className="j-input col-md-12"
                    />
                  </div>
                  <div className="col-md-4">
                    <div className="poppins-regular">
                      Mobile No <span style={{ color: "red" }}>* </span>
                    </div>
                    <input
                      value={contact1Mobile}
                      onChange={(e) => setcontact1Mobile(e.target.value)}
                      type="text"
                      className="j-input col-md-12"
                    />
                  </div>
                  <div className="col-md-4">
                    <div className="poppins-regular">
                      Email (optional) <span style={{ color: "red" }}>* </span>
                    </div>
                    <input
                      value={contact1Email}
                      onChange={(e) => setcontact1Email(e.target.value)}
                      type="text"
                      className="j-input col-md-12"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="">
              <div className="poppins-black mt-3">
                Address <span style={{ color: "red" }}>* </span>
              </div>
              <div
                className="border mt-2"
                style={{ borderRadius: "5px", padding: "5px 20px" }}
              >
                <div className="row mt-2">
                  <div className="d-flex" style={{}}>
                    <div className="col-md-11">
                      <div className="poppins-black mb-2">
                        Address 1 <span style={{ color: "red" }}>* </span>
                      </div>
                    </div>
                    <div
                      className="col-md-1"
                      style={{ display: "flex", justifyContent: "end" }}
                    >
                      <i
                        className="fa-solid fa-trash"
                        style={{ color: "red", fontSize: "18px" }}
                      ></i>
                    </div>
                  </div>

                  <div className="row">
                    <div
                      className="col-md-6"
                      style={{ borderRight: "1px solid grey" }}
                    >
                      <div className="row">
                        <div className="col-md-5">
                          <div className="poppins-regular">
                            Pincode <span style={{ color: "red" }}>* </span>
                          </div>
                          <input
                            value={pincode}
                            onChange={(e) => setpincode(e.target.value)}
                            type="text"
                            className="j-input col-md-12"
                          />
                        </div>
                        <div className="col-md-7">
                          <div className="poppins-regular">
                            Street/Location/Village{" "}
                            <span style={{ color: "red" }}>* </span>
                          </div>
                          <input
                            value={streetLocation}
                            onChange={(e) => setstreetLocation(e.target.value)}
                            type="text"
                            className="j-input col-md-12"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4">
                          <div className="poppins-regular">
                            House#/Flat#/Plot#{" "}
                            <span style={{ color: "red" }}>* </span>
                          </div>
                          <input
                            value={housePlot}
                            onChange={(e) => sethousePlot(e.target.value)}
                            type="text"
                            className="j-input col-md-12"
                          />
                        </div>
                        <div className="col-md-4">
                          <div className="poppins-regular">
                            Apartment/Building{" "}
                            <span style={{ color: "red" }}>* </span>
                          </div>
                          <input
                            value={apartmentBuilding}
                            onChange={(e) =>
                              setapartmentBuilding(e.target.value)
                            }
                            type="text"
                            className="j-input col-md-12"
                          />
                        </div>
                        <div className="col-md-4">
                          <div className="poppins-regular">
                            Landmark <span style={{ color: "red" }}>* </span>
                          </div>
                          <input
                            value={landmark}
                            onChange={(e) => setlandmark(e.target.value)}
                            type="text"
                            className="j-input col-md-12"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="poppins-regular">
                            Block/Town/City{" "}
                            <span style={{ color: "red" }}>* </span>
                          </div>
                          <input
                            value={blockCity}
                            onChange={(e) => setblockCity(e.target.value)}
                            type="text"
                            className="j-input col-md-12"
                          />
                        </div>
                        <div className="col-md-6">
                          <div className="poppins-regular">
                            District <span style={{ color: "red" }}>* </span>
                          </div>
                          <input
                            value={district}
                            onChange={(e) => setdistrict(e.target.value)}
                            type="text"
                            className="j-input col-md-12"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="poppins-regular">
                            State <span style={{ color: "red" }}>* </span>
                          </div>
                          <input
                            value={state}
                            onChange={(e) => setstate(e.target.value)}
                            type="text"
                            className="j-input col-md-12"
                          />
                        </div>
                        <div className="col-md-6">
                          <div className="poppins-regular">
                            Country <span style={{ color: "red" }}>* </span>
                          </div>
                          <input
                            value={country}
                            onChange={(e) => setcountry(e.target.value)}
                            type="text"
                            className="j-input col-md-12"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="">
              <div className="poppins-black mt-3">
                Pin Codes you serve <span style={{ color: "red" }}>* </span>
              </div>
              <div
                className="border mt-2"
                style={{ borderRadius: "5px", padding: "5px 20px" }}
              >
                <div className="row mt-2">
                  <div className="d-flex" style={{}}>
                    <div className="col-md-11">
                      <div className="poppins-black mb-2">
                        Pincode 1 <span style={{ color: "red" }}>* </span>
                      </div>
                    </div>
                    <div
                      className="col-md-1"
                      style={{ display: "flex", justifyContent: "end" }}
                    >
                      <i
                        className="fa-solid fa-trash"
                        style={{ color: "red", fontSize: "18px" }}
                      ></i>
                    </div>
                  </div>

                  <div className="row">
                    <div
                      className="col-md-6"
                      style={{ borderRight: "1px solid grey" }}
                    >
                      <div className="row">
                        <div className="col-md-6">
                          <div className="poppins-regular">
                            Pincode <span style={{ color: "red" }}>* </span>
                          </div>
                          <input
                            name="pincodeServe"
                            value={pincodeServe}
                            onChange={(e) => setpincodeServe(e.target.value)}
                            type="text"
                            className="j-input col-md-12"
                          />
                        </div>
                        <div className="col-md-6">
                          <div className="poppins-regular">
                            Block/Town/City{" "}
                            <span style={{ color: "red" }}>* </span>
                          </div>
                          <input
                            name="pinblock"
                            value={pinblock}
                            onChange={(e) => setpinblock(e.target.value)}
                            type="text"
                            className="j-input col-md-12"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="poppins-regular">
                            District <span style={{ color: "red" }}>* </span>
                          </div>
                          <input
                            name="pindistrict"
                            value={pindistrict}
                            onChange={(e) => setpindistrict(e.target.value)}
                            type="text"
                            className="j-input col-md-12"
                          />
                        </div>
                        <div className="col-md-6">
                          <div className="poppins-regular">
                            State <span style={{ color: "red" }}>* </span>
                          </div>
                          <input
                            name="pinstate"
                            value={pinstate}
                            onChange={(e) => setpinstate(e.target.value)}
                            type="text"
                            className="j-input col-md-12"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="poppins-regular">
                        Areas you serve <span style={{ color: "red" }}>*</span>
                      </div>
                      <div class="input-group mb-3 mt-2">
                        <div class="input-group-prepend">
                          <div class="input-group-text">
                            <input
                              type="checkbox"
                              aria-label="Checkbox for following text input"
                            />
                          </div>
                        </div>
                        <input
                          type="text"
                          class="form-control"
                          aria-label="Text input with checkbox"
                          name="areaServe"
                          value={areaServe}
                          onChange={(e) => setareaServe(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="border mt-3"
              style={{ borderRadius: "5px", padding: "5px 20px" }}
            >
              <div className="poppins-black mt-3">
                Upload <span style={{ color: "red" }}>* </span>
              </div>
              <div className="row mt-2">
                <div className="col-md-4">
                  <div className="poppins-regular">
                    Photo <span style={{ color: "red" }}>* </span>
                  </div>
                  <input
                    type="file"
                    // name="photo"
                    // onChange={handleFileChange}
                    accept="image/*"
                    className="border mt-2 col-md-12"
                  />
                </div>
                <div className="col-md-4">
                  <div className="poppins-regular">
                    Aadhaar Card Front Side{" "}
                    <span style={{ color: "red" }}>* </span>
                  </div>
                  <input
                    type="file"
                    // name="aadhaarFront"
                    // onChange={handleFileChange}
                    accept="image/*"
                    className="border mt-2 col-md-12"
                  />
                </div>
                <div className="col-md-4">
                  <div className="poppins-regular">
                    Aadhaar Card Back Side{" "}
                    <span style={{ color: "red" }}>* </span>
                  </div>
                  <input
                    type="file"
                    // name="aadhaarBack"
                    // onChange={handleFileChange}
                    accept="image/*"
                    className="border mt-2 col-md-12"
                  />
                </div>
              </div>
            </div>

            <div
              className="d-flex mb-3 mt-3"
              style={{ justifyContent: "center" }}
            >
              <div
                onClick={handleSubmit1}
                className="poppins-black text-center"
                style={{
                  backgroundColor: "red",
                  padding: "8px",
                  borderRadius: "20px",
                  width: "20%",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Submit
              </div>
            </div>

            <div className="d-flex">
              <div className="col-md-10">
                <img
                  src={joinus1}
                  alt="VHS"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <div className="col-md-2 mt-5">
                <div
                  className=""
                  style={{
                    backgroundColor: "red",
                    padding: "10px",
                    borderRadius: "10px",
                  }}
                >
                  <a
                    href="tel:+918453748478"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div
                      className="poppins-black text-center"
                      style={{ color: "white" }}
                    >
                      Call Us Now
                    </div>
                    <div
                      className="poppins-black text-center"
                      style={{ color: "white" }}
                    >
                      +91-8453748478
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Registerus;
