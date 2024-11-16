import React from "react";
import { Helmet } from "react-helmet";

const SEO = ({ title, description, keywords, url}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={`https://www.vijayhomeservices.com${url}`} />
    </Helmet>
  );
};


export default SEO;