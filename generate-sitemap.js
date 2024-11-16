const fs = require('fs');
const { SitemapStream, streamToPromise } = require('sitemap');
const path = require('path');
const axios = require('axios'); // Add this if you need to fetch URLs from an API

const hostname = 'https://www.vijayhomeservices.com';

// Function to fetch dynamic URLs (e.g., from an API)
const fetchDynamicUrls = async () => {
  try {
    const response = await axios.get('https://api.vijayhomeservices.com/pages'); // Replace with your API
    const pages = response.data; // Assuming the API returns an array of page URLs
    return pages.map(page => ({ url: page.url, changefreq: 'weekly', priority: 0.9 }));
  } catch (error) {
    console.error('Error fetching dynamic URLs:', error);
    return [];
  }
};

// Generate sitemap
const generateSitemap = async () => {
  try {
    // Static URLs
    const staticLinks = [
      { url: '/', changefreq: 'daily', priority: 1.0 },
      { url: '/about', changefreq: 'monthly', priority: 0.8 },
      { url: '/services', changefreq: 'weekly', priority: 0.9 },
    ];

    // Fetch dynamic URLs
    const dynamicLinks = await fetchDynamicUrls();

    // Combine static and dynamic URLs
    const allLinks = [...staticLinks, ...dynamicLinks];

    // Create sitemap stream
    const sitemapStream = new SitemapStream({ hostname });
    const writeStream = fs.createWriteStream(path.resolve('./public/sitemap.xml'));

    sitemapStream.pipe(writeStream);

    // Write each URL to the sitemap
    allLinks.forEach(link => sitemapStream.write(link));

    // End the stream
    sitemapStream.end();

    // Wait until sitemap is fully generated
    await streamToPromise(sitemapStream);

    console.log('Sitemap generated successfully with updated URLs!');
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
};

// Run the sitemap generation
generateSitemap();

