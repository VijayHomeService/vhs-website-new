import React from "react";
import { Router, Routes, Route, Redirect } from "react-router-dom";
import SEO from "./SEO.js"; // Import the SEO component....................
import Login from "./Component/Login/Login";
import Register from "./Component/Register/Register";
import ResetPassword from "./Component/ResetPassword/ResetPassword";
import ServicesView from "./Pages/ServicesView/ServicesView";
import ViewCart from "./Pages/ViewCart/ViewCart";
import Booking from "./Pages/Booking/Booking";
import BookingDetails from "./Pages/BookingDetail/BookingDetails";
import Servicedetails from "./Component/Servicedetails";
import Viewdetails from "./Component/Viewdetails";
import Cart from "./Component/Cart";
import Espage from "./Component/Espage";
import Cartbook from "./Component/Cartbook";
import Home from "./Component/Home";
import Summary from "./Component/Summary";
import Esuccess from "./Component/Esuccess";
import Success from "./Component/Success";
import Paymentgateway from "./Component/Paymentgateway";
import About from "./Component/About";
import Career from "./Component/Career";
import Paymentsuccess from "./Component/Paymentsuccess";
import Paymentfailure from "./Component/Paymentfailure";
import Mybooking from "./Component/Mybooking";
import Mainheader from "./Component/Mainheader";
import Completed from "./Component/Completed";
import Upcomingdetail from "./Component/Upcomingdetail";
import Enquirydetails from "./Component/Enquirydetails";
import Completeddetails from "./Component/Completeddetails";
import Homecity from "./Component/Homecity";
import Subcategory from "./Component/Subcategory";
import Serviceviewdetails from "./Component/Serviceviewdetails";
import Terms from "./Component/Terms";
import Privacy from "./Component/Privacy";
import Cancellation from "./Component/Cancellation";
import Contact from "./Component/Contact";
import Interiorcompany from "./Component/Interiorcompany";
import Categeries from "./Component/Categeries";
import Cartpetcleaning from "./Component/Carpetcleaning";
import Invest from "./Component/Invest";
import Registerus from "./Component/Registerus";
import Homelogin from "./Component/Homelogin";
import Paymentdemo from "./Component/Paymentdemo";
import Blog from "./Component/Blog";
import Blogdetails from "./Component/Blogdetails";
import Thankyou from "./Component/Thankyou";
import Packersmovershome from "./Component/Packersmovershome";
import Phome from "./Component/Phome";
import Pviewdetails from "./Component/Pviewdetails";
import PserviceDetails from "./Component/PserviceDetails";
import Pmsummary from "./Component/Pmsummary";
import Pmlogin from "./Component/Pmlogin";
import Pmorder from "./Component/Pmorder";
import Pmorderdetails from "./Component/Pmorderdetails";
import { useParams } from "react-router-dom";
import { Helmet } from 'react-helmet';
import ApplianceSEO from './Component/appliance seo';
import LocationPage from './Component/LocationPage';
import BangalorePage from "./Component/BangalorePage";  // Import your BangalorePage component
import { HelmetProvider } from 'react-helmet-async'; // Import HelmetProvider
import { useState, useEffect } from 'react';
import  blogContentData from './Component/Blogdetails.js';

// Define CityComponent outside the App function
const CityComponent = () => {

  const { cityName } = useParams();  // Access the cityName parameter from the URL
  

  return (
    <>
      <SEO
        title={`Vijay Home Services in ${cityName}`}
        description={`Explore services in ${cityName}`}
        keywords={`${cityName}, services`}
        url={`/${cityName}`}
        image="path/to/image.jpg"
      />
      <Homecity />
    </>
  );
};

// Helper function to get the first 170 words
const getFirstWords = (text, wordLimit) => {
  const words = text.split(/\s+/); // Split by spaces to count words
  return words.slice(0, wordLimit).join(" ");
};

const toTitleCase = (str) => {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const BlogDetails = () => {
  const { title } = useParams(); // Access the title parameter from the URL
  const [blogContent, setBlogContent] = useState(null); // Initialize as null
  const formattedTitle = toTitleCase(title.replace(/-/g, ' '));

  useEffect(() => {
    // Fetch the blog content using the title as the key
    const blogData = blogContentData[title];

    if (blogData) {
      console.log("Fetched blog data:", blogData);
      setBlogContent(blogData);
    } else {
      console.log("Blog data not found for title:", title); // Debugging log
    }
  }, [title]);

  
  const blogDescriptions = {
    'vijay-home-appliance-repair-services': "In today's fast-paced world, household appliances are essential for maintaining comfort and efficiency in our daily lives.",
    'vijay-home-packers-and-movers-your-hasslefree-moving-partner': 'Moving to a new home can be an exciting experience—new beginnings, a fresh start, and the opportunity to create new memories.  ',
    'key-trends-shaping-the-packers-and-movers-industry-in-2024': 'In 2024, the packers and movers industry is rapidly adopting smart technology and the Internet of Things (IoT) to enhance operational efficiency.  ',
    'leading-technological-developments-in-the-logistics-sector': 'The logistics industry has experienced tremendous growth and transformation over the past decade, largely driven by advancements in technology.  ',
    'top-tips-for-finding-the-best-packers-and-movers-deals': "Relocating can be a daunting task, whether it's moving to a new city or just across town. ",
    'how-can-i-have-my-refrigerator-fixed-in-bangalore': "If you're looking to get your Refrigerator fixed in Bangalore, it’s important to follow a structured approach ",
    'get-professionals-to-repair-your-ac-quickly-in-bangalore': 'Before calling a professional, it helps to have a basic understanding of common AC issues. This allows you to explain the problem better ',
    'packers-and-movers-in-ahmedabad-vijay-home-services': 'Relocating can be both an exciting and challenging experience, with endless tasks and a hefty amount of packing and moving to manage. ',
    'cool-comfort-premier-ac-service-in-ahmedabad': 'In the hot and humid climate of Ahmedabad, air conditioners are essential for comfort and productivity. , ',
    'best-packers-and-movers-in-bhubaneshwar': "Bhubaneshwar, the capital of Odisha, is a rapidly growing city that has become a hub for education, business, and tourism.  ",
    'best-appliance-repair-services-in-bangalore': 'Bangalore, the IT hub of India, is known for its fast-paced lifestyle and constant demand for reliable home services. With the growing population, the need for efficient appliance repair services has increased. ',
    'reliable-and-affordable-relocation-services-in-gurugram': 'Relocating can be an overwhelming experience, filled with both logistical and emotional challenges.  ',
    'why-regular-washing-machine-maintenance-service-is-crucial': 'Regular maintenance of your washing machine is essential for its longevity, efficiency, and overall performance. ',
    'best-time-to-relocate-an-intracity-and-intercity-relocation-tips':'Relocating, whether within the city or to a new one, involves meticulous planning and preparation.  ',
    'safe-house-relocation-how-to-keep-your-electronics-safe': 'Relocating a home can be an exciting experience, but it comes with its fair share of challenges. One of the biggest concerns during any move is ensuring the safety of your electronics. '
    // Add more blog titles and their descriptions here
  };

  // Get the description based on the current blog title
  const blogDescription = blogDescriptions[title]



  return (
    <>
      <SEO
        title={`${formattedTitle}`}  // Set dynamic SEO title
        description={blogDescription} // Set the description to the first 170 words
        keywords={`blog, ${formattedTitle}, article`}  // Dynamic keywords
        url={`/blogdetails/${title}`}
        image="path/to/image.jpg" // Replace with your actual image path
      />
      <Blogdetails />
    </>
  );
};




function App() {

  return (
    <HelmetProvider>
      <>
      <Routes>
     
      
     
  

      <Route
        path="/"
        element={<>
          <SEO
            title="Vijay Home Services - Experience top-notch services"
            description="Experience top-notch home services cleaning, painting, pest control,etc. Lowest Price in Market | ISO Certified Company. Trained Professionals | No Sub Contract. 100% Satisfaction or FREE Rework*."
            keywords="Bathroom cleaning services in Bangalore, Bathroom cleaning services in Mumbai,services Bangalore, packers and movers Bangalore, moving services Bangalore, house cleaning, Packers and Movers Service, Painting Services in Bangalore, Painting Services, Pest Control Services, Best cleaning services in bangalore."
            url="/"
            image="path/to/image.jpg" />
          <Home />
        </>} />

      <Route path="/:cityName" element={<CityComponent />} /> // Title
      // Title
      <Route
        path="/:cityName"
        element={<>
          <SEO
            title="Home City"
            description="Explore services in your city"
            keywords="city, services"
            url={`/$cityName}`}
            image="path/to/image.jpg" />
          <Homecity />
        </>} />
        

      {/* Define a dynamic route with :cityname */}
      <Route path="/:cityName" element={<Packersmovershome />} />

      <Route
        path="login"
        element={<>
          <SEO
            title="Login"
            description="Login to your account"
            keywords="login, user"
            url="/login"
            image="path/to/image.jpg" />
          <Login />
        </>} />
      <Route
        path="register"
        element={<>
          <SEO
            title="Register"
            description="Create a new account"
            keywords="register, sign up"
            url="/register"
            image="path/to/image.jpg" />
          <Register />
        </>} />
      <Route
        path="resetpassword"
        element={<>
          <SEO
            title="Reset Password"
            description="Reset your password"
            keywords="reset, password"
            url="/resetpassword"
            image="path/to/image.jpg" />
          <ResetPassword />
        </>} />
      <Route
        path="servicesview"
        element={<>
          <SEO
            title="Services View"
            description="View our services"
            keywords="services, view"
            url="/servicesview"
            image="path/to/image.jpg" />
          <ServicesView />
        </>} />
      <Route
        path="viewcart"
        element={<>
          <SEO
            title="View Cart"
            description="Check your cart"
            keywords="cart, shopping"
            url="/viewcart"
            image="path/to/image.jpg" />
          <ViewCart />
        </>} />
      <Route
        path="booking"
        element={<>
          <SEO
            title="Booking"
            description="Book a service"
            keywords="booking"
            url="/booking"
            image="path/to/image.jpg" />
          <Booking />
        </>} />
      <Route
        path="bookingdetails"
        element={<>
          <SEO
            title="Booking Details"
            description="Details of your booking"
            keywords="booking, details"
            url="/bookingdetails"
            image="path/to/image.jpg" />
          <BookingDetails />
        </>} />
      <Route
        path="service/:service"
        element={<>
          <SEO
            title="Service Details"
            description="Details of the selected service"
            keywords="service, details"
            url="/service/:service"
            image="path/to/image.jpg" />
          <Servicedetails />
        </>} />
      <Route
        path="viewdetails"
        element={<>
          <SEO
            title="View Details"
            description="Detailed view of the service"
            keywords="details"
            url="/viewdetails"
            image="path/to/image.jpg" />
          <Viewdetails />
        </>} />
      <Route
        path="cart"
        element={<>
          <SEO
            title="Cart"
            description="Your shopping cart"
            keywords="cart"
            url="/cart"
            image="path/to/image.jpg" />
          <Cart />
        </>} />
      <Route
        path="Espage"
        element={<>
          <SEO
            title="Cartbook"
            description="E-service page"
            keywords="e-page, services"
            url="/Espage"
            image="path/to/image.jpg" />
          <Espage />
        </>} />
      <Route
        path="cartbook"
        element={<>
          <SEO
            title="Cart Book"
            description="Book from your cart"
            keywords="cart, book"
            url="/cartbook"
            image="path/to/image.jpg" />
          <Cartbook />
        </>} />
      <Route
        path="summary"
        element={<>
          <SEO
            title="Summary"
            description="Order summary"
            keywords="summary, order"
            url="/summary"
            image="path/to/image.jpg" />
          <Summary />
        </>} />
      <Route
        path="Esuccess"
        element={<>
          <SEO
            title="E-Success"
            description="Success page for E-service"
            keywords="success"
            url="/Esuccess"
            image="path/to/image.jpg" />
          <Esuccess />
        </>} />
      <Route
        path="success"
        element={<>
          <SEO
            title="Success"
            description="Order successful"
            keywords="success, order"
            url="/success"
            image="path/to/image.jpg" />
          <Success />
        </>} />
      <Route
        path="/p"
        element={<>
          <SEO
            title="Payment Gateway"
            description="Proceed with payment"
            keywords="payment, gateway"
            url="/p"
            image="path/to/image.jpg" />
          <Paymentgateway />
        </>} />
      <Route
        path="/about-us"
        element={<>
          <SEO
            title="About Us"
            description="Learn more about us"
            keywords="about, company"
            url="/about-us"
            image="path/to/image.jpg" />
          <About />
        </>} />
      <Route
        path="/career"
        element={<>
          <SEO
            title="Career"
            description="Join our team"
            keywords="career, jobs"
            url="/career"
            image="path/to/image.jpg" />
          <Career />
        </>} />
      <Route
        path="/Paymentsuccess"
        element={<>
          <SEO
            title="Payment Success"
            description="Your payment was successful"
            keywords="payment, success"
            url="/Paymentsuccess"
            image="path/to/image.jpg" />
          <Paymentsuccess />
        </>} />
      <Route
        path="/Paymentfailure"
        element={<>
          <SEO
            title="Payment Failure"
            description="There was a problem with your payment"
            keywords="payment, failure"
            url="/Paymentfailure"
            image="path/to/image.jpg" />
          <Paymentfailure />
        </>} />
      <Route
        path="/mybooking"
        element={<>
          <SEO
            title="My Bookings"
            description="Your bookings"
            keywords="my bookings"
            url="/mybooking"
            image="path/to/image.jpg" />
          <Mybooking />
        </>} />
      <Route
        path="/mainheader"
        element={<>
          <SEO
            title="Main Header"
            description="Main header content"
            keywords="header"
            url="/mainheader"
            image="path/to/image.jpg" />
          <Mainheader />
        </>} />
      <Route
        path="/completed"
        element={<>
          <SEO
            title="Completed"
            description="Your completed services"
            keywords="completed"
            url="/completed"
            image="path/to/image.jpg" />
          <Completed />
        </>} />
      <Route
        path="/upcomingdetail"
        element={<>
          <SEO
            title="Upcoming Details"
            description="Details of upcoming services"
            keywords="upcoming, details"
            url="/upcomingdetail"
            image="path/to/image.jpg" />
          <Upcomingdetail />
        </>} />
      <Route
        path="/enquirydetails"
        element={<>
          <SEO
            title="Enquiry Details"
            description="Details of your enquiry"
            keywords="enquiry"
            url="/enquirydetails"
            image="path/to/image.jpg" />
          <Enquirydetails />
        </>} />
      <Route
        path="/completeddetails"
        element={<>
          <SEO
            title="Completed Details"
            description="Details of completed services"
            keywords="completed, details"
            url="/completeddetails"
            image="path/to/image.jpg" />
          <Completeddetails />
        </>} />
      <Route
        path="/services/:subcategory"
        element={<>
         
          <Subcategory />
        </>} />
      <Route
        path="/serviceview/:ServiceName"
        element={<>
          <SEO
            title="Service View"
            description="View the service"
            keywords="service view"
            url="/serviceview/:ServiceName"
            image="path/to/image.jpg" />
          <Serviceviewdetails />
        </>} />
      <Route
        path="/terms-and-condition"
        element={<>
          <SEO
            title="Terms and Conditions"
            description="Review our terms"
            keywords="terms, conditions"
            url="/terms-and-condition"
            image="path/to/image.jpg" />
          <Terms />
        </>} />
      <Route
        path="/privacy-policy"
        element={<>
          <SEO
            title="Privacy Policy"
            description="Review our privacy policy"
            keywords="privacy, policy"
            url="/privacy-policy"
            image="path/to/image.jpg" />
          <Privacy />
        </>} />
      <Route
        path="/refund-and-cancellation"
        element={<>
          <SEO
            title="Refund and Cancellation"
            description="Review our refund and cancellation policy"
            keywords="refund, cancellation"
            url="/refund-and-cancellation"
            image="path/to/image.jpg" />
          <Cancellation />
        </>} />
      <Route
        path="/contact"
        element={<>
          <SEO
            title="Contact Us"
            description="Get in touch with us"
            keywords="contact, reach out"
            url="/contact"
            image="path/to/image.jpg" />
          <Contact />
        </>} />
      <Route
        path="/interiorcompany"
        element={<>
          <SEO
            title="Interior Company"
            description="Explore our interior design services"
            keywords="interior, design"
            url="/interiorcompany"
            image="path/to/image.jpg" />
          <Interiorcompany />
        </>} />
      <Route
        path="/categories"
        element={<>
          <SEO
            title="Categories"
            description="Explore our categories"
            keywords="categories"
            url="/categories"
            image="path/to/image.jpg" />
          <Categeries />
        </>} />
      <Route
        path="/carpetcleaning"
        element={<>
          <SEO
            title="Carpet Cleaning"
            description="Explore our carpet cleaning services"
            keywords="carpet, cleaning"
            url="/carpetcleaning"
            image="path/to/image.jpg" />
          <Cartpetcleaning />
        </>} />
      <Route
        path="/invest"
        element={<>
          <SEO
            title="Invest"
            description="Invest in our services"
            keywords="invest"
            url="/invest"
            image="path/to/image.jpg" />
          <Invest />
        </>} />
      <Route
        path="/registerus"
        element={<>
          <SEO
            title="Register Us"
            description="Register for our services"
            keywords="register, services"
            url="/registerus"
            image="path/to/image.jpg" />
          <Registerus />
        </>} />
      <Route
        path="/homelogin"
        element={<>
          <SEO
            title="Login"
            description="Login to your home account"
            keywords="home, login"
            url="/homelogin"
            image="path/to/image.jpg" />
          <Homelogin />
        </>} />
      <Route
        path="/paymentdemo"
        element={<>
          <SEO
            title="Payment Demo"
            description="Demo of our payment process"
            keywords="payment, demo"
            url="/paymentdemo"
            image="path/to/image.jpg" />
          <Paymentdemo />
        </>} />
      <Route
         path="/blog"
         element={
           <>
             <SEO
               title="Blog"
               description="Read our latest blogs"
               keywords="blog, articles"
               url="/blog"
               image="path/to/image.jpg"
             />
             <Blog />
           </>
         }
       />
       <Route path="/blogdetails/:title" element={<BlogDetails />} />
      <Route
        path="/thankyou"
        element={<>
          <SEO
            title="Thank You"
            description="Thank you for your response"
            keywords="thank you"
            url="/thankyou"
            image="path/to/image.jpg" />
          <Thankyou />
        </>} />

      // SEO for mobile devices

      <Route
        path="/packers-movers"
        element={<>
          <SEO
            title="Packers and Movers"
            description="Best Packers and Movers Services"
            keywords="packers, movers, relocation, shifting" />
          <Packersmovershome />
        </>} />
      <Route
        path="/packers-movers-services-details"
        element={<>
          <SEO
            title="Packers and Movers Services"
            description="Details of Packers and Movers services"
            keywords="packers services, moving services, relocation" />
          <Phome />
        </>} />
      <Route path="/packers-movers-Viewdetails" element={<Pviewdetails />} />
      <Route
        path="/packers-movers-servicedetails"
        element={<PserviceDetails />} />
      <Route path="/packers-movers-summary" element={<Pmsummary />} />
      <Route path="/pmlogin" element={<Pmlogin />} />
      <Route path="/myorders" element={<Pmorder />} />
      <Route path="/pmorderdetails_page" element={<Pmorderdetails />} />

    
        <Route path="/" element={<Home />} />
        <Route path="/locations/:locationId" element={<LocationPage />} />
        {/* Add additional routes here */}
    
        <Route path="/:cityName" element={<BangalorePage />} />
    <Route path="/services/:serviceSlug" component={ApplianceSEO} /></Routes>

      </>
    </HelmetProvider>
  
  );
  
}





export default App;

