import React from 'react';
import { Helmet } from 'react-helmet-async';
import { pestcontrolmetaTags } from '../metaTags/pest-control-metaTags';
import { paintingmetaTags } from '../metaTags/painting-metaTags';  
import { packersmoversmetaTags } from '../metaTags/packers-movers-metaTags';
import { homerepairmetaTags } from '../metaTags/homerepair-metaTags';
import { floorpolishingmetaTags } from '../metaTags/floorpolishing-metaTags';
import { cleaningmetaTags } from '../metaTags/cleaning-metaTags';
import { appliancemetaTags } from '../metaTags/appliance-metaTags';

const metaDataMap = {
  pestControl: pestcontrolmetaTags,
  painting: paintingmetaTags,
  packersMovers: packersmoversmetaTags,
  homeRepair: homerepairmetaTags,
  floorPolishing: floorpolishingmetaTags,
  cleaning: cleaningmetaTags,
  appliance: appliancemetaTags,
};

//const BangalorePage = ({ service }) => {
//const currentMeta = metaDataMap[service] || metaDataMap.cleaning; // Default to cleaning
const BangalorePage = () => {
// Logic to select the meta tags based on a condition
const service = 'cleaning'; // You can dynamically change this based on your logic
const currentMeta = metaDataMap[service] || cleaningmetaTags; // Fallback to cleaning if not found


  return (
    <Helmet>
      <title>{currentMeta.title}</title>
      <meta name="description" content={currentMeta.description} />
      <meta name="keywords" content={currentMeta.keywords} />
      <link rel="canonical" href="https://www.vijayhomeservices.com/bangalore" />
    </Helmet>
  );
};

export default BangalorePage;
