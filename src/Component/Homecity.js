import React, { useState, useEffect, useRef } from "react";
import "../Component/layout.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { SpinnerCircular } from "spinners-react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import NabarCompo from "./navbar";
import "./layout.css";
import Footer from "./Footer";
import one from "../assests/one.jpg";
import two from "../assests/two.jpg";
import theree from "../assests/theree.jpg";
import four from "../assests/four.jpg";
import five from "../assests/five.jpg";
import six from "../assests/six.jpg";
import seven from "../assests/seven.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import hbanner from "../assests/hbanner.jpg";
import hbanner1 from "../assests/hbanner1.jpg";
import hbanner2 from "../assests/hbanner2.jpg";
import hbanner3 from "../assests/hbanner3.jpg";
import hbanner4 from "../assests/hbanner4.jpg";
import hbanner5 from "../assests/hbanner5.jpg";
import hbanner6 from "../assests/hbanner6.jpg";
import diwaliholiday from "../assests/diwali-holiday.jpeg";
import { useSelector, useDispatch } from "react-redux";
import { FreeMode, Pagination, Autoplay, Navigation } from "swiper/modules";
import { useLocation } from "react-router-dom";
import deal from "../../src/assests/deal.png";
import moment from "moment";
import Homenavbar from "./Homenavbar";
import callgif from "../assests/callgif.gif";
import { Carousel } from "bootstrap";


// import for SEO
import { Helmet } from 'react-helmet';

// import for videos below thoughfull creation or Of our finest experiences
import { FaPlay, FaPause } from "react-icons/fa"; // Font Awesome icons

// updated home
export default function Homecity() {
  const [Banner, setBanner] = useState([]);
  const { cityName } = useParams();
  const [categoryData, setCategoryData] = useState([]);
  const [category, setCategory] = useState([]);
  const [FilteredCategory, setFilteredCategory] = useState([]);
  const [FilteredPaint, setFilteredPaint] = useState([]);
  const [FilterCleaning, setFilterCleaning] = useState([]);
  const [FilterPestControl, setFilterPestControl] = useState([]);
  const [FilterMarbelPolish, setFilterMarbelPolish] = useState([]);
  const [FilterRepairing, setFilterRepairing] = useState([]);
  const [SelectedCategory, setSelectedCategory] = useState([]);
  const [FilterPackers, setFilterPackers] = useState([]);
  const [FilterAppliance, setFilterAppliance] = useState([]);
  const [bannerdata, setBannerdata] = useState([]);
  const [testimonialdata, settestimonialdata] = useState([]);

  const [offerBanner, setofferBanner] = useState([]);
  const [allcategory, setallcategory] = useState([]);
  const [thoughtfull, setthoughtfull] = useState([]);
  const [homepagetitledata, sethomepagetitledata] = useState([]);
  const [sdata, setsdata] = useState([]);
  const [servicedata, setservicedata] = useState([]);
  const [secondsdata, setsecondsdata] = useState([]);
  const [openResetModal, setOpenResetModal] = useState(false);
  const [city, setCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState(cityName);
  const [activeCity, setActiveCity] = useState("");
  const distpatch = useDispatch();
  const location = useLocation();
  const pathName = location.pathname;
  const [show, setShow] = useState(false);
  const [slidesPerView, setSlidesPerView] = useState(5);
  const [slidesthoughtfull1, setslidesthoughtfull1] = useState(5);
  const [slidesbanner, setslidesbanner] = useState(5);
  const [isMobile, setIsMobile] = useState(false);
  const [testi, settesti] = useState([]);
  const capitalizedCityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);

  // Now use `capitalizedCityName` for the dynamic metadata
  const title = `Expert Home Services in ${capitalizedCityName} with Upto 50% OFF | Cleaning, Painting & More`;
  const description = `Discover top-quality Home Services with Vijay Home Services. From cleaning and painting to pest control and appliance repairs, get trusted professionals at your doorstep. Enjoy affordable rates, free cancellation, and easy rescheduling.`;
  const keywords = `home services near me, services for home, home service ${capitalizedCityName}, cleaning services ${capitalizedCityName}`;
  

// For videos --------------------------------------------------------------------------
// Add the following code here inside the component function

const [isPlaying, setIsPlaying] = useState(null);

// Function to toggle play/pause for a specific video
const togglePlayPause = (index) => {
  const video = document.getElementById(`video-${index}`);

  if (isPlaying === index) {
    video.pause();
    setIsPlaying(null); // Pause the video and reset state
  } else {
    video.play();
    setIsPlaying(index); // Play the selected video
  }
};

// Handle video end to reset play/pause state
const handleVideoEnd = (index) => {
  setIsPlaying(null);
};
// Continue with other hooks or logic for your component----------------------------------------------------------------------





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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSlidesPerView(3);
      } else {
        setSlidesPerView(5);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleResize1 = () => {
      if (window.innerWidth <= 768) {
        setslidesthoughtfull1(2);
      } else {
        setslidesthoughtfull1(5);
      }
    };

    handleResize1();

    window.addEventListener("resize", handleResize1);

    return () => window.removeEventListener("resize", handleResize1);
  }, []);

  useEffect(() => {
    const handleResize2 = () => {
      if (window.innerWidth <= 768) {
        settesti(1);
      } else {
        settesti(3);
      }
    };

    handleResize2();

    window.addEventListener("resize", handleResize2);

    return () => window.removeEventListener("resize", handleResize2);
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  useEffect(() => {
    const handlebanner = () => {
      if (window.innerWidth <= 768) {
        setslidesbanner(2);
      } else {
        setslidesbanner(3);
      }
    };

    handlebanner();

    window.addEventListener("resize", handlebanner);

    return () => window.removeEventListener("resize", handlebanner);
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      setFilteredResults([]);
    }
  }, [searchQuery, searchlist]);

  useEffect(() => {
    setOpenResetModal(false);
  }, []);

  const [isLoading, setIsLoading] = useState(false);

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

  const handleResetModal = () => {
    setOpenResetModal(true);
  };

  const [name, setname] = useState("");
  const [contact1, setcontact1] = useState("");
  const [email, setemail] = useState("");
  const [comment, setcomment] = useState("");
  const [enquirydate, setenquirydate] = useState(moment().format("MM-DD-YYYY"));

  const addEnquiry = async (e) => {
    e.preventDefault();

    if (!name) {
      alert("Please enter all fields");
    } else {
      try {
        const config = {
          url: "/addnewenquiry",
          method: "post",
          baseURL: "https://api.vijayhomeservicebengaluru.in/api",

          headers: { "content-type": "application/json" },
          data: {
            date: enquirydate,
            name: name,
            time: moment().format("h:mm:ss a"),
            mobile: contact1,
            email: email,
            category: offerBanner[0]?.category,
            reference2: "website",
            city: localstoragecitys,
            comment: comment,
          },
        };

        const response = await axios(config);

        if (response.status === 200) {
          const data = response.data.data;
          alert("Enquiry added successfully:", data);
          setShow(false);
        }
      } catch (error) {
        console.error("Error adding enquiry:", error);
      }
    }
  };

  const navigate = useNavigate();

  const handleChange = (selectedCity) => {
    const cityName = selectedCity.city;

    setActiveCity(cityName);
    setOpenResetModal(false);
    navigate(`/${cityName.toLowerCase()}`);
    window.location.reload();
  };

  // TestiMonial

  useEffect(() => {
    getalltestimonial();
  }, []);
  const getalltestimonial = async () => {
    let res = await axios.get(
      "https://api.vijayhomeservice.com/api/testimonial/getalltestimonial"
    );
    if ((res.status = 200)) {
      settestimonialdata(res.data?.data);
    }
  };
  const getEmbedUrl = (videoUrl) => {
    if (videoUrl.includes("youtube.com/shorts")) {
      const videoId = videoUrl.split("/").pop();
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (videoUrl.includes("youtube.com/watch")) {
      const videoId = new URLSearchParams(new URL(videoUrl).search).get("v");
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return videoUrl;
  };

  // Offer Banner

  useEffect(() => {
    getallofferbanner();
  }, []);

  const getallofferbanner = async () => {
    let res = await axios.get(
      "https://api.vijayhomeservice.com/api/offer/getallwebdoffer"
    );
    if ((res.status = 200)) {
      setofferBanner(res.data?.offer);
    }
  };

  useEffect(() => {
    getservices();
  }, []);

  const getservices = async () => {
    let res = await axios.get(
      "https://api.vijayhomesuperadmin.in/api/userapp/getappsubcat"
    );
    if (res.status === 200) {
      const data = res.data?.subcategory;
      const filteredData = data.filter((i) => {
        const shouldInclude = i.homePagetitle === homepagetitledata[0]?.title;

        return shouldInclude;
      });

      setsdata(res.data?.subcategory);

      setservicedata(filteredData);
      setsecondsdata(
        data.filter((i) => i.homePagetitle === homepagetitledata[1]?.title)
      );
    }
  };

  useEffect(() => {
    getallthoughtfull();
  }, []);

  const getallthoughtfull = async () => {
    let res = await axios.get(
      "https://api.vijayhomeservice.com/api/creation/getallwebcreation"
    );
    if ((res.status = 200)) {
      setthoughtfull(res.data?.creation);
    }
  };

  useEffect(() => {
    gethomepagetitle();
  }, []);

  const gethomepagetitle = async () => {
    let res = await axios.get(
      "https://api.vijayhomesuperadmin.in/api/userapp/gettitle"
    );
    if ((res.status = 200)) {
      sethomepagetitledata(res.data?.homepagetitle);
    }
  };

  useEffect(() => {
    GetAllWebBanner();
    getAllCategory();
  }, []);

  const GetAllWebBanner = async () => {
    try {
      setIsLoading(true);
      let res = await axios.get(
        "https://api.vijayhomesuperadmin.in/api/website/getallwebbanner"
      );

      if (res.status === 200) {
        setBanner(res.data.banner);
      }
    } catch (er) {
      console.log(er, "err while fetching data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getsubcategory();
  }, []);

  useEffect(() => {
    getbannerimg();
  }, []);

  const getbannerimg = async () => {
    let res = await axios.get(
      "https://api.vijayhomesuperadmin.in/api/website/getallwebbanner"
    );
    if ((res.status = 200)) {
      setBannerdata(res.data?.banner);
    }
  };

  useEffect(() => {
    getallcategory();
  }, []);

  const getallcategory = async () => {
    let res = await axios.get(
      "https://api.vijayhomeservice.com/api/getcategory"
    );
    if ((res.status = 200)) {
      setallcategory(res.data?.category);
    }
  };

  const getsubcategory = async () => {
    try {
      setIsLoading(true);

      let res = await axios.get(
        `https://api.vijayhomesuperadmin.in/api/userapp/getappsubcat`
      );

      if ((res.status = 200)) {
        setCategoryData(res.data.subcategory);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getAllCategory = async () => {
    try {
      setIsLoading(true);
      let res = await axios.get(
        "https://api.vijayhomesuperadmin.in/api/getcategory"
      );
      if (res.status === 200) {
        if (res.data.category.length === 0) {
          setIsLoading(true);
        } else {
          setCategory(res.data.category);
          setIsLoading(false);
        }
      }
    } catch (er) {
      console.log(er, "err while fetching data");
    } finally {
      setIsLoading(false);
    }
  };

  const cleaningServicesRef = useRef(null);
  const paintingServicesRef = useRef(null);
  const PestControlRef = useRef(null);
  const FloorPolishingRef = useRef(null);
  const PackersMoversRef = useRef(null);
  const ApplianceServicesRef = useRef(null);
  const HomeRepairingServicesRef = useRef(null);

  const Bannerimages = [
    { images: hbanner, section: cleaningServicesRef },
    { images: hbanner1, section: paintingServicesRef },
    { images: hbanner2, section: PestControlRef },
    { images: hbanner3, section: FloorPolishingRef },
    { images: hbanner4, section: PackersMoversRef },
    { images: hbanner5, section: ApplianceServicesRef },
    { images: hbanner6, section: HomeRepairingServicesRef },
  ];

  const scrollToSection = (sectionRef) => {
    if (sectionRef && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [showModal, setShowModal] = useState(false);
  const filteredCleaning = categoryData.filter((cat) =>
    cat.category.toLowerCase().includes("cleaning")
  );
  const [viewmoreCategory, setViewMoreCategory] = useState(false);
  const handleViewLessCategory = () => {
    setViewMoreCategory(false);
  };
  const filteredPaint = categoryData.filter((cat) =>
    cat.category.toLowerCase().includes("painting")
  );
  const filteredpestc = categoryData.filter((cat) =>
    cat.category.toLowerCase().includes("control")
  );
  const filtermarbel = categoryData.filter((cat) =>
    cat.category.toLowerCase().includes("polishing")
  );
  const FacilityManagement = categoryData.filter(
    (cat) =>
      cat.category.toLowerCase().includes("management") ||
      cat.category.toLowerCase().includes("corporate")
  );

  const Repairing = categoryData.filter((cat) =>
    cat.category.toLowerCase().includes("repair")
  );
  const filterpackers = categoryData.filter((cat) =>
    cat.category.toLowerCase().includes("packers")
  );
  const filterappliance = categoryData.filter((cat) =>
    cat.category.toLowerCase().includes("appliance")
  );
  useEffect(() => {
    setFilteredCategory(viewmoreCategory ? category : category);
    setFilterCleaning(filteredCleaning);
    setFilteredPaint(filteredPaint);
    setFilterPestControl(filteredpestc);
    setFilterMarbelPolish(filtermarbel);
    setFilterRepairing(Repairing);
    setFilterPackers(filterpackers);
    setFilterAppliance(filterappliance);
  }, [
    category,
    viewmoreCategory,
    filteredCleaning,
    filteredPaint,
    filteredpestc,
    filtermarbel,
    Repairing,
    filterpackers,
    filterappliance,
  ]);

  const [selectedCategoryy, setSelectedCategoryy] = useState("");

  const searchcategory1 = {
    Cleaning: "Cleaning",
    Painting: "Painting",
    "Pest Control": "Pest Control",
    "Floor Polishing": "Floor Polishing",
    "Home Repair Services": "Home Repair Services",
    "Packers & Movers": "Packers & Movers",
    "Appliance Service": "Appliance Service",
    "Facility Management": "Facility Management",
  };

  const [filteredData, setFilteredData] = useState([]);
  const [ModalSubcategoryView, setModalSubcategoryView] = useState(false);
  const [CateGoryName, setCateGoryName] = useState(null);

  const handleCloseSubcategoryView = () => {
    setModalSubcategoryView(false);
  };

  const handleShowSelectCategory = (selectedcategory) => {
    setViewMoreCategory(false);
    setCateGoryName(selectedcategory);
    setModalSubcategoryView(true);
    const item = selectedcategory.toLowerCase();

    let filteredData = categoryData.filter((cat) =>
      cat.category.toLowerCase().includes(item)
    );

    setSelectedCategory(filteredData);
  };

  const cleaningItemsCount = categoryData.filter((item) =>
    item?.category?.toLowerCase()?.includes("cleaning")
  )?.length;

  const pestControlItemsCount = categoryData?.filter((item) =>
    item?.category?.toLowerCase()?.includes("control")
  )?.length;

  const paintingcontorl = categoryData.filter((item) =>
    item?.category?.toLowerCase()?.includes("painting")
  )?.length;

  const bannerimage = [
    {
      id: 1,
      image: one,
    },
    {
      id: 2,
      image: two,
    },
    {
      id: 3,
      image: theree,
    },
    {
      id: 4,
      image: four,
    },
    {
      id: 7,
      image: five,
    },
    {
      id: 6,
      image: six,
    },
    {
      id: 7,
      image: seven,
    },
  ];

  const FilterCleaningWithImages = FilterCleaning.map((item, index) => {
    const image = bannerimage[index % bannerimage.length]?.image || one;
    return {
      ...item,
      image,
    };
  });

  const generatePathname = (subcategory, city) => {
    let cleanedSubcategory = subcategory.trim();
    if (cleanedSubcategory.startsWith("-")) {
      cleanedSubcategory = cleanedSubcategory.substring(1);
    }

    // Generate the URL
    return `/services/${cleanedSubcategory
      .toLowerCase()
      .replace(/ /g, "-")}-in-${cityName?.toLowerCase().replace(/ /g, "-")}`;
  };

  useEffect(() => {
    const carouselElement = document.getElementById("carouselExample");
    const carousel = new Carousel(carouselElement, {
      interval: 3000, // 3 seconds
      ride: "carousel",
    });
  }, []);

  const handleScroll = (category) => {
    const sectionId = category
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace("&", "and");

    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    } else {
      console.log("Section not found for id:", sectionId); // Log if the section is not found
    }
  };


  // Structured Data 
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "serviceType": `Expert Home Services in ${cityName} with Upto 50% OFF | Cleaning, Painting & More`,
    "provider": {
      "@type": "Product",
      "name": "Vijay Home Services",
      "brand": {
          "@type": "Brand",
          "name": "Vijay Home Services"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "DTDC Building 3rd Floor,",
        "addressLocality": "Mahadevapura Outer Ring Road",
        "addressRegion": "Bengaluru,Karnataka",
        "postalCode": "560048",
        "addressCountry": "India"
      },
      "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "bestRating": "5",
          "worstRating": "1",
          "ratingCount": "226687"
        },
      "telephone": "+1234567890",
      "url": "https://yourwebsite.com",
      "logo": "https://www.vijayhomeservices.com/favicon.ico"
    },
    "description":  `Discover top-quality Home Services with Vijay Home Services. From cleaning and painting to pest control and appliance repairs, get trusted professionals at your doorstep. Enjoy affordable rates, free cancellation, and easy rescheduling.`,
    "keywords": `home services near me, services for home, home service ${cityName}, cleaning services ${cityName}`
  };

  console.log(structuredData);
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
          <Homenavbar />

          <div className="home-webview">
            <div className="imagebanner">
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

            <div
              className="row"
              style={{
                backgroundColor: "skyblue",
                padding: "20px",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <div className="col-md-6 col-sm-12 col-xs-12">
                <div
                  className="poppins-semibold mb-4"
                  style={{ textAlign: "center" }}
                >
                  The Award winning company
                </div>
                <input
                  type="text"
                  className="col-md-12 poppins-regular"
                  placeholder={
                    selectedCategoryy
                      ? `Search for ${searchcategory1}`
                      : "Search for Services"
                  }
                  style={{
                    height: "45px",
                    paddingLeft: "140px",
                    fontSize: "16px",
                  }}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  value={searchQuery}
                />
                <div
                  onClick={handleResetModal}
                  className="d-flex"
                  style={{
                    position: "absolute",
                    marginTop: "-54px",
                    marginLeft: "15px",
                    borderRight: "2px solid black",
                  }}
                >
                  <i
                    className="fa-solid fa-location-dot"
                    style={{
                      fontSize: "16px",
                      marginTop: "3px",
                      color: "darkred",
                    }}
                  ></i>
                  <div
                    className="poppins-regular mx-2"
                    style={{ fontSize: "16px", marginTop: "2px" }}
                  >
                    {cityName ? cityName : "Select City"}
                  </div>
                </div>
                <i
                  className="fa-solid fa-magnifying-glass"
                  style={{
                    position: "absolute",
                    fontSize: "20px",
                    marginTop: "13px",
                    marginLeft: "-40px",
                  }}
                ></i>
              </div>

              {searchQuery.length > 0 && (
                <div
                  className="search-results"
                  style={{
                    position: "absolute",
                    backgroundColor: "white",
                    width: "33%",
                    maxHeight: "300px",
                    overflowY: "auto",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                    borderRadius: "5px",
                    marginTop: "105px",
                    zIndex: 1000,
                    left: "40%",
                    right: "10%",
                  }}
                >
                  {filteredResults.length > 0 ? (
                    filteredResults.map((ele) => (
                      <div
                        className="row"
                        key={ele._id}
                        style={{ justifyContent: "center", padding: "5px 5px" }}
                      >
                        <div className="col-md-12">
                          <Link
                            to={{
                              pathname: generatePathname(ele.subcategory, city),
                            }}
                            // to="/servicedetails"
                            state={
                              ({ subcategory: ele.subcategory }, { data: ele })
                            }
                            style={{ textDecoration: "none" }}
                          >
                            <div className="row">
                              <div className="col-md-12 mt-3">
                                <div
                                  className="poppins-regular"
                                  style={{ color: "black" }}
                                >
                                  {ele?.category}
                                </div>
                                <div
                                  className="poppins-regular"
                                  style={{ color: "black" }}
                                >
                                  {ele?.subcategory}
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div
                      style={{
                        textAlign: "center",
                        padding: "10px",
                        color: "black",
                      }}
                    >
                      No results found
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="container">
              <div
                className="row  t-text"
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <div
                  className="poppins-semibold"
                  style={{ fontSize: "20px", textAlign: "left" }}
                >
                  Thoughtful Curations{" "}
                  <span>
                    <a
                      href="tel:+918453748478"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <img
                        src={callgif}
                        alt="call"
                        style={{ width: "80px", height: "80px" }}
                      />{" "}
                    </a>
                  </span>
                </div>

                <div className="poppins-medium-italic thoughttext mt-1 mb-4">
                  Of our finest experiences
                </div>
                <Swiper
      slidesPerView={slidesthoughtfull1}
      spaceBetween={30}
      freeMode={true}
      pagination={{
        clickable: true,
      }}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      modules={[FreeMode, Pagination, Autoplay]}
      className="mySwiper"
    >
      <div className="col-md-4" style={{ width: "100%", padding: "15px" }}>
        {thoughtfull.map((data, index) => (
          <SwiperSlide
            key={data._id}
            style={{
              backgroundColor: "white",
              padding: "0px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            {/* Video Container */}
            <div style={{ position: "relative", width: "100%" }}>
              <video
                id={`video-${index}`}
                src={data.creationslink}
                style={{
                  borderRadius: "10px",
                  width: "100%",
                  height: "auto",
                }}
                muted
                playsInline
                onClick={() => togglePlayPause(index)}
                onEnded={() => handleVideoEnd(index)}
              />

              {/* Play/Pause Icon */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "rgba(255, 255, 255, 0.5)", // More transparent
                  fontSize: "30px", // Smaller icon size
                  cursor: "pointer",
                  opacity: 0.7, // Adjust the transparency
                }}
                onClick={() => togglePlayPause(index)}
              >
                {isPlaying === index ? <FaPause /> : <FaPlay />}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </div>
    </Swiper>


              </div>
              <div className="row mt-4">
                <div
                  className="poppins-semibold mb-4"
                  style={{ textAlign: "left" }}
                >
                  Category
                </div>

                <Swiper
                  slidesPerView={slidesbanner}
                  spaceBetween={30}
                  freeMode={true}
                  pagination={{
                    clickable: true,
                  }}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  modules={[FreeMode, Pagination, Autoplay]}
                  className="mySwiper"
                >
                  <div className="col-md-4">
                    {/* allcategory */}
                    {Bannerimages.map((data) => (
                      <SwiperSlide
                        key={data._id}
                        style={{
                          backgroundColor: "white",
                          padding: "0px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "flex-start",
                        }}
                        onClick={() => scrollToSection(data.section)}
                      >
                        <img
                          className="category_banner"
                          src={data.images}
                          alt="loading...."
                        />
                      </SwiperSlide>
                    ))}
                  </div>
                </Swiper>
              </div>
              <div
                ref={cleaningServicesRef}
                className="poppins-semibold mt-4 mb-2"
                style={{ textAlign: "left" }}
              >
                Cleaning Services
                <span
                  style={{
                    backgroundColor: "#FFB6C1",
                    padding: "3px 25px",
                    borderRadius: "20px",
                  }}
                  className="poppins-regular mx-2 offertext"
                >
                  up to 50% off
                </span>
              </div>
              <div className="mt-4" style={{ position: "relative" }}>
                <Swiper
                  slidesPerView={slidesPerView}
                  spaceBetween={30}
                  freeMode={true}
                  pagination={{
                    clickable: true,
                    el: ".swiper-pagination-cleaning",
                  }}
                  autoplay={
                    isMobile
                      ? { delay: 2500, disableOnInteraction: true }
                      : false
                  }
                  navigation={{
                    nextEl: ".swiper-button-next-cleaning",
                    prevEl: ".swiper-button-prev-cleaning",
                  }}
                  modules={[FreeMode, Pagination, Autoplay, Navigation]}
                  className="mySwiper"
                >
                  {FilterCleaningWithImages.sort(
                    (a, b) => parseInt(a.order) - parseInt(b.order)
                  ).map((ele, index) => (
                    <SwiperSlide
                      key={ele._id}
                      style={{
                        backgroundColor: "white",
                        padding: "0px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <Link
                        to={{
                          pathname: generatePathname(ele.subcategory, city),
                        }}
                        state={
                          ({ subcategory: ele.subcategory }, { data: ele })
                        }
                        style={{ textDecoration: "none" }}
                      >
                        <div
                          className="col-md-4"
                          style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <img
                              src={ele.imglink}
                              alt={`${ele.category} images`}
                              className="category_image"
                              style={{
                                borderRadius: "10px",
                              }}
                            />
                          </div>
                          <div className="poppins-medium mt-2">
                            {ele.subcategory}
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="swiper-button-prev swiper-button-prev-cleaning">
                  <i className="fa-solid fa-arrow-left left-icon"></i>
                </div>
                <div className="swiper-button-next swiper-button-next-cleaning">
                  <i className="fa-solid fa-arrow-right right-icon"></i>
                </div>
                <div className="swiper-pagination swiper-pagination-cleaning"></div>
              </div>

              {/* Painting Services */}
              <div
                ref={paintingServicesRef}
                className="poppins-semibold mt-2 mb-2"
                style={{ textAlign: "left" }}
              >
                Painting Services{" "}
                <span
                  style={{
                    backgroundColor: "#ADD8E6",
                    padding: "3px 25px",
                    borderRadius: "20px",
                  }}
                  className="poppins-black mx-2 offertext"
                >
                  100 % In House Staff
                </span>
              </div>
              <div className="mt-4" style={{ position: "relative" }}>
                <Swiper
                  slidesPerView={slidesPerView}
                  spaceBetween={30}
                  freeMode={true}
                  pagination={{
                    clickable: true,
                    el: ".swiper-pagination-painting",
                  }}
                  autoplay={
                    isMobile
                      ? { delay: 2500, disableOnInteraction: true }
                      : false
                  }
                  navigation={{
                    nextEl: ".swiper-button-next-painting",
                    prevEl: ".swiper-button-prev-painting",
                  }}
                  modules={[FreeMode, Pagination, Autoplay, Navigation]}
                  className="mySwiper"
                >
                  {FilteredPaint.sort(
                    (a, b) => parseInt(a.order) - parseInt(b.order)
                  ).map((ele, index) => (
                    <SwiperSlide
                      key={ele._id}
                      style={{
                        backgroundColor: "white",
                        padding: "0px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <Link
                        to={{
                          pathname: generatePathname(ele?.subcategory, city),
                        }}
                        style={{ textDecoration: "none" }}
                      >
                        <div className="col-md-4" style={{ width: "100%" }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <img
                              src={ele.imglink}
                              alt={`${ele.category} images`}
                              className="category_image"
                              style={{
                                // width: "150px",
                                // height: "150px",
                                borderRadius: "10px",
                              }}
                            />
                          </div>
                          <div className="poppins-medium mt-2">
                            {ele.subcategory}
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="swiper-button-prev swiper-button-prev-painting">
                  <i className="fa-solid fa-arrow-left left-icon"></i>
                </div>
                <div className="swiper-button-next swiper-button-next-painting">
                  <i className="fa-solid fa-arrow-right right-icon"></i>
                </div>
                <div className="swiper-pagination swiper-pagination-painting"></div>
              </div>

              {/* Pest Control */}
              <div
                ref={PestControlRef}
                className="poppins-semibold mt-4 mb-2"
                style={{ textAlign: "left" }}
              >
                Pest Control{" "}
                <span
                  style={{
                    backgroundColor: "#98FB98",
                    padding: "3px 25px",
                    borderRadius: "20px",
                  }}
                  className="poppins-black mx-2 offertext"
                >
                  Licensed Company
                </span>
              </div>
              <div className="mt-4" style={{ position: "relative" }}>
                <Swiper
                  slidesPerView={slidesPerView}
                  spaceBetween={30}
                  freeMode={true}
                  pagination={{
                    clickable: true,
                    el: ".swiper-pagination-pest",
                  }}
                  autoplay={
                    isMobile
                      ? { delay: 2500, disableOnInteraction: true }
                      : false
                  }
                  navigation={{
                    nextEl: ".swiper-button-next-pest",
                    prevEl: ".swiper-button-prev-pest",
                  }}
                  modules={[FreeMode, Pagination, Autoplay, Navigation]}
                  className="mySwiper"
                >
                  {FilterPestControl.sort(
                    (a, b) => parseInt(a.order) - parseInt(b.order)
                  ).map((ele, index) => (
                    <SwiperSlide
                      key={ele._id}
                      style={{
                        backgroundColor: "white",
                        padding: "0px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <Link
                        to={{
                          pathname: generatePathname(ele.subcategory, city),
                        }}
                        // to="/servicedetails"
                        state={
                          ({ subcategory: ele.subcategory }, { data: ele })
                        }
                        style={{ textDecoration: "none" }}
                      >
                        <div className="col-md-4" style={{ width: "100%" }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <img
                              src={ele.imglink}
                              alt={`${ele.category} images`}
                              className="category_image"
                              style={{
                                // width: "150px",
                                // height: "150px",
                                borderRadius: "10px",
                              }}
                            />
                          </div>
                          <div className="poppins-medium mt-2">
                            {ele.subcategory}
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="swiper-button-prev swiper-button-prev-pest">
                  <i className="fa-solid fa-arrow-left left-icon"></i>
                </div>
                <div className="swiper-button-next swiper-button-next-pest">
                  <i className="fa-solid fa-arrow-right right-icon"></i>
                </div>
                <div className="swiper-pagination swiper-pagination-pest"></div>
              </div>

              <div className="mb-3 mt-3" style={{ display: "flex" }}>
                {/* <div className="col-md-2"> */}
                <div className="poppins-light " style={{ fontSize: "16px" }}>
                  Deal of the week
                </div>

                <img
                  src={deal}
                  alt="vhs"
                  style={{ width: "245px", height: "51px" }}
                />
              </div>

              <div className="row mt-3">
                <Swiper
                  slidesPerView={slidesbanner}
                  spaceBetween={60}
                  freeMode={true}
                  pagination={{
                    clickable: true,
                  }}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  modules={[FreeMode, Pagination, Autoplay]}
                  className="mySwiper"
                >
                  <div className="col-md-4">
                    {offerBanner.map((data) => (
                      <SwiperSlide
                        key={data._id}
                        style={{
                          backgroundColor: "white",
                          padding: "0px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "flex-start",
                        }}
                      >
                        <div onClick={handleShow}>
                          <img
                            src={data.offer}
                            alt="loading..."
                            className="category_banner"
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </div>
                </Swiper>
              </div>

              {/* Floor Polishing */}
              <div
                ref={FloorPolishingRef}
                className="poppins-semibold mt-4 mb-2"
                style={{ textAlign: "left" }}
              >
                Floor Polishing{" "}
                <span
                  style={{
                    backgroundColor: "#FFD700",
                    padding: "3px 25px",
                    borderRadius: "20px",
                  }}
                  className="poppins-black mx-2 offertext"
                >
                  Shine Like New
                </span>
              </div>
              <div className="mt-4" style={{ position: "relative" }}>
                <Swiper
                  slidesPerView={slidesPerView}
                  spaceBetween={30}
                  freeMode={true}
                  pagination={{
                    clickable: true,
                    el: ".swiper-pagination-polishing",
                  }}
                  autoplay={
                    isMobile
                      ? { delay: 2500, disableOnInteraction: true }
                      : false
                  }
                  navigation={{
                    nextEl: ".swiper-button-next-polishing",
                    prevEl: ".swiper-button-prev-polishing",
                  }}
                  modules={[FreeMode, Pagination, Autoplay, Navigation]}
                  className="mySwiper"
                >
                  {FilterMarbelPolish.sort(
                    (a, b) => parseInt(a.order) - parseInt(b.order)
                  ).map((ele, index) => (
                    <SwiperSlide
                      key={ele._id}
                      style={{
                        backgroundColor: "white",
                        padding: "0px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <Link
                        to={{
                          pathname: generatePathname(ele.subcategory, city),
                        }}
                        // to="/servicedetails"
                        state={
                          ({ subcategory: ele.subcategory }, { data: ele })
                        }
                        style={{ textDecoration: "none" }}
                      >
                        <div className="col-md-4" style={{ width: "100%" }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <img
                              src={ele.imglink}
                              alt={`${ele.category} images`}
                              className="category_image"
                              style={{
                                // width: "150px",
                                // height: "150px",
                                borderRadius: "10px",
                              }}
                            />
                          </div>
                          <div className="poppins-medium mt-2">
                            {ele.subcategory}
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="swiper-button-prev swiper-button-prev-polishing">
                  <i className="fa-solid fa-arrow-left left-icon"></i>
                </div>
                <div className="swiper-button-next swiper-button-next-polishing">
                  <i className="fa-solid fa-arrow-right right-icon"></i>
                </div>
                <div className="swiper-pagination swiper-pagination-polishing"></div>
              </div>

              {/* Packers & Movers */}
              <div
                ref={PackersMoversRef}
                style={{ textAlign: "left" }}
                className="poppins-semibold mt-4 mb-2"
              >
                Packers & Movers{" "}
                <span
                  style={{
                    backgroundColor: "#20B2AA",
                    padding: "3px 25px",
                    borderRadius: "20px",
                  }}
                  className="poppins-black mx-2 offertext"
                >
                  1Lakh + Happy Customer
                </span>
              </div>
              <div className="mt-4" style={{ position: "relative" }}>
                <Swiper
                  slidesPerView={slidesPerView}
                  spaceBetween={30}
                  freeMode={true}
                  pagination={{
                    clickable: true,
                    el: ".swiper-pagination-packers",
                  }}
                  autoplay={
                    isMobile
                      ? { delay: 2500, disableOnInteraction: true }
                      : false
                  }
                  navigation={{
                    nextEl: ".swiper-button-next-packers",
                    prevEl: ".swiper-button-prev-packers",
                  }}
                  modules={[FreeMode, Pagination, Autoplay, Navigation]}
                  className="mySwiper"
                >
                  {FilterPackers.sort(
                    (a, b) => parseInt(a.order) - parseInt(b.order)
                  ).map((ele, index) => (
                    <SwiperSlide
                      key={ele._id}
                      style={{
                        backgroundColor: "white",
                        padding: "0px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <Link
                        // to={{
                        //   pathname: generatePathname(ele.subcategory, city),
                        // }}
                        to="/packers-movers"
                        state={{ cityName: cityName }}
                        style={{ textDecoration: "none" }}
                        // onClick={() => {
                        //   if (ele.category === "Packers & Movers") {
                        //     window.location.assign("/packers-movers");
                        //   } else {
                        //     setSelectedCategory(ele.category);
                        //     // toggleModal();
                        //   }
                        // }}
                      >
                        <div className="col-md-4" style={{ width: "100%" }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <img
                              src={ele.imglink}
                              alt={`${ele.category} images`}
                              className="category_image"
                              style={{
                                // width: "150px",
                                // height: "150px",
                                borderRadius: "10px",
                              }}
                            />
                          </div>
                          <div className="poppins-medium mt-2">
                            {ele.subcategory}
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
                {/* <div className="swiper-button-prev swiper-button-prev-packers">
                <i className="fa-solid fa-arrow-left left-icon"></i>
              </div>
              <div className="swiper-button-next swiper-button-next-packers">
                <i className="fa-solid fa-arrow-right right-icon"></i>
              </div>
              <div className="swiper-pagination swiper-pagination-packers"></div> */}
              </div>

              {/* Appliance Services */}
              <div
                ref={ApplianceServicesRef}
                className="poppins-semibold mt-4 mb-2"
                style={{ textAlign: "left" }}
              >
                Appliance Services{" "}
                <span
                  style={{
                    backgroundColor: "#9370DB",
                    padding: "3px 25px",
                    borderRadius: "20px",
                  }}
                  className="poppins-black mx-2 offertext"
                >
                  100+ booking Per Day
                </span>
              </div>
              <div className="mt-4" style={{ position: "relative" }}>
                <Swiper
                  slidesPerView={slidesPerView}
                  spaceBetween={30}
                  freeMode={true}
                  pagination={{
                    clickable: true,
                    el: ".swiper-pagination-appliance",
                  }}
                  autoplay={
                    isMobile
                      ? { delay: 2500, disableOnInteraction: true }
                      : false
                  }
                  navigation={{
                    nextEl: ".swiper-button-next-appliance",
                    prevEl: ".swiper-button-prev-appliance",
                  }}
                  modules={[FreeMode, Pagination, Autoplay, Navigation]}
                  className="mySwiper"
                >
                  {FilterAppliance.sort(
                    (a, b) => parseInt(a.order) - parseInt(b.order)
                  ).map((ele, index) => (
                    <SwiperSlide
                      key={ele._id}
                      style={{
                        backgroundColor: "white",
                        padding: "0px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <Link
                        to={{
                          pathname: generatePathname(ele.subcategory, city),
                        }}
                        // to="/servicedetails"
                        state={
                          ({ subcategory: ele.subcategory }, { data: ele })
                        }
                        style={{ textDecoration: "none" }}
                      >
                        <div className="col-md-4" style={{ width: "100%" }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <img
                              src={ele.imglink}
                              alt={`${ele.category} images`}
                              className="category_image"
                              style={{
                                // width: "150px",
                                // height: "150px",
                                borderRadius: "10px",
                              }}
                            />
                          </div>
                          <div className="poppins-medium mt-2">
                            {ele.subcategory}
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="swiper-button-prev swiper-button-prev-appliance">
                  <i className="fa-solid fa-arrow-left left-icon"></i>
                </div>
                <div className="swiper-button-next swiper-button-next-appliance">
                  <i className="fa-solid fa-arrow-right right-icon"></i>
                </div>
                <div className="swiper-pagination swiper-pagination-appliance"></div>
              </div>

              {/* Home Repairing Services */}
              <div
                id="home-repair-services"
                className="poppins-semibold mt-4 mb-2"
                style={{ textAlign: "left" }}
              >
                Home Repair Services
                <span
                  style={{
                    backgroundColor: "#FFA07A",
                    padding: "1px 7px",
                    borderRadius: "20px",
                  }}
                  className="poppins-black mx-2 offertext"
                >
                  Trained Team
                </span>
              </div>
              <div className="mt-4" style={{ position: "relative" }}>
                <Swiper
                  slidesPerView={slidesPerView}
                  spaceBetween={30}
                  freeMode={true}
                  pagination={{
                    clickable: true,
                    el: ".swiper-pagination-repairing",
                  }}
                  autoplay={
                    isMobile
                      ? { delay: 2500, disableOnInteraction: true }
                      : false
                  }
                  navigation={{
                    nextEl: ".swiper-button-next-repairing",
                    prevEl: ".swiper-button-prev-repairing",
                  }}
                  modules={[FreeMode, Pagination, Autoplay, Navigation]}
                  className="mySwiper"
                >
                  {FilterRepairing.sort(
                    (a, b) => parseInt(a.order) - parseInt(b.order)
                  ).map((ele, index) => (
                    <SwiperSlide
                      key={ele._id}
                      style={{
                        backgroundColor: "white",
                        padding: "0px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <Link
                        to={{
                          pathname: generatePathname(ele.subcategory, city),
                        }}
                        // to="/servicedetails"
                        state={
                          ({ subcategory: ele.subcategory }, { data: ele })
                        }
                        style={{ textDecoration: "none" }}
                      >
                        <div className="col-md-4" style={{ width: "100%" }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <img
                              src={ele.imglink}
                              alt={`${ele.category} images`}
                              className="category_image"
                              style={{
                                // width: "150px",
                                // height: "150px",
                                borderRadius: "10px",
                              }}
                            />
                          </div>
                          <div className="poppins-medium mt-2">
                            {ele.subcategory}
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="swiper-button-prev swiper-button-prev-repairing">
                  <i className="fa-solid fa-arrow-left left-icon"></i>
                </div>
                <div className="swiper-button-next swiper-button-next-repairing">
                  <i className="fa-solid fa-arrow-right right-icon"></i>
                </div>
                <div className="swiper-pagination swiper-pagination-repairing"></div>
              </div>

              {/* Facility man agement Services */}
              <div
                className="poppins-semibold mt-4"
                style={{ textAlign: "left" }}
              >
                Corporate Facility Management
              </div>
              <div className="mt-3" style={{ position: "relative" }}>
                <Swiper
                  slidesPerView={slidesPerView}
                  spaceBetween={30}
                  freeMode={true}
                  pagination={{
                    clickable: true,
                    el: ".swiper-pagination-appliance",
                  }}
                  autoplay={
                    isMobile
                      ? { delay: 2500, disableOnInteraction: true }
                      : false
                  }
                  navigation={{
                    nextEl: ".swiper-button-next-appliance",
                    prevEl: ".swiper-button-prev-appliance",
                  }}
                  modules={[FreeMode, Pagination, Autoplay, Navigation]}
                  className="mySwiper"
                >
                  {FacilityManagement.sort(
                    (a, b) => parseInt(a.order) - parseInt(b.order)
                  ).map((ele, index) => (
                    <SwiperSlide
                      key={ele._id}
                      style={{
                        backgroundColor: "white",
                        padding: "0px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <Link
                        to={{
                          pathname: generatePathname(ele.subcategory, city),
                        }}
                        // to="/servicedetails"
                        state={
                          ({ subcategory: ele.subcategory }, { data: ele })
                        }
                        style={{ textDecoration: "none" }}
                      >
                        <div className="col-md-4" style={{ width: "100%" }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <img
                              src={ele.imglink}
                              alt={`${ele.category} images`}
                              className="category_image"
                              style={{
                                // width: "150px",
                                // height: "150px",
                                borderRadius: "10px",
                              }}
                            />
                          </div>
                          <div className="poppins-medium mt-2">
                            {ele.subcategory}
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="swiper-button-prev swiper-button-prev-appliance">
                  <i className="fa-solid fa-arrow-left left-icon"></i>
                </div>
                <div className="swiper-button-next swiper-button-next-appliance">
                  <i className="fa-solid fa-arrow-right right-icon"></i>
                </div>
                <div className="swiper-pagination swiper-pagination-appliance"></div>
              </div>

              {/* suman */}
              <div
                className="poppins-semibold mb-4"
                style={{ textAlign: "left" }}
              >
                TestiMonial
              </div>
              <Swiper
                slidesPerView={testi}
                spaceBetween={40}
                freeMode={true}
                pagination={{
                  clickable: true,
                }}
                autoplay={{
                  delay: 3500,
                  disableOnInteraction: false,
                }}
                modules={[FreeMode, Pagination, Autoplay]}
                className="mySwiper"
              >
                <div className="col-md-4">
                  {testimonialdata.map((testimonial) => (
                    <SwiperSlide
                      key={testimonial._id}
                      style={{
                        // height: "500px",
                        // width: "500px",
                        backgroundColor: "white",
                        padding: "0px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "flex-start",
                      }}
                    >
                      {testimonial.videolink && (
                        <iframe
                          width="100%"
                          height="200"
                          src={getEmbedUrl(testimonial.videolink)}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      )}
                      <div className="poppins-medium mt-2">
                        {testimonial.title}
                      </div>

                      <div className="poppins-medium">
                        {testimonial.Testimonialname}
                      </div>

                      <div className="poppins-regular mt-2">
                        {testimonial.review}
                      </div>
                    </SwiperSlide>
                  ))}
                </div>
              </Swiper>

              <div
                className="poppins-semibold mt-4 mb-4"
                style={{ textAlign: "left" }}
              >
                {homepagetitledata[0]?.title}
              </div>

              <Swiper
                slidesPerView={slidesPerView}
                spaceBetween={30}
                freeMode={true}
                pagination={{
                  clickable: true,
                  el: ".swiper-pagination-packers",
                }}
                navigation={{
                  nextEl: ".swiper-button-next-packers",
                  prevEl: ".swiper-button-prev-packers",
                }}
                modules={[FreeMode, Pagination, Autoplay, Navigation]}
                className="mySwiper"
              >
                {sdata
                  .filter(
                    (i) => i.homePagetitle === homepagetitledata[0]?.title
                  )
                  .map((i) => (
                    <SwiperSlide
                      key={i._id}
                      style={{
                        backgroundColor: "white",
                        padding: "0px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <Link
                        to={{
                          pathname: generatePathname(i.subcategory, city),
                        }}
                        state={({ subcategory: i?.subcategory }, { data: i })}
                        key={i.subcategory}
                        style={{ textDecoration: "none" }}
                        className="text-decoration-none text-black"
                      >
                        <div className="col-md-4" style={{ width: "100%" }}>
                          <div>
                            <img
                              src={i.imglink}
                              alt={`${i.category} images`}
                              className="category_image"
                              style={{
                                // width: "150px",
                                // height: "150px",
                                borderRadius: "10px",
                              }}
                            />
                          </div>
                          <div className="poppins-medium mt-2">
                            {i.subcategory}
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
              </Swiper>

              <div
                className="poppins-semibold mt-4 mb-4"
                style={{ textAlign: "left" }}
              >
                {homepagetitledata[1]?.title}
              </div>

              <Swiper
                slidesPerView={slidesPerView}
                spaceBetween={30}
                freeMode={true}
                pagination={{
                  clickable: true,
                  el: ".swiper-pagination-packers",
                }}
                navigation={{
                  nextEl: ".swiper-button-next-packers",
                  prevEl: ".swiper-button-prev-packers",
                }}
                modules={[FreeMode, Pagination, Autoplay, Navigation]}
                className="mySwiper"
              >
                {sdata
                  .filter(
                    (i) => i.homePagetitle === homepagetitledata[1]?.title
                  )
                  .map((i) => (
                    <SwiperSlide
                      key={i._id}
                      style={{
                        backgroundColor: "white",
                        padding: "0px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <Link
                        to={{
                          pathname: generatePathname(i.subcategory, city),
                        }}
                        state={({ subcategory: i?.subcategory }, { data: i })}
                        key={i.subcategory}
                        style={{ textDecoration: "none" }}
                        className="text-decoration-none text-black"
                      >
                        <div className="col-md-4" style={{ width: "100%" }}>
                          <div>
                            <img
                              // source={{
                              //   uri: `https://api.vijayhomesuperadmin.in/subcat/${i.subcatimg}`,
                              // }}
                              src={i.imglink}
                              className="category_image"
                              style={{
                                // width: "150px",
                                // height: "150px",
                                borderRadius: "10px",
                              }}
                            />
                          </div>
                          <div className="poppins-medium mt-2 mb-5">
                            {i.subcategory}
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </div>

          <div className="home_mobileview">
            <div className="" style={{ width: "100%" }}>
              <input
                type="text"
                className="col-md-12 poppins-regular shadow"
                placeholder={
                  selectedCategoryy
                    ? `Search for ${searchcategory1}`
                    : "Search for Services"
                }
                style={{
                  paddingLeft: "140px",
                  fontSize: "16px",
                }}
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
              />
              <div
                onClick={handleResetModal}
                className="d-flex"
                style={{
                  position: "absolute",
                  marginTop: "-54px",
                  marginLeft: "15px",
                  borderRight: "2px solid black",
                }}
              >
                <i
                  className="fa-solid fa-location-dot"
                  style={{
                    fontSize: "16px",
                    marginTop: "3px",
                    color: "darkred",
                  }}
                ></i>
                <div
                  className="poppins-regular mx-2"
                  style={{ fontSize: "16px", marginTop: "2px" }}
                >
                  {cityName ? cityName : "Select City"}
                </div>
              </div>
              <i
                className="fa-solid fa-magnifying-glass"
                style={{
                  position: "absolute",
                  fontSize: "20px",
                  marginTop: "13px",
                  marginLeft: "-40px",
                }}
              ></i>
            </div>

            {searchQuery.length > 0 && (
              <div
                className="search-results"
                style={{
                  position: "absolute",
                  backgroundColor: "white",
                  width: "40%",
                  maxHeight: "300px",
                  overflowY: "auto",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  borderRadius: "5px",
                  marginTop: "-20px",
                  zIndex: 1000,
                  left: "40%",
                  right: "10%",
                }}
              >
                {filteredResults.length > 0 ? (
                  filteredResults.map((ele) => (
                    <div
                      className="row"
                      key={ele._id}
                      style={{ justifyContent: "center", padding: "5px 5px" }}
                    >
                      <div className="col-md-12">
                        <Link
                          to={{
                            pathname: generatePathname(ele.subcategory, city),
                          }}
                          state={
                            ({ subcategory: ele.subcategory }, { data: ele })
                          }
                          style={{ textDecoration: "none" }}
                        >
                          <div className="row">
                            <div className="col-md-12 mt-3">
                              <div
                                className="poppins-regular"
                                style={{ color: "black" }}
                              >
                                {ele?.category}
                              </div>
                              <div
                                className="poppins-regular"
                                style={{ color: "black" }}
                              >
                                {ele?.subcategory}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "10px",
                      color: "black",
                    }}
                  >
                    No results found
                  </div>
                )}
              </div>
            )}
            <div className="container mb-5">
              <div
                className="poppins-semibold mb-3"
                style={{ textAlign: "left", marginTop: "-20px" }}
              >
                Category
              </div>

              <div
                className="row"
                style={{
                  backgroundColor: "aliceblue",
                  padding: "15px",
                  borderRadius: "10px",
                }}
              >
                {category.map((ele, index) => (
                  <div className="col-3 " key={index}>
                    <div
                      className="d-flex"
                      style={{ justifyContent: "center" }}
                      onClick={() => handleScroll(ele.category)}
                    >
                      <img
                        src={`https://api.vijayhomesuperadmin.in/category/${ele.categoryImg}`}
                        alt="Category Images"
                        className="mt-2"
                        style={{
                          width: "70px",
                          height: "70px",
                          borderRadius: "10px",
                        }}
                      />
                    </div>
                    <div className="poppins-light text-center">
                      {ele.category}
                    </div>
                  </div>
                ))}
              </div>

              {/* <div className="row mt-3">
                {thoughtfull.slice(0, 3).map((data, index) => (
                  <div className="col-4" key={index}>
                    <video
                      onClick={handleShow}
                      src={data.creationslink}
                      // width="200px"
                      // height="300px"
                      style={{ width: "100%" }}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="thoughtfull-img"
                    ></video>
                  </div>
                ))}
              </div> */}

              <div
                id="cleaning"
                className="poppins-semibold mt-4 mb-2 service-section"
                style={{ textAlign: "left" }}
              >
                Cleaning Services
                <span
                  style={{
                    backgroundColor: "#FFB6C1",
                    padding: "3px 25px",
                    borderRadius: "20px",
                  }}
                  className="poppins-regular mx-2 offertext"
                >
                  up to 50% off
                </span>
              </div>

              <div className="row mt-3">
                {FilterCleaningWithImages.sort(
                  (a, b) => parseInt(a.order) - parseInt(b.order)
                ).map((ele, index) => (
                  <div className="col-3" key={index}>
                    <Link
                      to={{
                        pathname: generatePathname(ele.subcategory, city),
                      }}
                      state={({ subcategory: ele.subcategory }, { data: ele })}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <div
                        className="d-flex"
                        style={{ justifyContent: "center" }}
                      >
                        <img
                          src={ele.imglink}
                          className="mt-2"
                          alt={`${ele.category} images`}
                          style={{
                            width: "70px",
                            height: "70px",
                            borderRadius: "10px",
                          }}
                        />
                      </div>
                      <div className="poppins-light text-center">
                        {ele.subcategory}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

              <div
                id="painting"
                className="poppins-black mt-4 mb-2 service-section"
                style={{ textAlign: "left" }}
              >
                Painting Services{" "}
                <span
                  style={{
                    backgroundColor: "#ADD8E6",
                    padding: "3px 25px",
                    borderRadius: "20px",
                  }}
                  className="poppins-regular mx-2 offertext"
                >
                  100 % In House Staff
                </span>
              </div>

              <div className="row mt-3">
                {FilteredPaint.sort(
                  (a, b) => parseInt(a.order) - parseInt(b.order)
                ).map((ele, index) => (
                  <div className="col-3" key={index}>
                    <Link
                      to={{
                        pathname: generatePathname(ele.subcategory, city),
                      }}
                      state={({ subcategory: ele.subcategory }, { data: ele })}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <div
                        className="d-flex"
                        style={{ justifyContent: "center" }}
                      >
                        <img
                          src={ele.imglink}
                          className="mt-2"
                          alt={`${ele.category} images`}
                          style={{
                            width: "70px",
                            height: "70px",
                            borderRadius: "10px",
                          }}
                        />
                      </div>
                      <div className="poppins-light text-center">
                        {ele.subcategory}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

              <div className="row mt-3">
                <Swiper
                  slidesPerView={slidesbanner}
                  spaceBetween={30}
                  freeMode={true}
                  pagination={{
                    clickable: true,
                  }}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  modules={[FreeMode, Pagination, Autoplay]}
                  className="mySwiper"
                >
                  <div className="col-md-4">
                    {offerBanner.map((data) => (
                      <SwiperSlide
                        key={data._id}
                        style={{
                          backgroundColor: "white",
                          padding: "0px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "flex-start",
                        }}
                      >
                        <div onClick={handleShow}>
                          <img
                            src={data.offer}
                            alt="loading..."
                            className="category_banner"
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </div>
                </Swiper>
              </div>

              <div
                id="pest-control"
                className="poppins-black mt-4 mb-2 service-section"
                style={{ textAlign: "left" }}
              >
                Pest Control
                <span
                  style={{
                    backgroundColor: "#98FB98",
                    padding: "3px 25px",
                    borderRadius: "20px",
                  }}
                  className="poppins-regular mx-2 offertext"
                >
                  Licensed Company
                </span>
              </div>

              <div className="row mt-3">
                {FilterPestControl.sort(
                  (a, b) => parseInt(a.order) - parseInt(b.order)
                ).map((ele, index) => (
                  <div className="col-3" key={index}>
                    <Link
                      to={{
                        pathname: generatePathname(ele.subcategory, city),
                      }}
                      state={({ subcategory: ele.subcategory }, { data: ele })}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <div
                        className="d-flex"
                        style={{ justifyContent: "center" }}
                      >
                        <img
                          src={ele.imglink}
                          className="mt-2"
                          alt={`${ele.category} images`}
                          style={{
                            width: "70px",
                            height: "70px",
                            borderRadius: "10px",
                          }}
                        />
                      </div>
                      <div className="poppins-light text-center">
                        {ele.subcategory}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

              <div className="row mb-3 mt-3">
                <div
                  className="poppins-black"
                  style={{ fontSize: "16px", textAlign: "left" }}
                >
                  Deal of the week
                </div>

                <img
                  src={deal}
                  alt="vhs"
                  style={{ width: "245px", height: "51px", marginTop: "5px" }}
                />
              </div>

              <div
                id="floor-polishing"
                className="poppins-black mt-4 mb-2 service-section"
                style={{ textAlign: "left" }}
              >
                Floor Polishing{" "}
                <span
                  style={{
                    backgroundColor: "#FFD700",
                    padding: "3px 25px",
                    borderRadius: "20px",
                  }}
                  className="poppins-regular mx-2 offertext"
                >
                  Shine Like New
                </span>
              </div>

              <div className="row mt-3">
                {FilterMarbelPolish.sort(
                  (a, b) => parseInt(a.order) - parseInt(b.order)
                ).map((ele, index) => (
                  <div className="col-3" key={index}>
                    <Link
                      to={{
                        pathname: generatePathname(ele.subcategory, city),
                      }}
                      state={({ subcategory: ele.subcategory }, { data: ele })}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <div
                        className="d-flex"
                        style={{ justifyContent: "center" }}
                      >
                        <img
                          src={ele.imglink}
                          className="mt-2"
                          alt={`${ele.category} images`}
                          style={{
                            width: "70px",
                            height: "70px",
                            borderRadius: "10px",
                          }}
                        />
                      </div>
                      <div className="poppins-light text-center">
                        {ele.subcategory}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

              <div
                id="packers-and-movers"
                className="poppins-black mt-4 mb-2 service-section"
                style={{ textAlign: "left" }}
              >
                Packers & Movers{" "}
                <span
                  style={{
                    backgroundColor: "#20B2AA",
                    padding: "3px 25px",
                    borderRadius: "20px",
                  }}
                  className="poppins-regular mx-2 offertext"
                >
                  1Lakh + Happy Customer
                </span>
              </div>

              <div className="row mt-3">
                {FilterPackers.sort(
                  (a, b) => parseInt(a.order) - parseInt(b.order)
                ).map((ele, index) => (
                  <div className="col-3" key={index}>
                    <Link
                      to="/packers-movers"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <div
                        className="d-flex"
                        style={{ justifyContent: "center" }}
                      >
                        <img
                          src={ele.imglink}
                          className="mt-2"
                          alt={`${ele.category} images`}
                          style={{
                            width: "70px",
                            height: "70px",
                            borderRadius: "10px",
                          }}
                        />
                      </div>
                      <div className="poppins-light text-center">
                        {ele.subcategory}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

              <div
                id="appliance-service"
                className="poppins-black mt-4 mb-2 service-section"
                style={{ textAlign: "left" }}
              >
                Appliance Services{" "}
                <span
                  style={{
                    backgroundColor: "#9370DB",
                    padding: "3px 25px",
                    borderRadius: "20px",
                  }}
                  className="poppins-regular mx-2 offertext"
                >
                  100+ booking Per Day
                </span>
              </div>

              <div className="row mt-3">
                {FilterAppliance.sort(
                  (a, b) => parseInt(a.order) - parseInt(b.order)
                ).map((ele, index) => (
                  <div className="col-3" key={index}>
                    <Link
                      to={{
                        pathname: generatePathname(ele.subcategory, city),
                      }}
                      state={({ subcategory: ele.subcategory }, { data: ele })}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <div
                        className="d-flex"
                        style={{ justifyContent: "center" }}
                      >
                        <img
                          src={ele.imglink}
                          className="mt-2"
                          alt={`${ele.category} images`}
                          style={{
                            width: "70px",
                            height: "70px",
                            borderRadius: "10px",
                          }}
                        />
                      </div>
                      <div className="poppins-light text-center">
                        {ele.subcategory}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

              <div
                id="home-repair-services"
                className="poppins-black mt-4 mb-2 service-section"
                style={{ textAlign: "left" }}
              >
                Home Repair Services
                <span
                  style={{
                    backgroundColor: "#FFA07A",
                    padding: "3px 25px",
                    borderRadius: "20px",
                  }}
                  className="poppins-regular mx-2 offertext"
                >
                  Trained Team
                </span>
              </div>

              <div className="row mt-3">
                {FilterRepairing.sort(
                  (a, b) => parseInt(a.order) - parseInt(b.order)
                ).map((ele, index) => (
                  <div className="col-3" key={index}>
                    <Link
                      to={{
                        pathname: generatePathname(ele.subcategory, city),
                      }}
                      state={({ subcategory: ele.subcategory }, { data: ele })}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <div
                        className="d-flex"
                        style={{ justifyContent: "center" }}
                      >
                        <img
                          src={ele.imglink}
                          className="mt-2"
                          alt={`${ele.category} images`}
                          style={{
                            width: "70px",
                            height: "70px",
                            borderRadius: "10px",
                          }}
                        />
                      </div>
                      <div className="poppins-light text-center">
                        {ele.subcategory}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

              <div
                id="facility-management"
                className="poppins-black mt-4 mb-2 service-section"
                style={{ textAlign: "left" }}
              >
                Facility Management
              </div>

              <div className="row mt-3">
                {FacilityManagement.sort(
                  (a, b) => parseInt(a.order) - parseInt(b.order)
                ).map((ele, index) => (
                  <div className="col-3" key={index}>
                    <Link
                      to={{
                        pathname: generatePathname(ele.subcategory, city),
                      }}
                      state={({ subcategory: ele.subcategory }, { data: ele })}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <div
                        className="d-flex"
                        style={{ justifyContent: "center" }}
                      >
                        <img
                          src={ele.imglink}
                          className="mt-2"
                          alt={`${ele.category} images`}
                          style={{
                            width: "70px",
                            height: "70px",
                            borderRadius: "10px",
                          }}
                        />
                      </div>
                      <div className="poppins-light text-center">
                        {ele.subcategory}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

              <div
                className="poppins-black mb-4 mt-3"
                style={{ textAlign: "left" }}
              >
                TestiMonial
              </div>

              <Swiper
                slidesPerView={testi}
                spaceBetween={40}
                freeMode={true}
                pagination={{
                  clickable: true,
                }}
                autoplay={{
                  delay: 3500,
                  disableOnInteraction: false,
                }}
                modules={[FreeMode, Pagination, Autoplay]}
                className="mySwiper"
              >
                <div className="col-md-4">
                  {testimonialdata.map((testimonial) => (
                    <SwiperSlide
                      key={testimonial._id}
                      style={{
                        // height: "500px",
                        // width: "500px",
                        backgroundColor: "white",
                        padding: "0px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "flex-start",
                      }}
                    >
                      {testimonial.videolink && (
                        <iframe
                          width="100%"
                          height="200"
                          src={getEmbedUrl(testimonial.videolink)}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      )}
                      <div className="poppins-medium mt-2">
                        {testimonial.title}
                      </div>

                      <div className="poppins-medium">
                        {testimonial.Testimonialname}
                      </div>

                      <div className="poppins-regular mt-2">
                        {testimonial.review}
                      </div>
                    </SwiperSlide>
                  ))}
                </div>
              </Swiper>

              <div
                className="poppins-black mt-4 mb-2"
                style={{ textAlign: "left" }}
              >
                {homepagetitledata[0]?.title}
              </div>
              <div className="row">
                {sdata
                  .filter(
                    (i) => i.homePagetitle === homepagetitledata[0]?.title
                  )
                  .slice(0, 4)
                  .map((i) => (
                    <div className="col-3" key={i._id}>
                      <Link
                        to={{
                          pathname: generatePathname(i.subcategory, city),
                        }}
                        state={({ subcategory: i?.subcategory }, { data: i })}
                        key={i.subcategory}
                        style={{ textDecoration: "none" }}
                        className="text-decoration-none text-black"
                      >
                        <div
                          className="d-flex"
                          style={{ justifyContent: "center" }}
                        >
                          <img
                            src={i.imglink}
                            alt={`${i.category} images`}
                            className="mt-2"
                            style={{
                              width: "70px",
                              height: "70px",
                              borderRadius: "10px",
                            }}
                          />
                        </div>
                        <div className="poppins-light text-center">
                          {i.subcategory}
                        </div>
                      </Link>
                    </div>
                  ))}
              </div>

              <div
                className="poppins-black mt-4 mb-2"
                style={{ textAlign: "left" }}
              >
                {homepagetitledata[1]?.title}
              </div>
              <div className="row mb-4">
                {sdata
                  .filter(
                    (i) => i.homePagetitle === homepagetitledata[1]?.title
                  )
                  .slice(0, 4)
                  .map((i) => (
                    <div className="col-3" key={i._id}>
                      <Link
                        to={{
                          pathname: generatePathname(i.subcategory, city),
                        }}
                        state={({ subcategory: i?.subcategory }, { data: i })}
                        key={i.subcategory}
                        style={{ textDecoration: "none" }}
                        className="text-decoration-none text-black"
                      >
                        <div
                          className="d-flex"
                          style={{ justifyContent: "center" }}
                        >
                          <img
                            src={i.imglink}
                            alt={`${i.category} images`}
                            className="mt-2"
                            style={{
                              width: "70px",
                              height: "70px",
                              borderRadius: "10px",
                            }}
                          />
                        </div>
                        <div className="poppins-light text-center">
                          {i.subcategory}
                        </div>
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <Footer />
        </>
      )}

      <Modal size="lg" show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>All Sub Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row m-auto p-4">
            {filteredData?.map((ele, index) => (
              <div className="col-md-3 ">
                <div className="row  mb-4">
                  <div className="col-md-10">
                    <Link
                      to="/servicedetails"
                      state={{ subcategory: ele?.subcategory }}
                      key={ele.subcategory}
                      style={{ textDecoration: "none" }}
                      className="text-decoration-none text-black"
                    >
                      <div className="row mb-2 shadow-sm  bg-white  subimg1 p-2">
                        <img
                          className="subimg p-0 bg-white"
                          width={120}
                          height={120}
                          alt=""
                          src={`https://api.vijayhomesuperadmin.in/subcat/${ele?.subcatimg}`}
                        />
                      </div>
                      <p className="row fnt12 text-center m-auto p-2 boldt">
                        {ele.subcategory}
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="col-md-2"
            variant="secondary"
            onClick={() => setShowModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal size="lg" show={viewmoreCategory} onHide={handleViewLessCategory}>
        <Modal.Header closeButton>
          <Modal.Title>All Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row p-4">
            {FilteredCategory?.map((ele, index) => (
              <div className="col-md-4">
                <div className="row">
                  <Link
                    className="linkt"
                    onClick={() => handleShowSelectCategory(ele.category)}
                  >
                    <div className="col-md-10">
                      <img
                        className="mb-3"
                        width={60}
                        height={60}
                        alt=""
                        src={`https://api.vijayhomesuperadmin.in/category/${ele?.categoryImg}`}
                      />
                      <p className="fnt col-md-10">{ele.category}</p>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="col-md-2"
            variant="secondary"
            onClick={handleViewLessCategory}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        size="lg"
        show={ModalSubcategoryView}
        onHide={handleCloseSubcategoryView}
      >
        <Modal.Header closeButton>
          <Modal.Title>All Subcategory Of {CateGoryName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row p-4">
            {SelectedCategory?.map((ele, index) => (
              <div className="col-md-3 ">
                <div className="row  mb-4">
                  <div className="col-md-10 ">
                    <Link
                      to="/servicedetails"
                      state={{ subcategory: ele?.subcategory }}
                      key={ele.subcategory}
                      style={{ textDecoration: "none" }}
                      className="text-decoration-none text-black"
                    >
                      <div className="row mb-2 shadow-sm  bg-white  subimg1 p-2">
                        <img
                          className="subimg p-0 bg-white"
                          width={120}
                          height={120}
                          alt=""
                          src={`https://api.vijayhomesuperadmin.in/subcat/${ele?.subcatimg}`}
                        />
                      </div>
                      <p className="row fnt12 text-center m-auto p-2 boldt">
                        {ele.subcategory}
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="col-md-2"
            variant="secondary"
            onClick={handleCloseSubcategoryView}
          >
            Close
          </Button>
        </Modal.Footer>
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
                        cityName === city.city ? "active" : ""
                      }`}
                      onClick={() => handleChange(city)}
                    >
                      <i
                        className={`fa-solid fa-location-dot ${
                          cityName === city.city ? "active-icon" : ""
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
                src="https://vijayahomeservices.b-cdn.net/city1.webp"
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
                        cityName === city.city ? "active" : ""
                      }`}
                      onClick={() => handleChange(city)}
                    >
                      <i
                        className={`fa-solid fa-location-dot ${
                          cityName === city.city ? "active-icon" : ""
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

      {/* Enquiry Modal */}
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Body>
          <div className="poppins-semibold">Enquiry Add</div>

          <div className="mt-2">
            <div className="poppins-light">Name</div>
            <input
              type="text"
              className="input col-md-12 mt-2 vhs-input-value"
              onChange={(e) => setname(e.target.value)}
            />
          </div>

          {/* <div className="">
            <div className="poppins-light">Email</div>
            <input
              type="text"
              className="input col-md-12 mt-2 vhs-input-value"
              onChange={(e) => setemail(e.target.value)}
            />
          </div> */}

          <div className="">
            <div className="poppins-light">Contact</div>
            <input
              type="tel"
              className="input col-md-12 mt-2 vhs-input-value"
              onChange={(e) => setcontact1(e.target.value)}
            />
          </div>

          <div className="">
            <div className="poppins-light">Description (optional)</div>
            <input
              type="text"
              className="input col-md-12 mt-2 vhs-input-value"
              onChange={(e) => setcomment(e.target.value)}
            />
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
            }}
          >
            Submit
          </div>
        </Modal.Body>
      </Modal>

      { /* SEO return */}
      <div> 
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href = {`https://www.vijayhomeservices.com/${cityName}`} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
    </div>

    </>
  );
}
