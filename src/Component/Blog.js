import React from "react";
import NavbarCompo from "./navbar";
import Footer from "./Footer";
import Homenavbar from "./Homenavbar";
import appliancerepair from "../../src/assests/Appliance-blog.webp";
import packersandmovers from "../../src/assests/vhs-blog.webp";
import keytrends from "../../src/assests/Packers2-blog.webp";
import technological from "../../src/assests/logistic-blog.webp";
import toptips from "../../src/assests/Packers1-blog.webp";
import fridgerepair from "../../src/assests/Fridge Repair 1.jpg";
import acrepair from "../../src/assests/AC Repair 2.jpg";
import packersahmedabad from "../../src/assests/packers-movers-ahmedabad.jpg"; 
import coolcomfort from "../../src/assests/cool-comfort-Ahmedabad.jpg";
import appliancerepairblr from "../../src/assests/HomeAppliance-Bangalore.jpg";
import packersbhubaneshwar from "../../src/assests/Packers-Movers-Bhubaneshwar.jpg";
import moversgurugram from "../../src/assests/movers-gurugram.webp";
import washingmachine from "../../src/assests/Washing-Machine- Repair.webp";
import relocation from "../../src/assests/relocation.jpg";
import electronics from "../../src/assests/electronics.jpg";

import { Link } from "react-router-dom";

// Function to create SEO-friendly URL
const generateUrl = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "") // Remove special characters
    .replace(/\s+/g, "-"); // Replace spaces with hyphens
};

// Function to render each blog card
const BlogCard = ({ image, title, description }) => {
  const blogUrl = generateUrl(title);
  return (
    <div className="col-md-4 mb-4">
      <Link to={`/blogdetails/${blogUrl}`} style={{ textDecoration: "none" }}>
        <img src={image} alt={`${title} image`} style={{ width: "100%", height: "200px" }} />
        <div className="poppins-black pt-1" style={{ color: "black" }}>
          {title}
        </div>
        <div className="poppins-regular b-desc">{description}</div>
        <div className="d-flex pt-2">
          <div className="poppins-black" style={{ color: "darkred" }}>
            Read More
          </div>
          <i className="fa-solid fa-arrow-right mx-2 pt-1" style={{ fontSize: "19px", color: "black" }}></i>
        </div>
      </Link>
    </div>
  );
};

const Blog = () => {
  // Define blog data
  const blogs = [
    {
      image: appliancerepair,
      title: "Vijay Home Appliance Repair Services",
      description: `In today's fast-paced world, household appliances are essential for maintaining comfort and efficiency in our daily lives...`,
    },
    {
      image: packersandmovers,
      title: "Vijay Home Packers and Movers: Your Hassle-Free Moving Partner",
      description: `Moving to a new home can be an exciting experience—new beginnings, a fresh start...`,
    },
    {
      image: keytrends,
      title: "Key Trends Shaping the Packers and Movers Industry in 2024",
      description: "Six key trends shaping the Packers and Movers industry in 2024",
    },
    {
      image: technological,
      title: "Leading Technological Developments in the Logistics Sector",
      description: "The logistics industry has experienced tremendous growth and transformation over the past decade...",
    },
    {
      image: toptips,
      title: "Top Tips for Finding the Best Packers and Movers Deals",
      description: "Relocating can be a daunting task, whether it's moving to a new city or just across town...",
    },
    {
      image: fridgerepair,
      title: "How Can I Have My Refrigerator Fixed in Bangalore?",
      description: "One of the best ways to ease the burden is by hiring professional Vijay packers and movers...",
    },
    {
      image: acrepair,
      title: "Get Professionals to Repair Your AC Quickly in Bangalore",
      description: "When your air conditioner (AC) breaks down, especially during Bangalore’s hot summer months...",
    },
    {
      image: packersahmedabad,
      title: "Packers and Movers in Ahmedabad: Vijay Home Services",
      description: "Relocating can be both an exciting and challenging experience, with endless tasks and a hefty amount of packing and moving to manage. In a bustling city like Ahmedabad, where people are constantly moving in and out for work, business, or family reasons, reliable and efficient packers and movers services have become essential.",
    },
    {
      image: coolcomfort,
      title: "Cool Comfort: Premier AC Service in Ahmedabad",
      description: "In the hot and humid climate of Ahmedabad, air conditioners are essential for comfort and productivity. However, without regular maintenance, air conditioners can become less effective, consume more energy, and even break down when you need them most. Cool Comfort provides a complete solution with Split AC Service in Ahmedabad and Window AC Service in Ahmedabad, designed to keep your home and workplace cool and comfortable year-round.",
    },
    {
      image: packersbhubaneshwar,
      title: "Best Packers and Movers in Bhubaneshwar",
      description: "Bhubaneshwar, the capital of Odisha, is a rapidly growing city that has become a hub for education, business, and tourism. The demand for relocation services is consistently high, thanks to the city's booming development and frequent movement of students, professionals, and businesses. Choosing reliable packers and movers in Bhubaneshwar can make all the difference in ensuring a hassle-free relocation. In this article, we’ll introduce some of the best packers and movers in Bhubaneshwar, explain what makes them stand out, and provide tips to help you choose the best service provider.",
    },
    {
      image: appliancerepairblr,
      title: "Best Appliance Repair Services in Bangalore",
      description: "Bangalore, the IT hub of India, is known for its fast-paced lifestyle and constant demand for reliable home services. With the growing population, the need for efficient appliance repair services has increased. Whether it’s washing machine repairs, refrigerator repairs, or split AC services, having dependable professionals at hand can save time, reduce inconvenience, and extend the life of essential appliances. This article explores some of the best appliance repair services in Bangalore, highlighting providers known for their expertise, affordability, and customer satisfaction.",
    },
    {
      image: moversgurugram,
      title: "Reliable and Affordable Relocation Services in Gurugram",
      description: "Relocating can be an overwhelming experience, filled with both logistical and emotional challenges. Fortunately, in Gurugram, companies like Vijay Home Services are redefining the relocation experience by offering professional, reliable, and affordable movers and packers services. Their dedication to excellence, openness, and client pleasure has established them as a reliable brand in the sector. Here’s an in-depth look at how Vijay Home Services can make your move seamless and stress-free.",
    },
    {
      image: washingmachine,
      title: "Why Regular Washing Machine Maintenance Service is Crucial",
      description: "Regular maintenance of your washing machine is essential for its longevity, efficiency, and overall performance. With frequent use, washing machines are susceptible to wear and tear, which can lead to unexpected breakdowns and costly repairs.",
    },
    {
      image: relocation,
      title: "Best Time to Relocate: An Intracity and Intercity Relocation Tips",
      description: "Relocating, whether within the city or to a new one, involves meticulous planning and preparation. Whether it’s a local shift in areas like HBR Layout or Horamavu in Bangalore,or an intercity move to another state, timing plays a crucial role in ensuring a smooth relocation experience. The best time to relocate can depend on factors like weather, availability of packers and movers, and personal schedules. In this guide, we'll explore expert relocation tips by Vijay Home Service to help you choose the right time for your move and make the process hassle-free.",
    },
    {
      image: electronics,
      title: "Safe House Relocation: How to Keep Your Electronics Safe",
      description: "Relocating a home can be an exciting experience, but it comes with its fair share of challenges. One of the biggest concerns during any move is ensuring the safety of your electronics. These valuable items, from your high-definition television to your sophisticated sound system and computers, are not only expensive but also sensitive to movement, shocks, and temperature fluctuations. For homeowners in HBR Layout and Horamavu, Bangalore, Vijay Home Service, known for its reliable Packers and Movers, can be the perfect partner to ensure a smooth and damage-free relocation.",
    },
  ];

  return (
    <div className="">
      <NavbarCompo />
      <Homenavbar />
      <div className="container">
        <div className="row p-2 mb-3">
          <h1 className="poppins-semibold mt-2 mb-3">Blogs</h1>
          {/* Render each blog card */}
          {blogs.map((blog, index) => (
            <BlogCard key={index} image={blog.image} title={blog.title} description={blog.description} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
