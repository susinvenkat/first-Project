import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * SEO Component - Dynamic meta tags for each page
 * Implements best practices for SEO and social sharing
 */
export default function SEO({
  title = "SUSIN iTORK - Industrial Actuators & Valve Automation",
  description = "Leading manufacturer of industrial actuators and valve automation solutions. ISO 9001:2015 certified. Serving 100+ industries worldwide since 1992.",
  keywords = "industrial actuators, pneumatic actuators, valve automation, electro-hydraulic actuators, electrical actuators, SUSIN iTORK",
  image = "/assets/img/og-image.jpg",
  type = "website",
  author = "SUSIN iTORK - Susin Group",
  canonical = null,
  structuredData = null
}) {
  const location = useLocation();
  const siteUrl = "https://susiniTORK.com";
  const currentUrl = canonical || `${siteUrl}${location.pathname}`;
  const fullTitle = title.includes('SUSIN iTORK') ? title : `${title} | SUSIN iTORK`;
  const ogImage = image.startsWith('http') ? image : `${siteUrl}${image}`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Update meta tags
    updateMetaTag('name', 'description', description);
    updateMetaTag('name', 'keywords', keywords);
    updateMetaTag('name', 'author', author);

    // Open Graph tags
    updateMetaTag('property', 'og:title', fullTitle);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:url', currentUrl);
    updateMetaTag('property', 'og:image', ogImage);
    updateMetaTag('property', 'og:type', type);

    // Twitter Card tags
    updateMetaTag('name', 'twitter:title', fullTitle);
    updateMetaTag('name', 'twitter:description', description);
    updateMetaTag('name', 'twitter:image', ogImage);
    updateMetaTag('name', 'twitter:url', currentUrl);

    // Canonical link
    updateCanonicalLink(currentUrl);

    // Structured Data (JSON-LD)
    if (structuredData) {
      updateStructuredData(structuredData);
    }

    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [fullTitle, description, keywords, author, currentUrl, ogImage, type, structuredData]);

  return null; // This component doesn't render anything
}

// Helper function to update or create meta tags
function updateMetaTag(attribute, key, content) {
  if (!content) return;

  let element = document.querySelector(`meta[${attribute}="${key}"]`);
  
  if (element) {
    element.setAttribute('content', content);
  } else {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    element.setAttribute('content', content);
    document.head.appendChild(element);
  }
}

// Helper function to update canonical link
function updateCanonicalLink(url) {
  let link = document.querySelector('link[rel="canonical"]');
  
  if (link) {
    link.setAttribute('href', url);
  } else {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', url);
    document.head.appendChild(link);
  }
}

// Helper function to add/update structured data
function updateStructuredData(data) {
  const scriptId = 'structured-data-page';
  let script = document.getElementById(scriptId);
  
  if (script) {
    script.textContent = JSON.stringify(data);
  } else {
    script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }
}

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  image: PropTypes.string,
  type: PropTypes.string,
  author: PropTypes.string,
  canonical: PropTypes.string,
  structuredData: PropTypes.object
};
