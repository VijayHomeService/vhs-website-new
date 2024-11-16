import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  addToCart,
  addToCart1,
  removeMyCartItem,
  clearCart,
} from "../Redux1/MyCartSlice";
import { deleteMyCartItem } from "../Redux1/MyCartSlice";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Footer from "./Footer";
// Import navigation CSS
import Header1 from "./Header1";
import voffer from "../assests/voffer.jpeg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { FreeMode, Pagination, Autoplay, Navigation } from "swiper/modules";
import { SpinnerCircular } from "spinners-react";
import moment from "moment";
import Cartnavbar from "./Cartnavbar";

function Serviceviewdetails() {
  const [servicedata, setservicedata] = useState([]);
  const { ServiceName, city } = useParams();

  const fromSlug = (slug) => {
    return slug.replace(/-/g, " ");
  };

  const readableServiceName = fromSlug(ServiceName);

  const formattedServiceName = city
    ? readableServiceName.split(` in ${fromSlug(city)}`)[0]
    : readableServiceName;

  console.log("formattedServiceName", formattedServiceName);
  const [svideodata, setsvideodata] = useState([]);
  const [ReviewVideodata, setReviewVideodata] = useState([]);
  const [feqdata, setfeqdata] = useState([]);
  const [whychooseus, setwhychooseus] = useState([]);
  const location = useLocation();
  const { sub } = location.state || {};
  // console.log("sub=====", sub);
  const capitalizedCity = localStorage.getItem("city");
  // console.log("capitalizedCity======", capitalizedCity);
  const MyCartItmes = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [Item, setItem] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();
  const [certificatedata, setcertificatedata] = useState([]);
  const [modalbanner, setmodalbanner] = useState([]);
  const [paintingbanner, setpaintingbanner] = useState([]);
  const [allserviceName, setallserviceName] = useState([]);
  const [ser, setser] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [name, setname] = useState("");
  const [contact1, setcontact1] = useState("");
  const [email, setemail] = useState("");
  const [comment, setcomment] = useState("");
  const [enquirydate, setenquirydate] = useState(moment().format("MM-DD-YYYY"));
  const [show, setShow] = useState(false);
  const [City, setCity] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log("sumanSurveice", ServiceName.split("--")[0].replace(/-/g, " "));
  const sername = ServiceName?.split("--")[0].replace(/-/g, " ");
  console.log("sername====", sername);
  useEffect(() => {
    // if(ServiceName == allserviceName.)
    if (sername && allserviceName.length > 0) {
      const parts = sername?.split("-");
      const category1 = capitalizeFirstLetter(parts[0]);
      console.log("parts>>>>", parts?.join(" "));

      // console.log("Searching for:", category1);
      console.log("Available subcategories:", allserviceName);

      const fullServiceName = allserviceName?.find((service) =>
        service.serviceName.toLowerCase().includes(category1.toLowerCase())
      );

      console.log("Found fullServiceName:", fullServiceName);

      if (fullServiceName) {
        const city = parts.slice(10).join("-");
        setCity(city);
        setser(fullServiceName?.serviceName);
        getSubcategory(fullServiceName?.serviceName);
      } else {
        console.error("Service not found");
      }
    }
  }, [ServiceName, allserviceName]);

  // const capitalizedCity = capitalizeFirstLetter(city);
  // console.log("city=====13", capitalizedCity);

  useEffect(() => {
    console.log("Updated ser:", ser);
  }, [ser]);

  console.log("ser====123", ser);

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
          // baseURL: "http://localhost:8080/api",
          headers: { "content-type": "application/json" },
          data: {
            date: enquirydate,
            name: name,
            time: moment().format("h:mm:ss a"),
            mobile: contact1,
            email: email,
            category: servicedata?.category,
            reference2: "website",
            city: capitalizedCity,
            comment: comment,
            // interestedFor: serviceName,
            // serviceID: serviceId,
            // responseType: getTemplateDetails, // Ensure this matches your data structure
          },
        };

        const response = await axios(config);

        if (response.status === 200) {
          const data = response.data.data;
          alert("Enquiry added successfully:", data);
          setShow(false);
          // window.location.assign("/");
        }
      } catch (error) {
        console.error("Error adding enquiry:", error);
      }
    }
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getSubcategory();
  }, [ServiceName, servicedata]);

  const citys = useSelector((state) => state.city);

  const getSubcategory = async () => {
    try {
      let res = await axios.get(
        `https://api.vijayhomesuperadmin.in/api/userapp/getservicenamesforSEO/${ser}`
      );

      if (res.status === 200) {
        setservicedata(res.data.services);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getallservice();
  }, []);

  const getallservice = async () => {
    try {
      let res = await axios.get(
        `https://api.vijayhomesuperadmin.in/api/userapp/getserviceNameManagement`
      );
      if (res.status === 200) {
        setallserviceName(res.data.services);
      }
    } catch (err) {
      console.log(err);
    }
  };

  console.log("getallservice", allserviceName);

  useEffect(() => {
    getsvideo();
  }, [svideodata]);

  const isItemInCart = (itemId) => {
    return MyCartItmes.some((cartItem) => cartItem.id === itemId);
  };

  // console.log("servicedata====suman", servicedata);

  const getItemQuantityById = (itemId) => {
    const cartItem = MyCartItmes.find((item) => item.id === itemId);
    return cartItem ? cartItem.qty : 0;
  };

  const handleviewselect = (selectedItem) => {
    // console.log("selectedYogi", selectedItem);
    setItem(selectedItem);
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

  // console.log("select=====", selectedItem);

  // console.log("whychooseus", whychooseus);

  const CartSavedtotal = MyCartItmes.reduce((accumulator, item) => {
    const offerPrice = parseFloat(item?.offerprice);
    const planPrice = parseFloat(item?.planPrice);
    const quantity = parseInt(item?.qty);

    if (!isNaN(offerPrice) && !isNaN(quantity)) {
      const subtotal = planPrice * quantity - offerPrice * quantity;

      return accumulator + subtotal;
    } else {
      return accumulator;
    }
  }, 0);

  const Carttotal = MyCartItmes.reduce((accumulator, item) => {
    const offerPrice = parseFloat(item?.offerprice);
    const quantity = parseInt(item?.qty);

    if (!isNaN(offerPrice) && !isNaN(quantity)) {
      const subtotal = offerPrice * quantity;

      return accumulator + subtotal;
    } else {
      return accumulator;
    }
  }, 0);

  const getsvideo = async () => {
    let res = await axios.get(
      "https://api.vijayhomesuperadmin.in/api/userapp/getservicevideo"
    );
    if (res.status === 200) {
      setsvideodata(
        res.data?.serviceName.filter(
          (i) => i.serviceName === servicedata?.serviceName
        )
      );
    }
  };

  useEffect(() => {
    getwhyneed();
  }, []);

  const getwhyneed = async () => {
    let res = await axios.get(
      "https://api.vijayhomesuperadmin.in/api/userapp/getallfeq"
    );
    if (res.status === 200) {
      setfeqdata(
        res.data?.feq.filter((i) => i.category === servicedata?.category)
      );
    }
  };

  useEffect(() => {
    getcertificate();
  });

  const getcertificate = async () => {
    let res = await axios.get(
      "https://api.vijayhomeservice.com/api/certificate/getallcertificate"
    );
    if (res.status === 200) {
      setcertificatedata(
        res.data?.data.filter((i) => i.category === servicedata?.category)
      );
    }
  };

  useEffect(() => {
    getmodalbanner();
  }, []);

  const getmodalbanner = async () => {
    let res = await axios.get(
      "https://api.vijayhomeservice.com/api/pbanner/getallpopupbanner"
    );
    if ((res.status = 200)) {
      setmodalbanner(
        res.data?.data.filter((i) => i?.category === servicedata?.category)
      );
    }
  };

  useEffect(() => {
    getReviewsVideos();
  }, [servicedata]);

  const getReviewsVideos = async () => {
    let res = await axios.get(
      "https://api.vijayhomesuperadmin.in/api/userapp/getallReviewVideos"
    );
    if ((res.status = 200)) {
      setReviewVideodata(
        res.data?.ReviewVideos.filter(
          (i) => i.Subcategory === servicedata?.Subcategory
        )
      );
    }
  };

  useEffect(() => {
    getpaintingbanner();
  }, []);

  const getpaintingbanner = async () => {
    let res = await axios.get(
      "https://api.vijayhomeservice.com/api/paintingbanner/getallpaintingbanner"
    );
    if ((res.status = 200)) {
      setpaintingbanner(
        res.data?.banner.filter((i) => i.category === servicedata?.category)
      );
    }
  };

  // console.log("paintingbanner", paintingbanner);

  console.log("subcategory====kanmani", servicedata);

  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [pricesdata, setpricesdata] = useState([]);
  const [selectedPlan, setselectedPlan] = useState(pricesdata[0]);

  const handleItemClick = (item, index) => {
    // console.log("Item Yogi", item);
    // console.log("Item====", Item);

    setSelectedItemIndex(index);
    setselectedPlan(item);
    setItem(selectedItem);
    const itemToAdd = {
      _id: item._id,
      category: servicedata?.category,
      service: servicedata,
      pName: item.pName,
      pPrice: item.pPrice,
      pofferprice: item.pofferprice,
      pservices: item.pservices,
    };

    if (!item.pservices) {
      const existingCartItem = MyCartItmes.find(
        (cartItem) => cartItem.category === servicedata?.category
      );

      if (existingCartItem) {
        dispatch(addToCart({ ...itemToAdd, id: existingCartItem.id }));
      } else {
        dispatch(clearCart());
        dispatch(addToCart(itemToAdd));
      }
    } else {
      // alert("This is AMC services ")
      navigate("/summary", { state: { plan: item, sdata: Item } });
    }
  };

  const handleItemClick1 = (item, index) => {
    setSelectedItemIndex(index);
    setselectedPlan(item);
    const itemToAdd = {
      _id: item._id,
      category: servicedata,
      service: selectedItem,
      pName: item.pName,
      pPrice: item.pPrice,
      pofferprice: item.pofferprice,
      pservices: item.pservices,
    };

    if (!item.pservices) {
      const existingCartItem = MyCartItmes.find(
        (cartItem) => cartItem.category === servicedata?.category
      );

      if (existingCartItem) {
        dispatch(addToCart({ ...itemToAdd, id: existingCartItem.id }));
      } else {
        dispatch(clearCart());
        dispatch(addToCart(itemToAdd));
      }
    } else {
      navigate("/summary", { state: { plan: item, sdata: servicedata } });
    }
  };

  console.log("servicedata", servicedata);

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
        <div className="row">
          <Header1 />
          <Cartnavbar />
          <div className="col-md-12">
            <div className="container">
              <img
                className=""
                src={servicedata?.viewbanner}
                style={{ width: "100%", height: "250px" }}
                alt=""
              />
              <div className="mt-3">
                <div
                  className="poppins-regular"
                  style={{
                    color: "green",
                    fontSize: "14px",
                  }}
                >
                  {servicedata?.servicetitle}
                </div>
                <div className="poppins-semibold" style={{}}>
                  {servicedata?.serviceName}
                </div>
                <div
                  className="poppins-regular"
                  style={{
                    color: "grey",
                    fontSize: "12px",
                  }}
                >
                  {servicedata?.servicebelow}
                </div>

                <div
                  className="poppins-semibold mt-4"
                  style={{
                    color: "black",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Service Description
                </div>
                <div className="row">
                  <div className="col-md-8">
                    {servicedata?.serviceDesc?.map((data, index) => (
                      <div key={index} className="d-flex mb-2">
                        <div>
                          <img
                            style={{ width: "16px", height: "16px" }}
                            alt=""
                            src={`https://api.vijayhomesuperadmin.in/service/${servicedata?.Eximg}`}
                          />
                        </div>
                        <div className="ml-2 mx-1">
                          <div
                            className="poppins-regular mt-1"
                            style={{
                              color: "black",
                              fontSize: "14px",
                            }}
                          >
                            {data.text}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="col-md-4">
                    {paintingbanner.map((data, index) => (
                      <div key={index} className="mb-2">
                        <img
                          src={data?.banner}
                          alt="painting"
                          style={{
                            width: "100%",
                            height: "200px",
                            borderRadius: "10px",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="row mt-2">
                  {(() => {
                    const filteredPrices = servicedata?.morepriceData?.filter(
                      (ele) => ele.pricecity === capitalizedCity
                    );

                    return (
                      <>
                        {filteredPrices?.map((price, index) => (
                          <div key={index} className="col-md-2 mt-3">
                            <div
                              className="shadow-lg"
                              style={{
                                backgroundColor: "white",
                                padding: "10px",
                                borderRadius: "5px",
                              }}
                            >
                              <div
                                style={{
                                  textAlign: "center",
                                  color: "green",
                                  fontSize: "16px",
                                  fontWeight: "bold",
                                  fontFamily: "sans-serif",
                                }}
                              >
                                {price.pName && (
                                  <p className="poppins-black">{price.pName}</p>
                                )}
                              </div>

                              <div
                                className="d-flex"
                                style={{ justifyContent: "center" }}
                              >
                                <div
                                  className="poppins-regular"
                                  style={{
                                    color: "black",
                                    fontSize: "14px",
                                    textDecoration: "line-through",
                                    textAlign: "center",
                                  }}
                                >
                                  {price.pPrice && (
                                    <p className="poppins-black">
                                      ₹{price.pPrice}
                                    </p>
                                  )}
                                </div>
                                <div
                                  className="poppins-regular mx-2"
                                  style={{
                                    color: "black",
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    textAlign: "center",
                                  }}
                                >
                                  {price.pofferprice && (
                                    <p className="poppins-black">
                                      ₹{price.pofferprice}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div
                                style={{
                                  textAlign: "center",
                                  color: "black",
                                  fontSize: "12px",
                                  fontWeight: "bold",
                                  fontFamily: "sans-serif",
                                }}
                              >
                                {price.pservices && (
                                  <p className="poppins-black">
                                    Services - {price.pservices}
                                  </p>
                                )}
                              </div>

                              <div
                                className="poppins-regular"
                                style={{
                                  color: "orange",
                                  fontSize: "14px",
                                  textAlign: "center",
                                }}
                              >
                                {(
                                  ((price.pPrice - price.pofferprice) /
                                    price.pPrice) *
                                  100
                                ).toFixed(0)}
                                % discount
                              </div>

                              {isItemInCart(price._id) ? (
                                <span> </span>
                              ) : (
                                <button
                                  className="poppins-black"
                                  onClick={() => {
                                    handleviewselect(selectedItem);
                                    handleItemClick1(price);
                                  }}
                                  style={{
                                    bottom: 10,
                                    width: "100%",
                                    padding: 5,
                                    color: "white",
                                    textAlign: "center",
                                    borderRadius: 3,
                                    marginTop: 15,
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  Book
                                </button>
                              )}

                              {isItemInCart(price._id) && (
                                <div style={{ marginTop: "5px" }}>
                                  <div
                                    className="d-flex m-auto"
                                    style={{
                                      backgroundColor: "green",
                                      boxShadow:
                                        "0 4px 8px rgba(0, 0, 0, 0.15)",
                                      borderRadius: 5,
                                      padding: "0px",
                                    }}
                                  >
                                    <div className="col-md-5">
                                      <button
                                        className="poppins-regular"
                                        onClick={() => {
                                          const cartItem = MyCartItmes.find(
                                            (cartItem) =>
                                              cartItem.id === price._id
                                          );
                                          if (cartItem && cartItem.qty > 1) {
                                            dispatch(
                                              deleteMyCartItem(price._id)
                                            );
                                          } else {
                                            dispatch(
                                              deleteMyCartItem(price._id)
                                            );
                                          }
                                        }}
                                        style={{
                                          backgroundColor: "transparent",
                                          border: "none",
                                          cursor: "pointer",
                                          height: "20px",
                                        }}
                                      >
                                        <i
                                          className="fa-solid fa-circle-minus"
                                          style={{
                                            color: "white",
                                            fontSize: "18px",
                                          }}
                                        ></i>
                                      </button>
                                    </div>

                                    <div className="col-md-2">
                                      <div
                                        style={{
                                          color: "white",
                                          // marginLeft: 5,
                                          fontSize: "14px",
                                          textAlign: "center",
                                          marginTop: "8px",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        {getItemQuantityById(price._id)}
                                      </div>
                                    </div>

                                    <div className="col-md-5">
                                      <button
                                        onClick={() => handleItemClick(price)}
                                        style={{
                                          backgroundColor: "transparent",
                                          border: "none",
                                          cursor: "pointer",
                                          height: "20px",
                                        }}
                                      >
                                        <i
                                          className="fa-solid fa-circle-plus"
                                          style={{
                                            color: "white",
                                            fontSize: "18px",
                                          }}
                                        ></i>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                        {filteredPrices?.length === 0 && (
                          <div className="col-md-12 poppins-regular">
                            <p>No prices available for this city</p>
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>

                {servicedata?.category === "Painting" ? (
                  ""
                ) : Carttotal > 0 ? (
                  <div
                    className="row mb-5"
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <div
                      className="mt-5"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        backgroundColor: "rgb(224, 206, 85)",
                        padding: 5,
                        marginTop: 5,
                        alignSelf: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        width: "60%",
                      }}
                    >
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <span
                          className="poppins-medium"
                          style={{ color: "black", fontWeight: "bold" }}
                        >
                          Congratulations! ₹{Carttotal}
                        </span>
                      </div>
                      <span
                        style={{
                          color: "black",
                          marginLeft: 10,
                          fontWeight: "bold",
                        }}
                      ></span>
                      <span
                        className="poppins-medium"
                        style={{
                          color: "black",
                          marginLeft: 4,
                          fontWeight: "bold",
                        }}
                      >
                        saved so far!
                      </span>
                    </div>
                    <div
                      className="row"
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          backgroundColor: "darkred",
                          color: "white",
                          padding: 10,
                          width: "61%",
                          textAlign: "center",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          border: "none",
                          cursor: "pointer",
                        }}
                        onClick={() => navigate("/cart")}
                      >
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <span
                            className="poppins-extrabold"
                            style={{
                              color: "white",
                              fontWeight: "bold",
                              fontSize: "14px",
                            }}
                          >
                            Total
                          </span>
                          <span
                            className="poppins-extrabold mx-2"
                            style={{ color: "white" }}
                          >
                            ₹{Carttotal}
                          </span>
                        </div>
                        <span
                          className="poppins-extrabold"
                          style={{ color: "white", fontWeight: "bold" }}
                        >
                          View Cart
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <></>
                )}

                <div className="row">
                  <div className="col-md-6">
                    <div
                      className="poppins-semibold mt-4"
                      style={{
                        color: "black",
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      Service Includes
                    </div>
                    <div className="row">
                      {servicedata?.serviceIncludes?.map((data) => (
                        <>
                          <div className="col-md-1">
                            <img
                              style={{ width: "16px", height: "16px" }}
                              alt=""
                              src={`https://api.vijayhomesuperadmin.in/service/${servicedata?.Desimg}`}
                            />
                          </div>
                          <div className="col-md-11">
                            <div
                              className="poppins-regular  mt-1"
                              style={{
                                color: "black",
                                fontSize: "14px",
                                marginLeft: "-26px",
                              }}
                            >
                              {data.text}
                            </div>
                          </div>
                        </>
                      ))}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div
                      className="poppins-semibold mt-4"
                      style={{
                        color: "black",
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      Service Excludes
                    </div>
                    <div className="row">
                      {servicedata?.serviceExcludes?.map((data) => (
                        <>
                          <div className="col-md-1">
                            <img
                              style={{ width: "16px", height: "16px" }}
                              alt=""
                              src={`https://api.vijayhomesuperadmin.in/service/${servicedata?.Inimg}`}
                            />
                          </div>
                          <div className="col-md-11">
                            <div
                              className="poppins-regular mt-1"
                              style={{
                                color: "black",
                                fontSize: "14px",
                                marginLeft: "-26px",
                              }}
                            >
                              {data.text}
                            </div>
                          </div>
                        </>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div
                      className="poppins-semibold mt-4"
                      style={{
                        color: "darkred",
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      Thoughtful curations
                    </div>

                    <div
                      className="poppins-regular"
                      style={{
                        fontSize: "13px",
                        color: "black",
                        fontWeight: "bold",
                        marginTop: "5px",
                      }}
                    >
                      Of our finest experiences
                    </div>

                    <div className="row d-flex mt-4">
                      <div className="col-md-6">
                        <video
                          className="p-0"
                          style={{
                            objectFit: "contain",
                            width: "200px",
                            borderRadius: "10px",
                          }}
                          height={300}
                          //autoPlay
                          loop
                          src={`https://api.vijayhomesuperadmin.in/sVideo/${svideodata[0]?.serviceVideo}`}
                        ></video>
                      </div>
                      <div className="col-md-6">
                        <video
                          className="p-0"
                          style={{
                            objectFit: "contain",
                            width: "200px",
                            borderRadius: "10px",
                          }}
                          height={300}
                          // autoPlay
                          loop
                          src={`https://api.vijayhomesuperadmin.in/sVideo/${svideodata[1]?.serviceVideo}`}
                        ></video>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div
                      className="poppins-semibold mt-4"
                      style={{
                        color: "black",
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      Testimonial Videos
                    </div>

                    <div className="row mb-3 mt-5">
                      {ReviewVideodata.map((video, index) => {
                        const videoId = video.Links.split("v=")[1];
                        const embedUrl = `https://www.youtube.com/embed/${videoId}`;
                        return (
                          <div className="col-12" key={index}>
                            <iframe
                              width="100%"
                              height="300px"
                              src={embedUrl}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              style={{ borderRadius: "5px" }}
                            ></iframe>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="row" style={{ padding: "15px" }}>
                  <div
                    className="poppins-semibold"
                    style={{ textAlign: "center", marginBottom: "25px" }}
                  >
                    How we Work?
                  </div>

                  <div className="row mb-3">
                    <Swiper
                      slidesPerView={4}
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
                          key={index._id}
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
                                  width: "80px",
                                  height: "80px",
                                  // borderRadius: "50px",
                                }}
                              />
                            </div>
                            <div
                              className="poppins-black mt-2"
                              style={{ fontSize: "12px", textAlign: "center" }}
                            >
                              {data.title}
                            </div>
                            <div
                              className="poppins-regular"
                              style={{ textAlign: "center" }}
                            >
                              {data.discription}
                            </div>
                          </div>
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
                </div>

                <div className="row" style={{ padding: "15px" }}>
                  <div
                    className="poppins-semibold"
                    style={{ textAlign: "center" }}
                  >
                    Certificates
                  </div>
                </div>

                <div className="mt-1 mb-3" style={{ position: "relative" }}>
                  <Swiper
                    slidesPerView={4}
                    spaceBetween={30}
                    freeMode={true}
                    pagination={{
                      clickable: true,
                      el: ".swiper-pagination-cleaning",
                    }}
                    navigation={{
                      nextEl: ".swiper-button-next-cleaning",
                      prevEl: ".swiper-button-prev-cleaning",
                    }}
                    modules={[FreeMode, Pagination, Autoplay, Navigation]}
                    className="mySwiper"
                  >
                    {certificatedata.map((i, index) => (
                      <SwiperSlide
                        key={index._id}
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
                          <img
                            src={i.image}
                            style={{
                              width: "250px",
                              height: "250px",
                            }}
                            alt=""
                          />
                        </div>
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
              </div>
            </div>
          </div>

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

              <div className="">
                <div className="poppins-light">Email</div>
                <input
                  type="text"
                  className="input col-md-12 mt-2 vhs-input-value"
                  onChange={(e) => setemail(e.target.value)}
                />
              </div>

              <div className="">
                <div className="poppins-light">Contact</div>
                <input
                  type="number"
                  className="input col-md-12 mt-2 vhs-input-value"
                  onChange={(e) => setcontact1(e.target.value)}
                />
              </div>

              <div className="">
                <div className="poppins-light">Discription</div>
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
          <Footer />
        </div>
      )}
    </>
  );
}

export default Serviceviewdetails;
