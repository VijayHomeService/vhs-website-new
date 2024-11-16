import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Header from "./Header";
import NabarCompo from "./navbar";
import axios from "axios";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Autocomplete,
  useJsApiLoader,
} from "@react-google-maps/api";
import Modal from "react-bootstrap/Modal";
import Calendar from "react-calendar";
import { Button } from "react-bootstrap";
import Header2 from "./Header2";
import Homenavbar from "./Homenavbar";
import Footer from "./Footer";

function Summary() {
  const location = useLocation();
  const { plan, sdata, city } = location.state || {};

  // const capscity = city.charAt(0).toUpperCase() + city.slice(1);
  const capscity = city ? city.charAt(0).toUpperCase() + city.slice(1) : "";

  console.log("capscity", city);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const utm_source = localStorage.getItem("utm_source");
  const storedQuery = localStorage.getItem("fullQuery");

  const [addondata, setaddondata] = useState([]);
  const dispatch = useDispatch();
  const MyCartItmes = useSelector((state) => state.cart);
  const MyCartaddonItmes = useSelector((state) => state.addon);
  const [fourDates, setFourDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [datepicker, setdatePicker] = useState(false);

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedPlaceAddress, setSelectedPlaceAddress] = useState("");
  const autocompleteRef = useRef(null);
  const mapRef = useRef(null);
  const [voucherdata, setvoucherdata] = useState([]);
  const [voucherCodeValue, setVoucherCodeValue] = useState();
  const [Carttotal, setCarttotal] = useState(0);
  const [Fulladd, setFulladd] = useState("");
  const [show2, setShow2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [Url, setUrl] = useState("");
  const [paymentModel, setpaymentModel] = useState(false);
  const [showbutton, setshowbutton] = useState(false);
  const [mainContact, setMainContact] = useState("");
  const [name, setname] = useState("");
  const [whatsappdata, setwhatsappdata] = useState([]);
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

  const [show6, setShow6] = useState(false);

  const handleClose6 = () => setShow6(false);
  const handleShow6 = () => setShow6(true);

  const handleClose2 = () => setShow2(false);

  const handlesuccess = () => {
    setShow2(false);
    window.location.assign("/thank-you");
  };

  const [responseData, setResponseData] = useState(null);
  const [email, setemail] = useState("");
  const [customerName, setcustomerName] = useState("");

  // const user = JSON.parse(localStorage.getItem("user"));

  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);

  const [validationMessage, setValidationMessage] = useState("");

  const [discountedTotal, setDiscountedTotal] = useState(0);

  const [SavedAmount, setSavedAmount] = useState(0);

  const [couponPercentage, setCouponPercentage] = useState(0);
  const [DiscountAmount, setDiscountAmount] = useState(0);

  const applyCouponCode = async () => {
    if (voucherCodeValue === voucherdata?.voucherCode) {
      const discountAmount =
        (Carttotal * parseInt(voucherdata?.discountPercentage)) / 100;

      setDiscountAmount(Carttotal - discountAmount);
      setCouponPercentage(parseInt(voucherdata.discountPercentage));
    }
  };

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

  const currentDate = new Date();

  const sendOTP = async () => {
    // Validate mobile number
    const isValidMobile = /^\d{10}$/.test(mainContact);

    if (!isValidMobile) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      const response = await axios.post(
        "https://api.vijayhomeservicebengaluru.in/api/sendotp/sendByCartBook",
        {
          mainContact: mainContact,
          customerName: name,
          reference: utm_source ? utm_source : storedQuery,
          service: sdata?.Subcategory,
        }
      );

      if (response.status === 200) {
        // setUser(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        // navigate("/cartbook");
        // getAddress(response.data.user);
        window.location.assign("/summary");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
      }
    }
  };

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    const getNextDays = () => {
      const nextDays = [];
      const currentDate = new Date();

      for (let i = 0; i < 12; i++) {
        // Changed to 12 dates
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() + i);

        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const dayName = daysOfWeek[date.getDay()];

        nextDays.push({ day, month, year, dayName });
      }

      return nextDays;
    };

    const nextDays = getNextDays();
    setFourDates(nextDays);
  }, []);

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

  const handleCheckboxSelect = (day) => {
    const formattedDate = `${day.year}-${day.month}-${day.day}`;
    const selectedDate = moment(formattedDate, "YYYY-MM-DD");

    setSelectedDate(selectedDate.format("YYYY-MM-DD"));
  };

  useEffect(() => {
    getaddon();
  }, []);

  const getaddon = async () => {
    let res = await axios.get(
      "https://api.vijayhomesuperadmin.in/api/userapp/getServiceAddOns"
    );
    if ((res.status = 200)) {
      setaddondata(
        res.data?.AddOns.filter((i) => i.addOnsCategory === sdata?.serviceName)
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
    // e.preventDefault();
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

  const a = plan.pofferprice - (plan.pofferprice * couponPercentage) / 100;

  const saveAddress1 = () => {
    const fullAddress = `${houseFlat}, ${landmark},${selectedPlaceAddress}, ${
      home ? "Home" : "Others: " + othersPlace
    }`;
    setFulladd(fullAddress);
  };

  const filteredData =
    sdata?.store_slots?.filter((item) => item.slotCity === capscity) || [];

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

    slots.sort((a, b) => {
      const startTimeA = moment(a.startTime, "hA");
      const startTimeB = moment(b.startTime, "hA");
      return startTimeA.diff(startTimeB);
    });

    return (
      <div className="row">
        {slots.map((slot, index) => (
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
                  className="mt-4 poppins-light"
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

  const calculateExpiryDate = (selectedDate, servicePeriod) => {
    let monthsToAdd = 0;

    // Determine the number of months to add based on service period
    if (servicePeriod === "monthly") {
      monthsToAdd = 1;
    } else if (servicePeriod === "quart") {
      monthsToAdd = 3;
    } else if (servicePeriod === "half") {
      monthsToAdd = 6;
    } else if (servicePeriod === "year") {
      monthsToAdd = 12;
    }

    // Calculate the expiryDate by adding the months
    const expiryDate = moment(selectedDate)
      .add(monthsToAdd, "months")
      .format("YYYY-MM-DD");

    return expiryDate;
  };
  const servicePeriod = plan?.servicePeriod;
  const serviceFrequency = plan?.pservices;
  const expiryDate = calculateExpiryDate(selectedDate, servicePeriod);

  const sDate = moment(selectedDate, "YYYY-MM-DD");
  const eDate = moment(expiryDate, "YYYY-MM-DD");

  const totalDays = Math.ceil(eDate.diff(sDate, "days"));
  const interval = Math.ceil(totalDays / serviceFrequency);
  const sAmtDate = moment(selectedDate, "YYYY-MM-DD");
  const eamtDate = moment(selectedDate, "YYYY-MM-DD");
  const amtFrequency = 1;
  const totalamtDays = Math.ceil(eamtDate.diff(sAmtDate, "days"));
  const intervalamt = Math.ceil(totalamtDays / amtFrequency);

  const dividedDates = [];
  const dividedamtCharges = [];
  const dividedamtDates = [];

  const sf = serviceFrequency ? serviceFrequency : "1";
  for (let i = 0; i < sf; i++) {
    const date = sDate
      .clone()
      .add(interval * i, "days")
      .format("YYYY-MM-DD");
    dividedDates.push(date);
  }

  for (let i = 0; i < 1; i++) {
    const date = sDate
      .clone()
      .add(intervalamt * i, "days")
      .format("YYYY-MM-DD");
    dividedamtDates.push(date);
    const charge = a;
    dividedamtCharges.push(charge);
  }

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
            customerData: user,
            dividedDates: dividedDates ? dividedDates : selectedDate,
            dividedamtCharges: dividedamtCharges,
            dividedamtDates: dividedamtDates,
            customerName: customerName,
            email: email,
            cardNo: user?.cardNo,
            category: sdata?.category,
            contractType: !plan?.pservices ? "One Time" : "AMC",
            service: sdata?.serviceName,
            serviceID: sdata?._id,
            serviceCharge: a,
            dateofService: selectedDate,
            selectedSlotText: selectedSlotText,
            serviceFrequency: plan?.pservices,
            startDate: selectedDate,
            planName: plan?.pName,
            expiryDate: expiryDate,
            firstserviceDate: selectedDate,
            date: moment().format("YYYY-MM-DD"),
            time: moment().format("LT"),
            type: "website",
            reference: utm_source ? utm_source : storedQuery,
            city: capscity,
            userId: user?._id,
            discAmt: 0,
            GrandTotal: a,
            paymentMode: "cash",
            TotalAmt: plan?.pPrice,
            couponCode: voucherCodeValue,
            totalSaved: Math.abs(plan?.pofferprice - plan?.pPrice),
            markerCoordinate: selectedLocation,
            deliveryAddress: selectedAddress,
          },
        };

        const response = await axios(config);

        if (response.status === 200) {
          const selectedResponse = whatsappdata[0];
          setShow2(true);
          setResponseData(response.data);
          makeApiCall(selectedResponse, user.mainContact);
        }
      } catch (error) {
        console.error(error);
        alert("Not Added");
      } finally {
        setLoading(false);
      }
    }
  };

  const [selectedAddress, setSelectedAddress] = useState({});
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
    const serviceName = content.replace(/\{Service_name\}/g, sdata.serviceName);
    const slotTiming = serviceName.replace(
      /\{Slot_timing\}/g,
      selectedSlotText
    );
    const serivePrice = slotTiming.replace(/\{Service_amount\}/g, a);
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
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getVoucher = async () => {
    let res = await axios.get(
      "https://api.vijayhomesuperadmin.in/api/userapp/getvoucher"
    );
    if (res.status === 200) {
      const uniqueCategories = sdata?.category;
      let filteredVoucherData = res.data?.voucher.find(
        (voch) => voch.category === uniqueCategories
      );

      setvoucherdata(filteredVoucherData);
    }
  };

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBF48uqsKVyp9P2NlDX-heBJksvvT_8Cqk",
    libraries: ["places"],
  });

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

  const updateddata = {
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
    city: capscity,
    userId: user?._id,
    discAmt: 0,
    GrandTotal: DiscountAmount,
    paymentMode: "cash",
    TotalAmt: Carttotal,
    couponCode: voucherCodeValue,
    totalSaved: SavedAmount,
    markerCoordinate: selectedAddress?.markerCoordinate,
    deliveryAddress: selectedAddress,
    amount: DiscountAmount,
    number: "8951592630",
    MUID: "MUID" + Date.now(),
    transactionId: "T" + Date.now(),
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "https://api.vijayhomeservicebengaluru.in/api/payment/yogipayment",
        updateddata
      );

      if (res.data.redirectUrl) {
        setpaymentModel(true);
        setUrl(res.data.redirectUrl);
      } else {
        console.log("No redirect URL found in the response.");
      }
    } catch (error) {
      console.error("Payment initiation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    const paydata1 = {
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
      city: capscity,
      userId: user?._id,
      discAmt: couponPercentage,
      GrandTotal: a,
      paymentMode: "online",
      TotalAmt: plan.pPrice,
      couponCode: voucherCodeValue,
      totalSaved: savedamount,
      markerCoordinate: selectedAddress?.markerCoordinate,
      deliveryAddress: selectedAddress,
      amount: a,
      number: "8951592630",
      MUID: "MUID" + Date.now(),
      transactionId: "T" + Date.now(),
    };

    const updatedRedirectUrl = `https://api.vijayhomeservicebengaluru.in/api/payment/handlepaystatus/${paydata1.transactionId}/${paydata1.userId}/${paydata1.serviceID}`;

    const paymentString = new URLSearchParams({
      merchant_id: paymentData.merchant_id,
      order_id: paymentData.order_id,
      currency: paymentData.currency,
      amount: a,
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

  const savedamount = Math.abs(plan.pofferprice - plan.pPrice);

  return (
    <div className="">
      <Header2 />
      <Homenavbar />

      <div className="container mt-1">
        <div className="row">
          {value?.mainContact ? (
            <>
              {!show1 && (
                <>
                  <div
                    className="mb-3 mt-1 poppins-semibold"
                    style={{
                      color: "black",
                      fontSize: "20px",
                      fontWeight: "bold",
                      textAlign: "left",
                    }}
                  >
                    Service Details
                  </div>

                  <div className="row">
                    <div className="col-md-3">
                      <img
                        src={sdata?.imglink}
                        alt="loading...."
                        style={{
                          width: "100%",
                          borderRadius: "10px",
                          height: "150px",
                        }}
                      />
                    </div>
                    <div className="col-md-9 mt-4">
                      <div
                        className="poppins-black"
                        style={{
                          fontSize: "18px",
                          color: "black",
                          fontWeight: "bold",
                          marginTop: 5,
                          textAlign: "left",
                        }}
                      >
                        {sdata?.serviceName}
                      </div>
                      <div
                        className="poppins-regular"
                        style={{
                          fontSize: "14px",
                          color: "grey",
                          marginTop: 5,
                        }}
                      >
                        {sdata?.serviceDesc[0]?.text}
                      </div>
                      <div className="d-flex mt-1">
                        <div
                          className="poppins-regular"
                          style={{
                            textDecoration: "line-through",
                            color: "black",
                            fontWeight: "bold",
                            fontSize: "16px",
                          }}
                        >
                          ₹{plan.pPrice}
                        </div>
                        <div
                          className="mx-2 poppins-regular"
                          style={{
                            color: "red",
                            fontSize: "16px",
                            fontWeight: "bold",
                          }}
                        >
                          ₹{plan.pofferprice}
                        </div>
                      </div>
                      {plan?.pservices ? (
                        <div
                          className="poppins-regular mt-1"
                          style={{ color: "black" }}
                        >
                          {plan?.pservices} Services
                        </div>
                      ) : (
                        ""
                      )}
                      <div className="poppins-regular">
                        {sdata?.serviceHours}
                      </div>
                    </div>
                  </div>

                  <div className="scheduleservice mb-4">
                    <div
                      className="title poppins-semibold"
                      style={{ textAlign: "left" }}
                    >
                      Schedule Service
                    </div>
                    <div className="select_date">
                      <div className="text poppins-medium mt-2">
                        Select the date
                      </div>

                      {/* <div className="date_selection">
          {fourDates?.map((day, index) => {
            const isDefaultChecked = isDateSelected(day);

            return (
              <label htmlFor={index} key={index}>
                <input type="checkbox" name="" id={day?.day} />

                <span
                  className={`inpt poppins-medium ${
                    isDefaultChecked ? "matching" : ""
                  }`}
                  onClick={() => handleCheckboxSelect(day)}
                >
                  {day?.dayName}- {day?.day}
                </span>
              </label>
            );
          })}
        </div> */}

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
                                className={`  poppins-medium ${
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
                    {/* <div className="select_date">
        <div className="text poppins-medium">Select the Slot</div>

        {renderSlots()}
      </div> */}
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
                        <div className="text poppins-medium">Slots</div>
                      </div>
                      <div
                        className="cartrenderslot1"
                        style={{ marginTop: "-15px" }}
                      >
                        <div className="mb-3">{renderSlots1()}</div>
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
                    className="shadow-sm mt-2 mb-2"
                    style={{
                      backgroundColor: "white",
                      padding: "10px",
                      borderRadius: "10px",
                    }}
                  >
                    {Object.keys(selectedAddress).length > 0 && (
                      <div
                        className="poppins-regular"
                        style={{ fontSize: "14px" }}
                      >
                        {selectedAddress.platNo},{selectedAddress.address}
                        <p>{selectedAddress.landmark}</p>
                      </div>
                    )}
                    {!Object.keys(selectedAddress).length > 0 && (
                      <>
                        <p
                          className="poppins-regular"
                          style={{ color: "black" }}
                        >
                          Please Select Address
                        </p>
                      </>
                    )}
                  </div>

                  {/* {voucherdata && ( */}
                  <>
                    <div
                      className="mt-3 poppins-semibold"
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
                          onClick={() => {
                            const result = applyCouponCode();
                            setDiscountedTotal(result);
                            // setCouponDiscountShow(true)
                          }}
                          style={{
                            backgroundColor: "darkred",
                            padding: "8px 40px",
                            color: "white",
                            textAlign: "center",
                            borderRadius: "10px",
                            cursor: "pointer",
                            fontSize: "15px",
                          }}
                        >
                          Apply
                        </div>
                      </div>
                    </div>

                    <div style={{ color: "red" }}>{validationMessage}</div>
                  </>
                  {/* )} */}

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
                      <div className="mt-3 mb-2 poppins-light">
                        Customer Name
                      </div>

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
                          className="poppins-light"
                          onChange={(e) => setemail(e.target.value)}
                          value={email}
                          placeholder="Email"
                          style={{ border: "1px solid grey", height: "45px" }}
                        />
                      </div>
                    </>
                  )}

                  <div
                    className="mt-3 poppins-black"
                    style={{
                      color: "#40A2D8",
                      fontWeight: "900",
                      textAlign: "left",
                    }}
                  >
                    * Book Over Rs 1500 to use wallet , upto 10% From your
                    wallet Account !
                  </div>
                  <div
                    className="mt-1 mb-3 poppins-black"
                    style={{
                      color: "#40A2D8",
                      fontWeight: "900",
                      textAlign: "left",
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
                    <div
                      className="col-md-4 poppins-black"
                      style={{ textAlign: "left" }}
                    >
                      Total Amount
                    </div>
                    <div
                      className="col-md-4 poppins-black"
                      style={{
                        textDecoration: "line-through",
                        textAlign: "left",
                      }}
                    >
                      ₹{plan.pPrice}
                    </div>
                  </div>

                  <div
                    className="d-flex mt-3"
                    style={{ justifyContent: "space-between" }}
                  >
                    <div
                      className="col-md-4 poppins-black"
                      style={{ textAlign: "left" }}
                    >
                      Discount
                    </div>
                    <div
                      className="col-md-4 poppins-black"
                      style={{ textAlign: "left" }}
                    >
                      {couponPercentage}%
                    </div>
                  </div>

                  <div
                    className="d-flex mt-3"
                    style={{ justifyContent: "space-between" }}
                  >
                    <div
                      className="col-md-4 poppins-black"
                      style={{ textAlign: "left" }}
                    >
                      Saved
                    </div>
                    <div
                      className="col-md-4 poppins-black"
                      style={{ color: "#40A2D8", textAlign: "left" }}
                    >
                      ₹{savedamount}
                    </div>
                  </div>

                  <div
                    className="d-flex mt-3"
                    style={{ justifyContent: "space-between" }}
                  >
                    <div
                      className="col-md-4 poppins-black"
                      style={{ textAlign: "left" }}
                    >
                      Grand Total
                    </div>
                    <div
                      className="col-md-4 poppins-black"
                      style={{ color: "#40A2D8", textAlign: "left" }}
                    >
                      ₹{a}
                    </div>
                  </div>

                  <div
                    onClick={handleShow6}
                    className="col-md-12 mt-3 shadow poppins-black"
                    style={{
                      // backgroundColor: "darkred",
                      padding: "8px",
                      color: "orange",
                      fontSize: "14px",
                      textAlign: "center",
                      borderRadius: "5px",
                      cursor: "pointer",
                      width: "51%",
                      // marginLeft: "-10px",
                      width: "250px",
                    }}
                  >
                    Cancellation Policy
                  </div>

                  {!showbutton ? (
                    <div className="row mt-4 mb-5">
                      <div
                        onClick={() => setshowbutton(true)}
                        className="col-md-6 poppins-black"
                        style={{
                          backgroundColor: "darkred",
                          padding: "8px",
                          color: "white",
                          fontSize: "14px",
                          textAlign: "center",
                          borderRadius: "5px",
                          cursor: "pointer",
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
                        <div
                          onClick={addtreatmentdetails}
                          className="col-md-8 poppins-black"
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
                          {/* After Service */}
                          {loading ? "Loading..." : "After Service"}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div
                          onClick={handleSubmit1}
                          className="col-md-8 poppins-black"
                          style={{
                            backgroundColor: "#040458db",
                            padding: "8px 25px",
                            color: "white",
                            fontSize: "14px",
                            textAlign: "center",
                            borderRadius: "5px",
                            cursor: "pointer",
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
                    style={{ fontSize: "20px", fontWeight: "bold" }}
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
                                textAlign: "left",
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
              {/* Success */}

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
                      <div className="col-md-1  mx-2">:</div>
                      <div className="col-md-6 poppins-black">
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
                      <div
                        className="col-md-6 poppins-black"
                        style={{ textAlign: "center" }}
                      >
                        {responseData?.data.service}
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

                    {responseData?.data.GrandTotal >= 1500 ? (
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
                          {(responseData?.data.GrandTotal * 0.02).toFixed(2)}/-
                          in your Wallet..!!
                        </p>
                      </div>
                    ) : (
                      <></>
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
                    is designed to be fair and transparent for all our
                    customers.
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
                      Within 1 Hour and After Scheduled Slot: Full House
                      Cleaning: ₹700
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
                      Please contact us as soon as possible if you need to
                      cancel or reschedule your service to avoid any charges.
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
                      Before 4 Hours: If you cancel your service more than 4
                      hours before the scheduled slot, there will be no
                      cancellation charges.
                    </div>
                  </div>
                </Modal.Body>
              </Modal>
            </>
          ) : (
            <div className="row">
              <div className="col-md-12">
                <div
                  className="row mb-5"
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <div
                    className="col-md-5"
                    style={{
                      marginTop: "10%",
                      border: "1px solid grey",
                      padding: "20px",
                      borderRadius: "5px",
                    }}
                  >
                    <div
                      className="row"
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <img
                        src="./images/vhs.png"
                        style={{
                          width: "110px",
                          height: "90px",
                          textAlign: "center",
                        }}
                        alt="VHS Logo"
                      />

                      <div
                        className="mt-3"
                        style={{
                          color: "black",
                          fontSize: "17px",
                          textAlign: "center",
                          fontWeight: "bold",
                        }}
                      >
                        Login With Mobile Number
                      </div>

                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                        placeholder="Enter Name"
                        style={{
                          border: "1px solid grey",
                          height: "45px",
                          width: "60%",
                          marginTop: "15px",
                        }}
                      />

                      <input
                        type="text"
                        value={mainContact}
                        onChange={(e) => setMainContact(e.target.value)}
                        placeholder="Enter Mobile Number"
                        style={{
                          border: "1px solid grey",
                          height: "45px",
                          width: "60%",
                        }}
                      />

                      <div
                        onClick={sendOTP}
                        className="mb-2"
                        style={{
                          textAlign: "center",
                          color: "white",
                          fontSize: 16,
                          fontWeight: "800",
                          backgroundColor: "darkred",
                          padding: "5px",
                          width: "60%",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      >
                        SIGN IN
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="text-container"
                style={{
                  textAlign: "center",
                  // 0.5-inch gap between login container and text
                  fontSize: "27px", // Font size set to 27px
                  fontWeight: "1000", // Make font bold
                  fontFamily: "Poppins, sans-serif", // Apply Poppins font
                  animation: "pulse 1s infinite", // Apply pulse effect automatically
                  marginBottom: "20px",
                }}
              >
                <p style={{ margin: "0", color: "#004aad" }}>
                  "We deliver  <span style={{ color: "#960f14" }}>Top Quality</span>
                </p>
                <p style={{ margin: "0", color: "#004aad" }}>Service"</p>
                <style>
                  {`
            @keyframes pulse {
              0% {
                transform: scale(1);
              }
              50% {
                transform: scale(1.1);
              }
              100% {
                transform: scale(1);
              }
            }
          `}
                </style>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Summary;
