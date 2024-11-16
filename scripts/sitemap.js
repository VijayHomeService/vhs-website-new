const fs = require('fs');
const path = require('path');

const baseUrl = 'https://www.vijayhomeservices.com';
const lastmod = '2024-08-14';
const changefreq = 'daily';
const priority = '1.00';

const urls = [
  '/bangalore',
  '/ahmedabad',
  '/bhubaneswar',
  '/chennai',
  '/delhi',
  '/faridabad',
  '/ghaziabad',
  '/gurugram',
  '/hyderabad',
  '/kochi',
  '/kolkata',
  '/lucknow',
  '/mumbai',
  '/mysore',
  '/ncr',
  '/noida',
  '/patna',
  '/pune',
  '/surat',
  '/vadodara',
  '/vizag'
];

const generateSitemap = () => {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

  urls.forEach(url => {
    sitemap += `  <url>\n`;
    sitemap += `    <loc>${baseUrl}${url}</loc>\n`;
    sitemap += `    <lastmod>${lastmod}</lastmod>\n`;
    sitemap += `    <changefreq>${changefreq}</changefreq>\n`;
    sitemap += `    <priority>${priority}</priority>\n`;
    sitemap += `    <xhtml:link rel="canonical" href="${baseUrl}${url}" />\n`;
    sitemap += `  </url>\n`;
  });

  sitemap += `</urlset>`;

  // Write the sitemap to a file
  fs.writeFileSync(path.join(__dirname, 'public', 'sitemap.xml'), sitemap);
  console.log('Sitemap generated: public/sitemap.xml');
};

generateSitemap();
