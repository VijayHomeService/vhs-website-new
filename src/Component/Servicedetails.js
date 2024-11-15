import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import NabarCompo from "./navbar";
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

function Servicedetails() {
  // const { subcategory, data } = location.state || {};
  const { subcategory } = useParams();
  console.log("service", subcategory);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [show, setShow] = useState(false);
  const MyCartItmes = useSelector((state) => state.cart);
  const handleClose = () => setShow(false);
  const dispatch = useDispatch();
  const [serviceData, setserviceData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [Item, setItem] = useState([]);
  const [City, setCity] = useState(null);
  const [OpenViewCartModal, setOpenViewCartModal] = useState(false);
  const [DefaultPrice, setDefaultPrice] = useState(null);
  const [ServiceID, setServiceID] = useState(null);
  const [subcategoryVideo, setsubcategoryVideo] = useState([]);
  const [ModalSubcategoryView, setModalSubcategoryView] = useState(false);
  const [SelectService, setSelectService] = useState(null);
  const [SelectedCategory, setSelectedCategory] = useState([]);
  const [Added, setAdded] = useState(true);
  const [SelectedIndex, setSelectedIndex] = useState(null);
  const [Quantity, setQuantity] = useState(1);
  const [offerBannerdata, setofferBannerdata] = useState([]);
  const [postsubdata, setpostsubdata] = useState([]);
  const [Servicedata, setServicedata] = useState([]);
  const [vshow, setvShow] = useState(false);
  const [modalbanner, setmodalbanner] = useState([]);
  const [allcategory, setallcategory] = useState([]);
  const [vhspromise, setvhspromise] = useState([]);
  const [whychooseus, setwhychooseus] = useState([]);
  const [allcamparison, setallcamparison] = useState([]);
  const [faq, setfaq] = useState([]);
  const [review, setreview] = useState([]);
  const [sub, setSub] = useState("");
  const [allSubcat, setAllSubcat] = useState([]);
  const [data, setData] = useState([]);
  const [subcategoryData, setSubcategoryData] = useState([]);
  const vhandleClose = () => setvShow(false);
  const vhandleShow = () => setvShow(true);

  console.log("data---", data);

  const transformedFaqData = {
    rows: faq.map((f) => ({
      title: <div className="poppins-black">{f.question}</div>,
      content: <div className="poppins-regular">{f.answer}</div>,
    })),
  };

  const styles = {
    titleTextColor: "darkred",
    rowTitleColor: "darkred",
  };

  console.log("data", data);

  const localstoragecitys = localStorage.getItem("city");

  const [Bannermidledata, setBannermidledata] = useState([]);

  useEffect(() => {
    getSubcategories();
  }, [allSubcat]);

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

  console.log("city", City);

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

  useEffect(() => {
    if (subcategory && allSubcat.length > 0) {
      const parts = subcategory.split("-");
      const category1 = capitalizeFirstLetter(parts[0]);

      const fullServiceName = allSubcat?.find((service) =>
        service?.subcategory.toLowerCase().includes(category1.toLowerCase())
      );
      console.log("fullServiceName", fullServiceName);
      if (fullServiceName) {
        const city = parts.slice(3).join("-");
        setCity(city);
        setSub(fullServiceName.subcategory);
        getSubcategory(fullServiceName.subcategory);
        setData(fullServiceName);
      } else {
        console.error("Service not found");
      }
    }
  }, [subcategory, allSubcat]);

  const capitalizedCity = capitalizeFirstLetter1(City);
  console.log("capitalizedCity", capitalizedCity);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    getmodalbanner();
  }, [modalbanner]);

  const getmodalbanner = async () => {
    let res = await axios.get(
      "https://api.vijayhomeservice.com/api/pbanner/getallpopupbanner"
    );
    if ((res.status = 200)) {
      setmodalbanner(
        res.data?.data.filter((i) => i?.category === data?.category)
      );
    }
  };

  useEffect(() => {
    getreview();
  }, [review]);

  const getreview = async () => {
    let res = await axios.get(
      "https://api.vijayhomeservice.com/api/review/getallvhsreview"
    );
    if ((res.status = 200)) {
      setreview(res.data?.data.filter((i) => i?.category === data?.category));
    }
  };

  useEffect(() => {
    getallfaq();
  }, []);

  const getallfaq = async () => {
    let res = await axios.get(
      "https://api.vijayhomeservice.com/api/faq/getallvhsfaq"
    );
    if ((res.status = 200)) {
      setfaq(res.data?.data.filter((i) => i?.category === data?.category));
    }
  };

  useEffect(() => {
    getallcomparison();
  }, []);

  const getallcomparison = async () => {
    let res = await axios.get(
      "https://api.vijayhomeservice.com/api/comparison/getallvhscomparison"
    );
    if ((res.status = 200)) {
      setallcamparison(
        res.data?.data.filter((i) => i?.category === data?.category)
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

  useEffect(() => {
    getsubcategoryVideo();
    getCity();
  }, []);

  useEffect(() => {
    getSubcategory();
  }, [subcategoryData]);

  const getSubcategory = async () => {
    try {
      const res = await axios.post(
        `https://api.vijayhomesuperadmin.in/api/userapp/postsubcatservice`,
        { Subcategory: sub }
      );
      if (res.status === 200) {
        setSubcategoryData(res.data.subcatdata);
      }
    } catch (err) {
      console.log(err);
    }
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

  useEffect(() => {
    getsubcategory();
  }, [postsubdata]);

  const getsubcategory = async () => {
    let res = await axios.post(
      `https://api.vijayhomesuperadmin.in/api/userapp/postappresubcat/`,
      {
        subcategory: sub,
      }
    );

    if ((res.status = 200)) {
      setpostsubdata(res.data?.subcategory);
    }
  };

  useEffect(() => {
    getservicemanagement1();
  }, []);

  const getservicemanagement1 = async () => {
    try {
      const res = await axios.post(
        `https://api.vijayhomesuperadmin.in/api/userapp/postsubcatservice/`,
        {
          Subcategory: sub,
        }
      );
      if (res.status === 200) {
        setServicedata(res.data?.subcatdata);
      } else {
        console.error("Error fetching services: Status code not 200");
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
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

  console.log("offerbanner", offerBannerdata);

  const getCity = async () => {
    try {
      let res = await axios.get(
        "https://api.vijayhomesuperadmin.in/api/master/getcity"
      );
      if (res.status === 200) {
        setCity(res?.data?.mastercity);
      }
    } catch (er) {
      console.log(er, "err while fetching data");
    }
  };

  useEffect(() => {
    if (serviceData?.length > 0) {
      const allServiceIDs = serviceData.map((service) => service._id);

      if (allServiceIDs?.length > 0) {
        const defaultPrice = serviceData.map((ele) => ele.morepriceData[0]);
        setDefaultPrice(defaultPrice);
      }

      setServiceID(allServiceIDs);
    }
  }, [serviceData]);

  const handleAdd = (e, data, index) => {
    e.preventDefault();
    setSelectedIndex(index);
    setSelectService(data);
    setAdded(false);
    setModalSubcategoryView(false);
    setOpenViewCartModal(true);
    setAdded(true);
  };

  const getsubcategoryVideo = async () => {
    try {
      setIsLoading(true);

      let res = await axios.get(
        "https://api.vijayhomesuperadmin.in/api/userapp/getappsubcat"
      );
      if ((res.status = 200)) {
        let subcategorys = sub?.toLowerCase();
        let filteredData = res?.data?.subcategory?.filter((Ele) => {
          let videoLink = Ele?.subcategory?.toLowerCase();

          return subcategorys?.includes(videoLink);
        });

        setsubcategoryVideo(filteredData);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

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

  const handleCloseCart = () => {
    // e.preventDefault();
    setOpenViewCartModal(false);
  };

  let SelectedService = serviceData
    .map((serivice) =>
      serivice.morepriceData.filter((paln) => paln._id === SelectService)
    )
    .flatMap((cart) => cart);

  const [selectedData, setSelectedData] = useState([]);

  const handleBook = (data) => {
    setSelectedData(data);
    setShow(true);
  };

  const [selectedItems, setSelectedItems] = useState([]);

  const TotalPrice = MyCartItmes.reduce(
    (acc, cur) => acc + Number(cur.offerprice) * cur.qty, // Calculate total price considering quantity
    0
  );

  const navigate = useNavigate();

  const handleViewCartClick = () => {
    navigate("/cart");
  };

  const handleItemClick = (item, index) => {
    setSelectedItemIndex(index);
    setItem(selectedData);
    const Item = selectedData;
    const itemToAdd = {
      _id: item._id,
      category: data?.subcategory,
      service: Item,
      pName: item.pName,
      pPrice: item.pPrice,
      pofferprice: item.pofferprice,
      pservices: item.pservices,
    };

    if (!item.pservices) {
      const existingCartItem = MyCartItmes.find(
        (cartItem) => cartItem.category === data?.subcategory
      );

      if (existingCartItem) {
        dispatch(addToCart({ ...itemToAdd, id: existingCartItem.id }));
      } else {
        dispatch(clearCart());
        dispatch(addToCart(itemToAdd));
      }
    } else {
      // alert("This is AMC services ")
      navigate("/summary", { state: { plan: item, sdata: selectedData } });
      console.log("amc service", selectedData);
    }

    setSelectedItems((prevSelectedItems) => {
      const updatedSelectedItems = [...prevSelectedItems];
      updatedSelectedItems[index] = !updatedSelectedItems[index];
      return updatedSelectedItems;
    });
  };

  const scrollToService = (index) => {
    const section = document.getElementById(`service-${index}`);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {isLoading ? (
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
      ) : (
        <>
          <Header1 />
          <Cartnavbar />
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div>
                  <h1 className="poppins-semibold s-heading">
                    {" "}
                    {capitalizeWords(subcategory)}
                  </h1>
                </div>
                <div className="row" style={{}}>
                  {postsubdata
                    .sort((a, b) => parseInt(a.order) - parseInt(b.order))
                    .map((data, index) => (
                      <div
                        key={index}
                        className="col-md-4 subcat-row text-center"
                        onClick={() => scrollToService(index + 1)}
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
                {subcategoryVideo &&
                  subcategoryVideo.map((Ele) => {
                    return (
                      <ReactPlayer
                        url={Ele.videolink}
                        playing={true}
                        loop={true}
                        width={"100%"}
                        className="react-player-rounded"
                        height="250px"
                      />
                    );
                  })}
              </div>
            </div>
          </div>

          <div className="container mt-3">
            <h1 className="poppins-semibold v-text">{data?.subcategory}</h1>
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
                <div className="col-md-4 mx-4 callimg_row">
                  <div className="d-flex" style={{ marginTop: "-50px" }}>
                    <div>
                      <a
                        href="tel:+918453748478"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <div
                          className="d-flex"
                          style={{ justifyContent: "center" }}
                        >
                          <img
                            src={call}
                            alt="loading....."
                            className="callimg"
                          />
                        </div>

                        <div
                          className="poppins-regular shadow-lg"
                          style={{
                            backgroundColor: "white",
                            padding: "3px 8px",
                            marginTop: "-11px",
                            borderRadius: "5px",
                            fontSize: "6px",
                          }}
                        >
                          Call Now
                        </div>
                      </a>
                    </div>

                    <div style={{ marginLeft: "40px" }}>
                      <a
                        href="https://wa.me/919611600990?text=Hi%20I'm%20looking%20for%20the%20services%20from%20you,%20Please%20reach%20out%20to%20me%20soon"
                        style={{ textDecoration: "none", color: "inherit" }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div
                          className="d-flex"
                          style={{ justifyContent: "center" }}
                        >
                          <img
                            src={web}
                            alt="loading....."
                            className="webimg"
                          />
                        </div>
                        <div
                          className="poppins-regular shadow-lg"
                          style={{
                            backgroundColor: "white",
                            padding: "3px 8px",
                            marginTop: "-11px",
                            borderRadius: "5px",
                            fontSize: "6px",
                          }}
                        >
                          Wtsup us
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
                    style={{ backgroundColor: "darkred", borderRadius: "5px" }}
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
                    <div className="col-md-10 mt-3 mx-1">
                      <div
                        className="poppins-regular"
                        style={{
                          color: "white",
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
                          color: "white",
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
            <div className=" offerbannerdata_div1 mt-4">
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
                        backgroundColor: "darkred",
                        padding: "6px",
                        borderRadius: "5px",
                      }}
                    >
                      <div
                        className="col-md-1"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <img
                          style={{ width: "20px", height: "20px" }}
                          alt=""
                          src={`https://api.vijayhomesuperadmin.in/offerbanner/${data.icon}`}
                        />
                      </div>
                      <div className="col-md-11 pt-3 mx-2">
                        <div
                          className="poppins-regular"
                          style={{
                            color: "white",
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
                            color: "white",
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

            <div
              className="row mt-2"
              style={{ justifyContent: "space-between" }}
            >
              {subcategoryData
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
                          style={{ color: "gold" }}
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
                          const filteredPrices = data?.morepriceData?.filter(
                            (ele) => ele.pricecity === capitalizedCity
                          );

                          console.log("filteredPrices12334===", filteredPrices);

                          // high price
                          let highPrice = null;
                          if (filteredPrices.length > 0) {
                            highPrice = filteredPrices.reduce(
                              (minPrice, ele) =>
                                Math.min(minPrice, parseFloat(ele.pPrice)),
                              parseFloat(filteredPrices[0].pPrice)
                            );
                          }

                          // Lowest price
                          let lowestPrice = null;
                          if (filteredPrices.length > 0) {
                            lowestPrice = filteredPrices.reduce(
                              (minPrice, ele) =>
                                Math.min(minPrice, parseFloat(ele.pofferprice)),
                              parseFloat(filteredPrices[0].pofferprice)
                            );
                          }

                          // Render JSX
                          return (
                            <>
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
                              <div
                                className="poppins-regular mx-2"
                                style={{
                                  color: "grey",
                                  fontWeight: "bold",
                                  fontSize: "14px",
                                  textDecoration: "line-through",
                                }}
                              >
                                {highPrice !== null && (
                                  <p className="poppins-regular">
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
                                {filteredPrices.length === 0 && (
                                  <p className="poppins-regular">
                                    No prices available for this city
                                  </p>
                                )}
                              </div>
                            </>
                          );
                        })()}
                      </div>

                      <div className="row">
                        {data.serviceDesc.slice(0, 3).map((desc, index) => (
                          <div className="col-md-12" key={index}>
                            <div className="d-flex mt-2">
                              <div className="col-md-1">
                                <i
                                  className="fa-solid fa-star"
                                  style={{ color: "green", fontSize: "14px" }}
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
                            state={{ subcategory: data }}
                            style={{ textDecoration: "none" }}
                          >
                            <div
                              className="poppins-regular mt-4 mb-3"
                              style={{
                                color: "darkred",
                                fontSize: "17px",
                                fontWeight: "bold",
                              }}
                            >
                              View details
                            </div>
                          </Link>
                        </div>
                        <div className="col-md-3 mt-4 mb-3 ">
                          <div
                            onClick={vhandleShow}
                            className="poppins-regular mx-2"
                            style={{
                              color: "blue",
                              fontSize: "17px",
                              fontWeight: "bold",
                              cursor: "pointer",
                            }}
                          >
                            Show more
                          </div>
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
                          // onClick={handleShow}
                          className=""
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            // marginRight: "30px",
                            // marginTop: "-20px",
                          }}
                        >
                          <div
                            className="poppins-black"
                            style={{
                              color: "white",
                              fontSize: "13px",
                              backgroundColor: "darkred",
                              textAlign: "center",
                              // width: "80px",
                              padding: "4px",
                              borderRadius: "10px",
                              width: "50%",
                              marginTop: "-25px",
                            }}
                            // onClick={() => handleBook(data)}
                            onClick={() => {
                              if (data.morepriceData.length > 0) {
                                handleBook(data);
                              } else {
                                // window.location.assign("/Espage");
                                navigate("/ESpage", { state: { sdata: data } });
                              }
                            }}
                          >
                            Book
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
                    style={
                      {
                        // width: "50%",
                        // height: "250px",
                      }
                    }
                    alt=""
                    src={`https://api.vijayhomesuperadmin.in/spotlightSP/${data.img}`}
                  />
                </div>
              ))}
            </div>
          </div>
          <Footer />
        </>
      )}

      {/* POP UP */}

      <Modal centered size="lg" show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Select Option</Modal.Title>
          <div onClick={handleClose}>
            <i
              class="fa-solid fa-xmark"
              style={{
                backgroundColor: "darkred",
                padding: "9px",
                color: "white",
                borderRadius: "50px",
                width: "35px",
                textAlign: "center",
              }}
            ></i>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="row mt-2">
            {(() => {
              // Filtered prices
              const filteredPrices = selectedData?.morepriceData?.filter(
                (ele) => ele.pricecity === capitalizedCity
              );

              return (
                <>
                  {filteredPrices?.map((price, index) => (
                    <div
                      key={index}
                      className="col-md-3 mt-3"
                      onClick={() => handleItemClick(price, index)}
                    >
                      <div
                        className={` mt-3 ${
                          selectedItems[index] ? "active12" : "inactive12"
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
                              <p className="poppins-regular">₹{price.pPrice}</p>
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
            Congratulations! ₹ {TotalPrice}
            Saved so far!
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
              style={{ color: "white", fontSize: "15px", fontWeight: "bold" }}
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
              onClick={handleViewCartClick}
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
                            onClick={(e) => handleAdd(e, plan._id, innerindex)}
                            className="col-md-6 m-auto  fntbold text-center p-1  fnts btn_clr   "
                          >
                            {Added || innerindex !== SelectedIndex ? (
                              <>
                                <span>
                                  <AddIcon style={{ fontSize: "14px" }} />{" "}
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
                        onClick={(e) => toggleAccordion1(e, "includes", 0)}
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
                        onClick={(e) => toggleAccordion1(e, "excludes", 1)}
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
                            maxHeight: `${activeIndex ? "1000px" : "0px"}`,
                          }}
                          className="accordion__content"
                        >
                          {servi.serviceIncludes.map((dos, dosIndex) => (
                            <div
                              key={dosIndex}
                              className="accordion__text clrpr"
                            >
                              <li>{dos.text}</li>
                            </div>
                          ))}
                        </div>
                      )}
                      {catType === "excludes" && activeIndex2 === 1 && (
                        <div
                          style={{
                            maxHeight: `${activeIndex ? "1000px" : "0px"}`,
                          }}
                          className="accordion__content"
                        >
                          {servi?.serviceExcludes?.map((dos, dosIndex) => (
                            <div
                              key={dosIndex}
                              className="accordion__text clrpr"
                            >
                              <li>{dos.text}</li>
                            </div>
                          ))}
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

      <Modal size="lg" show={OpenViewCartModal} onHide={handleCloseCart}>
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

                <Button variant="secondary" className="col-md-2 m-auto  p-0">
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
                  <span className="me-2 ms-2 fs-5 p-0">{Quantity} </span>
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
                      <span className="col-md-6 m-auto p-0">View Cart</span>
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
                style={{ width: "100%", height: "150px", borderRadius: "5px" }}
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
          <div
            className="row"
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            {vhspromise.map((data) => (
              <div className="col-md-4" key={data._id}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={data.image}
                    alt="vhs"
                    style={{ width: "60px", height: "60px" }}
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
            ))}
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
    </>
  );
}

export default Servicedetails;
