import React, { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  jsonLd?: Record<string, any> | Array<Record<string, any>>;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Sanchar Infratech Pvt Ltd | Civil Engineering & Architectural Design",
  description = "Sanchar Infratech is a premier civil engineering, turnkey construction, and architectural consultancy in Jaipur, Rajasthan with 25+ years of excellence.",
  keywords = "Sanchar Infratech, civil engineering Jaipur, turnkey construction Rajasthan, architectural design, urban planning, PMC consultancy, Astro Vastu planning",
  canonicalUrl = "https://sancharinfratech.com/",
  ogImage = "https://sancharinfratech.com/civil_construction_dusk.jpg",
  ogType = "website",
  jsonLd
}) => {
  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // 2. Helper to set/create meta tags
    const setMetaTag = (nameAttr: 'name' | 'property', attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${nameAttr}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(nameAttr, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Standard Meta
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'keywords', keywords);

    // Open Graph Meta
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:image', ogImage);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:site_name', 'Sanchar Infratech Pvt Ltd');

    // Twitter Meta
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', ogImage);

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // 3. Inject Dynamic JSON-LD Schema
    const existingSchemaScript = document.getElementById('dynamic-jsonld-schema');
    if (existingSchemaScript) {
      existingSchemaScript.remove();
    }

    if (jsonLd) {
      const script = document.createElement('script');
      script.id = 'dynamic-jsonld-schema';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [title, description, keywords, canonicalUrl, ogImage, ogType, jsonLd]);

  return null;
};
