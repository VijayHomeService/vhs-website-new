import React, { useEffect, useState } from "react";
import NavbarCompo from "./navbar";
import Homenavbar from "./Homenavbar";
import Footer from "./Footer";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";

function Categeries() {
  const [categorydata, setCategoryData] = useState([]);
  const [openResetModal, setOpenResetModal] = useState(false);
  const [city, setCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [activeCity, setActiveCity] = useState("");

  const navigate = useNavigate();

  const handleResetModal = () => {
    setOpenResetModal(true);
  };
  const handleChange = (city) => {
    setOpenResetModal(false);
    setActiveCity(city.city);
    setSelectedCity(city.city);
    // navigate(`/services${city.city}`);
  };

  useEffect(() => {
    getCity();
  }, []);

  const getCity = async () => {
    try {
      let res = await axios.get(
        "https://api.vijayhomesuperadmin.in/api/master/getcity"
      );
      if (res.status === 200) {
        const sortedCities = res.data.mastercity.sort((a, b) =>
          a.city.localeCompare(b.city)
        );
        setCity(sortedCities);
      }
    } catch (er) {
      console.log(er, "err while fetching data");
    }
  };

  useEffect(() => {
    setOpenResetModal(true);
  }, []);

  useEffect(() => {
    getsubcategory();
  }, []);
  const getsubcategory = async () => {
    try {
      let res = await axios.get(
        `https://api.vijayhomesuperadmin.in/api/userapp/getappsubcat`
      );

      if ((res.status = 200)) {
        setCategoryData(res.data.subcategory);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const generatePathname = (subcategory, city) => {
    const sanitizedSubcategory = subcategory
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/-in/g, ""); // Remove any existing "-in" from subcategory
    
    const sanitizedCity = city
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/-in/g, ""); // Remove any existing "-in" from city
    
    return `/services/${sanitizedSubcategory}${sanitizedCity}`;
  };

  console.log("active", activeCity);
  console.log("categorydata", categorydata);
  return (
    <div>
      <NavbarCompo />
      <Homenavbar />
      <div className="container">
        <div className="row mt-3" style={{ justifyContent: "center" }}>
          <div className="poppins-semibold text-center">
            Choose Your Service
          </div>
          <div className="row mt-3">
            {categorydata.map((data) => (
              <div className="col-md-2">
                <Link
                  to={{
                    pathname: generatePathname(data.subcategory, city),
                  }}
                  state={({ subcategory: data.subcategory }, { data: data })}
                  style={{ textDecoration: "none" }}
                >
                  <div className="d-flex" style={{ justifyContent: "center" }}>
                    <img
                      src={data.imglink}
                      alt="category Images"
                      style={{
                        borderRadius: "50px",
                        width: "100px",
                        height: "100px",
                      }}
                    />
                  </div>
                  <div
                    className="poppins-regular mb-4"
                    style={{ color: "black", textAlign: "center" }}
                  >
                    {data?.subcategory}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal
        show={openResetModal}
        style={{ width: "100%" }}
        centered
        onHide={handleResetModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <div className="modal_grid">
          <div className="modal_header">
            <img src="./assests/locationmap.jpg" alt="city images" />
          </div>

          <div className="modal_body">
            <div
              className="title poppins-semibold"
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                paddingBottom: "20px",
              }}
            >
              <span>
                <img
                  src="./assests/indiaflg.png"
                  alt="loading..."
                  style={{
                    width: "23px",
                    height: "23px",
                    marginRight: "10px",
                    borderRadius: "50px",
                  }}
                />
              </span>
              India
            </div>
            <div className="city-grid">
              {city.map((city) => (
                <div className="city-item" key={city._id}>
                  <div
                    className={`city-name ${
                      activeCity === city.city ? "active" : ""
                    }`}
                    onClick={() => handleChange(city)}
                  >
                    <i
                      className={`fa-solid fa-location-dot ${
                        activeCity === city.city ? "active-icon" : ""
                      }`}
                      style={{
                        color: "darkred",
                        marginTop: "3px",
                        fontSize: "15px",
                      }}
                    ></i>
                    <p className="poppins-regular">{city.city}</p>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="row mt-4"
              style={{ justifyContent: "flex-start", alignItems: "flex-start" }}
            >
              <div className="col-md-5">
                <div className=" poppins-semibold mt-1">
                  <span>
                    <img
                      src="./assests/dubai.png"
                      alt="loading..."
                      style={{
                        width: "23px",
                        height: "23px",
                        marginRight: "10px",
                        borderRadius: "50px",
                      }}
                    />
                  </span>
                  Dubai{" "}
                  <span
                    className="poppins-light"
                    style={{
                      color: "grey",
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                  >
                    Coming Soon
                  </span>
                </div>
              </div>
              <div className="col-md-5">
                <div className=" poppins-semibold mt-1">
                  <span>
                    <img
                      src="./assests/london.webp"
                      alt="loading..."
                      style={{
                        width: "23px",
                        height: "23px",
                        marginRight: "10px",
                        borderRadius: "50px",
                      }}
                    />
                  </span>
                  London{" "}
                  <span
                    className="poppins-light"
                    style={{
                      color: "grey",
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                  >
                    Coming Soon
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Footer />
    </div>
  );
}
export default Categeries;
