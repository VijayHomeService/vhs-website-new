import React, { useState, useEffect, useRef } from "react";
import "../Component/layout.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { SpinnerCircular } from "spinners-react";
import { Modal } from "react-bootstrap";
import NabarCompo from "./navbar";
import "./layout.css";
import Footer from "./Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/navigation"; // Import navigation CSS
import { useSelector, useDispatch } from "react-redux";
import { FreeMode, Pagination, Autoplay, Navigation } from "swiper/modules";
import { useLocation } from "react-router-dom";


// updated home
export default function Home() {
  const [bannerdata, setBannerdata] = useState([]);
  const [thoughtfull, setthoughtfull] = useState([]);
  const [openResetModal, setOpenResetModal] = useState(false);
  const [city, setCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [activeCity, setActiveCity] = useState("");
  const location = useLocation();

  const [slidesPerView, setSlidesPerView] = useState(5);

  const queryString = window.location.search;

  const getQueryParams = (queryString, param) => {
    const params = new URLSearchParams(queryString);
    return params.get(param);
  };

  const utmSource = getQueryParams(queryString, "utm_source");

  useEffect(() => {
    const fullQueryString = location.search;

    if (fullQueryString) {
      localStorage.setItem("fullQuery", fullQueryString);
    }
  }, [location]);

  const storedQuery = localStorage.getItem("fullQuery");

  useEffect(() => {
    if (utmSource) {
      localStorage.setItem("utm_source", utmSource);
    }
  }, [utmSource]);

  // Searc Modal
  const [searchlist, setSearchlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const localstoragecitys = localStorage.getItem("city");

  useEffect(() => {
    getsearch();
  }, []);

  const getsearch = async () => {
    let res = await axios.get(
      "https://api.vijayhomeservicebengaluru.in/api/userapp/getappsubcat"
    );
    if (res.status === 200) {
      setSearchlist(res.data?.subcategory);
    }
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = searchlist.filter((data) => {
        const categoryMatches = data.category
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const subcategoryMatches = data.subcategory
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        return categoryMatches || subcategoryMatches;
      });
      setFilteredResults(filtered);
    } else {
      setFilteredResults([]); // Clear the results when the search query is empty
    }
  }, [searchQuery, searchlist]);

  useEffect(() => {
    setOpenResetModal(true);
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState({
    value: "0",
    text: "Select City",
    icon: (
      <svg id="flag-icons-in" viewBox="0 0 640 480">
        <path fill="#f93" d="M0 0h640v160H0z" />
        <path fill="#fff" d="M0 160h640v160H0z" />
        <path fill="#128807" d="M0 320h640v160H0z" />
        <g transform="matrix(3.2 0 0 3.2 320 240)">
          <circle r="20" fill="#008" />
          <circle r="17.5" fill="#fff" />
          <circle r="3.5" fill="#008" />
          <g id="d">
            <g id="c">
              <g id="b">
                <g id="a" fill="#008">
                  <circle r=".9" transform="rotate(7.5 -8.8 133.5)" />
                  <path d="M0 17.5.6 7 0 2l-.6 5L0 17.5z" />
                </g>
                <use width="100%" height="100%" transform="rotate(15)" />
              </g>
              <use width="100%" height="100%" transform="rotate(30)" />
            </g>
            <use width="100%" height="100%" transform="rotate(60)" />
          </g>
          <use width="100%" height="100%" transform="rotate(120)" />
          <use width="100%" height="100%" transform="rotate(-120)" />
        </g>
      </svg>
    ),
  });

  const handleChange = (city) => {
    setOpenResetModal(false);
    setActiveCity(city.city);
    setSelectedCity(city.city);
    // localStorage.setItem("city", city.city);
    navigate(`/${city.city}`);
  };

  useEffect(() => {
    getCity();
  }, []);

  const getCity = async () => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetModal = () => {
    setOpenResetModal(true);
  };

  return (
    <>
   
      {isLoading ? (
        <>
          <div className="row m-auto text-center" style={{ height: "100vh" }}>
            <div className="col-md-4"></div>
            <div className="col-md-4 m-auto ">
              <SpinnerCircular
                size={90}
                thickness={87}
                speed={80}
                color="rgba(27, 22, 22, 1)"
                secondaryColor="rgba(214, 191, 91, 1)"
              />
            </div>

            <div className="col-md-4"></div>
          </div>
        </>
      ) : (
        <>
          <NabarCompo />

          <Footer />
        </>
      )}

      <Modal
        show={openResetModal}
        style={{ width: "100%" }}
        centered
        onHide={handleResetModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <div className="web-city-modal">
          <div className="modal_grid">
            <div className="modal_header">
              <img
                src="./assests/locationmap.jpg"
                alt="city images"
                style={{ width: "100%", height: "175px" }}
              />
            </div>

            <div className="modal_body p-3">
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
                  <div className="city-item" key={city?._id}>
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
                className="poppins-semibold mt-2"
                style={{ textAlign: "left" }}
              >
                Coming Soon
              </div>
              <div
                className="d-flex mt-2"
                style={{ justifyContent: "center", gap: "40px" }}
              >
                <div className="col-md-6">
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
                  </div>
                </div>
                <div className="col-md-6">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mobile-city-modal">
          <div className="modal_grid">
            <div className="modal_header">
              <img
                src="https://vijayahomeservices.b-cdn.net/pcity1.webp"
                alt="city images"
                className="city_images"
              />
            </div>

            <div className="modal_body p-3">
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
                  <div className="city-item" key={city?._id}>
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
                className="poppins-semibold mt-2"
                style={{ textAlign: "left" }}
              >
                Coming Soon
              </div>
              <div
                className="d-flex mt-2"
                style={{ justifyContent: "center", gap: "40px" }}
              >
                <div className="col-md-6">
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
                  </div>
                </div>
                <div className="col-md-6">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
