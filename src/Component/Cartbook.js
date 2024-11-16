import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart1, removeMyCartItem, clearCart } from "../Redux1/MyCartSlice";
import { deleteMyCartItem } from "../Redux1/MyCartSlice";
import axios from "axios";
import {
  addToCartaddon,
  addToCart1addon,
  removeMyCartItemaddon,
  clearCartaddon,
} from "../Redux/MyCartSlice";
import { deleteMyCartItemaddon } from "../Redux/MyCartSlice";
import moment from "moment";
import Calendar from "react-calendar";
import "../Pages/ViewCart/Components/CartDetails/cartdetails.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { FreeMode, Pagination, Autoplay, Navigation } from "swiper/modules";
import Modal from "react-bootstrap/Modal";
import { v4 as uuidv4 } from "uuid";

import {
  GoogleMap,
  LoadScript,
  Marker,
  Autocomplete,
  useJsApiLoader,
} from "@react-google-maps/api";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useLocation, useNavigate } from "react-router-dom";
import Header1 from "./Header1";
import Cartnavbar from "./Cartnavbar";
import Footer from "./Footer";
import qs from "qs";

function Cartbook() {
  const [addondata, setaddondata] = useState([]);
  const location = useLocation();
  const { city } = location.state || {};

  const dispatch = useDispatch();
  const MyCartItmes = useSelector((state) => state.cart);
  const MyCartaddonItmes = useSelector((state) => state.addon);
  const [fourDates, setFourDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [datepicker, setdatePicker] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState({});
  const [showbutton, setshowbutton] = useState(false);

  const utm_source = localStorage.getItem("utm_source");
  const storedQuery = localStorage.getItem("fullQuery");

  const addonstotal = MyCartaddonItmes.reduce(
    (acc, item) => acc + item.oferprice,
    0
  );

  const [selectedPlaceAddress, setSelectedPlaceAddress] = useState("");
  const autocompleteRef = useRef(null);
  const mapRef = useRef(null);
  const [voucherdata, setvoucherdata] = useState([]);
  const [voucherCodeValue, setVoucherCodeValue] = useState();
  const [Carttotal, setCarttotal] = useState(0);
  const [Fulladd, setFulladd] = useState("");
  const [customerName, setcustomerName] = useState("");
  const [email, setemail] = useState("");
  const navigate = useNavigate();
  const [responseData, setResponseData] = useState(null);
  const [googleMapsApiKey, setGoogleMapsApiKey] = useState(
    "AIzaSyBF48uqsKVyp9P2NlDX-heBJksvvT_8Cqk"
  );
  const [libraries, setLibraries] = useState(["places"]);
  const [transactionId, setTransactionId] = useState(uuidv4());
  const [amount, setAmount] = useState("");
  const baseUrl =
    "https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction";
  const accessCode = "AVHX01LG55AF47XHFA";

  const [show6, setShow6] = useState(false);

  const handleClose6 = () => setShow6(false);
  const handleShow6 = () => setShow6(true);

  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);
  const [whatsappdata, setwhatsappdata] = useState([]);

  useEffect(() => {
    getwhatsapptemplate();
  }, []);

  const getwhatsapptemplate = async () => {
    try {
      let res = await axios.get(
        "https://api.vijayhomeservicebengaluru.in/api/getwhatsapptemplate"
      );
      if (res.status === 200) {
        let getTemplateDatails = res.data?.whatsapptemplate?.filter(
          (item) => item.templatename === "Service Added"
        );
        setwhatsappdata(getTemplateDatails);
      }
    } catch (error) {
      console.error("err", error);
    }
  };

  // payment get way

  const [paymentModel, setpaymentModel] = useState(false);

  const [paymentData, setPaymentData] = useState({
    merchant_id: "3663823",
    order_id: "0001",
    currency: "INR",
    amount: "1.00",
    redirect_url:
      "https://api.vijayhomeservicebengaluru.in/api/payment/handlepaystatus",
    cancel_url: "https://api.vijayhomeservicebengaluru.in/payment-cancel",
    language: "EN",
  });

  const handleClose3 = () => setpaymentModel(false);
  const [loading, setLoading] = useState(false);
  const [Url, setUrl] = useState("");

  const apikey = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  const [show2, setShow2] = useState(false);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const handlesuccess = () => {
    setShow2(false);
    window.location.assign("/thankyou");
  };

  const getVoucher = async () => {
    let res = await axios.get(
      "https://api.vijayhomesuperadmin.in/api/userapp/getvoucher"
    );
    if (res.status === 200) {
      const uniqueCategories = MyCartItmes?.[0]?.service?.category;

      let filteredVoucherData = res.data?.voucher.find(
        (voch) => voch.category === uniqueCategories
      );

      setvoucherdata(filteredVoucherData);
    }
  };

  const [validationMessage, setValidationMessage] = useState("");

  const [discountedTotal, setDiscountedTotal] = useState(0);

  const [SavedAmount, setSavedAmount] = useState(0);
  const [couponPercentage, setCouponPercentage] = useState(0);
  const [DiscountAmount, setDiscountAmount] = useState(0);
  const [customerData, setCustomerData] = useState({
    customerName: "",
    email: "",
  });

  useEffect(() => {
    localStorage.setItem("customerName", customerName);
  }, [customerName]);

  useEffect(() => {
    localStorage.setItem("email", email);
  }, [email]);

  const storedCustomerName = localStorage.getItem("customerName");

  const storedEmail = localStorage.getItem("email");

  const [appliedVoucherCode, setAppliedVoucherCode] = useState("");

  const applyVoucherCode = () => {
    if (voucherCodeValue === voucherdata?.voucherCode) {
      setAppliedVoucherCode(voucherCodeValue);
      setValidationMessage("Voucher applied successfully!");
    } else {
      setValidationMessage("Invalid voucher code. Please try again.");
    }
  };

  useEffect(() => {
    const newCartTotal = MyCartItmes.reduce(
      (accumulator, item) => {
        if (!item) return accumulator;

        const offerPrice = parseFloat(item?.offerprice) || 0;
        const quantity = parseInt(item?.qty) || 0;
        const planPrice = parseFloat(item?.planPrice?.trim()) || 0;

        if (!isNaN(offerPrice) && !isNaN(quantity) && !isNaN(planPrice)) {
          const subtotal = planPrice * quantity;
          const planSubtotal = offerPrice * quantity;
          const saved = Math.abs(planSubtotal - subtotal);

          accumulator.savedAmount += saved;
          accumulator.total += subtotal;
          accumulator.planSubtotal += planSubtotal;
        } else if (!isNaN(offerPrice) && !isNaN(quantity)) {
          const planSubtotal = offerPrice * quantity;
          accumulator.total += planSubtotal;
          accumulator.planSubtotal += planSubtotal;
        }

        return accumulator;
      },
      { total: 0, savedAmount: 0, planSubtotal: 0 }
    );

    // Calculate total price for addon items
    const addonTotal = MyCartaddonItmes.reduce((accumulator, addon) => {
      const addonPlanPrice = parseFloat(addon?.planPrice) || 0;
      const addonQuantity = parseInt(addon?.qty) || 0;
      return accumulator + addonPlanPrice * addonQuantity;
    }, 0);

    const addonTotal1 = MyCartaddonItmes.reduce((accumulator, addon) => {
      const addonPlanPrice = parseFloat(addon?.oferprice) || 0;
      const addonQuantity = parseInt(addon?.qty) || 0;
      return accumulator + addonPlanPrice * addonQuantity;
    }, 0);

    newCartTotal.total += addonTotal;
    newCartTotal.planSubtotal += addonTotal1;

    setCarttotal(newCartTotal.total);
    setSavedAmount(newCartTotal.savedAmount);

    if (appliedVoucherCode === voucherdata?.voucherCode) {
      const discountAmount =
        (newCartTotal.planSubtotal *
          (parseInt(voucherdata?.discountPercentage) || 0)) /
        100;
      const grandTotal = newCartTotal.planSubtotal - discountAmount;
      setDiscountAmount(grandTotal);
      setCouponPercentage(voucherdata?.discountPercentage);
    } else {
      setDiscountAmount(newCartTotal.planSubtotal);
    }
  }, [MyCartItmes, MyCartaddonItmes, appliedVoucherCode, voucherdata]);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBF48uqsKVyp9P2NlDX-heBJksvvT_8Cqk",
    libraries: ["places"],
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const addAddress = () => setShow(true);

  const [show1, setShow1] = useState(false);

  const handleShow1 = () => {
    setShow1(true);
    setShow(false);
  };

  const DatePicker = (e) => {
    e.preventDefault();
    setdatePicker(true);
  };

  const currentDate = new Date();

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const monthsMap = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };

  const isDateSelected = (day) => {
    if (!selectedDate) return false;

    const { day: dayNumber, month, year } = day;
    const monthName = monthsMap[month];

    if (!monthName) {
      console.error("Invalid month:", month);
      return false;
    }

    const formattedDay = moment(
      `${year}-${month}-${dayNumber}`,
      "YYYY-M-D"
    ).format("YYYY-MM-DD");

    return formattedDay === selectedDate;
  };

  // useEffect(() => {
  //   const getNextDays = () => {
  //     const nextDays = [];
  //     const currentDate = new Date();
  //     for (let i = 0; i < 12; i++) {
  //       const date = new Date(currentDate);
  //       date.setDate(currentDate.getDate() + i);

  //       const day = date.getDate();
  //       const month = date.getMonth() + 1;
  //       const year = date.getFullYear();

  //       const dayName = daysOfWeek[date.getDay()];

  //       nextDays.push({ day, month, year, dayName });
  //     }
  //     return nextDays;
  //   };

  //   const nextDays = getNextDays();
  //   setFourDates(nextDays);
  // }, []);
  useEffect(() => {
    const getNextDays = () => {
      const nextDays = [];
      for (let i = 0; i < 12; i++) {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() + i);
        nextDays.push({
          day: date.getDate(),
          month: date.getMonth() + 1,
          year: date.getFullYear(),
          dayName: moment(date).format("dddd"),
        });
      }
      return nextDays;
    };

    setFourDates(getNextDays());
  }, []);

  const handleCheckboxSelect = (day) => {
    const formattedDate = `${day.year}-${day.month}-${day.day}`;
    const selectedDate = moment(formattedDate, "YYYY-MM-DD");

    setSelectedDate(selectedDate.format("YYYY-MM-DD"));
  };

  const addQuantity = (item) => {
    dispatch(addToCartaddon(item));
  };
  const increaseQuantity = (item) => {
    dispatch(addToCart1addon(item));
  };

  const handleServiceQty = (item) => {
    dispatch(addToCart1(item));
  };

  useEffect(() => {
    getaddon();
  }, []);

  const [isAddressSelected, setAddressSelected] = useState(false);
  const [isAddressConfirmed, setAddressConfirmed] = useState(false);

  const updateAddress = (test) => {
    setAddressSelected(test);
  };
  const handleAddressSelection = (selectedAddress) => {
    Fulladd.address = selectedAddress;
    updateAddress(true);
  };

  const getaddon = async () => {
    let res = await axios.get(
      "https://api.vijayhomesuperadmin.in/api/userapp/getServiceAddOns"
    );
    if ((res.status = 200)) {
      setaddondata(
        res.data?.AddOns.filter(
          (i) => i.addOnsCategory === MyCartItmes[0]?.service?.serviceName
        )
      );
    }
  };

  const handleCalendarSelect = (date) => {
    const selectedDate = moment(date).format("YYYY-MM-DD");
    setSelectedDate(selectedDate);
    setdatePicker(false);
  };

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const tileDisabled = ({ date }) => {
    const isPastDate = date < currentDate;

    const isNextFourDate = fourDates.some((d) => {
      const dDate = new Date(d.year, d.month - 1, d.day);
      return date.toDateString() === dDate.toDateString();
    });

    return isPastDate && !isNextFourDate;
  };

  const tileClassName = ({ date }) => {
    const isNextFourDate = fourDates.some((d) => {
      const dDate = new Date(d.year, d.month - 1, d.day);
      return date.toDateString() === dDate.toDateString();
    });

    return isNextFourDate ? "selecteddate" : "";
  };

  const localstoragecitys = localStorage.getItem("city");

  const [Service, setService] = useState([]);
  const value = JSON.parse(localStorage.getItem("user"));
  const [customeraddress, setcustomerAddressdata] = useState([]);

  useEffect(() => {
    getAllServices();
    getVoucher();
  }, []);

  const getAllServices = async () => {
    try {
      let res = await axios.get(
        "https://api.vijayhomesuperadmin.in/api/userapp/getservices"
      );
      if (res.status === 200) {
        setService(res.data.service);
      }
      let addressRes = await axios.get(
        `https://api.vijayhomeservicebengaluru.in/api/getcustomeraddresswithuserid/${value?._id}`
      );
      if (addressRes) {
        setcustomerAddressdata(addressRes.data?.customerAddress);
      }
    } catch (er) {
      console.log(er, "err while fetching data");
    }
  };

  const [houseFlat, setHouseFlat] = useState("");
  const [landmark, setLandmark] = useState("");
  const [home, setHome] = useState("");
  const [others, setOthers] = useState("");
  const [othersPlace, setOthersPlace] = useState("");

  const saveAddress = async (e) => {
    try {
      const config = {
        url: "/addcustomeraddress",
        method: "post",
        baseURL: "https://api.vijayhomeservicebengaluru.in/api",
        headers: { "content-type": "application/json" },
        data: {
          userId: value?._id,
          address: selectedPlaceAddress,
          saveAs: home ? "Home" : others ? othersPlace : "",
          landmark: landmark,
          platNo: houseFlat,
          markerCoordinate: selectedLocation,
        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          setShow1(false);
          getAllServices();
        }
      });
    } catch (error) {
      console.error(error);
      alert(
        "Address not added, Please delete one address to update another address "
      );
    }
  };

  const saveAddress1 = () => {
    const fullAddress = `${houseFlat}, ${landmark},${selectedPlaceAddress}, ${
      home ? "Home" : "Others: " + othersPlace
    }`;
    setFulladd(fullAddress);
  };

  const filteredData =
    MyCartItmes[0]?.service?.store_slots?.filter(
      (item) => item.slotCity === city
    ) || [];

  const now = new Date();

  const filteredData1 = filteredData.filter((item) => {
    try {
      const currentDateISO = now.toISOString().split("T")[0];

      const startTimeString = item.startTime.split("-")[0].trim();

      const dateTimeString = `${currentDateISO}T${item.startTime
        .split("-")[0]
        .trim()}`;

      const startTime = moment(dateTimeString, "YYYY-MM-DDThh:mmA");

      if (!startTime.isValid()) {
        return false;
      }

      const startTimeDate = startTime.toDate();

      const timeDifferenceInHours = (startTimeDate - now) / (1000 * 60 * 60);

      return timeDifferenceInHours >= 2;
    } catch (error) {
      console.error("Error parsing date:", error);
      return false;
    }
  });

  const [selectedSlotIndex, setSelectedSlotIndex] = useState(null);
  const [selectedSlotText, setSelectedSlotText] = useState("");

  const handleSlotClick1 = (index, startTime) => {
    setSelectedSlotIndex(index);
    setSelectedSlotText(`${startTime}`);
    addAddress();
  };

  const renderSlots = () => {
    if (!selectedDate) {
      return null;
    }

    const currentDate = new Date();
    const dateToCompare = new Date(selectedDate);

    let slots;

    if (currentDate == dateToCompare) {
      slots = filteredData || [];
    } else if (currentDate > dateToCompare) {
      slots = filteredData1 || [];
    } else {
      slots = filteredData || [];
    }

    // Remove duplicate slots based on startTime
    const uniqueSlots = [];
    const seenTimes = new Set();

    for (const slot of slots) {
      if (!seenTimes.has(slot.startTime)) {
        uniqueSlots.push(slot);
        seenTimes.add(slot.startTime);
      }
    }

    // Sort the unique slots by startTime
    uniqueSlots.sort((a, b) => {
      const startTimeA = moment(a.startTime, "hA");
      const startTimeB = moment(b.startTime, "hA");
      return startTimeA.diff(startTimeB);
    });

    return (
      <div className="row">
        {uniqueSlots.map((slot, index) => (
          <div key={index} className="col-md-2">
            <div
              className="mt-3 poppins-light"
              style={{
                border: "1px solid grey",
                fontSize: "14px",
                textAlign: "center",
                padding: "5px",
                borderRadius: "5px",
                cursor: "pointer",
                color: selectedSlotIndex === index ? "white" : "black",
                backgroundColor: selectedSlotIndex === index ? "darkred" : "",
              }}
              onClick={() => handleSlotClick1(index, slot.startTime)}
            >
              {slot.startTime}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderSlots1 = () => {
    if (!selectedDate) {
      return null;
    }

    const currentDate = new Date();
    const dateToCompare = new Date(selectedDate);

    let slots;

    if (currentDate == dateToCompare) {
      slots = filteredData || [];
    } else if (currentDate > dateToCompare) {
      slots = filteredData1 || [];
    } else {
      slots = filteredData || [];
    }

    // Remove duplicate slots based on startTime
    const uniqueSlots = [];
    const seenTimes = new Set();

    for (const slot of slots) {
      if (!seenTimes.has(slot.startTime)) {
        uniqueSlots.push(slot);
        seenTimes.add(slot.startTime);
      }
    }

    uniqueSlots.sort((a, b) => {
      const startTimeA = moment(a.startTime, "hA");
      const startTimeB = moment(b.startTime, "hA");
      return startTimeA.diff(startTimeB);
    });

    // Split uniqueSlots into chunks of 3 for rendering in rows
    const slotsChunks = [];
    const chunkSize = 3;

    for (let i = 0; i < uniqueSlots.length; i += chunkSize) {
      slotsChunks.push(uniqueSlots.slice(i, i + chunkSize));
    }

    return (
      <div className="d-flex flex-wrap justify-content-center">
        {slotsChunks.map((chunk, rowIndex) => (
          <div
            key={rowIndex}
            className="d-flex justify-content-center"
            style={{ width: "100%" }} // Ensures full width row
          >
            {chunk.map((slot, columnIndex) => (
              <div
                key={columnIndex}
                className="d-flex justify-content-center"
                style={{ flex: "1 1 0", padding: "0 10px", maxWidth: "120px" }} // Ensures equal space and limits width
              >
                <div
                  className="mt-4 poppins-regular"
                  style={{
                    border: "1px solid grey",
                    fontSize: "11px",
                    textAlign: "center",
                    padding: "5px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    width: "100%",
                    color:
                      selectedSlotIndex === rowIndex * chunkSize + columnIndex
                        ? "white"
                        : "black",
                    backgroundColor:
                      selectedSlotIndex === rowIndex * chunkSize + columnIndex
                        ? "darkred"
                        : "pink",
                  }}
                  onClick={() =>
                    handleSlotClick1(
                      rowIndex * chunkSize + columnIndex,
                      slot.startTime
                    )
                  }
                >
                  {slot.startTime}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  // bOOKING dETAILS

  const servicePeriod = 1;
  const serviceFrequency = 1;

  const sDate = moment(selectedDate, "YYYY-MM-DD");
  const eDate = moment(selectedDate, "YYYY-MM-DD");

  const totalDays = Math.ceil(eDate.diff(sDate, "days"));
  const interval = Math.ceil(totalDays / serviceFrequency);

  const dividedDates = [];

  const sf = serviceFrequency ? serviceFrequency : "1";
  for (let i = 0; i < sf; i++) {
    const date = sDate
      .clone()
      .add(interval * i, "days")
      .format("YYYY-MM-DD");
    dividedDates.push(date);
  }

  const sAmtDate = moment(selectedDate, "YYYY-MM-DD");
  const eamtDate = moment(selectedDate, "YYYY-MM-DD");
  const amtFrequency = 1;
  const totalamtDays = Math.ceil(eamtDate.diff(sAmtDate, "days"));
  const intervalamt = Math.ceil(totalamtDays / amtFrequency);

  const dividedamtDates = [];
  const dividedamtCharges = [];

  for (let i = 0; i < 1; i++) {
    const date = sDate
      .clone()
      .add(intervalamt * i, "days")
      .format("YYYY-MM-DD");
    dividedamtDates.push(date);
    const charge = DiscountAmount;
    dividedamtCharges.push(charge);
  }

  const joinedNames = MyCartItmes.map((item) => {
    const serviceName = item.service?.serviceName || ""; // Get serviceName or an empty string if it's undefined
    return `${serviceName}+${item.planName}(${item.qty})`;
  });
  const joinedaddonNames = MyCartaddonItmes.map((item) => {
    const serviceName = item.planName || "";
    return `${item.planName}(${item.qty})`;
  });

  const joinedPlanNames = joinedNames.join(", ");
  const joinedPlanaddonNames = joinedaddonNames.join(", ");

  const paydata = {
    customerData: {
      _id: user?._id,
      EnquiryId: user?.EnquiryId,
      customerName: user?.customerName,
      category: user?.category,
      mainContact: user?.mainContact,
      email: user?.email,
      approach: user?.approach,
    },
    dividedDates: dividedDates.length ? dividedDates : [selectedDate],
    customerName: customerName,
    email: email,
    dividedamtCharges: dividedamtCharges,
    dividedamtDates: dividedamtDates,
    cardNo: user?.cardNo,
    category: MyCartItmes[0]?.service?.category,
    contractType: "One Time",
    service: MyCartItmes[0]?.service?.serviceName,
    serviceID: MyCartItmes[0]?.service?._id,
    serviceCharge: DiscountAmount,
    dateofService: selectedDate,
    selectedSlotText: selectedSlotText,
    serviceFrequency: 1,
    startDate: selectedDate,
    expiryDate: selectedDate,
    firstserviceDate: selectedDate,
    date: moment().format("YYYY-MM-DD"),
    time: moment().format("LT"),
    type: "website",
    reference: utm_source ? utm_source : storedQuery,
    desc: joinedPlanNames + joinedPlanaddonNames,
    city: city,
    userId: user?._id,
    discAmt: 0,
    GrandTotal: DiscountAmount,
    paymentMode: "cash",
    TotalAmt: Carttotal,
    couponCode: voucherCodeValue,
    totalSaved: SavedAmount,
    markerCoordinate: selectedAddress?.markerCoordinate,
    deliveryAddress: selectedAddress,
    amount: "1.00",
    number: "8951592630",
    MUID: "MUID" + Date.now(),
    transactionId: "T" + Date.now(),
  };

  const handleSubmit1 = async (e) => {
    e.preventDefault();

    const paydata1 = {
      customerData: [
        {
          _id: user?._id,
          EnquiryId: user?.EnquiryId,
          customerName: user?.customerName,
          category: user?.category,
          mainContact: user?.mainContact,
          email: user?.email,
          approach: user?.approach,
        },
      ],
      // customerData: user?._id,
      dividedDates: dividedDates.length ? dividedDates : [selectedDate],
      customerName: customerName,
      email: email,
      userId: user?._id,
      dividedamtCharges: dividedamtCharges,
      dividedamtDates: dividedamtDates,
      paymentMode: "Trying to booking",
      cardNo: user?.cardNo,
      category: MyCartItmes[0]?.service?.category,
      contractType: "One Time",
      service: MyCartItmes[0]?.service?.serviceName,
      serviceID: MyCartItmes[0]?.service?._id,
      serviceCharge: DiscountAmount,
      dateofService: selectedDate,
      selectedSlotText: selectedSlotText,
      serviceFrequency: 1,
      startDate: selectedDate,
      expiryDate: selectedDate,
      firstserviceDate: selectedDate,
      date: moment().format("YYYY-MM-DD"),
      time: moment().format("LT"),
      type: "website",
      desc: joinedPlanNames + joinedPlanaddonNames,
      city: city,
      discAmt: 0,
      GrandTotal: DiscountAmount,
      TotalAmt: Carttotal,
      couponCode: voucherCodeValue,
      totalSaved: SavedAmount,
      markerCoordinate: selectedAddress?.markerCoordinate,
      deliveryAddress: selectedAddress,
      amount: DiscountAmount,
      number: "8951592630",
      MUID: "MUID" + Date.now(),
      transactionId: "T" + Date.now(),
      reference: utm_source ? utm_source : storedQuery,
    };

    const updatedRedirectUrl = `https://api.vijayhomeservicebengaluru.in/api/payment/handlepaystatus/${paydata1.transactionId}/${paydata1.userId}/${paydata1.serviceID}`;

    const paymentString = new URLSearchParams({
      merchant_id: paymentData.merchant_id,
      order_id: paymentData.order_id,
      currency: paymentData.currency,
      amount: DiscountAmount,
      redirect_url: updatedRedirectUrl,
      cancel_url: paymentData.cancel_url,
      language: paymentData.language,
    }).toString();

    try {
      const response = await axios.post(
        "https://api.vijayhomeservicebengaluru.in/api/payment/ccavenueinitiate",
        { payment_string: paymentString, updateddata: paydata1 }
      );

      if (response && response.data && response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error(
        "Error initiating payment:",
        error.response || error.message || error
      );
    }
  };

  const deleteAllCartaddonItems = () => {
    MyCartaddonItmes.forEach((item) => {
      dispatch(deleteMyCartItemaddon({ id: item.id }));
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8080/api/payment/yogipayment",
        paydata
      );

      if (res.status === 200 && res.data.redirectUrl) {
        setpaymentModel(true);
        setUrl(res.data.redirectUrl);
      } else {
        console.log("No redirect URL found in the response.");
      }
    } catch (error) {
      if (error.response) {
        console.error("Payment initiation failed:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/payment/initiate",
        {
          transactionId,
          amount,
          paydata,
        }
      );
      const redirectUrl = `${baseUrl}&encRequest=${response.data.encRequest}&access_code=${accessCode}`;
      window.location.href = redirectUrl; // Redirect to the CCAvenue payment gateway
    } catch (error) {
      console.error("Error initiating payment:", error);
    } finally {
      setLoading(false);
    }
  };

  const addtreatmentdetails = async (e) => {
    e.preventDefault();
    if (!selectedAddress || !selectedSlotText) {
      alert("Please select address and time slots");
    } else {
      try {
        setLoading(true);
        const config = {
          url: "https://api.vijayhomeservicebengaluru.in/api/addservicedetails",
          method: "post",
          headers: { "Content-Type": "application/json" },
          data: {
            customerData: {
              _id: user?._id,
              EnquiryId: user?.EnquiryId,
              customerName: user?.customerName,
              category: user?.category,
              mainContact: user?.mainContact,
              email: user?.email,
              approach: user?.approach,
            },
            dividedDates: dividedDates.length ? dividedDates : [selectedDate],
            customerName: storedCustomerName,
            email: storedEmail,
            dividedamtCharges: dividedamtCharges,
            dividedamtDates: dividedamtDates,
            cardNo: user?.cardNo,
            category: MyCartItmes[0]?.service?.category,
            contractType: "One Time",
            service: MyCartItmes[0]?.service?.serviceName,
            serviceID: MyCartItmes[0]?.service?._id,
            serviceCharge: DiscountAmount,
            dateofService: selectedDate,
            selectedSlotText: selectedSlotText,
            serviceFrequency: 1,
            startDate: selectedDate,
            expiryDate: selectedDate,
            firstserviceDate: selectedDate,
            date: moment().format("YYYY-MM-DD"),
            time: moment().format("LT"),
            type: "website",
            reference: utm_source ? utm_source : storedQuery,
            desc: joinedPlanNames + joinedPlanaddonNames,
            city: city,
            userId: user?._id,
            discAmt: 0,
            GrandTotal: DiscountAmount,
            paymentMode: "cash",
            TotalAmt: Carttotal,
            couponCode: voucherCodeValue,
            totalSaved: SavedAmount,
            markerCoordinate: selectedAddress?.markerCoordinate,
            deliveryAddress: selectedAddress,
          },
        };

        const response = await axios(config);

        if (response.status === 200) {
          const selectedResponse = whatsappdata[0];
          setShow2(true);
          setResponseData(response.data);
          dispatch(clearCart());
          dispatch(clearCartaddon());
          makeApiCall(selectedResponse, user?.mainContact);
        }
      } catch (error) {
        console.error(error);
        alert("Not Added");
      } finally {
        setLoading(false); // End loading
      }
    }
  };

  const user12 = localStorage.getItem("user123");

  const [checkAddress, setCheckAddress] = useState(false);
  const [Voucher, setVoucher] = useState([]);

  const handleSelectAddress = (selectedAddress) => {
    setSelectedAddress(selectedAddress);
  };

  const ProceedAddress = () => {
    if (Object.keys(selectedAddress).length === 0) {
      alert("Please Select Any Address");
    } else {
      setSelectedAddress(selectedAddress);
      setShow(false);
    }
  };

  const handlePlaceSelect = () => {
    const place = autocompleteRef.current.getPlace();
    if (!place.geometry) {
      return;
    }

    const latitude = place.geometry.location.lat();
    const longitude = place.geometry.location.lng();
    const location = { latitude, longitude };
    setSelectedLocation(location);
    setSelectedPlaceAddress(place.formatted_address || "");

    if (mapRef.current && mapRef.current.getMap) {
      const map = mapRef.current.getMap();
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(new window.google.maps.LatLng(latitude, longitude));
      map.fitBounds(bounds);
    }
  };

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = { latitude, longitude };
          setSelectedLocation(location);

          const geocoder = new window.google.maps.Geocoder();
          const latlng = new window.google.maps.LatLng(latitude, longitude);
          geocoder.geocode({ location: latlng }, (results, status) => {
            if (status === "OK") {
              if (results[0]) {
                setSelectedPlaceAddress(results[0].formatted_address);
              } else {
                console.log("No results found");
              }
            } else {
              console.log("Geocoder failed due to: " + status);
            }
          });

          if (mapRef.current && mapRef.current.getMap) {
            const map = mapRef.current.getMap();
            const bounds = new window.google.maps.LatLngBounds();
            bounds.extend(new window.google.maps.LatLng(latitude, longitude));
            map.fitBounds(bounds);
          }
        },
        (error) => {
          console.error("Error fetching location: ", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const makeApiCall = async (selectedResponse, contactNumber) => {
    const apiURL =
      "https://wa.chatmybot.in/gateway/waunofficial/v1/api/v2/message";
    const accessToken = "c7475f11-97cb-4d52-9500-f458c1a377f4";

    const contentTemplate = selectedResponse?.template || "";

    if (!contentTemplate) {
      console.error("Content template is empty. Cannot proceed.");
      return;
    }

    const content = contentTemplate.replace(
      /\{Customer_name\}/g,
      customerName ? customerName : user.customerName
    );
    const serviceName = content.replace(
      /\{Service_name\}/g,
      MyCartItmes[0]?.service.serviceName
    );
    const slotTiming = serviceName.replace(
      /\{Slot_timing\}/g,
      selectedSlotText
    );
    const serivePrice = slotTiming.replace(
      /\{Service_amount\}/g,
      DiscountAmount
    );
    const serviceDate = serivePrice.replace(/\{Service_date\}/g, selectedDate);
    // const serviceVideoLink = serviceDate.replace(
    //   /\{Video_link\}/g,
    //   selectedVideoLink
    // );

    // // Replace <p> with line breaks and remove HTML tags
    const convertedText = serviceDate
      .replace(/<p>/g, "\n")
      .replace(/<\/p>/g, "")
      .replace(/<br>/g, "\n")
      .replace(/&nbsp;/g, "")
      .replace(/<strong>(.*?)<\/strong>/g, "<b>$1</b>")
      .replace(/<[^>]*>/g, "");

    const requestData = [
      {
        dst: "91" + contactNumber,
        messageType: "0",
        textMessage: {
          content: convertedText,
        },
      },
    ];
    try {
      const response = await axios.post(
        "https://api.vijayhomeservicebengaluru.in/send-message",
        {
          mobile: contactNumber,
          msg: convertedText,
        }
      );

      if (response.status === 200) {
        // alert("Whats app message sent successfully");
        deleteAllCartaddonItems();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header1 />
      <Cartnavbar />
      <div className="container">
        <div className="row" style={{ justifyContent: "center" }}>
          <div className="col-md-10 mt-3">
            {!show1 && (
              <>
                <div
                  className="mb-3 poppins-semibold"
                  style={{
                    color: "black",
                    fontSize: "20px",
                    fontWeight: "bold",
                    textAlign: "left",
                  }}
                >
                  Service Details
                </div>

                {MyCartItmes.map((item) => (
                  <div
                    className=""
                    style={{
                      backgroundColor: "white",
                      padding: "10px",
                      marginBottom: "15px",
                      border: "1px solid black",
                      borderRadius: "10px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div className="col-md-10">
                      <div
                        className="poppins-regular"
                        style={{
                          color: "darkred",
                          fontSize: "15px",
                          fontWeight: "bold",
                        }}
                      >
                        {item.planName}
                      </div>
                      <div className="poppins-regular">{item.category}</div>
                      <div className="d-flex">
                        <div
                          className="poppins-regular"
                          style={{ textDecoration: "line-through" }}
                        >
                          ₹{item.planPrice}
                        </div>
                        <div className="mx-2 poppins-regular">
                          ₹{item.offerprice}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-2">
                      <div
                        className="poppins-regular"
                        style={{ textAlign: "center" }}
                      >
                        ₹ {item.qty * item.offerprice}
                      </div>
                      <div
                        className="d-flex mt-2"
                        style={{ justifyContent: "center" }}
                      >
                        <div
                          className=""
                          style={{}}
                          onClick={() => {
                            if (item.qty > 1) {
                              dispatch(removeMyCartItem(item));
                            } else {
                              dispatch(deleteMyCartItem(item.id));
                            }
                          }}
                        >
                          <i
                            class="fa-solid fa-minus"
                            style={{
                              color: "white",
                              fontSize: "14px",
                              backgroundColor: "green",
                              padding: "5px",
                              borderRadius: "50px",
                            }}
                          ></i>
                        </div>
                        <div
                          className="mx-2 poppins-regular"
                          style={{
                            color: "black",
                            fontSize: "14px",
                            marginTop: "3px",
                          }}
                        >
                          {item.qty}
                        </div>
                        <div
                          className=""
                          onClick={() => handleServiceQty(item)}
                        >
                          <i
                            class="fa-solid fa-plus"
                            style={{
                              color: "white",
                              fontSize: "14px",
                              backgroundColor: "green",
                              padding: "5px",
                              borderRadius: "50px",
                            }}
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* <button onClick={handleSubmit1}>Pay</button> */}

                <div
                  className="mb-3 poppins-semibold"
                  style={{
                    color: "black",
                    fontSize: "20px",
                    fontWeight: "bold",
                    textAlign: "left",
                  }}
                >
                  Frequently Added Together
                </div>

                <div className="row offerbannerdata_div">
                  {addondata.map((i) => {
                    const cartItem = Array.isArray(MyCartaddonItmes)
                      ? MyCartaddonItmes.find(
                          (cartItem) => cartItem.id === i._id
                        )
                      : null;
                    const isItemInCart = !!cartItem;

                    return (
                      <div className="col-md-4 mb-4">
                        <div
                          // className="d-flex"
                          style={
                            {
                              // backgroundColor: "#E4D3BE",
                              // borderRadius: "5px",
                              // border: "1px solid grey",
                              // padding: "10px",
                            }
                          }
                        >
                          {/* <div className="col-md-6 p-0"> */}
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <img
                              src={`https://api.vijayhomesuperadmin.in/addOns/${i.addOnsImage}`}
                              alt="loading...."
                              style={{
                                width: "100%",
                                borderRadius: "10px",
                                height: "250px",
                              }}
                            />
                          </div>

                          <div
                            className="poppins-regular pb-2 mt-1"
                            style={{
                              color: "black",
                              fontSize: "14px",
                              fontWeight: "bold",
                              // textAlign: "center",
                            }}
                          >
                            {i.addOnsName}
                            <div
                              className="d-flex poppins-regular"
                              // style={{ justifyContent: "center" }}
                            >
                              <div
                                className="poppins-regular"
                                style={{ textDecoration: "line-through" }}
                              >
                                {" "}
                                {cartItem?.qty
                                  ? cartItem?.qty * i.addOnsPrice
                                  : i.addOnsPrice}
                              </div>
                              <div className="mx-2 poppins-regular">
                                {" "}
                                ₹
                                {cartItem?.qty
                                  ? cartItem?.qty * i.addOnsOfferPrice
                                  : i.addOnsOfferPrice}
                              </div>
                            </div>

                            {/* <div
                              className="poppins-light"
                              style={{
                                color: "black",
                                fontSize: "12px",
                                marginTop: "3px",
                                whiteSpace: "normal",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitBoxOrient: "vertical",
                                WebkitLineClamp: 3,
                              }}
                            >
                              {i.addOnsDescription}
                            </div> */}
                          </div>

                          {isItemInCart ? (
                            <div
                              className="d-flex"
                              style={{
                                justifyContent: "center",
                                position: "absolute",
                                marginTop: "-103px",
                                marginLeft: "170px",
                                backgroundColor: "darkred",
                                // border: "2px solid green",
                                // padding: "5px 5px",
                                padding: "5px 5px",
                                borderRadius: "5px",
                                width: "100px",
                              }}
                            >
                              <div
                                className=""
                                onClick={() => {
                                  if (cartItem.qty > 1) {
                                    dispatch(removeMyCartItemaddon(cartItem));
                                  } else {
                                    dispatch(
                                      deleteMyCartItemaddon(cartItem.id)
                                    );
                                  }
                                }}
                                style={{}}
                              >
                                <i
                                  class="fa-solid fa-minus"
                                  style={{
                                    color: "white",
                                    fontSize: "14px",
                                    // backgroundColor: "white",
                                    padding: "5px",
                                    borderRadius: "50px",
                                  }}
                                ></i>
                              </div>
                              <div
                                className="mx-2 poppins-black"
                                style={{
                                  color: "white",
                                  fontSize: "14px",
                                  marginTop: "3px",
                                }}
                              >
                                {cartItem.qty}
                              </div>
                              <div
                                className=""
                                onClick={() => increaseQuantity(cartItem)}
                              >
                                <i
                                  class="fa-solid fa-plus"
                                  style={{
                                    color: "white",
                                    fontSize: "14px",
                                    // backgroundColor: "white",
                                    padding: "5px",
                                    borderRadius: "50px",
                                  }}
                                ></i>
                              </div>
                            </div>
                          ) : (
                            <div
                              className=""
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                position: "absolute",
                                marginTop: "-110px",
                                marginLeft: "170px",
                              }}
                            >
                              <div
                                className="poppins-black"
                                style={{
                                  backgroundColor: "darkred",
                                  // border: "2px solid green",
                                  padding: "5px 5px",
                                  textAlign: "center",
                                  fontSize: "14px",
                                  color: "white",
                                  width: "100px",
                                  borderRadius: "5px",
                                  marginTop: "10px",
                                  cursor: "pointer",
                                }}
                                onClick={() => addQuantity(i)}
                              >
                                Add
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      // </div>
                    );
                  })}
                </div>

                <div className="row offerbannerdata_div1">
                  <Swiper
                    slidesPerView={3} // Adjust the number of slides per view based on your design
                    spaceBetween={30} // Adjust space between slides
                    freeMode={true}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    modules={[FreeMode, Pagination, Autoplay]}
                    className="mySwiper"
                  >
                    {addondata.map((i) => {
                      const cartItem = Array.isArray(MyCartaddonItmes)
                        ? MyCartaddonItmes.find(
                            (cartItem) => cartItem.id === i._id
                          )
                        : null;
                      const isItemInCart = !!cartItem;

                      return (
                        <SwiperSlide key={i._id} className="col-md-4">
                          <div
                            // className="d-flex"
                            style={
                              {
                                // backgroundColor: "#E4D3BE",
                                // borderRadius: "10px",
                              }
                            }
                          >
                            {/* <div className="col-md-6 p-0"> */}
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <img
                                src={`https://api.vijayhomesuperadmin.in/addOns/${i.addOnsImage}`}
                                alt="loading...."
                                style={{
                                  width: "100%",
                                  borderRadius: "10px",
                                  objectFit: "cover",
                                }}
                              />
                            </div>
                            {/* </div> */}
                            {/* <div className="col-md-6 p-3 mt-2">
                              <div
                                className="poppins-regular"
                                style={{
                                  color: "black",
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                }}
                              >
                                {i.addOnsName}
                              </div>
                              <div
                                className="poppins-light"
                                style={{
                                  color: "black",
                                  fontSize: "12px",
                                  marginTop: "3px",
                                  whiteSpace: "normal",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  display: "-webkit-box",
                                  WebkitBoxOrient: "vertical",
                                  WebkitLineClamp: 3,
                                }}
                              >
                                {i.addOnsDescription}
                              </div>

                              <div className="d-flex poppins-regular">
                                <div
                                  className="poppins-regular"
                                  style={{ textDecoration: "line-through" }}
                                >
                                  {cartItem?.qty
                                    ? cartItem?.qty * i.addOnsPrice
                                    : i.addOnsPrice}
                                </div>
                                <div className="mx-2 poppins-regular">
                                  ₹
                                  {cartItem?.qty
                                    ? cartItem?.qty * i.addOnsOfferPrice
                                    : i.addOnsOfferPrice}
                                </div>
                              </div>
                              {isItemInCart ? (
                                <div className="d-flex mt-2">
                                  <div
                                    onClick={() => {
                                      if (cartItem.qty > 1) {
                                        removeMyCartItemaddon(cartItem);
                                      } else {
                                        deleteMyCartItemaddon(cartItem.id);
                                      }
                                    }}
                                  >
                                    <i
                                      className="fa-solid fa-minus"
                                      style={{
                                        color: "white",
                                        fontSize: "14px",
                                        backgroundColor: "green",
                                        padding: "5px",
                                        borderRadius: "50px",
                                      }}
                                    ></i>
                                  </div>
                                  <div
                                    className="mx-2"
                                    style={{
                                      color: "black",
                                      fontSize: "14px",
                                      marginTop: "3px",
                                    }}
                                  >
                                    {cartItem.qty}
                                  </div>
                                  <div
                                    onClick={() => increaseQuantity(cartItem)}
                                  >
                                    <i
                                      className="fa-solid fa-plus"
                                      style={{
                                        color: "white",
                                        fontSize: "14px",
                                        backgroundColor: "green",
                                        padding: "5px",
                                        borderRadius: "50px",
                                      }}
                                    ></i>
                                  </div>
                                </div>
                              ) : (
                                <div
                                  className="poppins-extrabold"
                                  style={{
                                    backgroundColor: "green",
                                    padding: "2px",
                                    textAlign: "center",
                                    fontSize: "14px",
                                    color: "white",
                                    width: "83px",
                                    borderRadius: "10px",
                                    marginTop: "10px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => addQuantity(i)}
                                >
                                  Add
                                </div>
                              )}
                            </div> */}
                            <div
                              className="poppins-regular pb-2 mt-1"
                              style={{
                                color: "black",
                                fontSize: "14px",
                                fontWeight: "bold",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                // textAlign: "center",
                              }}
                            >
                              {i.addOnsName}
                              <div
                                className="d-flex poppins-regular"
                                // style={{ justifyContent: "center" }}
                              >
                                <div
                                  className="poppins-regular"
                                  style={{ textDecoration: "line-through" }}
                                >
                                  {" "}
                                  {cartItem?.qty
                                    ? cartItem?.qty * i.addOnsPrice
                                    : i.addOnsPrice}
                                </div>
                                <div className="mx-2 poppins-regular">
                                  {" "}
                                  ₹
                                  {cartItem?.qty
                                    ? cartItem?.qty * i.addOnsOfferPrice
                                    : i.addOnsOfferPrice}
                                </div>
                              </div>
                              {isItemInCart ? (
                                <div
                                  className="d-flex"
                                  style={{
                                    justifyContent: "center",
                                    position: "absolute",
                                    marginTop: "-80px",
                                    marginLeft: "15px",
                                    backgroundColor: "darkred",
                                    padding: "3px 13px",
                                    borderRadius: "5px",
                                  }}
                                >
                                  <div
                                    className=""
                                    onClick={() => {
                                      if (cartItem.qty > 1) {
                                        dispatch(
                                          removeMyCartItemaddon(cartItem)
                                        );
                                      } else {
                                        dispatch(
                                          deleteMyCartItemaddon(cartItem.id)
                                        );
                                      }
                                    }}
                                    style={{}}
                                  >
                                    <i
                                      class="fa-solid fa-minus"
                                      style={{
                                        color: "white",
                                        fontSize: "14px",
                                      }}
                                    ></i>
                                  </div>
                                  <div
                                    className="mx-2 poppins-regular"
                                    style={{
                                      color: "white",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {cartItem.qty}
                                  </div>
                                  <div
                                    className=""
                                    onClick={() => increaseQuantity(cartItem)}
                                  >
                                    <i
                                      class="fa-solid fa-plus"
                                      style={{
                                        color: "white",
                                        fontSize: "14px",
                                      }}
                                    ></i>
                                  </div>
                                </div>
                              ) : (
                                <div
                                  className=""
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    position: "absolute",
                                    marginTop: "-91px",
                                    marginLeft: "15px",
                                  }}
                                >
                                  <div
                                    className="poppins-regular"
                                    style={{
                                      backgroundColor: "darkred",
                                      // border: "2px solid green",
                                      padding: "3px 20px",
                                      textAlign: "center",
                                      fontSize: "14px",
                                      color: "white",

                                      borderRadius: "5px",
                                      marginTop: "10px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => addQuantity(i)}
                                  >
                                    Add
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>

                <div className="scheduleservice mb-4">
                  {/* <div
                    className="title poppins-semibold"
                    style={{ textAlign: "left" }}
                  >
                    Schedule Service
                  </div> */}
                  <div className="select_date">
                    <div className="text poppins-semibold">Select the date</div>

                    <div className="date_selection web-days">
                      {fourDates?.map((day, index) => {
                        const isDefaultChecked = isDateSelected(day);

                        return (
                          <label
                            className={`inpt  ${
                              isDefaultChecked ? "matching" : ""
                            }`}
                            htmlFor={index}
                            key={index}
                            style={{
                              margin: "0 15px 15px 0",
                            }} // Add this line for margin
                          >
                            <span
                              className="poppins-black"
                              onClick={() => handleCheckboxSelect(day)}
                              // style={{ fontWeight: "bold", marginTop: "-3px" }}
                            >
                              {day?.dayName}- {day?.day}
                            </span>
                          </label>
                        );
                      })}
                    </div>

                    <div
                      className="date_grid_container mobile-days"
                      style={{
                        display: "flex",
                        gap: "10px",
                        justifyContent: "center",
                      }}
                    >
                      {fourDates?.slice(0, 3).map((day, index) => {
                        const isDefaultChecked = isDateSelected(day);
                        return (
                          <div
                            key={index}
                            className={`inpt border poppins-medium ${
                              isDefaultChecked ? "matching" : ""
                            }`}
                            style={{
                              textAlign: "center",
                              padding: "10px",
                              flex: "1 1 0",
                              maxWidth: "100px",
                              cursor: "pointer",
                              backgroundColor: "skyblue",
                            }}
                            onClick={() => handleCheckboxSelect(day)}
                          >
                            {day?.day} <br />
                            <span
                              className={`poppins-medium ${
                                isDefaultChecked ? "matching" : ""
                              }`}
                            >
                              {day?.dayName}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="date mt-3">
                      <button
                        className="poppins-black"
                        onClick={DatePicker}
                        style={{ cursor: "pointer", fontWeight: "bold" }}
                      >
                        Pick Date{" "}
                        <span>
                          {selectedDate && (
                            <div
                              className="selected_date mx-2 poppins-black"
                              style={{
                                color: "darkred",
                                fontSize: "16px",
                                fontWeight: "bold",
                              }}
                            >
                              {moment(selectedDate).format("YYYY-MM-DD")}
                            </div>
                          )}
                        </span>
                      </button>
                      <div className="date_picker"></div>
                    </div>
                    {datepicker && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "100vh",
                          zIndex: "100",
                          marginTop: "-250px",
                        }}
                      >
                        <div>
                          <Calendar
                            onChange={(date) => handleCalendarSelect(date)}
                            value={selectedDate}
                            calendarType="US"
                            tileDisabled={tileDisabled}
                            tileClassName={tileClassName}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="select_date">
                    <div className="cartrenderslot">
                      <div className="text poppins-medium mt-1">
                        Select the Slot
                      </div>
                    </div>
                    <div
                      className="cartrenderslot"
                      style={{ marginTop: "-15px" }}
                    >
                      {renderSlots()}
                    </div>
                  </div>

                  <div className="select_date">
                    <div className="cartrenderslot1">
                      <div className="text poppins-semibold">Slots</div>
                    </div>
                    <div
                      className="cartrenderslot1"
                      style={{ marginTop: "-15px" }}
                    >
                      <div className="">{renderSlots1()}</div>
                    </div>
                  </div>
                </div>

                <div
                  className="poppins-semibold"
                  style={{
                    color: "black",
                    fontSize: "20px",
                    fontWeight: "bold",
                    textAlign: "left",
                  }}
                >
                  Select the address
                </div>

                <div
                  onClick={() => setShow(true)}
                  className="shadow-sm poppins-regular"
                  style={{
                    backgroundColor: "#d3d3d317",
                    padding: "10px",
                    borderRadius: "5px",
                    marginTop: "10px",
                  }}
                >
                  {Object.keys(selectedAddress).length > 0 && (
                    <>
                      {selectedAddress.platNo},{selectedAddress.address}
                      <p>{selectedAddress.landmark}</p>
                    </>
                  )}
                  {!Object.keys(selectedAddress).length > 0 && (
                    <>
                      <p className="poppins-regular" style={{ color: "black" }}>
                        Please Select Address
                      </p>
                    </>
                  )}
                </div>

                {user?.customerName || user?.email ? (
                  <></>
                ) : (
                  <>
                    <div
                      className="mt-3 poppins-semibold"
                      style={{
                        color: "black",
                        fontSize: "20px",
                        fontWeight: "bold",
                      }}
                    >
                      Customer details
                    </div>
                    <div className="mt-3 mb-2 poppins-light">Customer Name</div>

                    <div className="">
                      <input
                        type="text"
                        className="poppins-light"
                        onChange={(e) => setcustomerName(e.target.value)}
                        value={customerName}
                        placeholder="Customer Name"
                        style={{ border: "1px solid grey", height: "45px" }}
                      />
                    </div>

                    <div className="mb-2 poppins-light">Email</div>

                    <div className="">
                      <input
                        type="text"
                        className=""
                        onChange={(e) => setemail(e.target.value)}
                        value={email}
                        placeholder="Email"
                        style={{ border: "1px solid grey", height: "45px" }}
                      />
                    </div>
                  </>
                )}

                <div
                  className="mt-4 poppins-semibold"
                  style={{
                    color: "black",
                    fontSize: "20px",
                    fontWeight: "bold",
                    textAlign: "left",
                  }}
                >
                  Coupons & Offers
                </div>

                <div className="d-flex mt-3">
                  <div className="col-md-4">
                    <input
                      type="text"
                      className="poppins-regular"
                      style={{
                        border: "1px solid grey",
                        padding: "8px",
                        borderRadius: "10px",
                      }}
                      value={voucherCodeValue}
                      placeholder="Enter Voucher Code"
                      onChange={(e) => setVoucherCodeValue(e.target.value)}
                    />
                  </div>
                  <div className="col-md-3 mx-4">
                    <div
                      className="poppins-black"
                      style={{
                        backgroundColor: "darkred",
                        padding: "8px 40px",
                        color: "white",
                        textAlign: "center",
                        borderRadius: "10px",
                        cursor: "pointer",
                        fontSize: "15px",
                      }}
                      onClick={applyVoucherCode}
                    >
                      Apply
                    </div>
                  </div>
                </div>

                <div
                  className="mt-3 poppins-black"
                  style={{
                    color: "#40A2D8",
                    fontWeight: "900",
                    textAlign: "auto",
                  }}
                >
                  * Book Over Rs 1500 to use wallet , upto 10% From your wallet
                  Account !
                </div>
                <div
                  className="mt-1 mb-3 poppins-black"
                  style={{
                    color: "#40A2D8",
                    fontWeight: "900",
                    textAlign: "auto",
                  }}
                >
                  * Book over Rs 1500, get 2% cashback in your wallet !
                </div>

                <div
                  className="poppins-semibold"
                  style={{
                    color: "darkred",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  Payment Summary
                </div>

                <div
                  className="d-flex mt-3"
                  style={{ justifyContent: "space-between" }}
                >
                  <div className="col-md-4 poppins-black">Total Amount</div>
                  <div
                    className="col-md-4 poppins-black"
                    style={{
                      textDecoration: "line-through",
                      fontWeight: "500",
                    }}
                  >
                    ₹ {Carttotal}
                  </div>
                </div>

                <div
                  className="d-flex mt-3"
                  style={{ justifyContent: "space-between" }}
                >
                  <div className="col-md-4 poppins-black">Discount</div>
                  <div
                    className="col-md-4 poppins-black"
                    style={{ fontWeight: "500" }}
                  >
                    {couponPercentage}%
                  </div>
                </div>

                <div
                  className="d-flex mt-3"
                  style={{ justifyContent: "space-between" }}
                >
                  <div className="col-md-4 poppins-black">Saved</div>
                  <div
                    className="col-md-4 poppins-black"
                    style={{ color: "#40A2D8", fontWeight: "500" }}
                  >
                    ₹ {SavedAmount}
                  </div>
                </div>

                <div
                  className="d-flex mt-3"
                  style={{ justifyContent: "space-between" }}
                >
                  <div className="col-md-4 poppins-black">Addons</div>
                  <div
                    className="col-md-4 poppins-black"
                    style={{ color: "#40A2D8", fontWeight: "500" }}
                  >
                    ₹ {addonstotal}
                  </div>
                </div>

                {/* <div
                  className="d-flex mt-3"
                  style={{ justifyContent: "space-between" }}
                >
                  <div className="col-md-4 poppins-black">Addons</div>
                  <div
                    className="col-md-4 poppins-black"
                    style={{ color: "#40A2D8", fontWeight: "500" }}
                  >
                    ₹ {MyCartaddonItmes.planPrice}
                  </div>
                </div> */}

                <div
                  className="d-flex mt-3"
                  style={{ justifyContent: "space-between" }}
                >
                  <div className="col-md-4 poppins-black">Grand Total</div>
                  <div
                    className="col-md-4 poppins-black"
                    style={{ color: "#40A2D8", fontWeight: "500" }}
                  >
                    ₹ {DiscountAmount}
                  </div>
                </div>

                {/* Book Button */}

                <div
                  onClick={handleShow6}
                  className="col-md-12 mt-4 shadow poppins-black"
                  style={{
                    // backgroundColor: "darkred",
                    padding: "8px",
                    color: "orange",
                    fontSize: "14px",
                    textAlign: "center",
                    borderRadius: "5px",
                    cursor: "pointer",

                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  Cancellation Policy
                </div>

                {!showbutton ? (
                  <div
                    className="flex mt-3 mb-5"
                    style={{ alignItems: "center" }}
                  >
                    <div
                      onClick={() => setshowbutton(true)}
                      className="col-md-12 poppins-black"
                      style={{
                        backgroundColor: "darkred",
                        padding: "8px",
                        color: "white",
                        fontSize: "14px",
                        textAlign: "center",
                        borderRadius: "5px",
                        cursor: "pointer",
                        width: "100%",
                      }}
                    >
                      Book Now
                    </div>
                  </div>
                ) : (
                  <div
                    className="d-flex mt-5 mb-5"
                    style={{ justifyContent: "space-between" }}
                  >
                    <div className="col-md-6">
                      {/* <div
                        onClick={addtreatmentdetails}
                        className="col-md-12 poppins-black afterbutton"
                        style={{
                          backgroundColor: "darkred",
                          padding: "8px 20px",
                          color: "white",
                          fontSize: "14px",
                          textAlign: "center",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      >
                   
                        {loading ? "Loading..." : "After Service"}
                      </div> */}
                      <div
                        onClick={
                          MyCartItmes.length === 0 ? null : addtreatmentdetails
                        }
                        className={`col-md-12 poppins-black afterbutton ${
                          MyCartItmes.length === 0 ? "disabled-button" : ""
                        }`}
                        style={{
                          backgroundColor:
                            MyCartItmes.length === 0 ? "grey" : "darkred",
                          padding: "8px 20px",
                          color: "white",
                          fontSize: "14px",
                          textAlign: "center",
                          borderRadius: "5px",
                          cursor:
                            MyCartItmes.length === 0
                              ? "not-allowed"
                              : "pointer",
                        }}
                      >
                        {loading ? "Loading..." : "After Service"}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div
                        onClick={
                          MyCartItmes.length === 0 ? null : handleSubmit1
                        }
                        // onClick={handlePayment}
                        className={`col-md-12 poppins-black paybutton ${
                          MyCartItmes.length === 0 ? "disabled-button" : ""
                        }`}
                        style={{
                          backgroundColor:
                            MyCartItmes.length === 0 ? "grey" : "#040458db",
                          padding: "8px 40px",
                          color: "white",
                          fontSize: "14px",
                          textAlign: "center",
                          borderRadius: "5px",
                          cursor:
                            MyCartItmes.length === 0
                              ? "not-allowed"
                              : "pointer",
                        }}
                      >
                        Pay Now
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* old address select */}
            <Modal show={show} onHide={handleClose}>
              <Modal.Header>
                <Modal.Title
                  className="poppins-medium"
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    textAlign: "left",
                  }}
                >
                  Select your address
                </Modal.Title>
                <div onClick={handleClose}>
                  <i
                    class="fa-solid fa-xmark"
                    style={{
                      backgroundColor: "darkred",
                      padding: "5px",
                      color: "white",
                      borderRadius: "50px",
                      width: "25px",
                      textAlign: "center",
                      fontSize: "14px",
                      position: "absolute",
                      right: "11px",
                      top: "18px",
                    }}
                  ></i>
                </div>
              </Modal.Header>
              <Modal.Body>
                <div className="row mb-2">
                  {customeraddress.map((item, index) => (
                    <div className="d-flex">
                      <React.Fragment key={index}>
                        <div key={index} className="col-md-1">
                          <input
                            type="radio"
                            value={item._id}
                            id={item._id}
                            checked={selectedAddress._id === item._id}
                            onChange={() => handleSelectAddress(item)}
                          />
                        </div>
                        <div className="col-md-11 mb-3 mx-1">
                          <div
                            className="poppins-black"
                            style={{
                              color: "black",
                              fontSize: "15px",
                              fontWeight: "bold",
                            }}
                          >
                            {item.saveAs}
                          </div>
                          <div
                            className="poppins-regular"
                            style={{
                              color: "black",
                              fontSize: "14px",
                            }}
                          >
                            {item.platNo},{item.address}
                          </div>
                          <div
                            className="poppins-regular"
                            style={{
                              color: "black",
                              fontSize: "13px",
                            }}
                          >
                            Landmark : {item.landmark}
                          </div>
                        </div>
                      </React.Fragment>
                    </div>
                  ))}
                </div>

                <hr />

                <div className="d-flex">
                  <i className="fa-solid fa-plus mt-1"></i>
                  <div
                    onClick={handleShow1}
                    className="mx-3 poppins-black mt-2"
                    style={{
                      color: "darkred",
                      fontSize: "15px",
                      fontWeight: "bold",
                      textAlign: "left",
                    }}
                  >
                    Add new address
                  </div>
                </div>

                <div
                  className="poppins-black"
                  style={{
                    backgroundColor: "darkred",
                    padding: "8px",
                    textAlign: "center",
                    color: "white",
                    fontSize: "14px",
                    borderRadius: "5px",
                    marginTop: "30px",
                    cursor: "pointer",
                  }}
                  onClick={ProceedAddress}
                >
                  Proceed
                </div>
              </Modal.Body>
            </Modal>

            {/* showing google map after add addresss=========================== */}

            {show1 && isLoaded && (
              <div
                className="row mt-5 mb-2 p-2"
                style={{ justifyContent: "center" }}
              >
                <i
                  onClick={() => {
                    setShow1(false);
                    setShow(true);
                  }}
                  className="fa-solid fa-x"
                  style={{
                    backgroundColor: "darkred",
                    padding: "10px",
                    width: "35px",
                    textAlign: "center",
                    color: "white",
                    fontSize: "15px",
                    borderRadius: "50px",
                    position: "absolute",
                    top: "70px",
                  }}
                ></i>
                <div
                  className="row"
                  style={{
                    backgroundColor: "#80808036",
                    padding: "20px",
                    borderRadius: "5px",
                  }}
                >
                  <div className="col-md-8">
                    <div
                      className=""
                      style={{
                        width: "100%",
                        height: "320px",
                        position: "relative",
                      }}
                    >
                      <GoogleMap
                        ref={mapRef}
                        center={{ lat: 12.9716, lng: 77.5946 }}
                        zoom={10}
                        mapContainerStyle={{
                          height: "100%",
                          width: "100%",
                          zIndex: 111,
                        }}
                      >
                        {selectedLocation && (
                          <Marker
                            position={{
                              lat: selectedLocation.latitude,
                              lng: selectedLocation.longitude,
                            }}
                          />
                        )}
                        <Autocomplete
                          onLoad={(autocomplete) => {
                            autocompleteRef.current = autocomplete;
                          }}
                          options={{
                            fields: ["formatted_address", "geometry", "name"],
                            types: ["geocode"],
                          }}
                          onPlaceChanged={handlePlaceSelect}
                        >
                          <input
                            type="text"
                            placeholder="Search for a location"
                            className="map_input"
                            style={{
                              boxSizing: "border-box",
                              border: "1px solid transparent",
                              width: "240px",
                              height: "32px",
                              padding: "0 12px",
                              borderRadius: "3px",
                              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
                              fontSize: "14px",
                              outline: "none",
                              textOverflow: "ellipsis",
                              position: "absolute",
                              top: "10px",
                              left: "50%",
                              transform: "translateX(-50%)",
                              zIndex: 2,
                              backgroundColor: "orange",
                              // width: "350px",
                            }}
                          />
                        </Autocomplete>
                      </GoogleMap>
                    </div>
                    <button
                      className=""
                      onClick={getCurrentLocation}
                      style={{
                        backgroundColor: "darkblue",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        padding: "8px",
                        fontSize: "14px",
                        // width: "80%",
                      }}
                    >
                      Use My Current Location
                    </button>
                    <div style={{ textAlign: "center", marginTop: "10px" }}>
                      {selectedPlaceAddress && (
                        <p>Searched Location: {selectedPlaceAddress}</p>
                      )}
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mt-3">
                      <div
                        className="mb-1 poppins-regular"
                        style={{
                          color: "black",
                          fontSize: "14px",
                          fontWeight: "bold",
                        }}
                      >
                        House/Flat/Block No{" "}
                        <span style={{ color: "red" }}>*</span>
                      </div>
                      <input
                        type="text"
                        style={{
                          border: "1px solid grey",
                          borderRadius: "5px",
                          height: "40px",
                        }}
                        onChange={(e) => setHouseFlat(e.target.value)}
                      />
                    </div>
                    <div className="">
                      <div
                        className="mb-1 poppins-regular"
                        style={{
                          color: "black",
                          fontSize: "14px",
                          fontWeight: "bold",
                        }}
                      >
                        Landmark / Society name{" "}
                        <span style={{ color: "red" }}>*</span>
                      </div>
                      <input
                        type="text"
                        style={{
                          border: "1px solid grey",
                          borderRadius: "5px",
                          height: "40px",
                        }}
                        onChange={(e) => setLandmark(e.target.value)}
                      />
                    </div>
                    <div className="poppins-regular">
                      <div
                        className="mb-1"
                        style={{
                          color: "black",
                          fontSize: "14px",
                          fontWeight: "bold",
                        }}
                      >
                        Save as <span style={{ color: "red" }}>*</span>
                      </div>
                      <div className="d-flex">
                        <div className="col-md-3">
                          <div
                            className="poppins-regular"
                            style={{
                              border: "1px solid grey",
                              padding: "3px",
                              textAlign: "center",
                              borderRadius: "5px",
                              cursor: "pointer",
                              color: home ? "white" : "black",
                              backgroundColor: home ? "darkred" : "white",
                            }}
                            onClick={() => {
                              setHome(true);
                              setOthers(false);
                            }}
                          >
                            Home
                          </div>
                        </div>
                        <div className="col-md-1"></div>
                        <div className="col-md-3 mx-2">
                          <div
                            className="poppins-regular"
                            style={{
                              border: "1px solid grey",
                              padding: "3px",
                              textAlign: "center",
                              borderRadius: "5px",
                              cursor: "pointer",
                              color: others ? "white" : "black",
                              backgroundColor: others ? "darkred" : "white",
                            }}
                            onClick={() => {
                              setHome(false);
                              setOthers(true);
                            }}
                          >
                            Others
                          </div>
                        </div>
                        {others && (
                          <div className="col-md-3 ms-2">
                            <input
                              style={{ border: "1px solid black" }}
                              onChange={(e) => setOthersPlace(e.target.value)}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div
                      className="poppins-black"
                      style={{
                        backgroundColor: "darkred",
                        padding: "8px",
                        textAlign: "center",
                        color: "white",
                        fontSize: "14px",
                        borderRadius: "5px",
                        marginTop: "25px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        saveAddress();
                        saveAddress1();
                        setShow1(false);
                        setShow(true);
                      }}
                    >
                      Save
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Success Modal */}

            <Modal show={show2} centered onHide={handlesuccess}>
              <Modal.Body>
                <div
                  className="row"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div className="d-flex justify-content-center">
                    <video
                      className="p-0"
                      style={{
                        objectFit: "cover",
                        width: "200px",
                        height: "200px",
                      }}
                      autoPlay
                      loop
                      src={require("../Assets/Images/a.mp4")}
                    ></video>
                  </div>
                  <div className="d-flex align-items-center justify-content-center mt-2">
                    <div
                      className="col-md-5 text-center poppins-black"
                      style={{ fontSize: "14px" }}
                    >
                      Category
                    </div>
                    <div className="col-md-1 mx-2">:</div>
                    <div
                      className="col-md-6 poppins-black"
                      style={{ textAlign: "center" }}
                    >
                      {responseData?.data.category}
                    </div>
                  </div>

                  <div className="d-flex align-items-center justify-content-center mt-2">
                    <div
                      className="col-md-5 text-center poppins-black"
                      style={{ fontSize: "14px" }}
                    >
                      Service
                    </div>
                    <div className="col-md-1 mx-2">:</div>
                    <div className="col-md-6 poppins-black">
                      {responseData?.data.service}
                    </div>
                  </div>

                  <div className="d-flex align-items-center justify-content-center mt-2">
                    <div className="col-md-5 text-center poppins-black">
                      Description
                    </div>
                    <div className="col-md-1 mx-2">:</div>
                    <div className="col-md-6 poppins-black">
                      {responseData?.data.desc}
                    </div>
                  </div>

                  <div className="d-flex align-items-center justify-content-center mt-2">
                    <div
                      className="col-md-5 text-center poppins-black"
                      style={{ fontSize: "14px" }}
                    >
                      Date of Service
                    </div>
                    <div className="col-md-1 mx-2">:</div>
                    <div className="col-md-6 poppins-black">
                      {responseData?.data.dateofService}
                    </div>
                  </div>

                  <div className="d-flex align-items-center justify-content-center mt-2">
                    <div
                      className="col-md-5 text-center poppins-black"
                      style={{ fontSize: "14px" }}
                    >
                      Service Charge
                    </div>
                    <div className="col-md-1 mx-2">:</div>
                    <div className="col-md-6 poppins-black">
                      {responseData?.data.serviceCharge}
                    </div>
                  </div>
                    {/* Offer Alert Section */}
          <div className="mt-5 text-center">
            <h4>Offer Alert!</h4>
            <a href="/services/painting-services">
              <video
                style={{ width: "100%", height: "auto", cursor: "pointer" }}
                autoPlay
                loop
                muted
                src={require("../Assets/Images/offer video.webm")}
              ></video>
            </a>
            <p className="mt-2" style={{ fontWeight: "bold", color: "darkred" }}>
              Click the video to explore our painting services!
            </p>
          </div>
                  {responseData?.data.GrandTotal >= 1500 && (
                    <div>
                      <p
                        className="poppins-regular mt-3"
                        style={{
                          padding: 10,
                          color: "green",
                          fontWeight: "bold",
                          fontSize: 15,
                          textAlign: "center",
                        }}
                      >
                        Congratulations !!! You won a reward of Rs{" "}
                        {(responseData?.data.GrandTotal * 0.02).toFixed(2)}/- in
                        your Wallet..!!
                      </p>
                    </div>
                  )}

                  <div className="d-flex justify-content-center mt-3 mb-3">
                    <Button
                      variant="secondary"
                      onClick={handlesuccess}
                      style={{ width: "200px", backgroundColor: "darkred" }}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>

            {/* payment getway */}
            <Modal show={paymentModel} centered onHide={handleClose}>
              <Modal.Header>
                <Modal.Title
                  style={{
                    fontSize: "20px",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  Confirm Payment
                  <i
                    onClick={handleClose3}
                    className="fa-solid fa-x"
                    style={{
                      backgroundColor: "darkred",
                      padding: "10px",
                      width: "30px",
                      textAlign: "center",
                      color: "white",
                      fontSize: "10px",
                      borderRadius: "50px",
                      position: "absolute",
                      right: "18px",
                    }}
                  ></i>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ textAlign: "center", fontSize: "16px" }}>
                <p>
                  <i
                    className="fa fa-exclamation-circle"
                    style={{ fontSize: "24px", color: "darkred" }}
                  ></i>
                </p>
                <p>Are you sure you want to proceed with the payment?</p>
                <a
                  href={Url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                  className="mt-3"
                >
                  <Button
                    variant="primary"
                    style={{ backgroundColor: "darkred" }}
                  >
                    Yes, proceed
                  </Button>
                </a>
              </Modal.Body>
            </Modal>

            {/* Cancel Policy */}

            <Modal show={show6} centered style={{ padding: "15px" }}>
              <Modal.Header>
                <Modal.Title
                  className="poppins-semibold"
                  id="contained-modal-title-vcenter"
                >
                  Cancellation Policy
                </Modal.Title>
              </Modal.Header>
              <i
                onClick={handleClose6}
                className="fa-solid fa-x"
                style={{
                  backgroundColor: "darkred",
                  padding: "8px",
                  width: "30px",
                  textAlign: "center",
                  color: "white",
                  fontSize: "15px",
                  borderRadius: "50px",
                  position: "absolute",
                  right: "15px",
                  top: "15px",
                  fontSize: "14px",
                  // top: "70px",
                }}
              ></i>
              <Modal.Body>
                <div className="poppins-regular" style={{}}>
                  We understand that plans can change. Our cancellation policy
                  is designed to be fair and transparent for all our customers.
                </div>

                <div className="d-flex mt-2">
                  <div className="col-md-1">
                    <i
                      class="fa-solid fa-star"
                      style={{ color: "green", fontSize: "16px" }}
                    ></i>
                  </div>
                  <div className="col-md-11 mt-1 poppins-regular cancellation_text">
                    No Cancellation Charges !!
                  </div>
                </div>

                <div className="d-flex mt-2">
                  <div className="col-md-1">
                    <i
                      class="fa-solid fa-star"
                      style={{ color: "green", fontSize: "16px" }}
                    ></i>
                  </div>
                  <div className="col-md-11 mt-1 poppins-regular cancellation_text">
                    Cancellation Charges !!
                  </div>
                </div>

                <div className="d-flex mt-2">
                  <div className="col-md-1">
                    <i
                      class="fa-solid fa-star"
                      style={{ color: "green", fontSize: "16px" }}
                    ></i>
                  </div>
                  <div className="col-md-11 mt-1 poppins-regular cancellation_text">
                    Within 4 Hours to 1 Hour Before Scheduled Slot: Full House
                    Cleaning: ₹500
                  </div>
                </div>

                <div className="d-flex mt-2">
                  <div className="col-md-1">
                    <i
                      class="fa-solid fa-star"
                      style={{ color: "green", fontSize: "16px" }}
                    ></i>
                  </div>
                  <div className="col-md-11 mt-1 poppins-regular cancellation_text">
                    Sofa/Kitchen/Bathroom/Mini-Services Cleaning: ₹100
                  </div>
                </div>

                <div className="d-flex mt-2">
                  <div className="col-md-1">
                    <i
                      class="fa-solid fa-star"
                      style={{ color: "green", fontSize: "16px" }}
                    ></i>
                  </div>
                  <div className="col-md-11 mt-1 poppins-regular cancellation_text">
                    Home Repair Services : 200
                  </div>
                </div>

                <div className="d-flex mt-2">
                  <div className="col-md-1">
                    <i
                      class="fa-solid fa-star"
                      style={{ color: "green", fontSize: "16px" }}
                    ></i>
                  </div>
                  <div className="col-md-11 mt-1 poppins-regular cancellation_text">
                    Appliances Services : 200
                  </div>
                </div>

                <div className="d-flex mt-2">
                  <div className="col-md-1">
                    <i
                      class="fa-solid fa-star"
                      style={{ color: "green", fontSize: "16px" }}
                    ></i>
                  </div>
                  <div className="col-md-11 mt-1 poppins-regular cancellation_text">
                    Within 1 Hour and After Scheduled Slot: Full House Cleaning:
                    ₹700
                  </div>
                </div>

                <div className="d-flex mt-2">
                  <div className="col-md-1">
                    <i
                      class="fa-solid fa-star"
                      style={{ color: "green", fontSize: "16px" }}
                    ></i>
                  </div>
                  <div className="col-md-11 mt-1 poppins-regular cancellation_text">
                    Sofa/Kitchen/Bathroom/Mini-Services Cleaning: ₹150
                  </div>
                </div>

                <div className="d-flex mt-2">
                  <div className="col-md-1">
                    <i
                      class="fa-solid fa-star"
                      style={{ color: "green", fontSize: "16px" }}
                    ></i>
                  </div>
                  <div className="col-md-11 mt-1 poppins-regular cancellation_text">
                    We appreciate your understanding and cooperation.
                  </div>
                </div>

                <div className="d-flex mt-2">
                  <div className="col-md-1">
                    <i
                      class="fa-solid fa-star"
                      style={{ color: "green", fontSize: "16px" }}
                    ></i>
                  </div>
                  <div className="col-md-11 mt-1 poppins-regular cancellation_text">
                    Please contact us as soon as possible if you need to cancel
                    or reschedule your service to avoid any charges.
                  </div>
                </div>

                <div className="d-flex mt-2">
                  <div className="col-md-1">
                    <i
                      class="fa-solid fa-star"
                      style={{ color: "green", fontSize: "16px" }}
                    ></i>
                  </div>
                  <div className="col-md-11 mt-1 poppins-regular cancellation_text">
                    Before 4 Hours: If you cancel your service more than 4 hours
                    before the scheduled slot, there will be no cancellation
                    charges.
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Cartbook;
