import React, { useEffect, useRef, useState } from "react";
import Footer from "./Footer";
import vicon from "../../src/assets1/v-icon.svg";
import vicon1 from "../../src/assets1/v-icon1.svg";
import vicon2 from "../../src/assets1/v-icon2.svg";
import homebanner from "../../src/assets1/homebanner.jpg";
import vnicon from "../../src/assets1/vnicon.svg";
import vnicon2 from "../../src/assets1/vnicon2.svg";
import vnicon3 from "../../src/assets1/vnicon3.svg";
import Accordion from "react-bootstrap/Accordion";
import moment from "moment";
import axios from "axios";
import { Modal } from "react-bootstrap";
import cityimg from "../../src/assets1/cityimg.jpg";
import indiaflg from "../../src/assets1/indiaflg.png";
import dubai from "../src/../assets1/dubai.png";
import london from "../../src/assets1/london.webp";
import phomebanner from "../../src/assets1/phomebanner.jpg";
import { Autocomplete } from "@react-google-maps/api";
import Pheader from "./Pheader";
import Pmheader from "./Pmheader";
import Pmobileheader from "./Pmobileheader";
import { useLocation, useNavigate } from "react-router-dom";
import pcity1 from "../../src/assets1/pcity1.jpg";
import pcity2 from "../../src/assets1/pcity2.jpg";
// importing react-helmet
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import pmmobile from "../../src/assets1/pmmobile.jpg"; // Importing image

function Packersmovershome() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [openResetModal, setOpenResetModal] = useState(false);
  const [name, setname] = useState("");
  const [contact1, setcontact1] = useState("");
  const [email, setemail] = useState("");
  const [comment, setcomment] = useState("");
  const [enquirydate, setenquirydate] = useState(moment().format("MM-DD-YYYY"));
  const [city, setCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [activeCity, setActiveCity] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [mobilenumber, setMobilenumber] = useState("");
  const [shiftingdate, setshiftingdate] = useState("");
  const [customer, setcustomer] = useState("");
  const [selectcategory, setselectcategory] = useState("");
  const [selectAddress, setSelectAddress] = useState(null);
  const [selectAddress1, setSelectAddress1] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pickupLocationLat, setPickupLocationLat] = useState(null);
  const [pickupLocationLng, setPickupLocationLng] = useState(null);
  const [dropLocationLat, setDropLocationLat] = useState(null);
  const [dropLocationLng, setDropLocationLng] = useState(null);
  const location = useLocation();
  const { cityName } = location.state || {};

  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);

  console.log("user----", user?._id);

  console.log("cityName=====suman", cityName);

  // SEO work for Mackers and Movers
  const { cityname } = useParams(); // Fetch city name from URL parameters

  const metaTags = {
    Default: {
      title: "Packers and Movers | Call +91-8453748478",
      description:
        "Packers and Movers  offer comprehensive relocation services for residential and commercial needs, specializing in packing, loading, transporting, and unpacking goods with utmost care and efficiency.",
      canonical: "https://vijayhomeservices.com/packers-movers",
      keywords: "Packers and Movers , Movers and Packers ",
      image:
        "https://vijayahomeservices.b-cdn.net/Webp%20Format%E2%80%A6ategory/Packers%20%26%20Movers/Within%20City.webp",
    },
    /*Ahmedabad: {
      title: "Packers and Movers in Ahmedabad | Call +91-8453748478",
      description:
        "Packers and Movers in Ahmedabad offer comprehensive relocation services for residential and commercial needs, specializing in packing, loading, transporting, and unpacking goods with utmost care and efficiency.",
      canonical: "https://vijayhomeservices.com/Ahmedabad",
      keywords: "Packers and Movers in Ahmedabad,Movers and Packers Ahmedabad",
      image:
        "https://vijayahomeservices.b-cdn.net/Webp%20Format%E2%80%A6ategory/Packers%20%26%20Movers/Within%20City.webp",
    },
    Bhubaneswar: {
      title: "Packers and Movers in Bhubaneshwar | Call +91-8453748478",
      description:
        "Packers and Movers in Bhubaneshwar offer additional services such as warehousing, insurance coverage, and vehicle transportation to ensure smooth and hassle-free transitions during relocation.",
      canonical: "https://vijayhomeservices.com/Bhubaneswar",
      keywords: "Packers and Movers Bhubaneshwar",
      image:
        "https://vijayahomeservices.b-cdn.net/Webp%20Format%E2%80%A6ategory/Packers%20%26%20Movers/Within%20City.webp",
    },
    Bangalore: {
      title: "Packers and Mover in Bangalore | Vijay Home Services",
      description:
        "Choose the right Packers and Mover in Bangalore by checking customer reviews, service portfolios, and cost transparency for a reliable and satisfactory moving experience.",
      canonical: "https://vijayhomeservices.com/bangalore",
      keywords:
        "Bike transport service Bangalore,Packers and Mover in Bangalore,Movers and Packers Bangalore",
      image:
        "https://vijayahomeservices.b-cdn.net/Webp%20Format%E2%80%A6ategory/Packers%20%26%20Movers/Within%20City.webp",
    },
    Chennai: {
      title: "Packers and Movers in Chennai | Vijay Home Services",
      description:
        "Get a hassle-free relocation experience with Packers and Movers in Chennai using high-quality packing materials to safeguard your belongings. Call for details.",
      canonical: "https://vijayhomeservices.com/chennai",
      keywords: "Packers and Movers Chennai",
      image:
        "https://vijayahomeservices.b-cdn.net/Webp%20Format%E2%80%A6ategory/Packers%20%26%20Movers/Within%20City.webp",
    },
    Delhi: {
      title: "Packers and Movers in Delhi | Call +91-8453748478",
      description:
        "Packers and Movers in Delhi provide additional services like vehicle transportation, warehousing, and storage facilities, making them a one-stop solution for relocation needs.",
      canonical: "https://vijayhomeservices.com/delhi",
      keywords:
        "Car transport service delhi, Movers and Packers Delhi,Packers and Movers in Delhi",
      image:
        "https://vijayahomeservices.b-cdn.net/Webp%20Format%E2%80%A6ategory/Packers%20%26%20Movers/Within%20City.webp",
    },
    Faridabad: {
      title: "Packers and Movers in Faridabad | Vijay Home Services",
      description:
        "Choose Packers and Movers in Faridabad by considering reputation, customer reviews, service quality, and pricing to ensure a smooth and secure relocation experience. Call +91-8453748478 for details.",
      canonical: "https://vijayhomeservices.com/faridabad",
      keywords: "Packers and Movers in Faridabad",
      image:
        "https://vijayahomeservices.b-cdn.net/Webp%20Format%E2%80%A6ategory/Packers%20%26%20Movers/Within%20City.webp",
    },
    Ghaziabad: {
      title: "Packers and Movers in Ghaziabad | Call +91-8453748478",
      description:
        "Packers and Movers in Ghaziabad provide expert manpower to handle every step of the relocation process efficiently, from disassembling to reassembling furniture, saving time and reducing stress.",
      canonical: "https://vijayhomeservices.com/ghaziabad",
      keywords: "Packers and Movers Ghaziabad, Packers and Movers in Ghaziabad",
      image:
        "https://vijayahomeservices.b-cdn.net/Webp%20Format%E2%80%A6ategory/Packers%20%26%20Movers/Within%20City.webp",
    },
    Gurugram: {
      title: "Packers and Movers in Gurugram | Vijay Home Services",
      description:
        "Packers and Movers in Gurugram provide specialized relocation services for residential, commercial, and industrial clients, offering end-to-end solutions with efficiency and reliability.",
      canonical: "https://vijayhomeservices.com/gurugram",
      keywords: "Packers and Movers in Gurugram",
      image:
        "https://vijayahomeservices.b-cdn.net/Webp%20Format%E2%80%A6ategory/Packers%20%26%20Movers/Within%20City.webp",
    },
    Hyderabad: {
      title: "Packers and Movers in Hyderabad | Call +91- 8453748478",
      description:
        "Professional packers and movers in Hyderabad are equipped with skilled manpower and modern tools for seamless disassembly and reassembly of furniture and large items. Call for details.",
      canonical: "https://vijayhomeservices.com/hyderabad",
      keywords: "Packers and Movers Hyderabad,Packers and Movers in Hyderabad",
      image:
        "https://vijayahomeservices.b-cdn.net/Webp%20Format%E2%80%A6ategory/Packers%20%26%20Movers/Within%20City.webp",
    },
    Kochi: {
      title: "Packers and Movers in Kochi | Vijay Home Services",
      description:
        "Choosing the right packers and movers in Kochi involves checking reputation, reviews, and service quality to ensure a smooth, efficient, and stress-free relocation process.",
      canonical: "https://vijayhomeservices.com/kochi",
      keywords: "Packers and Movers in Kochi",
      image:
        "https://vijayahomeservices.b-cdn.net/Webp%20Format%E2%80%A6ategory/Packers%20%26%20Movers/Within%20City.webp",
    },
    Kolkata: {
      title: "Packers and Movers in Kolkata | Call +91- 8453748478",
      description:
        "Packers and Movers in Kolkata provide specialized relocation services for residential, commercial, and industrial clients, catering to a wide array of customers. Call us for more details.",
      canonical: "https://vijayhomeservices.com/Kolkata",
      keywords: "Packers and Movers in Kolkata",
      image:
        "https://vijayahomeservices.b-cdn.net/Webp%20Format%E2%80%A6ategory/Packers%20%26%20Movers/Within%20City.webp",
    },
    Lucknow: {
      title: "Packers and Movers in Lucknow | Call +91- 8453748478",
      description:
        "Packers and Movers in Lucknow ensure smooth transitions for people and businesses moving within the city or to other states. Call us for details.",
      canonical: "https://vijayhomeservices.com/lucknow",
      keywords: "Packers and Movers Lucknow",
      image:
        "https://vijayahomeservices.b-cdn.net/Webp%20Format%E2%80%A6ategory/Packers%20%26%20Movers/Within%20City.webp",
    },
    Mumbai: {
      title: "Packers and Mover in Mumbai | Vijay Home Services",
      description:
        "Professional movers in Mumbai use high-quality packing materials like bubble wrap, corrugated boxes, and foam sheets to ensure the safety of your belongings. Visit our site for more details.",
      canonical: "https://vijayhomeservices.com/mumbai",
      keywords: "Packers and Movers Mumbai",
      image:
        "https://vijayahomeservices.b-cdn.net/Webp%20Format%E2%80%A6ategory/Packers%20%26%20Movers/Within%20City.webp",
    },
    Mysore: {
      title: "Packers and Movers in Mysore | Vijay Home Services",
      description:
        "Packers and Movers in Mysore handle heavy items like furniture, appliances, and machinery with care to ensure efficient and damage-free transportation. Call for details.",
      canonical: "https://vijayhomeservices.com/mysore",
      keywords: "Packers and Movers Mysore",
      image:
        "https://vijayahomeservices.b-cdn.net/Webp%20Format%E2%80%A6ategory/Packers%20%26%20Movers/Within%20City.webp",
    },
    NCR: {
      title: "Packers and Movers in NCR | Call +91- 8453748478",
      description:
        "Packers and Movers in NCR offer transportation services for local, intercity, or interstate relocations, utilizing various vehicles based on the volume of goods. Call us for details.",
      canonical: "https://vijayhomeservices.com/ncr",
      keywords: "Packers and Movers NCR",
      image:
        "https://vijayahomeservices.b-cdn.net/Webp%20Format%E2%80%A6ategory/Packers%20%26%20Movers/Within%20City.webp",
    },
    Noida: {
      title: "Packers and Movers in Noida | Vijay Home Services",
      description:
        "Packers and Movers in Noida offer safe vehicle transit using specific carriers, ensuring damage-free delivery. Call for more details.",
      canonical: "https://vijayhomeservices.com/noida",
      keywords: "Packers and Movers in Noida",
      image:
        "https://vijayahomeservices.b-cdn.net/Webp%20Format%E2%80%A6ategory/Packers%20%26%20Movers/Within%20City.webp",
    },
    Patna: {
      title: "Packers and Movers in Patna | Call +91- 8453748478",
      description:
        "Packers and Movers in Patna offer warehousing and storage facilities for short- or long-term needs, ideal for bridging moving gaps. Call for more information.",
      canonical: "https://vijayhomeservices.com/patna",
      keywords: "Packers and Movers Patna, Packers and Movers in Patna",
      image:
        "https://vijayahomeservices.b-cdn.net/Webp%20Format%E2%80%A6ategory/Packers%20%26%20Movers/Within%20City.webp",
    },
    Pune: {
      title: "Packers and Movers in Pune | Vijay Home Services",
      description:
        "Professional packers and movers in Pune handle relocations efficiently, minimizing the time and effort required to complete the move. Visit our site for details.",
      canonical: "https://vijayhomeservices.com/pune",
      keywords: "Packers and Movers in Pune",
      image:
        "https://vijayahomeservices.b-cdn.net/Webp%20Format%E2%80%A6ategory/Packers%20%26%20Movers/Within%20City.webp",
    },
    Surat: {
      title: "Packers and Movers in Surat | Call +91- 8453748478",
      description:
        "Packers and Movers in Surat handle all aspects of relocation, ensuring a hassle-free process by managing everything from start to finish. Call for more information.",
      canonical: "https://vijayhomeservices.com/surat",
      keywords: "Packers and Movers Surat, Packers and Movers in Surat",
      image:
        "https://vijayahomeservices.b-cdn.net/Webp%20Format%E2%80%A6ategory/Packers%20%26%20Movers/Within%20City.webp",
    },
    Vadodara: {
      title: "Packers and Movers in Vadodara | Vijay Home Services",
      description:
        "Look for Packers and Movers in Vadodara with a proven track record, particularly those experienced in both local and long-distance moves. Visit our site for more details.",
      canonical: "https://vijayhomeservices.com/vadodara",
      keywords: "Packers and Movers in Vadodara",
      image:
        "https://vijayahomeservices.b-cdn.net/Webp%20Format%E2%80%A6ategory/Packers%20%26%20Movers/Within%20City.webp",
    },
    Vizag: {
      title: "Packers and Movers in Vizag | Vijay Home Services",
      description:
        "Packers and Movers in Vizag provide essential services for relocation, offering expertise in packing, transporting, and handling various types of goods. Visit our site for more information.",
      canonical: "https://vijayhomeservices.com/vizag",
      keywords: "Packers and Movers Vizag",
      image:
        "https://vijayahomeservices.b-cdn.net/Webp%20Format%E2%80%A6ategory/Packers%20%26%20Movers/Within%20City.webp",
    },
    */
  };

  const currentMetaTags = metaTags[cityName] || metaTags["Default"]; // Fallback to Mumbai if city not found

  const [Data, setData] = useState([]);
  const autocompleteRef = useRef(null);
  const mapRef = useRef(null);
  const navigate = useNavigate();
  const handleResetModal = () => {
    setOpenResetModal(true);
  };

  useEffect(() => {
    // Scrolls to the top on component mount
    window.scrollTo(0, 0);
  }, []); // No dependencies, so it runs once on mount

  useEffect(() => {
    // Calls getService function when the component mounts
    getService();
  }, []); // No dependencies, so it runs once on mount

  //useEffect(() => {
  //window.scrollTo(0, 0);
  //}, []);

  //useEffect(() => {
  //getService();
  //}, []);

  const getService = async () => {
    try {
      let res = await axios.get(
        "https://pm.vijayhomeservice.in/api/service/getservice"
      );
      if (res.status === 200) {
        setData(res.data);
      }
    } catch (er) {
      console.log(er, "err while fetching data");
    }
  };

  const addEnquiry = async (e) => {
    e.preventDefault();

    if (!customer || !mobilenumber || !selectcategory) {
      alert("Please enter all fields");
    } else {
      try {
        const config = {
          url: "/enquiry/addenquiry",
          method: "post",
          baseURL: "https://pm.vijayhomeservice.in/api",

          headers: { "content-type": "application/json" },
          data: {
            date: enquirydate,
            customer: customer,
            contact1: mobilenumber,
            category: selectcategory,
            type: "Packers Movers",
            city: selectedCity,
          },
        };

        const response = await axios(config);

        if (response.status === 200) {
          const data = response.data.data;
          alert("Enquiry added successfully:", data);
          setShow(false);
          window.location.reload("");
        }
      } catch (error) {
        console.error("Error adding enquiry:", error);
      }
    }
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

  const handleChange = (city) => {
    setOpenResetModal(false);
    setActiveCity(city.city);
    setSelectedCity(city.city);
  };

  const autocompletePickupRef = useRef(null);
  const autocompleteDropRef = useRef(null);

  const cityToPass = selectedCity || cityName;

  const addpackersenquiry = async (e) => {
    e.preventDefault();
    if (!cityToPass) {
      alert("Please select a city");
      return;
    }

    if (!pickupLocation || !dropLocation || !mobilenumber || !shiftingdate) {
      alert("Please enter all fields");
    } else {
      setLoading(true);
      try {
        const config = {
          url: "/enquiry/addenquiry",
          method: "post",
          baseURL: "https://pm.vijayhomeservice.in/api",
          headers: { "content-type": "application/json" },
          data: {
            pickupLocation: selectAddress,
            dropLocation: selectAddress1,
            city: cityToPass,
            contact1: mobilenumber,
            reference: "Packers Movers",
            serviceDate: shiftingdate,
            userId: user?._id,
            type: "website",
          },
        };
        const response = await axios(config);

        if (response.status === 200) {
          const data = response.data.data;
          alert("Thank you we will contact you soon", data);
          // window.location.reload("");
          handleSubmit();
        }
      } catch (error) {
        console.error("Error adding enquiry:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  // const handleSubmit = () => {
  //   if (!cityToPass) {
  //     alert("Please select a city");
  //     return;
  //   }

  //   if (!pickupLocation || !dropLocation || !mobilenumber || !shiftingdate) {
  //     alert("Please enter all fields");
  //   } else {
  //     navigate("/packers-movers-services-details", {
  //       state: {
  //         pickupLocation,
  //         dropLocation,
  //         mobilenumber,
  //         shiftingdate,
  //         selectedCity: cityToPass,
  //         pickupLocationLat,
  //         pickupLocationLng,
  //         dropLocationLat,
  //         dropLocationLng,
  //         cityData,
  //       },
  //     });
  //   }
  // };

  const handleSubmit = () => {
    if (!user) {
      navigate("/pmlogin", {
        state: {
          pickupLocation,
          dropLocation,
          mobilenumber,
          shiftingdate,
          selectedCity: cityToPass,
          pickupLocationLat,
          pickupLocationLng,
          dropLocationLat,
          dropLocationLng,
          cityData,
        },
      });
      return;
    }

    if (!cityToPass) {
      alert("Please select a city");
      return;
    }

    if (!pickupLocation || !dropLocation || !mobilenumber || !shiftingdate) {
      alert("Please enter all fields");
    } else {
      navigate("/packers-movers-services-details", {
        state: {
          pickupLocation,
          dropLocation,
          mobilenumber,
          shiftingdate,
          selectedCity: cityToPass,
          pickupLocationLat,
          pickupLocationLng,
          dropLocationLat,
          dropLocationLng,
          cityData,
        },
      });
    }
  };

  const bannerdata = [
    
    { id: 1, webbanner: pcity1 },
    { id: 2, webbanner: pcity2 },
  ];

  const [cityData, setCityData] = useState(null);

  // Use useEffect to watch for changes in Data
  useEffect(() => {
    if (Array.isArray(Data) && Data.length > 0) {
      // Ensure Data is a valid array
      setCityData(Data[0]); // Set the initial city data
    }
  }, [Data]); // Dependency on Data, so effect runs when Data changes

  // Handler to update city data based on selected city type
  const handleCity = (cityType) => {
    setCityData(cityType); // Update city data when a city is selected
  };

  console.log("cityData", cityData);
  // Adding meta tags for SEO

  // Return statements for SEO Packers and movers
  return (
    <div>
      <Helmet>
        <title>{currentMetaTags.title}</title>
        <meta name="description" content={currentMetaTags.description} />
        <link rel="canonical" href={currentMetaTags.canonical} />
        <meta name="keywords" content={currentMetaTags.keywords} />
        <meta property="og:title" content={currentMetaTags.title} />
        <meta property="og:description" content={currentMetaTags.description} />
        <meta property="og:image" content={currentMetaTags.image} />
      </Helmet>

      <div className="">
        <Pheader />
        <Pmobileheader />

        <div className="pm-web">
          <div
            id="carouselExample"
            className="carousel slide"
            data-bs-ride="carousel"
            data-bs-interval="3000"
          >
            <div className="carousel-inner">
              {bannerdata.map((data, index) => (
                <div
                  key={index}
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                >
                  <img
                    src={data.webbanner}
                    className="d-block w-100"
                    alt={`Banner ${index + 1}`}
                    style={{ height: "250px", width: "100%" }}
                  />
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        <div className="pm-mobile">
          <img
            src={pmmobile}
            alt="loading"
            style={{ width: "100%", height: "150px" }}
          />
        </div>

        <div className="container">
          <div
            className="d-flex mt-3 mb-3"
            style={{ justifyContent: "center", gap: "10px" }}
          >
            {Data.slice(0, 2).map((data) => (
              <>
                <div className="col-md-3">
                  <div
                    style={{
                      border: "1px solid lightgrey",
                      fontWeight: "bold",
                      padding: "5px",
                      borderRadius: "5px",
                      backgroundColor:
                        cityData?.servicename === data.servicename
                          ? "blue"
                          : "white",
                      color:
                        cityData?.servicename === data.servicename
                          ? "white"
                          : "black",
                      cursor: "pointer",
                    }}
                    onClick={() => handleCity(data)}
                    className="poppins-regular text-center"
                  >
                    {data.servicename}
                  </div>
                </div>
              </>
            ))}
            <div className="col-md-3">
              <div
                style={{
                  border: "1px solid lightgrey",
                  fontWeight: "bold",
                  padding: "5px",
                  borderRadius: "5px",
                  backgroundColor:
                    cityData?.servicename === "Hire Vehicle" ? "blue" : "white",
                  color:
                    cityData?.servicename === "Hire Vehicle"
                      ? "white"
                      : "black",
                  cursor: "pointer",
                }}
                onClick={() => handleCity({ servicename: "Hire Vehicle" })}
                className="poppins-regular text-center"
              >
                Hire Vehicle
              </div>
            </div>
          </div>

          <div className="row mt-3">
            <div
              onClick={handleResetModal}
              className="col-md-2"
              style={{
                backgroundColor: "aliceblue",
                padding: "20px",
                borderBottom: "1px solid grey",
                borderColor: "grey",
              }}
            >
              <div className="poppins-black" style={{ color: "darkred" }}>
                <span>
                  <i className="fa-solid fa-location-dot mx-2"></i>
                </span>
                {cityToPass ? cityToPass : "Select City"}
              </div>
            </div>
          </div>
          <div
            className="row"
            style={{
              backgroundColor: "aliceblue",
              padding: "20px",
              justifyContent: "center",
            }}
          >
            <div className="col-md-3" style={{ borderRight: "1px solid grey" }}>
              <div className="poppins-black">
                Pickup Location{" "}
                <span className="" style={{ color: "red" }}>
                  {" "}
                  *
                </span>
              </div>

              <Autocomplete
                onLoad={(autocomplete) => {
                  autocompletePickupRef.current = autocomplete; // Use pickup ref
                }}
                onPlaceChanged={() => {
                  const place = autocompletePickupRef.current.getPlace();
                  if (!place || !place.geometry) {
                    alert("Please select a valid location.");
                    return;
                  }

                  const formattedAddress =
                    place.formatted_address || "Unknown address";

                  setPickupLocation(formattedAddress);
                  setSelectAddress(formattedAddress);

                  const lat = place.geometry.location.lat();
                  const lng = place.geometry.location.lng();
                  setPickupLocationLat(lat);
                  setPickupLocationLng(lng);
                }}
              >
                <input
                  type="text"
                  className="poppins-black col-md-12"
                  placeholder="Sending from"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  style={{
                    color: "grey",
                    fontSize: "12px",
                    border: "none",
                    outline: "none",
                    width: "100%",
                    padding: "8px",
                    marginTop: "5px",
                    height: "40px",
                  }}
                />
              </Autocomplete>
            </div>

            <div className="col-md-3" style={{ borderRight: "1px solid grey" }}>
              <div className="poppins-black">
                Drop Location{" "}
                <span className="" style={{ color: "red" }}>
                  {" "}
                  *
                </span>
              </div>
              <Autocomplete
                onLoad={(autocomplete) => {
                  autocompleteDropRef.current = autocomplete;
                }}
                onPlaceChanged={() => {
                  const place = autocompleteDropRef.current.getPlace();
                  if (!place || !place.geometry) {
                    alert("Please select a valid location.");
                    return;
                  }

                  const formattedAddress =
                    place.formatted_address || "Unknown address";

                  setDropLocation(formattedAddress);
                  setSelectAddress1(formattedAddress);
                  const lat = place.geometry.location.lat();
                  const lng = place.geometry.location.lng();
                  setDropLocationLat(lat);
                  setDropLocationLng(lng);
                }}
              >
                <input
                  type="text"
                  className="poppins-black col-md-12"
                  placeholder="Sending to"
                  value={dropLocation}
                  onChange={(e) => setDropLocation(e.target.value)}
                  style={{
                    color: "grey",
                    fontSize: "12px",
                    border: "none",
                    outline: "none",
                    width: "100%",
                    padding: "8px",
                    marginTop: "5px",
                    height: "40px",
                  }}
                />
              </Autocomplete>
            </div>
            <div className="col-md-3" style={{ borderRight: "1px solid grey" }}>
              <div className="poppins-black">
                Phone Number
                <span className="" style={{ color: "red" }}>
                  {" "}
                  *
                </span>
              </div>
              <input
                type="tel"
                className="poppins-black"
                placeholder="Enter Contact Details"
                value={mobilenumber}
                onChange={(e) => {
                  // Only allow digits (0-9) to be entered
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    setMobilenumber(value);
                  }
                }}
                style={{
                  color: "grey",
                  fontSize: "12px",
                  border: "none",
                  outline: "none",
                  width: "100%",
                  padding: "8px",
                  marginTop: "5px",
                  height: "40px",
                }}
              />
            </div>
            <div className="col-md-3">
              <div className="poppins-black">
                Shifting Date
                <span className="" style={{ color: "red" }}>
                  {" "}
                  *
                </span>
              </div>
              <input
                type="date"
                className="poppins-black col-md-12"
                placeholder="Please Select Date"
                value={shiftingdate}
                onChange={(e) => setshiftingdate(e.target.value)}
                onFocus={(e) => e.target.showPicker()}
                style={{
                  color: "grey",
                  fontSize: "12px",
                  border: "none",
                  outline: "none",
                  width: "100%",
                  padding: "8px",
                  marginTop: "5px",
                  marginBottom: "10px",
                  height: "40px",
                }}
              />
            </div>
            <div
              className="col-md-3"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div
                // onClick={handleSubmit}
                onClick={addpackersenquiry}
                className="poppins-black text-center"
                style={{
                  color: "white",
                  backgroundColor: "darkred",
                  padding: "10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                {loading ? "Loading..." : "Check Price"}
              </div>
            </div>
          </div>
          {/* First Module */}
          <div className="row mt-5 mb-3">
            <div className="poppins-semibold text-center">
              House Shifting Services with Best Packers and Movers in Bangalore
            </div>

            <div className="col-md-4 mt-5">
              <div
                className=""
                style={{ display: "flex", justifyContent: "center" }}
              >
                <img src={vicon} alt="loading..." />
              </div>
              <div className="poppins-black text-center pt-2">
                On-time shifting
              </div>
              <div className="poppins-regular text-center pt-1">
                Experience reliable packers and movers services
              </div>
            </div>

            <div className="col-md-4 mt-5">
              <div
                className=""
                style={{ display: "flex", justifyContent: "center" }}
              >
                <img src={vicon1} alt="loading..." />
              </div>
              <div className="poppins-black text-center pt-2">
                Economical prices
              </div>
              <div className="poppins-regular text-center pt-1">
                Hassle-free packers and movers services that fit your budget
              </div>
            </div>

            <div className="col-md-4 mt-5">
              <div
                className=""
                style={{ display: "flex", justifyContent: "center" }}
              >
                <img src={vicon2} alt="loading..." />
              </div>
              <div className="poppins-black text-center pt-2">
                Damage-proof packaging
              </div>
              <div className="poppins-regular text-center pt-1">
                Multi-layered packing to ensure safe movement of household goods
              </div>
            </div>
          </div>

          <img
            src={phomebanner}
            style={{ width: "100%", height: "auto" }}
            alt="loading"
            className="mt-3 mb-2"
          />

          <div className="row mt-5 mb-3">
            <div className="poppins-semibold text-center">
              What Sets Us Apart:{" "}
              <span
                className="poppins-semibold"
                style={{ color: "darkred", fontWeight: "bold" }}
              >
                Our Strengths
              </span>
            </div>

            <div className="col-md-4 mt-4">
              <div
                className="poppins-semibold"
                style={{ color: "darkred", textAlign: "center" }}
              >
                15+
              </div>
              <div className="poppins-regular text-center">Years of Trust</div>
            </div>

            <div className="col-md-4 mt-4">
              <div
                className="poppins-semibold"
                style={{ color: "darkred", textAlign: "center" }}
              >
                2000+
              </div>
              <div className="poppins-regular text-center">Moves Monthly</div>
            </div>

            <div className="col-md-4 mt-4">
              <div
                className="poppins-semibold"
                style={{ color: "darkred", textAlign: "center" }}
              >
                150+
              </div>
              <div className="poppins-regular text-center">Own Vehicles</div>
            </div>

            <div className="col-md-4 mt-4">
              <div
                className="poppins-semibold"
                style={{ color: "darkred", textAlign: "center" }}
              >
                300+
              </div>
              <div className="poppins-regular text-center">In-House Team</div>
            </div>

            <div className="col-md-4 mt-4">
              <div
                className="poppins-semibold"
                style={{ color: "darkred", textAlign: "center" }}
              >
                21+
              </div>
              <div className="poppins-regular text-center">Cities In India</div>
            </div>

            <div className="col-md-4 mt-4">
              <div
                className="poppins-semibold"
                style={{ color: "darkred", textAlign: "center" }}
              >
                40M
              </div>
              <div className="poppins-regular text-center">
                Trusted Customer
              </div>
            </div>
          </div>

          <div className="row mt-5 mb-3" style={{ justifyContent: "center" }}>
            <div className="col-md-8">
              <div className="poppins-semibold text-center">Why Choose Us?</div>

              <ul className="mt-3">
                <li className="poppins-regular">
                  <span className="poppins-black">
                    Lowest Price Guarantee:{" "}
                  </span>
                  We offer unbeatable prices. If you find a lower quote, we'll
                  match it.
                </li>
                <li className="poppins-regular pt-2">
                  <span className="poppins-black"> Best Quality Service: </span>
                  Your belongings are in safe hands with our reliable packaging
                  and moving services.
                </li>

                <li className="poppins-regular pt-2">
                  <span className="poppins-black"> Flexibility: </span>
                  Need to reschedule? No problem. Change your moving date to
                  suit your needs.
                </li>

                <li className="poppins-regular pt-2">
                  <span className="poppins-black"> Excellent Support: </span>
                  Our dedicated team is always ready to assist you with any
                  questions.
                </li>
                <li className="poppins-regular pt-2">
                  <span className="poppins-black">
                    Professional Expertise:{" "}
                  </span>
                  Our skilled movers ensure your items are packed and
                  transported with care
                </li>
              </ul>
            </div>
          </div>

          {/* First Module Completed */}
          {/* Second Module */}
          <div
            className="row mt-4 mb-3 "
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <div className="poppins-semibold text-center">
              Need an Extra Hand?
            </div>
            <div className="poppins-regular text-center">
              Need more than just packing and moving? We've got you covered.
            </div>
            <div className="col-md-2"></div>
            <div className="col-md-4 mt-3" onClick={handleShow}>
              <div className="d-flex" style={{ justifyContent: "center" }}>
                <img
                  src={vnicon}
                  alt="loading..."
                  style={{ width: "50px", height: "50px" }}
                />
              </div>

              <div className="poppins-black text-center pt-2">
                Appliance Installation
              </div>
              <div className="poppins-regular text-center  pt-1">
                We'll ensure your appliances are properly installed and ready to
                use.
              </div>
            </div>
            <div className="col-md-4 mt-3" onClick={handleShow}>
              <div
                onClick={handleShow}
                className="d-flex"
                style={{ justifyContent: "center" }}
              >
                <img
                  src={vnicon2}
                  alt="loading..."
                  style={{ width: "50px", height: "50px" }}
                />
              </div>

              <div className="poppins-black text-center pt-2">
                Electrical Work
              </div>
              <div className="poppins-regular text-center  pt-1">
                Our licensed electricians can handle all your electrical needs.
              </div>
            </div>
            <div className="col-md-2"></div>
          </div>

          <div className="row mb-3">
            <div className="col-md-2"></div>
            <div className="col-md-4 mt-3" onClick={handleShow}>
              <div
                onClick={handleShow}
                className="d-flex"
                style={{ justifyContent: "center" }}
              >
                <img
                  src={vnicon2}
                  alt="loading..."
                  style={{ width: "50px", height: "50px" }}
                />
              </div>

              <div className="poppins-black text-center pt-2">
                Carpentry Services
              </div>
              <div className="poppins-regular text-center  pt-1">
                From furniture assembly to minor repairs, our carpenters are
                skilled professionals.
              </div>
            </div>
            <div className="col-md-4 mt-3" onClick={handleShow}>
              <div
                onClick={handleShow}
                className="d-flex"
                style={{ justifyContent: "center" }}
              >
                <img
                  src={vnicon3}
                  alt="loading..."
                  style={{ width: "50px", height: "50px" }}
                />
              </div>

              <div className="poppins-black text-center pt-2">
                Painting Services
              </div>
              <div className="poppins-regular text-center  pt-1">
                Freshen up your new space with our professional painting
                services.
              </div>
            </div>
            <div className="col-md-2"></div>
          </div>

          <div className="row mb-3" style={{ justifyContent: "center" }}>
            <div className="col-md-2"></div>
            <div className="col-md-4 mt-3" onClick={handleShow}>
              <div
                onClick={handleShow}
                className="d-flex"
                style={{ justifyContent: "center" }}
              >
                <img
                  src={vnicon2}
                  alt="loading..."
                  style={{ width: "50px", height: "50px" }}
                />
              </div>

              <div className="poppins-black text-center pt-2">
                Plumbing Services
              </div>
              <div className="poppins-regular text-center  pt-1">
                We can handle any plumbing issues, from leaks to installations.
              </div>
            </div>
            <div className="col-md-4 mt-3" onClick={handleShow}>
              <div
                onClick={handleShow}
                className="d-flex"
                style={{ justifyContent: "center" }}
              >
                <img
                  src={vnicon2}
                  alt="loading..."
                  style={{ width: "50px", height: "50px" }}
                />
              </div>

              <div className="poppins-black text-center pt-2">
                Rope Pulling Services
              </div>
              <div className="poppins-regular text-center  pt-1">
                Need to move heavy items through tight spaces? Our rope pulling
                experts can help.
              </div>
            </div>
            <div className="col-md-2"></div>
          </div>

          {/*Second Module Completed  */}
          {/* Third Module Start */}
          <div className="row mt-5 mb-3">
            <div className="poppins-semibold text-center">
              SOME WORDS OF OUR HAPPY CUSTOMER
            </div>

            <div className="col-md-6 mt-5">
              <div className="poppins-regular" style={{ color: "black" }}>
                <span className="poppins-black">Meena Sharma - </span>
                Moving from Delhi to Chennai
              </div>

              <div className="poppins-regular-italic pt-3">
                "I was so grateful to find Vijay Home Services when I needed to
                move from Delhi to Chennai. They were very accommodating and
                flexible with my schedule. The movers were polite and helpful,
                and they packed everything securely. My belongings arrived
                safely and on time. I was so happy with their service."
              </div>
            </div>

            <div className="col-md-6 mt-5">
              <div className="poppins-regular" style={{ color: "black" }}>
                <span className="poppins-black">Rakesh Patel - </span>
                Rakesh Patel - Moving from Bengaluru to Mumbai
              </div>

              <div className="poppins-regular-italic pt-3">
                "I was extremely nervous about moving from Bengaluru to Mumbai,
                but Vijay Home Services made the entire process stress-free.
                Their team was professional, efficient, and very careful with my
                belongings. I was impressed by their packaging techniques and
                the speed of the move. I would highly recommend them to anyone
                looking for reliable packers and movers."
              </div>
            </div>

            <div className="col-md-6 mt-5">
              <div className="poppins-regular" style={{ color: "black" }}>
                <span className="poppins-black">Rakesh Patel - </span>
                Arijit Roy - Moving from Kolkata to Hyderabad
              </div>

              <div className="poppins-regular-italic pt-3">
                "I had a very positive experience with Vijay Home Services. They
                provided a detailed quote upfront and there were no hidden
                charges. The movers were experienced and knew how to handle my
                fragile items with care. I was impressed by their customer
                service and would definitely use them again."
              </div>
            </div>

            <div className="col-md-6 mt-5">
              <div className="poppins-regular" style={{ color: "black" }}>
                <span className="poppins-black">Rakesh Patel - </span>
                Kavita Joshi - Moving from Pune to Jaipur
              </div>

              <div className="poppins-regular-italic pt-3">
                "I was initially hesitant about hiring packers and movers, but
                I'm so glad I chose Vijay Home Services. They took care of
                everything from packing to unpacking, and the entire process was
                smooth and efficient. The movers were very friendly and
                professional. I would definitely recommend them to anyone moving
                from Pune to Jaipur."
              </div>
            </div>
          </div>

          <div className="row mt-5">
            <div className="poppins-extrabold">
              House Shifting Services Near You
            </div>
            <div className="poppins-black mt-3 mb-2">
              Serviceable areas in Bangalore
            </div>

            <div>
              <ul className="row pt-2" style={{ gap: "30px", display: "ruby" }}>
                <li
                  className="poppins-regular"
                  style={{ textAlign: "justify" }}
                >
                  Packers and Movers in Whitefield
                </li>
                <li
                  className="poppins-regular"
                  style={{ textAlign: "justify" }}
                >
                  Packers and Movers in Indira Nagar
                </li>
                <li
                  className="poppins-regular"
                  style={{ textAlign: "justify" }}
                >
                  Packers and Movers in HSR Layout
                </li>
                <li
                  className="poppins-regular"
                  style={{ textAlign: "justify" }}
                >
                  Packers and Movers in JP Nagar
                </li>
                <li
                  className="poppins-regular"
                  style={{ textAlign: "justify" }}
                >
                  Packers and Movers in Electronic City
                </li>
                <li
                  className="poppins-regular"
                  style={{ textAlign: "justify" }}
                >
                  Packers and Movers in BTM Layout
                </li>
                <li
                  className="poppins-regular"
                  style={{ textAlign: "justify" }}
                >
                  Packers and Movers in Rajajinagar
                </li>
                <li
                  className="poppins-regular"
                  style={{ textAlign: "justify" }}
                >
                  Packers and Movers in Yelahanka
                </li>
                <li
                  className="poppins-regular"
                  style={{ textAlign: "justify" }}
                >
                  Packers and Movers in Nagarbhavi
                </li>
                <li
                  className="poppins-regular"
                  style={{ textAlign: "justify" }}
                >
                  Packers and Movers in Bommanahalli
                </li>
                <li
                  className="poppins-regular"
                  style={{ textAlign: "justify" }}
                >
                  Packers and Movers in Marathahalli
                </li>
                <li
                  className="poppins-regular"
                  style={{ textAlign: "justify" }}
                >
                  Packers and Movers in KR Puram
                </li>
                <li
                  className="poppins-regular"
                  style={{ textAlign: "justify" }}
                >
                  Packers and Movers in Sarjapur Road
                </li>
                <li
                  className="poppins-regular"
                  style={{ textAlign: "justify" }}
                >
                  Packers and Movers in Banashankari
                </li>
                <li
                  className="poppins-regular"
                  style={{ textAlign: "justify" }}
                >
                  Packers and Movers in Kadugodi
                </li>
                <li
                  className="poppins-regular"
                  style={{ textAlign: "justify" }}
                >
                  Packers and Movers in Mahadevapura
                </li>
                <li
                  className="poppins-regular"
                  style={{ textAlign: "justify" }}
                >
                  Packers and Movers in Shivajinagar
                </li>
                <li
                  className="poppins-regular"
                  style={{ textAlign: "justify" }}
                >
                  Packers and Movers In Bellandur
                </li>
              </ul>
            </div>

            <div className="poppins-black mt-3 mb-2">Now in more cities</div>
            <div>
              <ul className="row pt-2" style={{ gap: "30px", display: "ruby" }}>
                <li
                  className="poppins-regular"
                  style={{ textAlign: "justify" }}
                >
                  Packers and Movers in Ahmedabad
                </li>
                <li
                  className="poppins-regular"
                  style={{ textAlign: "justify" }}
                >
                  Packers and Movers in Bhubaneshwar
                </li>
                <li
                  className="poppins-regular"
                  style={{ textAlign: "justify" }}
                >
                  Packers and Movers in Delhi
                </li>
                <li
                  className="poppins-regular"
                  style={{ textAlign: "justify" }}
                >
                  Packers and Movers in Ghaziabad
                </li>
                <li
                  className="poppins-regular"
                  style={{ textAlign: "justify" }}
                >
                  Packers and Movers in Hyderabad
                </li>
                <li
                  className="poppins-regular"
                  style={{ textAlign: "justify" }}
                >
                  Packers and Movers in Kolkata
                </li>
                <li
                  className="poppins-regular"
                  style={{ textAlign: "justify" }}
                >
                  Packers and Movers in Mumbai
                </li>
                <li
                  className="poppins-regular"
                  style={{ textAlign: "justify" }}
                >
                  Packers and Movers in NCR
                </li>
                <li
                  className="poppins-regular"
                  style={{ textAlign: "justify" }}
                >
                  Packers and Movers in Patna
                </li>
                <li
                  className="poppins-regular"
                  style={{ textAlign: "justify" }}
                >
                  Packers and Movers in Surat
                </li>
                <li
                  className="poppins-regular"
                  style={{ textAlign: "justify" }}
                >
                  Packers and Movers in Vizag
                </li>
                <li
                  className="poppins-regular"
                  style={{ textAlign: "justify" }}
                >
                  Packers and Mover in Bangalore
                </li>
                <li
                  className="poppins-regular"
                  style={{ textAlign: "justify" }}
                >
                  Packers and Movers in Chennai
                </li>
                <li
                  className="poppins-regular"
                  style={{ textAlign: "justify" }}
                >
                  Packers and Movers in Faridabad
                </li>
                <li
                  className="poppins-regular"
                  style={{ textAlign: "justify" }}
                >
                  Packers and Movers in Indore
                </li>
                <li
                  className="poppins-regular"
                  style={{ textAlign: "justify" }}
                >
                  Packers and Movers in Mysore
                </li>
                <li
                  className="poppins-regular"
                  style={{ textAlign: "justify" }}
                >
                  Packers and Movers in Kochi
                </li>
                <li
                  className="poppins-regular"
                  style={{ textAlign: "justify" }}
                >
                  Packers and Movers in Gurugram
                </li>
                <li
                  className="poppins-regular"
                  style={{ textAlign: "justify" }}
                >
                  Packers and Movers in Lucknow
                </li>
                <li
                  className="poppins-regular"
                  style={{ textAlign: "justify" }}
                >
                  Packers and Movers in Noida
                </li>
                <li
                  className="poppins-regular"
                  style={{ textAlign: "justify" }}
                >
                  Packers and Movers in Pune
                </li>
                <li
                  className="poppins-regular"
                  style={{ textAlign: "justify" }}
                >
                  Packers and Movers in Vadodara
                </li>
              </ul>
            </div>

            <div className="poppins-black mt-3 mb-2">
              {" "}
              VHS Most Booking Routes
            </div>
            <div>
              <ul className="row pt-2" style={{ gap: "30px", display: "ruby" }}>
                <li
                  className="poppins-regular"
                  style={{ textAlign: "justify" }}
                >
                  Packers and Movers From Bangalore to Chennai
                </li>
                <li
                  className="poppins-regular"
                  style={{ textAlign: "justify" }}
                >
                  Packers and Movers From Bangalore to Delhi
                </li>
                <li
                  className="poppins-regular"
                  style={{ textAlign: "justify" }}
                >
                  Packers & Movers From Bangalore to Hyderabad
                </li>
                <li
                  className="poppins-regular"
                  style={{ textAlign: "justify" }}
                >
                  Packers and Movers From Bangalore to Kolkata
                </li>
                <li
                  className="poppins-regular"
                  style={{ textAlign: "justify" }}
                >
                  Packers and Movers From Bangalore to Mumbai
                </li>
                <li
                  className="poppins-regular"
                  style={{ textAlign: "justify" }}
                >
                  Packers and Movers From Bangalore to Pune
                </li>
                <li
                  className="poppins-regular"
                  style={{ textAlign: "justify" }}
                >
                  Packers and Movers Bangalore to Ahmedabad
                </li>
                <li
                  className="poppins-regular"
                  style={{ textAlign: "justify" }}
                >
                  Packers and Movers From Bangalore to Kochi
                </li>
              </ul>
            </div>
          </div>

          <div className="row mt-5">
            <div className="poppins-black">
              {" "}
              Best Packers and Movers in Bangalore
            </div>

            <p className="poppins-regular pt-2">
              Moving can be a stressful experience, but with Vijay Home
              Services, you have a trusted team to make the process smooth and
              hassle-free. As one of the leading packers and movers in
              Bangalore, we pride ourselves on offering efficient, reliable, and
              personalized services tailored to meet your unique needs. Our
              experienced team uses advanced methods and high-quality materials
              to ensure your belongings are packed, transported, and delivered
              safely.
            </p>

            <p className="poppins-regular">
              With a presence in over 21 cities and a fleet of more than 150
              vehicles, we have successfully helped countless individuals and
              businesses relocate. We’ve earned their trust through our
              professionalism and commitment to quality. Whether you’re moving
              locally or long-distance, our expertise ensures your move is
              seamless, with every detail handled meticulously.
            </p>

            <p className="poppins-regular ">
              At Vijay Home Services, we go beyond just moving goods—we provide
              peace of mind. Our innovative tracking systems, expert handling,
              and competitive pricing set us apart from the rest. Plus, our
              Lowest Price Guarantee ensures you receive top-notch service
              without overspending.
            </p>
            <p className="poppins-regular ">
              Our clients return to us not only for our reliability but also for
              our dedication to delivering their belongings on time, every time.
              Trust Vijay Home Services to make your relocation stress-free.
              Once you experience our exceptional service, your search for the
              best packers and movers will end with us!
            </p>
          </div>

          <div className="row mt-2">
            <div className="poppins-black">
              Vijay Home Services Packing and Moving Solutions in Bangalore
            </div>
            <div className="poppins-regular pt-2">
              At Vijay Home Services, we offer a wide range of packing and
              moving services to make your relocation—within Bangalore, across
              India, or even internationally—smooth and hassle-free. Here’s how
              we can assist you:
            </div>
          </div>

          <div className="row mt-2">
            <div className="poppins-black">
              Domestic Packers and Movers in Bangalore
            </div>
            <div className="poppins-regular pt-2">
              “We provide reliable house shifting services in Bangalore and
              across India. Our team customizes each relocation plan to suit
              your needs—considering your time, budget, and the volume of
              belongings. Whether it’s a local or long-distance move, we ensure
              a smooth transition.
            </div>
          </div>

          <div className="row mt-2">
            <div className="poppins-black">
              Office Shifting Packers and Movers in Bangalore
            </div>
            <div className="poppins-regular pt-2">
              Our commercial relocation services cater to businesses moving
              offices within or outside Bangalore. We prioritize the safety of
              your office equipment and documents, ensuring timely delivery to
              your new location.
            </div>
          </div>

          <div className="row mt-2">
            <div className="poppins-black">
              Intercity Packers and Movers in Bangalore
            </div>
            <div className="poppins-regular pt-2">
              Specializing in intercity relocation, we offer a robust network of
              movers across major cities in India. Whether you're relocating
              from Bangalore to another city, we ensure that your belongings
              arrive safely and on time.
            </div>
          </div>

          <div className="row mt-2">
            <div className="poppins-black">
              Interstate Home Shifting Services
            </div>
            <div className="poppins-regular pt-2">
              As one of the top packers and movers, we provide interstate
              relocation services tailored to your needs. We consider your
              resources, budget, and the size of your belongings to ensure a
              worry-free moving experience.
            </div>
          </div>

          <div className="row mt-2">
            <div className="poppins-black">
              Secure Warehouse/Storage Services
            </div>
            <div className="poppins-regular pt-2">
              Need temporary storage? Our secure warehouse facilities are ideal
              for short- or long-term storage. Your belongings will be safely
              stored until you’re ready to move them to your new location.
            </div>
          </div>

          <div className="row mt-2">
            <div className="poppins-black">Car Transportation Services</div>
            <div className="poppins-regular pt-2">
              Your car is more than just a vehicle; it's a valuable asset. We
              offer professional car transportation services to ensure your car
              reaches its destination securely and without delay.
            </div>
          </div>

          <div className="row mt-2">
            <div className="poppins-black"> Professional Bike Relocation</div>
            <div className="poppins-regular pt-2">
              Weunderstand how important your bike is to you. That’s why we use
              high-quality packing materials and equipment to ensure your bike
              is safely handled and delivered, whether you’re moving locally or
              to another city.
            </div>
          </div>

          <div className="row mt-2">
            <div className="poppins-black"> Commercial Shifting Solutions</div>
            <div className="poppins-regular pt-2">
              Our secure warehouses are equipped with temperature control and
              24/7 surveillance, ideal for businesses needing to store office
              supplies, furniture, or sensitive equipment.
            </div>

            <div className="poppins-regular pt-2">
              At Vijay Home Services, the safety of your belongings is our
              priority. Whether it’s a local shift, interstate move, or
              international relocation, we’re here to assist you every step of
              the way!
            </div>
          </div>

          <div className="row mt-2">
            <div className="poppins-black">
              How Vijay Home Services Packers and Movers Make Moving Easier for
              You
            </div>

            <ol className="mx-3">
              <li className="poppins-regular mt-2">
                Express Your Requirements Simply share your moving requirements
                with us via our online platform, and our skilled team will
                handle the rest.
              </li>
              <li className="poppins-regular mt-2">
                Get a Free Quote After you select the services you need, we
                provide a transparent quote to ensure you get the best rates.
              </li>
              <li className="poppins-regular mt-2">
                Select the Date and Time Choose your preferred moving date and
                time through our online dashboard. Weoffer flexible scheduling
                to fit your needs.
              </li>
              <li className="poppins-regular mt-2">
                Team at Your Doorstep Our professional movers arrive on time,
                fully equipped to manage packing, loading, and unpacking with
                efficiency and care.
              </li>
            </ol>
          </div>

          <div className="row mt-2">
            <div className="poppins-black">
              Summary of Packers and Movers Quotation in Bangalore
            </div>
            <div className="poppins-regular pt-2">
              The cost of moving varies based on the number of items, distance,
              and service requirements. Relocating within Bangalore is generally
              less expensive than intercity moves, but large moves may cost more
              depending on the volume of items. However our Services Starts from
              1200 onwards.
            </div>
          </div>

          <div className="row mt-4">
            <div className="poppins-black">
              Benefits of Using Vijay Home Services Packers and Movers in
              Bangalore
            </div>

            <div className="poppins-black pt-3">Door-to-Door Service</div>
            <div className="poppins-regular">
              Wehandle everything from packing to delivery, ensuring a seamless
              transition to your new home.
            </div>

            <div className="poppins-black pt-3">
              {" "}
              Impeccable Packing Services
            </div>
            <div className="poppins-regular">
              Weuse high-quality packing materials to secure your belongings and
              minimize the risk of damage.
            </div>

            <div className="poppins-black pt-3">
              {" "}
              Transport, Loading, and Unloading Services
            </div>
            <div className="poppins-regular">
              Our movers handle all heavy lifting, ensuring your items are
              transported with care.
            </div>

            <div className="poppins-black pt-3"> Time and Effort-Saving</div>
            <div className="poppins-regular">
              Wemanage the entire process, allowing you to focus on other
              important aspects of your move.
            </div>

            <div className="poppins-black pt-3">
              {" "}
              Insurance for Your Belongings
            </div>
            <div className="poppins-regular">
              Weoffer transit insurance to protect your valuables during the
              move, giving you peace of mind.
            </div>
          </div>

          <div className="row mt-5" style={{ justifyContent: "center" }}>
            <div className="poppins-black text-center">
              Frequently Asked Questions
            </div>

            <div className="col-md-10 mt-4 mb-4">
              <Accordion defaultActiveKey="0" flush>
                <Accordion.Item eventKey="0">
                  <Accordion.Header className="poppins-regular">
                    What services do you offer as part of your Packers and
                    Movers?
                  </Accordion.Header>
                  <Accordion.Body className="poppins-light">
                    Weoffer end-to-end services including packing, loading,
                    transporting, unloading, and unpacking of household and
                    office goods.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header className="poppins-regular">
                    How do you ensure the safety of fragile and valuable items?
                  </Accordion.Header>
                  <Accordion.Body className="poppins-light">
                    Weuse high-quality packing materials such as bubble wrap,
                    cartons, and foam to secure fragile items. Our team is
                    trained to handle delicate items with care.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header className="poppins-regular">
                    Do you provide door-to-door relocation services?
                  </Accordion.Header>
                  <Accordion.Body className="poppins-light">
                    Yes, we provide complete door-to-door services to ensure a
                    hassle-free relocation experience.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header className="poppins-regular">
                    Are there any hidden charges in your pricing?
                  </Accordion.Header>
                  <Accordion.Body className="poppins-light">
                    No, our pricing is transparent, and we provide detailed
                    quotes upfront. There are no hidden fees.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                  <Accordion.Header className="poppins-regular">
                    What areas do you serve?
                  </Accordion.Header>
                  <Accordion.Body className="poppins-light">
                    Weprovide packers and movers services across 21+ cities in
                    India, covering most major metropolitan areas.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="5">
                  <Accordion.Header className="poppins-regular">
                    Can I reschedule my moving date?
                  </Accordion.Header>
                  <Accordion.Body className="poppins-light">
                    Yes, we offer flexible scheduling. You can reschedule your
                    move by contacting our support team in advance.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="6">
                  <Accordion.Header className="poppins-regular">
                    What if my goods get damaged during transit?
                  </Accordion.Header>
                  <Accordion.Body className="poppins-light">
                    Wetake all precautions to prevent damage, but in the rare
                    case of damage, we offer insurance coverage to compensate
                    for any losses.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="7">
                  <Accordion.Header className="poppins-regular">
                    How do you determine the cost of the move?
                  </Accordion.Header>
                  <Accordion.Body className="poppins-light">
                    The cost is determined by factors such as the volume of
                    goods, distance, type of services required
                    (packing/unpacking), and any additional requests like
                    insurance or special handling.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="8">
                  <Accordion.Header className="poppins-regular">
                    Do you offer insurance for the move?
                  </Accordion.Header>
                  <Accordion.Body className="poppins-light">
                    Yes, we provide optional insurance coverage to protect your
                    belongings during transit.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="9">
                  <Accordion.Header className="poppins-regular">
                    How do I book your services?
                  </Accordion.Header>
                  <Accordion.Body className="poppins-light">
                    You can book our services by contacting us via phone, email,
                    or through our website. A booking confirmation will be
                    provided once details are finalised.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="10">
                  <Accordion.Header className="poppins-regular">
                    How do I book your services?
                  </Accordion.Header>
                  <Accordion.Body className="poppins-light">
                    You can book our services by contacting us via phone, email,
                    or through our website. A booking confirmation will be
                    provided once details are finalised.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="11">
                  <Accordion.Header className="poppins-regular">
                    Do you provide transportation for vehicles like cars or
                    bikes?
                  </Accordion.Header>
                  <Accordion.Body className="poppins-light">
                    Yes, we offer specialised vehicle transportation services
                    for cars and bikes.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="12">
                  <Accordion.Header className="poppins-regular">
                    How early should I book my move?
                  </Accordion.Header>
                  <Accordion.Body className="poppins-light">
                    Werecommend booking at least a week in advance to ensure
                    availability, especially during peak moving seasons.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="13">
                  <Accordion.Header className="poppins-regular">
                    How long does the moving process take?
                  </Accordion.Header>
                  <Accordion.Body className="poppins-light">
                    The time depends on factors like the distance of the move
                    and the volume of goods. For local moves, it typically takes
                    a day, while long-distance moves may take a few days.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="14">
                  <Accordion.Header className="poppins-regular">
                    Can you handle international relocations?
                  </Accordion.Header>
                  <Accordion.Body className="poppins-light">
                    At the moment, we specialize in domestic relocations within
                    India.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="15">
                  <Accordion.Header className="poppins-regular">
                    What items should I avoid packing during the move?
                  </Accordion.Header>
                  <Accordion.Body className="poppins-light">
                    Avoid packing hazardous materials like flammable liquids,
                    explosives, and perishables like food items, as they may not
                    be safe for transportation.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="16">
                  <Accordion.Header className="poppins-regular">
                    Can I track my shipment during the move?
                  </Accordion.Header>
                  <Accordion.Body className="poppins-light">
                    Yes, we offer tracking services so that you can monitor the
                    status of your shipment during transit.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="17">
                  <Accordion.Header className="poppins-regular">
                    Do you offer storage services if I need to temporarily store
                    my goods?
                  </Accordion.Header>
                  <Accordion.Body className="poppins-light">
                    Yes, we provide secure and reliable short-term and long-term
                    storage facilities if needed.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="18">
                  <Accordion.Header className="poppins-regular">
                    What kind of vehicles do you use for transporting goods?
                  </Accordion.Header>
                  <Accordion.Body className="poppins-light">
                    Wehave a fleet of vehicles ranging from small trucks for
                    local moves to large trucks for long-distance relocations,
                    ensuring the right vehicle for your needs.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="19">
                  <Accordion.Header className="poppins-regular">
                    Do I need to be present during the packing and moving
                    process?
                  </Accordion.Header>
                  <Accordion.Body className="poppins-light">
                    It is preferable for you or a representative to be present
                    to supervise and provide guidance, but we can manage the
                    process independently if needed.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="20">
                  <Accordion.Header className="poppins-regular">
                    How do I prepare for my move?
                  </Accordion.Header>
                  <Accordion.Body className="poppins-light">
                    Werecommend decluttering, labelling boxes, and informing us
                    of any special requests ahead of time to ensure a smooth and
                    efficient move.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>

          <div className="poppins-black">Conclusion</div>
          <div className="poppins-regular pt-3">
            At Vijay Home Services, customer satisfaction is our top priority.
            From the moment you book our services to the successful completion
            of your move, we ensure a smooth, secure relocation. Join the many
            satisfied customers who trust us with their moving needs and
            experience a hassle-free move with the best packers and movers in
            Bangalore.
          </div>
          <div className="poppins-regular pt-2 pb-3 mb-5">
            We’re here to make your moving experience easy, efficient, and
            worry-free. Choose Vijay Home Services for all your moving
            solutions!
          </div>

          {/* Third Completed */}
        </div>

        <Modal centered show={show} onHide={handleClose}>
          <Modal.Body>
            <div className="poppins-semibold">Enquiry Add</div>

            <div className="mt-2">
              <div className="poppins-light">Name</div>
              <input
                type="text"
                className="input col-md-12 mt-2 vhs-input-value"
                value={customer}
                onChange={(e) => setcustomer(e.target.value)}
              />
            </div>

            <div className="">
              <div className="poppins-light">Contact Number</div>
              <input
                type="text"
                value={mobilenumber}
                className="input col-md-12 mt-2 vhs-input-value"
                onChange={(e) => setMobilenumber(e.target.value)}
              />
            </div>

            <div className="">
              <div className="poppins-light">Category</div>
              <select
                value={selectcategory}
                onChange={(e) => setselectcategory(e.target.value)}
                className="input col-md-12 mt-2 vhs-input-value"
              >
                <option>--select category--</option>
                <option>Appliance Installation</option>
                <option>Electrical Work</option>
                <option>Carpentry Services</option>
                <option>Painting Services</option>
                <option>Plumbing Services</option>
                <option>Rope Pulling Services</option>
              </select>
            </div>

            <div
              onClick={addEnquiry}
              className="poppins-black"
              style={{
                backgroundColor: "darkred",
                padding: "7px",
                borderRadius: "5px",
                marginTop: "20px",
                color: "white",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              Submit
            </div>
          </Modal.Body>
        </Modal>

        <Modal
          show={openResetModal}
          style={{ width: "100%" }}
          centered
          onHide={handleResetModal}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
        >
          <div className="web-city-modal">
            <div className="modal_grid ">
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
            <div className="modal_grid ">
              <div className="modal_header">
                <img
                  src="https://vijayahomeservices.b-cdn.net/city.jpg"
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
        <Footer />
      </div>
    </div>
  );
}
export default Packersmovershome;
