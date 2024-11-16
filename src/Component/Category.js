import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";
import NavbarCompo from "./navbar";
import Homenavbar from "./Homenavbar";


const Category = () => {
  const { data } = useParams();
  const [subcategoryData, setSubcategoryData] = useState([]);
  const [city, setCity] = useState("");


  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    if (data) {
      const parts = data.split("-");
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

      const fullServiceName = services.find((service) =>
        service.toLowerCase().includes(category1.toLowerCase())
      );

      if (fullServiceName) {
        const city = parts.slice(3).join("-");
        setCity(city);
        getSubcategory(fullServiceName);
      } else {
        console.error("Service not found");
      }
    }
  }, [data]);

  const getSubcategory = async (category) => {
    try {
      let res = await axios.post(
        `https://api.vijayhomesuperadmin.in/api/userapp/postappsubcat`,
        { category: category }
      );

      if (res.status === 200) {
        setSubcategoryData(res.data.subcategory);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <NavbarCompo />
      <Homenavbar />
      <div className="container">
        <div className="row mb-4 justify-content-center">
          <h1 className="poppins-semibold mt-4">{data}</h1>
          {subcategoryData.map((ele, index) => (
            <div className="col-md-3 mt-3" key={index}>
              <Link
  to={{
    pathname: `/service/${ele.subcategory
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/-in/g, "")}-in-${city
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/-in/g, "")}`,
    state: { data: ele },
  }}
  className="text-decoration-none text-black"
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
  );
};

export default Category;
