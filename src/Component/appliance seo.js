import React from 'react';
import { Helmet } from 'react-helmet';
import SEO from './SEO.js';
import { useParams } from 'react-router-dom';

// Define the data for each service in Ahmedabad, Bangalore, and Bhubaneswar
const serviceData = {
  // Ahmedabad Services
  "washing-machine-repairing-in-ahmedabad": {
    title: "Washing Machine Repairing In Ahmedabad",
    description: "If you're looking for washing machine repair services in Ahmedabad, there are several reliable options available. Many service providers offer quick, affordable, and professional repair services.",
    keywords: "Washing Machine Repairing In Ahmedabad, Washing Machine Repairing, Washing Machine Repairing Ahmedabad",
    content: "Content about Washing Machine Repairing in Ahmedabad goes here...",
  },
  "refrigerator-repairing-in-ahmedabad": {
    title: "Refrigerator Repairing In Ahmedabad",
    description: "If you're looking for Refrigerator Repairing services In Ahmedabad, you’ll find several reliable options that offer quick, professional, and affordable solutions. Call for more details.",
    keywords: "Refrigerator Repairing In Ahmedabad, Refrigerator Repairing, Refrigerator Repairing Ahmedabad",
    content: "Content about Refrigerator Repairing in Ahmedabad goes here...",
  },
  "split-ac-service-in-ahmedabad": {
    title: "Split AC Service In Ahmedabad",
    description: "For split AC servicing in Ahmedabad, numerous reliable companies provide comprehensive maintenance and repair solutions. Regular servicing is essential to ensure optimal cooling, prevent malfunctions, and extend the lifespan of your AC.",
    keywords: "Split AC Service In Ahmedabad, Split AC Service, Split AC Service Ahmedabad",
    content: "Content about Split AC Service in Ahmedabad goes here...",
  },
  "window-ac-service-in-ahmedabad": {
    title: "Window AC Service In Ahmedabad",
    description: "Regular servicing is essential to maintain cooling efficiency, reduce energy consumption, and prevent issues like unusual noise, water leakage, or poor airflow. Call us for more details.",
    keywords: "Window AC Service In Ahmedabad, Window AC Service Ahmedabad, Window AC Service",
    content: "Content about Window AC Service in Ahmedabad goes here...",
  },
  "geyser-repairing-in-ahmedabad": {
    title: "Geyser Repairing In Ahmedabad",
    description: "If you're looking for Geyser Repairing In Ahmedabad, you’ll find several reliable options that offer quick, professional, and affordable solutions. Visit our site for details.",
    keywords: "Geyser Repairing In Ahmedabad, Geyser Repairing Ahmedabad, Geyser Repairing services",
    content: "Content about Geyser Repairing in Ahmedabad goes here...",
  },

  // Bangalore Services
  "washing-machine-repairing-in-bangalore": {
    title: "Washing Machine Repairing In Bangalore",
    description: "If you're looking for washing machine repair services in Bangalore, you'll find a wide range of expert technicians ready to fix issues across all major brands like LG, Samsung, IFB, Whirlpool, Bosch, and others.",
    keywords: "Washing Machine Repairing In Bangalore, Washing Machine Repairing Bangalore, Washing Machine Repairing",
    content: "Content about Washing Machine Repairing in Bangalore goes here...",
  },
  "refrigerator-repairing-in-bangalore": {
    title: "Refrigerator Repairing In Bangalore",
    description: "With professional Refrigerator Repairing In Bangalore, your appliance can be up and running in no time, helping you avoid the inconvenience of laundry piling up.",
    keywords: "Refrigerator Repairing In Bangalore, Refrigerator Repairing Bangalore, Refrigerator Repairing services",
    content: "Content about Refrigerator Repairing in Bangalore goes here...",
  },
  "split-ac-service-in-bangalore": {
    title: "Split AC Service In Bangalore",
    description: "For Split AC Service In Bangalore, numerous reliable companies provide comprehensive maintenance and repair solutions. Regular servicing is essential to ensure optimal cooling, prevent malfunctions, and extend the lifespan of your AC.",
    keywords: "Split AC Service In Bangalore, Split AC Service, Split AC Service Bangalore",
    content: "Content about Split AC Service in Bangalore goes here...",
  },
  "window-ac-service-in-bangalore": {
    title: "Window AC Service In Bangalore",
    description: "Regular servicing is essential to maintain cooling efficiency, reduce energy consumption, and prevent issues like unusual noise, water leakage, or poor airflow. Call us for more details.",
    keywords: "Window AC Service In Bangalore, Window AC Service Bangalore, Window AC Service",
    content: "Content about Window AC Service in Bangalore goes here...",
  },
  "geyser-repairing-in-bangalore": {
    title: "Geyser Repairing In Bangalore",
    description: "If you're looking for Geyser Repairing In Bangalore, you’ll find several reliable options that offer quick, professional, and affordable solutions. Visit our site for details.",
    keywords: "Geyser Repairing In Bangalore, Geyser Repairing Bangalore, Geyser Repairing services",
    content: "Content about Geyser Repairing in Bangalore goes here...",
  },

  // Bhubaneswar Services
  "washing-machine-repairing-in-bhubaneswar": {
    title: "Washing Machine Repairing In Bhubaneswar",
    description: "If you're looking for washing machine repair services in Bhubaneswar, you'll find a wide range of expert technicians ready to fix issues across all major brands like LG, Samsung, IFB, Whirlpool, Bosch, and others.",
    keywords: "Washing Machine Repairing In Bhubaneswar, Washing Machine Repairing Bhubaneswar, Washing Machine Repairing",
    content: "Content about Washing Machine Repairing in Bhubaneswar goes here...",
  },
  "refrigerator-repairing-in-bhubaneswar": {
    title: "Refrigerator Repairing In Bhubaneswar",
    description: "With professional Refrigerator Repairing In Bhubaneswar, your appliance can be up and running in no time, helping you avoid the inconvenience of laundry piling up.",
    keywords: "Refrigerator Repairing In Bhubaneswar, Refrigerator Repairing Bhubaneswar, Refrigerator Repairing services",
    content: "Content about Refrigerator Repairing in Bhubaneswar goes here...",
  },
  "split-ac-service-in-bhubaneswar": {
    title: "Split AC Service In Bhubaneswar",
    description: "For Split Ac Service In Bhubaneswar, numerous reliable companies provide comprehensive maintenance and repair solutions. Regular servicing is essential to ensure optimal cooling, prevent malfunctions, and extend the lifespan of your AC.",
    keywords: "Split AC Service In Bhubaneswar, Split AC Service, Split AC Service Bhubaneswar",
    content: "Content about Split AC Service in Bhubaneswar goes here...",
  },
  "window-ac-service-in-bhubaneswar": {
    title: "Window AC Service In Bhubaneswar",
    description: "Regular servicing is essential to maintain cooling efficiency, reduce energy consumption, and prevent issues like unusual noise, water leakage, or poor airflow. Call us for more details.",
    keywords: "Window AC Service In Bhubaneswar, Window AC Service Bhubaneswar, Window AC Service",
    content: "Content about Window AC Service in Bhubaneswar goes here...",
  },
  "geyser-repairing-in-bhubaneswar": {
    title: "Geyser Repairing In Bhubaneswar",
    description: "If you're looking for Geyser Repairing In Bhubaneswar, you’ll find several reliable options that offer quick, professional, and affordable solutions. Visit our site for details.",
    keywords: "Geyser Repairing In Bhubaneswar, Geyser Repairing Bhubaneswar, Geyser Repairing services",
    content: "Content about Geyser Repairing in Bhubaneswar goes here...",
  },
    // Delhi Services
    "washing-machine-repairing-in-delhi": {
        title: "Washing Machine Repairing In Delhi",
        description: "If you're looking for washing machine repair services in Delhi, you'll find a wide range of expert technicians ready to fix issues across all major brands like LG, Samsung, IFB, Whirlpool, Bosch, and others.",
        keywords: "Washing Machine Repairing In Delhi, Washing Machine Repairing Delhi, Washing Machine Repairing",
        content: "Content about Washing Machine Repairing in Delhi goes here...",
      },
      "refrigerator-repairing-in-delhi": {
        title: "Refrigerator Repairing In Delhi",
        description: "With professional Refrigerator Repairing In Delhi, your appliance can be up and running in no time, helping you avoid the inconvenience of laundry piling up.",
        keywords: "Refrigerator Repairing In Delhi, Refrigerator Repairing Delhi, Refrigerator Repairing services",
        content: "Content about Refrigerator Repairing in Delhi goes here...",
      },
      "split-ac-service-in-delhi": {
        title: "Split AC Service In Delhi",
        description: "For Split AC Service In Delhi, numerous reliable companies provide comprehensive maintenance and repair solutions. Regular servicing is essential to ensure optimal cooling, prevent malfunctions, and extend the lifespan of your AC.",
        keywords: "Split AC Service In Delhi, Split AC Service, Split AC Service Delhi",
        content: "Content about Split AC Service in Delhi goes here...",
      },
      "window-ac-service-in-delhi": {
        title: "Window AC Service In Delhi",
        description: "Regular servicing is essential to maintain cooling efficiency, reduce energy consumption, and prevent issues like unusual noise, water leakage, or poor airflow. Call us for more details.",
        keywords: "Window AC Service In Delhi, Window AC Service Delhi, Window AC Service",
        content: "Content about Window AC Service in Delhi goes here...",
      },
      "geyser-repairing-in-delhi": {
        title: "Geyser Repairing In Delhi",
        description: "If you're looking for Geyser Repairing In Delhi, you’ll find several reliable options that offer quick, professional, and affordable solutions. Visit our site for details.",
        keywords: "Geyser Repairing In Delhi, Geyser Repairing Delhi, Geyser Repairing services",
        content: "Content about Geyser Repairing in Delhi goes here...",
      },
    
      // Additional Cities
      "washing-machine-repairing-in-mumbai": {
        title: "Washing Machine Repairing In Mumbai",
        description: "If you're looking for washing machine repair services in Mumbai, you'll find a wide range of expert technicians ready to fix issues across all major brands.",
        keywords: "Washing Machine Repairing In Mumbai, Washing Machine Repairing Mumbai, Washing Machine Repairing",
        content: "Content about Washing Machine Repairing in Mumbai goes here...",
      },
      "refrigerator-repairing-in-mumbai": {
        title: "Refrigerator Repairing In Mumbai",
        description: "With professional Refrigerator Repairing In Mumbai, your appliance can be up and running in no time, helping you avoid the inconvenience of laundry piling up.",
        keywords: "Refrigerator Repairing In Mumbai, Refrigerator Repairing Mumbai, Refrigerator Repairing services",
        content: "Content about Refrigerator Repairing in Mumbai goes here...",
      },
      "split-ac-service-in-mumbai": {
        title: "Split AC Service In Mumbai",
        description: "For Split AC Service In Mumbai, numerous reliable companies provide comprehensive maintenance and repair solutions. Regular servicing is essential to ensure optimal cooling.",
        keywords: "Split AC Service In Mumbai, Split AC Service, Split AC Service Mumbai",
        content: "Content about Split AC Service in Mumbai goes here...",
      },
      "window-ac-service-in-mumbai": {
        title: "Window AC Service In Mumbai",
        description: "Regular servicing is essential to maintain cooling efficiency, reduce energy consumption, and prevent issues. Call us for more details.",
        keywords: "Window AC Service In Mumbai, Window AC Service Mumbai, Window AC Service",
        content: "Content about Window AC Service in Mumbai goes here...",
      },
      "geyser-repairing-in-mumbai": {
        title: "Geyser Repairing In Mumbai",
        description: "If you're looking for Geyser Repairing In Mumbai, you’ll find several reliable options that offer quick, professional, and affordable solutions.",
        keywords: "Geyser Repairing In Mumbai, Geyser Repairing Mumbai, Geyser Repairing services",
        content: "Content about Geyser Repairing in Mumbai goes here...",
      },
    
      // Faridabad Services
"washing-machine-repairing-in-faridabad": {
    title: "Washing Machine Repairing In Faridabad",
    description: "If you're looking for washing machine repair services in Faridabad, you'll find a wide range of expert technicians ready to fix issues across all major brands like LG, Samsung, IFB, Whirlpool, Bosch, and others.",
    keywords: "Washing Machine Repairing In Faridabad, Washing Machine Repairing Faridabad, Washing Machine Repairing",
    content: "Content about Washing Machine Repairing in Faridabad goes here...",
},
"refrigerator-repairing-in-faridabad": {
    title: "Refrigerator Repairing In Faridabad",
    description: "With professional Refrigerator Repairing In Faridabad, your appliance can be up and running in no time, helping you avoid the inconvenience of laundry piling up.",
    keywords: "Refrigerator Repairing In Faridabad, Refrigerator Repairing Faridabad, Refrigerator Repairing services",
    content: "Content about Refrigerator Repairing in Faridabad goes here...",
},
"split-ac-service-in-faridabad": {
    title: "Split AC Service In Faridabad",
    description: "For Split AC Service In Faridabad, numerous reliable companies provide comprehensive maintenance and repair solutions. Regular servicing is essential to ensure optimal cooling, prevent malfunctions, and extend the lifespan of your AC.",
    keywords: "Split AC Service In Faridabad, Split AC Service, Split AC Service Faridabad",
    content: "Content about Split AC Service in Faridabad goes here...",
},
"window-ac-service-in-faridabad": {
    title: "Window AC Service In Faridabad",
    description: "Regular servicing is essential to maintain cooling efficiency, reduce energy consumption, and prevent issues like unusual noise, water leakage, or poor airflow. Call us for more details.",
    keywords: "Window AC Service In Faridabad, Window AC Service Faridabad, Window AC Service",
    content: "Content about Window AC Service in Faridabad goes here...",
},
"geyser-repairing-in-faridabad": {
    title: "Geyser Repairing In Faridabad",
    description: "If you're looking for Geyser Repairing In Faridabad, you’ll find several reliable options that offer quick, professional, and affordable solutions. Visit our site for details.",
    keywords: "Geyser Repairing In Faridabad, Geyser Repairing Faridabad, Geyser Repairing services",
    content: "Content about Geyser Repairing in Faridabad goes here...",
},
// Ghaziabad Services
"washing-machine-repairing-in-ghaziabad": {
    title: "Washing Machine Repairing In Ghaziabad",
    description: "If you're looking for washing machine repair services in Ghaziabad, you'll find a wide range of expert technicians ready to fix issues across all major brands like LG, Samsung, IFB, Whirlpool, Bosch, and others.",
    keywords: "Washing Machine Repairing In Ghaziabad, Washing Machine Repairing Ghaziabad, Washing Machine Repairing",
    content: "Content about Washing Machine Repairing in Ghaziabad goes here...",
},
"refrigerator-repairing-in-ghaziabad": {
    title: "Refrigerator Repairing In Ghaziabad",
    description: "With professional Refrigerator Repairing In Ghaziabad, your appliance can be up and running in no time, helping you avoid the inconvenience of laundry piling up.",
    keywords: "Refrigerator Repairing In Ghaziabad, Refrigerator Repairing Ghaziabad, Refrigerator Repairing services",
    content: "Content about Refrigerator Repairing in Ghaziabad goes here...",
},
"split-ac-service-in-ghaziabad": {
    title: "Split AC Service In Ghaziabad",
    description: "For Split AC Service In Ghaziabad, numerous reliable companies provide comprehensive maintenance and repair solutions. Regular servicing is essential to ensure optimal cooling, prevent malfunctions, and extend the lifespan of your AC.",
    keywords: "Split AC Service In Ghaziabad, Split AC Service, Split AC Service Ghaziabad",
    content: "Content about Split AC Service in Ghaziabad goes here...",
},
"window-ac-service-in-ghaziabad": {
    title: "Window AC Service In Ghaziabad",
    description: "Regular servicing is essential to maintain cooling efficiency, reduce energy consumption, and prevent issues like unusual noise, water leakage, or poor airflow. Call us for more details.",
    keywords: "Window AC Service In Ghaziabad, Window AC Service Ghaziabad, Window AC Service",
    content: "Content about Window AC Service in Ghaziabad goes here...",
},
"geyser-repairing-in-ghaziabad": {
    title: "Geyser Repairing In Ghaziabad",
    description: "If you're looking for Geyser Repairing In Ghaziabad, you’ll find several reliable options that offer quick, professional, and affordable solutions. Visit our site for details.",
    keywords: "Geyser Repairing In Ghaziabad, Geyser Repairing Ghaziabad, Geyser Repairing services",
    content: "Content about Geyser Repairing in Ghaziabad goes here...",
},
// Gurugram Services
"washing-machine-repairing-in-gurugram": {
    title: "Washing Machine Repairing In Gurugram",
    description: "If you're looking for washing machine repair services in Gurugram, you'll find a wide range of expert technicians ready to fix issues across all major brands like LG, Samsung, IFB, Whirlpool, Bosch, and others.",
    keywords: "Washing Machine Repairing In Gurugram, Washing Machine Repairing Gurugram, Washing Machine Repairing",
    content: "Content about Washing Machine Repairing in Gurugram goes here...",
},
"refrigerator-repairing-in-gurugram": {
    title: "Refrigerator Repairing In Gurugram",
    description: "With professional Refrigerator Repairing In Gurugram, your appliance can be up and running in no time, helping you avoid the inconvenience of laundry piling up.",
    keywords: "Refrigerator Repairing In Gurugram, Refrigerator Repairing Gurugram, Refrigerator Repairing services",
    content: "Content about Refrigerator Repairing in Gurugram goes here...",
},
"split-ac-service-in-gurugram": {
    title: "Split AC Service In Gurugram",
    description: "For Split AC Service In Gurugram, numerous reliable companies provide comprehensive maintenance and repair solutions. Regular servicing is essential to ensure optimal cooling, prevent malfunctions, and extend the lifespan of your AC.",
    keywords: "Split AC Service In Gurugram, Split AC Service, Split AC Service Gurugram",
    content: "Content about Split AC Service in Gurugram goes here...",
},
"window-ac-service-in-gurugram": {
    title: "Window AC Service In Gurugram",
    description: "Regular servicing is essential to maintain cooling efficiency, reduce energy consumption, and prevent issues like unusual noise, water leakage, or poor airflow. Call us for more details.",
    keywords: "Window AC Service In Gurugram, Window AC Service Gurugram, Window AC Service",
    content: "Content about Window AC Service in Gurugram goes here...",
},
"geyser-repairing-in-gurugram": {
    title: "Geyser Repairing In Gurugram",
    description: "If you're looking for Geyser Repairing In Gurugram, you’ll find several reliable options that offer quick, professional, and affordable solutions. Visit our site for details.",
    keywords: "Geyser Repairing In Gurugram, Geyser Repairing Gurugram, Geyser Repairing services",
    content: "Content about Geyser Repairing in Gurugram goes here...",
},
// Hyderabad Services
"washing-machine-repairing-in-hyderabad": {
    title: "Washing Machine Repairing In Hyderabad",
    description: "If you're looking for washing machine repair services in Hyderabad, you'll find a wide range of expert technicians ready to fix issues across all major brands like LG, Samsung, IFB, Whirlpool, Bosch, and others.",
    keywords: "Washing Machine Repairing In Hyderabad, Washing Machine Repairing Hyderabad, Washing Machine Repairing",
    content: "Content about Washing Machine Repairing in Hyderabad goes here...",
},
"refrigerator-repairing-in-hyderabad": {
    title: "Refrigerator Repairing In Hyderabad",
    description: "With professional Refrigerator Repairing In Hyderabad, your appliance can be up and running in no time, helping you avoid the inconvenience of laundry piling up.",
    keywords: "Refrigerator Repairing In Hyderabad, Refrigerator Repairing Hyderabad, Refrigerator Repairing services",
    content: "Content about Refrigerator Repairing in Hyderabad goes here...",
},
"split-ac-service-in-hyderabad": {
    title: "Split AC Service In Hyderabad",
    description: "For Split AC Service In Hyderabad, numerous reliable companies provide comprehensive maintenance and repair solutions. Regular servicing is essential to ensure optimal cooling, prevent malfunctions, and extend the lifespan of your AC.",
    keywords: "Split AC Service In Hyderabad, Split AC Service, Split AC Service Hyderabad",
    content: "Content about Split AC Service in Hyderabad goes here...",
},
"window-ac-service-in-hyderabad": {
    title: "Window AC Service In Hyderabad",
    description: "Regular servicing is essential to maintain cooling efficiency, reduce energy consumption, and prevent issues like unusual noise, water leakage, or poor airflow. Call us for more details.",
    keywords: "Window AC Service In Hyderabad, Window AC Service Hyderabad, Window AC Service",
    content: "Content about Window AC Service in Hyderabad goes here...",
},
"geyser-repairing-in-hyderabad": {
    title: "Geyser Repairing In Hyderabad",
    description: "If you're looking for Geyser Repairing In Hyderabad, you’ll find several reliable options that offer quick, professional, and affordable solutions. Visit our site for details.",
    keywords: "Geyser Repairing In Hyderabad, Geyser Repairing Hyderabad, Geyser Repairing services",
    content: "Content about Geyser Repairing in Hyderabad goes here...",
},

// Kochi Services
"washing-machine-repairing-in-kochi": {
    title: "Washing Machine Repairing In Kochi",
    description: "If you're looking for washing machine repair services in Kochi, you'll find a wide range of expert technicians ready to fix issues across all major brands like LG, Samsung, IFB, Whirlpool, Bosch, and others.",
    keywords: "Washing Machine Repairing In Kochi, Washing Machine Repairing Kochi, Washing Machine Repairing",
    content: "Content about Washing Machine Repairing in Kochi goes here...",
},
"refrigerator-repairing-in-kochi": {
    title: "Refrigerator Repairing In Kochi",
    description: "With professional Refrigerator Repairing In Kochi, your appliance can be up and running in no time, helping you avoid the inconvenience of laundry piling up.",
    keywords: "Refrigerator Repairing In Kochi, Refrigerator Repairing Kochi, Refrigerator Repairing services",
    content: "Content about Refrigerator Repairing in Kochi goes here...",
},
"split-ac-service-in-kochi": {
    title: "Split AC Service In Kochi",
    description: "For Split AC Service In Kochi, numerous reliable companies provide comprehensive maintenance and repair solutions. Regular servicing is essential to ensure optimal cooling, prevent malfunctions, and extend the lifespan of your AC.",
    keywords: "Split AC Service In Kochi, Split AC Service, Split AC Service Kochi",
    content: "Content about Split AC Service in Kochi goes here...",
},
"window-ac-service-in-kochi": {
    title: "Window AC Service In Kochi",
    description: "Regular servicing is essential to maintain cooling efficiency, reduce energy consumption, and prevent issues like unusual noise, water leakage, or poor airflow. Call us for more details.",
    keywords: "Window AC Service In Kochi, Window AC Service Kochi, Window AC Service",
    content: "Content about Window AC Service in Kochi goes here...",
},
"geyser-repairing-in-kochi": {
    title: "Geyser Repairing In Kochi",
    description: "If you're looking for Geyser Repairing In Kochi, you’ll find several reliable options that offer quick, professional, and affordable solutions. Visit our site for details.",
    keywords: "Geyser Repairing In Kochi, Geyser Repairing Kochi, Geyser Repairing services",
    content: "Content about Geyser Repairing in Kochi goes here...",
},
// Kolkata Services
"washing-machine-repairing-in-kolkata": {
    title: "Washing Machine Repairing In Kolkata",
    description: "If you're looking for washing machine repair services in Kolkata, you'll find a wide range of expert technicians ready to fix issues across all major brands like LG, Samsung, IFB, Whirlpool, Bosch, and others.",
    keywords: "Washing Machine Repairing In Kolkata, Washing Machine Repairing Kolkata, Washing Machine Repairing",
    content: "Content about Washing Machine Repairing in Kolkata goes here...",
},
"refrigerator-repairing-in-kolkata": {
    title: "Refrigerator Repairing In Kolkata",
    description: "With professional Refrigerator Repairing In Kolkata, your appliance can be up and running in no time, helping you avoid the inconvenience of laundry piling up.",
    keywords: "Refrigerator Repairing In Kolkata, Refrigerator Repairing Kolkata, Refrigerator Repairing services",
    content: "Content about Refrigerator Repairing in Kolkata goes here...",
},
"split-ac-service-in-kolkata": {
    title: "Split AC Service In Kolkata",
    description: "For Split AC Service In Kolkata, numerous reliable companies provide comprehensive maintenance and repair solutions. Regular servicing is essential to ensure optimal cooling, prevent malfunctions, and extend the lifespan of your AC.",
    keywords: "Split AC Service In Kolkata, Split AC Service, Split AC Service Kolkata",
    content: "Content about Split AC Service in Kolkata goes here...",
},
"window-ac-service-in-kolkata": {
    title: "Window AC Service In Kolkata",
    description: "Regular servicing is essential to maintain cooling efficiency, reduce energy consumption, and prevent issues like unusual noise, water leakage, or poor airflow. Call us for more details.",
    keywords: "Window AC Service In Kolkata, Window AC Service Kolkata, Window AC Service",
    content: "Content about Window AC Service in Kolkata goes here...",
},
"geyser-repairing-in-kolkata": {
    title: "Geyser Repairing In Kolkata",
    description: "If you're looking for Geyser Repairing In Kolkata, you’ll find several reliable options that offer quick, professional, and affordable solutions. Visit our site for details.",
    keywords: "Geyser Repairing In Kolkata, Geyser Repairing Kolkata, Geyser Repairing services",
    content: "Content about Geyser Repairing in Kolkata goes here...",
},
// Lucknow Services
"washing-machine-repairing-in-lucknow": {
    title: "Washing Machine Repairing In Lucknow",
    description: "If you're looking for washing machine repair services in Lucknow, you'll find a wide range of expert technicians ready to fix issues across all major brands like LG, Samsung, IFB, Whirlpool, Bosch, and others.",
    keywords: "Washing Machine Repairing In Lucknow, Washing Machine Repairing Lucknow, Washing Machine Repairing",
    content: "Content about Washing Machine Repairing in Lucknow goes here...",
},
"refrigerator-repairing-in-lucknow": {
    title: "Refrigerator Repairing In Lucknow",
    description: "With professional Refrigerator Repairing In Lucknow, your appliance can be up and running in no time, helping you avoid the inconvenience of laundry piling up.",
    keywords: "Refrigerator Repairing In Lucknow, Refrigerator Repairing Lucknow, Refrigerator Repairing services",
    content: "Content about Refrigerator Repairing in Lucknow goes here...",
},
"split-ac-service-in-lucknow": {
    title: "Split AC Service In Lucknow",
    description: "For Split AC Service In Lucknow, numerous reliable companies provide comprehensive maintenance and repair solutions. Regular servicing is essential to ensure optimal cooling, prevent malfunctions, and extend the lifespan of your AC.",
    keywords: "Split AC Service In Lucknow, Split AC Service, Split AC Service Lucknow",
    content: "Content about Split AC Service in Lucknow goes here...",
},
"window-ac-service-in-lucknow": {
    title: "Window AC Service In Lucknow",
    description: "Regular servicing is essential to maintain cooling efficiency, reduce energy consumption, and prevent issues like unusual noise, water leakage, or poor airflow. Call us for more details.",
    keywords: "Window AC Service In Lucknow, Window AC Service Lucknow, Window AC Service",
    content: "Content about Window AC Service in Lucknow goes here...",
},
"geyser-repairing-in-lucknow": {
    title: "Geyser Repairing In Lucknow",
    description: "If you're looking for Geyser Repairing In Lucknow, you’ll find several reliable options that offer quick, professional, and affordable solutions. Visit our site for details.",
    keywords: "Geyser Repairing In Lucknow, Geyser Repairing Lucknow, Geyser Repairing services",
    content: "Content about Geyser Repairing in Lucknow goes here...",
},
// Mysore Services
"washing-machine-repairing-in-mysore": {
    title: "Washing Machine Repairing In Mysore",
    description: "If you're looking for washing machine repair services in Mysore, you'll find a wide range of expert technicians ready to fix issues across all major brands like LG, Samsung, IFB, Whirlpool, Bosch, and others.",
    keywords: "Washing Machine Repairing In Mysore, Washing Machine Repairing Mysore, Washing Machine Repairing",
    content: "Content about Washing Machine Repairing in Mysore goes here...",
},
"refrigerator-repairing-in-mysore": {
    title: "Refrigerator Repairing In Mysore",
    description: "With professional Refrigerator Repairing In Mysore, your appliance can be up and running in no time, helping you avoid the inconvenience of laundry piling up.",
    keywords: "Refrigerator Repairing In Mysore, Refrigerator Repairing Mysore, Refrigerator Repairing services",
    content: "Content about Refrigerator Repairing in Mysore goes here...",
},
"split-ac-service-in-mysore": {
    title: "Split AC Service In Mysore",
    description: "For Split AC Service In Mysore, numerous reliable companies provide comprehensive maintenance and repair solutions. Regular servicing is essential to ensure optimal cooling, prevent malfunctions, and extend the lifespan of your AC.",
    keywords: "Split AC Service In Mysore, Split AC Service, Split AC Service Mysore",
    content: "Content about Split AC Service in Mysore goes here...",
},
"window-ac-service-in-mysore": {
    title: "Window AC Service In Mysore",
    description: "Regular servicing is essential to maintain cooling efficiency, reduce energy consumption, and prevent issues like unusual noise, water leakage, or poor airflow. Call us for more details.",
    keywords: "Window AC Service In Mysore, Window AC Service Mysore, Window AC Service",
    content: "Content about Window AC Service in Mysore goes here...",
},
"geyser-repairing-in-mysore": {
    title: "Geyser Repairing In Mysore",
    description: "If you're looking for Geyser Repairing In Mysore, you’ll find several reliable options that offer quick, professional, and affordable solutions. Visit our site for details.",
    keywords: "Geyser Repairing In Mysore, Geyser Repairing Mysore, Geyser Repairing services",
    content: "Content about Geyser Repairing in Mysore goes here...",
},
// NCR Services
"washing-machine-repairing-in-ncr": {
    title: "Washing Machine Repairing In NCR",
    description: "If you're looking for washing machine repair services in NCR, you'll find a wide range of expert technicians ready to fix issues across all major brands like LG, Samsung, IFB, Whirlpool, Bosch, and others.",
    keywords: "Washing Machine Repairing In NCR, Washing Machine Repairing NCR, Washing Machine Repairing",
    content: "Content about Washing Machine Repairing in NCR goes here...",
},
"refrigerator-repairing-in-ncr": {
    title: "Refrigerator Repairing In NCR",
    description: "With professional Refrigerator Repairing In NCR, your appliance can be up and running in no time, helping you avoid the inconvenience of laundry piling up.",
    keywords: "Refrigerator Repairing In NCR, Refrigerator Repairing NCR, Refrigerator Repairing services",
    content: "Content about Refrigerator Repairing in NCR goes here...",
},
"split-ac-service-in-ncr": {
    title: "Split AC Service In NCR",
    description: "For Split AC Service In NCR, numerous reliable companies provide comprehensive maintenance and repair solutions. Regular servicing is essential to ensure optimal cooling, prevent malfunctions, and extend the lifespan of your AC.",
    keywords: "Split AC Service In NCR, Split AC Service, Split AC Service NCR",
    content: "Content about Split AC Service in NCR goes here...",
},
"window-ac-service-in-ncr": {
    title: "Window AC Service In NCR",
    description: "Regular servicing is essential to maintain cooling efficiency, reduce energy consumption, and prevent issues like unusual noise, water leakage, or poor airflow. Call us for more details.",
    keywords: "Window AC Service In NCR, Window AC Service NCR, Window AC Service",
    content: "Content about Window AC Service in NCR goes here...",
},
"geyser-repairing-in-ncr": {
    title: "Geyser Repairing In NCR",
    description: "If you're looking for Geyser Repairing In NCR, you’ll find several reliable options that offer quick, professional, and affordable solutions. Visit our site for details.",
    keywords: "Geyser Repairing In NCR, Geyser Repairing NCR, Geyser Repairing services",
    content: "Content about Geyser Repairing in NCR goes here...",
},
// Noida Services
"washing-machine-repairing-in-noida": {
    title: "Washing Machine Repairing In Noida",
    description: "If you're looking for washing machine repair services in Noida, you'll find a wide range of expert technicians ready to fix issues across all major brands like LG, Samsung, IFB, Whirlpool, Bosch, and others.",
    keywords: "Washing Machine Repairing In Noida, Washing Machine Repairing Noida, Washing Machine Repairing",
    content: "Content about Washing Machine Repairing in Noida goes here...",
},
"refrigerator-repairing-in-noida": {
    title: "Refrigerator Repairing In Noida",
    description: "With professional Refrigerator Repairing In Noida, your appliance can be up and running in no time, helping you avoid the inconvenience of laundry piling up.",
    keywords: "Refrigerator Repairing In Noida, Refrigerator Repairing Noida, Refrigerator Repairing services",
    content: "Content about Refrigerator Repairing in Noida goes here...",
},
"split-ac-service-in-noida": {
    title: "Split AC Service In Noida",
    description: "For Split AC Service In Noida, numerous reliable companies provide comprehensive maintenance and repair solutions. Regular servicing is essential to ensure optimal cooling, prevent malfunctions, and extend the lifespan of your AC.",
    keywords: "Split AC Service In Noida, Split AC Service, Split AC Service Noida",
    content: "Content about Split AC Service in Noida goes here...",
},
"window-ac-service-in-noida": {
    title: "Window AC Service In Noida",
    description: "Regular servicing is essential to maintain cooling efficiency, reduce energy consumption, and prevent issues like unusual noise, water leakage, or poor airflow. Call us for more details.",
    keywords: "Window AC Service In Noida, Window AC Service Noida, Window AC Service",
    content: "Content about Window AC Service in Noida goes here...",
},
"geyser-repairing-in-noida": {
    title: "Geyser Repairing In Noida",
    description: "If you're looking for Geyser Repairing In Noida, you’ll find several reliable options that offer quick, professional, and affordable solutions. Visit our site for details.",
    keywords: "Geyser Repairing In Noida, Geyser Repairing Noida, Geyser Repairing services",
    content: "Content about Geyser Repairing in Noida goes here...",
},
// Patna Services
"washing-machine-repairing-in-patna": {
    title: "Washing Machine Repairing In Patna",
    description: "If you're looking for washing machine repair services in Patna, you'll find a wide range of expert technicians ready to fix issues across all major brands like LG, Samsung, IFB, Whirlpool, Bosch, and others.",
    keywords: "Washing Machine Repairing In Patna, Washing Machine Repairing Patna, Washing Machine Repairing",
    content: "Content about Washing Machine Repairing in Patna goes here...",
},
"refrigerator-repairing-in-patna": {
    title: "Refrigerator Repairing In Patna",
    description: "With professional Refrigerator Repairing In Patna, your appliance can be up and running in no time, helping you avoid the inconvenience of laundry piling up.",
    keywords: "Refrigerator Repairing In Patna, Refrigerator Repairing Patna, Refrigerator Repairing services",
    content: "Content about Refrigerator Repairing in Patna goes here...",
},
"split-ac-service-in-patna": {
    title: "Split AC Service In Patna",
    description: "For Split AC Service In Patna, numerous reliable companies provide comprehensive maintenance and repair solutions. Regular servicing is essential to ensure optimal cooling, prevent malfunctions, and extend the lifespan of your AC.",
    keywords: "Split AC Service In Patna, Split AC Service, Split AC Service Patna",
    content: "Content about Split AC Service in Patna goes here...",
},
"window-ac-service-in-patna": {
    title: "Window AC Service In Patna",
    description: "Regular servicing is essential to maintain cooling efficiency, reduce energy consumption, and prevent issues like unusual noise, water leakage, or poor airflow. Call us for more details.",
    keywords: "Window AC Service In Patna, Window AC Service Patna, Window AC Service",
    content: "Content about Window AC Service in Patna goes here...",
},
"geyser-repairing-in-patna": {
    title: "Geyser Repairing In Patna",
    description: "If you're looking for Geyser Repairing In Patna, you’ll find several reliable options that offer quick, professional, and affordable solutions. Visit our site for details.",
    keywords: "Geyser Repairing In Patna, Geyser Repairing Patna, Geyser Repairing services",
    content: "Content about Geyser Repairing in Patna goes here...",
},
// Pune Services
"washing-machine-repairing-in-pune": {
    title: "Washing Machine Repairing In Pune",
    description: "If you're looking for washing machine repair services in Pune, you'll find a wide range of expert technicians ready to fix issues across all major brands like LG, Samsung, IFB, Whirlpool, Bosch, and others.",
    keywords: "Washing Machine Repairing In Pune, Washing Machine Repairing Pune, Washing Machine Repairing",
    content: "Content about Washing Machine Repairing in Pune goes here...",
},
"refrigerator-repairing-in-pune": {
    title: "Refrigerator Repairing In Pune",
    description: "With professional Refrigerator Repairing In Pune, your appliance can be up and running in no time, helping you avoid the inconvenience of laundry piling up.",
    keywords: "Refrigerator Repairing In Pune, Refrigerator Repairing Pune, Refrigerator Repairing services",
    content: "Content about Refrigerator Repairing in Pune goes here...",
},
"split-ac-service-in-pune": {
    title: "Split AC Service In Pune",
    description: "For Split AC Service In Pune, numerous reliable companies provide comprehensive maintenance and repair solutions. Regular servicing is essential to ensure optimal cooling, prevent malfunctions, and extend the lifespan of your AC.",
    keywords: "Split AC Service In Pune, Split AC Service, Split AC Service Pune",
    content: "Content about Split AC Service in Pune goes here...",
},
"window-ac-service-in-pune": {
    title: "Window AC Service In Pune",
    description: "Regular servicing is essential to maintain cooling efficiency, reduce energy consumption, and prevent issues like unusual noise, water leakage, or poor airflow. Call us for more details.",
    keywords: "Window AC Service In Pune, Window AC Service Pune, Window AC Service",
    content: "Content about Window AC Service in Pune goes here...",
},
"geyser-repairing-in-pune": {
    title: "Geyser Repairing In Pune",
    description: "If you're looking for Geyser Repairing In Pune, you’ll find several reliable options that offer quick, professional, and affordable solutions. Visit our site for details.",
    keywords: "Geyser Repairing In Pune, Geyser Repairing Pune, Geyser Repairing services",
    content: "Content about Geyser Repairing in Pune goes here...",
},
// Surat Services
"washing-machine-repairing-in-surat": {
    title: "Washing Machine Repairing In Surat",
    description: "If you're looking for washing machine repair services in Surat, you'll find a wide range of expert technicians ready to fix issues across all major brands like LG, Samsung, IFB, Whirlpool, Bosch, and others.",
    keywords: "Washing Machine Repairing In Surat, Washing Machine Repairing Surat, Washing Machine Repairing",
    content: "Content about Washing Machine Repairing in Surat goes here...",
},
"refrigerator-repairing-in-surat": {
    title: "Refrigerator Repairing In Surat",
    description: "With professional Refrigerator Repairing In Surat, your appliance can be up and running in no time, helping you avoid the inconvenience of laundry piling up.",
    keywords: "Refrigerator Repairing In Surat, Refrigerator Repairing Surat, Refrigerator Repairing services",
    content: "Content about Refrigerator Repairing in Surat goes here...",
},
"split-ac-service-in-surat": {
    title: "Split AC Service In Surat",
    description: "For Split AC Service In Surat, numerous reliable companies provide comprehensive maintenance and repair solutions. Regular servicing is essential to ensure optimal cooling, prevent malfunctions, and extend the lifespan of your AC.",
    keywords: "Split AC Service In Surat, Split AC Service, Split AC Service Surat",
    content: "Content about Split AC Service in Surat goes here...",
},
"window-ac-service-in-surat": {
    title: "Window AC Service In Surat",
    description: "Regular servicing is essential to maintain cooling efficiency, reduce energy consumption, and prevent issues like unusual noise, water leakage, or poor airflow. Call us for more details.",
    keywords: "Window AC Service In Surat, Window AC Service Surat, Window AC Service",
    content: "Content about Window AC Service in Surat goes here...",
},
"geyser-repairing-in-surat": {
    title: "Geyser Repairing In Surat",
    description: "If you're looking for Geyser Repairing In Surat, you’ll find several reliable options that offer quick, professional, and affordable solutions. Visit our site for details.",
    keywords: "Geyser Repairing In Surat, Geyser Repairing Surat, Geyser Repairing services",
    content: "Content about Geyser Repairing in Surat goes here...",
},
// Vadodara Services
"washing-machine-repairing-in-vadodara": {
    title: "Washing Machine Repairing In Vadodara",
    description: "If you're looking for washing machine repair services in Vadodara, you'll find a wide range of expert technicians ready to fix issues across all major brands like LG, Samsung, IFB, Whirlpool, Bosch, and others.",
    keywords: "Washing Machine Repairing In Vadodara, Washing Machine Repairing Vadodara, Washing Machine Repairing",
    content: "Content about Washing Machine Repairing in Vadodara goes here...",
},
"refrigerator-repairing-in-vadodara": {
    title: "Refrigerator Repairing In Vadodara",
    description: "With professional Refrigerator Repairing In Vadodara, your appliance can be up and running in no time, helping you avoid the inconvenience of laundry piling up.",
    keywords: "Refrigerator Repairing In Vadodara, Refrigerator Repairing Vadodara, Refrigerator Repairing services",
    content: "Content about Refrigerator Repairing in Vadodara goes here...",
},
"split-ac-service-in-vadodara": {
    title: "Split AC Service In Vadodara",
    description: "For Split AC Service In Vadodara, numerous reliable companies provide comprehensive maintenance and repair solutions. Regular servicing is essential to ensure optimal cooling, prevent malfunctions, and extend the lifespan of your AC.",
    keywords: "Split AC Service In Vadodara, Split AC Service, Split AC Service Vadodara",
    content: "Content about Split AC Service in Vadodara goes here...",
},
"window-ac-service-in-vadodara": {
    title: "Window AC Service In Vadodara",
    description: "Regular servicing is essential to maintain cooling efficiency, reduce energy consumption, and prevent issues like unusual noise, water leakage, or poor airflow. Call us for more details.",
    keywords: "Window AC Service In Vadodara, Window AC Service Vadodara, Window AC Service",
    content: "Content about Window AC Service in Vadodara goes here...",
},
"geyser-repairing-in-vadodara": {
    title: "Geyser Repairing In Vadodara",
    description: "If you're looking for Geyser Repairing In Vadodara, you’ll find several reliable options that offer quick, professional, and affordable solutions. Visit our site for details.",
    keywords: "Geyser Repairing In Vadodara, Geyser Repairing Vadodara, Geyser Repairing services",
    content: "Content about Geyser Repairing in Vadodara goes here...",
},
// Vizag Services
"washing-machine-repairing-in-vizag": {
    title: "Washing Machine Repairing In Vizag",
    description: "If you're looking for washing machine repair services in Vizag, you'll find a wide range of expert technicians ready to fix issues across all major brands like LG, Samsung, IFB, Whirlpool, Bosch, and others.",
    keywords: "Washing Machine Repairing In Vizag, Washing Machine Repairing Vizag, Washing Machine Repairing",
    content: "Content about Washing Machine Repairing in Vizag goes here...",
},
"refrigerator-repairing-in-vizag": {
    title: "Refrigerator Repairing In Vizag",
    description: "With professional Refrigerator Repairing In Vizag, your appliance can be up and running in no time, helping you avoid the inconvenience of laundry piling up.",
    keywords: "Refrigerator Repairing In Vizag, Refrigerator Repairing Vizag, Refrigerator Repairing services",
    content: "Content about Refrigerator Repairing in Vizag goes here...",
},
"split-ac-service-in-vizag": {
    title: "Split AC Service In Vizag",
    description: "For Split AC Service In Vizag, numerous reliable companies provide comprehensive maintenance and repair solutions. Regular servicing is essential to ensure optimal cooling, prevent malfunctions, and extend the lifespan of your AC.",
    keywords: "Split AC Service In Vizag, Split AC Service, Split AC Service Vizag",
    content: "Content about Split AC Service in Vizag goes here...",
},
"window-ac-service-in-vizag": {
    title: "Window AC Service In Vizag",
    description: "Regular servicing is essential to maintain cooling efficiency, reduce energy consumption, and prevent issues like unusual noise, water leakage, or poor airflow. Call us for more details.",
    keywords: "Window AC Service In Vizag, Window AC Service Vizag, Window AC Service",
    content: "Content about Window AC Service in Vizag goes here...",
},
"geyser-repairing-in-vizag": {
    title: "Geyser Repairing In Vizag",
    description: "If you're looking for Geyser Repairing In Vizag, you’ll find several reliable options that offer quick, professional, and affordable solutions. Visit our site for details.",
    keywords: "Geyser Repairing In Vizag, Geyser Repairing Vizag, Geyser Repairing services",
    content: "Content about Geyser Repairing in Vizag goes here...",
},
    
};


    
// Component to render the page dynamically based on the service
const ApplianceSEO = () => {
  const { serviceSlug } = useParams(); // Get the dynamic part of the URL from route parameters
  const service = serviceData[serviceSlug]; // Fetch the service details from the data object

  // If the service doesn't exist, show a 404 message
  if (!service) {
    return <h1>Service not found</h1>;
  }

  return (
    <div>
      <SEO>
        <title>{service.title}</title>
        <meta name="description" content={service.description} />
        <meta name="keywords" content={service.keywords} />
        <link rel="canonical" href={`https://vijayhomeservices.com/services/${serviceSlug}`} />
      </SEO>
      <h1>{service.title}</h1>
      <p>{service.content}</p>
    </div>
  );
};

// Export the component
export default ApplianceSEO;
