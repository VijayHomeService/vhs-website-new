import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { addToCart1, removeMyCartItem, clearCart } from "../Redux1/MyCartSlice";
import { deleteMyCartItem } from "../Redux1/MyCartSlice"; // Adjust the path as needed
import NabarCompo from "./navbar";

import { useNavigate, Link, useLocation } from "react-router-dom";
import Header1 from "./Header1";
import Cartnavbar from "./Cartnavbar";
import Footer from "./Footer";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { city } = location.state || {};

  const user = localStorage.getItem("user");

  const handle = (item) => {
    dispatch(addToCart1(item));
  };

  const handleChange = () => {
    if (user) {
      navigate("/cartbook", { state: { city: city } });
    } else {
      navigate("/login", { state: { city: city } });
    }
  };

  const MyCartItmes = useSelector((state) => state.cart);

  const Carttotal = MyCartItmes?.reduce((accumulator, item) => {
    const offerPrice = parseFloat(item?.offerprice);
    const quantity = parseInt(item?.qty);

    if (!isNaN(offerPrice) && !isNaN(quantity)) {
      const subtotal = offerPrice * quantity;

      return accumulator + subtotal;
    } else {
      return accumulator;
    }
  }, 0);

  const clear = () => {
    dispatch(clearCart());
  };

  return (
    <>
      <Header1 />
      <Cartnavbar />
      <div className="container">
        <div className="row" style={{ justifyContent: "center" }}>
          {/* <NabarCompo /> */}
          {/* <Header1 /> */}
          <div className="col-md-8 mt-4" style={{}}>
            {MyCartItmes?.map((item) => (
              <div
                className=" shadow-sm"
                style={{
                  backgroundColor: "white",
                  padding: "10px",
                  marginBottom: "15px",
                  borderRadius: "5px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div className="col-md-10">
                  <div className="poppins-regular mb-1">{item?.planName}</div>
                  <div className="poppins-regular mb-1">{item?.category}</div>
                  <div className="d-flex">
                    <div
                      className="poppins-regular mb-1"
                      style={{ textDecoration: "line-through" }}
                    >
                      ₹{item.planPrice}
                    </div>
                    <div className="mx-2 poppins-regular">
                      ₹{item?.offerprice}
                    </div>
                  </div>
                </div>
                <div className="col-md-2">
                  <div
                    className="poppins-regular"
                    style={{ textAlign: "center" }}
                  >
                    ₹{item?.offerprice}
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
                      className="mx-2"
                      style={{
                        color: "black",
                        fontSize: "14px",
                        marginTop: "3px",
                      }}
                    >
                      {item?.qty}
                    </div>
                    <div className="" onClick={() => handle(item)}>
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

            <div className="row mt-5 mb-5">
              <div className="col-md-6 d-flex">
                <p
                  className="poppins-extrabold"
                  style={{ color: "black", fontSize: 18, fontWeight: "bold" }}
                >
                  Total :
                </p>
                <p
                  className="mx-2 poppins-extrabold"
                  style={{ fontSize: 18, fontWeight: "bold", color: "black" }}
                >
                  {Carttotal}
                </p>
              </div>
              <div
                className="col-md-6"
                style={{ display: "flex", justifyContent: "end" }}
              >
                {MyCartItmes !== undefined ? (
                  <button
                    onClick={handleChange}
                    style={{
                      backgroundColor: "darkred",
                      padding: 5,
                      borderRadius: 5,
                      width: 130,
                    }}
                  >
                    <span
                      className="poppins-extrabold"
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 17,
                        textAlign: "center",
                      }}
                    >
                      Continue
                    </span>
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>

          <Footer />

          {/* <div className="col-md-8 mt-5 ">
        {MyCartItmes.map((item) => (
          <div
            className="row shadow-lg"
            style={{
              backgroundColor: "white",
              padding: "10px",
              marginBottom: "15px",
            }}
          >
            <div className="">{item.planName}</div>
            <div className="">{item?.planPrice}</div>
            <div className="d-flex">
              <div className="" style={{ textDecoration: "line-through" }}>
                ₹{item?.planPrice}
              </div>
              <div className="mx-2">₹{item?.offerprice}</div>
            </div>
          </div>
        ))}
      </div> */}
        </div>
      </div>
    </>
  );
}
export default Cart;
