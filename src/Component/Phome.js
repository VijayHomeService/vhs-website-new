import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Pheader from "./Pheader";
import Pmobileheader from "./Pmobileheader";
import Footer from "./Footer";
import pcity from "../../src/assets1/pcity1.jpg";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addToPMCart,
  clearCart,
  decrementQuantity,
  incrementQuantity,
} from "../../src/Component/Redux/Items";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import moment from "moment/moment";
import Switch from "react-switch";
import star from "../../src/assets1/star.png";
import { colors } from "@mui/material";
import truck from "../../src/assets1/truck.png";
import pmmobile from "../../src/assets1/pmmobile.jpg";
import { drop } from "lodash";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { FreeMode, Pagination, Autoplay, Navigation } from "swiper/modules";
import {
  addToPMAddonsCart,
  deletePMAddonsCartItems,
  removePMAddonsCartItems,
} from "../../src/Component/Redux/PMaddons";

function Phome() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    pickupLocation,
    dropLocation,
    selectedCity,
    mobilenumber,
    shiftingdate,
    pickupLocationLat,
    pickupLocationLng,
    dropLocationLat,
    dropLocationLng,
    cityData,
  } = location.state || {};
  const [categoryData, setCategoryData] = useState([]);
  const [itemsData, setItemsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Living room");
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const categoryRefs = useRef({});
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [visible, setvisible] = useState(false);
  const [fare, setFare] = useState(0);
  const [VehicleData, setVehicleData] = useState([]);
  const [singleLayer, setsingleLayer] = useState(false);
  const [multilayer, setmultilayer] = useState(false);
  const [unpacking, setunpacking] = useState(false);
  const [dismantling, setdismantling] = useState(false);
  const [show3, setShow3] = useState(false);
  const [voucherdata, setvoucherdata] = useState([]);
  const [couponCode, setcouponCode] = useState("");
  const slots = cityData?.Slot || [];
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [slot, setSlot] = useState("");
  const [show2, setShow2] = useState(false);
  const [alladdons, setalladdons] = useState([]);
  const [show4, setShow4] = useState(false);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [contact, setcontact] = useState("");
  const [slidesPerView, setSlidesPerView] = useState(3);

  console.log("selectedCity", selectedCity);

  const [CouponApplybtn, setCouponApplyBtn] = useState("");
  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);
  const [pickupfloor, setpickupfloor] = useState(false);
  const [dropfloor, setdropfloor] = useState(false);
  const [pickupfloornumber, setpickupfloornumber] = useState("");
  const [dropfloornumber, setdropfloornumber] = useState("");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(3);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const CouponApply = (step) => {
    setCouponApplyBtn(step);
  };

  const singleLayerSwitch = () => {
    setsingleLayer((previousState) => !previousState);
    setmultilayer(false);
  };

  useEffect(() => {
    getvoucher();
  }, []);

  const getvoucher = async () => {
    let res = await axios.get(
      "https://pm.vijayhomeservice.in/api/voucher/getvoucher"
    );
    if ((res.status = 200)) {
      setvoucherdata(res.data?.voucher);
    }
  };

  useEffect(() => {
    getalladdons();
  }, []);

  const getalladdons = async () => {
    let res = await axios.get(
      "https://pm.vijayhomeservice.in/api/AddOns/getAddOns"
    );
    if ((res.status = 200)) {
      setalladdons(res.data);
    }
  };

  console.log("alladdons", alladdons);

  const multilayerSwitch = () => {
    setmultilayer((previousState) => !previousState);
    setsingleLayer(false);
  };

  const unpackingSwitch = () => setunpacking((previousState) => !previousState);
  const dismantlingSwitch = () =>
    setdismantling((previousState) => !previousState);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const dates = [];

  // Generate the next 15 days with the required data
  for (let i = 0; i <= 15; i++) {
    const date = moment().add(i, "days");
    const formattedDate = {
      day: date.format("DD"),
      month: date.format("MMM"),
      year: date.format("YYYY"),
      week: date.format("ddd"),
      isToday: date.isSame(moment(), "day"),
      isTomorrow: date.isSame(moment().add(1, "day"), "day"),
      isWeekend: date.day() === 6 || date.day() === 0, // 6 = Saturday, 0 = Sunday
    };
    dates.push(formattedDate);
  }

  const dispatch = useDispatch();
  const MyCartItems = useSelector((state) => state.Items);

  useEffect(() => {
    getVehicles();
  }, []);

  const getVehicles = async () => {
    let res = await axios.get("https://pm.vijayhomeservice.in/api/getvehical");
    if ((res.status = 200)) {
      setVehicleData(res.data);
    }
  };

  useEffect(() => {
    getCategories();
    getItems();
  }, []);

  const handleAddToCartaddons = (item) => {
    console.log("item,", item);
    dispatch(
      addToPMAddonsCart({
        id: item?._id,
        name: item?.name,
        offerPrice: item?.offerPrice,
        price: item?.price,
        qty: 1,
      })
    );
  };

  const PMAddonsItems = useSelector((state) => state.addons);
  console.log("PMAddonsItems", PMAddonsItems);

  const PMAddonstotal = PMAddonsItems.reduce((accumulator, item) => {
    const offerPrice = parseFloat(item?.offerPrice);
    const quantity = parseInt(item?.qty);

    if (!isNaN(offerPrice) && !isNaN(quantity)) {
      const subtotal = offerPrice * quantity;

      return accumulator + subtotal;
    } else {
      return accumulator;
    }
  }, 0);

  console.log("PMAddonstotal", PMAddonstotal);

  const getCategories = async () => {
    try {
      const res = await axios.get(
        "https://pm.vijayhomeservice.in/api/cate/getcategory"
      );
      if (res.status === 200) {
        setCategoryData(res.data);
      }
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  const getItems = async () => {
    try {
      const res = await axios.get(
        "https://pm.vijayhomeservice.in/api/item/getitem"
      );
      if (res.status === 200) {
        setItemsData(res.data);
      }
    } catch (error) {
      console.error("Error fetching items data:", error);
    }
  };

  const calculateQty = () => {
    return MyCartItems.reduce((total, item) => {
      return total + (item.qty || 0);
    }, 0);
  };
  const totalItems = calculateQty();

  // Update this function to handle active subcategory
  const handleSubcategoryClick = (subcategory) => {
    // Toggle logic: if the subcategory clicked is the active one, collapse it, otherwise expand the new one
    setActiveSubcategory((prevSubcategory) =>
      prevSubcategory === subcategory ? null : subcategory
    );
  };

  // const handleCategoryClick = (category) => {
  //   setActiveCategory(category);

  //   // Scroll to the corresponding category heading
  //   if (categoryRefs.current[category]) {
  //     categoryRefs.current[category].scrollIntoView({
  //       behavior: "smooth",
  //       block: "start",
  //     });
  //   }
  // };

  const handleCategoryClick = (category) => {
    setActiveCategory(category); // Set the active category
  };

  const handleAddToCart = (item, category, subcategory) => {
    dispatch(
      addToPMCart({
        id: item._id,
        category: category,
        subcategory: subcategory,
        itemname: item.itemname,
        volume: item.volume,
        weight: item.weight,
        offerPrice: item.offerPrice,
        packingPrice: item.packingPrice,
      })
    );
    setActiveSubcategory(!activeCategory);
  };

  const handleIncrementQuantity = (item) => {
    dispatch(
      incrementQuantity({
        id: item._id,
      })
    );
    setActiveSubcategory(!activeCategory);
  };

  const handleDecrementQuantity = (item) => {
    dispatch(
      decrementQuantity({
        id: item._id,
      })
    );
    setActiveSubcategory(!activeCategory);
  };

  const filteredItems = itemsData.filter((item) =>
    item.itemname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const groupedItems = filteredItems.reduce((acc, item) => {
  //   const {
  //     category,
  //     subcategory,
  //     _id,
  //     itemname,
  //     offerPrice,
  //     volume,
  //     weight,
  //     packingPrice,
  //   } = item;

  //   if (!acc[category]) {
  //     acc[category] = {};
  //   }

  //   if (!acc[category][subcategory]) {
  //     acc[category][subcategory] = [];
  //   }

  //   acc[category][subcategory].push({
  //     _id,
  //     itemname,
  //     offerPrice,
  //     volume,
  //     weight,
  //     packingPrice,
  //   });

  //   return acc;
  // }, {});

  const groupedItems = filteredItems.reduce((acc, item) => {
    const {
      category,
      subcategory,
      _id,
      itemname,
      offerPrice,
      volume,
      weight,
      packingPrice,
    } = item;

    if (!acc[category]) {
      acc[category] = {};
    }

    if (!acc[category][subcategory]) {
      acc[category][subcategory] = [];
    }

    acc[category][subcategory].push({
      _id,
      itemname,
      offerPrice,
      volume,
      weight,
      packingPrice,
    });

    return acc;
  }, {});

  const showLoading = () => {
    setOpen(true);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  }

  const distanceInKm = haversineDistance(
    pickupLocationLat,
    pickupLocationLng,
    dropLocationLat,
    dropLocationLng
  );

  const calculateFare = (vehicle) => {
    if (!vehicle) return 0;

    // Find the city object that matches the selected city
    const cityObject = vehicle.cities.find(
      (city) => city.city === selectedCity
    );
    const basePrice = cityObject ? cityObject.price : vehicle.basePrice;

    // Calculate additional fare based on distance
    const additionalDistance = Math.max(
      parseFloat(distanceInKm) - vehicle.baseDistance,
      0
    );
    const distanceFare = additionalDistance * vehicle.distanceRate;
    const totalFare = Number(basePrice) + distanceFare;

    return totalFare;
  };

  const calculateTotals = () => {
    const totalVolume = MyCartItems.reduce(
      (sum, item) => sum + item.volume * item.qty,
      0
    );
    const totalWeight = MyCartItems.reduce(
      (sum, item) => sum + item.weight * item.qty,
      0
    );
    return { totalVolume, totalWeight };
  };

  const selectVehicle = (totalVolume, totalWeight) => {
    return VehicleData.find(
      (vehicle) =>
        vehicle.volumeCapacity >= totalVolume &&
        vehicle.weightCapacity >= totalWeight
    );
  };

  const calculatePackingPrice = () => {
    return MyCartItems.reduce((total, item) => {
      return (
        total +
        (item.qty && item.packingPrice ? item.qty * item.packingPrice : 0)
      );
    }, 0);
  };

  useEffect(() => {
    const { totalVolume, totalWeight } = calculateTotals();
    const vehicle = selectVehicle(totalVolume, totalWeight);
    setSelectedVehicle(vehicle);

    const totalFare = calculateFare(vehicle);
    setFare(totalFare);
  }, [MyCartItems, VehicleData, distanceInKm]);

  const packingAmt = calculatePackingPrice();

  // let GrandTotal = fare;
  let GrandTotal =
    fare +
    (singleLayer ? packingAmt : 0) +
    (multilayer ? packingAmt * 2 : 0) +
    (unpacking ? packingAmt : 0) +
    (dismantling ? packingAmt : 0);

  // const applycoupon = () => {
  //   if (discountPercentage > 0 && CouponApplybtn) {
  //     const discountAmount = (GrandTotal * discountPercentage) / 100;
  //     GrandTotal -= discountAmount; // Subtract discount amount from GrandTotal
  //   }
  // };

  const handleContinue = () => {
    navigate("/packers-movers-summary", {
      state: {
        GrandTotal,
        pickupLocation,
        dropLocation,
        selectedCity,
        mobilenumber,
        shiftingdate,
        pickupLocationLat,
        pickupLocationLng,
        dropLocationLat,
        dropLocationLng,
      },
    });
  };

  const handleContinueClick = () => {
    if (MyCartItems.length === 0) {
      alert("Please add an item");
    } else {
      setvisible(true); // This should only be called if there are items in the cart
    }
  };

  const displayGrandTotal = MyCartItems.length === 0 ? 0 : GrandTotal;

  const [appliedValue, setAppliedValue] = useState(null);

  // function applyCoupon() {
  //   const foundVoucher = voucherdata.find(
  //     (voucher) => voucher.voucherCode === couponCode
  //   );
  //   if (!foundVoucher) {
  //     alert("Invalid Coupon");
  //   } else {
  //     const discountPercentage = foundVoucher
  //       ? foundVoucher.discountPercentage
  //       : 0;
  //     const discountAmount = (discountPercentage / 100) * GrandTotal;
  //     setAppliedValue(discountAmount);
  //   }
  // }

  function applyCoupon() {
    if (!couponCode) {
      setAppliedValue(null);
      alert("Please enter a coupon code");
      return;
    }
    const foundVoucher = voucherdata.find(
      (voucher) => voucher.voucherCode === couponCode
    );

    if (!foundVoucher) {
      setAppliedValue(null);
      alert("Invalid Coupon");
    } else {
      const discountPercentage = foundVoucher.discountPercentage || 0;
      const discountAmount = (discountPercentage / 100) * GrandTotal;
      setAppliedValue(GrandTotal - discountAmount);
    }
  }

  const appliedcouponvalue = GrandTotal - appliedValue;

  const amount =
    appliedValue !== null
      ? appliedValue.toFixed(2) // Use appliedValue if a coupon is applied
      : GrandTotal.toFixed(2);

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    if (!selectedDate) {
      setShow1(true);
      return;
    }

    let GT = GrandTotal + PMAddonstotal;
    console.log("GT", GT);
    try {
      // setloader(true);
      const config = {
        url: "/order/addorder",
        method: "post",
        baseURL: "https://pm.vijayhomeservice.in/api", // Replace with your actual API URL
        headers: { "content-type": "application/json" },
        data: {
          customer: user?.customerName,
          email: user?.email,
          phone: user?.mainContact,
          Items: MyCartItems,
          userId: user?._id,
          pickupLocation: pickupLocation,
          dropLocation: dropLocation,
          serviceName: cityData?.servicename,
          serviceId: cityData?._id,
          amount: GT,
          baseAmount: fare,
          bookingDate: moment().format("LLL"),
          serviceDate: selectedDate,
          slot: slot,
          city: selectedCity,
          category: "Packers & Movers",
          packingLayer: singleLayer ? singleLayer : multilayer,
          unpacking: unpacking ? true : false,
          dismantling: dismantling ? true : false,
          distance: distanceInKm,
          paymentStatus: "cash",
          referenceCode: couponCode,
          pickupFloor: pickupfloornumber,
          dropFloor: dropfloornumber,
          vehicleName: selectedVehicle?.vehicalName,
          vehiclePrice: selectedVehicle?.basePrice,
        },
      };

      const response = await axios(config);

      if (response.status === 200) {
        // setloader(false);
        // deletePMAddonsCartItems();
        // deletePMCartItems();
        clearCart();
        alert("Thank for your booking is confirmed");
        window.location.assign("/packers-movers");
      } else {
        console.log("Unexpected response status:", response.status);
      }
    } catch (error) {
      // setloader(false);
      if (error.response) {
        alert(error.response.data.error);
        console.log("Error response data:", error.response.data);
      } else if (error.request) {
        alert("Network error. Please try again later.");
        console.log("No response received:", error.request);
      } else {
        alert("An unexpected error occurred. Please try again later.");
        console.log("Error:", error.message);
      }
    }
  };

  console.log("selectedDate", selectedDate);

  // const handleSubmit1 = async (e) => {
  //   e.preventDefault();
  //   if (!selectedDate) {
  //     setShow1(true);
  //     return;
  //   }

  //   const paydata1 = {
  //     customer: user?.customerName,
  //     email: user?.email,
  //     phone: user?.mainContact,
  //     Items: MyCartItems,
  //     userId: user?._id,
  //     pickupLocation: pickupLocation,
  //     dropLocation: dropLocation,
  //     serviceName: cityData?.servicename,
  //     serviceId: cityData?._id,
  //     amount: amount,
  //     baseAmount: fare,
  //     bookingDate: moment().format("LLL"),
  //     serviceDate: selectedDate
  //       ? moment(selectedDate).format("DD/MM/YYYY")
  //       : moment(shiftingdate).format("DD/MM/YYYY"),
  //     slot: slot,
  //     city: selectedCity,
  //     category: "Packers & Movers",
  //     packingLayer: singleLayer ? singleLayer : multilayer,
  //     unpacking: unpacking ? true : false,
  //     dismantling: dismantling ? true : false,
  //     distance: distanceInKm,
  //     paymentStatus: "",
  //     referenceCode: couponCode,
  //     pickupFloor: pickupfloornumber,
  //     dropFloor: dropfloornumber,
  //     vehicleName: selectedVehicle?.vehicalName,
  //     vehiclePrice: selectedVehicle?.basePrice,
  //   };

  //   try {
  //     const response = await axios.post(
  //       "https://pm.vijayhomeservice.in/api/CCAvenue/CCAvenueMoverspaymentwebsite",
  //       { updateddata: paydata1 }
  //     );

  //     if (response && response.data && response.data.url) {
  //       // setShowWebView(true);
  //       // setPaymentUrl(response.data.url);
  //       window.location.href = response.data.url;
  //     }
  //   } catch (error) {
  //     console.error(
  //       "Error initiating payment:",
  //       error.response || error.message || error
  //     );
  //   }
  // };

  useEffect(() => {
    if (categoryData.length > 0) {
      setActiveCategory(categoryData[0].category);
    }
  }, [categoryData]);

  const addpackersenquiry = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = {
        url: "/enquiry/addenquiry",
        method: "post",
        baseURL: "https://pm.vijayhomeservice.in/api",
        headers: { "Content-Type": "application/json" },
        data: {
          customer: name,
          email: email,
          contact1: contact,
          city: selectedCity,
          reference: "Packers Movers",
          type: "website",
          comment: "Video Inspection",
        },
      };

      // Send request
      const response = await axios(config);

      if (response.status === 200) {
        alert("Thank you, we will contact you soon");
        setname("");
        setemail("");
        setcontact("");
        window.location.reload();
      }
    } catch (error) {
      alert(
        "An error occurred while submitting the enquiry. Please try again."
      );
      console.error("Error adding enquiry:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlepickupfloor = () => {
    setpickupfloor(!pickupfloor);
  };

  const handledropfloor = () => {
    setdropfloor(!dropfloor);
  };

  console.log("amount", amount);

  return (
    <div className="">
      <Pheader />
      <Pmobileheader />

      <div className="pm-web">
        <img src={pcity} alt="loading..." style={{ width: "100%" }} />
      </div>

      <div className="pm-mobile">
        <img
          src={pmmobile}
          alt="loading"
          style={{ width: "100%", height: "150px" }}
        />
      </div>

      {!visible ? (
        <>
          <div className="container">
            <div className="row">
              <div
                className="col-md-8 shadow-sm p-3 mb-5 mt-3"
                style={{ borderRadius: "10px" }}
              >
                <div className="d-flex">
                  <div className="d-flex" style={{ alignItems: "center" }}>
                    <i
                      className="fa-solid fa-arrow-left"
                      style={{ fontSize: "18px", color: "darkred" }}
                    ></i>
                  </div>
                  <div className="poppins-black mx-3">Add your Inventory</div>
                </div>

                <div
                  className="d-flex mt-3"
                  style={{
                    backgroundColor: "aliceblue",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                >
                  <img
                    src={star}
                    className=""
                    alt="loading...."
                    style={{ width: "20px", height: "20px" }}
                  />
                  <div
                    className="poppins-regular mx-2"
                    style={{ color: "grey" }}
                  >
                    By providing list of household items allows us to provide an
                    accurate cost.
                  </div>
                </div>

                <div className="">
                  <input
                    type="text"
                    className="col-md-12 mt-3 poppins-regular"
                    placeholder="Search for a household item to add"
                    style={{
                      border: "1px solid grey",
                      height: "45px",
                      textAlign: "left",
                      paddingLeft: "45px",
                    }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <i
                    className="fa-solid fa-magnifying-glass p-search-icon"
                    style={{
                      color: "grey",
                      position: "absolute",
                      left: "91px",
                      fontSize: "18px",
                      marginTop: "29px",
                      marginLeft: "-17px",
                    }}
                  ></i>
                </div>

                <div className="row" style={{ justifyContent: "center" }}>
                  <div className="col-md-3 col-6 pb-3">
                    <div
                      onClick={handleShow}
                      className="poppins-regular"
                      style={{
                        border: "1px solid grey",
                        textAlign: "center",
                        borderRadius: "20px",
                        padding: "6px 9px",
                        cursor: "pointer",
                      }}
                    >
                      Added Items ({MyCartItems.length || 0})
                    </div>
                  </div>
                  {categoryData.map((item, index) => (
                    <div className="col-md-3 col-6 pb-3" key={index}>
                      <div
                        onClick={() => handleCategoryClick(item.category)}
                        className="poppins-regular"
                        style={{
                          border: "1px solid grey",
                          textAlign: "center",
                          borderRadius: "20px",
                          padding: "6px 9px",
                          cursor: "pointer",
                          color:
                            activeCategory === item.category
                              ? "white"
                              : "black",
                          backgroundColor:
                            activeCategory === item.category
                              ? "#FF8343"
                              : "transparent",
                        }}
                      >
                        {item.category}
                      </div>
                    </div>
                  ))}
                </div>

                {/* <div
                  className="row m-auto p-3 border mt-3"
                  style={{
                    borderRadius: "10px",
                    height: "70vh",
                    overflowY: "scroll",
                  }}
                >
                  <div>
                    {Object.entries(groupedItems).map(
                      ([category, subcategories], catIndex) => (
                        <div key={catIndex} style={{ marginBottom: "20px" }}>
                          <h2
                            key={catIndex}
                            ref={(el) => (categoryRefs.current[category] = el)}
                            className="poppins-black"
                            style={{ color: "darkred" }}
                          >
                            {category}
                          </h2>
                          {Object.entries(subcategories).map(
                            ([subcategory, items], subIndex) => (
                              <div key={subIndex}>
                                <div
                                  onClick={() =>
                                    handleSubcategoryClick(subcategory)
                                  }
                                  className="poppins-regular"
                                  style={{
                                    backgroundColor: "white",
                                    borderRadius: "5px",
                                    padding: "10px",
                                    border: "1px solid lightgrey",
                                    marginBottom: "10px",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                  }}
                                >
                                  {subcategory}

                                  {activeSubcategory === subcategory &&
                                    items.map((item) => (
                                      <div
                                        className="d-flex mt-2"
                                        style={{
                                          borderBottom: "1px solid lightgrey",
                                          borderBottomStyle: "dashed",
                                        }}
                                        key={item._id}
                                      >
                                        <div
                                          className="col-md-8 p-2"
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                            borderRadius: "5px",
                                          }}
                                        >
                                          <div className="poppins-regular">
                                            {item.itemname}
                                          </div>
                                        </div>
                                        <div className="col-md-4 p-2">
                                          <div
                                            className="d-flex"
                                            style={{ justifyContent: "end" }}
                                          >
                                            {MyCartItems.find(
                                              (i) => i.id === item._id
                                            ) ? (
                                              <div
                                                className="row"
                                                style={{
                                                  justifyContent: "center",
                                                }}
                                              >
                                                <div className="col-md-3 ">
                                                  <i
                                                    onClick={() =>
                                                      handleDecrementQuantity(
                                                        item
                                                      )
                                                    }
                                                    className="fa-solid fa-minus"
                                                    style={{
                                                      fontSize: "16px",
                                                      border: "1px solid black",
                                                      padding: "5px",
                                                      textAlign: "center",
                                                    }}
                                                  ></i>
                                                </div>
                                                <div className="col-md-2">
                                                  <div className="poppins-regular text-center mx-1 mt-1">
                                                    {MyCartItems.find(
                                                      (i) => i.id === item._id
                                                    )?.qty || 0}
                                                  </div>
                                                </div>
                                                <div
                                                  className="col-md-3 d-flex"
                                                  style={{
                                                    alignItems: "flex-start",
                                                  }}
                                                >
                                                  <i
                                                    onClick={() =>
                                                      handleIncrementQuantity(
                                                        item
                                                      )
                                                    }
                                                    className="fa-solid fa-plus"
                                                    style={{
                                                      fontSize: "16px",
                                                      border: "1px solid black",
                                                      padding: "5px",
                                                    }}
                                                  ></i>
                                                </div>
                                              </div>
                                            ) : (
                                              <div
                                                className="poppins-regular"
                                                style={{
                                                  backgroundColor: "green",
                                                  color: "white",
                                                  textAlign: "center",
                                                  padding: "5px",
                                                  borderRadius: "10px",
                                                  width: "78px",
                                                  cursor: "pointer",
                                                }}
                                                onClick={() =>
                                                  handleAddToCart(
                                                    item,
                                                    category,
                                                    subcategory
                                                  )
                                                }
                                              >
                                                Add
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                </div>
                              
                              </div>
                            )
                          )}
                        </div>
                      )
                    )}
                  </div>
                </div> */}

                <div
                  className="row m-auto p-3 border mt-3"
                  style={{
                    borderRadius: "10px",
                    height: "auto",
                    // overflowY: "scroll",
                  }}
                >
                  <div>
                    {Object.entries(groupedItems)
                      // Show all categories if no category is clicked, otherwise filter by activeCategory
                      .filter(
                        ([category]) =>
                          !activeCategory || activeCategory === category
                      )
                      .map(([category, subcategories], catIndex) => (
                        <div key={catIndex} style={{ marginBottom: "20px" }}>
                          <h2
                            ref={(el) => (categoryRefs.current[category] = el)}
                            className="poppins-black"
                            style={{ color: "darkred" }}
                          >
                            {category}
                          </h2>

                          {/* Subcategories */}
                          {Object.entries(subcategories).map(
                            ([subcategory, items], subIndex) => (
                              <div key={subIndex}>
                                <div
                                  onClick={() =>
                                    handleSubcategoryClick(subcategory)
                                  }
                                  className="poppins-regular"
                                  style={{
                                    backgroundColor: "white",
                                    borderRadius: "5px",
                                    padding: "10px",
                                    border: "1px solid lightgrey",
                                    marginBottom: "10px",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                  }}
                                >
                                  {subcategory}

                                  {/* Display items if the subcategory is active */}
                                  {activeSubcategory === subcategory &&
                                    items.map((item) => (
                                      <div
                                        className="d-flex mt-2"
                                        style={{
                                          borderBottom: "1px solid lightgrey",
                                          borderBottomStyle: "dashed",
                                          justifyContent: "space-between",
                                        }}
                                        key={item._id}
                                      >
                                        <div
                                          className="col-md-8 p-2"
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                            borderRadius: "5px",
                                          }}
                                        >
                                          <div className="poppins-regular">
                                            {item.itemname}
                                          </div>
                                        </div>
                                        <div className="col-md-4 p-2">
                                          <div
                                            className="d-flex"
                                            style={{ justifyContent: "end" }}
                                          >
                                            {MyCartItems.find(
                                              (i) => i.id === item._id
                                            ) ? (
                                              <div
                                                className="d-flex"
                                                style={{
                                                  justifyContent:
                                                    "space-between",
                                                }}
                                              >
                                                <div className="col-md-3 ">
                                                  <i
                                                    onClick={() =>
                                                      handleDecrementQuantity(
                                                        item
                                                      )
                                                    }
                                                    className="fa-solid fa-minus"
                                                    style={{
                                                      fontSize: "16px",
                                                      border: "1px solid black",
                                                      padding: "5px",
                                                      textAlign: "center",
                                                    }}
                                                  ></i>
                                                </div>
                                                <div className="col-md-2">
                                                  <div className="poppins-regular text-center mx-1 mt-1 px-1">
                                                    {MyCartItems.find(
                                                      (i) => i.id === item._id
                                                    )?.qty || 0}
                                                  </div>
                                                </div>
                                                <div
                                                  className="col-md-3 d-flex"
                                                  style={{
                                                    alignItems: "flex-start",
                                                  }}
                                                >
                                                  <i
                                                    onClick={() =>
                                                      handleIncrementQuantity(
                                                        item
                                                      )
                                                    }
                                                    className="fa-solid fa-plus"
                                                    style={{
                                                      fontSize: "16px",
                                                      border: "1px solid black",
                                                      padding: "5px",
                                                    }}
                                                  ></i>
                                                </div>
                                              </div>
                                            ) : (
                                              <div
                                                className="poppins-regular"
                                                style={{
                                                  backgroundColor: "green",
                                                  color: "white",
                                                  textAlign: "center",
                                                  padding: "5px",
                                                  borderRadius: "10px",
                                                  width: "78px",
                                                  cursor: "pointer",
                                                }}
                                                onClick={() =>
                                                  handleAddToCart(
                                                    item,
                                                    category,
                                                    subcategory
                                                  )
                                                }
                                              >
                                                Add
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      ))}
                  </div>
                </div>

                <div
                  onClick={handleShow4}
                  className="d-flex mt-3"
                  style={{
                    backgroundColor: "aliceblue",
                    padding: "10px",
                    borderRadius: "5px",
                    justifyContent: "space-between",
                    cursor: "pointer",
                  }}
                >
                  <div
                    className="poppins-regular mx-2"
                    style={{ color: "grey" }}
                  >
                    Get a video inspection for{" "}
                    <span
                      className="poppins-regular"
                      style={{
                        backgroundColor: "green",
                        padding: "3px",
                        color: "white",
                        borderRadius: "5px",
                      }}
                    >
                      Free
                    </span>
                  </div>
                  <i
                    className="fa-solid fa-circle-arrow-right"
                    style={{ fontSize: "18px" }}
                  ></i>
                </div>

                <div
                  className="d-flex p-3"
                  style={{ justifyContent: "space-between" }}
                >
                  <div className="col-md-9 " style={{ alignItems: "center" }}>
                    <div
                      className="poppins-black"
                      style={{ cursor: "pointer" }}
                    >
                      Total Items ({MyCartItems.length || 0})
                    </div>{" "}
                    <div
                      onClick={handleShow2}
                      className="poppins-black pt-2"
                      style={{ color: "skyblue", cursor: "pointer" }}
                    >
                      View All{" "}
                      <span className="mx-1">
                        <i
                          className="fa-solid fa-greater-than"
                          style={{ color: "skyblue", fontSize: "13px" }}
                        ></i>
                      </span>
                    </div>
                  </div>
                  <div className="col-md-3 ">
                    <div
                      onClick={handleContinueClick}
                      className="poppins-black"
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        textAlign: "center",
                        padding: "5px",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Continue
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div
                  className="shadow-sm p-3  mt-3"
                  style={{
                    borderRadius: "10px",
                    height: "auto",
                    border: "2px solid darkred",
                  }}
                >
                  <div className="poppins-black">Address</div>

                  <div className="d-flex mt-3">
                    <div
                      className="col-md-1 d-flex"
                      style={{ alignItems: "center" }}
                    >
                      <i
                        className="fa-solid fa-location-crosshairs"
                        style={{ fontSize: "20px", color: "green" }}
                      ></i>
                    </div>
                    <div className="col-md-11 px-1">
                      <div
                        className="poppins-regular"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          color: "green",
                        }}
                      >
                        {pickupLocation}
                      </div>
                    </div>
                  </div>

                  <div
                    className=""
                    style={{
                      borderLeft: "1px solid grey",
                      height: "31px",
                      borderLeftStyle: "dashed",
                      marginLeft: "10px",
                      position: "absolute",
                    }}
                  ></div>

                  <div className="d-flex mt-4 pt-2">
                    <div
                      className="col-md-1 d-flex"
                      style={{ alignItems: "center" }}
                    >
                      <i
                        className="fa-solid fa-location-crosshairs"
                        style={{ fontSize: "20px", color: "red" }}
                      ></i>
                    </div>
                    <div className="col-md-11 px-1">
                      <div
                        className="poppins-regular"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          color: "red",
                        }}
                      >
                        {dropLocation}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex mt-4">
                  <div className="col-md-10">
                    <div
                      className="poppins-regular"
                      style={{ fontWeight: "bold" }}
                    >
                      Service lift available at pickup
                    </div>
                    <div className="poppins-regular" style={{ color: "grey" }}>
                      A working service lift will reduce the overall quote
                    </div>
                  </div>
                  <div className="col-md-2">
                    <Switch
                      checked={pickupfloor}
                      onChange={handlepickupfloor}
                      onColor="#86d3ff"
                      onHandleColor="#2693e6"
                      handleDiameter={20}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                      activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                      height={20}
                      width={48}
                    />
                  </div>
                </div>

                {pickupfloor && (
                  <div className="mt-3">
                    <input
                      type="text"
                      className="form-control poppins-regular"
                      placeholder="Floor Number"
                      value={pickupfloornumber}
                      onChange={(e) => setpickupfloornumber(e.target.value)}
                    />
                  </div>
                )}

                <div className="d-flex mt-4">
                  <div className="col-md-10">
                    <div
                      className="poppins-regular"
                      style={{ fontWeight: "bold" }}
                    >
                      Service lift available at drop
                    </div>
                    <div className="poppins-regular" style={{ color: "grey" }}>
                      A working service lift will reduce the overall quote
                    </div>
                  </div>
                  <div className="col-md-2">
                    <Switch
                      checked={dropfloor}
                      onChange={handledropfloor}
                      onColor="#86d3ff"
                      onHandleColor="#2693e6"
                      handleDiameter={20}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                      activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                      height={20}
                      width={48}
                    />
                  </div>
                </div>

                {dropfloor && (
                  <div className="mt-3">
                    <input
                      type="text"
                      className="form-control poppins-regular"
                      placeholder="Floor Number"
                      value={dropfloornumber}
                      onChange={(e) => setdropfloornumber(e.target.value)}
                    />
                  </div>
                )}

                <div className="row">
                  <div className="col-md-12">
                    <div
                      className="shadow-sm p-3 mb-3 mt-3"
                      style={{ borderRadius: "10px" }}
                    >
                      <div
                        className="d-flex"
                        style={{ justifyContent: "space-between" }}
                      >
                        <div className="col-md-8">
                          <div className="poppins-black">Base Price</div>
                        </div>
                        <div className="col-md-4">
                          <div
                            className="poppins-black text-end"
                            style={{ color: "green" }}
                          >
                            ₹ {displayGrandTotal.toFixed(0)}
                          </div>
                        </div>
                      </div>

                      <div
                        className="d-flex mt-3"
                        style={{ alignItems: "center" }}
                      >
                        <i
                          className="fa-solid fa-circle-check"
                          style={{ color: "green", fontSize: "14px" }}
                        ></i>
                        <div className="poppins-regular ms-2">
                          Friendly and professional movers
                        </div>
                      </div>

                      <div
                        className="d-flex mt-3"
                        style={{ alignItems: "center" }}
                      >
                        <i
                          className="fa-solid fa-circle-check"
                          style={{ color: "green", fontSize: "14px" }}
                        ></i>
                        <div className="poppins-regular ms-2">
                          Loading and unloading included
                        </div>
                      </div>

                      <div
                        className="d-flex mt-3"
                        style={{ alignItems: "center" }}
                      >
                        <i
                          className="fa-solid fa-circle-check"
                          style={{ color: "green", fontSize: "14px" }}
                        ></i>
                        <div className="poppins-regular ms-2">
                          Transport items safely with a dedicated vehicle
                        </div>
                      </div>
                      <div
                        className="d-flex mt-3"
                        style={{ alignItems: "center" }}
                      >
                        <i
                          className="fa-solid fa-circle-check"
                          style={{ color: "green", fontSize: "14px" }}
                        ></i>
                        <div className="poppins-regular ms-2">
                          Rearrangement of big items
                        </div>
                      </div>

                      <div className="poppins-black mt-3">
                        Recommended add ons for you
                      </div>

                      <div
                        className="d-flex pt-2"
                        style={{ justifyContent: "space-between" }}
                      >
                        <div className="col-md-8">
                          <div className="poppins-regular">
                            Single-layer packing
                          </div>
                          <div className="poppins-regular">₹ {packingAmt}</div>
                        </div>
                        <div
                          className="col-md-4 d-flex"
                          style={{ justifyContent: "end" }}
                        >
                          <Switch
                            checked={singleLayer}
                            onChange={singleLayerSwitch}
                            onColor="#86d3ff"
                            onHandleColor="#2693e6"
                            handleDiameter={20}
                            uncheckedIcon={false}
                            checkedIcon={false}
                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                            height={20}
                            width={48}
                          />
                        </div>
                      </div>
                      <div
                        className="d-flex pt-3"
                        style={{ justifyContent: "space-between" }}
                      >
                        <div className="col-md-8">
                          <div className="poppins-regular">
                            Multi-layer packing
                          </div>
                          <div className="poppins-regular">
                            ₹ {packingAmt * 2}
                          </div>
                        </div>
                        <div
                          className="col-md-4 d-flex"
                          style={{ justifyContent: "end" }}
                        >
                          <Switch
                            checked={multilayer}
                            onChange={multilayerSwitch}
                            onColor="#86d3ff"
                            onHandleColor="#2693e6"
                            handleDiameter={20}
                            uncheckedIcon={false}
                            checkedIcon={false}
                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                            height={20}
                            width={48}
                          />
                        </div>
                      </div>

                      <div
                        className="d-flex pt-3"
                        style={{ justifyContent: "space-between" }}
                      >
                        <div className="col-md-8">
                          <div className="poppins-regular">
                            Unpacking all the packed items{" "}
                          </div>
                          <div className="poppins-regular">₹ {packingAmt}</div>
                        </div>
                        <div
                          className="col-md-4 d-flex"
                          style={{ justifyContent: "end" }}
                        >
                          <Switch
                            checked={unpacking}
                            onChange={unpackingSwitch}
                            onColor="#86d3ff"
                            onHandleColor="#2693e6"
                            handleDiameter={20}
                            uncheckedIcon={false}
                            checkedIcon={false}
                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                            height={20}
                            width={48}
                          />
                        </div>
                      </div>

                      <div
                        className="d-flex pt-3"
                        style={{ justifyContent: "space-between" }}
                      >
                        <div className="col-md-8">
                          <div className="poppins-regular">
                            {" "}
                            Dismantling and reassembly of basic
                          </div>
                          <div className="poppins-regular">₹ {packingAmt}</div>
                        </div>
                        <div
                          className="col-md-4 d-flex"
                          style={{ justifyContent: "end" }}
                        >
                          <Switch
                            checked={dismantling}
                            onChange={dismantlingSwitch}
                            onColor="#86d3ff"
                            onHandleColor="#2693e6"
                            handleDiameter={20}
                            uncheckedIcon={false}
                            checkedIcon={false}
                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                            height={20}
                            width={48}
                          />
                        </div>
                      </div>

                      <div
                        className="poppins-regular mt-4"
                        style={{
                          backgroundColor: "green",
                          padding: "5px",
                          borderRadius: "5px",
                          color: "white",
                        }}
                      >
                        <span>
                          <i
                            className="fa-solid fa-circle-info mx-2"
                            style={{ color: "white", fontSize: "14px" }}
                          ></i>
                        </span>
                        Pay booking amount of 99 to place the order
                      </div>

                      <div
                        className="d-flex p-3"
                        style={{ justifyContent: "space-between" }}
                      >
                        <div
                          className="col-md-9 d-flex"
                          style={{ alignItems: "center" }}
                        >
                          <div
                            className="poppins-black"
                            onClick={handleShow}
                            style={{ cursor: "pointer" }}
                          >
                            ₹ {displayGrandTotal.toFixed(0)}
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div
                            onClick={handleContinueClick}
                            className="poppins-black"
                            style={{
                              backgroundColor: "red",
                              color: "white",
                              textAlign: "center",
                              padding: "5px 10px",
                              borderRadius: "5px",
                              cursor: "pointer",
                            }}
                          >
                            Next
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    {/* <div className="poppins-black">Packers Movers Page</div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="container">
            <div className="row p-4 mb-5" style={{ justifyContent: "center" }}>
              <div
                className="col-md-7 shadow-sm  p-3"
                style={{ borderRadius: "10px" }}
              >
                <div className="d-flex">
                  <div className="d-flex" style={{ alignItems: "center" }}>
                    <i
                      className="fa-solid fa-arrow-left"
                      style={{ fontSize: "18px", color: "darkred" }}
                    ></i>
                  </div>
                  <div className="poppins-black mx-3">Booking Page</div>
                </div>

                <div className="d-flex mt-3">
                  <div
                    className="col-md-1 d-flex"
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <i
                      className="fa-solid fa-location-crosshairs"
                      style={{ fontSize: "20px", color: "green" }}
                    ></i>
                  </div>
                  <div className="col-md-11 px-1">
                    <div
                      className="poppins-regular"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        color: "green",
                      }}
                    >
                      {pickupLocation}
                    </div>
                  </div>
                </div>

                <div
                  className=""
                  style={{
                    borderLeft: "1px solid grey",
                    height: "31px",
                    borderLeftStyle: "dashed",
                    marginLeft: "25px",
                    position: "absolute",
                  }}
                ></div>

                <div className="d-flex mt-4 pt-2">
                  <div
                    className="col-md-1 d-flex"
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <i
                      className="fa-solid fa-location-crosshairs"
                      style={{ fontSize: "20px", color: "red" }}
                    ></i>
                  </div>
                  <div className="col-md-11 px-1">
                    <div
                      className="poppins-regular"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        color: "red",
                      }}
                    >
                      {dropLocation}
                    </div>
                  </div>
                </div>

                <div
                  className="d-flex mt-3"
                  style={{
                    backgroundColor: "aliceblue",
                    padding: "10px",
                    borderRadius: "5px",
                    justifyContent: "space-between",
                  }}
                >
                  <div className="col-md-9">
                    <div
                      onClick={() => setvisible(false)}
                      className="poppins-regular"
                      style={{ fontWeight: "bold" }}
                    >
                      {MyCartItems.length} Items added
                    </div>
                  </div>
                  <div
                    className="col-md-3 d-flex"
                    style={{ justifyContent: "end", alignItems: "center" }}
                  >
                    <div onClick={() => setvisible(false)}>
                      <i
                        style={{ fontSize: "14px", color: "black" }}
                        className="fa-solid fa-greater-than"
                      ></i>
                    </div>
                  </div>
                </div>

                <div
                  className="poppins-regular mt-3"
                  style={{ fontWeight: "bold" }}
                >
                  AddOns
                </div>

                <div className="row">
                  <div className="">
                    <Swiper
                      slidesPerView={slidesPerView}
                      spaceBetween={30}
                      freeMode={true}
                      pagination={{ clickable: true }}
                      autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                      }}
                      modules={[FreeMode, Pagination, Autoplay]}
                      className="mySwiper"
                      style={{
                        width: "100%", // Make sure the Swiper takes full width
                        height: "auto", // Adjust height as per your design
                        padding: "10px", // Add padding for better layout
                      }}
                    >
                      {alladdons.map((item) => (
                        <SwiperSlide key={item._id}>
                          <div className="d-flex flex-column align-items-center">
                            <img
                              src={item.imgUrl}
                              alt={`${item.name} images`}
                              className=""
                              style={{
                                borderRadius: "10px",
                              }}
                            />
                            <div className="poppins-regular mt-2">
                              {item.name}
                            </div>

                            <div className="d-flex">
                              {item.price ? (
                                <div
                                  className="poppins-regular"
                                  style={{
                                    color: "grey",
                                    textDecoration: "line-through",
                                  }}
                                >
                                  ₹ {item.price}
                                </div>
                              ) : (
                                <></>
                              )}

                              <div
                                className="poppins-regular mx-2"
                                style={{
                                  color: "black",
                                  fontWeight: "bold",
                                }}
                              >
                                ₹ {item.offerPrice}
                              </div>
                            </div>

                            {PMAddonsItems.find((i) => i.id === item?._id) ? (
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  gap: "15px",
                                  backgroundColor: "#57d357",
                                  // padding: "5px",
                                  borderRadius: "3px",
                                  marginTop: "5px",
                                  padding: "0px 10px",
                                }}
                              >
                                <div
                                  onClick={() => {
                                    const cartItem = PMAddonsItems.find(
                                      (i) => i.id === item?._id
                                    );
                                    if (cartItem.qty > 1) {
                                      dispatch(
                                        removePMAddonsCartItems(cartItem)
                                      );
                                    } else {
                                      dispatch(
                                        deletePMAddonsCartItems(cartItem.id)
                                      );
                                    }
                                  }}
                                  style={{
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                  }}
                                >
                                  <i
                                    className="fa-solid fa-minus"
                                    style={{
                                      fontSize: "20px",
                                    }}
                                  ></i>
                                </div>
                                <span
                                  className="poppins-regular"
                                  style={{
                                    color: "white",
                                    // fontSize: "16px",
                                    fontWeight: "bold",
                                    marginTop: "4px",
                                  }}
                                >
                                  {
                                    PMAddonsItems.find((i) => i.id === item._id)
                                      ?.qty
                                  }
                                </span>
                                <div
                                  onClick={() => handleAddToCartaddons(item)}
                                  style={{
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    marginTop: "-2px",
                                  }}
                                >
                                  <i
                                    className="fa-solid fa-plus"
                                    style={{
                                      fontSize: "16px",
                                    }}
                                  ></i>
                                </div>
                              </div>
                            ) : (
                              <div
                                onClick={() => handleAddToCartaddons(item)}
                                className="poppins-regular"
                                style={{
                                  color: "green",
                                  border: "1px solid green",
                                  padding: "3px 25px",
                                  borderRadius: "5px",
                                  fontWeight: "bold",
                                  marginTop: "5px",
                                }}
                              >
                                Add
                              </div>
                            )}
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>

                <div className="d-flex">
                  <div className="col-md-10">
                    <i
                      className="fa-solid fa-code"
                      style={{
                        fontSize: "15px",
                        color: "green",
                        position: "absolute",
                        marginTop: "30px",
                        marginLeft: "10px",
                      }}
                    ></i>

                    <input
                      type="text"
                      placeholder="Enter referral or coupon code"
                      className="poppins-regular mt-3 pm-input"
                      value={couponCode}
                      onChange={(e) => setcouponCode(e.target.value)}
                    />
                  </div>
                  <div
                    className="col-md-2 px-2 "
                    style={{ alignItems: "center" }}
                  >
                    <div
                      className="poppins-regular"
                      style={{
                        color: "green",
                        // position: "absolute",
                        // marginTop: "27px",
                        // marginLeft: "540px",
                        backgroundColor: "green",
                        cursor: "pointer",
                        color: "white",
                        textAlign: "center",
                        height: "40px",
                        marginTop: "15px",
                        paddingTop: "10px",
                        borderRadius: "10px",
                        width: "100%",
                        padding: "10px",
                      }}
                      onClick={applyCoupon}
                    >
                      APPLY
                    </div>
                  </div>
                </div>

                <div className="poppins-black">Payment Summary</div>
                <div
                  className="d-flex mt-3"
                  style={{ justifyContent: "space-between" }}
                >
                  <div className="col-md-8">
                    <div className="poppins-regular">Quoted amount</div>
                  </div>
                  <div className="col-md-4">
                    <div className="poppins-regular text-end">
                      ₹{" "}
                      {appliedValue !== null
                        ? appliedValue.toFixed(0)
                        : GrandTotal.toFixed(0)}
                    </div>{" "}
                  </div>
                </div>

                <div
                  className="d-flex mt-3"
                  style={{ justifyContent: "space-between" }}
                >
                  <div className="col-md-8">
                    <div
                      className="poppins-regular"
                      style={{ fontWeight: "bold" }}
                    >
                      Packers and Movers Service
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div
                      className="poppins-regular text-end"
                      style={{ fontWeight: "bold" }}
                    >
                      ₹{" "}
                      {/* {appliedValue !== null
                        ? (appliedValue - 99).toFixed(0)
                        : (GrandTotal - 99).toFixed(0)} */}
                      {appliedValue !== null
                        ? appliedValue.toFixed(0)
                        : GrandTotal.toFixed(0)}
                    </div>{" "}
                  </div>
                </div>

                {PMAddonsItems.filter(
                  (item) => item.qty > 0 && item.offerPrice > 0
                ) // Filter out items with qty or offerPrice equal to 0
                  .map((item) => (
                    <div
                      className="d-flex mt-3"
                      style={{ justifyContent: "space-between" }}
                      key={item.id} // Ensure you have a unique key for each item
                    >
                      <div
                        className="poppins-regular"
                        style={{ color: "black" }}
                      >
                        {item.name}
                      </div>
                      <div
                        className="poppins-regular"
                        style={{ color: "black" }}
                      >
                        ₹{item.qty * item.offerPrice}
                      </div>
                    </div>
                  ))}

                <div
                  className="d-flex mt-3"
                  style={{ justifyContent: "space-between" }}
                >
                  <div className="col-md-8">
                    <div
                      className="poppins-regular"
                      style={{ fontWeight: "bold" }}
                    >
                      Total amount to be paid
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div
                      className="poppins-regular text-end"
                      style={{ fontWeight: "bold" }}
                    >
                      ₹ {GrandTotal + PMAddonstotal}
                    </div>{" "}
                  </div>
                </div>

                {/* <div className="d-flex mt-3">
                  <div className="col-md-8">
                    <div
                      className="poppins-regular"
                      style={{ fontWeight: "bold" }}
                    >
                      Booking amount
                    </div>
                    <div
                      className="poppins-extralight"
                      style={{ color: "grey" }}
                    >
                      An adjustable amount of Rs.99 needs to be paid for order
                      confirmation
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div
                      className="poppins-regular text-end"
                      style={{ fontWeight: "bold" }}
                    >
                      ₹ 99
                    </div>{" "}
                  </div>
                </div> */}

                <div className="d-flex poppins-regular mt-3">
                  By proceeding you accept the{" "}
                  <span
                    onClick={handleShow3}
                    className=" poppins-regular mx-1"
                    style={{
                      textDecorationLine: "underline",
                      color: "orange",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    {" "}
                    Terms & Conditions
                  </span>
                </div>

                <div
                  onClick={handleShow1}
                  className="d-flex mt-3"
                  style={{
                    backgroundColor: "aliceblue",
                    padding: "10px",
                    justifyContent: "space-between",
                    borderRadius: "5px",
                  }}
                >
                  <div className="poppins-regular">
                    <span>
                      <i
                        className="fa-solid fa-calendar-days"
                        style={{ fontSize: "14px" }}
                      ></i>
                    </span>{" "}
                    Shifting on
                    <span className="mx-1">
                      {selectedDate === null ? shiftingdate : selectedDate}
                    </span>
                  </div>
                  <i
                    className="fa-solid fa-pen-to-square"
                    style={{ color: "black", fontSize: "14px" }}
                  ></i>
                </div>

                <div
                  onClick={handleSubmit1}
                  className="poppins-black text-center mt-3"
                  style={{
                    backgroundColor: "orange",
                    padding: "8px",
                    borderRadius: "5px",
                    borderRadius: "5px",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Pay Now
                </div>

                <Modal
                  size="lg"
                  show={show3}
                  onHide={handleClose3}
                  centered
                  animation={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title className="poppins-black">
                      Term and Conditions
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="poppins-black">
                      Booking Details and Modifications
                    </div>

                    <div
                      className="poppins-regular mt-2 mb-1"
                      style={{ color: "black", fontWeight: "600" }}
                    >
                      1. Quotation and Changes:
                    </div>
                    <div
                      className="poppins-extralight mb-1"
                      style={{ color: "grey" }}
                    >
                      • The provided quotation is based on the details provided
                      by the customer, including the material list, movement
                      date, and distance.
                    </div>
                    <div
                      className="poppins-extralight mb-1"
                      style={{ color: "grey" }}
                    >
                      • If there are any deviations in the material list,
                      movement date, or distance, a revised quotation will be
                      offered based on the changes.
                    </div>

                    <div
                      className="poppins-extralight mb-1"
                      style={{ color: "grey" }}
                    >
                      • For any revised quotation, the customer is expected to
                      contact VHS customer care directly at 918453748478.
                    </div>

                    <div
                      className="poppins-regular mt-2 mb-1"
                      style={{ color: "black", fontWeight: "600" }}
                    >
                      2. Cancellation:
                    </div>
                    <div
                      className="poppins-extralight mb-1"
                      style={{ color: "grey" }}
                    >
                      • Free cancellation is allowed up to 24 hours before the
                      scheduled shifting slot.
                    </div>
                    <div
                      className="poppins-extralight mb-1"
                      style={{ color: "grey" }}
                    >
                      • If the cancellation is made after this timeframe, the
                      booking amount will be forfeited.
                    </div>

                    <div
                      className="poppins-regular mt-2 mb-1"
                      style={{ color: "black", fontWeight: "600" }}
                    >
                      3. Partner Assignment and Details:
                    </div>
                    <div
                      className="poppins-extralight mb-1"
                      style={{ color: "grey" }}
                    >
                      • For advance bookings, the partner will be assigned
                      roughly 24 hours before the scheduled shifting.
                    </div>
                    <div
                      className="poppins-extralight mb-1"
                      style={{ color: "grey" }}
                    >
                      • The details of the partner will be shared 1 hour prior
                      to the shifting time slot.
                    </div>

                    <div
                      className="poppins-regular mt-2 mb-1"
                      style={{ color: "black", fontWeight: "600" }}
                    >
                      4. Packing Material:
                    </div>
                    <div
                      className="poppins-extralight mb-1"
                      style={{ color: "grey" }}
                    >
                      • The Partner has the right to collect all the packing
                      material after the shifting is over.
                    </div>
                    <div
                      className="poppins-extralight mb-1"
                      style={{ color: "grey" }}
                    >
                      • If you wish to retain any carton boxes, you can do so by
                      paying Rs. 60 per box.
                    </div>

                    <div
                      className="poppins-regular mt-2 mb-1"
                      style={{ color: "black", fontWeight: "600" }}
                    >
                      5. Price and Taxes:
                    </div>
                    <div
                      className="poppins-extralight mb-1"
                      style={{ color: "grey" }}
                    >
                      • The price mentioned in the quotation is inclusive of any
                      applicable taxes.
                    </div>
                    <div
                      className="poppins-extralight mb-1"
                      style={{ color: "grey" }}
                    >
                      • Please note that the price is subject to change based on
                      slot availability at the time of any modification.
                    </div>

                    <div
                      className="poppins-regular mt-2 mb-1"
                      style={{ color: "black", fontWeight: "600" }}
                    >
                      6. Warehousing:
                    </div>
                    <div
                      className="poppins-extralight mb-1"
                      style={{ color: "grey" }}
                    >
                      • Warehousing facilities can be provided at an additional
                      cost of Rs. 300 per day, subject to availability.
                    </div>

                    <div className="poppins-black mt-1">
                      Payment Guidelines:
                    </div>

                    <div
                      className="poppins-regular mt-2 mb-1"
                      style={{ color: "black", fontWeight: "600" }}
                    >
                      1. Within City and Outstation Orders:
                    </div>
                    <div
                      className="poppins-extralight mb-1"
                      style={{ color: "grey" }}
                    >
                      • The remaining amount should be paid to the Partner at
                      the destination once the shifting is completed.
                    </div>

                    <div
                      className="poppins-regular mt-2 mb-1"
                      style={{ color: "black", fontWeight: "600" }}
                    >
                      2. Intercity Orders:
                    </div>
                    <div
                      className="poppins-extralight mb-1"
                      style={{ color: "grey" }}
                    >
                      • 80% of the remaining amount, after the booking amount
                      has been paid, should be paid at the time of packing and
                      loading at the pickup location.
                    </div>
                    <div
                      className="poppins-extralight mb-1"
                      style={{ color: "grey" }}
                    >
                      • The remaining 20% should be paid at the destination
                      before unloading on the date of delivery.
                    </div>

                    <div className="poppins-black mt-1">
                      Goods and Items Details:
                    </div>

                    <div
                      className="poppins-regular mt-2 mb-1"
                      style={{ color: "black", fontWeight: "600" }}
                    >
                      1. Packaging:
                    </div>
                    <div
                      className="poppins-extralight mb-1"
                      style={{ color: "grey" }}
                    >
                      • Electronic items, furniture, and fragile goods must be
                      packed using multi-layer packaging for added protection.
                      We highly recommend customers opt for this option.
                    </div>
                    <div
                      className="poppins-extralight mb-1"
                      style={{ color: "grey" }}
                    >
                      • Any damages occurring to goods that were not packaged or
                      had single-layer packaging are not the responsibility of
                      VHS, either partially or in full.
                    </div>

                    <div
                      className="poppins-regular mt-2 mb-1"
                      style={{ color: "black", fontWeight: "600" }}
                    >
                      2. Refrigerators:
                    </div>
                    <div
                      className="poppins-extralight mb-1"
                      style={{ color: "grey" }}
                    >
                      • Prior to packing, refrigerators must be defrosted at
                      least 24 hours in advance to prevent water seepage during
                      transportation.
                    </div>

                    <div
                      className="poppins-regular mt-2 mb-1"
                      style={{ color: "black", fontWeight: "600" }}
                    >
                      3. Restricted Items:
                    </div>
                    <div
                      className="poppins-extralight mb-1"
                      style={{ color: "grey" }}
                    >
                      • The following goods are not acceptable for movement:
                      jewelry, arms and ammunition, hazardous materials such as
                      crackers, explosives, chemicals, battery acids,
                      inflammable oils (e.g., diesel, petrol, kerosene,
                      gasoline), narcotics, and counterfeit items.
                    </div>

                    <div
                      className="poppins-extralight mb-1"
                      style={{ color: "grey" }}
                    >
                      • Please keep all valuable items like cash and jewelry
                      under your custody before the shifting process begins.
                    </div>

                    <div
                      className="poppins-regular mt-2 mb-1"
                      style={{ color: "black", fontWeight: "600" }}
                    >
                      4. Technical Assistance:
                    </div>
                    <div
                      className="poppins-extralight mb-1"
                      style={{ color: "grey" }}
                    >
                      • If any machines, appliances, or electronic gadgets
                      require the technical assistance of the manufacturer or
                      their authorized dealer for locking/unlocking, it is the
                      customer's responsibility to arrange for this assistance.
                    </div>

                    <div
                      className="poppins-regular mt-2 mb-1"
                      style={{ color: "black", fontWeight: "600" }}
                    >
                      5. AC Uninstallation and Installation:
                    </div>
                    <div
                      className="poppins-extralight mb-1"
                      style={{ color: "grey" }}
                    >
                      • Charges for AC uninstallation and installation cover
                      only the service, and materials need to be purchased
                      separately, which are not included in the quote.
                    </div>
                    <div
                      className="poppins-extralight mb-1"
                      style={{ color: "grey" }}
                    >
                      • Assembling does not include pipes, gas filling, extra
                      wires, fittings, etc. These additional charges should be
                      borne by the customer.
                    </div>
                    <div
                      className="poppins-extralight mb-1"
                      style={{ color: "grey" }}
                    >
                      • VHS does not assume responsibility for any damage to
                      copper pipes during assembling and dismantling.
                    </div>

                    <div
                      className="poppins-regular mt-2 mb-1"
                      style={{ color: "black", fontWeight: "600" }}
                    >
                      6. Vehicle Movement:
                    </div>
                    <div
                      className="poppins-extralight mb-1"
                      style={{ color: "grey" }}
                    >
                      • For the movement of two-wheelers or four-wheelers, the
                      fuel tank should be completely emptied.
                    </div>
                    <div
                      className="poppins-extralight mb-1"
                      style={{ color: "grey" }}
                    >
                      • Customers are requested not to hand over any accessories
                      such as helmets or jackets along with the two-wheeler.
                      Claims regarding such accessories will not be entertained.
                    </div>
                    <div
                      className="poppins-extralight mb-1"
                      style={{ color: "grey" }}
                    >
                      • Please provide a copy of the RC book, insurance, and
                      pollution certificate for two-wheeler movement.
                    </div>

                    <div className="poppins-black mt-1">
                      Important Information:
                    </div>

                    <div
                      className="poppins-regular mt-2 mb-1"
                      style={{ color: "black", fontWeight: "600" }}
                    >
                      1. Delays and Restricted Entry:
                    </div>
                    <div
                      className="poppins-extralight mb-1"
                      style={{ color: "grey" }}
                    >
                      • Due to No Entry Hours in specific cities, restricted
                      movement, festival days, or peak days, there might be
                      delays in the arrival of the vehicle.
                    </div>
                    <div
                      className="poppins-extralight mb-1"
                      style={{ color: "grey" }}
                    >
                      • It is essential to be aware of the timings during which
                      external vehicles are allowed inside the premises. Some
                      societies have shifting restrictions in the morning,
                      evening, or on Sundays. Please check with the society
                      before the shifting date.
                    </div>
                    <div
                      className="poppins-extralight mb-1"
                      style={{ color: "grey" }}
                    >
                      • If any permissions are required, the customer should
                      take them in advance from the Resident Welfare
                      Association.
                    </div>

                    <div
                      className="poppins-regular mt-2 mb-1"
                      style={{ color: "black", fontWeight: "600" }}
                    >
                      2. Goods Transfer via Ropes:
                    </div>
                    <div
                      className="poppins-extralight mb-1"
                      style={{ color: "grey" }}
                    >
                      • If there is a need to transfer goods using ropes, the
                      decision to proceed with this method lies solely with the
                      customer subject to availability.
                    </div>
                    <div
                      className="poppins-extralight mb-1"
                      style={{ color: "grey" }}
                    >
                      • VHS will not be responsible for any damage to the goods
                      in such cases.
                    </div>

                    <div
                      className="poppins-regular mt-2 mb-1"
                      style={{ color: "black", fontWeight: "600" }}
                    >
                      3. Internal Damages and Packing:
                    </div>
                    <div
                      className="poppins-extralight mb-1"
                      style={{ color: "grey" }}
                    >
                      • VHS does not cover for any internal damages.
                    </div>
                    <div
                      className="poppins-extralight mb-1"
                      style={{ color: "grey" }}
                    >
                      • Damages to goods not packed by VHS's crew are not
                      covered by VHS.
                    </div>
                    <div
                      className="poppins-extralight mb-1"
                      style={{ color: "grey" }}
                    >
                      • Any other damage during the shifting process must be
                      reported to VHS Customer Care within 24 hours of shifting
                      completion. No cases or claims will be entertained if not
                      reported within this timeframe.
                    </div>

                    <div
                      className="poppins-regular mt-2 mb-1"
                      style={{ color: "black", fontWeight: "600" }}
                    >
                      4. Disputes and Changes:
                    </div>
                    <div
                      className="poppins-extralight mb-1"
                      style={{ color: "grey" }}
                    >
                      • VHS will not entertain disputes regarding aspects that
                      are not included in the quote and were not officially
                      communicated to the VHS Support team when changes were
                      made. It is important to get the quote updated
                      accordingly.
                    </div>

                    <div
                      className="poppins-regular mt-2 mb-1"
                      style={{ color: "black", fontWeight: "600" }}
                    >
                      5. Vehicle Type and Delivery Time:
                    </div>
                    <div
                      className="poppins-extralight mb-1"
                      style={{ color: "grey" }}
                    >
                      • The vehicle type sent to customers on the shifting date
                      is dependent solely on the Partner.
                    </div>
                    <div
                      className="poppins-extralight mb-1"
                      style={{ color: "grey" }}
                    >
                      • For intercity orders, the delivery time will vary
                      depending on the route and the type of service (Full Truck
                      Load or Part Truck Load). Customers are requested to refer
                      to the Delivery Time with the booking representative at
                      the time of booking.
                    </div>
                    <div
                      className="poppins-extralight mb-1"
                      style={{ color: "grey" }}
                    >
                      • Please note that there might be a deviation of up to 2
                      days from the expected delivery date.
                    </div>
                  </Modal.Body>
                </Modal>
              </div>
            </div>
          </div>
        </>
      )}

      <Modal show={show} centered onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className="poppins-black">
            Add Items {totalItems ? `(${totalItems})` : ""}
          </Modal.Title>
          <i
            onClick={handleClose}
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
          {MyCartItems.length > 0 ? (
            MyCartItems.map((item, index) => (
              <div
                className="d-flex mt-2"
                style={{
                  borderBottom:
                    index !== MyCartItems.length - 1
                      ? "1px solid lightgrey"
                      : "none",
                  justifyContent: "space-between",
                }}
                key={item.id}
              >
                <div className="col-md-8 pb-2">
                  <div className="poppins-regular">{item.itemname}</div>
                </div>
                <div
                  className="col-md-4 d-flex pb-2"
                  style={{ justifyContent: "end", gap: "10px" }}
                >
                  <div
                    className="col-md-5 d-flex"
                    style={{ justifyContent: "end" }}
                  >
                    <i
                      onClick={() =>
                        dispatch(
                          decrementQuantity({
                            id: item.id,
                          })
                        )
                      }
                      className="fa-solid fa-minus"
                      style={{
                        fontSize: "16px",
                        border: "1px solid black",
                        padding: "5px",
                      }}
                    ></i>
                  </div>

                  <div className="col-md-2">
                    <div className="poppins-black text-center mt-1">
                      {item.qty}
                    </div>
                  </div>
                  <div className="col-md-5">
                    <i
                      onClick={() =>
                        dispatch(
                          incrementQuantity({
                            id: item.id,
                          })
                        )
                      }
                      className="fa-solid fa-plus"
                      style={{
                        fontSize: "16px",
                        border: "1px solid black",
                        padding: "5px",
                        textAlign: "center",
                      }}
                    ></i>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="poppins-regular text-center mt-2">No Data</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            style={{ width: "100px", backgroundColor: "red" }}
            onClick={handleClose}
            className="poppins-black"
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show2} centered onHide={handleClose2}>
        <Modal.Header>
          <Modal.Title className="poppins-black">
            Add Items {totalItems ? `(${totalItems})` : ""}
          </Modal.Title>
          <i
            onClick={handleClose2}
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
          {MyCartItems.length > 0 ? (
            MyCartItems.map((item, index) => (
              <div
                className="d-flex mt-2"
                // style={{ justifyContent: "space-between" }}
                style={{
                  borderBottom:
                    index !== MyCartItems.length - 1
                      ? "1px solid lightgrey"
                      : "none",
                  justifyContent: "space-between",
                }}
                key={item.id}
              >
                <div className="col-md-8 pb-2">
                  <div className="poppins-regular">{item.itemname}</div>
                </div>
                <div
                  className="col-md-4 d-flex pb-2"
                  style={{ justifyContent: "end" }}
                >
                  <div className="poppins-black text-center mt-1">
                    {item.qty}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="poppins-regular text-center mt-2">No Data</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            style={{ width: "100px", backgroundColor: "red" }}
            onClick={handleClose2}
            className="poppins-black"
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show1} centered onHide={handleClose1}>
        <Modal.Header>
          <Modal.Title className="poppins-black">
            Confirm your shifting Date & Slot
          </Modal.Title>
          <i
            onClick={handleClose1}
            className="fa-solid fa-x shadow"
            style={{
              fontSize: "10px",
              backgroundColor: "red",
              color: "white",
              padding: "7px 9px",
              borderRadius: "50px",
              cursor: "pointer",
              position: "absolute",
              right: "20px",
            }}
          ></i>
        </Modal.Header>
        <Modal.Body className="">
          <div className="poppins-regular">Select Pickup Date</div>
          <div className="row p-3" style={{ justifyContent: "center" }}>
            {dates.map((date, index) => {
              const finalPrice = date.isWeekend
                ? (GrandTotal + 1000).toFixed(0)
                : GrandTotal.toFixed(0);

              return (
                <div key={index} className="col-md-3 col-4">
                  <div
                    style={{
                      border: `2px solid ${
                        selectedIndex === index ? "orange" : "#80808014"
                      }`,
                      backgroundColor:
                        selectedIndex === index ? "#ffa50036" : "white",
                      padding: "10px",
                      marginBottom: "10px",
                      cursor: "pointer",
                      borderRadius: "10px",
                    }}
                    onClick={() => {
                      setSelectedIndex(index);
                      const formattedSelectedDate = moment(
                        `${date.day} ${date.month} ${date.year}`,
                        "DD MMM YYYY"
                      ).format("DD/MM/YYYY");
                      setSelectedDate(formattedSelectedDate);
                    }}
                  >
                    <div className="week poppins-regular">
                      {date.isToday
                        ? "Today"
                        : date.isTomorrow
                        ? "Tomorrow"
                        : date.week}
                    </div>
                    <div
                      className="day poppins-regular"
                      style={{
                        fontSize: selectedIndex === index ? "12px" : "10px",
                        color: "green",
                      }}
                    >
                      {date.day} {date.month}
                    </div>
                    <div
                      className="poppins-regular"
                      style={{
                        color: date.isWeekend ? "red" : "green",
                        fontSize: selectedIndex === index ? "12px" : "10px",
                      }}
                    >
                      ₹ {finalPrice}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="poppins-regular">Select Pickup Slot </div>

          {slots && slots.length > 0 ? (
            slots.map((slotItem, index) => (
              <div key={index} style={{ width: "30%", marginBottom: "10px" }}>
                <div
                  style={{
                    padding: "10px",
                    borderWidth: "1px",
                    borderRadius: "5px",
                    borderStyle: "solid",
                    borderColor:
                      selectedSlot === slotItem._id ? "orange" : "#80808014",
                    backgroundColor:
                      selectedSlot === slotItem._id ? "#ffa50036" : "white",
                    cursor: "pointer",
                    textAlign: "center",
                  }}
                  onClick={() => {
                    setSelectedSlot(slotItem._id);
                    setSlot(`${slotItem.startTime} `);
                  }}
                >
                  <p
                    className="poppins-black"
                    style={{
                      fontSize: selectedSlot === slotItem._id ? "13px" : "12px",
                      margin: "0",
                      color: "black",
                    }}
                  >
                    {slotItem.startTime}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p
              className="poppins-regular pt-2"
              style={{ width: "100%", color: "red" }}
            >
              No slots available
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            style={{ width: "100px", backgroundColor: "red" }}
            onClick={handleClose1}
            className="poppins-black"
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show4} centered onHide={handleClose4}>
        <Modal.Header>
          <Modal.Title className="poppins-black">Add Enquiry</Modal.Title>
          <i
            onClick={handleClose4}
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
              type="tel"
              className="input col-md-12 mt-2 vhs-input-value"
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setcontact(value);
                }
              }}
            />
          </div>

          <div
            onClick={addpackersenquiry}
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
            {/* {loading ? "Submit" : "Loading..."} */}
            Submit
          </div>
        </Modal.Body>
      </Modal>

      <Footer />
    </div>
  );
}

export default Phome;
