import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import "../Component/Servicedetails.css";
import CheckIcon from "@mui/icons-material/Check";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import StarIcon from "@mui/icons-material/Star";
import { SpinnerCircular } from "spinners-react";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import ReactPlayer from "react-player";
import { addToCart, clearCart } from "../Redux1/MyCartSlice";
import Header1 from "./Header1";
import call from "../assests/call.gif";
import web from "../assests/web.gif";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { FreeMode, Pagination, Autoplay, Navigation } from "swiper/modules";
import Faq from "react-faq-component";
import Cartnavbar from "./Cartnavbar";
import NavbarCompo from "./navbar";
import Homenavbar from "./Homenavbar";
import ReactHlsPlayer from "react-hls-player";
import subcall from "../../src/assests/subcall.gif";
import subweb from "../../src/assests/subweb.gif";
import moment from "moment";

function capitalizeFirstLetter1(string) {
  if (typeof string !== "string" || string.length === 0) {
    return string; // Return the original string if it's not a valid string or is empty
  }

  return string.charAt(0).toUpperCase() + string.slice(1);
}

const capitalizeWords = (str) => {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

function Subcategory() {
  const { subcategory } = useParams();
  const location = useLocation();

  const currentURL = window.location.href;

  const queryString = window.location.search;

  const serviceRefs = useRef({});

  localStorage.setItem("currentURL", currentURL);
  const currentURLdata = localStorage.getItem("currentURL");

  const getQueryParams = (queryString, param) => {
    const params = new URLSearchParams(queryString);
    return params.get(param);
  };

  const utmSource = getQueryParams(queryString, "utm_source");

  useEffect(() => {
    if (utmSource) {
      localStorage.setItem("utm_source", utmSource);
    }
  }, [utmSource]);

  const localutm = localStorage.getItem("utm_source");

  useEffect(() => {
    const fullQueryString = location.search;

    if (fullQueryString) {
      localStorage.setItem("fullQuery", fullQueryString);
    }
  }, [location]);

  const storedQuery = localStorage.getItem("fullQuery");

  const getQueryParams1 = (queryString, param) => {
    const params = new URLSearchParams(queryString);
    return params.get(param);
  };
  const utmcampaign = getQueryParams1(queryString, "utm_campaign");

  useEffect(() => {
    if (utmcampaign) {
      localStorage.setItem("utm_campaign", utmcampaign);
    }
  }, [utmcampaign]);

  const localutmcampaign = localStorage.getItem("utm_campaign");

  const getQueryParams2 = (queryString, param) => {
    const params = new URLSearchParams(queryString);
    return params.get(param);
  };
  const utmcontent = getQueryParams2(queryString, "utm_content");

  useEffect(() => {
    if (utmcontent) {
      localStorage.setItem("utm_content", utmcontent);
    }
  }, [utmcontent]);

  const localutmcontent = localStorage.getItem("utm_content");

  const [subcategoryData, setSubcategoryData] = useState([]);

  const [allSubcat, setAllSubcat] = useState([]);
  const [sub, setSub] = useState("");

  const { data } = location.state || {};
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [show, setShow] = useState(false);
  const [enquiryshow, setenquiryshow] = useState(false);
  const MyCartItmes = useSelector((state) => state.cart);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleenquiryClose = () => setenquiryshow(false);
  const handleenquiryShow = () => setenquiryshow(true);
  const dispatch = useDispatch();
  const [serviceData, setserviceData] = useState([]);
  const [selectedServiceName, setSelectedServiceName] = useState("");
  const [serviceamount, setserviceamount] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [Item, setItem] = useState([]);
  const [OpenViewCartModal, setOpenViewCartModal] = useState(false);

  const [subcategoryVideo, setsubcategoryVideo] = useState([]);

  const [ModalSubcategoryView, setModalSubcategoryView] = useState(false);
  const [SelectService, setSelectService] = useState(null);
  const [SelectedCategory, setSelectedCategory] = useState([]);
  const [Added, setAdded] = useState(true);
  const [SelectedIndex, setSelectedIndex] = useState(null);
  const [Quantity, setQuantity] = useState(1);
  const [offerBannerdata, setofferBannerdata] = useState([]);
  const [postsubdata, setpostsubdata] = useState([]);
  const [vshow, setvShow] = useState(false);
  const [modalbanner, setmodalbanner] = useState([]);
  const [vhspromise, setvhspromise] = useState([]);
  const [whychooseus, setwhychooseus] = useState([]);
  const [allcamparison, setallcamparison] = useState([]);
  const [faq, setfaq] = useState([]);
  const [review, setreview] = useState([]);
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [Bannermidledata, setBannermidledata] = useState([]);
  const [name, setname] = useState("");
  const [mobilenumber, setmobilenumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [customername, setcustomername] = useState("");
  const [mainContact, setmainContact] = useState("");
  const [loginloading, setloginloading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    getSubcategories();
  }, []);

  const user = localStorage.getItem("user");

  const handleChange = () => {
    const City = capitalizeFirstLetter(city);

    if (user) {
      navigate("/cart", { state: { city: City } });
    } else {
      navigate("/login", { state: { city: City } });
    }
  };

  const transformedFaqData = {
    rows: faq.map((f) => ({
      title: <div className="poppins-black">{f.question}</div>,
      content: <div className="poppins-regular">{f.answer}</div>,
    })),
  };

  const toSlug = (str) => {
    return str.toLowerCase().replace(/\s+/g, "-");
  };

  const styles = {
    titleTextColor: "darkred",
    rowTitleColor: "darkred",
  };

  useEffect(() => {
    getallfaq();
  }, [subcategoryData]);

  const getallfaq = async () => {
    let res = await axios.get(
      "https://api.vijayhomeservice.com/api/faq/getallvhsfaq"
    );
    if ((res.status = 200)) {
      setfaq(
        res.data?.data.filter(
          (i) => i?.category === subcategoryData[0]?.category
        )
      );
    }
  };

  const [Cat, setCat] = useState(false);
  const [categorynewData, setcategorynewData] = useState([]);

  useEffect(() => {
    if (
      subcategory &&
      typeof subcategory === "string" &&
      allSubcat.length > 0
    ) {
      let cleanedSubcategory = subcategory.trim();

      if (cleanedSubcategory.startsWith("-")) {
        cleanedSubcategory = cleanedSubcategory.substring(1);
      }

      let parts = cleanedSubcategory.split("-");

      let newcat;

      if (parts.length > 1) {
        newcat = parts
          .slice(0, 2)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      }

      let fullServiceName = allSubcat.find((service) =>
        service.subcategory.toLowerCase().includes(newcat?.toLowerCase() || "")
      );

      if (!fullServiceName) {
        newcat = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);

        fullServiceName = allSubcat.find((service) =>
          service.subcategory.toLowerCase().includes(newcat.toLowerCase())
        );
      }

      const category1 = capitalizeFirstLetter(parts[0]);

      const services = [
        "Cleaning",
        "Painting",
        "Pest Control",
        "Floor Polishing",
        "Home Repair Services",
        "Packers & Movers",
        "Appliance Service",
        "Facility Management",
      ];

      const categoryNamecheck = services.find((service) =>
        service.toLowerCase().includes(category1.toLowerCase())
      );

      if (categoryNamecheck) {
        let city = parts[parts.length - 1];
        if (city.startsWith("in-")) {
          city = city.substring(3);
        }

        setCity(city);
        setCat(true);
        categoryData(categoryNamecheck);
      } else if (fullServiceName) {
        let city = parts[parts.length - 1];
        if (city.startsWith("in-")) {
          city = city.substring(3); // Remove the first three characters ("in-")
        }

        setCity(city);
        setSub(fullServiceName.subcategory);
        getSubcategory(fullServiceName.subcategory);
      } else {
        console.error("Service not found");
      }
    } else {
      console.error("subcategory is not a string or is empty");
    }
  }, [subcategory, allSubcat]);

  const categoryData = async (category) => {
    try {
      let res = await axios.post(
        `https://api.vijayhomesuperadmin.in/api/userapp/postappsubcat`,
        { category: category }
      );

      if (res.status === 200) {
        setcategorynewData(res.data.subcategory);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const TotalPrice = MyCartItmes.reduce(
    (acc, cur) => acc + Number(cur.offerprice) * cur.qty, // Calculate total price considering quantity
    0
  );

  let SelectedService = serviceData
    .map((serivice) =>
      serivice.morepriceData.filter((paln) => paln._id === SelectService)
    )
    .flatMap((cart) => cart);

  const handleAdd = (e, data, index) => {
    e.preventDefault();
    setSelectedIndex(index);
    setSelectService(data);
    setAdded(false);
    setModalSubcategoryView(false);
    setOpenViewCartModal(true);
    setAdded(true);
  };

  useEffect(() => {
    getallwhychooseus();
  }, []);

  const getallwhychooseus = async () => {
    let res = await axios.get(
      "https://api.vijayhomeservice.com/api/whychoose/getallwhychoose"
    );
    if (res.status === 200) {
      setwhychooseus(res.data?.data);
    }
  };

  const getSubcategory = async (category) => {
    try {
      const res = await axios.post(
        `https://api.vijayhomesuperadmin.in/api/userapp/postsubcatservice`,
        { Subcategory: category }
      );
      if (res.status === 200) {
        setSubcategoryData(res.data.subcatdata);
      }
    } catch (err) {
      console.log(err);
    }
  };

  function capitalizeFirstLetter(string) {
    if (!string) return string; // Check if the string is empty or undefined
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  const [selectedData, setSelectedData] = useState([]);

  const handleBook = (data) => {
    setSelectedData(data);
    setShow(true);
  };

  const [selectedItems, setSelectedItems] = useState([]);

  const getSubcategories = async () => {
    try {
      const res = await axios.get(
        `https://api.vijayhomesuperadmin.in/api/userapp/getappsubcat`
      );
      if (res.status === 200) {
        setAllSubcat(res.data.subcategory);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getsubcategory = useCallback(async () => {
    try {
      let res = await axios.post(
        "https://api.vijayhomesuperadmin.in/api/userapp/postappresubcat/",
        {
          subcategory: sub,
        }
      );
      if (res.status === 200) {
        setpostsubdata(res.data?.subcategory);
      }
    } catch (err) {
      console.log(err);
    }
  }, [sub]);

  useEffect(() => {
    if (sub) {
      getsubcategory();
    }
  }, [sub, getsubcategory]);

  const getsubcategoryVideo = useCallback(async () => {
    try {
      let res = await axios.get(
        "https://api.vijayhomesuperadmin.in/api/userapp/getappsubcat"
      );
      if (res.status === 200) {
        let subcategorys = sub?.toLowerCase();
        let filteredData = res.data?.subcategory?.filter((Ele) => {
          let videoLink = Ele?.subcategory?.toLowerCase();
          return subcategorys?.includes(videoLink);
        });
        setsubcategoryVideo(filteredData);
      }
    } catch (err) {
      console.log(err);
    }
  }, [sub]);

  useEffect(() => {
    if (postsubdata.length > 0) {
      getsubcategoryVideo();
    }
  }, [postsubdata, getsubcategoryVideo]);

  // Memoize the video list to prevent re-renders unless subcategoryVideo changes
  const renderedVideos = useMemo(() => {
    return subcategoryVideo.map((Ele) => (
      <ReactHlsPlayer
        key={Ele._id} // Ensure unique key
        src={Ele.videolink}
        autoPlay={true}
        controls={false}
        width="100%"
        height="250px"
        muted
        loop
        playsInline
      />
    ));
  }, [subcategoryVideo]);

  useEffect(() => {
    getmodalbanner();
  }, []);

  const getmodalbanner = async () => {
    let res = await axios.get(
      "https://api.vijayhomeservice.com/api/pbanner/getallpopupbanner"
    );
    if ((res.status = 200)) {
      setmodalbanner(
        res.data?.data.filter(
          (i) => i?.category === subcategoryData[0]?.category
        )
      );
    }
  };

  useEffect(() => {
    getallvhspromises();
  }, []);

  const getallvhspromises = async () => {
    let res = await axios.get(
      "https://api.vijayhomeservice.com/api/vhspromise/getallvhspromise"
    );
    if ((res.status = 200)) {
      setvhspromise(res.data?.data);
    }
  };

  const CartSavedtotal = MyCartItmes?.reduce((accumulator, item) => {
    const offerPrice = parseFloat(item?.offerprice);
    const planPrice = parseFloat(item?.planPrice);
    const quantity = parseInt(item?.qty);

    if (!isNaN(offerPrice) && !isNaN(quantity)) {
      const subtotal = planPrice * quantity;

      return accumulator + subtotal;
    } else {
      return accumulator;
    }
  }, 0);

  const discountPercentages =
    ((CartSavedtotal - TotalPrice) / CartSavedtotal) * 100;

  const formattedDiscount = discountPercentages.toFixed(2);

  useEffect(() => {
    getreview();
  }, [subcategoryData]);

  const getreview = async () => {
    let res = await axios.get(
      "https://api.vijayhomeservice.com/api/review/getallvhsreview"
    );
    if ((res.status = 200)) {
      setreview(
        res.data?.data.filter(
          (i) => i?.category === subcategoryData[0]?.category
        )
      );
    }
  };

  useEffect(() => {
    getallcomparison();
  }, [subcategoryData]);

  const getallcomparison = async () => {
    let res = await axios.get(
      "https://api.vijayhomeservice.com/api/comparison/getallvhscomparison"
    );
    if ((res.status = 200)) {
      setallcamparison(
        res.data?.data.filter(
          (i) => i?.category === subcategoryData[0]?.category
        )
      );
    }
  };

  const vhandleClose = () => setvShow(false);
  const vhandleShow = () => setvShow(true);

  const handleCloseSubcategoryView = () => {
    setModalSubcategoryView(false);
  };

  const [catType, setcatType] = useState(null);
  const [activeIndex, setActiveIndex] = useState(false);
  const [activeIndex2, setActiveIndex2] = useState(null);
  const toggleAccordion1 = (e, cate, index) => {
    e.preventDefault();
    setcatType(cate);
    setActiveIndex(!activeIndex);
    setActiveIndex2(index);
  };

  const capitalizedCity = capitalizeFirstLetter(city);

  const handleCloseCart = () => {
    setOpenViewCartModal(false);
  };

  const handleItemClick = (item, index) => {
    setSelectedItemIndex(index);
    setItem(selectedData);
    const Item = selectedData;
    const itemToAdd = {
      _id: item._id,
      category: subcategoryData[0]?.category,
      service: Item,
      pName: item.pName,
      pPrice: item.pPrice,
      pofferprice: item.pofferprice,
      pservices: item.pservices,
    };

    if (!item.pservices) {
      const existingCartItem = MyCartItmes.find(
        (cartItem) => cartItem.category === subcategoryData[0]?.category
      );

      if (existingCartItem) {
        dispatch(addToCart({ ...itemToAdd, id: existingCartItem.id }));
      } else {
        dispatch(clearCart());
        dispatch(addToCart(itemToAdd));
      }
    } else {
      // alert("This is AMC services ")
      navigate("/summary", {
        state: { plan: item, sdata: selectedData, city: city },
      });
    }

    setSelectedItems((prevSelectedItems) => {
      const updatedSelectedItems = [...prevSelectedItems];
      updatedSelectedItems[index] = !updatedSelectedItems[index];
      return updatedSelectedItems;
    });
  };

  useEffect(() => {
    getbannerimg();
  }, [offerBannerdata]);

  const getbannerimg = async () => {
    let res = await axios.get(
      "https://api.vijayhomesuperadmin.in/api/userapp/getallofferbanner"
    );
    if ((res.status = 200)) {
      setofferBannerdata(
        res.data?.offerbanner.filter((i) => i.subcategory === sub)
      );
    }
  };

  useEffect(() => {
    getbannerdatamiddle();
  }, [Bannermidledata]);

  const getbannerdatamiddle = async () => {
    let res = await axios.get(
      "https://api.vijayhomesuperadmin.in/api/userapp/getallSpotlightSP"
    );
    if ((res.status = 200)) {
      setBannermidledata(
        res.data?.SpotlightSP.filter((i) => i?.service === sub)
      );
    }
  };

  const scrollToService = (index) => {
    const section = document.getElementById(`service-${index}`);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const generatePathname = (subcategory, city) => {
    return `/services/${subcategory.toLowerCase().replace(/ /g, "-")}-in-${city
      .toLowerCase()
      .replace(/ /g, "-")}`;
  };

  const generatePathname1 = (serviceName, capitalizedCity) => {
    let cleanedSubcategory = serviceName.trim();
    if (cleanedSubcategory.startsWith("-")) {
      cleanedSubcategory = cleanedSubcategory.substring(1);
    }

    // Generate the URL
    return `/viewdetails/${cleanedSubcategory
      .toLowerCase()
      .replace(/ /g, "-")}-in-${capitalizedCity
      ?.toLowerCase()
      .replace(/ /g, "-")}`;
  };

  // const addsurvey = async (e, serviceName) => {
  //   e.preventDefault();
  //   console.log("selectedServiceName====", serviceName);
  //   if (!name || !mobilenumber) {
  //     alert("Please fill in all fields");
  //     return;
  //   }
  //   const phoneRegex = /^[6-9]\d{9}$/;
  //   if (!phoneRegex.test(mobilenumber)) {
  //     alert("Please enter a valid 10-digit mobile number");
  //     return;
  //   }

  //   try {
  //     setLoading(true);
  //     const config = {
  //       url: "https://api.vijayhomeservicebengaluru.in/api/addnewenquiry",
  //       method: "post",
  //       headers: { "Content-Type": "application/json" },
  //       data: {
  //         mobile: mobilenumber,
  //         name: name,
  //         category: "Painting",
  //         city: capitalizedCity,
  //         date: moment().format("MM-DD-YYYY"),
  //         Time: moment().format("h:mm:ss a"),
  //         reference1: "website",
  //         reference2: localutm,
  //         // reference3: localutmcampaign,
  //         reference5: localutmcampaign,
  //         reference4: localutmcontent,
  //         formdetails: serviceName,
  //         Tag : ""
  //       },
  //     };

  //     const response = await axios(config);

  //     if (response.status === 200) {
  //       setenquiryshow(false);
  //       addenquiryfollowup1(response.data.data);
  //       // alert("Enquiry added successfully");
  //     } else {
  //       alert(`Unexpected response: ${response.status}`);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     if (error.response) {
  //       alert(
  //         `Error: ${error.response.data.message || "Failed to add enquiry"}`
  //       );
  //     } else if (error.request) {
  //       alert("No response received. Please check your network connection.");
  //     } else {
  //       alert("An error occurred: " + error.message);
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const addsurvey = async (e, serviceName, serviceamount) => {
    e.preventDefault();

    if (!name || !mobilenumber) {
      alert("Please fill in all fields");
      return;
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(mobilenumber)) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }

    try {
      setLoading(true);

      // Extract UTM parameters from the current URL
      const queryParams = new URLSearchParams(window.location.search);
      const utmSource = queryParams.get("utm_source") || "";
      const utmMedium = queryParams.get("utm_medium") || "";
      const utmCampaign = queryParams.get("utm_campaign") || "";
      const utmContent = queryParams.get("utm_content") || "";
      const gclid = queryParams.get("gclid") || "";
      const referringDomain = document.referrer || "";

      // Recognized social networks
      const socialNetworks = [
        "facebook.com",
        "twitter.com",
        "linkedin.com",
        "instagram.com",
      ];

      // Determine the Tag value
      let Tag = "";

      // Organic social
      if (
        (utmMedium === "social" &&
          socialNetworks.some((network) =>
            referringDomain.includes(network)
          )) ||
        (utmMedium === "social" && socialNetworks.includes(utmSource))
      ) {
        Tag = "Organic social";
      }
      // Paid search
      else if (
        gclid || // Google Click ID is present
        utmSource.toLowerCase().includes("adword") ||
        utmSource.toLowerCase().includes("ppc") ||
        utmSource.toLowerCase().includes("cpc") ||
        (utmMedium.toLowerCase().includes("search") &&
          utmSource.toLowerCase().includes("google")) ||
        (utmSource === "google.com" && (utmMedium || utmCampaign))
      ) {
        Tag = "Paid search";
      }
      // Paid social
      else if (
        (utmMedium.toLowerCase().includes("paid") ||
          utmMedium.toLowerCase().includes("ppc") ||
          utmMedium.toLowerCase().includes("cpc")) &&
        socialNetworks.some(
          (network) =>
            utmSource === network || referringDomain.includes(network)
        )
      ) {
        Tag = "Paid social";
      }
      // Default Organic social for other social traffic
      else if (
        socialNetworks.some((network) => referringDomain.includes(network))
      ) {
        Tag = "Organic social";
      }

      localStorage.setItem("Tag", Tag);

      // API request
      const config = {
        url: "https://api.vijayhomeservicebengaluru.in/api/addnewenquiry",
        method: "post",
        headers: { "Content-Type": "application/json" },
        data: {
          mobile: mobilenumber,
          name: name,
          category: "Painting",
          city: capitalizedCity,
          date: moment().format("MM-DD-YYYY"),
          Time: moment().format("h:mm:ss a"),
          reference1: "website",
          reference2: localutm,
          reference5: localutmcampaign,
          reference4: localutmcontent,
          intrestedfor: serviceName,
          Tag: Tag, // Pass the computed Tag here
          amount: serviceamount,
        },
      };

      const response = await axios(config);

      if (response.status === 200) {
        setenquiryshow(false);
        addenquiryfollowup1(response.data.data);
        window.location.assign("/thankyou");
      } else {
        alert(`Unexpected response: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        alert(
          `Error: ${error.response.data.message || "Failed to add enquiry"}`
        );
      } else if (error.request) {
        alert("No response received. Please check your network connection.");
      } else {
        alert("An error occurred: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const addenquiryfollowup1 = async (edata) => {
    try {
      const config = {
        url: `/addenquiryfollowup`,
        method: "post",
        baseURL: "https://api.vijayhomeservicebengaluru.in/api",

        headers: { "content-type": "application/json" },
        data: {
          EnquiryId: edata?.EnquiryId,
          folldate: moment().format("llll"),
          response: "New",
          category: "Painting",
          city: capitalizedCity,
          nxtfoll: moment().format("YYYY-MM-DD"),
          type: "website",
        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          alert("Enquiry Followup Added Successfully");
        }
      });
    } catch (error) {
      console.error(error);

      alert("Failed to booking.Please try again later...");
    }
  };

  const calculatedPrices = useMemo(() => {
    return subcategoryData.map((data) => {
      const filteredPrices = data?.morepriceData?.filter(
        (ele) => ele.pricecity === capitalizedCity
      );

      const lowestPrice =
        filteredPrices?.length > 0
          ? Math.min(
              ...filteredPrices.map((ele) => parseFloat(ele.pofferprice))
            )
          : null;

      const highPrice =
        filteredPrices?.length > 0
          ? Math.max(...filteredPrices.map((ele) => parseFloat(ele.pPrice)))
          : null;

      return { ...data, lowestPrice, highPrice };
    });
  }, [subcategoryData, capitalizedCity]);

  const sendOTP = async () => {
    // Validate mobile number
    const isValidMobile = /^[6-9]\d{9}$/.test(mainContact);
    if (!isValidMobile) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    // if (!customername) {
    //   alert("Please enter a valid name.");
    //   return;
    // }

    // Extract UTM parameters
    const queryParams = new URLSearchParams(window.location.search);
    const utmSource = queryParams.get("utm_source") || "";
    const utmMedium = queryParams.get("utm_medium") || "";
    const utmCampaign = queryParams.get("utm_campaign") || "";
    const utmContent = queryParams.get("utm_content") || "";
    const gclid = queryParams.get("gclid") || "";
    const referringDomain = document.referrer || "";

    // Recognized social networks
    const socialNetworks = [
      "facebook.com",
      "twitter.com",
      "linkedin.com",
      "instagram.com",
    ];

    // Determine the Tag value
    let Tag = "";

    // Logic for setting Tag
    if (
      (utmMedium === "social" &&
        socialNetworks.some((network) => referringDomain.includes(network))) ||
      (utmMedium === "social" && socialNetworks.includes(utmSource))
    ) {
      Tag = "Organic social";
    } else if (
      gclid ||
      utmSource.toLowerCase().includes("adword") ||
      utmSource.toLowerCase().includes("ppc") ||
      utmSource.toLowerCase().includes("cpc") ||
      (utmMedium.toLowerCase().includes("search") &&
        utmSource.toLowerCase().includes("google")) ||
      (utmSource === "google.com" && (utmMedium || utmCampaign))
    ) {
      Tag = "Paid search";
    } else if (
      (utmMedium.toLowerCase().includes("paid") ||
        utmMedium.toLowerCase().includes("ppc") ||
        utmMedium.toLowerCase().includes("cpc")) &&
      socialNetworks.some(
        (network) => utmSource === network || referringDomain.includes(network)
      )
    ) {
      Tag = "Paid social";
    } else if (
      socialNetworks.some((network) => referringDomain.includes(network))
    ) {
      Tag = "Organic social";
    } else {
      console.warn("No Tag value identified for the current context.");
    }

    localStorage.setItem("Tag", Tag);

    // Send OTP
    try {
      const response = await axios.post(
        "https://api.vijayhomeservicebengaluru.in/api/sendotp/sendByCartBookweb",
        {
          mainContact: mainContact,
          // customerName: customername,
          reference1: localutm,
          reference2: localutmcampaign,
          reference3: localutmcontent,
          Tag: Tag,
        }
      );

      if (response.status === 200) {
        alert("Successful login");
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setShowLoginModal(false); // Close the modal
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      } else if (error.message) {
        alert(`Error: ${error.message}`);
      } else {
        alert("An unknown error occurred. Please try again.");
      }
      console.error("Error details:", error);
    }
  };

  return (
    <div>
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
          {Cat ? (
            <div>
              <NavbarCompo />
              <Homenavbar />
              <div className="container">
                <div className="row mb-4 justify-content-center">
                  <h1 className="poppins-semibold mt-4">
                    {capitalizeWords(subcategory)}
                  </h1>
                  {categorynewData.map((ele, index) => (
                    <div className="col-md-3 mt-3" key={index}>
                      <Link
                        to={{
                          pathname: generatePathname(ele.subcategory, city),
                        }}
                        onClick={() => setCat(false)}
                        className="text-decoration-none text-black"
                        style={{ cursor: "pointer" }}
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
                            className="img-fluid"
                            style={{
                              width: "150px",
                              height: "150px",
                              borderRadius: "10px",
                            }}
                          />
                        </div>
                        <div className="poppins-medium mt-3 text-center">
                          {ele.subcategory}
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
              <Footer />
            </div>
          ) : (
            <div>
              <NavbarCompo />
              <Cartnavbar />
              <div className="web-subcategory">
                <div className="container">
                  <div className="row">
                    <div className="col-md-6">
                      <div>
                        <h1
                          className="poppins-semibold s-heading"
                          style={{
                            color: "black",
                            fontWeight: "bold",
                            fontSize: "18px",
                            marginTop: "25px",
                          }}
                        >
                          {capitalizeWords(subcategory)}
                        </h1>
                      </div>
                      <div className="row" style={{}}>
                        {postsubdata
                          .sort((a, b) => parseInt(a.order) - parseInt(b.order))
                          .map((data, index) => (
                            <div
                              key={index}
                              className="col-md-4 mt-4 subcat-row text-center"
                              onClick={() => scrollToService(index)}
                              style={{ cursor: "pointer" }}
                            >
                              <img
                                style={{
                                  width: "90px",
                                  height: "90px",
                                  borderRadius: "10px",
                                }}
                                className="mb-2"
                                alt={`${data.subcategory} images`}
                                src={data.imglink}
                              />
                              <div
                                className="poppins-medium pb-2"
                                style={{
                                  color: "black",
                                  fontSize: "10px",
                                  fontWeight: "bold",
                                  textAlign: "center",
                                }}
                              >
                                {data.sub_subcategory}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="col-md-6 mt-1 sv-text">
                      {renderedVideos}
                    </div>
                  </div>
                </div>

                <div className="container mt-2">
                  <h2 className="poppins-semibold  v-text">{sub}</h2>
                  <div className="col-md-6 mt-3">
                    <div className="d-flex">
                      <div className="col-md-8 d-flex">
                        <div
                          className="poppins-regular "
                          style={{ color: "black", fontSize: "10px" }}
                        >
                          4.9
                        </div>
                        <div className="" style={{ marginTop: "-5px" }}>
                          <i
                            class="fa-solid fa-star"
                            style={{ color: "gold", fontSize: "7px" }}
                          ></i>
                          <i
                            class="fa-solid fa-star"
                            style={{ color: "gold", fontSize: "7px" }}
                          ></i>
                          <i
                            class="fa-solid fa-star"
                            style={{ color: "gold", fontSize: "7px" }}
                          ></i>
                          <i
                            class="fa-solid fa-star"
                            style={{ color: "gold", fontSize: "7px" }}
                          ></i>
                          <i
                            class="fa-solid fa-star"
                            style={{ color: "gold", fontSize: "7px" }}
                          ></i>
                        </div>
                        <div
                          className="poppins-regular"
                          style={{ color: "black", fontSize: "10px" }}
                        >
                          (9.1T)
                        </div>
                      </div>
                      <div className="col-md-4 mt-4 mx-4 callimg_row">
                        <div className="d-flex" style={{ marginTop: "-50px" }}>
                          <div>
                            <a
                              href="tel:8453748478"
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                              }}
                            >
                              <div
                                className="d-flex mt-2"
                                style={{ justifyContent: "center" }}
                              >
                                <img
                                  src={subcall}
                                  alt="loading....."
                                  style={{ width: "40px", height: "40px" }}
                                />
                              </div>
                            </a>
                          </div>

                          <div style={{ marginLeft: "40px" }}>
                            <a
                              // href="https://wa.me/919611600990?text=Hi%20I'm%20looking%20for%20the%20services%20from%20you,%20Please%20reach%20out%20to%20me%20soon"
                              // href={`https://wa.me/919611600990?text=Hi%20I'm%20looking%20for%20the%20services%20from%20you,%20Please%20reach%20out%20to%20me%20soon.%20${encodeURIComponent(
                              //   currentURL
                              // )}`}
                              href={`https://wa.me/919611600990?text=${encodeURIComponent(
                                `Hi, I'm looking for the services related to ${sub}. Please reach out to me soon. URL: ${currentURL}`
                              )}`}
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                              }}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <div
                                className="d-flex"
                                style={{ justifyContent: "center" }}
                              >
                                <img
                                  src={subweb}
                                  alt="loading....."
                                  style={{ width: "50px", height: "50px" }}
                                />
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row offerbannerdata_div mt-4">
                    {offerBannerdata.map((data) => (
                      <div className="col-md-3 mt-3">
                        <div
                          className="d-flex"
                          style={{
                            backgroundColor: "lightblue",
                            borderRadius: "5px",
                          }}
                        >
                          <div
                            className="col-md-2 mx-1"
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <img
                              height={20}
                              width={20}
                              alt=""
                              src={`https://api.vijayhomesuperadmin.in/offerbanner/${data.icon}`}
                            />
                          </div>
                          <div className="col-md-10 mt-3 p-2">
                            <div
                              className="poppins-regular"
                              style={{
                                color: "black",
                                fontWeight: "bold",
                                fontSize: "14px",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {data.header}
                            </div>
                            <p
                              className="poppins-regular mt-1"
                              style={{
                                color: "black",
                                fontSize: "11px",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {data.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div
                    className="row mt-2"
                    style={{ justifyContent: "space-between" }}
                  >
                    {calculatedPrices
                      .sort((a, b) => parseInt(a.order) - parseInt(b.order))
                      .map((data, index) => (
                        <div className="d-flex">
                          <div
                            key={index}
                            id={`service-${index}`}
                            className="col-md-6 mt-4"
                            style={{ borderBottom: "1px solid grey" }}
                          >
                            <div
                              className="poppins-regular"
                              style={{
                                backgroundColor: "#E6B45C",
                                padding: "10px",
                                color: "black",
                                fontWeight: "bold",
                                fontSize: "17px",
                                borderTopRightRadius: "50px",
                              }}
                            >
                              {data.servicetitle}
                            </div>
                            <div
                              className="poppins-regular mt-2"
                              style={{
                                color: "black",
                                fontSize: "15px",
                                fontWeight: "bold",
                              }}
                            >
                              {data.serviceName}
                            </div>
                            <div
                              className="poppins-regular"
                              style={{
                                color: "green",
                                fontSize: "12px",
                                fontWeight: "bold",
                              }}
                            >
                              {data.servicebelow}
                            </div>

                            <div className="d-flex mt-2">
                              <i
                                class="fa-solid fa-star"
                                style={{ color: "gold", fontSize: "14px" }}
                              ></i>
                              <div
                                className="poppins-regular mx-2"
                                style={{ color: "black", fontSize: "14px" }}
                              >
                                4.9
                              </div>
                              <div
                                className="poppins-regular"
                                style={{ color: "black", fontSize: "14px" }}
                              >
                                (328.8k)
                              </div>
                            </div>

                            <div className="d-flex mt-2">
                              {(() => {
                                // Filtered prices
                                const filteredPrices =
                                  data?.morepriceData?.filter(
                                    (ele) => ele.pricecity === capitalizedCity
                                  );

                                // high price
                                let highPrice = null;
                                if (filteredPrices.length > 0) {
                                  highPrice = filteredPrices.reduce(
                                    (minPrice, ele) =>
                                      Math.min(
                                        minPrice,
                                        parseFloat(ele.pPrice)
                                      ),
                                    parseFloat(filteredPrices[0].pPrice)
                                  );
                                }

                                // Lowest price
                                let lowestPrice = null;
                                if (filteredPrices.length > 0) {
                                  lowestPrice = filteredPrices.reduce(
                                    (minPrice, ele) =>
                                      Math.min(
                                        minPrice,
                                        parseFloat(ele.pofferprice)
                                      ),
                                    parseFloat(filteredPrices[0].pofferprice)
                                  );
                                }

                                return (
                                  <div className="d-flex">
                                    {highPrice !== null && (
                                      <div
                                        className="poppins-regular"
                                        style={{
                                          color: "black",
                                          fontSize: "14px",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        Start Price
                                      </div>
                                    )}
                                    <div
                                      className="poppins-regular mx-2"
                                      style={{
                                        color: "grey",
                                        fontWeight: "bold",
                                        fontSize: "14px",
                                      }}
                                    >
                                      {highPrice !== null && (
                                        <p
                                          className="poppins-regular"
                                          style={{
                                            textDecoration: "line-through",
                                          }}
                                        >
                                          {" "}
                                          ₹{highPrice}
                                        </p>
                                      )}
                                    </div>
                                    <div
                                      className="poppins-regular"
                                      style={{
                                        color: "black",
                                        fontWeight: "bold",
                                        fontSize: "14px",
                                      }}
                                    >
                                      {lowestPrice !== null && (
                                        <p className="poppins-regular">
                                          ₹{lowestPrice}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                );
                              })()}
                            </div>

                            <div className="row subwebview">
                              {data.serviceDesc
                                .slice(0, 3)
                                .map((desc, index) => (
                                  <div className="col-md-12" key={index}>
                                    <div className="d-flex mt-2">
                                      <div className="col-md-1">
                                        <i
                                          className="fa-solid fa-star"
                                          style={{
                                            color: "green",
                                            fontSize: "14px",
                                          }}
                                        ></i>
                                      </div>
                                      <div className="col-md-11">
                                        <div className="poppins-regular mt-1 service-desc">
                                          {desc.text}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                            </div>

                            <div className="row submobileview">
                              {data.serviceDesc
                                .slice(0, 1)
                                .map((desc, index) => (
                                  <div className="col-md-12" key={index}>
                                    <div className="d-flex mt-2">
                                      <div className="col-md-1">
                                        <i
                                          className="fa-solid fa-star"
                                          style={{
                                            color: "green",
                                            fontSize: "14px",
                                          }}
                                        ></i>
                                      </div>
                                      <div className="col-md-11">
                                        <div className="poppins-regular mt-1 service-desc">
                                          {desc.text}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                            </div>

                            <div className="d-flex">
                              <div className="col-md-3">
                                <Link
                                  to="/viewdetails"
                                  state={{
                                    subcategory: data,
                                    city: capitalizedCity,
                                  }}
                                  style={{ textDecoration: "none" }}
                                >
                                  <div
                                    className="poppins-regular mt-4 mb-3"
                                    style={{
                                      color: "darkred",
                                      fontSize: "14px",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    View details
                                  </div>
                                </Link>
                              </div>

                              <div className="col-md-3 mt-4 mb-3 ">
                                {data.category === "Painting" ? (
                                  // <div
                                  //   // onClick={handleenquiryShow}
                                  //   onClick={() => {
                                  //     setSelectedServiceName(data.serviceName);
                                  //     setserviceamount(data.lowestPrice);
                                  //     handleenquiryShow();
                                  //   }}
                                  //   className="poppins-regular mx-4"
                                  //   style={{
                                  //     color: "blue",
                                  //     fontSize: "14px",
                                  //     fontWeight: "bold",
                                  //     cursor: "pointer",
                                  //     backgroundColor: "darkred",
                                  //     color: "white",
                                  //     textAlign: "center",
                                  //     padding: "3px",
                                  //     borderRadius: "5px",
                                  //   }}
                                  // >
                                  //   Free Quote
                                  // </div>
                                  <></>
                                ) : (
                                  <div
                                    onClick={vhandleShow}
                                    className="poppins-regular mx-4"
                                    style={{
                                      color: "blue",
                                      fontSize: "14px",
                                      fontWeight: "bold",
                                      cursor: "pointer",
                                    }}
                                  >
                                    Show more
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 mt-4 mx-2 servicedata_row">
                            <div className="">
                              <img
                                className="mb-2 servicedata_img"
                                alt={`${data.category} images`}
                                src={data.imglink}
                              />
                              <div
                                className=""
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <div
                                  className="poppins-black"
                                  style={{
                                    color: "white",
                                    fontSize: "13px",
                                    backgroundColor: "darkred",
                                    textAlign: "center",

                                    padding: "4px",
                                    borderRadius: "10px",
                                    width: "50%",
                                    marginTop: "-25px",
                                    cursor: "pointer",
                                  }}
                                  // onClick={() => {
                                  //   if (data.category === "Painting") {
                                  //     setenquiryshow(true);
                                  //     setSelectedServiceName(data.serviceName);
                                  //     setserviceamount(data.lowestPrice);
                                  //   } else if (data.morepriceData.length > 0) {
                                  //     handleBook(data);
                                  //   } else {
                                  //     navigate("/ESpage", {
                                  //       state: { sdata: data, city: city },
                                  //     });
                                  //   }
                                  // }}
                                  onClick={() => {
                                    const user = localStorage.getItem("user");

                                    if (!user) {
                                      setShowLoginModal(true);
                                    } else {
                                      if (data.category === "Painting") {
                                        setenquiryshow(true);
                                        setSelectedServiceName(
                                          data.serviceName
                                        );
                                        setserviceamount(data.lowestPrice);
                                      } else if (
                                        data.morepriceData.length > 0
                                      ) {
                                        handleBook(data);
                                      } else {
                                        navigate("/ESpage", {
                                          state: { sdata: data, city: city },
                                        });
                                      }
                                    }
                                  }}
                                >
                                  {/* Add */}
                                  {data.category === "Painting"
                                    ? "Get Free Estimate"
                                    : "Add"}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>

                  <div
                    className="row mt-5 mb-5 "
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    {Bannermidledata.map((data) => (
                      <div
                        key={data._id}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          className="service_gif mb-2"
                          style={{
                            width: "50%",
                            height: "250px",
                          }}
                          alt=""
                          src={`https://api.vijayhomesuperadmin.in/spotlightSP/${data.img}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mobile-subcategory">
                <div className="">{renderedVideos}</div>
                <div
                  className=""
                  style={{ marginLeft: "10px", marginRight: "10px" }}
                >
                  <h2
                    className="poppins-semibold"
                    style={{ textAlign: "left" }}
                  >
                    {sub}
                  </h2>
                  <div className="row">
                    <div
                      className="col-6 d-flex"
                      style={{ alignItems: "center" }}
                    >
                      <div
                        className="poppins-regular "
                        style={{ color: "black", fontSize: "10px" }}
                      >
                        4.9
                      </div>
                      <div className="" style={{ marginTop: "-5px" }}>
                        <i
                          class="fa-solid fa-star"
                          style={{ color: "gold", fontSize: "14px" }}
                        ></i>
                        <i
                          class="fa-solid fa-star"
                          style={{ color: "gold", fontSize: "14px" }}
                        ></i>
                        <i
                          class="fa-solid fa-star"
                          style={{ color: "gold", fontSize: "14px" }}
                        ></i>
                        <i
                          class="fa-solid fa-star"
                          style={{ color: "gold", fontSize: "14px" }}
                        ></i>
                        <i
                          class="fa-solid fa-star"
                          style={{ color: "gold", fontSize: "14px" }}
                        ></i>
                      </div>
                      <div
                        className="poppins-regular"
                        style={{ color: "black", fontSize: "10px" }}
                      >
                        (9.1T)
                      </div>
                    </div>
                    <div
                      className="col-6 d-flex"
                      style={{ justifyContent: "end", gap: "40px" }}
                    >
                      <a
                        href="tel:8453748478"
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                        }}
                      >
                        <img
                          src={subcall}
                          alt="loading....."
                          className="callimg"
                        />
                      </a>

                      <a
                        // href="https://wa.me/919611600990?text=Hi%20I'm%20looking%20for%20the%20services%20from%20you,%20Please%20reach%20out%20to%20me%20soon"
                        // href={`https://wa.me/919611600990?text=Hi%20I'm%20looking%20for%20the%20services%20from%20you,%20Please%20reach%20out%20to%20me%20soon.%20${encodeURIComponent(
                        //   currentURL
                        // )}`}
                        href={`https://wa.me/919611600990?text=${encodeURIComponent(
                          `Hi, I'm looking for the services related to ${sub}. Please reach out to me soon. URL: ${currentURL}`
                        )}`}
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                        }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={subweb}
                          alt="loading....."
                          className="webimg"
                        />
                      </a>
                    </div>
                  </div>

                  <div className=" offerbannerdata_div1 mt-3">
                    <Swiper
                      slidesPerView={1}
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
                      {offerBannerdata.map((data, index) => (
                        <SwiperSlide key={data._id}>
                          <div
                            className="d-flex"
                            style={{
                              backgroundColor: "lightblue",
                              padding: "6px",
                              borderRadius: "5px",
                            }}
                          >
                            <div
                              className="col-md-1 mx-2"
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <img
                                style={{ width: "20px", height: "20px" }}
                                alt=""
                                src={`https://api.vijayhomesuperadmin.in/offerbanner/${data.icon}`}
                              />
                            </div>
                            <div className="col-md-11 pt-3 mx-3">
                              <div
                                className="poppins-regular"
                                style={{
                                  color: "black",
                                  fontWeight: "bold",
                                  fontSize: "14px",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {data.header}
                              </div>
                              <p
                                className="poppins-regular mt-1"
                                style={{
                                  color: "black",
                                  fontSize: "11px",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {data.desc}
                              </p>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>

                  <div className="row mt-4">
                    {postsubdata
                      .sort((a, b) => parseInt(a.order) - parseInt(b.order))
                      .map((data, index) => (
                        <div
                          key={index}
                          className="col-3 text-center"
                          // onClick={() => scrollToService1(index + 1)}
                          onClick={() => scrollToService(index)}
                          style={{ cursor: "pointer" }}
                        >
                          <img
                            style={{
                              width: "70px",
                              height: "70px",
                              borderRadius: "10px",
                            }}
                            className="mb-2"
                            alt={`${data.subcategory} images`}
                            src={data.imglink}
                          />
                          <div
                            className="poppins-light pb-2"
                            style={{
                              color: "black",

                              textAlign: "center",
                            }}
                          >
                            {data.sub_subcategory}
                          </div>
                        </div>
                      ))}
                  </div>

                  <div
                    className="row mt-2"
                    style={{ justifyContent: "space-between" }}
                  >
                    {calculatedPrices
                      .sort((a, b) => parseInt(a.order) - parseInt(b.order))
                      .map((data, index) => (
                        <div className="d-flex">
                          <div
                            key={index}
                            id={`service-${index}`}
                            className="col-md-6 mt-4"
                            style={{ borderBottom: "1px solid grey" }}
                          >
                            <div
                              className="poppins-regular"
                              style={{
                                backgroundColor: "#E6B45C",
                                padding: "10px",
                                color: "black",
                                fontWeight: "bold",
                                fontSize: "17px",
                                borderTopRightRadius: "50px",
                              }}
                            >
                              {data.servicetitle}
                            </div>
                            <div
                              className="poppins-regular mt-2"
                              style={{
                                color: "black",
                                fontSize: "15px",
                                fontWeight: "bold",
                              }}
                            >
                              {data.serviceName}
                            </div>
                            <div
                              className="poppins-regular"
                              style={{
                                color: "green",
                                fontSize: "12px",
                                fontWeight: "bold",
                              }}
                            >
                              {data.servicebelow}
                            </div>

                            <div className="d-flex mt-2">
                              <i
                                class="fa-solid fa-star"
                                style={{ color: "gold", fontSize: "14px" }}
                              ></i>
                              <div
                                className="poppins-regular mx-2"
                                style={{ color: "black", fontSize: "14px" }}
                              >
                                4.9
                              </div>
                              <div
                                className="poppins-regular"
                                style={{ color: "black", fontSize: "14px" }}
                              >
                                (328.8k)
                              </div>
                            </div>

                            <div className="d-flex mt-2">
                              {(() => {
                                // Filtered prices
                                const filteredPrices =
                                  data?.morepriceData?.filter(
                                    (ele) => ele.pricecity === capitalizedCity
                                  );

                                // high price
                                let highPrice = null;
                                if (filteredPrices.length > 0) {
                                  highPrice = filteredPrices.reduce(
                                    (minPrice, ele) =>
                                      Math.min(
                                        minPrice,
                                        parseFloat(ele.pPrice)
                                      ),
                                    parseFloat(filteredPrices[0].pPrice)
                                  );
                                }

                                // Lowest price
                                let lowestPrice = null;
                                if (filteredPrices.length > 0) {
                                  lowestPrice = filteredPrices.reduce(
                                    (minPrice, ele) =>
                                      Math.min(
                                        minPrice,
                                        parseFloat(ele.pofferprice)
                                      ),
                                    parseFloat(filteredPrices[0].pofferprice)
                                  );
                                }

                                return (
                                  <div className="d-flex">
                                    {highPrice !== null && (
                                      <div
                                        className="poppins-regular"
                                        style={{
                                          color: "black",
                                          fontSize: "14px",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        Start Price
                                      </div>
                                    )}
                                    <div
                                      className="poppins-regular mx-2"
                                      style={{
                                        color: "grey",
                                        fontWeight: "bold",
                                        fontSize: "14px",
                                      }}
                                    >
                                      {highPrice !== null && (
                                        <p
                                          className="poppins-regular"
                                          style={{
                                            textDecoration: "line-through",
                                          }}
                                        >
                                          {" "}
                                          ₹{highPrice}
                                        </p>
                                      )}
                                    </div>
                                    <div
                                      className="poppins-regular"
                                      style={{
                                        color: "black",
                                        fontWeight: "bold",
                                        fontSize: "14px",
                                      }}
                                    >
                                      {lowestPrice !== null && (
                                        <p className="poppins-regular">
                                          ₹{lowestPrice}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                );
                              })()}
                            </div>

                            <div className="row subwebview">
                              {data.serviceDesc
                                .slice(0, 3)
                                .map((desc, index) => (
                                  <div className="col-md-12" key={index}>
                                    <div className="d-flex mt-2">
                                      <div className="col-md-1">
                                        <i
                                          className="fa-solid fa-star"
                                          style={{
                                            color: "green",
                                            fontSize: "14px",
                                          }}
                                        ></i>
                                      </div>
                                      <div className="col-md-11">
                                        <div className="poppins-regular mt-1 service-desc">
                                          {desc.text}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                            </div>

                            <div className="row submobileview">
                              {data.serviceDesc
                                .slice(0, 1)
                                .map((desc, index) => (
                                  <div className="col-md-12" key={index}>
                                    <div className="d-flex mt-2">
                                      <div className="col-md-1">
                                        <i
                                          className="fa-solid fa-star"
                                          style={{
                                            color: "green",
                                            fontSize: "14px",
                                          }}
                                        ></i>
                                      </div>
                                      <div className="col-md-11">
                                        <div className="poppins-regular mt-1 service-desc">
                                          {desc.text}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                            </div>

                            <div className="d-flex">
                              <div className="col-md-3">
                                <Link
                                  to="/viewdetails"
                                  state={{
                                    subcategory: data,
                                    city: capitalizedCity,
                                  }}
                                  style={{ textDecoration: "none" }}
                                >
                                  <div
                                    className="poppins-regular mt-4 mb-3"
                                    style={{
                                      color: "darkred",
                                      fontSize: "14px",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    View details
                                  </div>
                                </Link>
                              </div>

                              <div className="col-md-3 mt-4 mb-3 ">
                                {data.category === "Painting" ? (
                                  // <div
                                  //   // onClick={handleenquiryShow}
                                  //   onClick={() => {
                                  //     setSelectedServiceName(data.serviceName); // Set the selected service name
                                  //     setserviceamount(data.lowestPrice);
                                  //     handleenquiryShow(); // Open the modal
                                  //   }}
                                  //   className="poppins-regular mx-4"
                                  //   style={{
                                  //     color: "blue",
                                  //     fontSize: "14px",
                                  //     fontWeight: "bold",
                                  //     cursor: "pointer",
                                  //     backgroundColor: "darkred",
                                  //     color: "white",
                                  //     textAlign: "center",
                                  //     padding: "3px",
                                  //     borderRadius: "5px",
                                  //   }}
                                  // >
                                  //   Free Quote
                                  // </div>
                                  <></>
                                ) : (
                                  <div
                                    onClick={vhandleShow}
                                    className="poppins-regular mx-4"
                                    style={{
                                      color: "blue",
                                      fontSize: "14px",
                                      fontWeight: "bold",
                                      cursor: "pointer",
                                    }}
                                  >
                                    Show more
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 mt-4 mx-2 servicedata_row">
                            <div className="">
                              <img
                                className="mb-2 servicedata_img"
                                alt={`${data.category} images`}
                                src={data.imglink}
                              />
                              <div
                                className=""
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <div
                                  className=""
                                  style={{
                                    color: "white",
                                    fontSize: "10px",
                                    backgroundColor: "darkred",
                                    textAlign: "center",
                                    padding: "4px",
                                    borderRadius: "10px",
                                    width: "50%",
                                    marginTop: "-25px",
                                    cursor: "pointer",
                                    fontWeight: "bold",
                                    // fontFamily: "poppins",
                                  }}
                                  // onClick={() => {
                                  //   if (data.morepriceData.length > 0) {
                                  //     handleBook(data);
                                  //   } else {
                                  //     navigate("/ESpage", {
                                  //       state: { sdata: data, city: city },
                                  //     });
                                  //   }
                                  // }}
                                  // onClick={() => {
                                  //   if (data.category === "Painting") {
                                  //     setenquiryshow(true);
                                  //     setSelectedServiceName(data.serviceName);
                                  //     setserviceamount(data.lowestPrice);
                                  //   } else if (data.morepriceData.length > 0) {
                                  //     handleBook(data);
                                  //   } else {
                                  //     navigate("/ESpage", {
                                  //       state: { sdata: data, city: city },
                                  //     });
                                  //   }
                                  // }}
                                  onClick={() => {
                                    const user = localStorage.getItem("user");

                                    if (!user) {
                                      setShowLoginModal(true);
                                    } else {
                                      if (data.category === "Painting") {
                                        setenquiryshow(true);
                                        setSelectedServiceName(
                                          data.serviceName
                                        );
                                        setserviceamount(data.lowestPrice);
                                      } else if (
                                        data.morepriceData.length > 0
                                      ) {
                                        handleBook(data);
                                      } else {
                                        navigate("/ESpage", {
                                          state: { sdata: data, city: city },
                                        });
                                      }
                                    }
                                  }}
                                >
                                  {/* Add */}
                                  {data.category === "Painting"
                                    ? "Get Free Estimate"
                                    : "Add"}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>

                  <div
                    className="row mt-5 mb-5"
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    {Bannermidledata.map((data) => (
                      <div
                        key={data._id}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          className="service_gif mb-5"
                          style={{
                            width: "50%",
                            height: "250px",
                          }}
                          alt=""
                          src={`https://api.vijayhomesuperadmin.in/spotlightSP/${data.img}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Footer />

              {/* POP UP */}

              <Modal centered size="lg" show={show} onHide={handleClose}>
                <Modal.Header>
                  <Modal.Title className="poppins-black">
                    Select Option
                  </Modal.Title>
                  <div onClick={handleClose}>
                    <i
                      class="fa-solid fa-xmark"
                      style={{
                        backgroundColor: "darkred",
                        padding: "5px 7px",
                        color: "white",
                        borderRadius: "50px",
                        // width: "25px",
                        textAlign: "center",
                        position: "absolute",
                        fontSize: "13px",
                        right: "20px",
                        right: "20px",
                        top: "14px",
                      }}
                    ></i>
                  </div>
                </Modal.Header>
                <Modal.Body>
                  <div className="row mt-2">
                    {(() => {
                      const filteredPrices =
                        selectedData?.morepriceData?.filter(
                          (ele) => ele.pricecity === capitalizedCity
                        );

                      return (
                        <>
                          {filteredPrices?.map((price, index) => (
                            <div
                              key={index}
                              // For small screens (mobile), we use col-sm-6 to show 2 items per row
                              className="col-md-3 col-sm-6 col-6 mt-3"
                              onClick={() => handleItemClick(price, index)}
                            >
                              <div
                                className={` mt-3 ${
                                  selectedItems[index]
                                    ? "active12"
                                    : "inactive12"
                                }`}
                              >
                                <div
                                  className=""
                                  style={{
                                    textAlign: "center",
                                    color: "green",
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {price.pName && (
                                    <p
                                      className="poppins-bold"
                                      style={{ color: "green" }}
                                    >
                                      {price.pName}
                                    </p>
                                  )}
                                </div>

                                <div
                                  className="d-flex"
                                  style={{ justifyContent: "center" }}
                                >
                                  <div
                                    className=""
                                    style={{
                                      color: "black",
                                      fontSize: "14px",
                                      textDecoration: "line-through",
                                      textAlign: "center",
                                    }}
                                  >
                                    {price.pPrice && (
                                      <p className="poppins-regular">
                                        ₹{price.pPrice}
                                      </p>
                                    )}
                                  </div>
                                  <div
                                    className="mx-2"
                                    style={{
                                      color: "black",
                                      fontSize: "14px",
                                      fontWeight: "bold",
                                      textAlign: "center",
                                    }}
                                  >
                                    {price.pofferprice && (
                                      <p className="poppins-medium">
                                        ₹{price.pofferprice}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </>
                      );
                    })()}
                  </div>

                  <div
                    className="poppins-medium"
                    style={{
                      backgroundColor: "rgb(224, 206, 85)",
                      padding: "5px",
                      textAlign: "center",
                      marginTop: "40px",
                    }}
                  >
                    Congratulations! {formattedDiscount} % Saved so far!
                  </div>
                  <div
                    className="d-flex"
                    style={{
                      backgroundColor: "darkred",
                      padding: "10px",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      className="col-md-3 poppins-extrabold"
                      style={{
                        color: "white",
                        fontSize: "15px",
                        fontWeight: "bold",
                      }}
                    >
                      Total ₹{TotalPrice}
                    </div>
                    <div
                      className="col-md-9 poppins-extrabold"
                      style={{
                        color: "white",
                        fontSize: "15px",
                        fontWeight: "bold",
                        textAlign: "end",
                      }}
                      onClick={handleChange}
                    >
                      View Cart
                    </div>
                  </div>
                </Modal.Body>
              </Modal>

              <Modal
                size="lg"
                className=""
                show={ModalSubcategoryView}
                onHide={handleCloseSubcategoryView}
              >
                <Modal.Header closeButton>
                  {SelectedCategory.map((Ele) => (
                    <Modal.Title className="container ">
                      {" "}
                      {Ele?.serviceName}
                    </Modal.Title>
                  ))}
                </Modal.Header>
                <Modal.Body className="bgclr">
                  {SelectedCategory?.map((servi, index) => {
                    return (
                      <>
                        <Link
                          to="/servicedetails"
                          state={{ subcategory: servi?.subcategory }}
                          key={servi.subcategory}
                          style={{ textDecoration: "none" }}
                          className="text-decoration-none  text-black"
                        >
                          {" "}
                          <div className="row  justify-content-center">
                            {servi.morepriceData.map((plan, innerindex) => (
                              <div className="col-md-3 m-3 shadow-lg bg-white p-2 brdrd   mb-2 ">
                                <div className="row  m-auto">
                                  <p className="col-md-12 p-4 clrstr2  text-white shadow-sm ">
                                    {plan.pName}
                                  </p>
                                </div>
                                <p className="row">
                                  <span>
                                    {" "}
                                    <StarIcon className="clrstr" /> 7k + Reviews
                                  </span>{" "}
                                </p>
                                <div className="row mt-5 p-1">
                                  <span className="col-md-6 m-auto   price fntbold">
                                    Rs. {plan?.pPrice}
                                  </span>
                                  <span className="col-md-6 m-auto  fntbold  clrstr">
                                    Rs. {plan?.pofferprice}
                                  </span>
                                </div>
                                <div className="row">
                                  <button
                                    onClick={(e) =>
                                      handleAdd(e, plan._id, innerindex)
                                    }
                                    className="col-md-6 m-auto  fntbold text-center p-1  fnts btn_clr   "
                                  >
                                    {Added || innerindex !== SelectedIndex ? (
                                      <>
                                        <span>
                                          <AddIcon
                                            style={{ fontSize: "14px" }}
                                          />{" "}
                                        </span>
                                        <span>Add </span>
                                      </>
                                    ) : (
                                      <>
                                        <span>
                                          {" "}
                                          <CheckIcon
                                            style={{ fontSize: "14px" }}
                                          />{" "}
                                        </span>
                                        <span>Added </span>
                                      </>
                                    )}
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </Link>
                        <div className="container redbrdr  mt-3 shadow-sm acordinss p-3">
                          <div key={index} className="row  m-2">
                            {servi?.serviceIncludes?.length > 0 && (
                              <p
                                className={`m-auto col-md-6 accordion ${
                                  catType === "includes" && activeIndex2 === 0
                                    ? "active"
                                    : ""
                                }`}
                                onClick={(e) =>
                                  toggleAccordion1(e, "includes", 0)
                                }
                              >
                                <p
                                  className="accordion__title clrpr"
                                  style={{
                                    fontWeight: "bold",
                                    padding: "16px 0px 0px 6px",
                                  }}
                                >
                                  Includes
                                </p>
                              </p>
                            )}
                            {servi?.serviceExcludes?.length > 0 && (
                              <p
                                className={`m-auto col-md-6 accordion ${
                                  catType === "excludes" && activeIndex2 === 1
                                    ? "active"
                                    : ""
                                }`}
                                onClick={(e) =>
                                  toggleAccordion1(e, "excludes", 1)
                                }
                              >
                                <p
                                  className="accordion__title clrpr"
                                  style={{
                                    fontWeight: "bold",
                                    padding: "16px 0px 0px 6px",
                                  }}
                                >
                                  Excludes
                                </p>
                              </p>
                            )}

                            <div className="row ">
                              {catType === "includes" && activeIndex2 === 0 && (
                                <div
                                  style={{
                                    maxHeight: `${
                                      activeIndex ? "1000px" : "0px"
                                    }`,
                                  }}
                                  className="accordion__content"
                                >
                                  {servi.serviceIncludes.map(
                                    (dos, dosIndex) => (
                                      <div
                                        key={dosIndex}
                                        className="accordion__text clrpr"
                                      >
                                        <li>{dos.text}</li>
                                      </div>
                                    )
                                  )}
                                </div>
                              )}
                              {catType === "excludes" && activeIndex2 === 1 && (
                                <div
                                  style={{
                                    maxHeight: `${
                                      activeIndex ? "1000px" : "0px"
                                    }`,
                                  }}
                                  className="accordion__content"
                                >
                                  {servi?.serviceExcludes?.map(
                                    (dos, dosIndex) => (
                                      <div
                                        key={dosIndex}
                                        className="accordion__text clrpr"
                                      >
                                        <li>{dos.text}</li>
                                      </div>
                                    )
                                  )}
                                </div>
                              )}{" "}
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </Modal.Body>
                <Modal.Footer className="container ">
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
                size="lg"
                show={OpenViewCartModal}
                onHide={handleCloseCart}
              >
                <Modal.Header closeButton>
                  <h1 className=" clrstr fnt">Cart</h1>
                </Modal.Header>
                <Modal.Body>
                  {SelectedService.map((price) => {
                    return (
                      <div className="row p-4">
                        <span className="col-md-4 col-md-4 fs-5 m-auto  fntbold  ">
                          {price.pName}
                        </span>

                        <Button
                          variant="secondary"
                          className="col-md-2 m-auto  p-0"
                        >
                          <span
                            onClick={() => {
                              if (Quantity > 1) {
                                setQuantity(Quantity - 1);
                              }
                            }}
                            className="me-2 fs-5 p-0"
                          >
                            -
                          </span>
                          <span className="me-2 ms-2 fs-5 p-0">
                            {Quantity}{" "}
                          </span>
                          <span
                            className="ms-2 fs-5 p-0"
                            onClick={() => setQuantity(Quantity + 1)}
                          >
                            +
                          </span>
                        </Button>
                        <span className="col-md-2"></span>
                        <span span className="col-md-2 m-auto  ">
                          <span className="fs-3 fntbold  clrstr">
                            Rs.{price.pofferprice}
                          </span>
                        </span>
                      </div>
                    );
                  })}
                </Modal.Body>
                <Modal.Footer className="container p-3 ">
                  {serviceData.flatMap((service) =>
                    service.morepriceData
                      .filter((plan) => plan._id === SelectService)

                      .map((price) => (
                        <Button
                          className="col-md-10 m-auto clrstrs"
                          onClick={() => {
                            // e.preventDefault();
                            setOpenViewCartModal(false);
                          }}
                        >
                          {" "}
                          <Link
                            to="/ViewCart"
                            state={{
                              ServiceIDD: service._id,
                              PriceID: price._id,
                              NumberOfQunt: Quantity,
                            }}
                            style={{
                              textDecoration: "none",
                              color: "white",
                              border: "none",
                            }}
                          >
                            <p className="row p-1 m-auto">
                              <span className="col-md-6 m-auto p-0">
                                View Cart
                              </span>
                              <span className="col-md-6 m-auto p-0">
                                {" "}
                                Rs.{price.pofferprice}
                              </span>
                            </p>
                          </Link>
                        </Button>
                      ))
                  )}
                </Modal.Footer>
              </Modal>

              {/* V Modal */}
              <Modal
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={vshow}
                onHide={vhandleClose}
                animation={false}
                scrollable
              >
                <Modal.Body style={{ maxHeight: "80vh", overflowY: "auto" }}>
                  {modalbanner.map((data) => (
                    <div key={data._id}>
                      <img
                        src={data.image}
                        alt="vhs"
                        style={{
                          width: "100%",
                          height: "150px",
                          borderRadius: "5px",
                        }}
                      />
                    </div>
                  ))}

                  <div className="poppins-black mt-2 mb-2"> Why choose us</div>
                  <div>
                    <Swiper
                      slidesPerView={3}
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
                      {whychooseus.map((data, index) => (
                        <SwiperSlide
                          key={data._id}
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
                                src={data.image}
                                alt="loading...."
                                style={{
                                  width: "50px",
                                  height: "50px",
                                }}
                              />
                            </div>
                            <div
                              className="poppins-thin mt-2"
                              style={{ textAlign: "center" }}
                            >
                              {data.title}
                            </div>
                            <div
                              className="poppins-extralight"
                              style={{ textAlign: "center" }}
                            >
                              {data.discription}
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>

                  <div className="poppins-black mt-2 mb-2"> VHS Promise</div>

                  <div>
                    <Swiper
                      slidesPerView={3}
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
                      {vhspromise.map((data, index) => (
                        <SwiperSlide
                          key={data._id}
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
                                src={data.image}
                                alt="loading...."
                                style={{
                                  width: "50px",
                                  height: "50px",
                                }}
                              />
                            </div>
                            <div
                              className="poppins-thin mt-2"
                              style={{ textAlign: "center" }}
                            >
                              {data.title}
                            </div>
                            <div
                              className="poppins-extralight"
                              style={{ textAlign: "center" }}
                            >
                              {data.discription}
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>

                  <div className="poppins-black mt-2 mb-2">Comparison </div>
                  {allcamparison.map((data) => (
                    <div key={data._id}>
                      <img
                        src={data.image}
                        alt="vhs"
                        style={{ width: "100%", height: "auto" }}
                      />
                    </div>
                  ))}

                  <div className="poppins-black mt-2 mb-2"> Review</div>

                  <div>
                    <Swiper
                      slidesPerView={2}
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
                      {review.map((data, index) => (
                        <SwiperSlide
                          key={data._id}
                          className="shadow"
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
                          <div
                            className="col-md-4"
                            style={{
                              width: "100%",
                              alignItems: "center",
                              justifyContent: "center",
                              border: "1px solid darkred",
                              padding: "8px 8px",
                              borderRadius: "5px",
                            }}
                          >
                            <div
                              className="poppins-black"
                              style={{ textAlign: "justify" }}
                            >
                              {data.title}
                            </div>
                            <div
                              className="poppins-thin mt-1"
                              style={{
                                textAlign: "justify",
                                color: "darkred",
                                fontSize: "13px",
                              }}
                            >
                              {data.category}
                            </div>

                            <div
                              className="poppins-extralight mt-2"
                              style={{
                                textAlign: "justify",
                                color: "black",
                                fontSize: "13px",
                              }}
                            >
                              {data.discription}
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>

                  <div className="poppins-black mt-3">FAQ</div>
                  <div>
                    <Faq
                      data={transformedFaqData}
                      styles={styles}
                      // config={config}
                    />
                  </div>
                </Modal.Body>
              </Modal>

              {/* Enquiry Moda1 */}

              <Modal show={enquiryshow} centered onHide={handleenquiryClose}>
                <Modal.Header>
                  <Modal.Title className="poppins-black">
                    Add Enquiry
                  </Modal.Title>
                  <i
                    onClick={handleenquiryClose}
                    className="fa-solid fa-x shadow"
                    style={{
                      fontSize: "14px",
                      backgroundColor: "red",
                      color: "white",
                      padding: "9px 11px",
                      borderRadius: "50px",
                      cursor: "pointer",
                      position: "absolute",
                      right: "20px",
                    }}
                  ></i>
                </Modal.Header>
                <Modal.Body>
                  <div className="mt-2">
                    <div className="poppins-light">Name</div>
                    <input
                      type="text"
                      className="input col-md-12 mt-2 vhs-input-value"
                      onChange={(e) => setname(e.target.value)}
                    />
                  </div>

                  <div className="">
                    <div className="poppins-light">Mobile Number</div>
                    <input
                      type="tel"
                      className="input col-md-12 mt-2 vhs-input-value"
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*$/.test(value)) {
                          setmobilenumber(value);
                        }
                      }}
                    />
                  </div>

                  <div
                    // onClick={addsurvey}
                    onClick={(e) =>
                      addsurvey(e, selectedServiceName, serviceamount)
                    }
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
                    {!loading ? "Submit" : "Loading..."}
                    {/* Submit */}
                  </div>
                </Modal.Body>
              </Modal>

              {/* Login Modal */}

              <Modal
                show={showLoginModal}
                centered
                onHide={() => setShowLoginModal(false)} // Close modal
                style={{ borderRadius: "10px" }}
              >
                <Modal.Body
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "30px",
                  }}
                >
                  <div style={{ width: "100%", maxWidth: "400px" }}>
                    <div
                      className="poppins-light"
                      style={{
                        marginBottom: "10px",
                        fontSize: "16px",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      Enter mobile number to continue
                    </div>
                    {/* <input
                      type="text"
                      value={customername}
                      onChange={(e) => setcustomername(e.target.value)}
                      placeholder="Enter Name"
                      style={{
                        border: "1px solid grey",
                        height: "45px",
                        width: "100%",
                        marginTop: "15px",
                      }}
                    /> */}

                    <input
                      type="text"
                      value={mainContact}
                      onChange={(e) => setmainContact(e.target.value)}
                      placeholder="Enter Mobile Number"
                      style={{
                        border: "1px solid grey",
                        height: "45px",
                        width: "100%",
                      }}
                    />
                    <div
                      onClick={sendOTP}
                      style={{
                        backgroundColor: "#ff465e",
                        color: "white",
                        textAlign: "center",
                        padding: "10px",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      {loading ? "Loading...." : "Continue"}
                    </div>
                    <div
                      style={{
                        textAlign: "center",
                        marginTop: "20px",
                        fontSize: "14px",
                        color: "#999",
                      }}
                    >
                      Why to choose{" "}
                      <span
                        className="poppins-regular"
                        style={{ color: "darkred" }}
                      >
                        Our Services?
                      </span>
                      <ul
                        style={{
                          listStyle: "none",
                          padding: 0,
                          marginTop: "10px",
                        }}
                      >
                        <li
                          style={{
                            marginBottom: "5px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <i
                            className="fa fa-check-circle"
                            style={{ color: "green", marginRight: "5px" }}
                          ></i>
                          Lowest Price Guaranteed
                        </li>
                        <li
                          style={{
                            marginBottom: "5px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <i
                            className="fa fa-check-circle"
                            style={{ color: "green", marginRight: "5px" }}
                          ></i>
                          Free Reschedule
                        </li>
                        <li
                          style={{
                            marginBottom: "5px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <i
                            className="fa fa-check-circle"
                            style={{ color: "green", marginRight: "5px" }}
                          ></i>
                          5 Star Rated Partners
                        </li>
                        <li
                          style={{
                            marginBottom: "5px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <i
                            className="fa fa-check-circle"
                            style={{ color: "green", marginRight: "5px" }}
                          ></i>
                          Dedicated Customer Support
                        </li>
                      </ul>
                    </div>
                    {/* <div
                      className="poppins-regular"
                      style={{
                        textAlign: "center",
                        fontSize: "12px",
                        color: "#999",
                        marginTop: "10px",
                      }}
                    >
                      By continuing, you agree to our{" "}
                      <a
                        href="/terms-and-condition"
                        className="poppins-regular"
                        style={{ color: "blue" }}
                      >
                        Terms & Conditions
                      </a>
                      and agree to updates on{" "}
                      <span
                        className="poppins-regular"
                        style={{ color: "green" }}
                      >
                        WhatsApp
                      </span>
                      .
                    </div> */}
                  </div>
                </Modal.Body>
              </Modal>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Subcategory;
